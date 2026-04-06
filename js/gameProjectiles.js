import {
    BLUTSAUGER_HEAL_MAX,
    BLUTSAUGER_HEAL_MIN,
    DIRECT_HIT_VS_FASTER_MULTIPLIER,
    EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MAX,
    EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MIN,
    EGO_MAGIC_BULLET_AFTERBURN_DURATION_MS,
    EGO_MAGIC_BULLET_AFTERBURN_INTERVAL_MS,
    EGO_LONELINESS_AMMO_REFUND_CHANCE,
    EGO_LONELINESS_SLOW_DURATION_MS,
    EGO_LONELINESS_SLOW_MULTIPLIER,
    EXPLOSIVE_FLASK_EFFECT_DURATION_MS,
    NEAR_MISSED_VS_SLOWER_MULTIPLIER,
    EXPLOSIVE_FLASK_SLOW_MULTIPLIER,
    EXPLOSIVE_FLASK_SPLASH_RADIUS,
    FLAMETHROWER_AFTERBURN_DAMAGE_MAX,
    FLAMETHROWER_AFTERBURN_DAMAGE_MIN,
    FLAMETHROWER_AFTERBURN_DURATION_MS,
    FLAMETHROWER_AFTERBURN_INTERVAL_MS,
    GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE,
    GRENADE_LAUNCHER_SPLASH_RADIUS,
    PIP_LAUNCHER_ALLY_HEAL_MAX,
    PIP_LAUNCHER_ALLY_HEAL_MIN,
    PIP_LAUNCHER_SPLASH_RADIUS,
    PARADISE_LOST_ALLY_HEAL_RADIUS,
    PARADISE_LOST_ALLY_HEAL_RATIO,
    PARADISE_LOST_LIFESTEAL_RATIO,
    PYRO_AIRBLAST_AMMO_COST,
    PYRO_AIRBLAST_COOLDOWN_MS,
    ROCKET_LAUNCHER_SPLASH_RADIUS,
    HUNTSMAN_STICK_DURATION_MS,
    HORNET_BEE_DAMAGE_MAX,
    HORNET_BEE_DAMAGE_MIN,
    HORNET_BEE_HOMING_RANGE,
    HORNET_BEE_HOMING_STRENGTH,
    HORNET_BEE_MAX_ACTIVE,
    HORNET_BEE_SIZE,
    HORNET_BEE_SPEED,
    HORNET_RIFLE_AFTERBURN_DAMAGE_MAX,
    HORNET_RIFLE_AFTERBURN_DAMAGE_MIN,
    HORNET_RIFLE_AFTERBURN_DURATION_MS,
    HORNET_RIFLE_AFTERBURN_INTERVAL_MS,
    SWORD_SHARPENED_PIERCE_DAMAGE_HP_RATIO,
    SWORD_SHARPENED_PIERCE_STICK_DURATION_MS,
    SWORD_SHARPENED_SHARPEN_DAMAGE_BONUS,
    SWORD_SHARPENED_SHARPEN_SPEED_BONUS,
    SWORD_SHARPENED_SHARPEN_RELOAD_BONUS,
    SWORD_SHARPENED_SHARPEN_MAX_STACKS,
    SWORD_SHARPENED_SHARPEN_DURATION_MS,
    SWORD_SHARPENED_BLESSING_SHIELD_DURATION_MS,
    SWORD_SHARPENED_BLESSING_SHIELD_DAMAGE_BLOCK,
    SWORD_SHARPENED_RESISTANCE_IGNORE,
    SOLEMN_VOW_FUNERAL_SHOOT_LOCK_MS
} from './constants.js';
import { Projectile } from './projectile.js';
import { Vector } from './vector.js';

