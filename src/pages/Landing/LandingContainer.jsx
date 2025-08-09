// libs
import { useTranslation } from "react-i18next";
import { memo, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
// components
import LandingPresentational from "./LandingPresentational";

function LandingContainer() {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();
  const authModalRef = useRef();
  const createCircleModalRef = useRef();
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

export default memo(LandingContainer);
