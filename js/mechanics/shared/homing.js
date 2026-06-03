// Mechanics module: homing
// Steers a projectile toward the nearest valid target each frame.
//
// Weapons: magicianHat, paradiseLost, egoMagicBullet, soundOfStar

export function create(strength, range) {
    return { STRENGTH: strength, RANGE: range };
}

// Pure steering kernel — blends current velocity toward nearest target.
// projectilePos: { x, y }
// projectileVel: { x, y }
// targets: array of objects with { pos: {x,y}, id, isAlive?() }
// Returns new velocity object, or original if no target in range.
export function steer(projectilePos, projectileVel, targets, ownerId, strength, range) {
    const speed = Math.hypot(projectileVel.x, projectileVel.y);
    if (speed < 0.001) return projectileVel;

    let bestTarget = null;
    let bestDist  = range;

    for (const t of targets) {
        if (typeof t.isAlive === 'function' && !t.isAlive()) continue;
        if (t.id === ownerId) continue;
        const d = Math.hypot(t.pos.x - projectilePos.x, t.pos.y - projectilePos.y);
        if (d < bestDist) { bestDist = d; bestTarget = t; }
    }

    if (!bestTarget) return projectileVel;

    const dx   = bestTarget.pos.x - projectilePos.x;
    const dy   = bestTarget.pos.y - projectilePos.y;
    const dMag = Math.hypot(dx, dy);
    if (dMag < 0.001) return projectileVel;

    const desired = { x: dx / dMag, y: dy / dMag };
    const cur     = { x: projectileVel.x / speed, y: projectileVel.y / speed };
    const s       = Math.max(0, Math.min(1, strength));

    const bx   = cur.x * (1 - s) + desired.x * s;
    const by   = cur.y * (1 - s) + desired.y * s;
    const bMag = Math.hypot(bx, by);
    if (bMag < 0.001) return projectileVel;

    return { x: (bx / bMag) * speed, y: (by / bMag) * speed };
}