function trySpawnHornetBee(game, victim, attacker, now) {
    if (!victim || !attacker) return;
    if (victim.weapon.type !== 'hornet') return;
    if (!attacker.isAlive()) return;
    if (!game.areEnemies(victim, attacker)) return;

    const activeBeeCount = game.projectiles.filter(projectile => projectile.type === 'hornetbee' && projectile.ownerId === victim.id).length;
    if (activeBeeCount >= HORNET_BEE_MAX_ACTIVE) return;

    const damage = Math.floor(Math.random() * (HORNET_BEE_DAMAGE_MAX - HORNET_BEE_DAMAGE_MIN + 1)) + HORNET_BEE_DAMAGE_MIN;

    game.projectiles.push(
        new Projectile({
            x: victim.pos.x,
            y: victim.pos.y,
            targetX: attacker.pos.x,
            targetY: attacker.pos.y,
            speed: HORNET_BEE_SPEED,
            damage,
            color: '#ffd84a',
            size: HORNET_BEE_SIZE,
            ownerId: victim.id,
            type: 'hornetbee',
            sourceWeaponType: 'hornet',
            hornetTargetId: attacker.id,
            hornetHomingStrength: HORNET_BEE_HOMING_STRENGTH,
            hornetHomingRange: HORNET_BEE_HOMING_RANGE,
            afterburnMin: HORNET_RIFLE_AFTERBURN_DAMAGE_MIN,
            afterburnMax: HORNET_RIFLE_AFTERBURN_DAMAGE_MAX,
            afterburnDuration: HORNET_RIFLE_AFTERBURN_DURATION_MS,
            afterburnInterval: HORNET_RIFLE_AFTERBURN_INTERVAL_MS,
            expiresAt: now + 3500
        })
    );
}

