// --- Config (melee — no projectile) ---
const maxAmmo        = Infinity;
const reloadMs       = 0;
const speed          = 0;
const color          = '#6adf76';
const projectileSize = 0;
const pelletsPerShot = 1;
const spreadAngle    = 0;

// --- Combat ---
const damageMin           = 80;
const damageMax           = 110;
const swingArcDegrees     = 120;
const meleeRange          = 28;
const fireRate            = 600;
const swingAnimationMs    = 550;

// --- Equip Bonuses ---
const maxHpBonusRatio     = 0.12;
const speedBonusRatio     = 0.05;
const knockbackResistance = 0.2;

// --- Sustain ---
const pickupHealRatio     = 0.06;
const allyHealFromDamage  = 0.8;
const allyHelpHpRatio     = 0.45;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const penitence = {
    // Config
    MAX_AMMO:             maxAmmo,
    RELOAD_MS:            reloadMs,
    SPEED:                speed,
    COLOR:                color,
    PROJECTILE_SIZE:      projectileSize,
    PELLETS_PER_SHOT:     pelletsPerShot,
    SPREAD_ANGLE:         spreadAngle,

    // Combat
    DAMAGE_MIN:            damageMin,
    DAMAGE_MAX:            damageMax,
    SWING_ARC_DEGREES:     swingArcDegrees,
    MELEE_RANGE:           meleeRange,
    FIRE_RATE:             fireRate,
    SWING_ANIMATION_MS:    swingAnimationMs,

    // Equip Bonuses
    MAX_HP_BONUS_RATIO:    maxHpBonusRatio,
    SPEED_BONUS_RATIO:     speedBonusRatio,
    KNOCKBACK_RESISTANCE:  knockbackResistance,

    // Sustain
    PICKUP_HEAL_RATIO:     pickupHealRatio,
    ALLY_HEAL_FROM_DAMAGE: allyHealFromDamage,
    ALLY_HELP_HP_RATIO:    allyHelpHpRatio,
    DISPLAY_NAME:          'EGO WEAPON PENITENCE',
};

export default penitence;
