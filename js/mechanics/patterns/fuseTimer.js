// Fuse timer mechanic - projectile detonates after timer or on impact
// Can be cooked (hold to reduce fuse time before firing)

export function create(baseTimeMs, minTimeMs = 200) {
    return {
        baseTimeMs,
        minTimeMs,

        // Initialize fuse on projectile creation
        initFuse(projectile) {
            projectile.fuseStartTime = performance.now();
            projectile.fuseTimeMs = baseTimeMs;
            projectile.fuseRemaining = baseTimeMs;
            projectile.hasDetonated = false;
            projectile.fusePercent = 1.0; // 1.0 = full, 0.0 = depleted
        },

        // Update fuse countdown each frame
        updateFuse(projectile, deltaMs) {
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
        onImpact(projectile) {
            projectile.hasDetonated = true;
            projectile.shouldExplode = true;
        },

        // Cooking: reduce fuse time by holding fire
        cookFuse(reduceByMs) {
            baseTimeMs = Math.max(minTimeMs, baseTimeMs - reduceByMs);
        },

        // Reset to base time
        resetFuse() {
            baseTimeMs = arguments[0] || baseTimeMs;
        },

        // Get fuse info for rendering
        getFuseInfo(projectile) {
            return {
                remaining: projectile.fuseRemaining,
                percent: projectile.fusePercent,
                isDetonating: projectile.hasDetonated,
            };
        },
    };
}
