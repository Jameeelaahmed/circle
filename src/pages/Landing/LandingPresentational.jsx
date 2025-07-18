// libs
import { motion as Motion } from "framer-motion";
// components
import LandingIrregularCirclePaths from "../../components/ui/IrregularCirclePathes/LandingIrregularCirclePaths";
import FloatingAvatarContainer from "../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import CreateCircleModalContainer from "../../components/ui/Modal/CreateCircleModal/CreateCircleModalContainer";
import Modal from "../../components/ui/Modal/Modal"
import LoginFormContainer from "../../components/AuthForms/Login/LoginFormContainer";
import RegisterFormContainer from "../../components/AuthForms/Register/RegisterFormContainer";
import { useState } from "react";

export default function LandingPresentational({
  t,
  isLoggedIn,
  openCCircleModal,
  createCircleModalRef,
}) {
  const [authFormType, setAuthFormType] = useState("login"); // "login" or "register"

  const handleSwitchToRegister = () => setAuthFormType("register");
  const handleSwitchToLogin = () => setAuthFormType("login");

  return (
    <div className="bg-main flex min-h-screen flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex h-screen w-full flex-col items-center justify-center px-4 pt-16 md:flex-row">
        {/* Left: Animated Intro Section */}
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex w-full flex-col justify-center p-8 md:w-1/2"
        >
          <div className="max-w-xl">
            <Motion.h1
              className="mb-6 text-4xl font-bold md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">{t("From we should..")}</span>
              <span className="from-primary to-accent block bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
                {t("to we did!")}
              </span>
            </Motion.h1>

            <Motion.p
              className="mb-8 text-lg leading-relaxed text-gray-300 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t(
                "Circle combats social drift by reducing the logistical friction of planning group activities.It provides a dedicated space for social circles to decide, plan, and relive their shared experiences,transforming intention into connection.",
              )}
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={() => {
                  setAuthFormType("login");
                  openCCircleModal();
                }}
                className="bg-primary hover:shadow-primary/30 rounded-lg px-6 py-3 font-medium text-white transition-all hover:shadow-lg"
              >
                {t("Create Circle")}
              </button>
              <Modal ref={createCircleModalRef}>
                {isLoggedIn ? (
                  <CreateCircleModalContainer />
                ) : authFormType === "login" ? (
                  <LoginFormContainer onSwitchToRegister={handleSwitchToRegister} />
                ) : (
                  <RegisterFormContainer onSwitchToLogin={handleSwitchToLogin} />
                )}
              </Modal>
            </Motion.div>
          </div>
        </Motion.div>

        {/* Right: Child Development Section */}
        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex w-full justify-center p-8 md:w-1/2"
        >
          {/* Background elements */}
          <LandingIrregularCirclePaths />
          <FloatingAvatarContainer />
        </Motion.div>
      </div>
    </div>
  );
}
