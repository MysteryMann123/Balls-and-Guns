// --- Ammo ---
const ammo               = 4;

// --- Projectile ---
const damage             = 125;
const speed              = 16 * 1.8;   // 180% of rocketLauncher SPEED (16)
const splashRadius       = 90 * 0.25;  // 25% of rocketLauncher SPLASH_RADIUS (90)

// --- Conditional Bonus ---
const vsFasterMultiplier = 1.5;

// --- Config ---
const reloadMs       = 2400;
const fireRate       = 950;
const color          = '#ff8f4f';
const projectileSize = 8;
const pelletsPerShot = 1;
const spreadAngle    = 0;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
    splashRadius,
};

const directHit = {
    // Ammo
    AMMO:                 ammo,

    // Projectile
    DAMAGE:               damage,
    SPEED:                speed,
    SPLASH_RADIUS:        splashRadius,

    // Conditional Bonus
    VS_FASTER_MULTIPLIER: vsFasterMultiplier,

    // Config
    RELOAD_MS:            reloadMs,
    FIRE_RATE:            fireRate,
    COLOR:                color,
    PROJECTILE_SIZE:      projectileSize,
    PELLETS_PER_SHOT:     pelletsPerShot,
    SPREAD_ANGLE:         spreadAngle,
    DISPLAY_NAME:         'DIRECT HIT',
};

export default directHit;
