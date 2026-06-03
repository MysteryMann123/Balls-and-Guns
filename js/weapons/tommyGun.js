// --- Derived from smg base values ---
const ammo        = Math.round(25 * 2.2);      // 220% of smg AMMO (25)
const reloadMs    = Math.round(1850 * 1.2);    // 120% of smg RELOAD_MS (1850)
const damage      = 20 * 0.9;                  // 90% of smg DAMAGE (20)
const speed       = Math.round(11 * 11) / 10;  // smg SPEED (11) × 1.1, one-decimal precision
const fireRate    = Math.round(95 * 0.9);      // 90% of smg FIRE_RATE (95)
const spreadAngle = 0.03 * 1.5;               // 150% of smg SPREAD_ANGLE (0.03)

// --- Config ---
const color          = '#d4a35a';
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

const tommyGun = {
    AMMO:             ammo,
    RELOAD_MS:        reloadMs,
    DAMAGE:           damage,
    SPEED:            speed,
    FIRE_RATE:        fireRate,
    SPREAD_ANGLE:     spreadAngle,

    // Config
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    image: 'assets/TOMMY_GUN.png',
    DISPLAY_NAME:     'TOMMY GUN',
};

export default tommyGun;
