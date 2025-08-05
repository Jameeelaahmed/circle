import ClearChatModalPresentational from './ClearChatModalPresentational';

function ClearChatModalContainer({ close, onConfirmClear }) {
    const handleClear = () => {
        if (onConfirmClear) {
            onConfirmClear();
        }
        close();
    };

    return (
        <ClearChatModalPresentational
            close={close}
            handleClear={handleClear}
        />
    );
}

export default ClearChatModalContainer;
