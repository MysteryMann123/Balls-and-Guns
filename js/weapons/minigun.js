import * as FireRateRamp from '../mechanics/patterns/fireRateRamp.js';

// --- Config ---
const maxAmmo             = 200;
const reloadMs            = 8000;
const color               = '#f5d142';
const pelletsPerShot      = 2;
const spreadAngle         = 0.02;

// --- Projectile ---
const damageMin           = 6;
const damageMax           = 18;
const speed               = 15;
const projectileSize      = 5;

// --- Fire Rate Ramp ---
const fireRate            = 220;   // base (slowest) fire rate
const initialFireRate     = 320;   // starting currentFireRate each reload
const minFireRate         = 0.005; // fastest achievable fire rate
const rampPerShot         = 15;    // ms reduction per shot
const rampResetDelayMs    = 700;   // ms idle before rate resets to fireRate

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage: damageMin,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
    currentFireRate: initialFireRate,
    minFireRate,
    rampPerShot,
    rampResetDelayMs,
};

const minigun = {
    // Config
    MAX_AMMO:             maxAmmo,
    RELOAD_MS:            reloadMs,
    COLOR:                color,
    PELLETS_PER_SHOT:     pelletsPerShot,
    SPREAD_ANGLE:         spreadAngle,

    // Projectile
    DAMAGE_MIN:           damageMin,
    DAMAGE_MAX:           damageMax,
    SPEED:                speed,
    PROJECTILE_SIZE:      projectileSize,

    // Fire Rate Ramp
    FIRE_RATE:            fireRate,
    INITIAL_FIRE_RATE:    initialFireRate,
    MIN_FIRE_RATE:        minFireRate,
    RAMP_PER_SHOT:        rampPerShot,
    RAMP_RESET_DELAY_MS:  rampResetDelayMs,
    fireRateRamp:         FireRateRamp.create(fireRate, initialFireRate, minFireRate, rampPerShot, rampResetDelayMs),
    image: 'assets/Minigun_IMG.png',
    DISPLAY_NAME:         'MINIGUN',

    description: (w) => [
        'High-capacity heavy weapon with fire-rate ramp-up.',
        `Magazine: ${w.MAX_AMMO} rounds, damage per shot: ${w.DAMAGE_MIN}-${w.DAMAGE_MAX} (random roll).`,
        `Fire rate ramps down from ${w.INITIAL_FIRE_RATE}ms to base ${w.FIRE_RATE}ms with successive shots.`,
        `Ramp resets after ${(w.RAMP_RESET_DELAY_MS / 1000).toFixed(1)}s of idle.`,
        'Damage multiplier applies once ramped up; sustains damage output with continuous fire.'
    ],

    onAfterAmmoReset(weapon, now) {
        weapon.currentFireRate = weapon.fireRate;
    },

    getEffectiveFireRate(weapon, now) {
        if (now - weapon.lastShotAt > weapon.rampResetDelayMs) {
            weapon.currentFireRate = weapon.fireRate;
        }
        return weapon.currentFireRate;
    },

    onAfterShot(weapon, now) {
        weapon.currentFireRate = Math.max(weapon.minFireRate, weapon.currentFireRate - weapon.rampPerShot);
    },
};

export default minigun;
