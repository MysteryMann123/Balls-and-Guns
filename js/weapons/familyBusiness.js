// --- Derived from shotgun base values ---
const damageMin      = Math.round(4 * 0.75);  // 75% of shotgun DAMAGE_MIN (4)
const damageMax      = Math.round(25 * 0.75); // 75% of shotgun DAMAGE_MAX (25)
const hitscanRange   = 750;                   // matches shotgun HITSCAN_RANGE (750)

// --- Ammo & Timing ---
const ammo           = 9;
const reloadMs       = 3000;
const fireRate       = 780;

// --- Projectile ---
const pelletsPerShot = 6;
const spreadAngle    = 0.11;

// --- Config ---
const speed = 50;
const color = '#d78f49';
const projectileSize = 4;

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

const familyBusiness = {
    // Ammo & Timing
    AMMO:             ammo,
    RELOAD_MS:        reloadMs,
    FIRE_RATE:        fireRate,

    // Projectile
    PELLETS_PER_SHOT: pelletsPerShot,
    DAMAGE_MIN:       damageMin,
    DAMAGE_MAX:       damageMax,
    HITSCAN_RANGE:    hitscanRange,
    SPREAD_ANGLE:     spreadAngle,

    // Config
    SPEED:            speed,
    COLOR:            color,
    PROJECTILE_SIZE:  projectileSize,
    DISPLAY_NAME:     'FAMILY BUSINESS',
};


export default familyBusiness;
