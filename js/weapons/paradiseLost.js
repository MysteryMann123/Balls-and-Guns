import * as Homing from '../mechanics/shared/homing.js';
import * as MaxHpDamage from '../mechanics/shared/maxHpDamage.js';
import * as LifeSteal from '../mechanics/patterns/lifesteal.js';
import * as AllyHeal from '../mechanics/patterns/allyHeal.js';
import * as SelfDamage from '../mechanics/patterns/selfDamage.js';
import * as TeamAwareHit from '../mechanics/patterns/teamAwareHit.js';

// --- Ammo & Timing ---
const ammo                = 1;
const reloadMs            = 1666;
const fireRate            = 420;

// --- Projectile ---
const damageMin           = 33;
const damageMax           = 66;
const maxHpDamageMinRatio = 0.05;
const maxHpDamageMaxRatio = 0.095;
const speed               = 11;

// --- Homing ---
const homingStrength      = 0.06;
const homingRange         = 400;

// --- On-Hit ---
const lifeStealRatio      = 0.35;
const allyHealRatio       = 0.5;
const allyHealRadius      = 170;

// --- Adaptive Defense ---
const adaptiveResistance  = 0.8;
const adaptiveIntervalMs  = 5000;

// --- Self-Drain ---
const selfDotIntervalMs   = 800;
const selfDotMinRatio     = 0.01;
const selfDotMaxRatio     = 0.012;

// --- Config ---
const color          = '#ffe27a';
const projectileSize = 6;
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

const paradiseLost = {
    // Ammo & Timing
    AMMO:                    ammo,
    RELOAD_MS:               reloadMs,
    FIRE_RATE:               fireRate,

    // Projectile
    DAMAGE_MIN:              damageMin,
    DAMAGE_MAX:              damageMax,
    MAX_HP_DAMAGE_MIN_RATIO: maxHpDamageMinRatio,
    MAX_HP_DAMAGE_MAX_RATIO: maxHpDamageMaxRatio,
    maxHpDamage:             MaxHpDamage.create(maxHpDamageMinRatio, maxHpDamageMaxRatio),
    SPEED:                   speed,

    // Homing
    HOMING_STRENGTH:         homingStrength,
    HOMING_RANGE:            homingRange,
    homing:                  Homing.create(homingStrength, homingRange),
    teamAwareHit:            TeamAwareHit.create(),

    // On-Hit
    LIFESTEAL_RATIO:         lifeStealRatio,
    lifesteal:               LifeSteal.create(lifeStealRatio),
    ALLY_HEAL_RATIO:         allyHealRatio,
    ALLY_HEAL_RADIUS:        allyHealRadius,
    allyHeal:                AllyHeal.create(allyHealRatio, allyHealRadius),

    // Adaptive Defense
    ADAPTIVE_RESISTANCE:     adaptiveResistance,
    ADAPTIVE_INTERVAL_MS:    adaptiveIntervalMs,

    // Self-Drain
    SELF_DOT_INTERVAL_MS:    selfDotIntervalMs,
    SELF_DOT_MIN_RATIO:      selfDotMinRatio,
    SELF_DOT_MAX_RATIO:      selfDotMaxRatio,
    selfDamage:              SelfDamage.create(selfDotMinRatio, selfDotMaxRatio, selfDotIntervalMs),

    // Config
    COLOR:                   color,
    PROJECTILE_SIZE:         projectileSize,
    PELLETS_PER_SHOT:        pelletsPerShot,
    SPREAD_ANGLE:            spreadAngle,
    image: 'assets/EGOWeaponParadiseLost.webp',
    DISPLAY_NAME:            'EGO WEAPON PARADISE LOST',

    riskClass: 'ALEPH',

    description: [
        'ALEPH E.G.O weapon that fires a homing Apple projectile with anti-resistance damage profile.',
        'Damage per shot: 33-66 plus 5-9.5% of wielder max HP.',
        'Homing: slight guidance (400px range, strength 0.06).',
        'On hit lifesteal: restores 35% of actual damage dealt to the wielder.',
        'Nearby ally support: allies within 170px are healed for 50% of actual damage dealt.',
        'Adaptive defense: learns incoming damage type and gains 80% resistance to it, refreshing every 5s.',
        'Self-erosion: loses 1-1.2% max HP every 0.8s while equipped.',
        'Ignores move-speed slows and suffers a reduced low-HP speed penalty while active.'
    ],
};

export default paradiseLost;
