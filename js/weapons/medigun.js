import * as LifeSteal from '../mechanics/patterns/lifesteal.js';
import * as AllyHeal from '../mechanics/patterns/allyHeal.js';

// --- Ammo & Timing ---
const ammo                 = 1;
const reloadMs             = 1000;

// --- Beam ---
const beamRange            = 550;
const allyHealPerSec       = 30;
const enemyDamagePerSec    = 20;
const enemyLifestealPerSec = 8;

// --- Self Regen ---
const selfRegenPerSec      = 4;
const selfRegenDelayMs     = 4000;
const selfRegenCap         = 14;
const overhealMultiplier   = 1.25;

// --- Uber ---
const uberHealThreshold    = 800;
const uberDamageThreshold  = 700;
const uberDurationMs       = 6000;

// --- Config ---
const damage         = 40;
const speed          = 0;
const fireRate       = 200;
const color          = '#ff4d4d';
const projectileSize = 0;
const pelletsPerShot = 1;
const spreadAngle    = 0;

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

const medigun = {
    // Ammo & Timing
    AMMO:                    ammo,
    RELOAD_MS:               reloadMs,

    // Beam
    BEAM_RANGE:              beamRange,
    ALLY_HEAL_PER_SEC:       allyHealPerSec,
    allyHeal:                AllyHeal.create(allyHealPerSec, beamRange),
    ENEMY_DAMAGE_PER_SEC:    enemyDamagePerSec,
    ENEMY_LIFESTEAL_PER_SEC: enemyLifestealPerSec,
    lifesteal:               LifeSteal.create(enemyLifestealPerSec),

    // Self Regen
    SELF_REGEN_PER_SEC:      selfRegenPerSec,
    SELF_REGEN_DELAY_MS:     selfRegenDelayMs,
    SELF_REGEN_CAP:          selfRegenCap,
    OVERHEAL_MULTIPLIER:     overhealMultiplier,

    // Uber
    UBER_HEAL_THRESHOLD:     uberHealThreshold,
    UBER_DAMAGE_THRESHOLD:   uberDamageThreshold,
    UBER_DURATION_MS:        uberDurationMs,

    // Config
    DAMAGE:                  damage,
    SPEED:                   speed,
    FIRE_RATE:               fireRate,
    COLOR:                   color,
    PROJECTILE_SIZE:         projectileSize,
    PELLETS_PER_SHOT:        pelletsPerShot,
    SPREAD_ANGLE:            spreadAngle,
    image: 'assets/RED_Medigun.png',
    DISPLAY_NAME:            'MEDIGUN',

    description: [
        'Beam attachment weapon: heals allies, damages + lifesteals from enemies.',
        'Ally overheal cap: 125% max HP (visual: lighter bar color).',
        'Self HP regen when not healing: 4/sec (after 4s idle).',
        'Regen cap: 14 HP.',
        'Uber threshold: build from 800 healing OR 700 damage taken.',
        'Uber invulnerability duration: 6s (applies to holder and target).'
    ],
};

export default medigun;
