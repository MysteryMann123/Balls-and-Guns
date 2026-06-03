// Mechanics module: teamAwareHit
// Hit detection that respects team affiliation and ownership.
// Prevents friendly fire, tracks hits for multi-hit prevention.
//
// Weapons: most weapons (universal mechanic)

export function create() {
    return {};
}

// Checks if a projectile can hit a target (not owner, respects teams/allies).
// projectileOwnerId: who fired the projectile
// targetId: who is being hit
// targetTeam: team affiliation (optional, undefined = neutral/enemy)
// ownerTeam: projectile owner's team (optional)
// allowFriendlyFire: whether to allow hitting allies (default: false)
export function canHit(projectileOwnerId, targetId, targetTeam, ownerTeam, allowFriendlyFire = false) {
    // Can't hit self
    if (projectileOwnerId === targetId) return false;

    // If teams are defined, check for friendly fire
    if (!allowFriendlyFire && ownerTeam !== undefined && targetTeam !== undefined) {
        if (ownerTeam === targetTeam) return false;
    }

    return true;
}

// Creates a hit record for multi-hit prevention.
// Returns an object tracking which targets have been hit by this projectile.
export function createHitRecord() {
    return { hitTargets: new Set() };
}

// Checks if a target was already hit by this projectile.
export function hasAlreadyHit(hitRecord, targetId) {
    return hitRecord.hitTargets.has(targetId);
}

// Records a target hit to prevent duplicate hits on same projectile.
export function recordHit(hitRecord, targetId) {
    hitRecord.hitTargets.add(targetId);
}

// Checks if target is a valid valid living target.
// target: object with pos, id, isAlive() method
// Returns true if target exists and is alive.
export function isValidTarget(target) {
    if (!target || !target.pos) return false;
    if (typeof target.isAlive === 'function') {
        return target.isAlive();
    }
    return true;
}

// Finds all valid targets within a radius (for multi-hit effects).
// sourcePos: { x, y } - origin point
// targets: array of potential targets
// radius: search radius
// projectileOwnerId: id of projectile owner
// ownerTeam: team of projectile owner
// allowFriendlyFire: allow hitting allies
export function findHittableTargets(sourcePos, targets, radius, projectileOwnerId, ownerTeam, allowFriendlyFire = false) {
    const hittable = [];

    for (const target of targets) {
        if (!isValidTarget(target)) continue;

        const dx = target.pos.x - sourcePos.x;
        const dy = target.pos.y - sourcePos.y;
        const dist = Math.hypot(dx, dy);

        if (dist > radius) continue;

        if (!canHit(projectileOwnerId, target.id, target.team, ownerTeam, allowFriendlyFire)) continue;

        hittable.push(target);
    }

    return hittable;
}