export function updateProjectiles(game, now) {
    for (let i = game.projectiles.length - 1; i >= 0; i--) {
        const projectile = game.projectiles[i];

        if (projectile.type === 'shotgunray' || projectile.type === 'hornetshotgunray' || projectile.type === 'machinaray') {
            if (now >= (projectile.expiresAt || 0)) {
                game.projectiles.splice(i, 1);
            }
            continue;
        }

        if (projectile.type === 'huntsman' && projectile.stuckToBallId) {
            const stuckBall = game.balls.find(candidate => candidate.id === projectile.stuckToBallId && candidate.isAlive());
            if (!stuckBall || now >= (projectile.stickExpiresAt || 0)) {
                game.projectiles.splice(i, 1);
                continue;
            }

            projectile.pos.x = stuckBall.pos.x + (projectile.stickOffsetX || 0);
            projectile.pos.y = stuckBall.pos.y + (projectile.stickOffsetY || 0);
            continue;
        }

        if (projectile.type === 'swordsharpened' && projectile.stuckToBallId) {
            const stuckBall = game.balls.find(candidate => candidate.id === projectile.stuckToBallId && candidate.isAlive());
            if (!stuckBall || now >= (projectile.stickExpiresAt || 0)) {
                game.projectiles.splice(i, 1);
                continue;
            }

            projectile.pos.x = stuckBall.pos.x + (projectile.stickOffsetX || 0);
            projectile.pos.y = stuckBall.pos.y + (projectile.stickOffsetY || 0);
            
            // Keep applying sharpening buff to thrower while sword is stuck
            const shooter = game.balls.find(b => b.id === projectile.ownerId);
            if (shooter && projectile.sharpenStacks > 0 && now < (projectile.sharpenExpiresAt || 0)) {
                shooter.swordSharpenStacks = projectile.sharpenStacks;
                shooter.swordSharpenExpiresAt = projectile.sharpenExpiresAt;
                if (shooter.weapon && shooter.weapon.type === 'swordsharpened') {
                    shooter.weapon.swordSharpenStacks = projectile.sharpenStacks;
                    shooter.weapon.swordSharpenExpiresAt = projectile.sharpenExpiresAt;
                }
            }
            continue;
        }

        projectile.update();

        if (projectile.type === 'magicianhat') {
            game.applyMagicianHatHoming(projectile, now);
        }

        if (projectile.type === 'egomagicbullet') {
            game.applyEgoMagicBulletHoming(projectile, now);
        }

        if (projectile.type === 'paradiselost') {
            game.applyParadiseLostHoming(projectile, now);
        }

        if (projectile.type === 'hornetbee') {
            const owner = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
            if (!owner) {
                game.projectiles.splice(i, 1);
                continue;
            }

            let target = game.balls.find(candidate => candidate.id === projectile.hornetTargetId && candidate.isAlive());
            if (!target || !game.areEnemies(owner, target) || target.isUntargetable(now)) {
                target = null;
                let bestDistance = projectile.hornetHomingRange || HORNET_BEE_HOMING_RANGE;
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
                    const blend = Math.max(0, Math.min(1, projectile.hornetHomingStrength || HORNET_BEE_HOMING_STRENGTH));
                    const newDir = currentDir.multiply(1 - blend).add(steering.multiply(blend));
                    projectile.vel = newDir.normalize().multiply(HORNET_BEE_SPEED);
                    projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
                }
            } else if (projectile.vel.magnitude() < 0.001) {
                projectile.vel = new Vector(Math.cos(owner.aimAngle), Math.sin(owner.aimAngle)).multiply(HORNET_BEE_SPEED);
            }
        }

        if (projectile.type === 'grenadelauncher') {
            const bounceDamping = 0.78;

            if (projectile.pos.x - projectile.size < 0) {
                projectile.pos.x = projectile.size;
                projectile.vel.x = Math.abs(projectile.vel.x) * bounceDamping;
            }
            if (projectile.pos.x + projectile.size > game.canvas.width) {
                projectile.pos.x = game.canvas.width - projectile.size;
                projectile.vel.x = -Math.abs(projectile.vel.x) * bounceDamping;
            }
            if (projectile.pos.y - projectile.size < 0) {
                projectile.pos.y = projectile.size;
                projectile.vel.y = Math.abs(projectile.vel.y) * bounceDamping;
            }
            if (projectile.pos.y + projectile.size > game.canvas.height) {
                projectile.pos.y = game.canvas.height - projectile.size;
                projectile.vel.y = -Math.abs(projectile.vel.y) * bounceDamping;
            }
        }

        if (projectile.type === 'grenadelauncher' && now >= (projectile.explodeAt || 0)) {
            game.triggerExplosion(projectile.pos.x, projectile.pos.y, projectile.splashRadius || GRENADE_LAUNCHER_SPLASH_RADIUS, projectile.splashMaxDamage || GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE, projectile.ownerId, now);
            game.projectiles.splice(i, 1);
            continue;
        }

        if (projectile.expiresAt && now >= projectile.expiresAt) {
            if (projectile.type === 'explosiveflask' || projectile.type === 'pickupexplosiveflask') {
                game.triggerExplosiveFlask(projectile.pos.x, projectile.pos.y, projectile.ownerId, now, projectile.type === 'pickupexplosiveflask');
            }
            game.projectiles.splice(i, 1);
            continue;
        }

        if (projectile.type === 'scrumpybottle') {
            if (projectile.pos.x <= 0 || projectile.pos.x >= game.canvas.width || projectile.pos.y <= 0 || projectile.pos.y >= game.canvas.height) {
                game.spawnScrumpyPuddle(projectile.pos.x, projectile.pos.y, projectile.ownerId, now, projectile.puddleDamageType || 'chemical');
                game.projectiles.splice(i, 1);
                continue;
            }
        }

        if (projectile.type === 'explosiveflask' || projectile.type === 'pickupexplosiveflask') {
            if (projectile.pos.x <= 0 || projectile.pos.x >= game.canvas.width || projectile.pos.y <= 0 || projectile.pos.y >= game.canvas.height) {
                game.triggerExplosiveFlask(projectile.pos.x, projectile.pos.y, projectile.ownerId, now, projectile.type === 'pickupexplosiveflask');
                game.projectiles.splice(i, 1);
                continue;
            }
        }

        if (projectile.type === 'rocketlauncher' || projectile.type === 'piplauncher' || projectile.type === 'beggersbazooka' || projectile.type === 'directhit' || projectile.type === 'rocketjumper') {
            if (projectile.pos.x <= 0 || projectile.pos.x >= game.canvas.width || projectile.pos.y <= 0 || projectile.pos.y >= game.canvas.height) {
                if (projectile.type === 'piplauncher') {
                    game.triggerPipExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || PIP_LAUNCHER_SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now
                    );
                } else {
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || ROCKET_LAUNCHER_SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now,
                        null,
                        projectile.knockbackStrength || 0,
                        projectile.type === 'beggersbazooka'
                    );
                }
                game.projectiles.splice(i, 1);
                continue;
            }
        }

        if (projectile.type !== 'grenadelauncher' && projectile.isOffScreen(game.canvas.width, game.canvas.height)) {
            if (projectile.type === 'swordsharpened' && !projectile.stuckToBallId) {
                const shooter = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
                if (shooter) {
                    const missDamage = Math.floor(shooter.maxHP * SWORD_SHARPENED_PIERCE_DAMAGE_HP_RATIO);
                    shooter.takeDamage(missDamage, 'piercing', 'swordsharpened', true);
                }
            }

            if (projectile.type === 'explosiveflask' || projectile.type === 'pickupexplosiveflask') {
                game.triggerExplosiveFlask(projectile.pos.x, projectile.pos.y, projectile.ownerId, now, projectile.type === 'pickupexplosiveflask');
            }
            game.projectiles.splice(i, 1);
            continue;
        }

        let collided = false;
        for (const ball of game.balls) {
            if (!ball.isAlive()) continue;
            if (projectile.ownerId === ball.id) continue;
            if (projectile.justDeflectedBy === ball.id && now < (projectile.deflectIgnoreUntil || 0)) continue;
            if (ball.isUntargetable(now)) continue;

            const shooter = game.balls.find(candidate => candidate.id === projectile.ownerId);
            if (projectile.type !== 'crusaderscrossbow' && projectile.type !== 'egomagicbullet' && shooter && !game.areEnemies(shooter, ball)) {
                continue;
            }

            const dx = ball.pos.x - projectile.pos.x;
            const dy = ball.pos.y - projectile.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ball.radius + projectile.size) {
                if (shooter && game.areEnemies(shooter, ball) && projectile.type !== 'hornetbee') {
                    trySpawnHornetBee(game, ball, shooter, now);
                }

                if (game.tryPyroAirblast(ball, projectile, now)) {
                    collided = true;
                    break;
                }

                if (projectile.type === 'machina') {
                    if (!projectile.piercedBallIds) {
                        projectile.piercedBallIds = new Set();
                    }
                    if (projectile.piercedBallIds.has(ball.id)) {
                        continue;
                    }

                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'generic');
                    }
                    projectile.piercedBallIds.add(ball.id);
                    continue;
                }

                if (projectile.type === 'egomagicbullet') {
                    if (!projectile.piercedBallIds) {
                        projectile.piercedBallIds = new Set();
                    }
                    if (projectile.piercedBallIds.has(ball.id)) {
                        continue;
                    }

                    ball.takeDamage(projectile.damage, 'magic', 'egomagicbullet');
                    ball.applyAfterburn(
                        now,
                        EGO_MAGIC_BULLET_AFTERBURN_DURATION_MS,
                        EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MIN,
                        EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MAX,
                        EGO_MAGIC_BULLET_AFTERBURN_INTERVAL_MS
                    );
                    projectile.piercedBallIds.add(ball.id);
                    continue;
                }

                if (projectile.type === 'huntsman') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'piercing');
                    }

                    projectile.stuckToBallId = ball.id;
                    projectile.stickExpiresAt = now + HUNTSMAN_STICK_DURATION_MS;
                    projectile.stickOffsetX = projectile.pos.x - ball.pos.x;
                    projectile.stickOffsetY = projectile.pos.y - ball.pos.y;
                    projectile.vel.x = 0;
                    projectile.vel.y = 0;
                    collided = true;
                    break;
                }

                if (projectile.type === 'swordsharpened') {
                    if (!ball.isUberActive(now)) {
                        // Apply base sword damage on hit
                        ball.takeDamage(projectile.damage, 'piercing', 'swordsharpened');
                        
                        // Apply sharpening stacks to sword
                        if (!projectile.sharpenStacks) {
                            projectile.sharpenStacks = 0;
                        }
                        if (projectile.sharpenStacks < SWORD_SHARPENED_SHARPEN_MAX_STACKS) {
                            projectile.sharpenStacks++;
                            projectile.sharpenExpiresAt = now + SWORD_SHARPENED_SHARPEN_DURATION_MS;
                        }
                        
                        // Apply sharpening buff to the sword thrower
                        const shooter = game.balls.find(b => b.id === projectile.ownerId);
                        if (shooter && projectile.sharpenStacks > 0) {
                            shooter.swordSharpenStacks = projectile.sharpenStacks;
                            shooter.swordSharpenExpiresAt = projectile.sharpenExpiresAt;
                            if (shooter.weapon && shooter.weapon.type === 'swordsharpened') {
                                shooter.weapon.swordSharpenStacks = projectile.sharpenStacks;
                                shooter.weapon.swordSharpenExpiresAt = projectile.sharpenExpiresAt;
                            }
                        }
                    }

                    // Always stick to enemy
                    projectile.stuckToBallId = ball.id;
                    projectile.stickExpiresAt = now + SWORD_SHARPENED_PIERCE_STICK_DURATION_MS;
                    projectile.stickOffsetX = projectile.pos.x - ball.pos.x;
                    projectile.stickOffsetY = projectile.pos.y - ball.pos.y;
                    projectile.vel.x = 0;
                    projectile.vel.y = 0;
                    collided = true;
                    break;
                }

                if (projectile.type === 'crusaderscrossbow') {
                    const isAlly = shooter && !game.areEnemies(shooter, ball);

                    if (isAlly) {
                        const healMin = projectile.healMin ?? 75;
                        const healMax = projectile.healMax ?? 100;
                        const healAmount = Math.floor(Math.random() * (healMax - healMin + 1)) + healMin;
                        ball.heal(healAmount);
                    } else if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'piercing');
                    }

                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'paradiselost') {
                    const beforeHp = ball.hp;
                    ball.takeDamage(projectile.damage, 'divine', 'paradiselost');

                    const dealtActual = Math.max(0, beforeHp - ball.hp);
                    if (shooter && shooter.isAlive() && dealtActual > 0) {
                        shooter.heal(dealtActual * PARADISE_LOST_LIFESTEAL_RATIO);

                        for (const ally of game.balls) {
                            if (!ally.isAlive()) continue;
                            if (ally.id === shooter.id) continue;
                            if (game.areEnemies(shooter, ally)) continue;

                            const dx = ally.pos.x - projectile.pos.x;
                            const dy = ally.pos.y - projectile.pos.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance > PARADISE_LOST_ALLY_HEAL_RADIUS) continue;

                            ally.heal(dealtActual * PARADISE_LOST_ALLY_HEAL_RATIO);
                        }
                    }

                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'hornetrifle') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'piercing', 'hornet');
                        ball.applyAfterburn(
                            now,
                            projectile.afterburnDuration ?? HORNET_RIFLE_AFTERBURN_DURATION_MS,
                            projectile.afterburnMin ?? HORNET_RIFLE_AFTERBURN_DAMAGE_MIN,
                            projectile.afterburnMax ?? HORNET_RIFLE_AFTERBURN_DAMAGE_MAX,
                            projectile.afterburnInterval ?? HORNET_RIFLE_AFTERBURN_INTERVAL_MS
                        );
                    }
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'hornetbee') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'piercing', 'hornet');
                        ball.applyAfterburn(
                            now,
                            projectile.afterburnDuration ?? HORNET_RIFLE_AFTERBURN_DURATION_MS,
                            projectile.afterburnMin ?? HORNET_RIFLE_AFTERBURN_DAMAGE_MIN,
                            projectile.afterburnMax ?? HORNET_RIFLE_AFTERBURN_DAMAGE_MAX,
                            projectile.afterburnInterval ?? HORNET_RIFLE_AFTERBURN_INTERVAL_MS
                        );
                    }
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'directhit') {
                    const shooterSpeed = shooter ? shooter.currentSpeed : 0;
                    let directDamage = projectile.damage;
                    if (ball.currentSpeed > shooterSpeed) {
                        directDamage *= DIRECT_HIT_VS_FASTER_MULTIPLIER;
                    }

                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(directDamage, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || ROCKET_LAUNCHER_SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now,
                        ball.id,
                        projectile.knockbackStrength || 0
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'explosiveflask' || projectile.type === 'pickupexplosiveflask') {
                    game.triggerExplosiveFlask(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.ownerId,
                        now,
                        projectile.type === 'pickupexplosiveflask'
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'piplauncher') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'explosive', 'piplauncher');
                    }
                    game.triggerPipExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || PIP_LAUNCHER_SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now,
                        ball.id
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'rocketjumper') {
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || ROCKET_LAUNCHER_SPLASH_RADIUS,
                        0,
                        projectile.ownerId,
                        now,
                        null,
                        projectile.knockbackStrength || 0
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'rocketlauncher') {
                    const isNearMissedVariant = projectile.sourceWeaponType === 'nearmissed';
                    const shooterSpeed = shooter ? shooter.currentSpeed : 0;
                    let directDamage = projectile.damage;
                    if (isNearMissedVariant && ball.currentSpeed < shooterSpeed) {
                        directDamage *= NEAR_MISSED_VS_SLOWER_MULTIPLIER;
                    }

                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(directDamage, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || ROCKET_LAUNCHER_SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now,
                        ball.id
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'beggersbazooka') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || ROCKET_LAUNCHER_SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now,
                        ball.id,
                        projectile.knockbackStrength || 0,
                        true
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'scrumpybottle') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, projectile.damageType || 'impact');
                    }
                    game.spawnScrumpyPuddle(projectile.pos.x, projectile.pos.y, projectile.ownerId, now, projectile.puddleDamageType || 'chemical');
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'flamethrower') {
                    if (!projectile.piercedBallIds) {
                        projectile.piercedBallIds = new Set();
                    }
                    if (projectile.piercedBallIds.has(ball.id)) {
                        continue;
                    }

                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'fire');
                        ball.applyAfterburn(
                            now,
                            FLAMETHROWER_AFTERBURN_DURATION_MS,
                            FLAMETHROWER_AFTERBURN_DAMAGE_MIN,
                            FLAMETHROWER_AFTERBURN_DAMAGE_MAX,
                            FLAMETHROWER_AFTERBURN_INTERVAL_MS
                        );
                    }
                    projectile.piercedBallIds.add(ball.id);

                    const maxPierce = projectile.piercingCount || 0;
                    if (maxPierce > 0 && projectile.piercedBallIds.size >= maxPierce) {
                        game.projectiles.splice(i, 1);
                        collided = true;
                        break;
                    }

                    continue;
                }

                if (projectile.type === 'grenadelauncher') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || GRENADE_LAUNCHER_SPLASH_RADIUS,
                        projectile.splashMaxDamage || GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE,
                        projectile.ownerId,
                        now,
                        ball.id
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'solemnvowblack') {
                    if (!ball.isUberActive(now)) {
                        const ratioMin = projectile.maxHpRatioMin ?? 0;
                        const ratioMax = projectile.maxHpRatioMax ?? ratioMin;
                        const ratioRoll = ratioMin + Math.random() * Math.max(0, ratioMax - ratioMin);
                        const scaledDamage = ball.maxHP * ratioRoll * (projectile.solemnDamageMultiplier ?? 1);
                        ball.takeDamage(scaledDamage, 'spiritual', 'solemnvow');
                    }
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'solemnvowfuneral') {
                    if (!ball.isUberActive(now)) {
                        ball.applyShootLock(now, SOLEMN_VOW_FUNERAL_SHOOT_LOCK_MS);
                    }
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'solemnvowwhite') {
                    if (!ball.isUberActive(now)) {
                        const burnMin = projectile.afterburnMin ?? 0;
                        const burnMax = projectile.afterburnMax ?? burnMin;
                        ball.applyAfterburn(
                            now,
                            projectile.afterburnDuration ?? 2500,
                            burnMin,
                            burnMax,
                            projectile.afterburnInterval ?? 500
                        );
                    }
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                const bypassUber = projectile.sourceWeaponType === 'paradiselost';
                if (bypassUber || !ball.isUberActive(now)) {
                    ball.takeDamage(projectile.damage, 'generic', projectile.sourceWeaponType);

                    if (projectile.sourceWeaponType === 'egoloneliness') {
                        ball.applyLonelinessSlow(now, EGO_LONELINESS_SLOW_DURATION_MS, EGO_LONELINESS_SLOW_MULTIPLIER);
                    }
                }

                if (projectile.type === 'blutsauger') {
                    const healedShooter = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
                    if (healedShooter) {
                        const healAmount = Math.floor(Math.random() * (BLUTSAUGER_HEAL_MAX - BLUTSAUGER_HEAL_MIN + 1)) + BLUTSAUGER_HEAL_MIN;
                        healedShooter.heal(healAmount);
                    }
                }

                if (projectile.sourceWeaponType === 'egoloneliness' && Math.random() < EGO_LONELINESS_AMMO_REFUND_CHANCE) {
                    const refundedShooter = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
                    if (refundedShooter) {
                        refundedShooter.weapon.refundAmmo(1);
                    }
                }

                game.projectiles.splice(i, 1);
                collided = true;
                break;
            }
        }

        if (collided) continue;
    }
}

