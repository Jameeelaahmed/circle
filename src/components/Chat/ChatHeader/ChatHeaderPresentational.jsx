import Skeleton from "@mui/material/Skeleton";
import { BarChart2, MoreVertical } from "lucide-react";
import CreatePollModalContainer from "../../ui/Modal/Poll/CreatePollModalContainer";
import Modal from "../../ui/Modal/Modal";

function ChatHeaderPresentational({
  pollRef,
  circle,
  isLoading,
  handleOpenPollModal,
  handleClosePollModal,
}) {
  return (
    <div className="bg-main flex justify-between px-4 py-2 backdrop-blur-sm">
      {/* Left side: Image + Circle Name */}
      <div className="flex items-center gap-2">
        {isLoading ? (
          <>
            <Skeleton
              sx={{ bgcolor: "var(--color-inputsBg)" }}
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              sx={{ bgcolor: "var(--color-inputsBg)" }}
              variant="rounded"
              width={100}
              height={40}
            />{" "}
          </>
        ) : (
          <>
            <img
              src={circle.imageUrl}
              alt={circle.circleName}
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-white">{circle.circleName}</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1" onClick={handleOpenPollModal}>
          <BarChart2 size={20} color="white" />
          <span className="text-white">Poll</span>
          <Modal ref={pollRef}>
            <CreatePollModalContainer onClose={handleClosePollModal} />
          </Modal>
        </div>
        <MoreVertical size={24} color="white" />
      </div>
    </div>
  );
}

export default ChatHeaderPresentational;
