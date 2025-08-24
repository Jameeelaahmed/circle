import { useState } from "react";
import ChatHeaderContainer from "../ChatHeader/ChatHeaderContainer";
import ChatInputContainer from "../ChatInput/ChatInputContainer";
import ChatMessageContainer from "../ChatMessage/ChatMessageContainer";
import CircleScreen from "../../Voting/CircleScreen/CircleScreen";
function ChatWindowPresentational({
  circleName,
  selectedCircle,
  circleId,
  replyTo,
  setReplyTo,
  setEditingMessage,
  editingMessage,
}) {
  const [pollDocId, setPollDocId] = useState(null);
  const [showStepper, setShowStepper] = useState(false);
  return (
    <div className="flex h-full relative min-h-0 max-w-full flex-col overflow-hidden bg-gradient-to-b from-bg-primary to-bg-secondary shadow-lg ltr:rounded-tr-3xl ltr:rounded-br-3xl rtl:rounded-tl-3xl rtl:rounded-bl-3xl">
      <div className="shrink-0">
        <ChatHeaderContainer circle={selectedCircle} />
      </div>
      <div className="absolute left-0 right-0 top-[56px] mx-auto flex justify-center z-[1]">
        <CircleScreen />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-end overflow-y-auto">
        <ChatMessageContainer
          pollDocId={pollDocId}
          circleName={circleName}
          circleId={circleId}
          setReplyTo={setReplyTo}
          setEditingMessage={setEditingMessage}
          showStepper={showStepper}
          setShowStepper={setShowStepper}
        />
      </div>
      <div className="min-w-0 shrink-0">
        <ChatInputContainer
          showStepper={showStepper}
          setShowStepper={setShowStepper}
          circleName={circleName}
          circleId={circleId}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          setPollDocId={setPollDocId}
          pollDocId={pollDocId}
        />
      </div>
    </div>
  );
}

export default ChatWindowPresentational;
