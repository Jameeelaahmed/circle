import GlowCardContainer from "../../components/ui/Payments/GlowCardContainer";
import { motion as Motion } from "framer-motion";

function PaymentPresentational({ particles, cards }) {
  return (
    <section className="mt-[80px] mb-10">
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

        {/* Animated Particles */}
        {particles.map((particle) => (
          <Motion.div
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
export default PaymentPresentational;
