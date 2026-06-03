import { Projectile } from './projectile.js';
import { Vector } from './vector.js';
import * as W from './weapons/index.js';

function trySpawnHornetBee(game, victim, attacker, now) {
    if (!victim || !attacker) return;
    if (victim.weapon.type !== 'hornet') return;
    if (!attacker.isAlive()) return;
    if (!game.areEnemies(victim, attacker)) return;

    const activeBeeCount = game.projectiles.filter(projectile => projectile.type === 'hornetbee' && projectile.ownerId === victim.id).length;
    if (activeBeeCount >= W.hornet.BEE_MAX_ACTIVE) return;

    const damage = Math.floor(Math.random() * (W.hornet.BEE_DAMAGE_MAX - W.hornet.BEE_DAMAGE_MIN + 1)) + W.hornet.BEE_DAMAGE_MIN;

    game.projectiles.push(
        new Projectile({
            x: victim.pos.x,
            y: victim.pos.y,
            targetX: attacker.pos.x,
            targetY: attacker.pos.y,
            speed: W.hornet.BEE_SPEED,
            damage,
            color: '#ffd84a',
            size: W.hornet.BEE_SIZE,
            ownerId: victim.id,
            type: 'hornetbee',
            sourceWeaponType: 'hornet',
            hornetTargetId: attacker.id,
            hornetHomingStrength: W.hornet.BEE_HOMING_STRENGTH,
            hornetHomingRange: W.hornet.BEE_HOMING_RANGE,
            afterburnMin: W.hornet.RIFLE_AFTERBURN_DAMAGE_MIN,
            afterburnMax: W.hornet.RIFLE_AFTERBURN_DAMAGE_MAX,
            afterburnDuration: W.hornet.RIFLE_AFTERBURN_DURATION_MS,
            afterburnInterval: W.hornet.RIFLE_AFTERBURN_INTERVAL_MS,
            expiresAt: now + 3500
        })
    );
}

export function fireShotgunRay(game, shooter, angle, now, damageMultiplier = 1) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let closestHitDistance = W.shotgun.HITSCAN_RANGE;
    let hitBall = null;

    for (const target of game.balls) {
        if (!target.isAlive()) continue;
        if (target.id === shooter.id) continue;
        if (!game.areEnemies(shooter, target)) continue;

        const hitDistance = rayCircleHitDistance(
            originX,
            originY,
            dirX,
            dirY,
            target.pos.x,
            target.pos.y,
            target.radius,
            W.shotgun.HITSCAN_RANGE
        );

        if (hitDistance !== null && hitDistance < closestHitDistance) {
            closestHitDistance = hitDistance;
            hitBall = target;
        }
    }

    if (hitBall && !hitBall.isUberActive(now)) {
        const damageMin = typeof shooter.weapon.damageMin === 'number' ? shooter.weapon.damageMin : W.shotgun.DAMAGE_MIN;
        const damageMax = typeof shooter.weapon.damageMax === 'number' ? shooter.weapon.damageMax : W.shotgun.DAMAGE_MAX;
        const falloffRatio = Math.max(0, Math.min(1, closestHitDistance / W.shotgun.HITSCAN_RANGE));
        const baseDamage = damageMax - (damageMax - damageMin) * falloffRatio;
        hitBall.takeDamage(baseDamage * damageMultiplier);
        trySpawnHornetBee(game, hitBall, shooter, now);
    }

    const endX = originX + dirX * closestHitDistance;
    const endY = originY + dirY * closestHitDistance;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#ffd3a1',
            size: 0,
            ownerId: shooter.id,
            type: 'shotgunray',
            endX,
            endY,
            tracerWidth: 2.8,
            expiresAt: now + W.shotgun.TRACER_DURATION_MS
        })
    );
}

