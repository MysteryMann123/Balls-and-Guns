import * as SplashAoe from '../mechanics/patterns/splashAoe.js';

// --- Ammo ---
const ammo         = 4;

// --- Projectile ---
const directDamage = 100;
const speed        = 16;
const splashRadius = 90;

// --- Config ---
const reloadMs       = 2400;
const fireRate       = 950;
const color          = '#ff954d';
const projectileSize = 9;
const pelletsPerShot = 1;
const spreadAngle    = 0;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: directDamage,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
    splashRadius,
};

const rocketLauncher = {
    // Ammo
    AMMO:             ammo,

    // Projectile
    DIRECT_DAMAGE:    directDamage,
    SPEED:            speed,
    SPLASH_RADIUS:    splashRadius,
    splashAoe:        SplashAoe.create(splashRadius),

    // Config
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,
    image: 'assets/Rocket_launcher.png',
    DISPLAY_NAME:     'ROCKET',

    description: (w) => [
        'Explosive launcher with knockback splash falloff.',
        `Direct hit damage: ${w.DIRECT_DAMAGE}.`,
        `Splash radius: ${w.SPLASH_RADIUS}px with falloff damage.`,
        'Knockback scales by explosion falloff distance.',
        'Splash is area-of-effect but can self-damage the shooter if standing in own explosion.'
    ],
};

export default rocketLauncher;
