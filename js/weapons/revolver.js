// --- Config ---
const maxAmmo        = 6;
const reloadMs       = 1500;
const speed          = 12;
const fireRate       = 600;
const color          = '#ffd84d';
const projectileSize = 4;
const pelletsPerShot = 1;
const spreadAngle    = 0;

// --- Damage ---
const damage = 55;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const revolver = {
    // Config
    MAX_AMMO:        maxAmmo,
    RELOAD_MS:       reloadMs,
    SPEED:           speed,
    FIRE_RATE:       fireRate,
    COLOR:           color,
    PROJECTILE_SIZE: projectileSize,
    PELLETS_PER_SHOT: pelletsPerShot,
    SPREAD_ANGLE:    spreadAngle,

    // Damage
    DAMAGE:        damage,
    image: 'assets/Pistol.png',
    DISPLAY_NAME:  'REVOLVER',

    description: [
        'Legacy pistol behavior renamed to Revolver.',
        'Higher damage, slower fire cadence.'
    ],
};

export default revolver;
