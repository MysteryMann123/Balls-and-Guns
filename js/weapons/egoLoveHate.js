// --- Ammo & Timing ---
const ammo                  = 1;
const fireRate              = 300;
const reloadMs              = 700;

// --- Projectile ---
const speed                 = 5;
const projectileSize        = 7;

// --- Red Shot ---
const redDamageMin          = 70;
const redDamageMax          = 100;

// --- Black Shot ---
const blackDamageMin        = 20;
const blackDamageMax        = 60;
const blackBurnMin          = 10;
const blackBurnMax          = 20;
const blackBurnIntervalMs   = 500;
const blackBurnDurationMs   = 2000;

// --- White Shot ---
const whiteDamageMin        = 10;
const whiteDamageMax        = 20;
const whiteBurnMin          = 30;
const whiteBurnMax          = 60;
const whiteBurnIntervalMs   = 500;
const whiteBurnDurationMs   = 1000;

// --- Pale Shot ---
const paleMinRatio          = 0.04;
const paleMaxRatio          = 0.06;

// --- Config ---
const color          = '#ff3333';
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
};

const egoLoveHate = {
    // Ammo & Timing
    AMMO:                   ammo,
    FIRE_RATE:              fireRate,
    RELOAD_MS:              reloadMs,

    // Projectile
    SPEED:                  speed,
    PROJECTILE_SIZE:        projectileSize,

    // Red Shot
    RED_DAMAGE_MIN:         redDamageMin,
    RED_DAMAGE_MAX:         redDamageMax,

    // Black Shot
    BLACK_DAMAGE_MIN:       blackDamageMin,
    BLACK_DAMAGE_MAX:       blackDamageMax,
    BLACK_BURN_MIN:         blackBurnMin,
    BLACK_BURN_MAX:         blackBurnMax,
    BLACK_BURN_INTERVAL_MS: blackBurnIntervalMs,
    BLACK_BURN_DURATION_MS: blackBurnDurationMs,

    // White Shot
    WHITE_DAMAGE_MIN:       whiteDamageMin,
    WHITE_DAMAGE_MAX:       whiteDamageMax,
    WHITE_BURN_MIN:         whiteBurnMin,
    WHITE_BURN_MAX:         whiteBurnMax,
    WHITE_BURN_INTERVAL_MS: whiteBurnIntervalMs,
    WHITE_BURN_DURATION_MS: whiteBurnDurationMs,

    // Pale Shot
    PALE_MIN_RATIO:         paleMinRatio,
    PALE_MAX_RATIO:         paleMaxRatio,

    // Config
    COLOR:                  color,
    PELLETS_PER_SHOT:       pelletsPerShot,
    SPREAD_ANGLE:           spreadAngle,
    image: 'assets/EGOWeaponIntheNameofLoveandHate.webp',
    DISPLAY_NAME:           'EGO: IN THE NAME OF LOVE AND HATE',

    riskClass: 'WAW',

    description: [
        'WAW E.G.O weapon — fires a single piercing round every 200 ms with a randomly chosen damage type per shot.',
        'Red (25%): 70-100 slashing damage.',
        'Black (25%): 20-60 blunt damage + 10-20 burn every 0.5s for 2s.',
        'White (25%): 10-20 divine damage + 30-60 burn every 0.5s for 1s.',
        'Pale (25%): deals 4-6% of the target\'s max HP as spiritual damage.',
        'All projectiles pierce through every target — they never stop on collision.',
        'Allied hits heal for half the equivalent damage instead of dealing damage (Pale heals half of its max HP ratio).'
    ],
};

export default egoLoveHate;