export function fireHornetShotgunRay(game, shooter, angle, now, damageMultiplier = 1) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let closestHitDistance = W.hornet.W.shotgun.HITSCAN_RANGE;
    let hitBall = null;

    for (const target of game.balls) {
        if (!target.isAlive()) continue;
        if (target.id === shooter.id) continue;
        if (!game.areEnemies(shooter, target)) continue;
        if (target.isUntargetable(now)) continue;

        const hitDistance = rayCircleHitDistance(
            originX,
            originY,
            dirX,
            dirY,
            target.pos.x,
            target.pos.y,
            target.radius,
            W.hornet.W.shotgun.HITSCAN_RANGE
        );

        if (hitDistance !== null && hitDistance < closestHitDistance) {
            closestHitDistance = hitDistance;
            hitBall = target;
        }
    }

    if (hitBall && !hitBall.isUberActive(now)) {
        const falloffRatio = Math.max(0, Math.min(1, closestHitDistance / W.hornet.W.shotgun.HITSCAN_RANGE));
        const baseDamage = W.hornet.W.shotgun.DAMAGE_MAX - (W.hornet.W.shotgun.DAMAGE_MAX - W.hornet.W.shotgun.DAMAGE_MIN) * falloffRatio;
        hitBall.takeDamage(baseDamage * damageMultiplier, 'generic', 'hornet');
        trySpawnHornetBee(game, hitBall, shooter, now);
    }

    const endX = originX + dirX * closestHitDistance;
    const endY = originY + dirY * closestHitDistance;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#ffcf66',
            size: 0,
            ownerId: shooter.id,
            type: 'hornetshotgunray',
            endX,
            endY,
            tracerWidth: 3.2,
            expiresAt: now + W.shotgun.TRACER_DURATION_MS
        })
    );
}

export function fireWidowmakerRay(game, shooter, angle, now, damageMultiplier = 1) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let closestHitDistance = W.widowmaker.HITSCAN_RANGE;
    let hitBall = null;

    for (const target of game.balls) {
        if (!target.isAlive()) continue;
        if (target.id === shooter.id) continue;
        if (!game.areEnemies(shooter, target)) continue;
        if (target.isUntargetable(now)) continue;

        const hitDistance = rayCircleHitDistance(
            originX,
            originY,
            dirX,
            dirY,
            target.pos.x,
            target.pos.y,
            target.radius,
            W.widowmaker.HITSCAN_RANGE
        );

        if (hitDistance !== null && hitDistance < closestHitDistance) {
            closestHitDistance = hitDistance;
            hitBall = target;
        }
    }

    if (hitBall && !hitBall.isUberActive(now)) {
        const falloffRatio = Math.max(0, Math.min(1, closestHitDistance / W.widowmaker.HITSCAN_RANGE));
        const baseDamage = W.widowmaker.DAMAGE_MAX - (W.widowmaker.DAMAGE_MAX - W.widowmaker.DAMAGE_MIN) * falloffRatio;
        const dealtAttempt = baseDamage * damageMultiplier;
        const beforeHp = hitBall.hp;
        hitBall.takeDamage(dealtAttempt, 'generic');
        trySpawnHornetBee(game, hitBall, shooter, now);
        const dealtActual = Math.max(0, beforeHp - hitBall.hp);
        shooter.weapon.refundAmmo(dealtActual);
    }

    const endX = originX + dirX * closestHitDistance;
    const endY = originY + dirY * closestHitDistance;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#ffd7a8',
            size: 0,
            ownerId: shooter.id,
            type: 'shotgunray',
            endX,
            endY,
            tracerWidth: 2.6,
            expiresAt: now + W.shotgun.TRACER_DURATION_MS
        })
    );
}

export function fireSodaPopperRay(game, shooter, angle, now, damageMultiplier = 1) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let closestHitDistance = W.sodaPopper.HITSCAN_RANGE;
    let hitBall = null;

    for (const target of game.balls) {
        if (!target.isAlive()) continue;
        if (target.id === shooter.id) continue;
        if (!game.areEnemies(shooter, target)) continue;
        if (target.isUntargetable(now)) continue;

        const hitDistance = rayCircleHitDistance(
            originX,
            originY,
            dirX,
            dirY,
            target.pos.x,
            target.pos.y,
            target.radius,
            W.sodaPopper.HITSCAN_RANGE
        );

        if (hitDistance !== null && hitDistance < closestHitDistance) {
            closestHitDistance = hitDistance;
            hitBall = target;
        }
    }

    if (hitBall && !hitBall.isUberActive(now)) {
        const falloffRatio = Math.max(0, Math.min(1, closestHitDistance / W.sodaPopper.HITSCAN_RANGE));
        const baseDamage = W.sodaPopper.DAMAGE_MAX - (W.sodaPopper.DAMAGE_MAX - W.sodaPopper.DAMAGE_MIN) * falloffRatio;
        const dealtAttempt = baseDamage * damageMultiplier;
        const beforeHp = hitBall.hp;
        hitBall.takeDamage(dealtAttempt, 'generic');
        trySpawnHornetBee(game, hitBall, shooter, now);
        const dealtActual = Math.max(0, beforeHp - hitBall.hp);
        shooter.registerSodaPopperDamage(dealtActual, now);
    }

    const endX = originX + dirX * closestHitDistance;
    const endY = originY + dirY * closestHitDistance;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#b5f1ff',
            size: 0,
            ownerId: shooter.id,
            type: 'shotgunray',
            endX,
            endY,
            tracerWidth: 2.5,
            expiresAt: now + W.shotgun.TRACER_DURATION_MS
        })
    );
}

