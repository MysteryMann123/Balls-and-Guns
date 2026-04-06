import { PICKUP_SPAWN_RATE_MS } from './constants.js';

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
