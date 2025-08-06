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
    const [selectedNewMembers, setSelectedNewMembers] = useState([]); // Changed to array
    const [addingMembers, setAddingMembers] = useState(false); // Changed name

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
    }, [circleId, members]); // Re-run when members change

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

    const handleAddMembers = async () => {
        console.log('🔍 handleAddMembers called with:', {
            selectedMembers: selectedNewMembers,
            selectedCount: selectedNewMembers.length,
            user: user?.uid,
            circleId
        });

        if (!selectedNewMembers.length || !user) {
            console.error('❌ Missing data:', {
                hasSelectedMembers: selectedNewMembers.length > 0,
                hasUser: !!user
            });
            toast.error("Please select at least one member to add", toastStyles);
            return;
        }

        setAddingMembers(true);
        console.log('🚀 Starting to add members...');

        try {
            let successCount = 0;
            let errorCount = 0;

            // Extract user IDs from selected members (they are objects with {value, label} structure)
            const memberIds = selectedNewMembers.map(member => member.value);
            console.log('📋 Extracted member IDs:', memberIds);

            // Add all selected members
            for (const memberUid of memberIds) {
                console.log(`➕ Adding member: ${memberUid}`);
                const result = await addMemberToCircle(circleId, memberUid, user);
                console.log(`📊 Result for ${memberUid}:`, result);

                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                    console.error(`❌ Failed to add ${memberUid}:`, result.message);
                }
            }

            console.log('📈 Final results:', { successCount, errorCount });

            if (successCount > 0) {
                toast.success(`Added ${successCount} member(s) successfully`, toastStyles);
                setSelectedNewMembers([]);

                // Refresh members and available users
                dispatch(fetchCircleMembers(circleId));
                loadAvailableUsers();
                console.log('✅ Refreshed members and available users');
            }

            if (errorCount > 0) {
                toast.error(`Failed to add ${errorCount} member(s)`, toastStyles);
            }
        } catch (error) {
            console.error('❌ Error in handleAddMembers:', error);
            toast.error("Failed to add members. Please try again.", toastStyles);
        } finally {
            setAddingMembers(false);
            console.log('🏁 handleAddMembers completed');
        }
    };

    const handleToggleAdmin = async (targetMemberUid, makeAdmin) => {
        if (!targetMemberUid || !user) return;

        setUpdatingAdmin(targetMemberUid);
        try {
            const result = await toggleMemberAdminRole(circleId, targetMemberUid, makeAdmin, user);

            if (result.success) {
                toast.success(result.message, toastStyles);

                // Refresh members
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

    const handleRemoveMember = async (memberUid) => {
        if (!memberUid || !user) return;

        setRemovingMember(memberUid);
        try {
            const result = await removeMemberFromCircle(circleId, memberUid, user);

            if (result.success) {
                toast.success(result.message, toastStyles);

                // Refresh members and available users
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
            // Add member functionality
            availableUsers={availableUsers}
            selectedNewMembers={selectedNewMembers}
            setSelectedNewMembers={setSelectedNewMembers}
            onAddMembers={handleAddMembers}
            addingMembers={addingMembers}
            // Admin management
            currentUser={user}
            onToggleAdmin={handleToggleAdmin}
            updatingAdmin={updatingAdmin}
            // Remove member functionality
            onRemoveMember={handleRemoveMember}
            removingMember={removingMember}
        />
    );
}

export default MembersModalContainer;
