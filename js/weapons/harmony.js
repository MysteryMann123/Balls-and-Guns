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

    // No hooks: hasteMaxBonus/hasteDurationMs on the WEAPON_CONFIGS entry in
    // weapon.js are enough for the engine's declarative haste handling to
    // reproduce the damage-taken speed boost (see core/ball.js's
    // takeDamage(), which calls weapon.addHaste()).
};

export default harmony;
