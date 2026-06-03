// Mechanics module: randomizer
// Introduces randomness or variance into mechanic behavior.
// Selects random variants or applies probabilistic effects.
//
// Weapons: egoLoveHate (4 shot colors), egoSoda (3 shot types)

export function create(variants) {
    return { VARIANTS: variants };
}

export function pickRandom(variants) {
    if (!variants || variants.length === 0) return null;
    const index = Math.floor(Math.random() * variants.length);
    return variants[index];
}

export function pickWeighted(variants, weights) {
    if (!variants || variants.length === 0) return null;
    if (!weights || weights.length !== variants.length) {
        return pickRandom(variants);
    }

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight <= 0) return pickRandom(variants);

    let roll = Math.random() * totalWeight;
    for (let i = 0; i < variants.length; i++) {
        roll -= weights[i];
        if (roll <= 0) return variants[i];
    }

    return variants[variants.length - 1];
}

export function rollChance(probability) {
    return Math.random() < probability;
}

export function rollRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollDeviation(baseValue, deviationPercent) {
    const deviation = baseValue * (deviationPercent / 100);
    return baseValue + (Math.random() * 2 - 1) * deviation;
}
