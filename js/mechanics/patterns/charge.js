// Mechanics module: charge
// Accumulates a resource over time that can be released for effect.
// Triggers release when fully charged.
//
// Weapons: yellowTarge (charge = more damage), soundOfStar (charge per reload)

export function create(maxCharge) {
    return { MAX_CHARGE: maxCharge };
}

export function createState(now) {
    return { current: 0, startTime: now, lastUpdateTime: now };
}

export function chargeOverTime(state, now, chargePerMs) {
    const elapsed = now - state.lastUpdateTime;
    const chargeGain = elapsed * chargePerMs;
    state.current = Math.min(state.current + chargeGain, state.MAX_CHARGE);
    state.lastUpdateTime = now;
}

export function addCharge(state, amount) {
    state.current = Math.min(state.current + amount, state.MAX_CHARGE);
}

export function isFull(state) {
    return state.current >= state.MAX_CHARGE;
}

export function getCharge(state) {
    return state.current;
}

export function getProgress(state) {
    return state.MAX_CHARGE > 0 ? state.current / state.MAX_CHARGE : 0;
}

export function release(state) {
    const released = state.current;
    state.current = 0;
    return released;
}

export function reset(state, now) {
    state.current = 0;
    state.lastUpdateTime = now;
}

export function getTimeToFull(state, now, chargePerMs) {
    if (chargePerMs <= 0) return Infinity;
    const remaining = state.MAX_CHARGE - state.current;
    return remaining / chargePerMs;
}
