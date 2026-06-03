// Mechanics module: fireRateRamp
// Fire rate gradually speeds up with sustained fire, resets on idle.
// Useful for weapons that reward continuous shooting (minigun-like behavior).
//
// Weapons: minigun

export function create(baseRate, initialRate, minRate, rampPerShot, rampResetDelayMs) {
    return {
        BASE_RATE: baseRate,
        INITIAL_RATE: initialRate,
        MIN_RATE: minRate,
        RAMP_PER_SHOT: rampPerShot,
        RAMP_RESET_DELAY_MS: rampResetDelayMs
    };
}

// Returns the effective fire rate based on idle time and current rate.
// If idle too long, resets to base rate. Otherwise returns current rate.
export function getEffectiveRate(currentRate, baseRate, lastShotAt, now, resetDelayMs) {
    const idleTime = now - lastShotAt;
    if (idleTime > resetDelayMs) {
        return baseRate;
    }
    return currentRate;
}

// Applies ramp-down to fire rate after a shot.
// Returns new fire rate (clamped to min).
export function applyRamp(currentRate, rampPerShot, minRate) {
    return Math.max(minRate, currentRate - rampPerShot);
}

// Resets fire rate to initial after reload.
export function onReload(initialRate) {
    return initialRate;
}
