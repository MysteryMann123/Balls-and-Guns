import * as Pierce from '../mechanics/shared/pierce.js';

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

    riskClass: 'WAW',

    description: (w) => [
        'WAW E.G.O weapon — a delicate arrow that trails a toxic floral aura.',
        `Direct hit: ${w.DAMAGE_MIN}–${w.DAMAGE_MAX} damage, pierces up to ${w.PIERCE_COUNT} enemies.`,
        `AOE trail around the arrow poisons enemies within ${w.AOE_RADIUS}px.`,
        `Poison ticks ${w.DOT_DAMAGE_MIN}–${w.DOT_DAMAGE_MAX} damage every ${w.DOT_INTERVAL_MS}ms for ${(w.DOT_DURATION_MS / 1000).toFixed(1)}s.`,
        `Reduces healing received by ${Math.round(w.HEAL_REDUCTION * 100)}% for the duration of the poison.`,
        'Pink flower particles trail behind the arrow to mark the toxic zone.'
    ],
};

export default faintAroma;
