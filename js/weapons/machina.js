// --- Config ---
const maxAmmo        = 1;
const reloadMs       = 2500;
const speed          = 25;
const fireRate       = 900;
const color          = '#ffffff';
const projectileSize = 4;
const pelletsPerShot = 1;
const spreadAngle    = 0;

// --- Damage ---
const damageMin        = 150;
const damageMax        = 275;

// --- Tracer ---
const tracerRange      = 950;
const tracerDurationMs = 90;

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

const machina = {
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
    DAMAGE_MIN:         damageMin,
    DAMAGE_MAX:         damageMax,

    // Tracer
    TRACER_RANGE:       tracerRange,
    TRACER_DURATION_MS: tracerDurationMs,
    image: 'assets/Machina.png',
    DISPLAY_NAME:       'MACHINA',

    description: [
        'Piercing rounds with long team-colored tracer rays.',
        'Damage roll per shot: 150-275.',
        'Can pass through multiple targets; ignores early shots on same ball.'
    ],
};


export default machina;
