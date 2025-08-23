import { useRef, useEffect, useState } from "react";
import notfound from "../../../../assets/images/notfound/404 1.png";
import SplitText from "../../../ui/ReactBits/SplitTxt/SplitText";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;
const DEFAULT_PARTICLE_COUNT = 12;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const GlobalSpotlight = ({
  containerRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);
  const isInsideContainer = useRef(false);

  useEffect(() => {
    if (disableAnimations || !containerRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      pointer-events: none;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideContainer.current = mouseInside;

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        return;
      }

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideContainer.current = false;
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [containerRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const BackgroundHoverEffect = ({
  disableAnimations = false,
  enableSpotlight = true,
  enableStars = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
  particleCount = DEFAULT_PARTICLE_COUNT,
}) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    // console.log("All letters have animated!");
  };

  const clearAllParticles = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  };

  const animateParticles = () => {
    if (shouldDisableAnimations || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    Array.from({ length: particleCount }).forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        if (!containerRef.current) return;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const particle = createParticleElement(x, y, glowColor);

        containerRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(particle, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  };

  useEffect(() => {
    if (!enableStars || shouldDisableAnimations || !containerRef.current) {
      clearAllParticles();
      return;
    }

    const element = containerRef.current;

    const handleMouseEnter = () => {
      animateParticles();
    };

    const handleMouseLeave = () => {
      clearAllParticles();
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      clearAllParticles();
    };
  }, [enableStars, shouldDisableAnimations]);

  return (
    <div
      ref={containerRef}
      className="main-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-main px-4 py-6 text-text"
      style={{
        "--glow-color": glowColor,
      }}
    >
      <style>
        {`
          .main-background {
            --glow-color: ${glowColor};
            color: var(--color-text);
            text-align: center;
          }
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          .btn-back-home {
            @apply mt-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600
              px-6 py-3 font-semibold text-text shadow-lg transition
              hover:from-purple-700 hover:to-indigo-700 focus:outline-none
              focus:ring-4 focus:ring-purple-500/50;
          }
          .btn-back-home:focus-visible {
            outline-offset: 2px;
          }
          /* Responsive image scaling */
          .notfound-image {
            max-width: 90vw;
            max-height: 50vh;
            object-fit: contain;
            user-select: none;
            pointer-events: none;
          }
          /* Responsive typography */
          .split-text {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.25rem; 
            margin-bottom: 0.75rem;
          }
          @media (min-width: 640px) {
            .split-text {
              font-size: 1.25rem;
            }
          }
          @media (min-width: 1024px) {
            .split-text {
              font-size: 1.7rem; 
            }
          }
          .notfound-message {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 600px;
          }
          @media (min-width: 640px) {
            .notfound-message {
              font-size: 1.5rem;
            }
          }
          @media (min-width: 1024px) {
            .notfound-message {
              font-size: 1rem;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          containerRef={containerRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      {/* Content container */}
      <div className="absolute top-15 flex max-w-3xl flex-col items-center justify-center px-4">
        {/* Image */}
        <img
          className="notfound-image select-none"
          src={notfound}
          alt="404 not found"
          draggable={false}
        />

        {/* Animated text */}
        <SplitText
          text="Oops!"
          className="split-text"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        {/* Gradient message */}
        <p className="notfound-message from-secondary to-primary mb-0 block bg-gradient-to-l bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
          {t("notFound.message")}
        </p>

        {/* Back home button */}
        <button
          className="btn-back-home mt-10 cursor-pointer rounded-full border-2 border-primary bg-main bg-gradient-to-r from-secondary to-primary bg-clip-text px-6 py-2.5 text-lg font-semibold tracking-wider text-transparent uppercase transition duration-300 ease-in-out hover:scale-105 hover:border-purple-700/90 hover:bg-primary hover:text-[var(--color-text)] hover:shadow-[0_0_10px_rgba(132,0,255,0.9)] focus:ring-4 focus:ring-purple-500/50 focus:outline-none"
          onClick={() => navigate("/")}
          type="button"
          aria-label="Back to home"
        >
          {t("notFound.backHome") || "Back to Home"}
        </button>
      </div>
    </div>
  );
};

export default BackgroundHoverEffect;
