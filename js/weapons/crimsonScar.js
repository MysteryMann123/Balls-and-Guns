import * as BleedDot from '../mechanics/shared/bleedDot.js';
import * as Mark from '../mechanics/patterns/mark.js';
import * as DualForm from '../mechanics/patterns/dualForm.js';
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
    dualForm:                 DualForm.create(rangeSwitchDistance),
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

    riskClass: 'WAW',

    description: [
        'WAW E.G.O weapon — switches between gun and blade depending on distance (threshold: 100px). Grants +40% move speed but takes +45% damage.',
        'Gun mode: fires 3 bullets in rapid burst (80ms between shots, 1000ms between bursts). 50–60 damage per bullet. 6 shots total, reloads in 1.8s.',
        'Blade mode (melee, unlimited): 70–100 damage per swing. Inflicts bleed: 20–25 damage every 500ms for 3s.',
        'Hits with this weapon mark the target (shown as a red target icon) for 20s. CrimsonScar wielders deal +50% damage to marked targets.',
        'Speed advantage and burst damage reward aggressive play; the damage penalty punishes passive positioning.'
    ],

    CONFIG: {
        maxAmmo: gunAmmo,
        reloadTimeMs: reloadMs,
        damage: 0,
        damageMin: gunDamageMin,
        damageMax: gunDamageMax,
        speed: gunSpeed,
        fireRate,
        color,
        projectileSize: gunProjectileSize,
        pelletsPerShot,
        spreadAngle,
    },

    getInfo(weaponInstance, now) {
        const form = weaponInstance.crimsonScarForm || 'gun';
        const ammoText = `${weaponInstance.ammo}/${weaponInstance.maxAmmo}`;
        if (weaponInstance.isReloading) {
            const remainingSec = (Math.max(0, weaponInstance.reloadCompleteAt - now) / 1000).toFixed(1);
            return `EGO CRIMSONSCAR [${ammoText}] (RELOADING ${remainingSec}s)`;
        }
        const formLabel = form === 'blade' ? 'BLADE' : 'GUN';
        return `EGO CRIMSONSCAR [${ammoText}] [${formLabel}]`;
    },

    onCanShoot(weapon, now, formOverride) {
        const form = formOverride || weapon.crimsonScarForm || 'gun';
        weapon.crimsonScarForm = form;
        if (form === 'blade') {
            return now >= (weapon.crimsonScarBladeCooldownUntil ?? 0);
        }
        if (weapon.isReloading) return false;
        if (weapon.ammo <= 0) { weapon.startReload(now); return false; }
        const inBurst = (weapon.crimsonScarBurstLeft ?? 0) > 0;
        const interval = inBurst ? this.BURST_INTERVAL_MS : this.FIRE_RATE;
        return now - (weapon.lastShotAt ?? 0) >= interval;
    },

    onShoot(weapon, now, formOverride) {
        const form = formOverride || weapon.crimsonScarForm || 'gun';
        weapon.lastShotAt = now;
        if (form === 'blade') {
            weapon.crimsonScarBladeCooldownUntil = now + this.BLADE_FIRE_RATE;
            return true;
        }
        if ((weapon.crimsonScarBurstLeft ?? 0) === 0) {
            weapon.crimsonScarBurstLeft = this.BURST_COUNT - 1;
        } else {
            weapon.crimsonScarBurstLeft--;
        }
        weapon.ammo = Math.max(0, weapon.ammo - 1);
        if (weapon.ammo <= 0) weapon.startReload(now);
        return true;
    },
};

export default crimsonScar;
