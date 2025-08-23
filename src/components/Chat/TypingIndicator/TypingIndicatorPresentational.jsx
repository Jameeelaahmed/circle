
function TypingIndicatorPresentational({ getTypingText }) {
    return (
        <div className="px-4 py-2 text-sm text-text/60 flex items-center gap-2">
            {/* Animated typing dots */}
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span>{getTypingText()}</span>
        </div>
    )
}

export default TypingIndicatorPresentational
