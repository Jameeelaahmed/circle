// libs
import { useSelector } from "react-redux";
// components
import ChatWindowPresentational from "./ChatWindowPresentational";
import { useState } from "react";

function ChatWindowContainer() {
  const selectedCircle = useSelector((state) => state.circles.selectedCircle);
  const circleId = selectedCircle?.id;
  const circleName = selectedCircle?.circleName;
  console.log(circleName);
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  return (
    <ChatWindowPresentational
      circleName={circleName}
      selectedCircle={selectedCircle}
      circleId={circleId}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      editingMessage={editingMessage}
      setEditingMessage={setEditingMessage}
    />
  );
}

export default ChatWindowContainer;
