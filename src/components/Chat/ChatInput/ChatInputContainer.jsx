// libs
import { useRef, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase-config";
// hooks
import { useAutoDir } from "../../../hooks/useAutoDir"
import { useAuth } from '../../../hooks/useAuth';
// components
import ChatInputPresentational from "./ChatInputPresentational"

function ChatInputContainer({ circleId }) {
    const { dir, handleAutoDir } = useAutoDir();
    const msgVal = useRef();
    const { userName, userId } = useAuth();
    async function handleSendMsg(e) {
        e.preventDefault();
        const value = msgVal.current.value;
        if (!value.trim()) return;
        try {
            await addDoc(collection(db, "circles", circleId, "chat"), {
                messageType: "text",
                senderId: userId,
                senderName: userName,
                sentTime: new Date().toLocaleTimeString(),
                text: value,
                timestamp: serverTimestamp(),
            });
            msgVal.current.value = "";
        } catch (err) {
            console.log("msg error", err.msg);

        }
    }


    const adjustHeight = () => {
        const textarea = msgVal.current;
        if (!textarea) return;

        textarea.style.height = "auto"; // Reset the height
        const lineHeight = 24;
        const maxLines = 6;
        const maxHeight = lineHeight * maxLines;

        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

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
