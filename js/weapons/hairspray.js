// --- Ammo & Timing ---
const ammo           = 3;
const fireRate       = 800;
const reloadMs       = 2800;

// --- Projectile ---
const speed          = 6;
const maxRange       = 280;
const cloudRadius    = 50;

// --- Damage & Ticks ---
const tickDamageMin  = 60;
const tickDamageMax  = 100;
const tickIntervalMs = 300;

// --- Zone Thresholds ---
const nearMaxTicks   = 1;
const midMaxTicks    = 3;
const farMaxTicks    = 2;
const nearZoneEnd    = Math.round(maxRange * 0.33); // 33% of max range
const midZoneEnd     = Math.round(maxRange * 0.66); // 66% of max range
const lingerMs       = tickIntervalMs * farMaxTicks; // one full tick cycle at far zone

// --- Config ---
const color          = '#b8f0c8';
const pelletsPerShot = 1;
const spreadAngle    = 0.04;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin: tickDamageMin,
    damageMax: tickDamageMax,
    speed,
    fireRate,
    color,
    projectileSize: 1,
    pelletsPerShot,
    spreadAngle,
};

const hairspray = {
    // Ammo & Timing
    AMMO:             ammo,
    FIRE_RATE:        fireRate,
    RELOAD_MS:        reloadMs,

    // Projectile
    SPEED:            speed,
    MAX_RANGE:        maxRange,
    CLOUD_RADIUS:     cloudRadius,

    // Damage & Ticks
    TICK_DAMAGE_MIN:  tickDamageMin,
    TICK_DAMAGE_MAX:  tickDamageMax,
    TICK_INTERVAL_MS: tickIntervalMs,

    // Zone Thresholds
    NEAR_MAX_TICKS:   nearMaxTicks,
    MID_MAX_TICKS:    midMaxTicks,
    FAR_MAX_TICKS:    farMaxTicks,
    NEAR_ZONE_END:    nearZoneEnd,
    MID_ZONE_END:     midZoneEnd,
    LINGER_MS:        lingerMs,

    // Config
    COLOR:            color,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,
    image: 'assets/Emz_hairspray.jpg',
    DISPLAY_NAME:     'HAIRSPRAY',
};

export default hairspray;