export function fireForceANatureRay(game, shooter, angle, now, damageMultiplier = 1, applySelfKnockback = false) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    if (applySelfKnockback) {
        const recoil = new Vector(-dirX, -dirY).multiply(shooter.weapon.selfKnockback || 0);
        shooter.applyImpulse(recoil);
    }

    let closestHitDistance = W.forceANature.HITSCAN_RANGE;
    let hitBall = null;

    for (const target of game.balls) {
        if (!target.isAlive()) continue;
        if (target.id === shooter.id) continue;
        if (!game.areEnemies(shooter, target)) continue;
        if (target.isUntargetable(now)) continue;

        const hitDistance = rayCircleHitDistance(
            originX,
            originY,
            dirX,
            dirY,
            target.pos.x,
            target.pos.y,
            target.radius,
            W.forceANature.HITSCAN_RANGE
        );

        if (hitDistance !== null && hitDistance < closestHitDistance) {
            closestHitDistance = hitDistance;
            hitBall = target;
        }
    }

    if (hitBall && !hitBall.isUberActive(now)) {
        const falloffRatio = Math.max(0, Math.min(1, closestHitDistance / W.forceANature.HITSCAN_RANGE));
        const baseDamage = W.forceANature.DAMAGE_MAX - (W.forceANature.DAMAGE_MAX - W.forceANature.DAMAGE_MIN) * falloffRatio;
        const dealtAttempt = baseDamage * damageMultiplier;
        hitBall.takeDamage(dealtAttempt, 'generic');
        trySpawnHornetBee(game, hitBall, shooter, now);

        const knockbackStrength = (shooter.weapon.enemyKnockback || 0) * (1 - falloffRatio * 0.55);
        if (knockbackStrength > 0) {
            const knockbackDir = new Vector(dirX, dirY).normalize();
            hitBall.applyImpulse(knockbackDir.multiply(knockbackStrength));
        }
    }

    const endX = originX + dirX * closestHitDistance;
    const endY = originY + dirY * closestHitDistance;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#c8f8ff',
            size: 0,
            ownerId: shooter.id,
            type: 'shotgunray',
            endX,
            endY,
            tracerWidth: 2.4,
            expiresAt: now + W.shotgun.TRACER_DURATION_MS
        })
    );
}

export function teleportMagicianHatShooter(game, shooter, target, now) {
    const fromX = shooter.pos.x;
    const fromY = shooter.pos.y;
    game.teleportSmokeEffects.push({
        x: fromX,
        y: fromY,
        createdAt: now,
        expiresAt: now + W.magicianHat.TELEPORT_SMOKE_DURATION_MS
    });

    const forwardX = Math.cos(shooter.aimAngle);
    const forwardY = Math.sin(shooter.aimAngle);
    const lateralSign = Math.random() < 0.5 ? -1 : 1;
    const lateralDir = new Vector(-forwardY, forwardX).multiply(lateralSign);

    const destinationX = fromX + lateralDir.x * W.magicianHat.TELEPORT_DISTANCE;
    const destinationY = fromY + lateralDir.y * W.magicianHat.TELEPORT_DISTANCE;

    shooter.pos.x = Math.max(shooter.radius, Math.min(game.canvas.width - shooter.radius, destinationX));
    shooter.pos.y = Math.max(shooter.radius, Math.min(game.canvas.height - shooter.radius, destinationY));

    game.teleportSmokeEffects.push({
        x: shooter.pos.x,
        y: shooter.pos.y,
        createdAt: now,
        expiresAt: now + W.magicianHat.TELEPORT_SMOKE_DURATION_MS
    });
}

