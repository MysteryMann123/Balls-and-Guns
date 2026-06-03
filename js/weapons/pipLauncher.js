// --- Ammo & Timing ---
const ammo             = 6;
const reloadMs         = 3500;

// --- Projectile ---
const damageMin        = 50;
const damageMax        = 80;
const speed            = 12;
const splashRadius     = 115;
const tracerDurationMs = 90;

// --- Ally Splash Heal ---
const allyHealMin      = 50;
const allyHealMax      = 80;

// --- Config ---
const fireRate       = 460;
const color          = '#94ecff';
const projectileSize = 8;
const pelletsPerShot = 1;
const spreadAngle    = 0.02;

const CONFIG = {
    maxAmmo: ammo,
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
    splashRadius,
};

const pipLauncher = {
    // Ammo & Timing
    AMMO:               ammo,
    RELOAD_MS:          reloadMs,

    // Projectile
    DAMAGE_MIN:         damageMin,
    DAMAGE_MAX:         damageMax,
    SPEED:              speed,
    SPLASH_RADIUS:      splashRadius,
    TRACER_DURATION_MS: tracerDurationMs,

    // Ally Splash Heal
    ALLY_HEAL_MIN:      allyHealMin,
    ALLY_HEAL_MAX:      allyHealMax,

    // Config
    FIRE_RATE:          fireRate,
    COLOR:              color,
    PROJECTILE_SIZE:    projectileSize,
    PELLETS_PER_SHOT:   pelletsPerShot,
    SPREAD_ANGLE:       spreadAngle,
    image: 'assets/Pip_launcher.png',
    DISPLAY_NAME:       'PIP LAUNCHER',
};

export default pipLauncher;
