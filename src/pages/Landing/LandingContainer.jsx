import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { LandingPresentationalPage } from "./LandingPresentationalPage";

function LandingContainer() {
    const createCircleModalRef = useRef();
    const { t } = useTranslation();
    function openCCircleModal() {
        createCircleModalRef.current.open();
    }
    return (
        <LandingPresentationalPage t={t} openCCircleModal={openCCircleModal} createCircleModalRef={createCircleModalRef} />
    )
}

export default LandingContainer
