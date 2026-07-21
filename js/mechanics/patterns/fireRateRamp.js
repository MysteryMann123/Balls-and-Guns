// Mechanics module: fireRateRamp
// Fire rate gradually speeds up with sustained fire, resets on idle.
// Useful for weapons that reward continuous shooting (minigun-like behavior).
//
// Two ramp modes are supported, chosen by which field a weapon declares:
//   rampPerShot     — flat ms subtracted from the current rate per shot (minigun)
//   rampRatePerSec  — percentage-style decay: (currentRate/1000) * rampRatePerSec
//                      subtracted per shot, so the ramp accelerates as the rate
//                      drops (hypocrisy)
//
// Weapons: minigun, hypocrisy

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

// Applies flat ramp-down to fire rate after a shot (minigun-style).
// Returns new fire rate (clamped to min).
export function applyRamp(currentRate, rampPerShot, minRate) {
    return Math.max(minRate, currentRate - rampPerShot);
}

// Applies percentage-style ramp-down to fire rate after a shot
// (hypocrisy-style). Returns new fire rate (clamped to min).
export function applyPercentageRamp(currentRate, rampRatePerSec, minRate) {
    const reduction = (currentRate / 1000) * rampRatePerSec;
    return Math.max(minRate, currentRate - reduction);
}

// Resets fire rate to initial after reload.
export function onReload(initialRate) {
    return initialRate;
}
