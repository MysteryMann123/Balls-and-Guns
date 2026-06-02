// --- Config ---
const maxAmmo        = 6;
const reloadMs       = 3000;
const speed          = 50;
const fireRate       = 950;
const color          = '#ff6600';
const projectileSize = 4;
const pelletsPerShot = 6;
const spreadAngle    = 0.11;

// --- Damage ---
const pelletDamage     = 25;
const damageMin        = 4;
const damageMax        = 25;

// --- Range ---
const hitscanRange     = 750;
const tracerDurationMs = 100;

const CONFIG = {
    maxAmmo,
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

const shotgun = {
    // Config
    MAX_AMMO:         maxAmmo,
    RELOAD_MS:        reloadMs,
    SPEED:            speed,
    FIRE_RATE:        fireRate,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,

    // Damage
    PELLET_DAMAGE:      pelletDamage,
    DAMAGE_MIN:         damageMin,
    DAMAGE_MAX:         damageMax,

    // Range
    HITSCAN_RANGE:      hitscanRange,
    TRACER_DURATION_MS: tracerDurationMs,
    DISPLAY_NAME:       'SHOTGUN',
};

export default shotgun;
