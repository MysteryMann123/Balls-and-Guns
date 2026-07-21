// Mechanics module: dualForm
// Weapon switches between two forms (e.g., gun/melee, long/short range).
// Switch triggers automatically when wielder is within/outside a threshold distance to nearest enemy.
//
// Weapons: crimsonScar (gun/blade), hornet (rifle/shotgun)

export function create(switchDistance) {
    return { SWITCH_DISTANCE: switchDistance };
}

// Determines which form should be active based on nearest enemy distance.
// nearestEnemyDistance: distance to closest target (infinity if no targets)
// switchDistance: threshold for form switching
// closeFormName/farFormName: the weapon's own names for its two forms
// (e.g., 'blade'/'gun', 'shotgun'/'rifle')
// Returns whichever form name applies at the current distance.
export function getActiveForm(nearestEnemyDistance, switchDistance, closeFormName = 'melee', farFormName = 'ranged') {
    if (nearestEnemyDistance === Infinity || nearestEnemyDistance > switchDistance) {
        return farFormName;
    }
    return closeFormName;
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
