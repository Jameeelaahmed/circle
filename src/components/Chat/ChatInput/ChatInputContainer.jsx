// libs
import { useRef, useEffect } from "react";
// hooks
import { useAutoDir } from "../../../hooks/useAutoDir"
// components
import ChatInputPresentational from "./ChatInputPresentational"
function ChatInputContainer({ onSendMsg }) {
    const { dir, handleAutoDir } = useAutoDir();
    const msgVal = useRef();
    function handleSendMsg(e) {
        e.preventDefault();
        const value = msgVal.current.value;
        if (onSendMsg) {
            onSendMsg(value);
        }
        msgVal.current.value = "";
    }


    const adjustHeight = () => {
        const textarea = msgVal.current;
        if (!textarea) return;

        textarea.style.height = "auto"; // Reset the height
        const lineHeight = 24;
        const maxLines = 6;
        const maxHeight = lineHeight * maxLines;

        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

        // Force scroll if content exceeds
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    };


    function handleInput(e) {
        handleAutoDir(e.target.value)
        adjustHeight()
    }
    useEffect(() => {
        adjustHeight();
    }, []);
    return (
        <ChatInputPresentational msgVal={msgVal} handleSendMsg={handleSendMsg} handleInput={handleInput} dir={dir} />
    );
}

export default ChatInputContainer
