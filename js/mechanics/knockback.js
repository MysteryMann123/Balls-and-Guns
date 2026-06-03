// Mechanics module: knockback
// Applies directional force to targets on hit.
// Can apply to the wielder (self-knockback) and/or enemies (enemy knockback).
//
// Weapons: forceANature, many explosives/shotguns

export function create(selfForce, enemyForce) {
    return { SELF_FORCE: selfForce, ENEMY_FORCE: enemyForce };
}

// Calculates knockback velocity from projectile direction.
// projectileVel: { x, y }
// force: knockback magnitude
// Returns new velocity { x, y }
export function calculateKnockback(projectileVel, force) {
    const speed = Math.hypot(projectileVel.x, projectileVel.y);
    if (speed < 0.001) return { x: 0, y: 0 };

    const dirX = projectileVel.x / speed;
    const dirY = projectileVel.y / speed;

    return {
        x: dirX * force,
        y: dirY * force
    };
}

// Applies knockback to a target's velocity.
// targetVel: { x, y } - target's current velocity
// knockbackVel: { x, y } - force to apply
export function applyToTarget(targetVel, knockbackVel) {
    return {
        x: targetVel.x + knockbackVel.x,
        y: targetVel.y + knockbackVel.y
    };
}
