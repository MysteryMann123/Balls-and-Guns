import * as Homing    from '../mechanics/shared/homing.js';
import * as Afterburn from '../mechanics/shared/afterburn.js';
import * as Tracer    from '../mechanics/shared/tracer.js';
import * as TeamAwareHit from '../mechanics/patterns/teamAwareHit.js';

// --- Ammo & Timing ---
const ammo                     = 7;
const reloadMs                 = 6666.666;
const fireRate                 = 1666.6;

// --- Projectile ---
const damageMin                = 266.6;
const damageMax                = 333.666;
const speed                    = 25;
const spreadAngle              = 0.00666;
const projectileSize           = 7.666;

// --- Homing ---
const homingStrength           = 0.04666;
const homingRange              = 520;

// --- Afterburn ---
const afterburnDamageMin       = 6.66;
const afterburnDamageMax       = 16.66;
const afterburnIntervalMs      = 500;
const afterburnDurationMs      = 4500;

// --- Curse ---
const curseCycle               = 7;
const selfHitMultiplier        = 3.66;
const curseSpawnBehindDistance = 110;

// --- Tracer ---
const tracerRange              = 15000;
const tracerDurationMs         = 150;

// --- Config ---
const color          = '#b575ff';
const pelletsPerShot = 1;

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

const egoMagicBullet = {
    // Ammo & Timing
    AMMO:                        ammo,
    RELOAD_MS:                   reloadMs,
    FIRE_RATE:                   fireRate,

    // Projectile
    DAMAGE_MIN:                  damageMin,
    DAMAGE_MAX:                  damageMax,
    SPEED:                       speed,
    SPREAD_ANGLE:                spreadAngle,
    PROJECTILE_SIZE:             projectileSize,

    // Homing
    HOMING_STRENGTH:             homingStrength,
    HOMING_RANGE:                homingRange,
    homing:                      Homing.create(homingStrength, homingRange),
    teamAwareHit:                TeamAwareHit.create(),

    // Afterburn
    AFTERBURN_DAMAGE_MIN:        afterburnDamageMin,
    AFTERBURN_DAMAGE_MAX:        afterburnDamageMax,
    AFTERBURN_INTERVAL_MS:       afterburnIntervalMs,
    AFTERBURN_DURATION_MS:       afterburnDurationMs,
    afterburn:                   Afterburn.create(afterburnDamageMin, afterburnDamageMax, afterburnIntervalMs, afterburnDurationMs),

    // Curse
    CURSE_CYCLE:                 curseCycle,
    SELF_HIT_MULTIPLIER:         selfHitMultiplier,
    CURSE_SPAWN_BEHIND_DISTANCE: curseSpawnBehindDistance,

    // Tracer
    TRACER_RANGE:                tracerRange,
    TRACER_DURATION_MS:          tracerDurationMs,
    tracer:                      Tracer.create(tracerRange, tracerDurationMs),

    // Config
    COLOR:                       color,
    PELLETS_PER_SHOT:            pelletsPerShot,
    images: {
        weapon: 'assets/EGOWeaponMagicBullet.webp',
        portal: 'assets/DerFreischützPortal.png',
    },
    DISPLAY_NAME:                'EGO MAGIC BULLET',

    description: (w) => [
        'Cursed magic weapon with infinite pierce, fast projectile speed, and slight homing.',
        `Damage per shot: ${Math.round(w.DAMAGE_MIN)}-${Math.round(w.DAMAGE_MAX)}.`,
        `Afterburn: ${Math.round(w.AFTERBURN_DAMAGE_MIN)}-${Math.round(w.AFTERBURN_DAMAGE_MAX)} per ${(w.AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(w.AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Every ${w.CURSE_CYCLE}th shot always self-hits for ${Math.round(w.SELF_HIT_MULTIPLIER * 100)}% shot damage, then applies the same afterburn.`,
        'The cursed shot spawns behind the wielder and pierces through anyone along its path.'
    ],
};

export default egoMagicBullet;
