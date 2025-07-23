
// libs
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
// components
import LandingPresentational from "./LandingPresentational";

function LandingContainer() {
  const createCircleModalRef = useRef();
  const authModalRef = useRef();
  const { isLoggedIn } = useAuth()
  const { t } = useTranslation();
  function openCCircleModal() {
    createCircleModalRef.current.open();
  }
  function closeCCircleModal() {
    createCircleModalRef.current.close();
  }
  return (
    <LandingPresentational
      t={t}
      isLoggedIn={isLoggedIn}
      openCCircleModal={openCCircleModal}
      closeCCircleModal={closeCCircleModal}
      createCircleModalRef={createCircleModalRef}
      authModalRef={authModalRef}
    />
  );
}

export default LandingContainer;
