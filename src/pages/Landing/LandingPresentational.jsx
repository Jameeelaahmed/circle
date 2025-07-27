// libs
import { motion as Motion } from "framer-motion";
// components
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
  closeCCircleModal
}) {
  const [authFormType, setAuthFormType] = useState("login"); // "login" or "register"

  const handleSwitchToRegister = () => setAuthFormType("register");
  const handleSwitchToLogin = () => setAuthFormType("login");

  return (
    <div className="bg-white flex h-screen flex-col overflow-hidden">
      {/* <div className="h-screen w-full flex-col items-center justify-center px-4 md:flex-row overflow-hidden"> */}
      <Motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex w-full flex-col items-center pt-paddingTop p-8 min-h-screen"
      >
        <div className="max-w-xl">
          <Motion.h1
            className="mb-6 text-4xl font-bold md:text-6xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white">{t("From we should..")}</span>
            <span className="bg-gradient-to-l from-secondary to-primary block bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
              {t("to we did!")}
            </span>
          </Motion.h1>

          <Motion.p
            className="mb-8 text-lg leading-relaxed text-gray-300 md:text-xl text-center"
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
            className="text-center"
          >
            <button
              onClick={() => {
                setAuthFormType("login");
                openCCircleModal();
              }}
              className="bg-main shadow-main rounded-lg px-6 py-3 border border-primary font-medium text-white transition-all cursor-pointer hover:shadow-none hover:scale-95"
            >
              {t("Create Circle")}
            </button>
            <Modal ref={createCircleModalRef}>
              {isLoggedIn ? (
                <CreateCircleModalContainer closeModal={closeCCircleModal} />
              ) : authFormType === "login" ? (
                <LoginFormContainer onSwitchToRegister={handleSwitchToRegister} />
              ) : (
                <RegisterFormContainer onSwitchToLogin={handleSwitchToLogin} />
              )}
            </Modal>
          </Motion.div>
        </div>
      </Motion.div>

      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
          background: "radial-gradient(102.03% 100% at 51.22% 0%, #17284F 0%, #081020 67.67%, #13244F 74.71%, #253977 76.59%, #45519C 76.69%, #5A61AC 78.98%, #817DC6 81.74%, #9B90D5 83.77%, #CDB8EE 85.33%, #D9B9ED 87.36%, #EDD7FB 90.33%, #D9C5F3 94.86%, rgba(255, 255, 255, 0) 100%)",
          filter: "blur(30px)",
          zIndex: 0,
          pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(to bottom, #fff 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #fff 90%, transparent 100%)"
        }}
      />
      {/* Right: Child Development Section */}
      <Motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex w-full justify-center p-8 md:w-1/2"
      >
        {/* <LandingIrregularCirclePaths /> */}
        <FloatingAvatarContainer />
      </Motion.div>
      {/* </div> */}
    </div>
  );
}
