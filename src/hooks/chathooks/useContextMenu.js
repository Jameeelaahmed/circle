// Custom hook for context menu logic
import { useState, useEffect } from 'react';

export default function useContextMenu({ menuWidth = 300, menuHeight = 180, headerHeight = 64, inputHeight = 80, padding = 8 } = {}) {
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0, message: null });
    const [menuDirection, setMenuDirection] = useState('down');

    useEffect(() => {
        function handleClick() {
            if (menu.visible) setMenu(m => ({ ...m, visible: false }));
        }
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [menu.visible]);

    function handleContextMenu(e, msg) {
        e.preventDefault();
        const viewportHeight = window.innerHeight;

        // Use mouse coordinates for positioning
        let left = e.clientX;

        // Adjust position to stay within screen bounds
        if (left + menuWidth > window.innerWidth - 8) {
            left = window.innerWidth - menuWidth - 8;
        }
        if (left < 8) {
            left = 8;
        }

        // Determine direction based on available space
        let direction = 'down'; // Default to down
        let finalTop = e.clientY + 10; // Show below click point by default

        // Check if there's enough space below
        if (e.clientY + menuHeight + 10 > viewportHeight - inputHeight - padding) {
            // Not enough space below, show above
            direction = 'up';
            finalTop = e.clientY - menuHeight - 10;
        }

        // Apply header constraints
        if (finalTop < headerHeight + padding) {
            finalTop = headerHeight + padding;
            direction = 'down';
        }

        // Final boundary checks
        if (finalTop + menuHeight > window.innerHeight - 8) {
            finalTop = window.innerHeight - menuHeight - 8;
        }
        if (finalTop < 8) {
            finalTop = 8;
        }
        setMenu(m => ({ ...m, visible: false }));
        setTimeout(() => {
            setMenu({ visible: true, x: left, y: finalTop, message: msg });
            setMenuDirection(direction);
        }, 10);
    }

    return { menu, setMenu, menuDirection, handleContextMenu };
}
