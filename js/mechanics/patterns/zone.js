// Mechanics module: zone
// Creates or manages areas of effect with boundary detection.
// Determines effects based on distance from zone center.
//
// Weapons: hairspray (near/mid/far zones), shortCircuit (persistent DOT field)

export function create(zoneRadius) {
    return { ZONE_RADIUS: zoneRadius };
}

export function createZone(x, y, radius) {
    return {
        pos: { x, y },
        radius,
        createdAt: Date.now(),
        targets: new Set(),
    };
}

export function isInZone(targetX, targetY, zoneX, zoneY, zoneRadius) {
    const dx = targetX - zoneX;
    const dy = targetY - zoneY;
    const distance = Math.hypot(dx, dy);
    return distance <= zoneRadius;
}

export function getDistance(targetX, targetY, zoneX, zoneY) {
    const dx = targetX - zoneX;
    const dy = targetY - zoneY;
    return Math.hypot(dx, dy);
}

export function getZoneType(distance, zoneRadius) {
    const ratio = distance / zoneRadius;
    if (ratio <= 0.33) return 'near';
    if (ratio <= 0.67) return 'mid';
    return 'far';
}

export function applyFalloff(baseValue, distance, maxRadius, falloffType = 'linear') {
    if (distance >= maxRadius) return 0;

    const ratio = distance / maxRadius;
    let multiplier;

    switch (falloffType) {
        case 'linear':
            multiplier = 1 - ratio;
            break;
        case 'squared':
            multiplier = 1 - (ratio * ratio);
            break;
        case 'sqrt':
            multiplier = 1 - Math.sqrt(ratio);
            break;
        default:
            multiplier = 1 - ratio;
    }

    return baseValue * Math.max(0, multiplier);
}

export function recordTargetHit(zone, targetId) {
    zone.targets.add(targetId);
}

export function hasTargetBeenHit(zone, targetId) {
    return zone.targets.has(targetId);
}

export function clearHitRecord(zone) {
    zone.targets.clear();
}
