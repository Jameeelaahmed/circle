import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="from bg-primary to-secondary flex flex-col items-center justify-center bg-gradient-to-r text-center">
      <h1 className="mb-6 text-6xl font-bold text-shadow-lg md:text-8xl">
        About Circle
      </h1>
      <p
        className="mx-auto mb-8 max-w-4xl text-xl opacity-90 md:text-2xl"
        style={{ fontFamily: "var(--font-body)" }}
      >
        The essential platform for maintaining and strengthening real-world
        friendships in a digital age. We combat social drift by reducing the
        logistical friction of planning group activities.
      </p>
      <Link
        to="/login"
        className="bg-primary mb-10 flex size-32 items-center justify-center rounded-full  text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:text-white"
      >
        Join <br />
        Circle
      </Link>
    </section>
  );
};

export default Hero;
