import * as MaxHpDamage from '../mechanics/shared/maxHpDamage.js';

// --- Config ---
const maxAmmo        = 12;
const reloadMs       = 1500;
const damage         = 16;
const speed          = 12;
const fireRate       = 115;
const projectileSize = 4;
const pelletsPerShot = 1;
const spreadAngle    = 0.35;

// --- Red Projectile ---
const redHealMin           = 4;
const redHealMax           = 8;
const redColor             = '#ff4444';

// --- Blue Projectile ---
const blueHealMin          = 1;
const blueHealMax          = 3;
const blueHealIntervalMs   = 500;
const blueHealDurationMs   = 1500;
const blueColor            = '#4488ff';

// --- Purple Projectile ---
const purpleChance         = 0.10;
const purpleSelfDamagePct  = 0.005;
const purpleDamageMin      = 10;
const purpleDamageMax      = 12;
const purpleMaxHpPctMin    = 0.008;
const purpleMaxHpPctMax    = 0.012;
const purpleColor          = '#cc44ff';

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage,
    speed,
    fireRate,
    color: purpleColor,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const egoSoda = {
    // Config
    MAX_AMMO:             maxAmmo,
    RELOAD_MS:            reloadMs,
    DAMAGE:               damage,
    SPEED:                speed,
    FIRE_RATE:            fireRate,
    PROJECTILE_SIZE:      projectileSize,
    PELLETS_PER_SHOT:     pelletsPerShot,
    SPREAD_ANGLE:         spreadAngle,
    COLOR:                purpleColor,

    // Red Projectile
    RED_HEAL_MIN:           redHealMin,
    RED_HEAL_MAX:           redHealMax,
    RED_COLOR:              redColor,

    // Blue Projectile
    BLUE_HEAL_MIN:          blueHealMin,
    BLUE_HEAL_MAX:          blueHealMax,
    BLUE_HEAL_INTERVAL_MS:  blueHealIntervalMs,
    BLUE_HEAL_DURATION_MS:  blueHealDurationMs,
    BLUE_COLOR:             blueColor,

    // Purple Projectile
    PURPLE_CHANCE:          purpleChance,
    PURPLE_SELF_DAMAGE_PCT: purpleSelfDamagePct,
    PURPLE_DAMAGE_MIN:      purpleDamageMin,
    PURPLE_DAMAGE_MAX:      purpleDamageMax,
    PURPLE_MAX_HP_PCT_MIN:  purpleMaxHpPctMin,
    PURPLE_MAX_HP_PCT_MAX:  purpleMaxHpPctMax,
    purpleMaxHpDamage:      MaxHpDamage.create(purpleMaxHpPctMin, purpleMaxHpPctMax),
    PURPLE_COLOR:           purpleColor,

    // Config

    BLUE_HEAL_MAX:          blueHealMax,
    BLUE_HEAL_INTERVAL_MS:  blueHealIntervalMs,
    BLUE_HEAL_DURATION_MS:  blueHealDurationMs,
    BLUE_COLOR:             blueColor,

    // Purple Projectile
    PURPLE_CHANCE:          purpleChance,
    PURPLE_SELF_DAMAGE_PCT: purpleSelfDamagePct,
    PURPLE_DAMAGE_MIN:      purpleDamageMin,
    PURPLE_DAMAGE_MAX:      purpleDamageMax,
    PURPLE_MAX_HP_PCT_MIN:  purpleMaxHpPctMin,
    PURPLE_MAX_HP_PCT_MAX:  purpleMaxHpPctMax,
    PURPLE_COLOR:           purpleColor,
    image: 'assets/EGOWeaponSoda.webp',
    DISPLAY_NAME:           'EGO WEAPON SODA',

    riskClass: 'ZAYIN',

    description: (w) => [
        `ZAYIN E.G.O weapon — a Pistol reskin that fires one of three colored projectiles each shot: red (${Math.round((1 - w.PURPLE_CHANCE) * 50)}%), blue (${Math.round((1 - w.PURPLE_CHANCE) * 50)}%), or rare purple (${Math.round(w.PURPLE_CHANCE * 100)}%).`,
        `Red on hit: immediately heals the shooter for ${w.RED_HEAL_MIN}–${w.RED_HEAL_MAX} HP.`,
        `Blue on hit: heals the shooter ${w.BLUE_HEAL_MIN}–${w.BLUE_HEAL_MAX} HP every ${(500 / 1000).toFixed(1)}s for ${(w.BLUE_HEAL_DURATION_MS / 1000).toFixed(1)}s.`,
        `Purple on hit: shooter loses ${Math.round(w.PURPLE_SELF_DAMAGE_PCT * 100 * 10) / 10}% of their own max HP, but deals an extra ${w.PURPLE_DAMAGE_MIN}–${w.PURPLE_DAMAGE_MAX} + ${Math.round(w.PURPLE_MAX_HP_PCT_MIN * 100 * 10) / 10}–${Math.round(w.PURPLE_MAX_HP_PCT_MAX * 100 * 10) / 10}% of the target's max HP as bonus damage.`
    ],
};

export default egoSoda;
