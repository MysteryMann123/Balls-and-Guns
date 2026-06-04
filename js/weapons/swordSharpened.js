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

    riskClass: 'WAW',

    description: [
        'WAW E.G.O weapon Sword Sharpened by Tears: throwable melee blade that pierces and sticks to enemies, growing stronger with each hit.',
        'Blessing Shield: grants 80% damage reduction to nearby ally for 4s or self if no ally in range.',
        'Base damage: 130-180. On hit, the sword sticks for up to 120s. If it misses, the wielder takes 10% max HP self-damage.',
        'Sharpening: each hit increases damage (+15%), projectile speed (+20%), and reload speed (+25%) per stack; max 3 stacks lasting 120s each. Ignores 50% resistances.'
    ],

    getEffectiveFireRate(weapon, now) {
        const stacks = Math.max(0, Math.min(this.SHARPEN_MAX_STACKS, weapon.swordSharpenStacks || 0));
        return weapon.fireRate * (1 - Math.min(0.6, this.SHARPEN_SPEED_BONUS * stacks));
    },

    getReloadDuration(weapon, now) {
        const stacks = Math.max(0, Math.min(this.SHARPEN_MAX_STACKS, weapon.swordSharpenStacks || 0));
        const reloadBonus = Math.min(0.6, this.SHARPEN_RELOAD_BONUS * stacks);
        return weapon.reloadTimeMs * (1 - reloadBonus);
    },
};


export default swordSharpened;
