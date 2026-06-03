// --- Config ---
const maxAmmo        = 1;
const reloadMs       = 2500;
const speed          = 25;
const fireRate       = 900;
const color          = '#66d9ff';
const projectileSize = 5;
const pelletsPerShot = 1;
const spreadAngle    = 0;

// --- Damage ---
const damageMin = 150;
const damageMax = 300;

const CONFIG = {
    maxAmmo,
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
};

const sniper = {
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
    DAMAGE_MIN: damageMin,
    DAMAGE_MAX:   damageMax,
    image: 'assets/Sniper_rifle.png',
    DISPLAY_NAME: 'SNIPER',
};

export default sniper;
