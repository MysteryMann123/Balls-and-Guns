import * as SplashAoe from '../mechanics/patterns/splashAoe.js';
import * as Knockback from '../mechanics/patterns/knockback.js';
import * as FuseTimer from '../mechanics/patterns/fuseTimer.js';
import * as Doubledonk from '../mechanics/unique/doubledonk.js';

// --- Ammo & Timing ---
const ammo                = 4;
const reloadMs            = 1500;
const fireRate            = 800;

// --- Projectile ---
const damage              = 100;
const speed               = 18;
const projectileSize      = 8;

// --- Splash ---
const splashRadius        = 90;
const splashMaxDamage     = 100;

// --- Knockback ---
const knockbackStrength   = 12;

// --- Fuse ---
const fuseTimeMs          = 1000;  // Base fuse: 1 second
const minFuseMs           = 200;   // Cookable down to 200ms

// --- Double Donk ---
const doubledonkWindowMs  = 150;   // Explosion must hit within 150ms of projectile hit

// --- Config ---
const color               = '#d4a574';
const pelletsPerShot      = 1;
const spreadAngle         = 0;

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
};

const looseCannon = {
    // Ammo & Timing
    AMMO:                   ammo,
    RELOAD_MS:              reloadMs,
    FIRE_RATE:              fireRate,

    // Projectile
    DAMAGE:                 damage,
    SPEED:                  speed,
    PROJECTILE_SIZE:        projectileSize,

    // Splash
    SPLASH_RADIUS:          splashRadius,
    SPLASH_MAX_DAMAGE:      splashMaxDamage,

    // Knockback
    KNOCKBACK_STRENGTH:     knockbackStrength,

    // Fuse
    FUSE_TIME_MS:           fuseTimeMs,
    MIN_FUSE_MS:            minFuseMs,

    // Double Donk
    DOUBLEDONK_WINDOW_MS:   doubledonkWindowMs,

    // Mechanics
    splashAoe:              SplashAoe.create(splashRadius),
    knockback:              Knockback.create(knockbackStrength),
    fuseTimer:              FuseTimer.create(fuseTimeMs, minFuseMs),
    doubledonk:             Doubledonk.create(doubledonkWindowMs),

    // Config
    COLOR:                  color,
    PELLETS_PER_SHOT:       pelletsPerShot,
    SPREAD_ANGLE:           spreadAngle,
    image: null,
    DISPLAY_NAME:           'LOOSE CANNON',

    description: (w) => [
        `Cookable rocket launcher: ${w.AMMO} rockets, ${(w.RELOAD_MS / 1000).toFixed(1)}s reload.`,
        `Rockets can be cooked by holding fire to reduce fuse time (base ${w.FUSE_TIME_MS}ms → min ${w.MIN_FUSE_MS}ms).`,
        `Base damage: ${w.DAMAGE}. Splash radius: ${w.SPLASH_RADIUS}px (${w.SPLASH_MAX_DAMAGE} splash damage).`,
        `Explodes on impact or fuse expiry. Self-knockback applies.`,
        `Double Donk: if the projectile hits an enemy AND the explosion hits the same enemy within ${w.DOUBLEDONK_WINDOW_MS}ms, triggers bonus knockback (x${1.5}) and damage (x${1.25})!`
    ],

    CONFIG,

    getInfo() {
        return 'LOOSE CANNON';
    },
};

export default looseCannon;
