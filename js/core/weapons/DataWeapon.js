// DataWeapon — turns a plain data object into a working weapon with zero
// per-weapon code. Most weapons are just stats plus a short list of tagged
// mechanics (pierce, splash, ...); this class is the one generic
// createProjectiles() implementation that reads that data, so a new weapon
// can be "created on the fly" by writing a data file — no subclass, no hook
// methods.
//
// A weapon only needs its own BaseWeapon subclass (see BaseWeapon.js) when
// it does something a declarative mechanics list can't express — e.g.
// musket's bayonet melee swing, or widowmaker's variable ammo-per-shot
// reload penalty. Those stay hand-written; everything else is data.

import { BaseWeapon } from './BaseWeapon.js';
import { WeaponFactory } from './WeaponFactory.js';
import * as decorators from './decorators.js';

// Maps a mechanic's declarative name (as written in a weapon's data file)
// to the decorator that applies it. Add an entry here once, and every data
// file can opt into that mechanic by name — see decorators.js for how each
// one plugs into the existing js/mechanics/ modules.
const MECHANIC_APPLIERS = {
    pierce: (specs, opts) => decorators.withPierce(specs, { COUNT: opts.count }),
    splash: (specs, opts) => decorators.withSplash(specs, { RADIUS: opts.radius }),
};

export class DataWeapon extends BaseWeapon {
    constructor(data) {
        super(data);
        this.data = data;
    }

    createProjectiles(shooter, angle, now) {
        let specs = [];
        const range = this.data.range ?? 900;

        for (let p = 0; p < this.pelletsPerShot; p++) {
            const spread = this.pelletsPerShot > 1
                ? (p - (this.pelletsPerShot - 1) / 2) * this.spreadAngle
                : 0;
            const shotAngle = angle + spread;

            specs.push({
                x: shooter.x,
                y: shooter.y,
                targetX: shooter.x + Math.cos(shotAngle) * range,
                targetY: shooter.y + Math.sin(shotAngle) * range,
                speed: this.speed,
                damage: this.damage,
                color: this.color,
                size: this.projectileSize,
                ownerId: shooter.id,
                type: this.data.projectileType ?? this.type,
                sourceWeaponType: this.type,
            });
        }

        for (const mechanic of this.data.mechanics ?? []) {
            const apply = MECHANIC_APPLIERS[mechanic.name];
            if (!apply) {
                throw new Error(`DataWeapon "${this.type}": unknown mechanic "${mechanic.name}" — add it to MECHANIC_APPLIERS in DataWeapon.js`);
            }
            specs = apply(specs, mechanic);
        }

        return specs;
    }
}

// Registers a weapon straight from a data object — the entire integration
// step for a purely-stats weapon. See js/weapons2/data/pistol.js + index.js.
export function registerWeaponData(data) {
    class RegisteredDataWeapon extends DataWeapon {
        static type = data.type;
        static displayName = data.displayName;
        constructor() { super(data); }
    }
    WeaponFactory.register(data.type, RegisteredDataWeapon);
    return RegisteredDataWeapon;
}
