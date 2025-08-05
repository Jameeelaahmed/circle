import LeaveCircleModalPresentational from './LeaveCircleModalPresentational';

function LeaveCircleModalContainer({ close, onConfirmLeave, circleName }) {
    const handleLeave = () => {
        if (onConfirmLeave) {
            onConfirmLeave();
        }
        close();
    };

    return (
        <LeaveCircleModalPresentational
            close={close}
            handleLeave={handleLeave}
            circleName={circleName}
        />
    );
}

export default LeaveCircleModalContainer;
