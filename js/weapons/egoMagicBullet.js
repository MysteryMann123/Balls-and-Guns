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

    // Afterburn
    AFTERBURN_DAMAGE_MIN:        afterburnDamageMin,
    AFTERBURN_DAMAGE_MAX:        afterburnDamageMax,
    AFTERBURN_INTERVAL_MS:       afterburnIntervalMs,
    AFTERBURN_DURATION_MS:       afterburnDurationMs,

    // Curse
    CURSE_CYCLE:                 curseCycle,
    SELF_HIT_MULTIPLIER:         selfHitMultiplier,
    CURSE_SPAWN_BEHIND_DISTANCE: curseSpawnBehindDistance,

    // Tracer
    TRACER_RANGE:                tracerRange,
    TRACER_DURATION_MS:          tracerDurationMs,

    // Config
    COLOR:                       color,
    PELLETS_PER_SHOT:            pelletsPerShot,
    images: {
        weapon: 'assets/EGOWeaponMagicBullet.webp',
        portal: 'assets/DerFreischützPortal.png',
    },
    DISPLAY_NAME:                'EGO MAGIC BULLET',
};

export default egoMagicBullet;
