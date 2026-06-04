// --- Ammo & Timing ---
const ammo             = 1;
const reloadMs         = 3000;
const fireRate         = 420;

// --- Projectile ---
const damageMin        = 60;
const damageMax        = 120;
const pelletsPerShot   = 5;
const spreadAngle      = 0.1;
const projectileSpeed  = 11.5;
const projectileSize   = 6;

// --- Self-Cost ---
const selfHpCostRatio  = 0.1;

// --- Haste ---
const hasteMaxBonus    = 0.4;
const hasteDurationMs  = 5500;

// --- Config ---
const color = '#dcecff';

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed: projectileSpeed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const harmony = {
    // Ammo & Timing
    AMMO:               ammo,
    RELOAD_MS:          reloadMs,
    FIRE_RATE:          fireRate,

    // Projectile
    DAMAGE_MIN:         damageMin,
    DAMAGE_MAX:         damageMax,
    PELLETS_PER_SHOT:   pelletsPerShot,
    SPREAD_ANGLE:       spreadAngle,
    PROJECTILE_SPEED:   projectileSpeed,
    PROJECTILE_SIZE:    projectileSize,

    // Self-Cost
    SELF_HP_COST_RATIO: selfHpCostRatio,

    // Haste
    HASTE_MAX_BONUS:    hasteMaxBonus,
    HASTE_DURATION_MS:  hasteDurationMs,

    // Config
    COLOR:              color,
    image: 'assets/EGOWeaponHarmony.webp',
    DISPLAY_NAME:       'EGO WEAPON HARMONY',

    riskClass: 'HE',

    description: [
        'HE E.G.O weapon Harmony: a 10-pellet burst that consumes life to amplify damage.',
        'Each shot fires 10 pellets for 60-120 damage per pellet, then doubles damage only if the user can spend health.',
        'Firing costs up to 10% max HP, but never drops the wielder below 1 HP; at 1 HP, it still fires without draining health.',
        'Taking enemy damage boosts reload/attack speed by up to 40% for 5.5s.',
        'Quote: "After all, art is a devil\'s gift, born from despair and suffering. Never stop performing until the body crumbles to dust."'
    ],

    onAddHaste(weapon, now, damageTaken, maxHp) {
        const bonusGain = Math.min(this.HASTE_MAX_BONUS,
            Math.max(0, damageTaken) / Math.max(1, maxHp));
        weapon.harmonyHasteBonus = Math.min(this.HASTE_MAX_BONUS,
            (weapon.harmonyHasteBonus || 0) + bonusGain);
        weapon.harmonyHasteUntil = Math.max(weapon.harmonyHasteUntil,
            now + this.HASTE_DURATION_MS);
    },

    getEffectiveFireRate(weapon, now) {
        if (now >= weapon.harmonyHasteUntil) return weapon.fireRate;
        const bonus = Math.min(weapon.harmonyHasteBonus || 0, this.HASTE_MAX_BONUS);
        return weapon.fireRate * (1 - bonus);
    },

    getReloadDuration(weapon, now) {
        if (now >= weapon.harmonyHasteUntil) return weapon.reloadTimeMs;
        const bonus = Math.min(weapon.harmonyHasteBonus || 0, this.HASTE_MAX_BONUS);
        return weapon.reloadTimeMs * (1 - bonus);
    },
};

export default harmony;
