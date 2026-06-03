// Mechanics module: allyHeal
// Hitting enemies heals nearby allies.
//
// Weapons: paradiseLost, medigun

export function create(ratio, radius) {
    return { RATIO: ratio, RADIUS: radius };
}

// Calculates healing amount from damage dealt to enemies.
export function calculateHeal(damageDealt, ratio) {
    return damageDealt * ratio;
}

// Returns whether an ally is within healing radius.
// allyPos: { x, y }
// projectilePos: { x, y }
// radius: healing radius
export function isInHealRadius(allyPos, projectilePos, radius) {
    const dx = allyPos.x - projectilePos.x;
    const dy = allyPos.y - projectilePos.y;
    const dist = Math.hypot(dx, dy);
    return dist <= radius;
}
