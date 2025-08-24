import Modal from "../../ui/Modal/Modal";
import DeleteMessageModalContainer from "../../ui/Modal/DeleteMessageModal/DeleteMessageModalContainer";
import ImageSliderModal from "./ImageSliderModal";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";
import MediaGroupMessage from "./MediaGroupMessage";
import { groupConsecutiveMedia } from "../../../utils/chatutils/mediaGridUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import YourContextMenuComponent from "./YourContextMenuComponent";
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
  handleMessageContextMenu,
  contextMenuMsg
}) {
  const { t } = useTranslation();
  const [imageSlider, setImageSlider] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });
  const [contextMenuMsg, setContextMenuMsg] = useState(null);

  const openImageSlider = (images, startIndex = 0) => {
    setImageSlider({ isOpen: true, images, currentIndex: startIndex });
  };
  const closeImageSlider = () => {
    setImageSlider({ isOpen: false, images: [], currentIndex: 0 });
  };
  const nextImage = () => {
    setImageSlider((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };
  const prevImage = () => {
    setImageSlider((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? prev.images.length - 1
          : prev.currentIndex - 1,
    }));
  };

  const handleMessageContextMenu = (e, msg) => {
    e.preventDefault();
    setContextMenuMsg(msg);
  };

  const groupedMessages = groupConsecutiveMedia(messages);

  return (
    <div
      className="relative max-h-full space-y-3 overflow-y-auto px-4 py-2"

    >
      {messages.length === 0 && (
        <div className="py-8 text-center text-text-400">
          {t("No messages yet. Start a conversation!")}
        </div>
      )}



      {groupedMessages.map((item, idx) => {
        if (item.message?.messageType === "system") {
          return (
            <div
              key={item.message.id || item.index}
              className="flex justify-center my-4"
            >
              <div className="bg-main/80 text-text px-6 py-2 rounded-xl text-center shadow-md">
                {item.message.text}
              </div>
            </div>
          );
        }
        // Media group
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
            onMessageContextMenu={handleMessageContextMenu}
            openImageSlider={openImageSlider}
            dir={dir}
            contextMenuMsg={contextMenuMsg}
            handleMessageContextMenu={handleMessageContextMenu}
          />
        );
      })}

      <MessageContextMenu
        menu={menu}
        menuDirection={menuDirection}
        currentUser={currentUser}
        handleAction={handleAction}
        handleReact={handleReact}
        canEditMessage={canEditMessage}
        open={open}
      />

      {deleteModalRefs?.current &&
        messages.map((msg) => (
          <Modal
            key={`modal-${msg.id}`}
            ref={(ref) => {
              if (ref && msg.id) deleteModalRefs.current[msg.id] = ref;
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

      <ImageSliderModal
        imageSlider={imageSlider}
        closeImageSlider={closeImageSlider}
        nextImage={nextImage}
        prevImage={prevImage}
        setImageSlider={setImageSlider}
      />

      {contextMenuMsg && (
        <YourContextMenuComponent
          message={contextMenuMsg}
          onClose={() => setContextMenuMsg(null)}
        />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessagePresentational;
