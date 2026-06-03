// Mechanics module: maxHpDamage
// Deals damage as a percentage of the target's maximum HP.
//
// Weapons: paradiseLost, solemnVow (black), egoLoveHate (pale), egoSoda (purple)

export function create(minRatio, maxRatio) {
    return { MIN_RATIO: minRatio, MAX_RATIO: maxRatio };
}

// Computes the actual damage value from a target's max HP.
export function calculate(targetMaxHp, minRatio, maxRatio) {
    const ratio = minRatio + Math.random() * (maxRatio - minRatio);
    return targetMaxHp * ratio;
}
