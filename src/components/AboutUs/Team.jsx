import { Heart, Users2, Sparkles, Shield } from "lucide-react";
import { ArcCard } from "./Card";
import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation();
  const team = [
    {
      name: "Hajar Ali",
      image: "/src/assets/images/aboutus/Hajar.webp",
      role: "Frontend Developer",
      description:
        "I am a Frontend Developer with a passion for building web applications.",
      cardColor: "#f23442",
    },
    {
      name: "Ahmed Refaat",
      image: "/src/assets/images/aboutus/Refaat.webp",
      role: "Frontend Developer",
      description:
        "I am a quick learner and I am always looking to improve my skills.",
      cardColor: "#23f",
    },
    {
      name: "Ahmed Yasser",
      image: "/src/assets/images/aboutus/Yasser.webp",
      role: "Frontend Developer",
      description:
        "I am a Frontend Developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.",
      cardColor: "#923",
    },
    {
      name: "Ahmed Gamal",
      image: "/src/assets/images/aboutus/Gamal.webp",
      role: "Frontend Developer",
      description:
        "I am a UX designer with a passion for creating intuitive user experiences. I am a quick learner and I am always looking to improve my skills.",
      cardColor: "#635",
    },
    {
      name: "Jameela Abdel-rahman",
      image: "/src/assets/images/aboutus/Jameela.webp",
      role: "Frontend Developer",
      description:
        "Security expert ensuring your private circles and personal data remain protected.",
      cardColor: "#257",
    },
    {
      name: "Ahmed Adel",
      image: "/src/assets/images/aboutus/Adel.webp",
      role: "Frontend Developer",
      description:
        "Growth strategist helping Circle reach more people and create more meaningful connections.",
      cardColor: "#046242",
    },
  ];

  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2
            className="mb-6 text-5xl font-bold"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {t("about.Our Team")}
          </h2>
          <p className="mx-auto max-w-3xl text-[var(--color-text)] text-xl opacity-80">
            {t("about.Our Team_description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 px-10 lg:justify-between">
          {team.map((member) => (
            <ArcCard
              imgSrc={member.image}
              name={member.name}
              title={member.role}
              since={2025}
              key={member.name}
            />
          ))}
        </div>

        {/* Team Values */}
        <div className="mt-20 text-center">
          <h3
            className="mb-12 text-3xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {t("about.Our Team Values")}
          </h3>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                icon: Heart,
                title: t("about.Empathy"),
                description: t("about.Empathy_description"),
              },
              {
                icon: Sparkles,
                title: t("about.Innovation"),
                description: t("about.Innovation_values_description"),
              },
              {
                icon: Shield,
                title: t("about.Trust"),
                description: t("about.Trust_description"),
              },
              {
                icon: Users2,
                title: t("about.Collaboration"),
                description: t("about.Collaboration_description"),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="hover:animate-jelly relative shadow-gray-700/20 shadow-2xl z-20 rounded-2xl p-4 will-change-transform"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="mb-3  flex justify-center">
                  <value.icon
                    size={24}
                    style={{ color: "var(--color-secondary)" }}
                  />
                </div>
                <h4
                  className="mb-1 text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {value.title}
                </h4>
                <p className="text-xs text-secondary opacity-80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
