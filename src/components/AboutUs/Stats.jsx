import { Users, Users2, Calendar, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

const Stats = () => {
  const { t } = useTranslation();
  const stats = [
    {
      icon: Users,
      value: 10000,
      label: t("about.Active Users"),
      color: "var(--color-primary)",
    },
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
    {
      icon: Camera,
      value: 5000,
      label: t("about.Memories Shared"),
      color: "#bad",
    },
  ];

  return (
    <section className="relative z-20 mt-14 grid grid-cols-1 gap-8 px-10 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="hover:animate-jelly w-full rounded-2xl p-6 text-center backdrop-blur-sm will-change-transform"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "var(--shadow-glassCard)",
          }}
        >
          <stat.icon
            size={40}
            style={{ color: stat.color }}
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
