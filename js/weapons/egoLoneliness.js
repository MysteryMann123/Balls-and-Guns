// --- Derived from revolver base values ---
const damage           = Math.round(55 * 0.8); // 80% of revolver DAMAGE (55)

// --- Ammo & Timing ---
const speed            = 18;
const fireRate         = 500;
const reloadMs         = 1350;
const ammo             = 6;

// --- On-Hit Effects ---
const slowDurationMs   = 2000;
const slowMultiplier   = 0.30;
const ammoRefundChance = 0.77;

// --- Config ---
const color          = '#a8a8a8';
const projectileSize = 4;
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
    slowDurationMs,
    slowMultiplier,
};

const egoLoneliness = {
    // Ammo & Timing
    DAMAGE:             damage,
    SPEED:              speed,
    FIRE_RATE:          fireRate,
    RELOAD_MS:          reloadMs,
    AMMO:               ammo,

    // On-Hit Effects
    SLOW_DURATION_MS:   slowDurationMs,
    SLOW_MULTIPLIER:    slowMultiplier,
    AMMO_REFUND_CHANCE: ammoRefundChance,

    // Config
    COLOR:              color,
    PROJECTILE_SIZE:    projectileSize,
    PELLETS_PER_SHOT:   pelletsPerShot,
    SPREAD_ANGLE:       spreadAngle,
    DISPLAY_NAME:       'EGO WEAPON LONELINESS',
};

export default egoLoneliness;
