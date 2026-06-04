export const healthico = {
    color: '#6cff7a',

    HEAL: 150,
    REGEN_PER_TICK: 10,
    REGEN_INTERVAL_MS: 1000,
    REGEN_DURATION_MS: 6000,

    description: (u) => [
        `Instantly heals ${u.HEAL} HP on pickup.`,
        `Then regenerates +${u.REGEN_PER_TICK} HP every ${u.REGEN_INTERVAL_MS / 1000}s for ${u.REGEN_DURATION_MS / 1000}s (${u.REGEN_PER_TICK * (u.REGEN_DURATION_MS / u.REGEN_INTERVAL_MS)} HP total).`,
    ],
};
