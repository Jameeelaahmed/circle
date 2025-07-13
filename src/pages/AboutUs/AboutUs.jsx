import { Users, Target, Heart, ArrowRight, Star, Globe, Zap, MessageCircle, Calendar, Camera, Users2, Sparkles, Shield, Link, Clock, CheckCircle } from "lucide-react";
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";
import Orb from "../../components/ui/ReactBits/Orb/OrbContainer";
import Hero from "./Hero";
import Stats from "./Stats";
import VisionAndMission from "./VisionAndMission";
import Team from "./Team";

const AboutUs = () => {
    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: COLORS.dark, color: COLORS.text }}>

            <Hero />
            <Stats />
            <VisionAndMission />
            <Team />


            <div className="absolute top-10 right-5 w-48 h-48 opacity-30 z-1">
                <Orb hue={480} hoverIntensity={0.3} />
            </div>
            <div className="absolute top-20 right-10 w-96 h-96 opacity-20 z-10">
                <Orb hue={180} hoverIntensity={0.3} />
            </div>
            <div className="absolute top-140 left-10 w-96 h-96 opacity-20 z-10">
                <Orb hue={180} hoverIntensity={0.3} />
            </div>
            <div className="absolute bottom-300 right-10 w-48 h-48 opacity-10 z-10">
                <Orb hue={280} hoverIntensity={0.3} />
            </div>
            <div className="absolute bottom-20 left-10 w-48 h-48 opacity-10 z-10">
                <Orb hue={280} hoverIntensity={0.2} />
            </div>


        </div>
    )
}

export default AboutUs;

