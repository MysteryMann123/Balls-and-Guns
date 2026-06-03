// Mechanics module: dualForm
// Weapon switches between two forms (e.g., gun/melee, long/short range).
// Switch triggers automatically when wielder is within/outside a threshold distance to nearest enemy.
//
// Weapons: crimsonScar (gun/blade), hornet (rifle/shotgun)

export function create(switchDistance) {
    return { SWITCH_DISTANCE: switchDistance };
}

// Determines which form should be active based on nearest enemy distance.
// weaponInstance: has a form property (or similar)
// nearestEnemyDistance: distance to closest target (infinity if no targets)
// switchDistance: threshold for form switching
// Returns the form name (e.g., 'gun' or 'blade')
export function getActiveForm(currentForm, nearestEnemyDistance, switchDistance) {
    // If no enemies or far away, use ranged form
    if (nearestEnemyDistance === Infinity || nearestEnemyDistance > switchDistance) {
        return 'ranged'; // e.g., 'gun', 'rifle'
    }
    // If close, use melee form
    return 'melee'; // e.g., 'blade', 'shotgun'
}

// Checks if a form switch is needed.
export function shouldSwitch(currentForm, newForm) {
    return currentForm !== newForm;
}

// Finds distance to nearest valid enemy target.
// returns: distance to closest target, or Infinity if no targets
export function getNearestEnemyDistance(wielderPos, targets, ownerId) {
    let minDist = Infinity;

    for (const target of targets) {
        if (typeof target.isAlive === 'function' && !target.isAlive()) continue;
        if (target.id === ownerId) continue;

        const dx = target.pos.x - wielderPos.x;
        const dy = target.pos.y - wielderPos.y;
        const dist = Math.hypot(dx, dy);

        if (dist < minDist) minDist = dist;
    }

    return minDist;
}
