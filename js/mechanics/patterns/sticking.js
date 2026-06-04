// Sticking mechanic - projectile sticks to target and follows its position
// Used by: huntsman, swordsharpened

export function create() {
    return {
        onUpdate(projectile, deltaMs, game, now) {
            // Only process if projectile is stuck to a target
            if (!projectile.stuckToBallId) return;

            const stuckBall = game.balls.find(candidate => candidate.id === projectile.stuckToBallId && candidate.isAlive());

            // Remove if stuck ball died or stick duration expired
            if (!stuckBall || now >= (projectile.stickExpiresAt || 0)) {
                projectile.shouldRemove = true;
                return;
            }

            // Follow stuck ball's position with offset
            projectile.pos.x = stuckBall.pos.x + (projectile.stickOffsetX || 0);
            projectile.pos.y = stuckBall.pos.y + (projectile.stickOffsetY || 0);

            // Swordsharpened: propagate sharpen buff back to owner
            if (projectile.type === 'swordsharpened') {
                const shooter = game.balls.find(b => b.id === projectile.ownerId);
                if (shooter && projectile.sharpenStacks > 0 && now < (projectile.sharpenExpiresAt || 0)) {
                    shooter.swordSharpenStacks = projectile.sharpenStacks;
                    shooter.swordSharpenExpiresAt = projectile.sharpenExpiresAt;
                    if (shooter.weapon && shooter.weapon.type === 'swordsharpened') {
                        shooter.weapon.swordSharpenStacks = projectile.sharpenStacks;
                        shooter.weapon.swordSharpenExpiresAt = projectile.sharpenExpiresAt;
                    }
                }
            }
        },

        onExpire(projectile) {
            // Cleanup on removal
        },
    };
}
