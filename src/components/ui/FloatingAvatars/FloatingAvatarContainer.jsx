// libs
import { useState, useRef, useEffect, memo } from "react";
import { useLocation } from "react-router";
import i18n from "../../../../i18n";

// components
import AuthFloatingAvatarsPresentational from "./AuthFloatingAvatarsPresentational";
import LandingFloatingAvatarPresentaional from "./LandingFloatingAvatarPresentaional";

function FloatingAvatarContainer() {
  const [hoveredAvatar, setHoveredAvatar] = useState(null);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isRTLState, setIsRTLState] = useState(false);
  const location = useLocation().pathname;
  const avatarRefs = useRef({});

  // Listen for language changes and update RTL state
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
      const newIsRTL = lng === "ar";
      setIsRTLState(newIsRTL);
    };

    // Set initial state
    const initialIsRTL = currentLang === "ar";
    setIsRTLState(initialIsRTL);

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [currentLang]);

  const authAvatars = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "50%",
      y: "25%",
      delay: 0,
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "40%",
      y: "15%",
      delay: 0.5,
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "70%",
      y: "25%",
      delay: 1,
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "12%",
      y: "50%",
      delay: 1.5,
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "60%",
      y: "40%",
      delay: 2,
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "40%",
      y: "80%",
      delay: 2.5,
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      x: "75%",
      y: "60%",
      delay: 3.5,
    },
  ];

  // LTR: Avatars clustered vertically along left and right edges, top to bottom, with some vertical spacing
  // Helper to calculate delay based on y axis (bottom = lower delay, top = higher delay)
  function calcDelays(positions) {
    // Parse y as percent, sort ascending (bottom to top)
    const sorted = [...positions].sort(
      (a, b) => parseFloat(b.y) - parseFloat(a.y),
    );
    // Assign delays: bottom-most gets 0, next gets 0.3, then 0.6, etc.
    return sorted.map((avatar, i) => ({ ...avatar, delay: i * 0.3 }));
  }

  // LTR: Avatars clustered vertically along left and right edges, top to bottom, with some vertical spacing
  const ltrOrbPositionsRaw = [
    {
      id: 1,
      x: "6%",
      y: "10%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 2,
      x: "17%",
      y: "15%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 3,
      x: "10%",
      y: "30%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 4,
      x: "20%",
      y: "35%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 5,
      x: "1%",
      y: "30%",
      hue: 120,
      imageUrl:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Michael Chen",
      role: "Product Manager",
      status: "In a meeting",
    },
    {
      id: 6,
      x: "15%",
      y: "50%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
    {
      id: 7,
      x: "25%",
      y: "55%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },

    {
      id: 9,
      x: "85%",
      y: "10%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 10,
      x: "74%",
      y: "15%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 11,
      x: "80%",
      y: "30%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 12,
      x: "71%",
      y: "35%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 13,
      x: "90%",
      y: "30%",
      hue: 120,
      imageUrl:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Michael Chen",
      role: "Product Manager",
      status: "In a meeting",
    },
    {
      id: 14,
      x: "78%",
      y: "50%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
    {
      id: 15,
      x: "65%",
      y: "55%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
  ];
  const ltrOrbPositions = calcDelays(ltrOrbPositionsRaw);

  // RTL: Avatars clustered vertically along right and left edges, top to bottom, with some vertical spacing (mirrored)
  const rtlOrbPositionsRaw = [
    {
      id: 1,
      x: "6%",
      y: "8%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 2,
      x: "17%",
      y: "13%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 3,
      x: "10%",
      y: "22%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 4,
      x: "20%",
      y: "30%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 5,
      x: "2%",
      y: "30%",
      hue: 120,
      imageUrl:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Michael Chen",
      role: "Product Manager",
      status: "In a meeting",
    },
    {
      id: 6,
      x: "15%",
      y: "50%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
    {
      id: 7,
      x: "25%",
      y: "50%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
    {
      id: 8,
      x: "6%",
      y: "48%",
      hue: 240,
      imageUrl:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "David Kim",
      role: "Frontend Developer",
      status: "Active now",
    },

    {
      id: 9,
      x: "88%",
      y: "8%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 10,
      x: "75%",
      y: "13%",
      hue: 0,
      imageUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Alex Morgan",
      role: "Lead Developer",
      status: "Active now",
    },
    {
      id: 11,
      x: "83%",
      y: "22%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 12,
      x: "90%",
      y: "30%",
      hue: 60,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Taylor Swift",
      role: "UX Designer",
      status: "Last seen 2h ago",
    },
    {
      id: 13,
      x: "70%",
      y: "30%",
      hue: 120,
      imageUrl:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Michael Chen",
      role: "Product Manager",
      status: "In a meeting",
    },
    {
      id: 14,
      x: "70%",
      y: "50%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
    {
      id: 15,
      x: "80%",
      y: "50%",
      hue: 180,
      imageUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      role: "Backend Engineer",
      status: "Working remotely",
    },
    {
      id: 16,
      x: "90%",
      y: "48%",
      hue: 240,
      imageUrl:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      name: "David Kim",
      role: "Frontend Developer",
      status: "Active now",
    },
  ];
  const rtlOrbPositions = calcDelays(rtlOrbPositionsRaw);

  // Choose the appropriate positions based on language
  const orbPositions = isRTLState ? rtlOrbPositions : ltrOrbPositions;

  return (
    <>
      {(location === "/login" || location === "/register") && (
        <AuthFloatingAvatarsPresentational avatars={authAvatars} />
      )}
      {location === "/" && (
        <LandingFloatingAvatarPresentaional
          avatarRefs={avatarRefs}
          isRTLState={isRTLState}
          avatars={orbPositions}
          hoveredAvatar={hoveredAvatar}
          setHoveredAvatar={setHoveredAvatar}
        />
      )}
    </>
  );
}
export default memo(FloatingAvatarContainer);
