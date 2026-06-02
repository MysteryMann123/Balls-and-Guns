// --- Config ---
const maxAmmo        = 1;
const reloadMs       = 2500;
const speed          = 36;
const fireRate       = 888;
const projectileSize = 4;
const pelletsPerShot = 1;
const spreadAngle    = 0;

// --- Damage ---
const damageMin        = 175;
const damageMax        = 250;

// --- Tracer ---
const tracerRange      = 1000;
const tracerDurationMs = 90;
const tracerColor      = '#ff85c2';

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color: tracerColor,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const egoPinks = {
    // Config
    MAX_AMMO:         maxAmmo,
    RELOAD_MS:        reloadMs,
    SPEED:            speed,
    FIRE_RATE:        fireRate,
    COLOR:            tracerColor,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,

    // Damage
    DAMAGE_MIN:         damageMin,
    DAMAGE_MAX:         damageMax,

    // Tracer
    TRACER_RANGE:       tracerRange,
    TRACER_DURATION_MS: tracerDurationMs,
    TRACER_COLOR:       tracerColor,
    DISPLAY_NAME:       'EGO WEAPON PINKS',
};



export default egoPinks;
