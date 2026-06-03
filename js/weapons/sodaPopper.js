// --- Ammo & Timing ---
const ammo                   = 2;
const reloadMs               = 1500;
const fireRate               = 260;

// --- Projectile ---
const pelletsPerShot         = 8;
const damageMin              = 2;
const damageMax              = 25;
const spreadAngle            = 0.24;
const hitscanRange           = 750; // matches shotgun HITSCAN_RANGE (750)

// --- Hype Meter ---
const chargeDamageRequired   = 400;
const hypeDamageMultiplier   = 1.25;
const hypeSpeedBoost         = 0.6;
const hypeDurationMs         = 4000;

// --- Config ---
const speed          = 50;
const color          = '#9fe9ff';
const projectileSize = 4;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: damageMax,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const sodaPopper = {
    // Ammo & Timing
    AMMO:                   ammo,
    RELOAD_MS:              reloadMs,
    FIRE_RATE:              fireRate,

    // Projectile
    PELLETS_PER_SHOT:       pelletsPerShot,
    DAMAGE_MIN:             damageMin,
    DAMAGE_MAX:             damageMax,
    SPREAD_ANGLE:           spreadAngle,
    HITSCAN_RANGE:          hitscanRange,

    // Hype Meter
    CHARGE_DAMAGE_REQUIRED: chargeDamageRequired,
    HYPE_DAMAGE_MULTIPLIER: hypeDamageMultiplier,
    HYPE_SPEED_BOOST:       hypeSpeedBoost,
    HYPE_DURATION_MS:       hypeDurationMs,

    // Config
    SPEED:                  speed,
    COLOR:                  color,
    PROJECTILE_SIZE:        projectileSize,
    image: 'assets/250px-Soda_Popper.PNG',
    DISPLAY_NAME:           'SODA POPPER',
};

export default sodaPopper;
