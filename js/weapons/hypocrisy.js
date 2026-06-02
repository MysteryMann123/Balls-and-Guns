// --- Ammo & Timing ---
const ammo                = 50;
const reloadMs            = 2500;

// --- Fire Rate Ramp ---
const fireRateBase        = 1150;
const fireRateMin         = 50;
const rampRateMsPerSec    = 100;
const idleResetMs         = 4000;

// --- Projectile ---
const damageMin           = 23;
const damageMax           = 30;
const speed               = 16;
const projectileSize      = 8;

// --- Scaling ---
const ammoRefundRatio     = 0.08;
const damageMultiplierMax = 2;

// --- Config ---
const color          = '#f3f3f3';
const pelletsPerShot = 1;
const spreadAngle    = 0.04;

const hypocrisy = {
    // Ammo & Timing
    AMMO:                  ammo,
    RELOAD_MS:             reloadMs,

    // Fire Rate Ramp
    FIRE_RATE_BASE:        fireRateBase,
    FIRE_RATE_MIN:         fireRateMin,
    RAMP_RATE_MS_PER_SEC:  rampRateMsPerSec,
    IDLE_RESET_MS:         idleResetMs,

    // Projectile
    DAMAGE_MIN:            damageMin,
    DAMAGE_MAX:            damageMax,
    SPEED:                 speed,
    PROJECTILE_SIZE:       projectileSize,

    // Scaling
    AMMO_REFUND_RATIO:     ammoRefundRatio,
    DAMAGE_MULTIPLIER_MAX: damageMultiplierMax,

    // Config
    COLOR:                 color,
    PELLETS_PER_SHOT:      pelletsPerShot,
    SPREAD_ANGLE:          spreadAngle,
    DISPLAY_NAME:          'EGO WEAPON HYPOCRISY',

    CONFIG: {
        maxAmmo: ammo,
        reloadTimeMs: reloadMs,
        damage: 0,
        damageMin,
        damageMax,
        speed,
        fireRate: fireRateBase,
        color,
        projectileSize,
        pelletsPerShot,
        spreadAngle,
    },

    getInfo(weaponInstance, now) {
        const rateMs = Math.round(weaponInstance.hypocrisyCurrentRate ?? hypocrisy.FIRE_RATE_BASE);
        const ammoText = `${weaponInstance.ammo}/${weaponInstance.maxAmmo}`;
        if (weaponInstance.isReloading) {
            const remainingSec = (Math.max(0, weaponInstance.reloadCompleteAt - now) / 1000).toFixed(1);
            return `EGO WEAPON HYPOCRISY [${ammoText}] (RELOADING ${remainingSec}s)`;
        }
        return `EGO WEAPON HYPOCRISY [${ammoText}] fire:${rateMs}ms`;
    },

    onAfterAmmoReset(weapon, now) {
        weapon.hypocrisyCurrentRate = this.FIRE_RATE_BASE;
    },

    onCanShoot(weapon, now, formOverride) {
        if (weapon.isReloading) return false;
        if (weapon.ammo <= 0) { weapon.startReload(now); return false; }
        if (weapon.hypocrisyCurrentRate === undefined) weapon.hypocrisyCurrentRate = this.FIRE_RATE_BASE;
        const timeSinceLast = weapon.lastShotAt ? now - weapon.lastShotAt : Infinity;
        if (timeSinceLast > this.IDLE_RESET_MS) weapon.hypocrisyCurrentRate = this.FIRE_RATE_BASE;
        return timeSinceLast >= weapon.hypocrisyCurrentRate;
    },

    onShoot(weapon, now, formOverride) {
        if (weapon.hypocrisyCurrentRate === undefined) weapon.hypocrisyCurrentRate = this.FIRE_RATE_BASE;
        weapon.ammo = Math.max(0, weapon.ammo - 1);
        const reductionPerShot = (weapon.hypocrisyCurrentRate / 1000) * this.RAMP_RATE_MS_PER_SEC;
        weapon.hypocrisyCurrentRate = Math.max(this.FIRE_RATE_MIN, weapon.hypocrisyCurrentRate - reductionPerShot);
        weapon.lastShotAt = now;
        if (weapon.ammo <= 0) weapon.startReload(now);
        return true;
    },
};

export default hypocrisy;
