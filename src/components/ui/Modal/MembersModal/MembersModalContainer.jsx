import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../hooks/useAuth";
import { useOnlinePresenceContext } from "../../../../hooks/chathooks/useOnlinePresenceContext";
import { fetchCircleMembers } from "../../../../features/circleMembers/circleMembersSlice";
import { addMemberToCircle, toggleMemberAdminRole, getAvailableUsers, removeMemberFromCircle } from "../../../../utils/memberManagement";
import { toastStyles } from "../../../../utils/toastStyles";
import MembersModalPresentational from "./MembersModalPresentational";

function MembersModalContainer({ members, loading, error, closeModal }) {
    const { circleId } = useParams();
    const { user } = useAuth();
    const dispatch = useDispatch();

    // Online presence from context
    const { isUserOnline } = useOnlinePresenceContext();

    // Add online status to members
    const membersWithOnlineStatus = members.map(member => ({
        ...member,
        isOnline: isUserOnline(member.id || member.uid)
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
                const uniqueUsers = users.filter((user, index, self) =>
                    index === self.findIndex(u => u.value === user.value)
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
            const uniqueUsers = users.filter((user, index, self) =>
                index === self.findIndex(u => u.value === user.value)
            );
            setAvailableUsers(uniqueUsers);
        } catch (err) {
            console.error("Error loading available users:", err);
            setAvailableUsers([]);
        }
    };

    const handleAddMembers = async () => {
        if (!selectedNewMembers.length || !user) {
            toast.error("Please select at least one member to add", toastStyles);
            return;
        }

        setAddingMembers(true);
        try {
            let successCount = 0;
            let errorCount = 0;

            const memberIds = selectedNewMembers.map(member => member.value);

            for (const memberUid of memberIds) {
                // Always add as non-owner, non-admin
                const result = await addMemberToCircle(circleId, memberUid, {
                    isOwner: false,
                    isAdmin: false,
                    addedBy: user.uid
                });
                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                    console.error(`Failed to add ${memberUid}:`, result.message);
                }
            }

            if (successCount > 0) {
                toast.success(`Added ${successCount} member(s) successfully`, toastStyles);
                setSelectedNewMembers([]);
                dispatch(fetchCircleMembers(circleId));
                loadAvailableUsers();
            }

            if (errorCount > 0) {
                toast.error(`Failed to add ${errorCount} member(s)`, toastStyles);
            }
        } catch (error) {
            console.error('Error in handleAddMembers:', error);
            toast.error("Failed to add members. Please try again.", toastStyles);
        } finally {
            setAddingMembers(false);
        }
    };

    const handleToggleAdmin = async (targetMemberUid, makeAdmin) => {
        if (!targetMemberUid || !user) return;

        // Prevent owner from being demoted/promoted
        const targetMember = membersWithOnlineStatus.find(m => m.uid === targetMemberUid || m.id === targetMemberUid);
        if (targetMember?.isOwner) {
            toast.error("You cannot change the owner admin status.", toastStyles);
            return;
        }

        setUpdatingAdmin(targetMemberUid);
        try {
            const result = await toggleMemberAdminRole(circleId, targetMemberUid, makeAdmin, user);

            if (result.success) {
                toast.success(result.message, toastStyles);
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

    const handleRemoveMember = async (memberId) => {
        if (!memberId || !user) return;

        // Prevent owner from being removed
        const targetMember = membersWithOnlineStatus.find(m => m.uid === memberId || m.id === memberId);
        if (targetMember?.isOwner) {
            toast.error("You cannot remove the circle owner.", toastStyles);
            return;
        }

        setRemovingMember(memberId);
        try {
            const result = await removeMemberFromCircle(circleId, memberId, user);

            if (result.success) {
                toast.success(result.message, toastStyles);
                dispatch(fetchCircleMembers(circleId));
                loadAvailableUsers();
            } else {
                toast.error(result.message, toastStyles);
            }
        } catch {
            toast.error("Failed to remove member. Please try again.", toastStyles);
        } finally {
            setRemovingMember(null);
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
