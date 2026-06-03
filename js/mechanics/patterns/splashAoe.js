// Mechanics module: splashAoe
// Deals damage in an area around impact point (vs direct hit only).
// Damage typically decreases with distance or is flat in radius.
//
// Weapons: rocketLauncher, grenadelauncher, explosiveFlask (and variants)

export function create(radius) {
    return { RADIUS: radius };
}

// Returns whether a target is within splash radius of impact point.
// targetPos: { x, y }
// impactPos: { x, y }
// radius: splash radius
export function isInSplashRadius(targetPos, impactPos, radius) {
    const dx = targetPos.x - impactPos.x;
    const dy = targetPos.y - impactPos.y;
    const dist = Math.hypot(dx, dy);
    return dist <= radius;
}

// Calculates falloff damage multiplier based on distance from impact.
// Use this for gradual falloff (e.g., rocket launchers).
// Returns 1 at center, 0 at edge, linear interpolation.
export function getFalloffMultiplier(targetPos, impactPos, radius) {
    const dx = targetPos.x - impactPos.x;
    const dy = targetPos.y - impactPos.y;
    const dist = Math.hypot(dx, dy);

    if (dist > radius) return 0;
    if (dist < 0.001) return 1;

    return Math.max(0, 1 - (dist / radius));
}
