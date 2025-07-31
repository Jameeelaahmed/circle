import { Heart, Target, Users2, Sparkles, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisionAndMission = () => {
  const {t} = useTranslation();
  const values = [
    {
      icon: Users2,
      title: t("about.Connection"),
      description: t("about.Connection_description"),
    },
    {
      icon: Sparkles,
      title: t("about.Innovation"),
      description: t("about.Innovation_description"),
    },
    {
      icon: Shield,
      title: t("about.Privacy"),
      description: t("about.Privacy_description"),
    },
  ];
  return (
    <>
      {/* Vision & Mission Section */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2
              className="mb-6 text-5xl font-bold"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
            >
              {t("about.Vision & Mission")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              {t("about.Building meaningful connections in the digital age")}
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Vision Card */}
            <div
              className="rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "var(--shadow-glassCard)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: `${"var(--color-primary)"}20` }}
                >
                  <Target size={32} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t("about.Our Vision")}
                </h3>
              </div>
              <p className="text-lg leading-relaxed opacity-90">
               {t("about.vision_message")}
              </p>
            </div>

            {/* Mission Card */}
            <div
              className="rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "var(--shadow-glassCard)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: `${"var(--color-secondary)"}20` }}
                >
                  <Heart size={32} style={{ color: "var(--color-secondary)" }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {t("about.Our Mission")}
                </h3>
              </div>
              <p className="text-lg leading-relaxed opacity-90">
                {t("about.mission_message")}
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20 text-center">
            <h3
              className="mb-12 text-3xl font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              {t("about.Our Core Values")}
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="mb-4 flex justify-center">
                    <value.icon size={28} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <h4
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {value.title}
                  </h4>
                  <p className="text-sm opacity-80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionAndMission;
