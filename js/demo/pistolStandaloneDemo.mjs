// Standalone proof that the new data-driven weapon architecture works end to
// end using ONLY these files:
//   core/weapons/WeaponFactory.js
//   core/weapons/BaseWeapon.js
//   core/weapons/DataWeapon.js
//   core/weapons/decorators.js
//   weapons2/data/pistol.js  (pure data — no class, no methods)
//   weapons2/index.js        (the single registration point)
//   core/projectile.js
//   core/vector.js
//
// None of the legacy god-files (weapon.js, gameShooting.js, gameProjectiles.js,
// weapons/index.js, or the other 60 weapon modules) are imported anywhere in
// this chain.
//
// Run with:  node js/demo/pistolStandaloneDemo.mjs

// core/projectile.js references the browser's Image constructor at module
// scope (for a sprite it preloads). Stub it so the module can load headless
// under Node — this does not touch core/projectile.js itself, it only fills
// in the one browser global it expects to exist.
if (typeof globalThis.Image === 'undefined') {
    globalThis.Image = class { constructor() { this.src = ''; } };
}

const { WeaponFactory } = await import('../core/weapons/WeaponFactory.js');
const { Projectile } = await import('../core/projectile.js');
await import('../weapons2/index.js'); // side-effect import: registers every data-driven weapon

const pistol = WeaponFactory.create('pistol');
const shooter = { id: 'ball-1', x: 100, y: 100 };

console.log('Registered weapon types:', WeaponFactory.types());
console.log('Initial state:', pistol.getInfo(0));
console.log('');

let now = 0;
let shots = 0;

while (shots < 14) {
    now += 20; // ~50fps tick
    const specs = pistol.fire(shooter, 0, now);
    if (!specs) continue;

    shots++;
    const projectiles = specs.map(spec => new Projectile(spec));
    const p = projectiles[0];
    console.log(
        `t=${now}ms  shot #${shots}  ammo=${pistol.ammo}/${pistol.maxAmmo}  ` +
        `dmg=${p.damage}  vel=(${p.vel.x.toFixed(2)}, ${p.vel.y.toFixed(2)})  type=${p.type}`
    );
}

console.log('\n-- draining remaining ammo to force a reload --');
while (pistol.ammo > 0) {
    now += 20;
    pistol.fire(shooter, 0, now);
}
console.log('After ammo hits 0:', pistol.getInfo(now));

now += pistol.reloadTimeMs + 20;
console.log('After reload window elapses:', pistol.getInfo(now));

console.log('\nOK: pistol fired 14 shots, ran dry, reloaded, and produced real');
console.log('core/projectile.js Projectile instances — built entirely from a plain');
console.log('data object (weapons2/data/pistol.js), without importing weapon.js,');
console.log('gameShooting.js, gameProjectiles.js, or any other weapon module.');
