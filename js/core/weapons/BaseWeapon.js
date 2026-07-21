// BaseWeapon — Template Method base class.
//
// Handles the ammo / fire-rate / reload bookkeeping that is identical across
// almost every weapon (the old js/weapon.js Weapon class already proves this:
// canShoot/shoot/startReload/updateReload are the same logic for all 60
// weapons, just reached through a type-keyed "_weaponNS" map of optional hook
// functions). Subclassing gives each weapon its own identity and its own file
// instead of a shared switchboard that every weapon's behavior gets bolted onto.
//
// Concrete weapons only implement createProjectiles() (what does this weapon
// fire?). Weapons with unusual ammo/reload rules (e.g. charge-based, dual-form)
// override the small hook methods below instead of special-casing themselves
// inside this class.

export class BaseWeapon {
    static type = 'base';
    static displayName = 'WEAPON';

    constructor(config = {}) {
        this.type = this.constructor.type;
        this.displayName = config.displayName ?? this.constructor.displayName;

        this.maxAmmo = config.maxAmmo ?? Infinity;
        this.reloadTimeMs = config.reloadTimeMs ?? 0;
        this.fireRate = config.fireRate ?? 0;
        this.speed = config.speed;
        this.damage = config.damage;
        this.color = config.color;
        this.projectileSize = config.projectileSize;
        this.pelletsPerShot = config.pelletsPerShot ?? 1;
        this.spreadAngle = config.spreadAngle ?? 0;

        this.ammo = this.maxAmmo;
        this.lastShotAt = 0;
        this.isReloading = false;
        this.reloadCompleteAt = 0;
    }

    // ---- Hooks: override in a subclass, never edit this file to add one ----

    getAmmoCost() {
        return 1;
    }

    getReloadDuration(now) {
        return this.reloadTimeMs;
    }

    getEffectiveFireRate(now) {
        return this.fireRate;
    }

    // Must be overridden. Returns an array of plain projectile-spec objects
    // (not engine Projectile instances) so this class stays render/engine
    // agnostic — the caller decides how to turn a spec into a Projectile.
    createProjectiles(shooter, angle, now) {
        throw new Error(`${this.type}: createProjectiles() not implemented`);
    }

    // ---- Fixed skeleton: shared by every weapon, do not override ----

    updateReload(now) {
        if (!this.isReloading) return;
        if (now < this.reloadCompleteAt) return;
        this.isReloading = false;
        this.ammo = this.maxAmmo;
    }

    startReload(now) {
        if (this.ammo === Infinity) return;
        if (this.isReloading) return;
        if (this.reloadTimeMs <= 0) return;
        if (this.ammo >= this.maxAmmo) return;

        this.isReloading = true;
        this.reloadCompleteAt = now + this.getReloadDuration(now);
    }

    canShoot(now) {
        this.updateReload(now);
        if (this.isReloading) return false;

        const ammoCost = this.getAmmoCost();
        if (this.ammo !== Infinity && this.ammo < ammoCost) {
            this.startReload(now);
            return false;
        }

        return now - this.lastShotAt >= this.getEffectiveFireRate(now);
    }

    // The Template Method: fixed skeleton (ammo spend, reload trigger,
    // cooldown stamp), variable step delegated to createProjectiles().
    fire(shooter, angle, now) {
        if (!this.canShoot(now)) return null;

        const ammoCost = this.getAmmoCost();
        if (this.ammo !== Infinity) {
            this.ammo -= ammoCost;
            if (this.ammo <= 0) this.startReload(now);
        }

        this.lastShotAt = now;
        return this.createProjectiles(shooter, angle, now);
    }

    refundAmmo(amount) {
        if (this.ammo === Infinity) return;
        const gain = Math.max(0, Math.round(amount));
        if (gain <= 0) return;
        this.ammo = Math.min(this.maxAmmo, this.ammo + gain);
    }

    getInfo(now = Date.now()) {
        this.updateReload(now);
        if (this.isReloading) {
            const remainingSec = (Math.max(0, this.reloadCompleteAt - now) / 1000).toFixed(1);
            return `${this.displayName} (RELOADING ${remainingSec}s)`;
        }
        const ammoText = this.ammo === Infinity ? '∞' : this.ammo;
        const maxAmmoText = this.maxAmmo === Infinity ? '∞' : this.maxAmmo;
        return `${this.displayName} (${ammoText}/${maxAmmoText})`;
    }
}
