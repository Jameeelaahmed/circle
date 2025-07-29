import SendBtn from "../../ui/ReactBits/SendBtn/SendBtn"

function ChatInputPresentational({ msgVal, handleSendMsg, handleInput, dir }) {
    return (
        <form onSubmit={(e) => handleSendMsg(e)} className="flex items-center">
            <textarea
                onInput={handleInput}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMsg(e);
                    }
                }}
                dir={dir}
                ref={msgVal}
                className="bg-inputsBg w-full p-5 rounded-2xl resize-none overflow-y-auto leading-6"
                rows={1}
            />
            <SendBtn />
        </form>
    )
}

export default ChatInputPresentational
