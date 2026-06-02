import { PICKUP_SPAWN_RATE_MS } from './pickupConstants.js';

// --- Arena ---
export const ARENA_WIDTH  = 800;
export const ARENA_HEIGHT = 600;

// --- Ball ---
export const BALL_MAX_HP     = 1600;
export const BALL_BASE_SPEED = 4;
export const BALL_MIN_SPEED  = 1;

// --- Timing ---
export const REACTION_DELAY_MS = 140;

// --- Weapon / Utility Pools ---
export const START_WEAPON_OPTIONS = [
    'pistol',
    'revolver',
    'shotgun',
    'familybusiness',
    'sodapopper',
    'forceanature',
    'musket',
    'magicianhat',
    'widowmaker',
    'sniper',
    'machina',
    'huntsman',
    'crusaderscrossbow',
    'smg',
    'tommygun',
    'egomagicbullet',
    'egoloneliness',
    'penitence',
    'paradiselost',
    'solemnvow',
    'harmony',
    'hornet',
    'swordsharpened',
    'egolovehate',
    'soundofstar',
    'minigun',
    'blutsauger',
    'shortcircuit',
    'rocketlauncher',
    'piplauncher',
    'beggersbazooka',
    'directhit',
    'nearmissed',
    'rocketjumper',
    'medigun',
    'yellowtarge',
    'grenadelauncher',
    'lochnload',
    'faintaroma',
    'hairspray',
    'adoration',
    'flamethrower',
    'hypocrisy',
    'crimsonscar',
    'egopinks',
    'egosoda',
    'laetitia',
    'dealer'
];

export const DROP_WEAPON_TYPES = [
    'pistol',
    'revolver',
    'shotgun',
    'familybusiness',
    'sodapopper',
    'forceanature',
    'musket',
    'magicianhat',
    'widowmaker',
    'dealer',
    'sniper',
    'machina',
    'huntsman',
    'crusaderscrossbow',
    'smg',
    'tommygun',
    'egomagicbullet',
    'egoloneliness',
    'penitence',
    'paradiselost',
    'solemnvow',
    'harmony',
    'hornet',
    'swordsharpened',
    'egolovehate',
    'soundofstar',
    'minigun',
    'blutsauger',
    'shortcircuit',
    'rocketlauncher',
    'piplauncher',
    'beggersbazooka',
    'directhit',
    'nearmissed',
    'rocketjumper',
    'medigun',
    'yellowtarge',
    'grenadelauncher',
    'lochnload',
    'faintaroma',
    'hairspray',
    'adoration',
    'flamethrower'
];

export const DROP_UTILITY_TYPES = [
    'ammoico',
    'healthico',
    'ubercharge',
    'critical',
    'speed',
    'explosiveflask',
    'scrumpybottle',
    'bombanomicron',
    'deadringer'
];

export function buildGameSettings(settings, normalizeStartWeapons) {
    const resolved = {
        ballCount: Math.max(2, Math.min(12, Number(settings.ballCount) || 4)),
        teamCount: 2,
        dropFrequencyMs: Math.max(600, Math.min(7000, Number(settings.dropFrequencyMs) || PICKUP_SPAWN_RATE_MS)),
        allowWeaponDrops: settings.allowWeaponDrops !== false,
        allowUtilityDrops: settings.allowUtilityDrops !== false
    };

    resolved.teamCount = Math.max(2, Math.min(resolved.ballCount, Number(settings.teamCount) || 2));
    resolved.startWeapons = normalizeStartWeapons(settings.startWeapons, resolved.ballCount);

    return resolved;
}

export function createDefaultDropWeights() {
    return {
        pistol: 1.2,
        revolver: 1,
        shotgun: 1.1,
        familybusiness: 0.98,
        sodapopper: 0.95,
        forceanature: 0.9,
        musket: 0.86,
        magicianhat: 0.8,
        widowmaker: 1,
        dealer: 0.7,
        sniper: 0.9,
        machina: 0.8,
        huntsman: 0.85,
        crusaderscrossbow: 0.8,
        smg: 1.2,
        tommygun: 0.98,
        egomagicbullet: 0.55,
        egoloneliness: 0.78,
        penitence: 0.62,
        paradiselost: 0.2,
        harmony: 0.18,
        hornet: 0.2,
        swordsharpened: 0.15,
        solemnvow: 0.26,
        minigun: 0.9,
        blutsauger: 0.95,
        shortcircuit: 0.85,
        rocketlauncher: 0.7,
        piplauncher: 0.74,
        beggersbazooka: 0.62,
        directhit: 0.65,
        nearmissed: 0.72,
        rocketjumper: 0.6,
        yellowtarge: 0.75,
        medigun: 0.7,
        grenadelauncher: 0.75,
        flamethrower: 0.82,
        ammoico: 1.3,
        healthico: 1.2,
        ubercharge: 0.75,
        critical: 0.75,
        speed: 0.95,
        explosiveflask: 0.58,
        scrumpybottle: 0.62,
        bombanomicron: 0.54,
        deadringer: 0.48
    };
}
