// --- Ammo & Timing ---
const maxAmmo                  = 6;
const chargeMs                 = 400;
const burstIntervalMs          = 200;
const burstFireRate            = 100; // inter-shot rate while burst is active

// --- Projectile ---
const damageMin                = 50;
const damageMax                = 75;
const speed                    = 8;
const projectileSize           = 9;
const spreadAngle              = 0.20;

// --- Homing ---
const homingStrength           = 0.01;
const homingRange              = 380;

// --- Burn ---
const burnDamageMin            = 15;
const burnDamageMax            = 20;
const burnIntervalMs           = 500;
const burnDurationMs           = 2500;

// --- Orbital ---
const orbitRate                = 0.18;
const orbitRadius              = 55;
const wielderSlowPerStar       = 0.03;
const orbitalContactMultiplier = 0.5;

// --- Config ---
const color          = '#ffee88';
const pelletsPerShot = 1;

const soundOfStar = {
    // Ammo & Timing
    MAX_AMMO:                   maxAmmo,
    CHARGE_MS:                  chargeMs,
    BURST_INTERVAL_MS:          burstIntervalMs,
    BURST_FIRE_RATE:            burstFireRate,

    // Projectile
    DAMAGE_MIN:                 damageMin,
    DAMAGE_MAX:                 damageMax,
    SPEED:                      speed,
    PROJECTILE_SIZE:            projectileSize,
    SPREAD_ANGLE:               spreadAngle,

    // Homing
    HOMING_STRENGTH:            homingStrength,
    HOMING_RANGE:               homingRange,

    // Burn
    BURN_DAMAGE_MIN:            burnDamageMin,
    BURN_DAMAGE_MAX:            burnDamageMax,
    BURN_INTERVAL_MS:           burnIntervalMs,
    BURN_DURATION_MS:           burnDurationMs,

    // Orbital
    ORBIT_RATE:                 orbitRate,
    ORBIT_RADIUS:               orbitRadius,
    WIELDER_SLOW_PER_STAR:      wielderSlowPerStar,
    ORBITAL_CONTACT_MULTIPLIER: orbitalContactMultiplier,

    // Config
    COLOR:                      color,
    PELLETS_PER_SHOT:           pelletsPerShot,
    image: 'assets/EGOWeaponSoundofaStar.webp',
    DISPLAY_NAME:               'SOUND OF A STAR',

    riskClass: 'ALEPH',

    description: [
        'ALEPH E.G.O weapon — each charge (1 per 400ms) summons a glowing star that physically orbits the wielder at radius 55px.',
        'Locked from firing until all 6/6 charges are held. Once full, fires one star per fire interval (100ms) toward the nearest enemy (or cursor). Recharges from zero after the burst.',
        'Fired stars deal 50–75 damage and home toward the nearest enemy in a spiraling wobble path.',
        'Orbiting stars passively deal 25–38 contact damage to enemies they touch (50% of shot damage, once per 0.5s per star).',
        'Both fired and contact hits ignite the target: 15-20 burn every 0.5s for 2.5s.',
        'Wielder slows 3% per star held (up to 18% at full charge) — fully loaded carries maximum cost before the burst.'
    ],

    CONFIG: {
        maxAmmo,
        reloadTimeMs: 0,
        damage: 0,
        damageMin,
        damageMax,
        speed,
        fireRate: 0,
        color,
        projectileSize,
        pelletsPerShot,
        spreadAngle,
    },

    getInfo(weaponInstance, now) {
        const chargesText = `${weaponInstance.ammo}/${weaponInstance.maxAmmo}`;
        if (weaponInstance.soundStarBursting && weaponInstance.ammo > 0) return `SOUND OF A STAR [${chargesText}] FIRING`;
        if (weaponInstance.ammo >= weaponInstance.maxAmmo) return `SOUND OF A STAR [${chargesText}] READY TO FIRE`;
        const chargingSuffix = weaponInstance.isReloading
            ? ` (charging ${(Math.max(0, weaponInstance.reloadCompleteAt - now) / 1000).toFixed(1)}s)`
            : '';
        return `SOUND OF A STAR [${chargesText}]${chargingSuffix}`;
    },

    onStartReload(weapon, now, formOverride) {
        if (weapon.ammo >= weapon.maxAmmo) return true;
        weapon.isReloading = true;
        weapon.reloadCompleteAt = now + weapon.reloadTimeMs;
        return true;
    },

    onReloadComplete(weapon, now) {
        weapon.ammo = Math.min(weapon.maxAmmo, weapon.ammo + 1);
        if (weapon.ammo < weapon.maxAmmo) weapon.startReload(now);
        return true;
    },

    onCanShoot(weapon, now, formOverride) {
        if (weapon.ammo >= weapon.maxAmmo) weapon.soundStarBursting = true;
        if (weapon.soundStarBursting && weapon.ammo > 0) {
            return now - weapon.lastShotAt >= weapon.fireRate;
        }
        if (!weapon.isReloading) weapon.startReload(now);
        return false;
    },

    onShoot(weapon, now, formOverride) {
        weapon.ammo = Math.max(0, weapon.ammo - 1);
        weapon.lastShotAt = now;
        if (weapon.ammo <= 0) {
            weapon.soundStarBursting = false;
            if (!weapon.isReloading) weapon.startReload(now);
        }
        return true;
    },
};

export default soundOfStar;
