// libs
import { motion as Motion } from "framer-motion";
// components
import FloatingAvatarContainer from "../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import CreateCircleModalContainer from "../../components/ui/Modal/CreateCircleModal/CreateCircleModalContainer";
import Modal from "../../components/ui/Modal/Modal";
import LoginFormContainer from "../../components/AuthForms/Login/LoginFormContainer";
import RegisterFormContainer from "../../components/AuthForms/Register/RegisterFormContainer";
import { useContext, useEffect, useState } from "react";
import mainImg from "../../assets/image.png";
import lightImg from "../../assets/light.png";
import { ThemeContext } from "../../contexts/ThemeContext";
import Stepper, { Step } from "../../components/ui/Stepper/Stepper";
import friends from "../../assets/images/friendsjpg.jpg";
import DefaultState from "../../components/Voting/DefaultState/DefaultState";
export default function LandingPresentational({
  t,
  isLoggedIn,
  openCCircleModal,
  createCircleModalRef,
  closeCCircleModal,
}) {
  const [authFormType, setAuthFormType] = useState("login");
  const { darkMode } = useContext(ThemeContext);

  const bgImage = darkMode ? lightImg : mainImg;

  const handleSwitchToRegister = () => setAuthFormType("register");
  const handleSwitchToLogin = () => setAuthFormType("login");

  // useEffect(() => {
  //   setBgImage(darkMode ? lightImg : mainImg);
  // }, [darkMode]);

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      key={darkMode ? "dark" : "light"}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-paddingTop z-10 flex min-h-screen w-full flex-col items-center pb-8 pr-8 pl-8"
      >
        <div className="max-w-xl mt-18">
          <Motion.h1
            className="mb-6 text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-text ltr:font-secondary">{t("From we should..")}</span>
            <span className="ltr:font-secondary from-secondary to-primary block bg-gradient-to-l bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
              {t("to we did!")}
            </span>
          </Motion.h1>

          <Motion.p
            className="mb-8 text-center text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-text-300 text-text"
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
              className="bg-main shadow-main border-primary cursor-pointer rounded-lg border px-6 py-3 font-medium text-text transition-all hover:scale-95 hover:shadow-none"
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
      </Motion.div> */}

      <Motion.div>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <h2>Welcome to <span className="ltr:font-secondary inline-block font-extrabold from-secondary to-primary bg-gradient-to-l bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">Circle</span> where events are made!</h2>
            <p>Check out the next step!</p>
          </Step>
          <Step>
            <h2>Step 2</h2>
            <img
              style={{
                height: "100px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center -70px",
                borderRadius: "15px",
                marginTop: "1em",
              }}
              src={friends}
            />
            <p>Create circles with your people!</p>
          </Step>
          <Step>
           <div className="h-[150px]">
             <h2>Where you can start poll and vote on it?</h2>
           <div className="relative  left-[50%] top-[50%] translate-x-[-30%] ">
            <DefaultState />
           </div>
           </div>
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>You made it!</p>
          </Step>
        </Stepper>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 hidden w-full justify-center p-8 md:flex md:w-1/2"
      >
        <FloatingAvatarContainer />
      </Motion.div>
    </div>
  );
}
