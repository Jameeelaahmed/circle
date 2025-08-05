import { Users, Users2, Calendar, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

const Stats = () => {
  const {t} = useTranslation();
  const stats = [
    { icon: Users, value: 10000, label: t("about.Active Users"), color: "var(--color-primary)" },
    {
      icon: Users2,
      value: 2000,
      label: t("about.Private Circles"),
      color: "var(--color-secondary)",
    },
    {
      icon: Calendar,
      value: 3000,
      label: t("about.Events Created"),
      color: "var(--color-accent)",
    },
    { icon: Camera, value: 5000, label: t("about.Memories Shared"), color: "#bad" },
  ];

  return (
    <section className="flex w-full flex-row flex-wrap relative z-20 items-start justify-center gap-8 mt-14">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full rounded-2xl p-6 text-center backdrop-blur-sm hover:animate-jelly will-change-transform lg:w-1/5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "var(--shadow-glassCard)",
          }}
        >
          <stat.icon
            size={40}
            style={{ color: stat.color  }}
            className="mx-auto"
          />
          <p className="mb-2 text-3xl font-bold" style={{ color: stat.color }}>
            {" "}
            {stat.value}{" "}
          </p>
          <p className="text-sm opacity-80">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
