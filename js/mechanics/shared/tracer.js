// Mechanics module: tracer
// Fires a purely visual beam from shooter to max range (no damage).
//
// Weapons: egoPinks, egoMagicBullet

export function create(range, durationMs, color = null) {
    return { RANGE: range, DURATION_MS: durationMs, COLOR: color };
}

// Creates a new tracer instance. Tracks a single visual beam.
export function createInstance(fromX, fromY, toX, toY, now, durationMs, color) {
    return {
        from: { x: fromX, y: fromY },
        to: { x: toX, y: toY },
        spawnTime: now,
        expireTime: now + durationMs,
        color
    };
}

// Returns whether the tracer is still visible.
export function isActive(tracer, now) {
    return now < tracer.expireTime;
}

// Returns opacity as 0-1, fading out over the last 20% of duration.
export function getOpacity(tracer, now) {
    const elapsed = now - tracer.spawnTime;
    const duration = tracer.expireTime - tracer.spawnTime;
    const fadeStart = duration * 0.8;

    if (elapsed < fadeStart) return 1;
    return Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart));
}
