// Hairspray cloud mechanic - applies DoT ticks to enemies in cloud radius
import * as W from '../../weapons/index.js';

export function create() {
    return {
        onSpawn(projectile) {
            projectile.cloudTickCounts = {};
            projectile.cloudLastTickAt = {};
        },

        onUpdate(projectile, deltaMs, game, now) {
            // Initialize origin on first update
            if (projectile.originX === undefined) {
                projectile.originX = projectile.pos.x;
                projectile.originY = projectile.pos.y;
            }

            // Check if cloud has exceeded max range
            const distFromOrigin = Math.hypot(
                projectile.pos.x - projectile.originX,
                projectile.pos.y - projectile.originY
            );
            if (distFromOrigin >= W.hairspray.MAX_RANGE) {
                if (!projectile.lingerUntil) {
                    projectile.lingerUntil = now + W.hairspray.LINGER_MS;
                }
                projectile.vel.x = 0;
                projectile.vel.y = 0;
                // Mark for removal by main loop when linger expires
                if (now >= projectile.lingerUntil) {
                    projectile.shouldRemove = true;
                    return;
                }
            }

            // Apply damage ticks to enemies in cloud
            const cloudOwner = game.balls.find(b => b.id === projectile.ownerId);
            for (const ball of game.balls) {
                if (!ball.isAlive() || ball.isUntargetable(now)) continue;
                if (cloudOwner && !game.areEnemies(cloudOwner, ball)) continue;
                if (ball.isUberActive(now)) continue;
                if (Math.hypot(ball.pos.x - projectile.pos.x, ball.pos.y - projectile.pos.y) > W.hairspray.CLOUD_RADIUS + ball.radius) continue;

                // Determine max ticks based on distance from origin
                const distToBall = Math.hypot(ball.pos.x - projectile.originX, ball.pos.y - projectile.originY);
                let maxTicks;
                if (distToBall < W.hairspray.NEAR_ZONE_END) {
                    maxTicks = W.hairspray.NEAR_MAX_TICKS;
                } else if (distToBall < W.hairspray.MID_ZONE_END) {
                    maxTicks = W.hairspray.MID_MAX_TICKS;
                } else {
                    maxTicks = W.hairspray.FAR_MAX_TICKS;
                }

                // Check if ball has exceeded max ticks
                const tickCount = projectile.cloudTickCounts[ball.id] || 0;
                if (tickCount >= maxTicks) continue;

                // Check tick interval
                const lastTick = projectile.cloudLastTickAt[ball.id] || 0;
                if (now - lastTick < W.hairspray.TICK_INTERVAL_MS) continue;

                // Apply tick damage
                projectile.cloudLastTickAt[ball.id] = now;
                projectile.cloudTickCounts[ball.id] = tickCount + 1;
                const dmg = Math.round(
                    (W.hairspray.TICK_DAMAGE_MIN + Math.random() * (W.hairspray.TICK_DAMAGE_MAX - W.hairspray.TICK_DAMAGE_MIN))
                    * (cloudOwner ? cloudOwner.getDamageMultiplier(now) : 1)
                );
                ball.takeDamage(dmg, 'chemical');
            }
        },

        onExpire(projectile) {
            // Cleanup on projectile removal
            projectile.cloudTickCounts = {};
            projectile.cloudLastTickAt = {};
        },

        onDraw(ctx, projectile) {
            // Visual feedback handled by game engine if needed
        },
    };
}
