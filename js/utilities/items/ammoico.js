export const ammoico = {
    color: '#8ae6ff',

    DOUBLE_SHOT_MS: 5000,

    description: (u) => [
        'Fully restores ammo for the active weapon on pickup.',
        `For ${u.DOUBLE_SHOT_MS / 1000}s after pickup, every shot fires a second projectile at a slight spread angle.`,
        'Works for all projectile weapons. Hitscan weapons (shotgun, widowmaker, etc.) also fire a duplicate ray.'
    ],
};
