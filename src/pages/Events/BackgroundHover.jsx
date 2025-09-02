import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { ScheduleXCalendar } from "@schedule-x/react";
import CalendarImg from "../../assets/images/calendar.png";
import { Helmet } from "react-helmet";

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
  calendarApp,
  circlesInfo,
}) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  const { t } = useTranslation();

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

    <>
     <Helmet>
        <title>Events</title>
        <meta
          name="description"
          content="Explore ur upcoming events and activities."
        />
      </Helmet>
   
    <div
      ref={containerRef}
      className="from-bg-primary to-bg-secondary text-text relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b px-4 py-6"
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
      <div
        className="flex w-full flex-col overflow-hidden pt-13 md:flex-row md:px-6"
        style={{
          color: "#c5c6c7",
        }}
      >
        {/* Sidebar (circles + header) */}
        <div className="border-text-700/40 pe-3  flex w-full flex-col gap-3 border-b pb-4 md:w-80 md:border-e md:border-b-0 md:pr-6 md:pb-0">
          {/* Header */}
          <div className="flex items-center gap-4 px-1 ">
            <img
              src={CalendarImg}
              alt="Calendar"
              className="h-10 w-10 drop-shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text)]">
                {t("calendar.title")}
              </h1>
              <p className="text-text-400 text-sm">
                {t("calendar.upcomingEvents")}{" "}
                {/* e.g., "Your Upcoming Events!" */}
              </p>
            </div>
          </div>

          {/* Circle info list */}
          <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-1">
            {Object.entries(circlesInfo).map(([circleId, circle]) => (
              <div
                key={circleId}
                className="border-text-700/50 from-text-800/20 to-text-900/30 rounded-2xl border bg-gradient-to-br p-3 shadow-sm transition-all hover:shadow-lg"
                style={{
                  borderLeft: `5px solid ${circle.colorName || "#f78fb3"}`,
                }}
              >
                {/* Circle header */}
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-3">
                    {circle.image && (
                      <img
                        src={circle.image}
                        alt={circle.label}
                        className="ring-text-700/50 h-10 w-10 rounded-full object-cover ring-2"
                      />
                    )}
                    <span className="text-sm font-medium tracking-wide text-text">
                      {circle.label}
                    </span>
                    <span className="ltr:ml-auto rtl:mr-auto text-text-400 transition-transform group-open:rotate-90">
                      ▶
                    </span>
                  </summary>

                  {/* Events under circle */}
                  {circle.events && circle.events.length > 0 ? (
                    <ul className="mt-3 space-y-2 pl-1">
                      {circle.events.map((event, idx) => (
                        <li
                          key={idx}
                          className="bg-text-900/30 text-text-200 hover:bg-text-900/50 flex items-center gap-2 rounded-md px-2 py-2 text-xs"
                        >
                          {/* Colored dot */}
                          <span
                            className="h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: circle.colorName }}
                          />
                          <span className="truncate">{event.title}</span>
                          <span className="ltr:ml-auto rtl:mr-auto rounded-full bg-text-700/40 px-2 py-0.5 text-[10px] text-text-300">
                            {event.start?.slice(0, 10)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-text-500 mt-3 pl-1 text-xs italic">
                      {t("calendar.noUpcomingEvents")}{" "}
                    </p>
                  )}
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div
          className="relative z-10 mt-7 flex-grow overflow-auto rounded-2xl shadow-md ltr:md:ml-6 rtl:md:mr-6"
          style={{
            background: `radial-gradient(ellipse at top, #17284f93 0%, transparent 60%)`,
            backdropFilter: "blur(10px)",
            border: "1px solid #0b0c10",
            minHeight: 0,
          }}
        >
          <ScheduleXCalendar calendarApp={calendarApp} />
        </div>
      </div>
    </div>
     </>
  );
};

export default BackgroundHoverEffect;
