// --- Ammo & Timing ---
const ammo                   = 1;
const reloadMs               = 2500;
const fireRate               = 500;

// --- Projectile ---
const damageMin              = 400;
const damageMax              = 500;
const speed                  = 20;
const spreadAngle            = 0.38;

// --- Bayonet ---
const bayonetDamageMin       = 60;
const bayonetDamageMax       = 80;
const bayonetRange           = 28;
const bayonetCooldownMs      = 800;
const bayonetBleedDamageMin  = 3;
const bayonetBleedDamageMax  = 6;
const bayonetBleedIntervalMs = 500;
const bayonetBleedDurationMs = 3000;
const bayonetHealMultiplier  = 0.5;

// --- Config ---
const color          = '#f1e6cf';
const projectileSize = 5;
const pelletsPerShot = 1;

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

const musket = {
    // Ammo & Timing
    AMMO:                      ammo,
    RELOAD_MS:                 reloadMs,
    FIRE_RATE:                 fireRate,

    // Projectile
    DAMAGE_MIN:                damageMin,
    DAMAGE_MAX:                damageMax,
    SPEED:                     speed,
    SPREAD_ANGLE:              spreadAngle,

    // Bayonet
    BAYONET_DAMAGE_MIN:        bayonetDamageMin,
    BAYONET_DAMAGE_MAX:        bayonetDamageMax,
    BAYONET_RANGE:             bayonetRange,
    BAYONET_COOLDOWN_MS:       bayonetCooldownMs,
    BAYONET_BLEED_DAMAGE_MIN:  bayonetBleedDamageMin,
    BAYONET_BLEED_DAMAGE_MAX:  bayonetBleedDamageMax,
    BAYONET_BLEED_INTERVAL_MS: bayonetBleedIntervalMs,
    BAYONET_BLEED_DURATION_MS: bayonetBleedDurationMs,
    BAYONET_HEAL_MULTIPLIER:   bayonetHealMultiplier,

    // Config
    COLOR:                     color,
    PROJECTILE_SIZE:           projectileSize,
    PELLETS_PER_SHOT:          pelletsPerShot,
    image: 'assets/rifle-on-a-transparent-free-png-864369422.png',
    DISPLAY_NAME:              'MUSKET',
};

export default musket;
