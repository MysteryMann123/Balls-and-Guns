// --- Ammo ---
const ammo            = 4;

// --- Derived from grenadeLauncher base values ---
const directDamage    = 125;                       // matches grenadeLauncher DIRECT_DAMAGE (125)
const speed           = Math.round(10 * 1.4);     // 140% of grenadeLauncher SPEED (10)
const splashRadius    = Math.round(88 * 0.75);    // 75% of grenadeLauncher SPLASH_RADIUS (88)
const splashMaxDamage = 100;                       // matches grenadeLauncher SPLASH_MAX_DAMAGE (100)

// --- Conditional Bonus ---
const fastMoveBonus   = 0.25;
const fastSpeedRatio  = 0.5;

// --- Config ---
const reloadMs       = 2500;
const fireRate       = 900;
const color          = '#85ff5e';
const projectileSize = 9;
const pelletsPerShot = 1;
const spreadAngle    = 0.03;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: directDamage,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
    splashRadius,
    splashMaxDamage,
};

const lochNLoad = {
    // Ammo
    AMMO:              ammo,

    // Projectile
    DIRECT_DAMAGE:     directDamage,
    SPEED:             speed,
    SPLASH_RADIUS:     splashRadius,
    SPLASH_MAX_DAMAGE: splashMaxDamage,

    // Conditional Bonus
    FAST_MOVE_BONUS:   fastMoveBonus,
    FAST_SPEED_RATIO:  fastSpeedRatio,

    // Config
    RELOAD_MS:         reloadMs,
    FIRE_RATE:         fireRate,
    COLOR:             color,
    PROJECTILE_SIZE:   projectileSize,
    PELLETS_PER_SHOT:  pelletsPerShot,
    SPREAD_ANGLE:      spreadAngle,
    image: 'assets/LochnLoad.png',
    DISPLAY_NAME:      'LOCH-N-LOAD',
};

export default lochNLoad;
