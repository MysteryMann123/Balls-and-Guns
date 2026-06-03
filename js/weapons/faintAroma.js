import * as Pierce from '../mechanics/pierce.js';

// --- Config ---
const maxAmmo        = 1;
const reloadMs       = 1250;
const fireRate       = 350;
const color          = '#ff88cc';
const pelletsPerShot = 1;
const spreadAngle    = 0.02;

// --- Projectile ---
const damageMin        = 60;
const damageMax        = 85;
const speed            = 12;
const projectileSize   = 8;
const pierceCount      = 3;

// --- Poison DOT ---
const dotDamageMin     = 13;
const dotDamageMax     = 15;
const dotIntervalMs    = 400;
const dotDurationMs    = 2800;
const healReduction    = 0.30;

// --- AOE ---
const aoeRadius        = 50;
const aoeHitCooldownMs = 800;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin: dotDamageMin,
    damageMax: dotDamageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const faintAroma = {
    // Config
    MAX_AMMO:           maxAmmo,
    RELOAD_MS:          reloadMs,
    FIRE_RATE:          fireRate,
    COLOR:              color,
    PELLETS_PER_SHOT:   pelletsPerShot,
    SPREAD_ANGLE:       spreadAngle,

    // Projectile
    DAMAGE_MIN:          damageMin,
    DAMAGE_MAX:          damageMax,
    SPEED:               speed,
    PROJECTILE_SIZE:     projectileSize,
    PIERCE_COUNT:        pierceCount,
    pierce:              Pierce.create(pierceCount),

    // Poison DOT
    DOT_DAMAGE_MIN:      dotDamageMin,
    DOT_DAMAGE_MAX:      dotDamageMax,
    DOT_INTERVAL_MS:     dotIntervalMs,
    DOT_DURATION_MS:     dotDurationMs,
    HEAL_REDUCTION:      healReduction,

    AOE_RADIUS:          aoeRadius,
    AOE_HIT_COOLDOWN_MS: aoeHitCooldownMs,
    image: 'assets/EGOWeaponReverberation.webp',
    DISPLAY_NAME:        'FAINT AROMA',
};

export default faintAroma;
