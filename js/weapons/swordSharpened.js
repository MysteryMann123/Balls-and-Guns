// --- Ammo & Timing ---
const ammo                      = 1;
const reloadMs                  = 1500;
const unloadMs                  = 800;
const fireRate                  = 800;

// --- Projectile ---
const damageMin                 = 130;
const damageMax                 = 180;
const speed                     = 16;
const size                      = 8;

// --- Blessing Shield ---
const blessingShieldDurationMs  = 4000;
const blessingShieldDamageBlock = 0.8;
const blessingShieldRadius      = 280;

// --- Pierce ---
const pierceDamageHpRatio       = 0.1;
const pierceStickDurationMs     = 120000;

// --- Sharpening ---
const sharpenDamageBonus        = 0.15;
const sharpenSpeedBonus         = 0.2;
const sharpenReloadBonus        = 0.25;
const sharpenMaxStacks          = 3;
const sharpenDurationMs         = 120000;
const resistanceIgnore          = 0.5;

// --- Config ---
const color          = '#4da6ff';
const pelletsPerShot = 1;
const spreadAngle    = 0;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize: size,
    pelletsPerShot,
    spreadAngle,
};

const swordSharpened = {
    // Ammo & Timing
    AMMO:                         ammo,
    RELOAD_MS:                    reloadMs,
    UNLOAD_MS:                    unloadMs,
    FIRE_RATE:                    fireRate,

    // Projectile
    DAMAGE_MIN:                   damageMin,
    DAMAGE_MAX:                   damageMax,
    SPEED:                        speed,
    SIZE:                         size,

    // Blessing Shield
    BLESSING_SHIELD_DURATION_MS:  blessingShieldDurationMs,
    BLESSING_SHIELD_DAMAGE_BLOCK: blessingShieldDamageBlock,
    BLESSING_SHIELD_RADIUS:       blessingShieldRadius,

    // Pierce
    PIERCE_DAMAGE_HP_RATIO:       pierceDamageHpRatio,
    PIERCE_STICK_DURATION_MS:     pierceStickDurationMs,

    // Sharpening
    SHARPEN_DAMAGE_BONUS:         sharpenDamageBonus,
    SHARPEN_SPEED_BONUS:          sharpenSpeedBonus,
    SHARPEN_RELOAD_BONUS:         sharpenReloadBonus,
    SHARPEN_MAX_STACKS:           sharpenMaxStacks,
    SHARPEN_DURATION_MS:          sharpenDurationMs,
    RESISTANCE_IGNORE:            resistanceIgnore,

    // Config
    COLOR:                        color,
    PELLETS_PER_SHOT:             pelletsPerShot,
    SPREAD_ANGLE:                 spreadAngle,
    images: {
        weapon: 'assets/EGOWeaponSwordSharpenedbyTears.webp',
        shield: 'assets/KnightOfDespairBlessingShield.png',
    },
    DISPLAY_NAME:                 'EGO SWORD SHARPENED BY TEARS',

    // No hooks: stacksField/maxStacks/speedBonusPerStack/reloadBonusPerStack
    // on the WEAPON_CONFIGS entry in weapon.js are enough for the engine's
    // declarative stack-buff handling to reproduce the sharpen speed/reload
    // bonus (gameProjectiles.js sets weapon.swordSharpenStacks directly when
    // the sword sticks in an enemy).
};


export default swordSharpened;
