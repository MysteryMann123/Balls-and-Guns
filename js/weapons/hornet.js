import * as Afterburn from '../mechanics/shared/afterburn.js';

// --- General ---
const reloadMs                  = 2200;
const fireRate                  = 800;
const rangeSwitchDistance       = 320;

// --- Shotgun Form ---
const shotgunAmmo               = 4;
const shotgunPelletsPerShot     = 6;
const shotgunDamageMin          = 3;
const shotgunDamageMax          = 18;
const shotgunSpreadAngle        = 0.14;
const shotgunHitscanRange       = 750;

// --- Rifle Form ---
const rifleAmmo                 = 6;
const rifleDamageMin            = 60;
const rifleDamageMax            = 100;
const rifleSpeed                = 16;
const rifleProjectileSize       = 5;
const rifleAfterBurnDamageMin   = 5;
const rifleAfterBurnDamageMax   = 8;
const rifleAfterBurnIntervalMs  = 500;
const rifleAfterBurnDurationMs  = 3000;

// --- Bees ---
const beeDamageMin              = 4;
const beeDamageMax              = 6;
const beeSpeed                  = 8.8;
const beeSize                   = 4;
const beeHomingStrength         = 0.11;
const beeHomingRange            = 460;
const beeMaxActive              = 6;

// --- Config ---
const color          = '#ffd95a';
const pelletsPerShot = 1;
const spreadAngle    = 0;
const initialForm    = 'rifle';

const hornet = {
    // General
    RELOAD_MS:                   reloadMs,
    FIRE_RATE:                   fireRate,
    RANGE_SWITCH_DISTANCE:       rangeSwitchDistance,

    // Shotgun Form
    SHOTGUN_AMMO:                shotgunAmmo,
    SHOTGUN_PELLETS_PER_SHOT:    shotgunPelletsPerShot,
    SHOTGUN_DAMAGE_MIN:          shotgunDamageMin,
    SHOTGUN_DAMAGE_MAX:          shotgunDamageMax,
    SHOTGUN_SPREAD_ANGLE:        shotgunSpreadAngle,
    SHOTGUN_HITSCAN_RANGE:       shotgunHitscanRange,

    // Rifle Form
    RIFLE_AMMO:                  rifleAmmo,
    RIFLE_DAMAGE_MIN:            rifleDamageMin,
    RIFLE_DAMAGE_MAX:            rifleDamageMax,
    RIFLE_SPEED:                 rifleSpeed,
    RIFLE_PROJECTILE_SIZE:       rifleProjectileSize,
    RIFLE_AFTERBURN_DAMAGE_MIN:  rifleAfterBurnDamageMin,
    RIFLE_AFTERBURN_DAMAGE_MAX:  rifleAfterBurnDamageMax,
    RIFLE_AFTERBURN_INTERVAL_MS: rifleAfterBurnIntervalMs,
    RIFLE_AFTERBURN_DURATION_MS: rifleAfterBurnDurationMs,
    rifleAfterburn:              Afterburn.create(rifleAfterBurnDamageMin, rifleAfterBurnDamageMax, rifleAfterBurnIntervalMs, rifleAfterBurnDurationMs),

    // Bees
    BEE_DAMAGE_MIN:              beeDamageMin,
    BEE_DAMAGE_MAX:              beeDamageMax,
    BEE_SPEED:                   beeSpeed,
    BEE_SIZE:                    beeSize,
    BEE_HOMING_STRENGTH:         beeHomingStrength,
    BEE_HOMING_RANGE:            beeHomingRange,
    BEE_MAX_ACTIVE:              beeMaxActive,

    // Config
    COLOR:                       color,
    PELLETS_PER_SHOT:            pelletsPerShot,
    SPREAD_ANGLE:                spreadAngle,
    INITIAL_FORM:                initialForm,

    images: {
        rifle:   'assets/EGOWeaponHornet.png',
        shotgun: 'assets/Lobotomy_E.G.O_Hornet_Alteration_Shotgun_Sprite.png',
    },
    DISPLAY_NAME: 'EGO WEAPON HORNET',

    // No hooks: `forms`/`defaultForm` on the WEAPON_CONFIGS entry in
    // weapon.js are enough for the engine's declarative dual-form ammo-pool
    // handling to reproduce independent rifle/shotgun ammo and reload.
};

export default hornet;
