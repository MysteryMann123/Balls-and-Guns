import * as Afterburn from '../mechanics/shared/afterburn.js';
import * as Pierce from '../mechanics/shared/pierce.js';

// --- Ammo & Timing ---
const ammo                = 200;
const fireRate            = 1;

// --- Projectile ---
const damageMin           = 2;
const damageMax           = 5;
const particlesPerShot    = 4;
const speed               = 15;
const spreadAngle         = 0.09;
const particleLifetimeMs  = 380;
const hitscanRange        = 400;
const pierceCount         = 10;

// --- Afterburn ---
const afterburnDamageMin  = 5;
const afterburnDamageMax  = 6;
const afterburnIntervalMs = 500;
const afterburnDurationMs = 3500;

// --- Airblast ---
const airblastCooldownMs  = 3500;
const airblastAmmoCost    = 20;

// --- Config ---
const reloadMs       = 3200;
const color          = '#ff8b3d';
const projectileSize = 5;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot: particlesPerShot,
    spreadAngle,
};

const flamethrower = {
    // Ammo & Timing
    AMMO:                  ammo,
    FIRE_RATE:             fireRate,

    // Projectile
    DAMAGE_MIN:            damageMin,
    DAMAGE_MAX:            damageMax,
    PARTICLES_PER_SHOT:    particlesPerShot,
    SPEED:                 speed,
    SPREAD_ANGLE:          spreadAngle,
    PARTICLE_LIFETIME_MS:  particleLifetimeMs,
    HITSCAN_RANGE:         hitscanRange,
    PIERCE_COUNT:          pierceCount,
    pierce:                Pierce.create(pierceCount),

    // Afterburn
    AFTERBURN_DAMAGE_MIN:  afterburnDamageMin,
    AFTERBURN_DAMAGE_MAX:  afterburnDamageMax,
    AFTERBURN_INTERVAL_MS: afterburnIntervalMs,
    AFTERBURN_DURATION_MS: afterburnDurationMs,
    afterburn:             Afterburn.create(afterburnDamageMin, afterburnDamageMax, afterburnIntervalMs, afterburnDurationMs),

    // Airblast
    AIRBLAST_COOLDOWN_MS:  airblastCooldownMs,
    AIRBLAST_AMMO_COST:    airblastAmmoCost,

    // Config
    RELOAD_MS:             reloadMs,
    COLOR:                 color,
    PROJECTILE_SIZE:       projectileSize,
    image: 'assets/RedFlamethrowerpng.png',
    DISPLAY_NAME:          'FLAMETHROWER',
};

export default flamethrower;
