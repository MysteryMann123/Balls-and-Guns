// Mechanics module: beam
// Sustains a continuous line or ray of effect over time.
// Tracks beam state and accumulates effects while active.
//
// Weapons: medigun (continuous heal beam + uber charge)

export function create(config) {
    return {
        MAX_RANGE: config.maxRange || Infinity,
        TICK_INTERVAL_MS: config.tickIntervalMs || 100,
        EFFECT_PER_TICK: config.effectPerTick || 0,
        ...config,
    };
}

export function createBeam(fromX, fromY, toX, toY, now) {
    return {
        startPos: { x: fromX, y: fromY },
        endPos: { x: toX, y: toY },
        createdAt: now,
        lastTickAt: now,
        accumulated: 0,
        isActive: true,
    };
}

export function updateTarget(beam, toX, toY) {
    beam.endPos.x = toX;
    beam.endPos.y = toY;
}

export function getDistance(beam) {
    const dx = beam.endPos.x - beam.startPos.x;
    const dy = beam.endPos.y - beam.startPos.y;
    return Math.hypot(dx, dy);
}

export function isInRange(beam, maxRange) {
    return getDistance(beam) <= maxRange;
}

export function getElapsedTime(beam, now) {
    return now - beam.createdAt;
}

export function isDueForTick(beam, now, tickIntervalMs) {
    return (now - beam.lastTickAt) >= tickIntervalMs;
}

export function recordTick(beam, now, effectAmount) {
    beam.lastTickAt = now;
    beam.accumulated += effectAmount;
    return beam.accumulated;
}

export function accumulate(beam, amount) {
    beam.accumulated += amount;
    return beam.accumulated;
}

export function getAccumulated(beam) {
    return beam.accumulated;
}

export function resetAccumulated(beam, amount = 0) {
    const previous = beam.accumulated;
    beam.accumulated = amount;
    return previous;
}

export function deactivate(beam) {
    beam.isActive = false;
}

export function isActive(beam) {
    return beam.isActive;
}