export function tryPyroAirblast(game, ball, projectile, now) {
    if (ball.weapon.type !== 'flamethrower') return false;
    if (ball.isUntargetable(now)) return false;
    if (now < ball.nextAirblastAt) return false;
    if (ball.weapon.isReloading) return false;
    if (ball.weapon.ammo === Infinity || ball.weapon.ammo < PYRO_AIRBLAST_AMMO_COST) return false;

    const originalShooter = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
    let direction;

    if (originalShooter && originalShooter.id !== ball.id) {
        direction = new Vector(originalShooter.pos.x - ball.pos.x, originalShooter.pos.y - ball.pos.y);
    } else {
        direction = projectile.vel.clone().multiply(-1);
    }

    if (direction.magnitude() < 0.001) {
        direction = new Vector(1, 0);
    }

    const speed = Math.max(0.1, projectile.vel.magnitude());
    const dir = direction.normalize();
    projectile.vel = dir.multiply(speed);
    projectile.rotation = Math.atan2(projectile.vel.y, projectile.vel.x);
    projectile.pos.x = ball.pos.x + dir.x * (ball.radius + projectile.size + 2);
    projectile.pos.y = ball.pos.y + dir.y * (ball.radius + projectile.size + 2);
    projectile.ownerId = ball.id;
    projectile.justDeflectedBy = ball.id;
    projectile.deflectIgnoreUntil = now + 140;
    projectile.piercedBallIds = new Set();

    ball.weapon.ammo -= PYRO_AIRBLAST_AMMO_COST;
    if (ball.weapon.ammo <= 0) {
        ball.weapon.ammo = 0;
        ball.weapon.startReload(now);
    }
    ball.nextAirblastAt = now + PYRO_AIRBLAST_COOLDOWN_MS;
    ball.airblastFlashUntil = now + 180;

    return true;
}

