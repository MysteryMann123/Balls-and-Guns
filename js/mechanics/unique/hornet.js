// Hornet bee tracking mechanic - homes to target, retargets on death
import * as W from '../../weapons/index.js';
import { Vector } from '../../core/vector.js';

export function create() {
    return {
        onUpdate(projectile, deltaMs, game, now) {
            const owner = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
            if (!owner) {
                // Owner dead, remove bee
                const idx = game.projectiles.indexOf(projectile);
                if (idx !== -1) game.projectiles.splice(idx, 1);
                return;
            }

            let target = game.balls.find(candidate => candidate.id === projectile.hornetTargetId && candidate.isAlive());
            if (!target || !game.areEnemies(owner, target) || target.isUntargetable(now)) {
                target = null;
                let bestDistance = projectile.hornetHomingRange || W.hornet.BEE_HOMING_RANGE;
                for (const candidate of game.balls) {
                    if (!candidate.isAlive()) continue;
                    if (!game.areEnemies(owner, candidate)) continue;
                    if (candidate.isUntargetable(now)) continue;
                    const dx = candidate.pos.x - projectile.pos.x;
                    const dy = candidate.pos.y - projectile.pos.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < bestDistance) {
                        bestDistance = distance;
                        target = candidate;
                    }
                }
                if (target) projectile.hornetTargetId = target.id;
            }

            if (target) {
                const desired = new Vector(target.pos.x - projectile.pos.x, target.pos.y - projectile.pos.y);
                if (desired.magnitude() > 0.001) {
                    const steering = desired.normalize();
                    const currentDir = projectile.vel.magnitude() > 0.001
                        ? projectile.vel.clone().normalize()
                        : steering.clone();
                    const blend = Math.max(0, Math.min(1, projectile.hornetHomingStrength || W.hornet.BEE_HOMING_STRENGTH));
                    const newDir = currentDir.multiply(1 - blend).add(steering.multiply(blend));
                    projectile.vel = newDir.normalize().multiply(W.hornet.BEE_SPEED);
                    projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
                }
            } else if (projectile.vel.magnitude() < 0.001) {
                projectile.vel = new Vector(Math.cos(owner.aimAngle), Math.sin(owner.aimAngle)).multiply(W.hornet.BEE_SPEED);
            }
        },
    };
}
