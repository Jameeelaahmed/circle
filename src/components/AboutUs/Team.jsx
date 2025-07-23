import { Heart, Users2, Sparkles, Shield } from "lucide-react";
import { ArcCard } from "./Card";

export default function Team() {
  const team = [
    {
      name: "Hajer",
      image: "/src/assets/images/aboutus/hager.jpg",
      role: "full stack developer",
      description:
        "I am a full stack developer with a passion for building web applications.",
      cardColor: "#f23442",
    },
    {
      name: "Ahmed Refaat",
      image: "/src/assets/images/aboutus/refaat.jpg",
      role: "full stack developer",
      description:
        "I am a quick learner and I am always looking to improve my skills.",
      cardColor: "#23f",
    },
    {
      name: "Ahmed Yasser",
      image: "/src/assets/images/aboutus/yasser.jpg",
      role: "full stack developer",
      description:
        "I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.",
      cardColor: "#923",
    },
    {
      name: "Ahemd Jamal",
      image: "/src/assets/images/aboutus/gmal.jpg",
      role: "UX Designer",
      description:
        "I am a UX designer with a passion for creating intuitive user experiences. I am a quick learner and I am always looking to improve my skills.",
      cardColor: "#635",
    },
    {
      name: "Jameela",
      image: "/src/assets/images/aboutus/jameela.jpg",
      role: "full stack developer",
      description:
        "Security expert ensuring your private circles and personal data remain protected.",
      cardColor: "#257",
    },
    {
      name: "Ahmed Adel",
      image: "/src/assets/images/aboutus/adel.jpg",
      role: "full stack developer",
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
            Our Team
          </h2>
          <p className="mx-auto max-w-3xl text-xl opacity-80">
            Meet the passionate minds behind Circle, dedicated to transforming
            how people connect and maintain friendships.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 px-10 lg:justify-between">
          {team.map((member, index) => (
            // <div
            //   key={index}
            //   className="group rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
            //   style={{
            //     backgroundColor: member.cardColor,
            //     border: "1px solid rgba(255, 255, 255, 0.1)",
            //     boxShadow: "var(--shadow-glassCard)",
            //     backdropFilter: "blur(10px)",
            //   }}
            // >
            //   <div className="relative mb-6">
            //     <div
            //       className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-offset-4 transition-all duration-300 group-hover:ring-offset-8"
            //       style={{
            //         ringColor: "var(--color-primary)",
            //         ringOffsetColor: "var(--color-dark)",
            //       }}
            //     >
            //       <img
            //         src={member.image}
            //         alt={member.name}
            //         className="h-full w-full object-cover"
            //       />
            //     </div>
            //   </div>
            //   <div className="text-center">
            //     <h3
            //       className="mb-2 text-xl font-bold"
            //       style={{ color: "var(--color-primary)" }}
            //     >
            //       {member.name}
            //     </h3>
            //     <p className="mb-3 text-sm opacity-80">{member.role}</p>
            //     <p className="text-xs leading-relaxed opacity-70">
            //       {member.description}
            //     </p>
            //   </div>
            // </div>
            <ArcCard
              imgSrc={member.image}
              name={member.name}
              title={member.role}
              since={2025}
            />
          ))}
        </div>

        {/* Team Values */}
        <div className="mt-20 text-center">
          <h3
            className="mb-12 text-3xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Our Team Values
          </h3>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Empathy",
                description: "Understanding user needs",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description: "Pushing boundaries",
              },
              {
                icon: Shield,
                title: "Trust",
                description: "Building secure connections",
              },
              {
                icon: Users2,
                title: "Collaboration",
                description: "Working together",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-2xl p-4 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="mb-3 flex justify-center">
                  <value.icon
                    size={24}
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h4
                  className="mb-1 text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {value.title}
                </h4>
                <p className="text-xs opacity-80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
