const SendBtn = ({ isEditing }) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/80 rounded-full text-white transition-colors"
      title={isEditing ? "Save changes" : "Send message"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </button>
  );
};

export default SendBtn;
