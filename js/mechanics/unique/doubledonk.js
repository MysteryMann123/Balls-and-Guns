// Double Donk mechanic - bonus damage/knockback when projectile AND explosion hit same enemy

export function create(windowMs = 150) {
    const hitRegistry = new Map(); // projectile ID -> {enemy, hitTime, damage}

    return {
        windowMs,

        // Register projectile impact with an enemy
        onProjectileHit(projectile, enemy, damageDealt) {
            const projectileId = projectile.id || Object.keys(hitRegistry).length;
            hitRegistry.set(projectileId, {
                enemy: enemy,
                hitTime: performance.now(),
                damage: damageDealt,
                projectileId: projectileId,
            });
            projectile._ddId = projectileId;
        },

        // Check for double donk when explosion hits
        checkDoubledonk(projectile, enemy) {
            const projectileId = projectile._ddId;

            if (!projectileId || !hitRegistry.has(projectileId)) {
                return { triggered: false };
            }

            const hitRecord = hitRegistry.get(projectileId);

            // Same enemy hit within window?
            if (hitRecord.enemy === enemy) {
                const timeSinceHit = performance.now() - hitRecord.hitTime;

                if (timeSinceHit <= windowMs) {
                    return {
                        triggered: true,
                        knockbackBonus: 1.5,    // 150% of base knockback
                        damageBonus: 1.25,      // 125% of explosion damage
                        originalHitDamage: hitRecord.damage,
                        feedback: 'DOUBLE DONK!',
                    };
                }
            }

            return { triggered: false };
        },

        // Cleanup when projectile is destroyed
        onProjectileDestroy(projectile) {
            if (projectile._ddId) {
                hitRegistry.delete(projectile._ddId);
            }
        },

        // Clear registry (for round reset, etc)
        clearRegistry() {
            hitRegistry.clear();
        },

        // Get stats
        getHitCount() {
            return hitRegistry.size;
        },
    };
}
