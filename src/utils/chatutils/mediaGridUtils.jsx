// Utility functions for media grid rendering

// Group consecutive media messages from the same sender
export const groupConsecutiveMedia = (messages) => {
  const grouped = [];
  let currentGroup = null;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const prevMsg = messages[i - 1];

    // Check if this message should be grouped with the previous one
    const shouldGroup =
      msg.messageType === "image" &&
      prevMsg &&
      prevMsg.messageType === "image" &&
      msg.senderId === prevMsg.senderId &&
      Math.abs(
        new Date(msg.timestamp?.toDate() || msg.timestamp) -
          new Date(prevMsg.timestamp?.toDate() || prevMsg.timestamp),
      ) < 60000; // Within 1 minute

    if (shouldGroup && currentGroup) {
      // Add to current group
      currentGroup.messages.push(msg);
      currentGroup.lastIndex = i;
    } else if (msg.messageType === "image") {
      // Start new group or single image
      currentGroup = {
        type: "media_group",
        messages: [msg],
        firstIndex: i,
        lastIndex: i,
        senderId: msg.senderId,
        senderName: msg.senderName,
      };
      grouped.push(currentGroup);
    } else {
      // Regular message
      grouped.push({ type: "regular", message: msg, index: i });
      currentGroup = null;
    }
  }

  return grouped;
};

// Render media grid based on number of images
export const renderMediaGrid = (mediaMessages, openImageSlider) => {
  const count = mediaMessages.length;

  if (count === 1) {
    const msg = mediaMessages[0];
    return (
      <div className="relative">
        <img
          src={msg.mediaData}
          alt="Shared image"
          className="max-h-80 max-w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
          onClick={() => openImageSlider(mediaMessages, 0)}
        />
      </div>
    );
  } else if (count === 2) {
    return (
      <div className="grid max-w-80 grid-cols-2 gap-1">
        {mediaMessages.map((msg, idx) => (
          <img
            key={msg.id || idx}
            src={msg.mediaData}
            alt="Shared image"
            className="h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
            onClick={() => openImageSlider(mediaMessages, idx)}
          />
        ))}
      </div>
    );
  } else if (count === 3) {
    return (
      <div className="grid max-w-80 grid-cols-2 gap-1">
        <img
          src={mediaMessages[0].mediaData}
          alt="Shared image"
          className="row-span-2 h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
          onClick={() => openImageSlider(mediaMessages, 0)}
        />
        <div className="grid grid-rows-2 gap-1">
          {mediaMessages.slice(1).map((msg, idx) => (
            <img
              key={msg.id || idx}
              src={msg.mediaData}
              alt="Shared image"
              className="h-[calc(10rem-0.125rem)] w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
              onClick={() => openImageSlider(mediaMessages, idx + 1)}
            />
          ))}
        </div>
      </div>
    );
  } else if (count === 4) {
    return (
      <div className="grid max-w-80 grid-cols-2 gap-1">
        {mediaMessages.map((msg, idx) => (
          <img
            key={msg.id || idx}
            src={msg.mediaData}
            alt="Shared image"
            className="h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
            onClick={() => openImageSlider(mediaMessages, idx)}
          />
        ))}
      </div>
    );
  } else {
    // 5+ images: show first 4 in 2x2 grid with "+X more" overlay on 4th
    const remaining = count - 4;
    return (
      <div className="grid max-w-80 grid-cols-2 gap-1">
        {/* First row */}
        <img
          src={mediaMessages[0].mediaData}
          alt="Shared image"
          className="h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
          onClick={() => openImageSlider(mediaMessages, 0)}
        />
        <img
          src={mediaMessages[1].mediaData}
          alt="Shared image"
          className="h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
          onClick={() => openImageSlider(mediaMessages, 1)}
        />

        {/* Second row */}
        <img
          src={mediaMessages[2].mediaData}
          alt="Shared image"
          className="h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
          onClick={() => openImageSlider(mediaMessages, 2)}
        />
        <div className="relative">
          <img
            src={mediaMessages[3].mediaData}
            alt="Shared image"
            className="h-40 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
            onClick={() => openImageSlider(mediaMessages, 3)}
          />
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/60"
            onClick={() => openImageSlider(mediaMessages, 3)}
          >
            <span className="text-lg font-bold text-white">+{remaining}</span>
          </div>
        </div>
      </div>
    );
  }
};
