import Modal from '../../components/ui/Modal/Modal'
import LoginFormContainer from '../../components/AuthForms/Login/LoginFormContainer';
import RegisterFormContainer from '../../components/AuthForms/Register/RegisterFormContainer';
import CircleCardContainer from '../../components/CircleCard/CircleCardContainer';
import DeleteCircleModalContainer from '../../components/ui/Modal/DeleteCircleModal/DeleteCircleModalContainer';
function CirclesPagePresentational({
    circles,
    membersByCircle,
    handleCardClick,
    activeTab,
    profileInterests,
    user,
    handleJoinRequest,
    handleSwitchToRegister,
    handleSwitchToLogin,
    authFormType,
    authModalRef,
    pendingRequests,
    deleteCircleRef,
    openDeleteCircleModal,
    closeCircleDeleteModal,
    onDeleteCircle,
    isDeleting,
    circleName
    // handleCloseAuthModal
}) {
    return (
        <>
            {!circles.length && <div className="text-center text-lg text-text-400 py-10">No circles to show.</div>}
            <div className='mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
                {circles.map((circle) => (
                    <div key={circle.id} onClick={() => handleCardClick(circle)} user={user} className='cursor bg-main rounded-3xl'>
                        <CircleCardContainer
                            circle={circle}
                            membersByCircle={membersByCircle}
                            activeTab={activeTab}
                            profileInterests={profileInterests}
                            user={user}
                            handleJoinRequest={handleJoinRequest}
                            openDeleteCircleModal={openDeleteCircleModal}
                            pendingRequests={pendingRequests} />
                    </div>
                ))}
            </div>
            <Modal ref={authModalRef}>
                {authFormType === "login" ? (
                    <LoginFormContainer
                        onSwitchToRegister={handleSwitchToRegister}
                    />
                ) : (
                    <RegisterFormContainer onSwitchToLogin={handleSwitchToLogin} />
                )}
            </Modal>
            <Modal ref={deleteCircleRef}>
                <DeleteCircleModalContainer
                    onDeleteCircle={onDeleteCircle}
                    closeCircleDeleteModal={closeCircleDeleteModal}
                    isDeleting={isDeleting}
                    circleName={circleName}
                />
            </Modal>
        </>
    )
}

export default CirclesPagePresentational;
