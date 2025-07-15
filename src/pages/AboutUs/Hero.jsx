import React from "react";
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";
import { Link } from "react-router";

const styles = {
  hero: {
    color: COLORS.text,
    background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
    height: "60vh",
  },
};
const Hero = () => {
  return (
    <section
      className="flex flex-col items-center justify-center text-center"
      style={styles.hero}
    >
      <h1
        className="mb-6 text-6xl font-bold text-shadow-lg md:text-8xl"
        style={{ color: COLORS.primary, fontFamily: FONTS.heading }}
      >
        About Circle
      </h1>
      <p
        className="mx-auto mb-8 max-w-4xl text-xl opacity-90 md:text-2xl"
        style={{ fontFamily: FONTS.body }}
      >
        The essential platform for maintaining and strengthening real-world
        friendships in a digital age. We combat social drift by reducing the
        logistical friction of planning group activities.
      </p>
      <Link
        to="/login"
        className="p-7 text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:text-white"
        style={{ backgroundColor: COLORS.secondary, borderRadius: "70%" }}
      >
        Join <br />
        Circle
      </Link>
    </section>
  );
};

export default Hero;
