// Mechanics module: slow
// Reduces a target's movement speed for a duration.
//
// Weapons: egoLoneliness, adoration

export function create(durationMs, multiplier) {
    return { DURATION_MS: durationMs, MULTIPLIER: multiplier };
}

// Applies a slow to a target's named slow slot.
// slot: object with { slowUntil, slowMultiplier } — e.g. target.lonelinessSlow
// Takes the longer duration and the stronger slow (lower multiplier).
export function apply(slot, now, durationMs, multiplier) {
    const until = now + durationMs;
    slot.slowUntil      = Math.max(slot.slowUntil, until);
    slot.slowMultiplier = Math.min(slot.slowMultiplier, multiplier);
}

// Returns whether the slow is currently active.
export function isActive(slot, now) {
    return now < slot.slowUntil;
}

// Returns the effective multiplier (1 if not active).
export function getMultiplier(slot, now) {
    return isActive(slot, now) ? slot.slowMultiplier : 1;
}
