// --- Ammo ---
const ammo         = 4;

// --- Projectile ---
const directDamage = 100;
const speed        = 16;
const splashRadius = 90;

// --- Config ---
const reloadMs       = 2400;
const fireRate       = 950;
const color          = '#ff954d';
const projectileSize = 9;
const pelletsPerShot = 1;
const spreadAngle    = 0;

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
};

const rocketLauncher = {
    // Ammo
    AMMO:             ammo,

    // Projectile
    DIRECT_DAMAGE:    directDamage,
    SPEED:            speed,
    SPLASH_RADIUS:    splashRadius,

    // Config
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,
    DISPLAY_NAME:     'ROCKET',
};

export default rocketLauncher;
