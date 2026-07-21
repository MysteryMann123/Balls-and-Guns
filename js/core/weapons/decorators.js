// Weapon decorators — Decorator pattern seam for optional projectile behaviors.
//
// The project already has the raw material for this in js/mechanics/shared/
// and js/mechanics/patterns/ (pierce, splashAoe, homing, afterburn, ...) but
// nothing currently wires them onto a weapon — instead gameProjectiles.js
// checks `if (projectile.type === 'faintaroma' || projectile.type === 'adoration' ...)`
// by hand for every weapon that happens to pierce.
//
// The intended usage, once a weapon needs one of these, is to wrap its spec
// array in the relevant decorator instead of adding a new branch to a shared
// file:
//
//   import { withPierce } from '../core/weapons/decorators.js';
//   import * as Pierce from '../mechanics/shared/pierce.js';
//
//   createProjectiles(shooter, angle, now) {
//       const specs = [ ...basic pistol-shaped spec... ];
//       return withPierce(specs, Pierce.create(3));
//   }
//
// Pistol does not need any of these — it is included only to make the seam
// visible for the next weapon that does (e.g. a future Flamethrower or
// Adoration port).

export function withPierce(specs, pierceConfig) {
    return specs.map(spec => ({ ...spec, piercingCount: pierceConfig.COUNT }));
}

export function withSplash(specs, splashConfig) {
    return specs.map(spec => ({ ...spec, splashRadius: splashConfig.RADIUS }));
}
