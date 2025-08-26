import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@mui/material";
import Modal from "../../ui/Modal/Modal";
import MembersModalContainer from "../../ui/Modal/MembersModal/MembersModalContainer";
import EventConfirmationStack from "../../EventConfirmation/EventConfirmationStack";
import { useParams } from "react-router";
import CircleDetailsContainer from "../../ui/Modal/CircleDetailsModal/CircleDetailsContainer";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import DeleteCircleModalContainer from "../../ui/Modal/DeleteCircleModal/DeleteCircleModalContainer";
import { Link } from "react-router";
function ChatSidebarPresentational({
  isOpen,
  toggleSidebar,
  members = [],
  loading = false,
  error = null,
  onShowAllMembers,
  membersModalRef,
  closeMembersModal,
  circleDetailsRef,
  onOpen,
  onClose,
  handleDeleteCircle,
  isDeleting,
  isOwner,
  openDeleteCircleModal,
  closeCircleDeleteModal,
  deleteCircleRef,
  currentCircle,
}) {
  // collapsible states
  const [openSections, setOpenSections] = useState({
    members: true,
    memories: true,
    events: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDirection(document.documentElement.dir || "ltr");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });
    return () => observer.disconnect();
  }, []);
  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { t } = useTranslation();
  const { circleId } = useParams();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [direction, setDirection] = useState("ltr");
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDirection(document.documentElement.dir || "ltr");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);
  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full">
      <button
        onClick={toggleSidebar}
        className={`from-bg-primary to-bg-secondary text-text hover:bg-primary/80 absolute top-1/2 z-50 -translate-y-1/2 rounded-lg bg-gradient-to-b p-1.5 backdrop-blur-sm transition-colors duration-200 ${isSmallScreen
          ? isOpen
            ? direction === "rtl"
              ? "-left-3"
              : "-right-3"
            : direction === "rtl"
              ? "right-0 translate-x-1/2"
              : "left-0 -translate-x-1/2"
          : direction === "rtl"
            ? "-left-3"
            : "-right-3"
          } `}
      >
        <ChevronLeft
          className={`h-3 w-3 transition-transform duration-300 ${direction === "rtl"
            ? isOpen
              ? ""
              : "rotate-180"
            : isOpen
              ? "rotate-180"
              : ""
            }`}
        />
      </button>

      {/* Small screen overlay */}
      {isSmallScreen && isOpen && (
        <div
          onClick={toggleSidebar}
          className="bg-main/40 fixed inset-0 z-40"
        />
      )}

      {/* Sidebar */}
      <Motion.div
        initial={{ width: isSmallScreen ? 0 : 280 }}
        animate={{
          width: isOpen ? 280 : 0,
          position: isSmallScreen ? "fixed" : "relative",
          ...(isSmallScreen
            ? direction === "rtl"
              ? { left: 0, right: "auto" }
              : { right: 0, left: "auto" }
            : { right: "auto", left: "auto" }),
          top: 0,
          height: "100%",
          zIndex: isSmallScreen ? 50 : "auto",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`h-full overflow-hidden backdrop-blur-sm ltr:rounded-tl-3xl ltr:rounded-bl-3xl rtl:rounded-tr-3xl rtl:rounded-br-3xl ${isOpen
          ? "bg-main/95 border-text/10"
          : "border-transparent bg-transparent"
          }`}
      >
        <div className="flex h-full w-70 flex-col">
          {/* Header */}
          <div className="border-text/10 flex items-center justify-between border-b p-3">
            <h3 className="text-text text-sm font-medium">
              {t("Circle Details")}
            </h3>
            <div className="flex items-center">
              <p
                className="text-primary cursor-pointer text-xs font-bold"
                onClick={onOpen}
              >
                {t("see details")}
              </p>
              {isOwner && (
                <button
                  className="rounded-full p-2 text-red-500 transition hover:bg-red-500/10 ltr:ml-2 rtl:mr-2"
                  title="Delete Circle"
                  onClick={() => openDeleteCircleModal(currentCircle)} // Pass the current circle!
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
            <Modal ref={circleDetailsRef}>
              <CircleDetailsContainer onClose={onClose} />
            </Modal>
            <Modal ref={deleteCircleRef}>
              <DeleteCircleModalContainer
                closeCircleDeleteModal={closeCircleDeleteModal}
                isDeleting={isDeleting}
                onDeleteCircle={handleDeleteCircle}
              />
            </Modal>
          </div>

          {/* Members */}
          <div className="border-text/10 flex flex-col border-b">
            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={() => toggleSection("members")}
                className="text-text flex items-center p-3 text-xs font-medium"
              >
                {t("Members")} ({members.length})
                <span className="ltr:ml-2 rtl:mr-2">
                  {openSections.members ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </span>
              </button>
              <button
                onClick={onShowAllMembers}
                className="text-primary hover:text-primary/80 text-xs transition-colors mr-2 ml-1"
              >
                {t("See more")}
              </button>
            </div>
            <AnimatePresence>
              {openSections.members && (
                <Motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div>
                    <div className="space-y-1">
                      {loading ? (
                        <div className="space-y-2">
                          {[...Array(4)].map((_, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 p-2"
                            >
                              <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                                sx={{
                                  bgcolor: "rgba(255, 255, 255, 0.1)",
                                  flexShrink: 0,
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <Skeleton
                                  variant="text"
                                  width="70%"
                                  height={16}
                                  sx={{
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    mb: 0.5,
                                  }}
                                />
                                <Skeleton
                                  variant="text"
                                  width="40%"
                                  height={12}
                                  sx={{
                                    bgcolor: "rgba(255, 255, 255, 0.08)",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : error ? (
                        <div className="p-2 text-center">
                          <p className="text-xs text-red-400">
                            {t("Error loading members")}
                          </p>
                        </div>
                      ) : members.length > 0 ? (
                        members
                          .sort((a, b) => {
                            if (a.isOnline && !b.isOnline) return -1;
                            if (!a.isOnline && b.isOnline) return 1;
                            return a.username.localeCompare(b.username);
                          })
                          .slice(0, 4)
                          .map((member) => (
                            <div
                              key={member.id || member.uid}
                              className="hover:bg-text/5 flex items-center space-x-2 rounded-lg p-2 transition-colors"
                            >
                              <div className="bg-primary relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                                {member.profileImage ? (
                                  <img
                                    src={member.photoURL}
                                    alt={member.username}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <span className="text-text text-xs font-medium">
                                    {member.username.charAt(0).toUpperCase()}
                                  </span>
                                )}
                                {member.isOnline && (
                                  <div className="border-main absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border bg-green-400"></div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-text truncate text-xs font-medium">
                                  {member.username}
                                </p>
                                <p
                                  className={`text-xs ${member.isOnline
                                    ? "text-green-400"
                                    : "text-text-400"
                                    }`}
                                >
                                  {member.isOnline ? t("Online") : t("Offline")}
                                </p>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="p-2 text-center">
                          <p className="text-text-400 text-xs">
                            {t("No members found")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Memories */}
          <div className="border-text/10  flex flex-col border-b">
            <button
              onClick={() => toggleSection("memories")}
              className="text-text flex items-center justify-between p-3 text-xs font-medium"
            >
              {t("Memories")}
              <Link to={`/circles/${circleId}/memories`}>See Memories</Link>
              {openSections.memories ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            <AnimatePresence>
              {openSections.memories && (
                <Motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden p-3"
                >
                  {/* Memories content */}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Events */}
          <div className="border-text/10 flex flex-1 flex-col overflow-hidden border-b">
            <button
              onClick={() => toggleSection("events")}
              className="text-text flex items-center justify-between p-3 text-xs font-medium"
            >
              {t("Events")}
              {openSections.events ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            <AnimatePresence>
              {openSections.events && (
                <Motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "100%", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 overflow-y-auto p-3"
                >
                  <EventConfirmationStack circleId={circleId} />
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Motion.div>

      {/* Members Modal */}
      <Modal ref={membersModalRef}>
        <MembersModalContainer
          members={members}
          loading={loading}
          error={error}
          closeModal={closeMembersModal}
        />
      </Modal>
    </div>
  );
}

export default ChatSidebarPresentational;
