// --- Ammo & Timing ---
const ammo        = 25;
const reloadMs    = 1850;
const fireRate    = 95;

// --- Projectile ---
const damage      = 20;
const speed       = 11;
const spreadAngle = 0.03;

// --- Config ---
const color          = '#b5ff66';
const projectileSize = 4;
const pelletsPerShot = 1;

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

const smg = {
    // Ammo & Timing
    AMMO:             ammo,
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,

    // Projectile
    DAMAGE:           damage,
    SPEED:            speed,
    SPREAD_ANGLE:     spreadAngle,

    // Config
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    image: 'assets/SMG.png',
    DISPLAY_NAME:     'SMG',
};

export default smg;
