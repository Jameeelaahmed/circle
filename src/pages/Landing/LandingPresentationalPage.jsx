// libs
import { motion as Motion } from "framer-motion";
// components
import LandingIrregularCirclePaths from "../../components/ui/IrregularCirclePathes/LandingIrregularCirclePaths";
import FloatingAvatarContainer from "../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import CreateCircleModal from "../../components/ui/Modal/CreateCircleModal/CreateCircleModal";
import Modal from "../../components/ui/Modal/Modal";
export function LandingPresentationalPage({ t, openCCircleModal, createCircleModalRef }) {

    return (
        <div className="min-h-screen bg-main flex flex-col overflow-hidden">

            {/* Main Content */}
            <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center px-4 pt-16">
                {/* Left: Animated Intro Section */}
                <Motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex flex-col justify-center p-8 z-10"
                >
                    <div className="max-w-xl">
                        <Motion.h1
                            className="text-4xl md:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <span className="text-white">{t("From we should..")}</span>
                            <span className="block text-transparent bg-clip-text ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary to-accent">
                                {t("to we did!")}
                            </span>
                        </Motion.h1>

                        <Motion.p
                            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {t("Circle combats social drift by reducing the logistical friction of planning group activities.It provides a dedicated space for social circles to decide, plan, and relive their shared experiences,transforming intention into connection.")}
                        </Motion.p>

                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <button onClick={openCCircleModal} className="px-6 py-3 bg-primary rounded-lg text-white font-medium hover:shadow-lg hover:shadow-primary/30 transition-all">
                                {t("Create Circle")}
                            </button>
                            <Modal ref={createCircleModalRef}>
                                <CreateCircleModal />
                            </Modal>
                        </Motion.div>
                    </div>
                </Motion.div>

                {/* Right: Child Development Section */}
                <Motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex justify-center p-8 z-10"
                >
                    {/* Background elements */}
                    <LandingIrregularCirclePaths />
                    <FloatingAvatarContainer />

                </Motion.div>
            </div>
        </div>
    );
}