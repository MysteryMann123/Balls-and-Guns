import * as SplashAoe from '../mechanics/patterns/splashAoe.js';

// --- Ammo ---
const ammo               = 4;

// --- Projectile ---
const damage             = 125;
const speed              = 16 * 1.8;   // 180% of rocketLauncher SPEED (16)
const splashRadius       = 90 * 0.25;  // 25% of rocketLauncher SPLASH_RADIUS (90)

// --- Conditional Bonus ---
const vsFasterMultiplier = 1.5;

// --- Config ---
const reloadMs       = 2400;
const fireRate       = 950;
const color          = '#ff8f4f';
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

const directHit = {
    // Ammo
    AMMO:                 ammo,

    // Projectile
    DAMAGE:               damage,
    SPEED:                speed,
    SPLASH_RADIUS:        splashRadius,
    splashAoe:            SplashAoe.create(splashRadius),

    // Conditional Bonus
    VS_FASTER_MULTIPLIER: vsFasterMultiplier,

    // Config
    RELOAD_MS:            reloadMs,
    FIRE_RATE:            fireRate,
    COLOR:                color,
    PROJECTILE_SIZE:      projectileSize,
    PELLETS_PER_SHOT:     pelletsPerShot,
    SPREAD_ANGLE:         spreadAngle,
    image: 'assets/Directhittransparent.png',
    DISPLAY_NAME:         'DIRECT HIT',

    description: [
        'Rocket variant: faster projectile, tighter splash radius, bonus vs faster targets.',
        'Speed boost: x1.8 vs standard rocket.',
        'Splash radius penalty: x0.25 vs standard rocket.',
        'Bonus vs faster target: x1.5 damage if target is faster than shooter.'
    ],
};

export default directHit;
