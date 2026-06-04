// Double Donk mechanic - bonus damage/knockback when projectile AND explosion hit same enemy

export function create(windowMs = 150) {
    const hitRegistry = new Map();

    return {
        windowMs,

        // Register projectile impact with an enemy
        onHit(projectile, target) {
            const projectileId = projectile.id || Math.random();
            hitRegistry.set(projectileId, {
                enemy: target,
                hitTime: performance.now(),
            });
            projectile._ddId = projectileId;
        },

        // Check if we should trigger double donk on splash hit
        onUpdate(projectile, deltaMs, game, now) {
            if (!projectile._ddId) return;

            const record = hitRegistry.get(projectile._ddId);
            if (record && performance.now() - record.hitTime > windowMs * 10) {
                hitRegistry.delete(projectile._ddId);
            }
        },

        // Cleanup when projectile expires
        onExpire(projectile) {
            if (projectile._ddId) {
                hitRegistry.delete(projectile._ddId);
            }
        },

        // Render nothing - handled by game logic
        onDraw(ctx, projectile) {
            // Visual feedback handled separately if needed
        },

        // Check for double donk when explosion hits
        checkDoubledonk(projectile, target) {
            const projectileId = projectile._ddId;

            if (!projectileId || !hitRegistry.has(projectileId)) {
                return { triggered: false };
            }

            const record = hitRegistry.get(projectileId);

            // Same enemy hit within window?
            if (record.enemy === target) {
                const timeSinceHit = performance.now() - record.hitTime;

                if (timeSinceHit <= windowMs) {
                    return {
                        triggered: true,
                        knockbackBonus: 1.5,    // 150% of base knockback
                        damageBonus: 1.25,      // 125% of explosion damage
                        feedback: 'DOUBLE DONK!',
                    };
                }
            }

            return { triggered: false };
        },
    };
}
