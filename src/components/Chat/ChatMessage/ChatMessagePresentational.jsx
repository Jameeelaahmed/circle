import Modal from "../../ui/Modal/Modal";
import DeleteMessageModalContainer from "../../ui/Modal/DeleteModal/DeleteMessageModalContainer";
import ImageSliderModal from "./ImageSliderModal";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";
import MediaGroupMessage from "./MediaGroupMessage";
import { groupConsecutiveMedia } from "../../../utils/chatutils/mediaGridUtils";
import { useState } from "react";

function ChatMessagePresentational({
  handleReact,
  messages,
  currentUser,
  messagesEndRef,
  getMessageRadius,
  dir,
  onMessageContextMenu,
  handleAction,
  menu,
  menuDirection,
  open,
  close,
  deleteModalRefs,
  onDeleteMessage,
  formatMessageDate,
  shouldShowDateSeparator,
  messageRefs,
  scrollToMessage,
  canEditMessage,
}) {
  const [imageSlider, setImageSlider] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  // Open image slider
  const openImageSlider = (images, startIndex = 0) => {
    setImageSlider({
      isOpen: true,
      images: images,
      currentIndex: startIndex,
    });
  };

  // Close image slider
  const closeImageSlider = () => {
    setImageSlider({
      isOpen: false,
      images: [],
      currentIndex: 0,
    });
  };

  // Navigate to next image
  const nextImage = () => {
    setImageSlider((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  // Navigate to previous image
  const prevImage = () => {
    setImageSlider((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? prev.images.length - 1
          : prev.currentIndex - 1,
    }));
  };

  const groupedMessages = groupConsecutiveMedia(messages);

  return (
    <div
      className="relative max-h-full space-y-3 overflow-y-auto px-4 py-2"
      dir={dir}
    >
      {messages.length === 0 && (
        <div className="py-8 text-center text-gray-400">
          No messages yet. Start a conversation!
        </div>
      )}

      {groupedMessages.map((item, idx) => {
        // Handle media groups
        if (item.type === "media_group") {
          return (
            <MediaGroupMessage
              key={`group-${item.firstIndex}-${item.lastIndex}`}
              item={item}
              currentUser={currentUser}
              groupedMessages={groupedMessages}
              idx={idx}
              shouldShowDateSeparator={shouldShowDateSeparator}
              formatMessageDate={formatMessageDate}
              messageRefs={messageRefs}
              onMessageContextMenu={onMessageContextMenu}
              openImageSlider={openImageSlider}
              dir={dir}
            />
          );
        }

        // Handle regular messages
        return (
          <SingleMessage
            key={item.message.id || item.index}
            msg={item.message}
            originalIdx={item.index}
            currentUser={currentUser}
            getMessageRadius={getMessageRadius}
            messages={messages}
            groupedMessages={groupedMessages}
            idx={idx}
            shouldShowDateSeparator={shouldShowDateSeparator}
            formatMessageDate={formatMessageDate}
            messageRefs={messageRefs}
            scrollToMessage={scrollToMessage}
            onMessageContextMenu={onMessageContextMenu}
            openImageSlider={openImageSlider}
            dir={dir}
          />
        );
      })}

      {/* Context Menu */}
      <MessageContextMenu
        menu={menu}
        menuDirection={menuDirection}
        currentUser={currentUser}
        handleAction={handleAction}
        handleReact={handleReact}
        canEditMessage={canEditMessage}
        open={open}
      />

      {/* Delete Message Modals - One for each message */}
      {deleteModalRefs?.current &&
        messages.map((msg) => (
          <Modal
            key={`modal-${msg.id}`}
            ref={(ref) => {
              if (ref && msg.id) {
                deleteModalRefs.current[msg.id] = ref;
              }
            }}
          >
            <DeleteMessageModalContainer
              close={() => close && close(msg.id)}
              message={msg}
              currentUser={currentUser}
              onDelete={onDeleteMessage}
            />
          </Modal>
        ))}

      {/* Image Slider Modal */}
      <ImageSliderModal
        imageSlider={imageSlider}
        closeImageSlider={closeImageSlider}
        nextImage={nextImage}
        prevImage={prevImage}
        setImageSlider={setImageSlider}
      />

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessagePresentational;
