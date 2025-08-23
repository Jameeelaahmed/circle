import Skeleton from "@mui/material/Skeleton";
import { MoreVertical, Trash2, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
function ChatHeaderPresentational({
  circle,
  isLoading,
  menu,
  menuDirection,
  onMoreClick,
  onClearChat,
  onLeaveCircle,
  closeMenu,
  hasImage
}) {
  const { t } = useTranslation();
  useEffect(() => {
    function handleClick() {
      if (menu?.visible) closeMenu();
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [menu?.visible, closeMenu]);

  return (
    <>
      <div className="bg-main flex justify-between px-4 py-2 backdrop-blur-sm ltr:rounded-tr-3xl rtl:rounded-tl-3xl">
        {/* Left side: Image + Circle Name */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <>
              <Skeleton
                sx={{ bgcolor: "var(--color-inputsBg)" }}
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
              <Skeleton
                sx={{ bgcolor: "var(--color-inputsBg)" }}
                variant="rounded"
                width={100}
                height={40}
              />
            </>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-primary">
                {hasImage ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={circle.imageUrl}
                    alt={circle.circleName}
                  />
                ) : (
                  <span
                    className="text-xl font-bold text-text select-none font-secondary">
                    {circle.circleName?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              <p className="text-text">{circle.circleName}</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={onMoreClick}
            className="p-1 rounded-full hover:bg-text/10 transition-colors"
            aria-label="More options"
          >
            <MoreVertical size={24} color="var(--color-text)" />
          </button>
        </div>
      </div>

      {/* Context Menu */}
      {menu?.visible && (
        <div
          className={`fixed z-50 w-48 backdrop-blur-2xl rounded-xl shadow-xl border border-text/10 
                      flex flex-col text-sm select-none overflow-hidden
                      text-text bg-main/40 ${menuDirection === 'down' ? 'animate-dropdown' : 'animate-dropup'}`}
          style={{ left: `${menu.x}px`, top: `${menu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="px-4 py-3 hover:bg-primary/30 text-left transition-colors border-b border-text/10 flex items-center gap-2"
            onClick={onClearChat}
          >
            <Trash2 size={16} />
            {t("Clear Chat")}
          </button>
          <button
            className="px-4 py-3 hover:bg-accent/20 text-left text-accent transition-colors flex items-center gap-2"
            onClick={onLeaveCircle}
          >
            <LogOut size={16} />
            {t("Leave Circle")}
          </button>
        </div>
      )}
    </>
  );
}

export default ChatHeaderPresentational;
