import * as Hitscan from '../mechanics/shared/hitscan.js';
import * as ConditionalReload from '../mechanics/patterns/conditionalReload.js';

// --- Ammo & Timing ---
const ammo             = 200;
const ammoPerShot      = 30;
const fireRate         = 800;
const reloadMs         = 3000;
const lowAmmoReloadMs  = 10000;

// --- Projectile ---
const pelletsPerShot   = 6;
const damageMin        = 5;
const damageMax        = 20;
const spreadAngle      = 0.15;
const hitscanRange     = 750; // matches shotgun HITSCAN_RANGE (750)

// --- Config ---
const speed          = 50;
const color          = '#ffb76b';
const projectileSize = 4;

const CONFIG = {
    maxAmmo: ammo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const widowmaker = {
    // Ammo & Timing
    AMMO:               ammo,
    AMMO_PER_SHOT:      ammoPerShot,
    FIRE_RATE:          fireRate,
    RELOAD_MS:          reloadMs,
    LOW_AMMO_RELOAD_MS: lowAmmoReloadMs,
    conditionalReload:  ConditionalReload.create(reloadMs),

    // Projectile
    PELLETS_PER_SHOT:   pelletsPerShot,
    DAMAGE_MIN:         damageMin,
    DAMAGE_MAX:         damageMax,
    SPREAD_ANGLE:       spreadAngle,
    HITSCAN_RANGE:      hitscanRange,
    hitscan:            Hitscan.create(hitscanRange),

    // Config
    SPEED:              speed,
    COLOR:              color,
    PROJECTILE_SIZE:    projectileSize,
    image: 'assets/Widowmaker.png',
    DISPLAY_NAME:       'WIDOWMAKER',

    description: (w) => [
        `Consumes ${w.AMMO_PER_SHOT} ammo per shot and fires ${w.PELLETS_PER_SHOT} pellets.`,
        `Pellet damage range: ${w.DAMAGE_MIN}-${w.DAMAGE_MAX} (shotgun-style falloff).`,
        `Refunds ammo equal to damage dealt; reloads for ${(w.LOW_AMMO_RELOAD_MS / 1000).toFixed(0)}s when below ${w.AMMO_PER_SHOT} ammo.`
    ],

    getAmmoCost(weapon) {
        return this.AMMO_PER_SHOT;
    },

    getReloadDuration(weapon, now) {
        return weapon.ammo < this.AMMO_PER_SHOT ? this.LOW_AMMO_RELOAD_MS : weapon.reloadTimeMs;
    },

    SUPPRESS_AUTO_RELOAD: true,
};


export default widowmaker;
