import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="from-primary to-secondary flex h-[60vh] flex-col items-center justify-center bg-gradient-to-r text-center">
      <h1 className="mb-6 text-6xl font-bold text-shadow-lg md:text-8xl">
        {t("about.About Circle")}
      </h1>
      <p
        className="mx-auto mb-8 max-w-4xl text-xl opacity-90 md:text-2xl"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {t("about.header")}
      </p>
      <Link
        to="/login"
        className="bg-primary flex size-32 items-center justify-center rounded-full p-7 text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:text-white"
      >
        {t("about.Join")} <br />
        {t("about.Circle")}
      </Link>
    </section>
  );
};

export default Hero;
