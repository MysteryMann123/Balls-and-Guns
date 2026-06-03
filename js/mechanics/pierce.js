// Mechanics module: pierce
// Projectile passes through targets, up to a maximum hit count.
//
// Weapons: faintAroma, adoration, flamethrower

export function create(count) {
    return { COUNT: count };
}

// Returns a new pierce state tracker for a projectile.
export function createState() {
    return { hitCount: 0 };
}

// Increments the hit counter. Returns true if within pierce limit.
export function canHit(state, maxCount) {
    return state.hitCount < maxCount;
}

// Records a hit. Call only after confirming canHit() is true.
export function recordHit(state) {
    state.hitCount++;
}
