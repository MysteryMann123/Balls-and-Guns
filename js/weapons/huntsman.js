import * as Sticking from '../mechanics/patterns/sticking.js';

// --- Config ---
const maxAmmo        = 1;
const reloadMs       = 1000;
const speed          = 15;
const fireRate       = 900;
const color          = '#f3f3f3';
const projectileSize = 8;
const pelletsPerShot = 1;
const spreadAngle    = 0.04;

// --- Damage ---
const damageMin       = 100;
const damageMax       = 180;

// --- On-Hit ---
const stickDurationMs = 1400;

const CONFIG = {
    maxAmmo,
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

const huntsman = {
    // Config
    MAX_AMMO:         maxAmmo,
    RELOAD_MS:        reloadMs,
    SPEED:            speed,
    FIRE_RATE:        fireRate,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,

    // Damage
    DAMAGE_MIN:        damageMin,
    DAMAGE_MAX:        damageMax,

    // On-Hit
    STICK_DURATION_MS: stickDurationMs,
    image: 'assets/Huntsman.png',
    DISPLAY_NAME:      'HUNTSMAN',

    mechanics: [
        Sticking.create(),
    ],

    description: (w) => [
        `Arrow projectile with slight wobble and stick duration ${(w.STICK_DURATION_MS / 1000).toFixed(1)}s.`,
        `Damage roll per shot: ${w.DAMAGE_MIN}-${w.DAMAGE_MAX}.`
    ],
};


export default huntsman;
