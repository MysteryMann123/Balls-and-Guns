import {
    BEGGERS_BAZOOKA_DEVIATION,
    EXPLOSIVE_FLASK_COOLDOWN_MS,
    FLAMETHROWER_HITSCAN_RANGE,
    FLAMETHROWER_PARTICLE_LIFETIME_MS,
    ROCKET_JUMPER_SELF_BLAST_IMPULSE,
    SHORT_CIRCUIT_DURATION_MS,
    SHORT_CIRCUIT_RADIUS,
    YELLOW_TARGE_CHARGE_IMPULSE,
    YELLOW_TARGE_CHARGE_TRIGGER_RANGE
} from './constants.js';
import { DealerWeapon } from './dealer.js';
import { Projectile } from './projectile.js';
import { Vector } from './vector.js';

export function ballShooting(game, now) {
    for (const shooter of game.balls) {
        if (!shooter.isAlive()) continue;
        if (now < shooter.nextShootAllowedAt) continue;

        const enemies = game.balls.filter(ball => ball.id !== shooter.id && ball.isAlive());
        const teamEnemies = enemies.filter(ball => game.areEnemies(shooter, ball) && !ball.isUntargetable(now));
        const teamAllies = enemies.filter(ball => !game.areEnemies(shooter, ball) && !ball.isUntargetable(now));
        const healableAllies = teamAllies.filter(ball => ball.hp < ball.maxHP);
        if (shooter.weapon.type !== 'crusaderscrossbow' && teamEnemies.length === 0) continue;

        let target = game.findNearest(shooter, teamEnemies);
        if (shooter.weapon.type === 'crusaderscrossbow') {
            const targetPool = healableAllies.length > 0 ? healableAllies : teamEnemies;
            if (targetPool.length === 0) continue;
            target = game.findNearest(shooter, targetPool);
        }
        if (shooter.weapon.type === 'rocketjumper') {
            const wallTarget = game.getNearestWallPoint(shooter);
            if (shooter.rocketJumperPhase !== 'seekEnemy') {
                shooter.rocketJumperPhase = wallTarget.distance < 70 ? 'seekEnemy' : 'seekWall';
            } else if (wallTarget.distance > 140) {
                shooter.rocketJumperPhase = 'seekWall';
            }

            if (shooter.rocketJumperPhase === 'seekWall') {
                target = {
                    pos: {
                        x: wallTarget.x,
                        y: wallTarget.y
                    }
                };
            }

            const moveDirection = new Vector(target.pos.x - shooter.pos.x, target.pos.y - shooter.pos.y);
            if (moveDirection.magnitude() > 0.001) {
                shooter.vel = moveDirection.normalize().multiply(Math.max(shooter.minSpeed, shooter.maxSpeed));
            }
        }

        shooter.aimAngle = Math.atan2(target.pos.y - shooter.pos.y, target.pos.x - shooter.pos.x);

        if (shooter.weapon.type === 'flamethrower') {
            const dx = target.pos.x - shooter.pos.x;
            const dy = target.pos.y - shooter.pos.y;
            const distanceToTarget = Math.sqrt(dx * dx + dy * dy);
            if (distanceToTarget > FLAMETHROWER_HITSCAN_RANGE) {
                continue;
            }
        }

        if (!shooter.weapon.shoot(now)) continue;

        if (shooter.weapon.type === 'yellowtarge') {
            const chargeTarget = game.findNearest(shooter, teamEnemies);
            const dx = chargeTarget.pos.x - shooter.pos.x;
            const dy = chargeTarget.pos.y - shooter.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= YELLOW_TARGE_CHARGE_TRIGGER_RANGE) {
                const direction = new Vector(dx, dy).normalize();
                shooter.applyImpulse(direction.multiply(YELLOW_TARGE_CHARGE_IMPULSE));
                shooter.targeChargeActive = true;
                shooter.targeChargeStartAt = now;
                shooter.targeChargeDistance = 0;
                shooter.targeLastPos = shooter.pos.clone();
                shooter.targeTargetId = chargeTarget.id;
                shooter.aimAngle = Math.atan2(dy, dx);
            }

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'dealer') {
            if (!shooter.dealerWeaponState) {
                shooter.dealerWeaponState = new DealerWeapon();
            }
            shooter.dealerWeaponState.fire(shooter, teamEnemies, game.projectiles);
            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'shortcircuit') {
            const direction = new Vector(Math.cos(shooter.aimAngle), Math.sin(shooter.aimAngle));
            game.shortCircuitFields.push({
                ownerId: shooter.id,
                pos: new Vector(shooter.pos.x, shooter.pos.y),
                vel: direction.multiply(shooter.weapon.speed),
                radius: SHORT_CIRCUIT_RADIUS,
                expiresAt: now + SHORT_CIRCUIT_DURATION_MS,
                lastTickByBall: {}
            });
            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'medigun') {
            continue;
        }

        const baseAngle = shooter.aimAngle;

        for (let p = 0; p < shooter.weapon.pelletsPerShot; p++) {
            let angle = baseAngle;
            if (shooter.weapon.pelletsPerShot > 1) {
                if (shooter.weapon.type === 'shotgun' || shooter.weapon.type === 'widowmaker' || shooter.weapon.type === 'sodapopper' || shooter.weapon.type === 'forceanature') {
                    const spreadOffset = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                    angle += spreadOffset;
                } else {
                    const spreadOffset = (p - (shooter.weapon.pelletsPerShot - 1) / 2) * shooter.weapon.spreadAngle;
                    angle += spreadOffset;
                }
            }

            if (shooter.weapon.type === 'blutsauger') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'beggersbazooka') {
                const randomDeviation = (Math.random() * 2 - 1) * BEGGERS_BAZOOKA_DEVIATION;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'flamethrower') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'grenadelauncher') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'piplauncher') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;

                if (p === 0 && now >= (shooter.nextPipFlaskAt || 0)) {
                    game.throwExplosiveFlask(shooter, target, now, false);
                    shooter.nextPipFlaskAt = now + EXPLOSIVE_FLASK_COOLDOWN_MS;
                }
            }

            if (shooter.weapon.type === 'rocketjumper') {
                const randomDeviation = (Math.random() * 2 - 1) * 0.02;
                angle += randomDeviation;
                angle += Math.PI;
            }

            const targetX = shooter.pos.x + Math.cos(angle) * 900;
            const targetY = shooter.pos.y + Math.sin(angle) * 900;

            let damage = shooter.weapon.damage;
            if (shooter.weapon.type === 'sniper' || shooter.weapon.type === 'minigun' || shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'flamethrower' || shooter.weapon.type === 'magicianhat') {
                damage = Math.floor(Math.random() * (shooter.weapon.damageMax - shooter.weapon.damageMin + 1)) + shooter.weapon.damageMin;
            }

            const damageMultiplier = shooter.getDamageMultiplier(now);
            damage *= damageMultiplier;

            if (shooter.weapon.type === 'shotgun') {
                game.fireShotgunRay(shooter, angle, now, damageMultiplier);
                continue;
            }

            if (shooter.weapon.type === 'widowmaker') {
                game.fireWidowmakerRay(shooter, angle, now, damageMultiplier);
                continue;
            }

            if (shooter.weapon.type === 'sodapopper') {
                game.fireSodaPopperRay(shooter, angle, now, damageMultiplier);
                continue;
            }

            if (shooter.weapon.type === 'forceanature') {
                game.fireForceANatureRay(shooter, angle, now, damageMultiplier, p === 0);
                continue;
            }

            if (shooter.weapon.type === 'machina') {
                game.fireMachinaTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'rocketjumper') {
                const blastDirection = new Vector(Math.cos(angle), Math.sin(angle));
                const selfImpulse = blastDirection.clone().multiply(-ROCKET_JUMPER_SELF_BLAST_IMPULSE);
                shooter.applyImpulse(selfImpulse);
            }

            game.projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX,
                    targetY,
                    speed: shooter.weapon.speed,
                    damage,
                    color: shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'piplauncher' ? shooter.color : shooter.weapon.color,
                    size: shooter.weapon.projectileSize,
                    ownerId: shooter.id,
                    type: shooter.weapon.type === 'pistol' || shooter.weapon.type === 'revolver' || shooter.weapon.type === 'sniper' || shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'smg' || shooter.weapon.type === 'minigun' || shooter.weapon.type === 'blutsauger' || shooter.weapon.type === 'rocketlauncher' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'beggersbazooka' || shooter.weapon.type === 'directhit' || shooter.weapon.type === 'rocketjumper' || shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'flamethrower' || shooter.weapon.type === 'magicianhat'
                        ? shooter.weapon.type
                        : 'bullet',
                    healMin: shooter.weapon.type === 'crusaderscrossbow' ? shooter.weapon.healMin : undefined,
                    healMax: shooter.weapon.type === 'crusaderscrossbow' ? shooter.weapon.healMax : undefined,
                    splashRadius: shooter.weapon.splashRadius,
                    knockbackStrength: shooter.weapon.knockbackStrength,
                    splashMaxDamage: shooter.weapon.splashMaxDamage,
                    expiresAt: shooter.weapon.type === 'flamethrower' ? now + FLAMETHROWER_PARTICLE_LIFETIME_MS : undefined,
                    explodeAt: shooter.weapon.type === 'grenadelauncher' ? now + shooter.weapon.explodeDelayMs : undefined,
                    gravity: shooter.weapon.type === 'grenadelauncher' ? 0.1 : 0,
                    drag: shooter.weapon.type === 'grenadelauncher' ? 0.996 : 1,
                    angularVelocity: shooter.weapon.type === 'grenadelauncher' ? (Math.random() * 0.3 + 0.15) * (Math.random() < 0.5 ? -1 : 1) : 0
                })
            );
        }

        if (shooter.weapon.type === 'magicianhat') {
            game.teleportMagicianHatShooter(shooter, target, now);
        }

        shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
    }
}
