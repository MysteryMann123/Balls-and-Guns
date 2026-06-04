import * as Afterburn from '../mechanics/shared/afterburn.js';
import * as DualForm from '../mechanics/patterns/dualForm.js';
import * as HornetMechanic from '../mechanics/unique/hornet.js';

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
    dualForm:                    DualForm.create(rangeSwitchDistance),

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

    riskClass: 'WAW',

    description: (w) => [
        'WAW E.G.O weapon Hornet: hybrid form that swaps between close shotgun and long-range rifle based on enemy distance.',
        `Close form (<= ${w.RANGE_SWITCH_DISTANCE}px): ${w.SHOTGUN_PELLETS_PER_SHOT} hitscan pellets for ${w.SHOTGUN_DAMAGE_MIN}-${w.SHOTGUN_DAMAGE_MAX} each, with ${w.SHOTGUN_AMMO} ammo.`,
        `Far form: rifle shot for ${w.RIFLE_DAMAGE_MIN}-${w.RIFLE_DAMAGE_MAX} with ${w.RIFLE_AMMO} ammo at ${w.FIRE_RATE}ms interval; applies afterburn ${w.RIFLE_AFTERBURN_DAMAGE_MIN}-${w.RIFLE_AFTERBURN_DAMAGE_MAX} every ${(w.RIFLE_AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(w.RIFLE_AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Reactive bees: when hit by enemies, summons a homing bee (${w.BEE_DAMAGE_MIN}-${w.BEE_DAMAGE_MAX} sting) that applies the same afterburn; max ${w.BEE_MAX_ACTIVE} bees active per wielder.`
    ],

    CONFIG: {
        maxAmmo: rifleAmmo,
        reloadTimeMs: reloadMs,
        damage: 0,
        damageMin: rifleDamageMin,
        damageMax: rifleDamageMax,
        speed: rifleSpeed,
        fireRate,
        color,
        projectileSize: rifleProjectileSize,
        pelletsPerShot,
        spreadAngle,
    },

    mechanics: [
        HornetMechanic.create(),
    ],

    getInfo(weaponInstance, now) {
        const form = weaponInstance.hornetForm || 'rifle';
        const formLabel = form === 'shotgun' ? 'SHOTGUN' : 'RIFLE';
        const ammo = form === 'shotgun' ? weaponInstance.hornetShotgunAmmo : weaponInstance.hornetRifleAmmo;
        const maxAmmo = form === 'shotgun' ? weaponInstance.hornetShotgunMaxAmmo : weaponInstance.hornetRifleMaxAmmo;
        return `EGO WEAPON HORNET ${formLabel} (${ammo}/${maxAmmo})`;
    },

    onStartReload(weapon, now, formOverride) {
        const targetForm    = formOverride || weapon.hornetForm || 'rifle';
        const currentAmmo   = targetForm === 'shotgun' ? weapon.hornetShotgunAmmo    : weapon.hornetRifleAmmo;
        const targetMaxAmmo = targetForm === 'shotgun' ? weapon.hornetShotgunMaxAmmo : weapon.hornetRifleMaxAmmo;
        if (currentAmmo >= targetMaxAmmo) return true;
        weapon.isReloading = true;
        weapon.hornetReloadingForm = targetForm;
        weapon.reloadCompleteAt = now + weapon.reloadTimeMs;
        weapon.ammo    = currentAmmo;
        weapon.maxAmmo = targetMaxAmmo;
        return true;
    },

    onReloadComplete(weapon, now) {
        const reloadForm = weapon.hornetReloadingForm || weapon.hornetForm || 'rifle';
        if (reloadForm === 'shotgun') {
            weapon.hornetShotgunAmmo = weapon.hornetShotgunMaxAmmo;
            weapon.ammo    = weapon.hornetShotgunAmmo;
            weapon.maxAmmo = weapon.hornetShotgunMaxAmmo;
        } else {
            weapon.hornetRifleAmmo = weapon.hornetRifleMaxAmmo;
            weapon.ammo    = weapon.hornetRifleAmmo;
            weapon.maxAmmo = weapon.hornetRifleMaxAmmo;
        }
        weapon.hornetReloadingForm = null;
        return true;
    },

    onCanShoot(weapon, now, formOverride) {
        const activeForm = formOverride || weapon.hornetForm || 'rifle';
        weapon.hornetForm = activeForm;
        if (weapon.isReloading) return false;
        const activeAmmo    = activeForm === 'shotgun' ? weapon.hornetShotgunAmmo    : weapon.hornetRifleAmmo;
        const activeMaxAmmo = activeForm === 'shotgun' ? weapon.hornetShotgunMaxAmmo : weapon.hornetRifleMaxAmmo;
        weapon.ammo    = activeAmmo;
        weapon.maxAmmo = activeMaxAmmo;
        if (activeAmmo <= 0) {
            weapon.startReload(now, activeForm);
            return false;
        }
        return now - weapon.lastShotAt >= weapon.fireRate;
    },

    onShoot(weapon, now, formOverride) {
        const activeForm = formOverride || weapon.hornetForm || 'rifle';
        if (activeForm === 'shotgun') {
            weapon.hornetShotgunAmmo = Math.max(0, weapon.hornetShotgunAmmo - 1);
            weapon.ammo    = weapon.hornetShotgunAmmo;
            weapon.maxAmmo = weapon.hornetShotgunMaxAmmo;
            if (weapon.hornetShotgunAmmo <= 0) weapon.startReload(now, 'shotgun');
        } else {
            weapon.hornetRifleAmmo = Math.max(0, weapon.hornetRifleAmmo - 1);
            weapon.ammo    = weapon.hornetRifleAmmo;
            weapon.maxAmmo = weapon.hornetRifleMaxAmmo;
            if (weapon.hornetRifleAmmo <= 0) weapon.startReload(now, 'rifle');
        }
        weapon.lastShotAt = now;
        return true;
    },
};

export default hornet;