export function applyMagicianHatHoming(game, projectile, now) {
    const speed = projectile.vel.magnitude();
    if (speed < 0.001) return;

    const owner = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
    if (!owner) return;

    let bestTarget = null;
    let bestDistance = W.magicianHat.HOMING_RANGE;

    for (const candidate of game.balls) {
        if (!candidate.isAlive()) continue;
        if (candidate.id === owner.id) continue;
        if (!game.areEnemies(owner, candidate)) continue;
        if (candidate.isUntargetable(now)) continue;

        const dx = candidate.pos.x - projectile.pos.x;
        const dy = candidate.pos.y - projectile.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bestDistance) {
            bestDistance = distance;
            bestTarget = candidate;
        }
    }

    if (!bestTarget) return;

    const desired = new Vector(bestTarget.pos.x - projectile.pos.x, bestTarget.pos.y - projectile.pos.y);
    if (desired.magnitude() < 0.001) return;
    desired.normalize();

    const current = projectile.vel.clone().normalize();
    const steer = Math.max(0, Math.min(1, W.magicianHat.HOMING_STRENGTH));
    const blended = new Vector(
        current.x * (1 - steer) + desired.x * steer,
        current.y * (1 - steer) + desired.y * steer
    );

    if (blended.magnitude() < 0.001) return;
    blended.normalize();
    projectile.vel = blended.multiply(speed);
    projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
}

export function fireMachinaTracer(game, shooter, angle, now) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const endX = originX + Math.cos(angle) * W.machina.TRACER_RANGE;
    const endY = originY + Math.sin(angle) * W.machina.TRACER_RANGE;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: shooter.color,
            size: 0,
            ownerId: shooter.id,
            type: 'machinaray',
            endX,
            endY,
            tracerWidth: 4.4,
            expiresAt: now + W.machina.TRACER_DURATION_MS
        })
    );
}

export function firePinksTracer(game, shooter, angle, now) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const endX = originX + Math.cos(angle) * W.egoPinks.TRACER_RANGE;
    const endY = originY + Math.sin(angle) * W.egoPinks.TRACER_RANGE;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: W.egoPinks.TRACER_COLOR,
            size: 0,
            ownerId: shooter.id,
            type: 'pinksray',
            endX,
            endY,
            tracerWidth: 4.4,
            expiresAt: now + W.egoPinks.TRACER_DURATION_MS
        })
    );
}

export function applyEgoMagicBulletHoming(game, projectile, now) {
    const speed = projectile.vel.magnitude();
    if (speed < 0.001) return;

    const owner = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
    if (!owner) return;

    let bestTarget = null;
    let bestDistance = W.egoMagicBullet.HOMING_RANGE;

    for (const candidate of game.balls) {
        if (!candidate.isAlive()) continue;
        if (candidate.id === owner.id) continue;

        const dx = candidate.pos.x - projectile.pos.x;
        const dy = candidate.pos.y - projectile.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bestDistance) {
            bestDistance = distance;
            bestTarget = candidate;
        }
    }

    if (!bestTarget) return;

    const desired = new Vector(bestTarget.pos.x - projectile.pos.x, bestTarget.pos.y - projectile.pos.y);
    if (desired.magnitude() < 0.001) return;
    desired.normalize();

    const current = projectile.vel.clone().normalize();
    const steer = Math.max(0, Math.min(1, W.egoMagicBullet.HOMING_STRENGTH));
    const blended = new Vector(
        current.x * (1 - steer) + desired.x * steer,
        current.y * (1 - steer) + desired.y * steer
    );

    if (blended.magnitude() < 0.001) return;
    blended.normalize();
    projectile.vel = blended.multiply(speed);
    projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
}

