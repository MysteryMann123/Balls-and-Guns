// Fuse timer mechanic - projectile detonates after timer or on impact
// Can be cooked (hold to reduce fuse time before firing)

export function create(baseTimeMs, minTimeMs = 200) {
    return {
        baseTimeMs,
        minTimeMs,

        // Initialize fuse on projectile creation
        onSpawn(projectile) {
            projectile.fuseStartTime = performance.now();
            projectile.fuseTimeMs = baseTimeMs;
            projectile.fuseRemaining = baseTimeMs;
            projectile.hasDetonated = false;
            projectile.fusePercent = 1.0;
        },

        // Update fuse countdown each frame
        onUpdate(projectile, deltaMs, game, now) {
            if (projectile.hasDetonated) return;

            const elapsed = performance.now() - projectile.fuseStartTime;
            projectile.fuseRemaining = Math.max(0, projectile.fuseTimeMs - elapsed);
            projectile.fusePercent = projectile.fuseRemaining / projectile.fuseTimeMs;

            // Detonate when fuse expires
            if (projectile.fuseRemaining <= 0 && !projectile.hasDetonated) {
                projectile.hasDetonated = true;
                projectile.shouldExplode = true;
            }
        },

        // Mark projectile for explosion on impact
        onHit(projectile, target) {
            projectile.hasDetonated = true;
            projectile.shouldExplode = true;
        },

        // Cleanup on projectile destruction
        onExpire(projectile) {
            projectile.hasDetonated = true;
            projectile.shouldExplode = true;
        },

        // Draw fuse countdown visual
        onDraw(ctx, projectile) {
            if (!projectile.fusePercent) return;

            const percent = projectile.fusePercent;
            const color = percent > 0.5 ? '#00ff00' : percent > 0.25 ? '#ffff00' : '#ff0000';

            // Draw countdown circle
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(projectile.pos.x, projectile.pos.y - 15, 5, 0, Math.PI * 2 * percent);
            ctx.stroke();

            // Draw fuse time text
            ctx.fillStyle = color;
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${Math.ceil(projectile.fuseRemaining / 100) / 10}s`, projectile.pos.x, projectile.pos.y - 20);
            ctx.restore();
        },
    };
}
