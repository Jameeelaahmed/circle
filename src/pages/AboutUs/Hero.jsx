import React from 'react'
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";
import { Link } from 'react-router';

const styles = {
    hero: {
        color: COLORS.text,
        background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
        height: "60vh",
    }
}
const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center" style={styles.hero}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow-lg" style={{ color: COLORS.primary, fontFamily: FONTS.heading }}>
                About Circle
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 opacity-90" style={{ fontFamily: FONTS.body }}>
                The essential platform for maintaining and strengthening real-world friendships in a digital age.
                We combat social drift by reducing the logistical friction of planning group activities.
            </p>
            <Link to="/login" className="hover:text-white hover:scale-105 p-7  text-xl  transition-all duration-300 shadow-lg" style={{ backgroundColor: COLORS.secondary, borderRadius: "70%" }}>
                Join <br />
                Circle
            </Link>


        </section >
    )
}

export default Hero 