export function applyParadiseLostHoming(game, projectile, now) {
    const speed = projectile.vel.magnitude();
    if (speed < 0.001) return;

    const owner = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
    if (!owner) return;

    let bestTarget = null;
    let bestDistance = W.paradiseLost.HOMING_RANGE;

    for (const candidate of game.balls) {
        if (!candidate.isAlive()) continue;
        if (candidate.id === owner.id) continue;
        if (!game.areEnemies(owner, candidate)) continue;
        if (candidate.isUntargetable(now)) continue;

        const dx = candidate.pos.x - projectile.pos.x;
        const dy = candidate.pos.y - projectile.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bestDistance) {
            bestDistance = distance;
            bestTarget = candidate;
        }
    }

    if (!bestTarget) return;

    const desired = new Vector(bestTarget.pos.x - projectile.pos.x, bestTarget.pos.y - projectile.pos.y);
    if (desired.magnitude() < 0.001) return;
    desired.normalize();

    const current = projectile.vel.clone().normalize();
    const steer = Math.max(0, Math.min(1, W.paradiseLost.HOMING_STRENGTH));
    const blended = new Vector(
        current.x * (1 - steer) + desired.x * steer,
        current.y * (1 - steer) + desired.y * steer
    );

    if (blended.magnitude() < 0.001) return;
    blended.normalize();
    projectile.vel = blended.multiply(speed);
    projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
}

export function fireEgoMagicTracer(game, shooter, angle, now) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const endX = originX + Math.cos(angle) * W.egoMagicBullet.TRACER_RANGE;
    const endY = originY + Math.sin(angle) * W.egoMagicBullet.TRACER_RANGE;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#c39bff',
            size: 0,
            ownerId: shooter.id,
            type: 'machinaray',
            endX,
            endY,
            tracerWidth: 3.8,
            expiresAt: now + W.egoMagicBullet.TRACER_DURATION_MS
        })
    );
}

export function fireEgoLonelinessTracer(game, shooter, angle, now) {
    const originX = shooter.pos.x;
    const originY = shooter.pos.y;
    const endX = originX + Math.cos(angle) * W.machina.TRACER_RANGE;
    const endY = originY + Math.sin(angle) * W.machina.TRACER_RANGE;

    game.projectiles.push(
        new Projectile({
            x: originX,
            y: originY,
            targetX: endX,
            targetY: endY,
            speed: 0,
            damage: 0,
            color: '#9f9f9f',
            size: 0,
            ownerId: shooter.id,
            type: 'egoloneliness',
            endX,
            endY,
            expiresAt: now + W.machina.TRACER_DURATION_MS
        })
    );
}

export function rayCircleHitDistance(originX, originY, dirX, dirY, centerX, centerY, radius, maxDistance) {
    const fx = originX - centerX;
    const fy = originY - centerY;

    const b = 2 * (dirX * fx + dirY * fy);
    const c = fx * fx + fy * fy - radius * radius;
    const discriminant = b * b - 4 * c;

    if (discriminant < 0) return null;

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant) / 2;
    const t2 = (-b + sqrtDiscriminant) / 2;

    let best = null;
    if (t1 >= 0 && t1 <= maxDistance) best = t1;
    if (t2 >= 0 && t2 <= maxDistance && (best === null || t2 < best)) best = t2;

    return best;
}

export function findNearest(source, candidates) {
    let nearest = candidates[0];
    let minDist = Infinity;

    for (const target of candidates) {
        const dx = target.pos.x - source.pos.x;
        const dy = target.pos.y - source.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
            minDist = dist;
            nearest = target;
        }
    }

    return nearest;
}

export function triggerLaetitiaBlast(game, victim, now) {
    game.explosionEffects.push({ x: victim.pos.x, y: victim.pos.y, radius: W.laetitia.BLAST_RADIUS, expiresAt: now + 350 });
    for (const ball of game.balls) {
        if (!ball.isAlive() || ball.id === victim.id) continue;
        if (!game.areEnemies(victim, ball)) continue;
        if (ball.isUntargetable(now)) continue;
        const dist = Math.hypot(ball.pos.x - victim.pos.x, ball.pos.y - victim.pos.y);
        if (dist > W.laetitia.BLAST_RADIUS + ball.radius) continue;
        if (!ball.isUberActive(now)) {
            const dmgRatio = W.laetitia.BLAST_DAMAGE_MIN_RATIO + Math.random() * (W.laetitia.BLAST_DAMAGE_MAX_RATIO - W.laetitia.BLAST_DAMAGE_MIN_RATIO);
            ball.takeDamage(ball.maxHP * dmgRatio, 'generic', 'laetitia_blast');
            ball.applyLaetitiaGiftMark(now, W.laetitia.MARK_DURATION_MS);
        }
    }
}
