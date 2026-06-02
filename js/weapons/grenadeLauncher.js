// --- Ammo ---
const ammo            = 6;

// --- Projectile ---
const directDamage    = 125;
const speed           = 10;
const splashRadius    = 88;
const splashMaxDamage = 100;
const explodeDelayMs  = 1250;

// --- Config ---
const reloadMs       = 3500;
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
    explodeDelayMs,
};

const grenadeLauncher = {
    // Ammo
    AMMO:              ammo,

    // Projectile
    DIRECT_DAMAGE:     directDamage,
    SPEED:             speed,
    SPLASH_RADIUS:     splashRadius,
    SPLASH_MAX_DAMAGE: splashMaxDamage,
    EXPLODE_DELAY_MS:  explodeDelayMs,

    // Config
    RELOAD_MS:         reloadMs,
    FIRE_RATE:         fireRate,
    COLOR:             color,
    PROJECTILE_SIZE:   projectileSize,
    PELLETS_PER_SHOT:  pelletsPerShot,
    SPREAD_ANGLE:      spreadAngle,
    DISPLAY_NAME:      'GRENADE',
};

export default grenadeLauncher;
