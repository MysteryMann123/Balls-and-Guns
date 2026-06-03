// Mechanics module: afterburn
// Applies a fire DOT (damage over time) to a target.
//
// Weapons: flamethrower, egoMagicBullet, solemnVow (white shot)

export function create(damageMin, damageMax, intervalMs, durationMs) {
    return { DAMAGE_MIN: damageMin, DAMAGE_MAX: damageMax, INTERVAL_MS: intervalMs, DURATION_MS: durationMs };
}

// Applies afterburn state to a target slot.
// slot: object with { until, damageMin, damageMax, intervalMs } — e.g. target.afterburn
// Takes the longer duration; preserves existing damage values if already burning.
export function apply(slot, now, damageMin, damageMax, intervalMs, durationMs) {
    const until = now + durationMs;
    if (until > slot.until) {
        slot.until      = until;
        slot.damageMin  = damageMin;
        slot.damageMax  = damageMax;
        slot.intervalMs = intervalMs;
    }
}

// Returns whether the target is currently burning.
export function isActive(slot, now) {
    return now < slot.until;
}

// Returns whether the target is due for next damage tick.
// Call this periodically during update to deal damage over time.
export function isDueForDamage(slot, now) {
    if (!isActive(slot, now)) return false;
    return !slot.lastDamageTick || (now - slot.lastDamageTick) >= slot.intervalMs;
}

// Records the damage tick timestamp. Call after dealing damage.
export function recordDamageTick(slot, now) {
    slot.lastDamageTick = now;
}
