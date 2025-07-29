import { Link } from "react-router";


const Hero = () => {
  return (
    <section
      className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-primary to-secondary h-[60vh]"
    >
      <h1
        className="mb-6 text-6xl font-bold text-shadow-lg md:text-8xl"
      >
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
        className="p-7 text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:text-white bg-primary size-32 rounded-full flex justify-center items-center"
      >
        Join <br />
        Circle
      </Link>
    </section>
  );
};

export default Hero;
