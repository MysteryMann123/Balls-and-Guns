import * as Homing from '../mechanics/shared/homing.js';
import * as TeamAwareHit from '../mechanics/patterns/teamAwareHit.js';

// --- Ammo & Timing ---
const ammo                    = 1;
const reloadMs                = 1200;
const fireRate                = 260;

// --- Projectile ---
const damageMin               = 60;
const damageMax               = 75;
const speed                   = 10;
const projectileSize          = 11;

// --- Homing ---
const homingStrength          = 0.06;
const homingRange             = 420;

// --- Teleport ---
const teleportDistance        = 160;
const teleportSmokeDurationMs = 360;

// --- Config ---
const color          = '#f6f1ff';
const pelletsPerShot = 1;
const spreadAngle    = 0;

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
    pelletsPerShot,
    spreadAngle,
};

const magicianHat = {
    // Ammo & Timing
    AMMO:                       ammo,
    RELOAD_MS:                  reloadMs,
    FIRE_RATE:                  fireRate,

    // Projectile
    DAMAGE_MIN:                 damageMin,
    DAMAGE_MAX:                 damageMax,
    SPEED:                      speed,
    PROJECTILE_SIZE:            projectileSize,

    // Homing
    HOMING_STRENGTH:            homingStrength,
    HOMING_RANGE:               homingRange,
    homing:                     Homing.create(homingStrength, homingRange),
    teamAwareHit:               TeamAwareHit.create(),

    // Teleport
    TELEPORT_DISTANCE:          teleportDistance,
    TELEPORT_SMOKE_DURATION_MS: teleportSmokeDurationMs,

    // Config
    COLOR:                      color,
    PELLETS_PER_SHOT:           pelletsPerShot,
    SPREAD_ANGLE:               spreadAngle,
    image: 'assets/Magic-Hat-PNG-Image-File-3052888691.png',
    DISPLAY_NAME:               'MAGICIAN HAT',
};

export default magicianHat;
