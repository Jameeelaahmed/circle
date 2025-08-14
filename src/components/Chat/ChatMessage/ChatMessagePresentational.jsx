import Modal from "../../ui/Modal/Modal";
import DeleteMessageModalContainer from "../../ui/Modal/DeleteModal/DeleteMessageModalContainer";
import ImageSliderModal from "./ImageSliderModal";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";
import MediaGroupMessage from "./MediaGroupMessage";
import { groupConsecutiveMedia } from "../../../utils/chatutils/mediaGridUtils";
import { useState} from "react";
import CircleScreen from "../../Voting/CircleScreen/CircleScreen";


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

  const groupedMessages = groupConsecutiveMedia(messages);

  return (
    <div
      className="relative max-h-full space-y-3 overflow-y-auto px-4 py-2"
   
    >
      
      
          <div className="fixed top-32 right-[30%] z-[99999] sm:right-[34%] md:right-[30%] xl:right-[38%] transform md:translate-x-[-50%]">
             <CircleScreen />
          </div>
          

      {messages.length === 0 && (
        <div className="py-8 text-center text-gray-400">
          No messages yet. Start a conversation!
        </div>
      )}

      {groupedMessages.map((item, idx) => {
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
            onMessageContextMenu={onMessageContextMenu}
            openImageSlider={openImageSlider}
            dir={dir}
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

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessagePresentational;
