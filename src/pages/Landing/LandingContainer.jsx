
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
  return (
    <LandingPresentational
      t={t}
      isLoggedIn={isLoggedIn}
      openCCircleModal={openCCircleModal}
      createCircleModalRef={createCircleModalRef}
      authModalRef={authModalRef}
    />
  );
}

export default LandingContainer;
