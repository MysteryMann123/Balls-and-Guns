import * as Slow from '../mechanics/shared/slow.js';
import * as Pierce from '../mechanics/shared/pierce.js';

// --- Ammo & Timing ---
const ammo                   = 1;
const fireRate               = 800;
const reloadMs               = 1250;

// --- Projectile ---
const damageMin              = 60;
const damageMax              = 90;
const speed                  = 12;
const projectileSize         = 11;
const pierceCount            = 3;

// --- On-Hit Effects ---
const slowDurationMs         = 2200;
const slowMultiplier         = 0.35;
const afterburnMultiplier    = 2;

// --- Wielder ---
const wielderSpeedMultiplier = 0.90;

// --- Config ---
const color          = '#ff69b4';
const pelletsPerShot = 1;
const spreadAngle    = 0.02;

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

const adoration = {
    // Ammo & Timing
    AMMO:                     ammo,
    FIRE_RATE:                fireRate,
    RELOAD_MS:                reloadMs,

    // Projectile
    DAMAGE_MIN:               damageMin,
    DAMAGE_MAX:               damageMax,
    SPEED:                    speed,
    PROJECTILE_SIZE:          projectileSize,
    PIERCE_COUNT:             pierceCount,
    pierce:                   Pierce.create(pierceCount),

    // On-Hit Effects
    SLOW_DURATION_MS:         slowDurationMs,
    SLOW_MULTIPLIER:          slowMultiplier,
    slow:                     Slow.create(slowDurationMs, slowMultiplier),
    AFTERBURN_MULTIPLIER:     afterburnMultiplier,

    // Wielder
    WIELDER_SPEED_MULTIPLIER: wielderSpeedMultiplier,

    // Config
    COLOR:                    color,
    PELLETS_PER_SHOT:         pelletsPerShot,
    SPREAD_ANGLE:             spreadAngle,
    image: 'assets/EGOWeaponAdoration.webp',
    DISPLAY_NAME:             'ADORATION',

    riskClass: 'ALEPH',

    description: (w) => [
        'ALEPH E.G.O weapon — a melting heart projectile that pierces and corrupts enemies with overwhelming slow.',
        `Damage per shot: ${w.DAMAGE_MIN}–${w.DAMAGE_MAX}, pierces up to ${w.PIERCE_COUNT} enemies.`,
        `On hit: slows enemy to ${Math.round(w.SLOW_MULTIPLIER * 100)}% move speed for ${(w.SLOW_DURATION_MS / 1000).toFixed(1)}s.`,
        `Any afterburn damage dealt to an adoration-slowed target is multiplied by x${w.AFTERBURN_MULTIPLIER}.`,
        'Damage bonus scales with how slowed the target is (any slow source): bonus = 1 + (1 − target slow ratio).',
        `Wielder is ${Math.round((1 - w.WIELDER_SPEED_MULTIPLIER) * 100)}% slower while equipped.`
    ],
};

export default adoration;
