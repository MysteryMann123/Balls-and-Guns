import * as Knockback from '../mechanics/knockback.js';
import * as SplashAoe from '../mechanics/splashAoe.js';
import * as MeleeAttack from '../mechanics/meleeAttack.js';

// --- Ammo ---
const ammo                = 4;

// --- Projectile ---
const speed               = 16;  // matches rocketLauncher SPEED (16)
const splashRadius        = 56;
const knockback           = 4;
const selfBlastImpulse    = 28;

// --- Melee ---
const meleeDamagePerSpeed = 30;
const meleeMinDamage      = 30;
const meleeMaxDamage      = 300;
const meleeCooldownMs     = 650;

// --- Config ---
const reloadMs       = 2400;
const fireRate       = 700;
const color          = '#8fd8ff';
const projectileSize = 8;
const pelletsPerShot = 1;
const spreadAngle    = 0;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
    splashRadius,
    knockbackStrength: knockback,
};

const rocketJumper = {
    // Ammo
    AMMO:                   ammo,

    // Projectile
    SPEED:                  speed,
    SPLASH_RADIUS:          splashRadius,
    splashAoe:              SplashAoe.create(splashRadius),
    KNOCKBACK:              knockback,
    knockback:              Knockback.create(selfBlastImpulse, knockback),
    SELF_BLAST_IMPULSE:     selfBlastImpulse,

    // Melee
    MELEE_DAMAGE_PER_SPEED: meleeDamagePerSpeed,
    MELEE_MIN_DAMAGE:       meleeMinDamage,
    MELEE_MAX_DAMAGE:       meleeMaxDamage,
    MELEE_COOLDOWN_MS:      meleeCooldownMs,
    meleeAttack:            MeleeAttack.create(100, 120, 400),

    // Config
    RELOAD_MS:              reloadMs,
    FIRE_RATE:              fireRate,
    COLOR:                  color,
    PROJECTILE_SIZE:        projectileSize,
    PELLETS_PER_SHOT:       pelletsPerShot,
    SPREAD_ANGLE:           spreadAngle,
    image: 'assets/Rocket_Jumper.png',
    DISPLAY_NAME:           'ROCKET JUMPER',
};

export default rocketJumper;
