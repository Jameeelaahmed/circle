import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../hooks/useAuth";
import useOnlinePresence from "../../../../hooks/chathooks/useOnlinePresence";
import { fetchCircleMembers } from "../../../../features/circleMembers/circleMembersSlice";
import { inviteUserToCircleNotification } from "../../../../fire_base/notificationController/notificationController";
import {
  toggleMemberAdminRole,
  getAvailableUsers,
  removeMemberFromCircle,
} from "../../../../utils/memberManagement";
import { toastStyles } from "../../../../utils/toastStyles";
import MembersModalPresentational from "./MembersModalPresentational";
import { getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { sendCircleInvitations } from "../../../../hooks/useCircleInvitations";
import { useSyncPendingRequests } from "../../../../contexts/PendingRequests";

function MembersModalContainer({ members, loading, error, closeModal }) {
  const { circleId } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { isUserOnline } = useOnlinePresence();
  useSyncPendingRequests(user);
  // Add online status to members
  const membersWithOnlineStatus = members.map((member) => ({
    ...member,
    isOnline: isUserOnline(member.id),
  }));

  // Add member state
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedNewMembers, setSelectedNewMembers] = useState([]);
  const [addingMembers, setAddingMembers] = useState(false);
  // Admin management state
  const [updatingAdmin, setUpdatingAdmin] = useState(null);
  const [removingMember, setRemovingMember] = useState(null);

  // Fetch available users when modal opens
  useEffect(() => {
    const loadAvailableUsers = async () => {
      try {
        const users = await getAvailableUsers(circleId);
        // Remove any duplicates and ensure unique values
        const uniqueUsers = users.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.value === user.value),
        );
        setAvailableUsers(uniqueUsers);
      } catch (err) {
        console.error("Error loading available users:", err);
        setAvailableUsers([]);
      }
    };

    if (circleId) {
      loadAvailableUsers();
    }
  }, [circleId, members]);

  const loadAvailableUsers = async () => {
    try {
      const users = await getAvailableUsers(circleId);
      const uniqueUsers = users.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.value === user.value),
      );
      setAvailableUsers(uniqueUsers);
    } catch (err) {
      console.error("Error loading available users:", err);
      setAvailableUsers([]);
    }
  };

  const handleAddMembers = async () => {
    if (!selectedNewMembers.length || !user) {
      toast.error("Please select at least one member to invite", toastStyles);
      return;
    }

    setAddingMembers(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      const memberIds = selectedNewMembers.map((member) => member.value);

      for (const memberUid of memberIds) {
        // Only send invitation, do NOT add member yet
        const invitationResult = await sendCircleInvitations({
          circleId,
          members: [{ value: memberUid }],
          memberOptions: availableUsers,
          user,
          circleName: "",
          closeModal
        });

        inviteUserToCircleNotification(memberUid, circleId, user.username);

        if (invitationResult && invitationResult[0]?.success) {
          successCount++;
        } else {
          errorCount++;
          console.error(`Failed to invite ${memberUid}`);
        }
      }

      if (successCount > 0) {
        toast.success(
          `Invited ${successCount} member(s) successfully`,
          toastStyles,
        );
        setSelectedNewMembers([]);
        // Optionally refresh available users
        loadAvailableUsers();
      }

      if (errorCount > 0) {
        toast.error(`Failed to invite ${errorCount} member(s)`, toastStyles);
      }
    } catch (error) {
      console.error("Error in handleAddMembers:", error);
      toast.error("Failed to send invitations. Please try again.", toastStyles);
    } finally {
      setAddingMembers(false);
    }
  };

  const ownerMember = membersWithOnlineStatus.find((m) => m.isOwner);
  const isOwner = ownerMember && ownerMember.uid === user.uid;
  // Remove member logic
  const handleRemoveMember = async (memberId) => {
    if (!memberId || !user) return;

    setRemovingMember(memberId);
    try {
      const result = await removeMemberFromCircle(circleId, memberId, user);

      if (result.success) {
        dispatch(fetchCircleMembers(circleId));
        loadAvailableUsers();

        // Remove circle from user's joinedCircles
        try {
          const db = getFirestore();
          const userDocRef = doc(db, "users", memberId);
          await updateDoc(userDocRef, {
            joinedCircles: arrayRemove(circleId),
          });
        } catch (err) {
          console.error("Failed to update user's joinedCircles:", err);
          toast.error("Failed to update user's joined circles.", toastStyles);
        }
      } else {
        toast.error(result.message, toastStyles);
      }
    } catch {
      toast.error("Failed to remove member. Please try again.", toastStyles);
    } finally {
      setRemovingMember(null);
    }
  };

  // Toggle admin logic
  const handleToggleAdmin = async (targetMemberUid, makeAdmin) => {
    if (!targetMemberUid || !user) return;

    const targetMember = membersWithOnlineStatus.find(
      (m) => m.uid === targetMemberUid || m.id === targetMemberUid,
    );

    if (targetMember?.isOwner) {
      toast.error("You cannot change the owner admin status.", toastStyles);
      return;
    }

    if (!isOwner) {
      toast.error(
        "Only the circle owner can set or unset admins.",
        toastStyles,
      );
      return;
    }

    setUpdatingAdmin(targetMemberUid);
    try {
      const result = await toggleMemberAdminRole(
        circleId,
        targetMemberUid,
        makeAdmin,
        user,
      );

      if (result.success) {
        dispatch(fetchCircleMembers(circleId));
      } else {
        toast.error(result.message, toastStyles);
      }
    } catch {
      toast.error("Failed to update admin role. Please try again.", toastStyles);
    } finally {
      setUpdatingAdmin(null);
    }
  };

  return (
    <MembersModalPresentational
      members={membersWithOnlineStatus}
      loading={loading}
      error={error}
      onClose={closeModal}
      availableUsers={availableUsers}
      selectedNewMembers={selectedNewMembers}
      setSelectedNewMembers={setSelectedNewMembers}
      onAddMembers={handleAddMembers}
      addingMembers={addingMembers}
      currentUser={user}
      onToggleAdmin={handleToggleAdmin}
      updatingAdmin={updatingAdmin}
      onRemoveMember={handleRemoveMember}
      removingMember={removingMember}
    />
  );
}

export default MembersModalContainer;
