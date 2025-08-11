import CircleCard from '../../components/CircleCard/CircleCard';
import Modal from '../../components/ui/Modal/Modal'
import LoginFormContainer from '../../components/AuthForms/Login/LoginFormContainer';
import RegisterFormContainer from '../../components/AuthForms/Register/RegisterFormContainer';
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
    pendingRequests
    // handleCloseAuthModal
}) {
    return (
        <>
            {!circles.length && <div className="text-center text-lg text-gray-400 py-10">No circles to show.</div>}
            <div className='mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
                {circles.map((circle) => (
                    <div key={circle.id} onClick={() => handleCardClick(circle)} user={user} className='cursor-pointer'>
                        <CircleCard
                            circle={circle}
                            membersByCircle={membersByCircle}
                            activeTab={activeTab}
                            profileInterests={profileInterests}
                            user={user}
                            handleJoinRequest={handleJoinRequest}
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
        </>
    )
}

export default CirclesPagePresentational;
