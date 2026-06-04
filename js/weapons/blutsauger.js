// --- Config ---
const maxAmmo        = 50;
const reloadMs       = 2200;
const speed          = 9;
const fireRate       = 180;
const color          = '#ff4d4d';
const projectileSize = 4;
const pelletsPerShot = 1;
const spreadAngle    = 0.07;

// --- Damage ---
const damage  = 15;

// --- Lifesteal ---
const healMin = 6.5;
const healMax = 11;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage,
    damageMin: damage,
    damageMax: damage,
    healMin,
    healMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const blutsauger = {
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
    DAMAGE:   damage,

    // Lifesteal
    HEAL_MIN: healMin,
    HEAL_MAX:     healMax,
    image: 'assets/Blutsauger.png',
    DISPLAY_NAME: 'BLUTSAUGER',

    description: (w) => [
        'Balanced SMG that fires projectile bullets with lifesteal on hits.',
        `Damage per shot: ${w.DAMAGE}.`,
        `Lifesteal per hit: ${w.HEAL_MIN}-${w.HEAL_MAX}.`,
        'Lifesteal works against enemy-aligned targets only.'
    ],
};

export default blutsauger;
