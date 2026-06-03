// Mechanics module: conditionalReload
// Reload duration changes based on weapon/wielder state conditions.
// Used for weapons with penalty/bonus reload times (low ammo reloads slower, etc).
//
// Weapons: widowmaker, soundOfStar (partially)

export function create(baseReloadMs) {
    return { BASE_RELOAD_MS: baseReloadMs };
}

// Evaluates reload duration based on conditions.
// This is a flexible hook — weapons define their own condition logic.
// weaponInstance: the weapon object with current state
// baseReloadMs: default reload time
// Returns: adjusted reload time (ms)
export function getReloadDuration(weaponInstance, baseReloadMs, conditions = {}) {
    let duration = baseReloadMs;

    // Apply condition multipliers/overrides
    if (conditions.lowAmmoPenalty && weaponInstance.ammo < weaponInstance.ammoCostPerShot) {
        duration = conditions.lowAmmoReloadMs || baseReloadMs * 1.5;
    }

    if (conditions.chargeBonus && weaponInstance.isCharging) {
        duration = Math.max(baseReloadMs * 0.5, duration);
    }

    if (conditions.activeBuff) {
        duration *= conditions.buffMultiplier || 0.8;
    }

    return Math.ceil(duration);
}

// Validates if a reload condition is met.
export function shouldApplyCondition(weaponInstance, conditionName) {
    switch (conditionName) {
        case 'lowAmmo':
            return weaponInstance.ammo < (weaponInstance.ammoCostPerShot || 1);
        case 'charged':
            return weaponInstance.isCharging || weaponInstance.chargeLevel > 0;
        case 'cooldown':
            return weaponInstance.lastShotAt && (Date.now() - weaponInstance.lastShotAt) < 500;
        default:
            return false;
    }
}
