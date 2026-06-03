// Mechanics module: lifesteal
// Wielder gains health when dealing damage.
//
// Weapons: paradiseLost, medigun

export function create(ratio) {
    return { RATIO: ratio };
}

// Calculates health gained from damage dealt.
// Clamped to wielder's max health (no overheal unless overHealMultiplier applies).
export function calculate(damageDealt, ratio) {
    return damageDealt * ratio;
}
