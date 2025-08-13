import CircleCardPresentational from './CircleCardPresentational';
import { useAuth } from '../../hooks/useAuth';

function CircleCardContainer({
    profileInterests,
    pendingRequests,
    circle,
    membersByCircle,
    activeTab,
    openDeleteCircleModal,
    closeCircleDeleteModal,
    handleJoinRequest
}) {
    const { user } = useAuth();
    const hasImage = !!circle.imageUrl;
    const members = membersByCircle?.[circle.id] || [];

    // Compute mutual and other interests
    const mutualInterests = (circle.interests || []).filter((interest) =>
        profileInterests?.includes(interest),
    );
    const otherInterests = (circle.interests || []).filter(
        (interest) => !profileInterests?.includes(interest),
    );
    // Combine, limit to 4
    const displayedInterests = [...mutualInterests, ...otherInterests].slice(
        0,
        4,
    );

    const isRequestPending = pendingRequests?.includes(circle.id);
    const isOwner = user && circle.createdBy.uid === user.uid;

    return (
        <CircleCardPresentational
            hasImage={hasImage}
            members={members}
            displayedInterests={displayedInterests}
            isRequestPending={isRequestPending}
            circle={circle}
            membersByCircle={membersByCircle}
            isOwner={isOwner}
            openDeleteCircleModal={openDeleteCircleModal}
            closeCircleDeleteModal={closeCircleDeleteModal}
            user={user}
            activeTab={activeTab}
            handleJoinRequest={handleJoinRequest}
        />
    );
}

export default CircleCardContainer;
