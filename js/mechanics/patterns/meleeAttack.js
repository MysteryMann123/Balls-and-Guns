// Mechanics module: meleeAttack
// Handles melee swing detection: range, arc, animation timing.
// Weapons swing in a cone, hitting targets within range and arc.
//
// Weapons: penitence, crimsonScar (blade form), rocketJumper (melee)

export function create(range, arcDegrees, animationMs) {
    return { RANGE: range, ARC_DEGREES: arcDegrees, ANIMATION_MS: animationMs };
}

// Checks if a target is within melee swing range and arc.
// wielderPos: { x, y }
// wielderFacing: { x, y } - unit direction vector
// targetPos: { x, y }
// range: melee range
// arcDegrees: swing arc (e.g., 120 = 60° each side of facing)
export function isInSwingArc(wielderPos, wielderFacing, targetPos, range, arcDegrees) {
    const dx = targetPos.x - wielderPos.x;
    const dy = targetPos.y - wielderPos.y;
    const dist = Math.hypot(dx, dy);

    if (dist > range) return false;
    if (dist < 0.001) return true;

    // Normalize target direction
    const targetDir = { x: dx / dist, y: dy / dist };

    // Dot product = cos(angle between vectors)
    const dotProduct = wielderFacing.x * targetDir.x + wielderFacing.y * targetDir.y;

    // Convert arc degrees to cosine threshold
    const arcRadians = (arcDegrees / 2) * (Math.PI / 180);
    const cosThreshold = Math.cos(arcRadians);

    return dotProduct >= cosThreshold;
}

// Returns animation progress (0-1) for a swing.
// timeIntoSwing: ms since swing started
// animationDurationMs: total swing animation time
export function getSwingProgress(timeIntoSwing, animationDurationMs) {
    if (timeIntoSwing < 0) return 0;
    if (timeIntoSwing > animationDurationMs) return 1;
    return timeIntoSwing / animationDurationMs;
}

// Returns hit window (when damage is dealt during swing).
// Typically the middle 40% of the animation (e.g., frames 30-70 out of 100).
export function isInHitWindow(swingProgress, windowStart = 0.3, windowEnd = 0.7) {
    return swingProgress >= windowStart && swingProgress <= windowEnd;
}

// Creates a melee swing state for tracking.
export function createSwingState(startTime, animationMs) {
    return {
        startTime,
        endTime: startTime + animationMs,
        hitTargets: new Set() // Track which targets were hit this swing
    };
}

// Checks if a target was already hit in this swing (prevents multi-hit on same swing).
export function hasTargetBeenHit(swingState, targetId) {
    return swingState.hitTargets.has(targetId);
}

// Records a target hit in the swing.
export function recordTargetHit(swingState, targetId) {
    swingState.hitTargets.add(targetId);
}
