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
    ENEMY_DAMAGE_PER_SEC:    enemyDamagePerSec,
    ENEMY_LIFESTEAL_PER_SEC: enemyLifestealPerSec,

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
};

export default medigun;
