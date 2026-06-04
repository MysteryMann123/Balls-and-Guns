import * as Slow from '../mechanics/shared/slow.js';

// --- Derived from revolver base values ---
const damage           = Math.round(55 * 0.8); // 80% of revolver DAMAGE (55)

// --- Ammo & Timing ---
const speed            = 18;
const fireRate         = 500;
const reloadMs         = 1350;
const ammo             = 6;

// --- On-Hit Effects ---
const slowDurationMs   = 2000;
const slowMultiplier   = 0.30;
const ammoRefundChance = 0.77;

// --- Config ---
const color          = '#a8a8a8';
const projectileSize = 4;
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
    slowDurationMs,
    slowMultiplier,
};

const egoLoneliness = {
    // Ammo & Timing
    DAMAGE:             damage,
    SPEED:              speed,
    FIRE_RATE:          fireRate,
    RELOAD_MS:          reloadMs,
    AMMO:               ammo,

    // On-Hit Effects
    SLOW_DURATION_MS:   slowDurationMs,
    SLOW_MULTIPLIER:    slowMultiplier,
    slow:               Slow.create(slowDurationMs, slowMultiplier),
    AMMO_REFUND_CHANCE: ammoRefundChance,

    // Config
    COLOR:              color,
    PROJECTILE_SIZE:    projectileSize,
    PELLETS_PER_SHOT:   pelletsPerShot,
    SPREAD_ANGLE:       spreadAngle,
    image: 'assets/EGOWeaponLoneliness.webp',
    DISPLAY_NAME:       'EGO WEAPON LONELINESS',

    riskClass: 'TETH',

    description: (w) => [
        'Revolver variant with a colder shot profile and light tracer feedback.',
        `Damage per shot: ${w.DAMAGE} (${Math.round((1 - (w.DAMAGE / 55)) * 100)}% lower than Revolver).`,
        `Projectile speed: ${w.SPEED} (slightly faster than the default Revolver shot).`,
        `On hit: applies ${Math.round((1 - w.SLOW_MULTIPLIER) * 100)}% slow for ${(w.SLOW_DURATION_MS / 1000).toFixed(1)}s.`,
        `Ammo refund: ${Math.round(w.AMMO_REFUND_CHANCE * 100)}% chance to refund 1 ammo on hit.`,
        'Uses the normal revolver projectile sprite, with a huntsman-style grey trail.'
    ],
};

export default egoLoneliness;
