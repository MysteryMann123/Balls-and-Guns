// Sound of Star homing mechanic - orbits with wobble and homes to closest enemy
import * as W from '../../weapons/index.js';
import { Vector } from '../../core/vector.js';

export function create() {
    return {
        onUpdate(projectile, deltaMs, game, now) {
            projectile.soundStarOrbitAngle = ((projectile.soundStarOrbitAngle || 0) + W.soundOfStar.ORBIT_RATE) % (Math.PI * 2);

            const owner = game.balls.find(b => b.id === projectile.ownerId && b.isAlive());
            if (owner && projectile.vel.magnitude() > 0.001) {
                let closestEnemy = null;
                let closestDist = projectile.soundStarHomingRange ?? W.soundOfStar.HOMING_RANGE;
                for (const ball of game.balls) {
                    if (!ball.isAlive() || !game.areEnemies(owner, ball) || ball.isUntargetable(now)) continue;
                    const d = Math.hypot(ball.pos.x - projectile.pos.x, ball.pos.y - projectile.pos.y);
                    if (d < closestDist) { closestDist = d; closestEnemy = ball; }
                }

                const homingStrength = projectile.soundStarHomingStrength ?? W.soundOfStar.HOMING_STRENGTH;
                const wobble = Math.sin(projectile.soundStarOrbitAngle) * 0.28;

                let targetAngle;
                if (closestEnemy) {
                    targetAngle = Math.atan2(closestEnemy.pos.y - projectile.pos.y, closestEnemy.pos.x - projectile.pos.x) + wobble;
                } else {
                    targetAngle = Math.atan2(projectile.vel.y, projectile.vel.x) + wobble * 0.12;
                }

                const desired = new Vector(Math.cos(targetAngle), Math.sin(targetAngle));
                const currentDir = projectile.vel.clone().normalize();
                const newDir = currentDir.multiply(1 - homingStrength).add(desired.multiply(homingStrength));
                const mag = newDir.magnitude();
                if (mag > 0.001) {
                    projectile.vel = newDir.multiply(W.soundOfStar.SPEED / mag);
                }
                projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
            }
        },
    };
}
