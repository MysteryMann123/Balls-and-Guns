import * as SplashAoe from '../mechanics/patterns/splashAoe.js';

// --- Derived from rocketLauncher and directHit base values ---
const ammo              = 4;                        // matches directHit AMMO (4)
const damage            = Math.round(100 * 0.72);  // 72% of rocketLauncher DIRECT_DAMAGE (100)
const speed             = 16 * 0.25;               // 25% of rocketLauncher SPEED (16)
const splashRadius      = 90 * 1.88;               // 188% of rocketLauncher SPLASH_RADIUS (90)

// --- Conditional Bonus ---
const vsSlowerMultiplier = 1.3;

// --- Config ---
const reloadMs       = 2400;
const fireRate       = 950;
const color          = '#ffb58a';
const projectileSize = 8;
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
    splashRadius,
};

const nearMissed = {
    // Projectile
    AMMO:                  ammo,
    DAMAGE:                damage,
    SPEED:                 speed,
    SPLASH_RADIUS:         splashRadius,
    splashAoe:             SplashAoe.create(splashRadius),

    // Conditional Bonus
    VS_SLOWER_MULTIPLIER:  vsSlowerMultiplier,

    // Config
    RELOAD_MS:             reloadMs,
    FIRE_RATE:             fireRate,
    COLOR:                 color,
    PROJECTILE_SIZE:       projectileSize,
    PELLETS_PER_SHOT:      pelletsPerShot,
    SPREAD_ANGLE:          spreadAngle,
    image: 'assets/Directhittransparent.png',
    DISPLAY_NAME:          'NEAR MISSED',
};

export default nearMissed;