export function triggerExplosion(game, x, y, radius, maxDamage, ownerId, now, ignoredBallId = null, knockbackStrength = 0, includeOwner = false) {
    game.explosionEffects.push({ x, y, radius, expiresAt: now + 300 });

    const owner = game.balls.find(candidate => candidate.id === ownerId);

    for (const ball of game.balls) {
        if (!ball.isAlive()) continue;
        if (ball.id === ownerId && !includeOwner) continue;
        if (ignoredBallId && ball.id === ignoredBallId) continue;
        if (owner && ball.id !== ownerId && !game.areEnemies(owner, ball)) continue;
        if (ball.isUntargetable(now)) continue;

        const dx = ball.pos.x - x;
        const dy = ball.pos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius + ball.radius) continue;

        const falloff = Math.max(0, 1 - (dist / radius));
        const damage = maxDamage * falloff;
        if (damage > 0 && !ball.isUberActive(now)) {
            ball.takeDamage(damage, 'explosive');
            if (owner && game.areEnemies(owner, ball)) {
                trySpawnHornetBee(game, ball, owner, now);
            }
        }

        if (knockbackStrength > 0) {
            const distanceSafe = Math.max(1, dist);
            const direction = new Vector(dx / distanceSafe, dy / distanceSafe);
            const impulse = direction.multiply(knockbackStrength * (0.35 + falloff * 0.65));
            ball.applyImpulse(impulse);
        }
    }
}

