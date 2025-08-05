import { useRef } from "react";

/**
 * Custom hook to handle poll modal operations
 * Manages poll modal ref and open/close handlers
 */
export function usePollModal() {
    const pollModalRef = useRef();

    const handleOpenPollModal = () => {
        pollModalRef.current.open();
    };

    const handleClosePollModal = () => {
        pollModalRef.current.close();
    };

    return {
        pollModalRef,
        handleOpenPollModal,
        handleClosePollModal
    };
}
