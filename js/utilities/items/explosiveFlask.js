export const explosiveFlask = {
    color: '#ffc977',

    SPLASH_RADIUS: 80,
    EFFECT_DURATION_MS: 8000,
    SLOW_MULTIPLIER: 0.5,
    PICKUP_DAMAGE_MULTIPLIER: 2.0,

    description: (u) => [
        'Auto-thrown at the nearest enemy when picked up.',
        'Marked enemies take increased explosive damage from all sources while debuffed.'
    ],
};
