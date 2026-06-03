// --- Config ---
const maxAmmo        = 12;
const reloadMs       = 1600;
const speed          = 12;
const fireRate       = 120;
const color          = '#ffff00';
const projectileSize = 4;
const pelletsPerShot = 1;
const spreadAngle    = 0.35;

// --- Damage ---
const damage = 20;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const pistol = {
    // Config
    MAX_AMMO:        maxAmmo,
    RELOAD_MS:       reloadMs,
    SPEED:           speed,
    FIRE_RATE:       fireRate,
    COLOR:           color,
    PROJECTILE_SIZE: projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:    spreadAngle,

    // Damage
    DAMAGE:        damage,
    image: 'assets/Pistol_True.png',
    DISPLAY_NAME:  'PISTOL',
};

export default pistol;
