// --- Ammo & Timing ---
const ammo                = 50;
const reloadMs            = 2500;

// --- Fire Rate Ramp ---
const fireRateBase        = 1150;
const fireRateMin         = 50;
const rampRateMsPerSec    = 100;
const idleResetMs         = 4000;

// --- Projectile ---
const damageMin           = 23;
const damageMax           = 30;
const speed               = 16;
const projectileSize      = 8;

// --- Scaling ---
const ammoRefundRatio     = 0.08;
const damageMultiplierMax = 2;

// --- Config ---
const color          = '#f3f3f3';
const pelletsPerShot = 1;
const spreadAngle    = 0.04;

const hypocrisy = {
    // Ammo & Timing
    AMMO:                  ammo,
    RELOAD_MS:             reloadMs,

    // Fire Rate Ramp
    FIRE_RATE_BASE:        fireRateBase,
    FIRE_RATE_MIN:         fireRateMin,
    RAMP_RATE_MS_PER_SEC:  rampRateMsPerSec,
    IDLE_RESET_MS:         idleResetMs,

    // Projectile
    DAMAGE_MIN:            damageMin,
    DAMAGE_MAX:            damageMax,
    SPEED:                 speed,
    PROJECTILE_SIZE:       projectileSize,

    // Scaling
    AMMO_REFUND_RATIO:     ammoRefundRatio,
    DAMAGE_MULTIPLIER_MAX: damageMultiplierMax,

    // Config
    COLOR:                 color,
    PELLETS_PER_SHOT:      pelletsPerShot,
    SPREAD_ANGLE:          spreadAngle,
    image: 'assets/EGOWeaponHypocrisy.webp',
    DISPLAY_NAME:          'EGO WEAPON HYPOCRISY',

    // No hooks: rampRatePerSec/minFireRate/rampResetDelayMs on the
    // WEAPON_CONFIGS entry in weapon.js are enough for the engine's
    // declarative fireRateRamp handling (percentage-decay mode) to
    // reproduce the accelerating-fire/idle-reset behavior.
};

export default hypocrisy;
