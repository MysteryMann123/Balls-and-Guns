export const scrumpyBottle = {
    color: '#f2bf54',

    // Throw mechanics
    BOTTLE_THROW_DAMAGE_MIN: 100,
    BOTTLE_THROW_DAMAGE_MAX: 150,
    THROW_SPEED: 9,

    // Puddle mechanics
    PUDDLE_DAMAGE_MIN: 10,
    PUDDLE_DAMAGE_MAX: 20,
    PUDDLE_DURATION_MS: 6000,
    PUDDLE_INITIAL_RADIUS: 38,
    PUDDLE_FINAL_RADIUS: 132,
    PUDDLE_TICK_INTERVAL_MS: 1000,

    // Resistance
    DAMAGE_REDUCTION: 0.1,

    description: (u) => [
        'Auto-thrown at the nearest enemy when picked up.',
        'Spills an expanding damage puddle that lasts the full duration.'
    ],
};
