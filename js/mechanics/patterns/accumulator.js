// Mechanics module: accumulator
// Stacks or accumulates values over time or hits.
// Triggers an effect when accumulation reaches a threshold.
//
// Weapons: sodaPopper (hype meter), solemnVow (portrait charge)

export function create(maxValue) {
    return { MAX_VALUE: maxValue };
}

export function createState() {
    return { current: 0 };
}

export function accumulate(state, amount) {
    state.current = Math.min(state.current + amount, state.MAX_VALUE);
}

export function isFull(state) {
    return state.current >= state.MAX_VALUE;
}

export function reset(state) {
    state.current = 0;
}

export function getValue(state) {
    return state.current;
}

export function getProgress(state) {
    return state.MAX_VALUE > 0 ? state.current / state.MAX_VALUE : 0;
}
