import Orb from "../../components/ui/ReactBits/Orb/OrbContainer";
import Hero from "../../components/AboutUs/Hero";
import Stats from "../../components/AboutUs/Stats";
import VisionAndMission from "../../components/AboutUs/VisionAndMission";
import Team from "../../components/AboutUs/Team";

const AboutUs = () => {
  return (
    <div
      className="bg-main relative min-h-screen overflow-hidden"
      style={{ color: "var(--color-text)" }}
    >
      <Hero />
      <Stats />
      <VisionAndMission />
      <Team />

      <div className="absolute top-10 right-5 z-1 h-48 w-48 opacity-30 ">
        <Orb hue={480} hoverIntensity={0.3} />
      </div>
      <div className="absolute top-20 right-10 z-10 h-96 w-96 opacity-20 ">
        <Orb hue={180} hoverIntensity={0.3} />
      </div>
      <div className="absolute top-140 left-10 z-10 h-96 w-96 opacity-20 ">
        <Orb hue={180} hoverIntensity={0.3} />
      </div>
      <div className="absolute right-10 bottom-300 z-10 h-48 w-48 opacity-10 ">
        <Orb hue={280} hoverIntensity={0.3} />
      </div>
      <div className="absolute bottom-20 left-10 z-10 h-48 w-48 opacity-10 ">
        <Orb hue={280} hoverIntensity={0.2} />
      </div>
    </div>
  );
};

export default AboutUs;
