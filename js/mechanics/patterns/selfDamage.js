// Mechanics module: selfDamage
// Wielder takes periodic damage from their own weapon (self-drain/DoT).
// Useful for high-powered weapons that cost health to use.
//
// Weapons: paradiseLost (self-drain), possible others with life cost

export function create(minRatio, maxRatio, intervalMs, durationMs = Infinity) {
    return {
        MIN_RATIO: minRatio,
        MAX_RATIO: maxRatio,
        INTERVAL_MS: intervalMs,
        DURATION_MS: durationMs
    };
}

// Applies self-damage state to wielder.
// wielderSlot: object with { damageUntil, damageMin, damageMax, intervalMs }
// Tracks when the self-damage started and parameters.
export function apply(wielderSlot, now, minRatio, maxRatio, intervalMs, durationMs = Infinity) {
    wielderSlot.damageUntil = now + durationMs;
    wielderSlot.damageMinRatio = minRatio;
    wielderSlot.damageMaxRatio = maxRatio;
    wielderSlot.damageIntervalMs = intervalMs;
    wielderSlot.lastDamageTick = wielderSlot.lastDamageTick || now;
}

// Returns whether self-damage is currently active.
export function isActive(wielderSlot, now) {
    return now < wielderSlot.damageUntil;
}

// Returns whether it's time to deal self-damage tick.
// Call periodically to check if damage should be applied this frame.
export function isDueForDamageTick(wielderSlot, now) {
    if (!isActive(wielderSlot, now)) return false;
    return (now - wielderSlot.lastDamageTick) >= wielderSlot.damageIntervalMs;
}

// Records the self-damage tick timestamp.
// Call after dealing self-damage to reset the interval.
export function recordDamageTick(wielderSlot, now) {
    wielderSlot.lastDamageTick = now;
}

// Calculates self-damage amount based on wielder's max health.
// Randomized between min and max ratio.
export function calculateDamage(wielderMaxHp, minRatio, maxRatio) {
    const ratio = minRatio + Math.random() * (maxRatio - minRatio);
    return wielderMaxHp * ratio;
}

// Deactivates self-damage (e.g., on weapon switch).
export function deactivate(wielderSlot) {
    wielderSlot.damageUntil = 0;
    wielderSlot.lastDamageTick = 0;
}
