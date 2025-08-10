// libs
import { motion as Motion } from "framer-motion";
// components
import FloatingAvatarContainer from "../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import CreateCircleModalContainer from "../../components/ui/Modal/CreateCircleModal/CreateCircleModalContainer";
import Modal from "../../components/ui/Modal/Modal";
import LoginFormContainer from "../../components/AuthForms/Login/LoginFormContainer";
import RegisterFormContainer from "../../components/AuthForms/Register/RegisterFormContainer";
import { useState } from "react";
import mainImg from '../../assets/image.png'
export default function LandingPresentational({
  t,
  isLoggedIn,
  openCCircleModal,
  createCircleModalRef,
  closeCCircleModal,
}) {
  const [authFormType, setAuthFormType] = useState("login"); // "login" or "register"

  const handleSwitchToRegister = () => setAuthFormType("register");
  const handleSwitchToLogin = () => setAuthFormType("login");

  return (
    <div className="flex h-screen flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${mainImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div className="h-screen w-full flex-col items-center justify-center px-4 md:flex-row overflow-hidden"> */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-paddingTop z-10 flex min-h-screen w-full flex-col items-center pb-8 pr-8 pl-8"
      >
        <div className="max-w-xl mt-18">
          <Motion.h1
            className="mb-6 text-center text-4xl font-bold md:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white">{t("From we should..")}</span>
            <span className="from-secondary to-primary block bg-gradient-to-l bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
              {t("to we did!")}
            </span>
          </Motion.h1>

          <Motion.p
            className="mb-8 text-center text-lg leading-relaxed text-gray-300 md:text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t(
              "Circle combats social drift by reducing the logistical friction of planning group activities.It provides a dedicated space for social circles to decide, plan, and relive their shared experiences,transforming intention into connection.",
            )}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <button
              onClick={() => {
                setAuthFormType("login");
                openCCircleModal();
              }}
              className="bg-main shadow-main border-primary cursor-pointer rounded-lg border px-6 py-3 font-medium text-white transition-all hover:scale-95 hover:shadow-none"
            >
              {t("Create Circle")}
            </button>
            <Modal ref={createCircleModalRef}>
              {isLoggedIn ? (
                <CreateCircleModalContainer closeModal={closeCCircleModal} />
              ) : authFormType === "login" ? (
                <LoginFormContainer
                  onSwitchToRegister={handleSwitchToRegister}
                />
              ) : (
                <RegisterFormContainer onSwitchToLogin={handleSwitchToLogin} />
              )}
            </Modal>
          </Motion.div>
        </div>
      </Motion.div>

      {/* Right: Child Development Section */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 hidden md:flex w-full justify-center p-8 md:w-1/2"
      >
        {/* <LandingIrregularCirclePaths /> */}
        <FloatingAvatarContainer />
      </Motion.div>
      {/* </div> */}
    </div>
  );
}
