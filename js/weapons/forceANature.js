import * as Hitscan from '../mechanics/shared/hitscan.js';
import * as Knockback from '../mechanics/patterns/knockback.js';

// --- Ammo & Timing ---
const ammo           = 2;
const reloadMs       = 1600;
const fireRate       = 380;

// --- Projectile ---
const pelletsPerShot = 8;
const damageMin      = 3;
const damageMax      = 32;
const spreadAngle    = 0.25;
const hitscanRange   = 750; // matches shotgun HITSCAN_RANGE (750)

// --- Knockback ---
const selfKnockback  = 3.2;
const enemyKnockback = 1.1;

// --- Config ---
const speed          = 50;
const color          = '#b6f4ff';
const projectileSize = 4;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: damageMax,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
    selfKnockback,
    enemyKnockback,
};

const forceANature = {
    // Ammo & Timing
    AMMO:             ammo,
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,

    // Projectile
    PELLETS_PER_SHOT: pelletsPerShot,
    DAMAGE_MIN:       damageMin,
    DAMAGE_MAX:       damageMax,
    SPREAD_ANGLE:     spreadAngle,
    HITSCAN_RANGE:    hitscanRange,
    hitscan:          Hitscan.create(hitscanRange),

    // Knockback
    SELF_KNOCKBACK:   selfKnockback,
    ENEMY_KNOCKBACK:  enemyKnockback,
    knockback:        Knockback.create(selfKnockback, enemyKnockback),

    // Config
    SPEED:            speed,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    image: 'assets/Force-A-Nature.png',
    DISPLAY_NAME:     'FORCE-A-NATURE',

    description: [
        'Double-barrel shotgun variant with 2-shell chamber and 1.6s reload.',
        'Pellet damage range: 3-32 (shotgun-style falloff, higher max damage).',
        'Slower unload at 380ms between shots compared to Soda Popper\'s 260ms.',
        'Applies self-recoil (3.2) and enemy knockback (1.1) on hit.',
        'No Hype meter: pure burst + knockback utility.'
    ],
};

export default forceANature;
