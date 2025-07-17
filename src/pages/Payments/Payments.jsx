import { CrownIcon, UserIcon, ZapIcon } from "lucide-react";
import GlowCardContainer from "../../components/ui/Payments/GlowCardContainer";
import Button from "../../components/ui/Buttons/Button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
function Payments() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 10,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);
  const cards = [
    {
      color: "#1e40af",
      icon: <UserIcon size={50} />,
      header: "Explore & Connect",
      price: <p className="mb-10 text-center text-5xl font-bold">Free</p>,
      services: ["Join public Circles", "Up to 2 private Circles"],
      actionBtn: (
        <Button size="large" variant="primary" classes={"mx-auto block"}>
          Get Started
        </Button>
      ),
    },
    {
      color: "#dc2626",
      icon: <ZapIcon size={50} />,
      header: "More Circles, More Power",
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          $4.99 <span className="text-base">/ month</span>
        </p>
      ),
      services: [
        "Unlimited private Circles",
        "Priority support",
        "Up to 10GB storage",
      ],
      actionBtn: (
        <Button size="large" variant="primary" classes={"mx-auto block"}>
          Subscribe Now
        </Button>
      ),
    },
    {
      color: "#059669",
      icon: <CrownIcon size={50} />,
      header: "Circle+",
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          $9.99 <span className="text-base">/ month</span>
        </p>
      ),
      services: [
        "Host up to 1000 members per Circle",
        "Analytics & engagement insights",
        "Custom Circle branding",
        "Scheduled hangouts & auto-reminders",
      ],
      actionBtn: (
        <Button size="large" variant="primary" classes={"mx-auto block"}>
          Subscribe Now
        </Button>
      ),
    },
  ];
  return (
    <section className="mt-[80px] mb-10">
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

        {/* Animated Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl delay-1000" />
      </div>
      <h1 className="text-primary mb-10 text-center text-2xl font-semibold">
        Pricing
      </h1>
      <p className="mb-10 text-center text-4xl font-semibold">
        Choose Your Circle. Unlock the Experience.
      </p>
      <div className="mx-16 grid grid-cols-1 justify-center gap-10 select-none md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <GlowCardContainer
            className={"bg-black/35 p-10 backdrop-blur-2xl"}
            color={card.color}
            key={card.header}
          >
            <div className="mb-10 flex justify-center">{card.icon}</div>
            <p className="text-primary mb-10 text-center text-xl font-bold xl:text-2xl">
              {card.header}
            </p>
            {card.price}
            <ul className="mb-10 h-40 [&>*]:list-disc">
              {card.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            {card.actionBtn}
          </GlowCardContainer>
        ))}
      </div>
    </section>
  );
}
export default Payments;
