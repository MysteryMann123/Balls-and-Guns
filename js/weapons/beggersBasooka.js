import * as SplashAoe from '../mechanics/splashAoe.js';

// --- Ammo & Timing ---
const ammo         = 4;
const reloadMs     = 3800;
const fireRate     = 180;
const deviation    = 0.15;

// --- Derived from rocketLauncher base values ---
const damage       = Math.round(100 * 0.8);  // 80% of rocketLauncher DIRECT_DAMAGE (100)
const speed        = 16 * 1.4;               // 140% of rocketLauncher SPEED (16)
const splashRadius = Math.round(90 * 0.75);  // 75% of rocketLauncher SPLASH_RADIUS (90)

// --- Config ---
const color          = '#ffa66d';
const projectileSize = 9;
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
    spreadAngle: deviation,
    splashRadius,
};

const beggersBasooka = {
    // Ammo & Timing
    AMMO:             ammo,
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,
    DEVIATION:        deviation,

    // Projectile
    DAMAGE:           damage,
    SPEED:            speed,
    SPLASH_RADIUS:    splashRadius,
    splashAoe:        SplashAoe.create(splashRadius),

    // Config
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    image: 'assets/Beggar\'s_Bazooka.png',
    DISPLAY_NAME:     "BEGGER'S BAZOOKA",
};

export default beggersBasooka;
