// Generate irregular circular paths with organic variations
export const generateIrregularCirclePath = (radius, centerX, centerY, irregularity, pathIndex) => {
    const points = [];
    const steps = 120;
    const baseRadius = radius;

    for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;

        // Create irregular radius variations using multiple sine waves
        const radiusVariation1 = Math.sin(angle * 3 + pathIndex * 0.5) * irregularity * 0.4;
        const radiusVariation2 = Math.sin(angle * 7 + pathIndex * 0.8) * irregularity * 0.2;
        const radiusVariation3 = Math.sin(angle * 11 + pathIndex * 1.2) * irregularity * 0.15;
        const radiusVariation4 = Math.cos(angle * 5 + pathIndex * 0.3) * irregularity * 0.25;

        const currentRadius = baseRadius + radiusVariation1 + radiusVariation2 + radiusVariation3 + radiusVariation4;

        // Add some organic wobble to the center point
        const centerOffsetX = Math.sin(angle * 2 + pathIndex * 0.4) * irregularity * 0.1;
        const centerOffsetY = Math.cos(angle * 1.5 + pathIndex * 0.6) * irregularity * 0.1;

        const x = centerX + centerOffsetX + Math.cos(angle) * currentRadius;
        const y = centerY + centerOffsetY + Math.sin(angle) * currentRadius;

        points.push(`${x},${y}`);
    }

    return `M${points.join(' L')}Z`; // Close the path with Z
};

// Generate path layers configuration
export const generatePathLayers = (numLayers = 12) => {
    const pathLayers = [];

    for (let i = 0; i < numLayers; i++) {
        const baseRadius = 120 + (i * 20);
        const irregularity = 25 + Math.sin(i * 0.3) * 15;
        const pathIndex = i;

        pathLayers.push({
            id: i,
            radius: baseRadius,
            irregularity,
            pathIndex,
            delay: i * 0.6,
            duration: 20 + Math.sin(i * 0.4) * 8,
            opacity: 0.3 + Math.sin(i * 0.2) * 0.2,
        });
    }

    return pathLayers;
};
