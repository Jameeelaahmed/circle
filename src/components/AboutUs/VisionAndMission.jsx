import React from "react";
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";
import { Heart, Target, Users2, Sparkles, Shield } from "lucide-react";

const VisionAndMission = () => {
  const values = [
    {
      icon: Users2,
      title: "Connection",
      description: "Fostering meaningful relationships",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Simplifying social planning",
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Protecting your social circles",
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
              style={{ color: COLORS.primary, fontFamily: FONTS.heading }}
            >
              Vision & Mission
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              Building meaningful connections in the digital age
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Vision Card */}
            <div
              className="rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: SHADOWS.glassCard,
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: `${COLORS.primary}20` }}
                >
                  <Target size={32} style={{ color: COLORS.primary }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: COLORS.primary }}
                >
                  Our Vision
                </h3>
              </div>
              <p className="text-lg leading-relaxed opacity-90">
                To be the essential platform for maintaining and strengthening
                real-world friendships in a digital age.
              </p>
            </div>

            {/* Mission Card */}
            <div
              className="rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: SHADOWS.glassCard,
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <Heart size={32} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: COLORS.secondary }}
                >
                  Our Mission
                </h3>
              </div>
              <p className="text-lg leading-relaxed opacity-90">
                Circle combats social drift by reducing the logistical friction
                of planning group activities. It provides a dedicated space for
                social circles to decide, plan, and relive their shared
                experiences, transforming intention into connection.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20 text-center">
            <h3
              className="mb-12 text-3xl font-bold"
              style={{ color: COLORS.accent }}
            >
              Our Core Values
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
                    <value.icon size={28} style={{ color: COLORS.accent }} />
                  </div>
                  <h4
                    className="mb-2 text-lg font-semibold"
                    style={{ color: COLORS.accent }}
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
