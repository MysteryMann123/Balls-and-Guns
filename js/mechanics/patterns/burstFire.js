// Mechanics module: burstFire
// Weapon fires N shots in rapid succession (a "burst") gated by a fast
// intra-burst interval, then returns to a slower base fire rate before the
// next burst starts.
//
// Weapons: crimsonScar (gun form), soundOfStar (hand-rolled equivalent —
// not yet migrated to this module)

export function create(burstCount, burstIntervalMs, baseFireRate) {
    return { BURST_COUNT: burstCount, BURST_INTERVAL_MS: burstIntervalMs, BASE_FIRE_RATE: baseFireRate };
}

// Returns a fresh per-weapon burst tracker.
export function createState() {
    return { shotsLeftInBurst: 0 };
}

// Returns the fire-rate interval that should currently gate the next shot:
// the fast intra-burst interval while a burst is in progress, otherwise the
// slower base rate.
export function getEffectiveInterval(state, config) {
    return state.shotsLeftInBurst > 0 ? config.BURST_INTERVAL_MS : config.BASE_FIRE_RATE;
}

// Call once a shot has been confirmed to advance the burst counter for the
// next shot: starts a new burst if the previous one just finished (or this
// is the first shot), otherwise consumes one shot from the current burst.
export function recordShot(state, config) {
    state.shotsLeftInBurst = state.shotsLeftInBurst > 0
        ? state.shotsLeftInBurst - 1
        : config.BURST_COUNT - 1;
}
