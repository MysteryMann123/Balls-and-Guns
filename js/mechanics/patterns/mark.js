// Mechanics module: mark
// Marks a target with increased damage vulnerability for a duration.
//
// Weapons: crimsonScar

export function create(durationMs, damageBonus) {
    return { DURATION_MS: durationMs, DAMAGE_BONUS: damageBonus };
}

// Applies mark to a target's named mark slot.
// slot: object with { markUntil, damageBonus } — e.g. target.mark
// Takes the longer duration and stronger bonus.
export function apply(slot, now, durationMs, damageBonus) {
    const until = now + durationMs;
    slot.markUntil = Math.max(slot.markUntil || 0, until);
    slot.damageBonus = Math.max(slot.damageBonus || 0, damageBonus);
}

// Returns whether the mark is currently active.
export function isActive(slot, now) {
    return now < slot.markUntil;
}

// Returns the damage multiplier (1 + bonus if marked, 1 if not).
export function getDamageMultiplier(slot, now) {
    return isActive(slot, now) ? (1 + slot.damageBonus) : 1;
}
