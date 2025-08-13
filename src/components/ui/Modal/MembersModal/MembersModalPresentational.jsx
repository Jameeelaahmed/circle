import { X, UserPlus, Crown, Shield, ShieldCheck, UserMinus, AlertTriangle } from "lucide-react";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import Select from "react-select";
import ModalHeading from "../ModalHeading/ModalHeading";
import customSelectStyles from "../CreateCircleModal/customSelectStyles.JS";

function MembersModalPresentational({
    members,
    loading,
    error,
    onClose,
    availableUsers,
    selectedNewMembers,
    setSelectedNewMembers,
    onAddMembers,
    addingMembers,
    currentUser,
    onToggleAdmin,
    updatingAdmin,
    onRemoveMember,
    removingMember
}) {
    // Confirmation state - inline confirmation instead of separate modal
    const [confirmRemoval, setConfirmRemoval] = useState(null); // Will store { memberId, memberName }

    const handleRemoveClick = (memberId, memberName) => {
        setConfirmRemoval({ memberId, memberName });
    };

    const handleConfirmRemoval = () => {
        if (confirmRemoval) {
            onRemoveMember(confirmRemoval.memberId);
            // Clear confirmation immediately after triggering removal
            setConfirmRemoval(null);
        }
    };

    const handleCancelRemoval = () => {
        setConfirmRemoval(null);
    };

    // Remove duplicates and filter out any invalid members
    const uniqueMembers = members.filter((member, index, self) => {
        // Remove duplicates based on id or uid
        const memberId = member.id || member.uid;
        if (!memberId) return false; // Exclude members without valid IDs

        return index === self.findIndex(m => (m.id || m.uid) === memberId);
    });

    const isCurrentUserAdmin = uniqueMembers.find(m => (m.id || m.uid) === currentUser?.uid)?.isAdmin || false;

    return (
        <div className="w-full max-w-4xl">
            {/* Header */}
            <ModalHeading title="Circle Members" onClose={onClose} />

            {/* Add Member Section - Only for Admins */}
            {isCurrentUserAdmin && (
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Add New Member
                    </h4>
                    <div className="flex gap-3 items-start">
                        <div className="flex-1 min-w-0">
                            <div className="max-w-md"> {/* Fixed max width container */}
                                <Select
                                    isMulti
                                    options={availableUsers}
                                    value={selectedNewMembers}
                                    onChange={setSelectedNewMembers}
                                    placeholder="Select users to add..."
                                    styles={customSelectStyles}
                                    isSearchable
                                    isClearable
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => selectedNewMembers && selectedNewMembers.length > 0 && onAddMembers(selectedNewMembers.map(member => member.value))}
                            disabled={!selectedNewMembers || selectedNewMembers.length === 0 || addingMembers}
                            className="flex-shrink-0 px-4 py-2 h-12 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                        >
                            {addingMembers ? 'Adding...' : `Add ${selectedNewMembers?.length || 0} member${selectedNewMembers?.length !== 1 ? 's' : ''}`}
                        </button>
                    </div>
                </div>
            )}

            {/* Inline Confirmation Section */}
            {confirmRemoval && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-500/20 rounded-full">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-medium mb-2">Remove Member</h4>
                            <p className="text-gray-300 text-sm mb-4">
                                Are you sure you want to remove <span className="font-medium text-white">{confirmRemoval.memberName}</span> from the circle? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancelRemoval}
                                    disabled={removingMember === confirmRemoval.memberId}
                                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmRemoval}
                                    disabled={removingMember === confirmRemoval.memberId}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {removingMember === confirmRemoval.memberId ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Removing...
                                        </div>
                                    ) : (
                                        'Remove Member'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3">
                                <Skeleton
                                    variant="circular"
                                    width={48}
                                    height={48}
                                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                                />
                                <div className="flex-1">
                                    <Skeleton
                                        variant="text"
                                        width="60%"
                                        height={20}
                                        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 1 }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="40%"
                                        height={16}
                                        sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-400 mb-2">Error loading members</p>
                        <p className="text-gray-400 text-sm">{error}</p>
                    </div>
                ) : uniqueMembers.length > 0 ? (
                    <div className="space-y-2">
                        {uniqueMembers.map((member) => {
                            const memberId = member.id || member.uid;
                            return (
                                <div
                                    key={memberId}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-primary flex-shrink-0">
                                            {member.profileImage || member.photoURL ? (
                                                <img
                                                    src={member.imageUrl || member.photoURL}
                                                    alt={member.username}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white text-lg font-medium">
                                                    {(member.username || 'M').charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-medium truncate">
                                                    {member.username || 'Unknown Member'}
                                                </p>
                                                {member.isOwner && (
                                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-semibold">
                                                        Circle Owner
                                                    </span>
                                                )}
                                                {!member.isOwner && member.isAdmin && (
                                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <div className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
                                                <p className={`text-sm ${member.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                                                    {member.isOnline ? 'Online' : 'Offline'}
                                                </p>
                                            </div>
                                            {member.email && (
                                                <p className="text-xs text-gray-400 mt-1 truncate">
                                                    {member.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Admin Controls - Only for admins and not for themselves */}
                                    {isCurrentUserAdmin && memberId !== currentUser?.uid && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onToggleAdmin(memberId, !member.isAdmin)}
                                                disabled={updatingAdmin === memberId}
                                                className={`p-2 rounded-lg transition-colors ${member.isAdmin
                                                    ? 'text-yellow-400 hover:bg-yellow-400/10'
                                                    : 'text-gray-400 hover:bg-white/10'
                                                    } disabled:opacity-50`}
                                                title={member.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                            >
                                                {updatingAdmin === memberId ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : member.isAdmin ? (
                                                    <ShieldCheck className="w-4 h-4" />
                                                ) : (
                                                    <Shield className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleRemoveClick(memberId, member.username || 'this member')}
                                                disabled={removingMember === memberId}
                                                className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                                                title="Remove Member"
                                            >
                                                {removingMember === memberId ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <UserMinus className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No members found</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400 text-center">
                    Total members: {uniqueMembers.length}
                </p>
            </div>
        </div>
    );
}

export default MembersModalPresentational;
