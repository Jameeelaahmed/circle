import { useState } from 'react'
import PresentationalAuthFloatingAvatars from './PresentationalAuthFloatingAvatars';
import { useLocation } from 'react-router';
import PresentaionalLandingFloatingAvatar from './PresentaionalLandingFloatingAvatar';
function FloatingAvatarContainer() {
    const [hoveredAvatar, setHoveredAvatar] = useState(null);
    const location = useLocation().pathname;
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

    const orbPositions = [
        {
            id: 1,
            x: "75%", // Top center of right side
            y: "18%",
            delay: 0,
            hue: 0,
            imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Alex Morgan",
            role: "Lead Developer",
            status: "Active now"
        },
        {
            id: 2,
            x: "90%", // Top right
            y: "33%",
            delay: 0.5,
            hue: 60,
            imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Taylor Swift",
            role: "UX Designer",
            status: "Last seen 2h ago"
        },
        {
            id: 3,
            x: "90%", // Right center
            y: "52%",
            delay: 1,
            hue: 120,
            imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Michael Chen",
            role: "Product Manager",
            status: "In a meeting"
        },
        {
            id: 4,
            x: "85%", // Bottom right
            y: "73%",
            delay: 1.5,
            hue: 180,
            imageUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Sarah Johnson",
            role: "Backend Engineer",
            status: "Working remotely"
        },
        {
            id: 5,
            x: "70%", // Bottom center of right side
            y: "83%",
            delay: 2,
            hue: 240,
            imageUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "David Kim",
            role: "Frontend Developer",
            status: "Active now"
        },
        {
            id: 6,
            x: "55%", // Bottom left of circle
            y: "78%",
            delay: 2.5,
            hue: 300,
            imageUrl: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Emma Wilson",
            role: "QA Engineer",
            status: "On vacation"
        },
        {
            id: 7,
            x: "50%", // Left of circle
            y: "58%",
            delay: 3,
            hue: 30,
            imageUrl: "https://images.pexels.com/photos/1547570/pexels-photo-1547570.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "James Rodriguez",
            role: "DevOps Specialist",
            status: "Active now"
        },
        {
            id: 8,
            x: "60%", // Top left of circle
            y: "28%",
            delay: 3.5,
            hue: 90,
            imageUrl: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Olivia Parker",
            role: "Data Scientist",
            status: "Focus mode"
        },
    ];

    return (
        <>
            {(location === '/login' || location === '/register') &&
                <PresentationalAuthFloatingAvatars avatars={authAvatars} />
            }
            {(location === '/') &&
                <PresentaionalLandingFloatingAvatar
                    avatars={orbPositions}
                    hoveredAvatar={hoveredAvatar}
                    setHoveredAvatar={setHoveredAvatar} />}
        </>
    )
}

export default FloatingAvatarContainer
