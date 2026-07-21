// Pistol — pure data. No methods, no class, no per-weapon file to touch
// anywhere else. To create a custom weapon "on the fly", copy this file,
// change the numbers, add it to mechanics: [] if it needs pierce/splash/etc,
// and register it in js/weapons2/index.js.

export default {
    type:           'pistol',
    displayName:    'PISTOL',
    maxAmmo:        12,
    reloadTimeMs:   1600,
    speed:          12,
    fireRate:       120,
    color:          '#ffff00',
    projectileSize: 4,
    pelletsPerShot: 1,
    spreadAngle:    0.35,
    damage:         20,
    range:          900,
    image:          'assets/Pistol_True.png',
    projectileType: 'pistol',
    mechanics:      [], // e.g. [{ name: 'pierce', count: 3 }, { name: 'splash', radius: 80 }]
};
