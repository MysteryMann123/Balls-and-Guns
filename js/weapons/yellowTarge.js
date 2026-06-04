import * as Knockback from '../mechanics/patterns/knockback.js';

// --- Charge ---
const chargeReloadMs        = 2500;
const chargeTriggerRange    = 1000;
const chargeImpulse         = 40;
const chargeMaxDurationMs   = 1000;
const chargeDamageMin       = 45;
const chargeDamageMax       = 260;
const damagePerDistance     = 0.62;
const knockback             = 5.4;

// --- Damage Reduction ---
const damageReductionAll        = 0.2;
const damageReductionExplosive  = 0.3;

// --- Config (shield — no standard projectile) ---
const maxAmmo        = 1;
const damage         = 0;
const speed          = 0;
const fireRate       = 400;
const color          = '#ffd84d';
const projectileSize = 0;
const pelletsPerShot = 1;
const spreadAngle    = 0;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: chargeReloadMs,
    damage,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const yellowTarge = {
    // Charge
    CHARGE_RELOAD_MS:           chargeReloadMs,
    CHARGE_TRIGGER_RANGE:       chargeTriggerRange,
    CHARGE_IMPULSE:             chargeImpulse,
    CHARGE_MAX_DURATION_MS:     chargeMaxDurationMs,
    CHARGE_DAMAGE_MIN:          chargeDamageMin,
    CHARGE_DAMAGE_MAX:          chargeDamageMax,
    DAMAGE_PER_DISTANCE:        damagePerDistance,
    KNOCKBACK:                  knockback,
    knockbackMech:              Knockback.create(chargeImpulse, knockback),

    // Damage Reduction
    DAMAGE_REDUCTION_ALL:       damageReductionAll,
    DAMAGE_REDUCTION_EXPLOSIVE: damageReductionExplosive,

    // Config
    MAX_AMMO:                   maxAmmo,
    DAMAGE:                     damage,
    SPEED:                      speed,
    FIRE_RATE:                  fireRate,
    COLOR:                      color,
    PROJECTILE_SIZE:            projectileSize,
    PELLETS_PER_SHOT:           pelletsPerShot,
    SPREAD_ANGLE:               spreadAngle,
    image: 'assets/YellowTarge.png',
    DISPLAY_NAME:               "CHARGIN' TARGE",

    description: [
        'Charge weapon: gains damage and knockback while sliding toward enemies.',
        'Base damage resistances: 20% all sources, 30% explosive.',
        'Charge damage: scales with distance traveled during charge activation.',
        'Charge trigger range: 1000px (auto targets nearest enemy).',
        'Charge impulse: 40 (propels toward target).'
    ],
};


export default yellowTarge;
