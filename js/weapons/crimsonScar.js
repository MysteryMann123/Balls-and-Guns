import * as BleedDot from '../mechanics/shared/bleedDot.js';
import * as Mark from '../mechanics/patterns/mark.js';
import * as MeleeAttack from '../mechanics/patterns/meleeAttack.js';

// --- General ---
const rangeSwitchDistance    = 100;
const reloadMs               = 1800;
const speedBonus             = 0.4;
const damageTakenPenalty     = 0.45;

// --- Gun Form ---
const gunAmmo                = 6;
const fireRate               = 1000;
const burstIntervalMs        = 80;
const burstCount             = 3;
const gunDamageMin           = 50;
const gunDamageMax           = 60;
const gunSpeed               = 18.5;
const gunProjectileSize      = 6;

// --- Blade Form ---
const bladeDamageMin         = 70;
const bladeDamageMax         = 100;
const bladeFireRate          = 700;
const bladeRange             = 45;
const bladeSwingArcDegrees   = 120;
const bladeSwingAnimationMs  = 300;

// --- Bleed ---
const bleedDamageMin         = 20;
const bleedDamageMax         = 25;
const bleedIntervalMs        = 500;
const bleedDurationMs        = 3000;

// --- Mark ---
const markDurationMs         = 20000;
const markDamageBonus        = 0.5;

// --- Config ---
const color          = '#cc2222';
const pelletsPerShot = 1;
const spreadAngle    = 0.04;

const crimsonScar = {
    // General
    RANGE_SWITCH_DISTANCE:    rangeSwitchDistance,
    RELOAD_MS:                reloadMs,
    SPEED_BONUS:              speedBonus,
    DAMAGE_TAKEN_PENALTY:     damageTakenPenalty,

    // Gun Form
    GUN_AMMO:                 gunAmmo,
    FIRE_RATE:                fireRate,
    BURST_INTERVAL_MS:        burstIntervalMs,
    BURST_COUNT:              burstCount,
    GUN_DAMAGE_MIN:           gunDamageMin,
    GUN_DAMAGE_MAX:           gunDamageMax,
    GUN_SPEED:                gunSpeed,
    GUN_PROJECTILE_SIZE:      gunProjectileSize,

    // Blade Form
    BLADE_DAMAGE_MIN:         bladeDamageMin,
    BLADE_DAMAGE_MAX:         bladeDamageMax,
    BLADE_FIRE_RATE:          bladeFireRate,
    BLADE_RANGE:              bladeRange,
    BLADE_SWING_ARC_DEGREES:  bladeSwingArcDegrees,
    BLADE_SWING_ANIMATION_MS: bladeSwingAnimationMs,
    bladeMeleeAttack:         MeleeAttack.create(bladeRange, bladeSwingArcDegrees, bladeSwingAnimationMs),

    // Bleed
    BLEED_DAMAGE_MIN:         bleedDamageMin,
    BLEED_DAMAGE_MAX:         bleedDamageMax,
    BLEED_INTERVAL_MS:        bleedIntervalMs,
    BLEED_DURATION_MS:        bleedDurationMs,
    bleed:                    BleedDot.create(bleedDamageMin, bleedDamageMax, bleedIntervalMs, bleedDurationMs),

    // Mark
    MARK_DURATION_MS:         markDurationMs,
    MARK_DAMAGE_BONUS:        markDamageBonus,
    mark:                     Mark.create(markDurationMs, markDamageBonus),

    // Config
    COLOR:                    color,
    PELLETS_PER_SHOT:         pelletsPerShot,
    SPREAD_ANGLE:             spreadAngle,
    images: {
        gun:    'assets/EGOCrimsonGun.png',
        blade:  'assets/EGOCrimsonBlade.png',
        mark:   'assets/LittleRedTarget.webp',
        pickup: 'assets/EGOWeaponCrimsonScar.webp',
    },
    DISPLAY_NAME:             'EGO WEAPON CRIMSONSCAR',

    // No hooks: forms.gun/forms.blade on the WEAPON_CONFIGS entry in
    // weapon.js are enough for the engine's declarative dual-form +
    // burst-fire handling to reproduce gun-form's ammo/burst-fire and
    // blade-form's ammo-less attack cooldown (blade's `maxAmmo: Infinity`
    // means it never reloads, and its per-form fireRate acts as the
    // cooldown that used to be tracked by hand as
    // crimsonScarBladeCooldownUntil).
};

export default crimsonScar;
