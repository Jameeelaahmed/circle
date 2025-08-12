import { useRef } from "react";

export function usePollModal() {
  const pollModalRef = useRef();

  const handleOpenPollModal = () => {
    if (pollModalRef.current?.open) {
      pollModalRef.current.open(); // Calls showModal
    }
  };

  const handleClosePollModal = () => {
    if (pollModalRef.current?.close) {
      pollModalRef.current.close(); // Calls close
    }
  };

  return {
    pollModalRef,
    handleOpenPollModal,
    handleClosePollModal,
  };
}
