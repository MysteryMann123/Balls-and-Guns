// Mechanics module: hitscan
// Weapon delivers damage as an instant ray rather than a physical projectile.
//
// Weapons: widowmaker, sodaPopper, forceANature, familyBusiness

export function create(range) {
    return { RANGE: range };
}

// Checks if a target position is in range of a ray.
// fromX, fromY: ray origin
// dirX, dirY: ray direction (unit vector)
// targetX, targetY: target position to check
// range: maximum range
// Returns true if target is within range and on-axis.
export function isInRange(fromX, fromY, dirX, dirY, targetX, targetY, range) {
    const dx = targetX - fromX;
    const dy = targetY - fromY;
    const dist = Math.hypot(dx, dy);

    if (dist > range) return false;
    if (dist < 0.001) return true;

    // Project target onto ray direction
    const dotProduct = (dx * dirX + dy * dirY);
    return dotProduct > 0;
}
