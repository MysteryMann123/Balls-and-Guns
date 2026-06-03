// --- Ammo & Timing ---
const ammo      = 1;
const reloadMs  = 1800;

// --- Damage ---
const damageMin = 100;
const damageMax = 150;

// --- Ally Heal ---
const healMin   = 75;
const healMax   = 100;

// --- Config ---
const speed          = 15;
const fireRate       = 1200;
const color          = '#95f85f';
const projectileSize = 7;
const pelletsPerShot = 1;
const spreadAngle    = 0.03;

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

const crusadersCrossbow = {
    // Ammo & Timing
    AMMO:             ammo,
    RELOAD_MS:        reloadMs,

    // Damage
    DAMAGE_MIN:       damageMin,
    DAMAGE_MAX:       damageMax,

    // Ally Heal
    HEAL_MIN:         healMin,
    HEAL_MAX:         healMax,

    // Config
    SPEED:            speed,
    FIRE_RATE:        fireRate,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:     spreadAngle,
    image: 'assets/RED_Crusader\'s_Crossbow.png',
    DISPLAY_NAME:     "CRUSADER'S CROSSBOW",
};


export default crusadersCrossbow;
