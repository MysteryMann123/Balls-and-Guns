import * as Afterburn from '../mechanics/shared/afterburn.js';
import * as MaxHpDamage from '../mechanics/shared/maxHpDamage.js';

// --- Ammo & Timing ---
const ammo                      = 8;
const reloadMs                  = 2400;
const fireRate                  = 360;
const muzzleFlashMs             = 360;

// --- Black Shot ---
const blackPelletsPerShot       = 5;
const blackSpreadAngle          = 0.12;
const blackProjectileSpeed      = 12;
const blackProjectileSize       = 6;
const blackMaxHpDamageMinRatio  = 0.003;
const blackMaxHpDamageMaxRatio  = 0.0039;

// --- White Shot ---
const whitePelletsPerShot       = 6;
const whiteSpreadAngle          = 0.23;
const whiteProjectileSpeed      = 14;
const whiteProjectileSize       = 5;
const whiteAfterBurnDamageMin   = 12;
const whiteAfterBurnDamageMax   = 20;
const whiteAfterBurnIntervalMs  = 400;
const whiteAfterBurnDurationMs  = 4000;

// --- Funeral Portrait ---
const funeralPelletsRequired    = 25;
const funeralShootLockMs        = 3000;
const funeralProjectileSpeed    = 10;
const funeralProjectileSize     = 10;
const funeralCooldownMs         = 900;

// --- Config ---
const color       = '#b9bcc1';
const spreadAngle = 0; // weapon.js default; black/white each have their own spread

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    speed: blackProjectileSpeed,
    fireRate,
    color,
    projectileSize: blackProjectileSize,
    pelletsPerShot: blackPelletsPerShot,
    spreadAngle: blackSpreadAngle,
};

const solemnVow = {
    // Ammo & Timing
    AMMO:                          ammo,
    RELOAD_MS:                     reloadMs,
    FIRE_RATE:                     fireRate,
    MUZZLE_FLASH_MS:               muzzleFlashMs,

    // Black Shot
    BLACK_PELLETS_PER_SHOT:        blackPelletsPerShot,
    BLACK_SPREAD_ANGLE:            blackSpreadAngle,
    BLACK_PROJECTILE_SPEED:        blackProjectileSpeed,
    BLACK_PROJECTILE_SIZE:         blackProjectileSize,
    BLACK_MAX_HP_DAMAGE_MIN_RATIO: blackMaxHpDamageMinRatio,
    BLACK_MAX_HP_DAMAGE_MAX_RATIO: blackMaxHpDamageMaxRatio,
    blackMaxHpDamage:              MaxHpDamage.create(blackMaxHpDamageMinRatio, blackMaxHpDamageMaxRatio),

    // White Shot
    WHITE_PELLETS_PER_SHOT:        whitePelletsPerShot,
    WHITE_SPREAD_ANGLE:            whiteSpreadAngle,
    WHITE_PROJECTILE_SPEED:        whiteProjectileSpeed,
    WHITE_PROJECTILE_SIZE:         whiteProjectileSize,
    WHITE_AFTERBURN_DAMAGE_MIN:    whiteAfterBurnDamageMin,
    WHITE_AFTERBURN_DAMAGE_MAX:    whiteAfterBurnDamageMax,
    WHITE_AFTERBURN_INTERVAL_MS:   whiteAfterBurnIntervalMs,
    WHITE_AFTERBURN_DURATION_MS:   whiteAfterBurnDurationMs,
    whiteAfterburn:                Afterburn.create(whiteAfterBurnDamageMin, whiteAfterBurnDamageMax, whiteAfterBurnIntervalMs, whiteAfterBurnDurationMs),

    // Funeral Portrait
    FUNERAL_PELLETS_REQUIRED:      funeralPelletsRequired,
    FUNERAL_SHOOT_LOCK_MS:         funeralShootLockMs,
    FUNERAL_PROJECTILE_SPEED:      funeralProjectileSpeed,
    FUNERAL_PROJECTILE_SIZE:       funeralProjectileSize,
    FUNERAL_COOLDOWN_MS:           funeralCooldownMs,

    // Config
    COLOR:                         color,
    SPREAD_ANGLE:                  spreadAngle,
    images: {
        black:           'assets/EGOWeaponSolemnVow_Black.jpg',
        white:           'assets/EGOWeaponSolemnVow_White.jpg',
        muzzle:          'assets/ButterfliesSpriteSheet.png',
        portrait:        'assets/FuneraloftheDeadButterfliesPortrait.webp',
        portraitFallback:'assets/ButterfliesSpriteSheet.png',
    },
    DISPLAY_NAME:                  'EGO WEAPON SOLEMN VOW',

    riskClass: 'HE',

    description: (w) => [
        'HE E.G.O weapon with dual revolvers and alternating black/white shot rhythm.',
        `Black shot: ${w.BLACK_PELLETS_PER_SHOT} pellets, each dealing ${(w.BLACK_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(2)}-${(w.BLACK_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(2)}% of enemy max HP.`,
        `White shot: ${w.WHITE_PELLETS_PER_SHOT} pellets applying ${w.WHITE_AFTERBURN_DAMAGE_MIN}-${w.WHITE_AFTERBURN_DAMAGE_MAX} afterburn every ${(w.WHITE_AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(w.WHITE_AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Funeral skill: after ${w.FUNERAL_PELLETS_REQUIRED} pellets (or during reload), fires the portrait projectile to lock enemy shooting for ${(w.FUNERAL_SHOOT_LOCK_MS / 1000).toFixed(1)}s.`,
        `Total ammo: ${w.AMMO} (${w.AMMO / 2} shots per revolver), medium reload.`
    ],
};

export default solemnVow;
