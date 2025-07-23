import React from "react";
// import { COLORS, SHADOWS } from "../../constants";
import { Users, Users2, Calendar, Camera } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: Users, value: 10000, label: "Active Users", color: "var(--color-primary)" },
    {
      icon: Users2,
      value: 2000,
      label: "Private Circles",
      color: "var(--color-secondary)",
    },
    {
      icon: Calendar,
      value: 3000,
      label: "Events Created",
      color: "var(--color-accent)",
    },
    { icon: Camera, value: 5000, label: "Memories Shared", color: "#bad" },
  ];

  return (
    <section className="flex w-full flex-row flex-wrap items-start justify-center gap-8 mt-14">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full rounded-2xl p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 lg:w-1/5"
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
