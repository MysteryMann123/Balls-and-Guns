// --- Ammo ---
const ammo         = 5;

// --- Field ---
const speed        = 2.4;
const radius       = 76;
const durationMs   = 4500;

// --- Damage ---
const dotDamage     = 10;
const dotIntervalMs = 1000;

// --- Config ---
const damage         = 5;
const reloadMs       = 3000;
const fireRate       = 850;
const color          = '#7df9ff';
const projectileSize = 12;
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
};

const shortCircuit = {
    // Ammo
    AMMO:             ammo,

    // Field
    SPEED:            speed,
    RADIUS:           radius,
    DURATION_MS:      durationMs,

    // Damage
    DOT_DAMAGE:       dotDamage,
    DOT_INTERVAL_MS:  dotIntervalMs,

    // Config
    DAMAGE:           damage,
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,
    DISPLAY_NAME:     'SHORT CIRCUIT',
};

export default shortCircuit;