export function triggerPipExplosion(game, x, y, radius, maxDamage, ownerId, now, ignoredBallId = null) {
    game.explosionEffects.push({ x, y, radius, expiresAt: now + 330 });

    const owner = game.balls.find(candidate => candidate.id === ownerId);

    for (const ball of game.balls) {
        if (!ball.isAlive()) continue;
        if (ignoredBallId && ball.id === ignoredBallId) continue;
        if (ball.isUntargetable(now)) continue;

        const dx = ball.pos.x - x;
        const dy = ball.pos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius + ball.radius) continue;

        const falloff = Math.max(0, 1 - (dist / radius));

        if (owner && game.areEnemies(owner, ball)) {
            const splashDamage = maxDamage * falloff;
            if (splashDamage > 0 && !ball.isUberActive(now)) {
                ball.takeDamage(splashDamage, 'explosive', 'piplauncher');
                if (owner && game.areEnemies(owner, ball)) {
                    trySpawnHornetBee(game, ball, owner, now);
                }
            }
        } else if (owner && !game.areEnemies(owner, ball)) {
            const healRoll = Math.floor(Math.random() * (PIP_LAUNCHER_ALLY_HEAL_MAX - PIP_LAUNCHER_ALLY_HEAL_MIN + 1)) + PIP_LAUNCHER_ALLY_HEAL_MIN;
            const scaledHeal = healRoll * (0.35 + falloff * 0.65);
            ball.heal(scaledHeal);
        }
    }
}

