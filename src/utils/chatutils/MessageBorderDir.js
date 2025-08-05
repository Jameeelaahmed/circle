export function getMessageRadius({ messages, idx, isMe, dir = 'ltr' }) {
    const msg = messages[idx];
    const prevMsg = messages[idx - 1];
    const nextMsg = messages[idx + 1];
    const isPrevSame = prevMsg && prevMsg.senderId === msg.senderId;
    const isNextSame = nextMsg && nextMsg.senderId === msg.senderId;

    // Helper to swap left/right classes for RTL
    function swapRadius(str) {
        if (dir !== 'rtl') return str;
        return str
            .replace(/tl/g, 'TMP')
            .replace(/tr/g, 'tl')
            .replace(/TMP/g, 'tr')
            .replace(/bl/g, 'BMP')
            .replace(/br/g, 'bl')
            .replace(/BMP/g, 'br');
    }

    let radius = '';
    if (isMe) {
        // Current user: left side rounded only
        if (!isPrevSame && isNextSame) {
            radius = 'rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-sm'; // first in group
        } else if (isPrevSame && isNextSame) {
            radius = 'rounded-bl-3xl rounded-tl-3xl rounded-tr-sm rounded-br-sm'; // middle in group
        } else if (isPrevSame && !isNextSame) {
            radius = 'rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-sm'; // last in group
        } else {
            radius = 'rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-3xl'; // single message
        }
    } else {
        // Other users: right side rounded only
        if (!isPrevSame && isNextSame) {
            radius = 'rounded-tr-3xl rounded-br-3xl rounded-tl-3xl rounded-bl-sm'; // first in group
        } else if (isPrevSame && isNextSame) {
            radius = 'rounded-br-3xl rounded-tr-3xl rounded-tl-sm rounded-bl-sm'; // middle in group
        } else if (isPrevSame && !isNextSame) {
            radius = 'rounded-tr-3xl rounded-br-3xl rounded-bl-3xl rounded-tl-sm'; // last in group
        } else {
            radius = 'rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-3xl'; // single message
        }
    }
    return swapRadius(radius);
}