export function triggerExplosiveFlask(game, x, y, ownerId, now, fromPickup = false) {
    game.explosionEffects.push({ x, y, radius: EXPLOSIVE_FLASK_SPLASH_RADIUS, expiresAt: now + 300 });

    const owner = game.balls.find(candidate => candidate.id === ownerId);
    if (!owner) return;

    for (const ball of game.balls) {
        if (!ball.isAlive()) continue;
        if (!game.areEnemies(owner, ball)) continue;
        if (ball.isUntargetable(now)) continue;

        const dx = ball.pos.x - x;
        const dy = ball.pos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > EXPLOSIVE_FLASK_SPLASH_RADIUS + ball.radius) continue;

        if (!ball.isUberActive(now)) {
            ball.applyExplosiveFlaskDebuff(
                now,
                EXPLOSIVE_FLASK_EFFECT_DURATION_MS,
                EXPLOSIVE_FLASK_SLOW_MULTIPLIER,
                fromPickup
            );
        }
    }
}

export function updateExplosionEffects(game, now) {
    for (let i = game.explosionEffects.length - 1; i >= 0; i--) {
        if (now > game.explosionEffects[i].expiresAt) {
            game.explosionEffects.splice(i, 1);
        }
    }
}

export function updateTeleportSmokeEffects(game, now) {
    for (let i = game.teleportSmokeEffects.length - 1; i >= 0; i--) {
        if (now > game.teleportSmokeEffects[i].expiresAt) {
            game.teleportSmokeEffects.splice(i, 1);
        }
    }
}
