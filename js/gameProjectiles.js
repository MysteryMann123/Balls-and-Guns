import * as W from './weapons/index.js';
import { Projectile } from './core/projectile.js';
import { Vector } from './core/vector.js';

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

export function updateProjectiles(game, now) {
    for (let i = game.projectiles.length - 1; i >= 0; i--) {
        const projectile = game.projectiles[i];

        if (projectile.type === 'shotgunray' || projectile.type === 'hornetshotgunray' || projectile.type === 'machinaray' || projectile.type === 'pinksray') {
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

        if (projectile.type === 'soundofstar') {
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
            game.triggerExplosion(projectile.pos.x, projectile.pos.y, projectile.splashRadius || W.grenadeLauncher.SPLASH_RADIUS, projectile.splashMaxDamage || W.grenadeLauncher.SPLASH_MAX_DAMAGE, projectile.ownerId, now);
            game.projectiles.splice(i, 1);
            continue;
        }

        // Loch-n-Load: no bounce, destroyed on wall contact
        if (projectile.type === 'lochnload') {
            const r = projectile.size;
            if (projectile.pos.x - r < 0 || projectile.pos.x + r > game.canvas.width ||
                projectile.pos.y - r < 0 || projectile.pos.y + r > game.canvas.height) {
                game.projectiles.splice(i, 1);
                continue;
            }
        }

        // Faint Aroma: AOE trail DOT
        if (projectile.type === 'faintaroma') {
            if (!projectile.trailPositions) projectile.trailPositions = [];
            projectile.trailPositions.push({ x: projectile.pos.x, y: projectile.pos.y, t: now });
            if (projectile.trailPositions.length > 30) projectile.trailPositions.shift();
            if (!projectile.aoeHitCooldowns) projectile.aoeHitCooldowns = {};
            const aoeOwner = game.balls.find(b => b.id === projectile.ownerId);
            for (const ball of game.balls) {
                if (!ball.isAlive() || ball.isUntargetable(now)) continue;
                if (aoeOwner && !game.areEnemies(aoeOwner, ball)) continue;
                if (Math.hypot(ball.pos.x - projectile.pos.x, ball.pos.y - projectile.pos.y) > W.faintAroma.AOE_RADIUS + ball.radius) continue;
                if ((projectile.aoeHitCooldowns[ball.id] || 0) + W.faintAroma.AOE_HIT_COOLDOWN_MS > now) continue;
                if (ball.isUberActive(now)) continue;
                projectile.aoeHitCooldowns[ball.id] = now;
                ball.applyAfterburn(now, W.faintAroma.DOT_DURATION_MS, W.faintAroma.DOT_DAMAGE_MIN, W.faintAroma.DOT_DAMAGE_MAX, W.faintAroma.DOT_INTERVAL_MS);
                ball.applyFaintAromaDebuff(now, W.faintAroma.DOT_DURATION_MS, W.faintAroma.HEAL_REDUCTION);
            }
        }

        // Hairspray: slow cloud that stops at max range and deals zone-based tick damage
        if (projectile.type === 'hairspray') {
            if (projectile.originX === undefined) {
                projectile.originX = projectile.pos.x;
                projectile.originY = projectile.pos.y;
            }
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
                if (now >= projectile.lingerUntil) {
                    game.projectiles.splice(i, 1);
                    continue;
                }
            }
            if (!projectile.cloudTickCounts) projectile.cloudTickCounts = {};
            if (!projectile.cloudLastTickAt) projectile.cloudLastTickAt = {};
            const cloudOwner = game.balls.find(b => b.id === projectile.ownerId);
            for (const ball of game.balls) {
                if (!ball.isAlive() || ball.isUntargetable(now)) continue;
                if (cloudOwner && !game.areEnemies(cloudOwner, ball)) continue;
                if (ball.isUberActive(now)) continue;
                if (Math.hypot(ball.pos.x - projectile.pos.x, ball.pos.y - projectile.pos.y) > W.hairspray.CLOUD_RADIUS + ball.radius) continue;
                const distToBall = Math.hypot(ball.pos.x - projectile.originX, ball.pos.y - projectile.originY);
                let maxTicks;
                if (distToBall < W.hairspray.NEAR_ZONE_END) {
                    maxTicks = W.hairspray.NEAR_MAX_TICKS;
                } else if (distToBall < W.hairspray.MID_ZONE_END) {
                    maxTicks = W.hairspray.MID_MAX_TICKS;
                } else {
                    maxTicks = W.hairspray.FAR_MAX_TICKS;
                }
                const tickCount = projectile.cloudTickCounts[ball.id] || 0;
                if (tickCount >= maxTicks) continue;
                const lastTick = projectile.cloudLastTickAt[ball.id] || 0;
                if (now - lastTick < W.hairspray.TICK_INTERVAL_MS) continue;
                projectile.cloudLastTickAt[ball.id] = now;
                projectile.cloudTickCounts[ball.id] = tickCount + 1;
                const dmg = Math.round(
                    (W.hairspray.TICK_DAMAGE_MIN + Math.random() * (W.hairspray.TICK_DAMAGE_MAX - W.hairspray.TICK_DAMAGE_MIN))
                    * (cloudOwner ? cloudOwner.getDamageMultiplier(now) : 1)
                );
                ball.takeDamage(dmg, 'chemical');
            }
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
                        projectile.splashRadius || W.pipLauncher.SPLASH_RADIUS,
                        projectile.damage,
                        projectile.ownerId,
                        now
                    );
                } else {
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || W.rocketLauncher.SPLASH_RADIUS,
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
                    const missDamage = Math.floor(shooter.maxHP * W.swordSharpened.PIERCE_DAMAGE_HP_RATIO);
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
            if (projectile.type !== 'crusaderscrossbow' && projectile.type !== 'egomagicbullet' && projectile.type !== 'egolovehate' && shooter && !game.areEnemies(shooter, ball)) {
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

                if (projectile.type === 'machina' || projectile.type === 'egopinks') {
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
                        W.egoMagicBullet.AFTERBURN_DURATION_MS,
                        W.egoMagicBullet.AFTERBURN_DAMAGE_MIN,
                        W.egoMagicBullet.AFTERBURN_DAMAGE_MAX,
                        W.egoMagicBullet.AFTERBURN_INTERVAL_MS
                    );
                    projectile.piercedBallIds.add(ball.id);
                    continue;
                }

                if (projectile.type === 'egolovehate') {
                    if (!projectile.piercedBallIds) projectile.piercedBallIds = new Set();
                    if (projectile.piercedBallIds.has(ball.id)) continue;

                    const isAlly = shooter && !game.areEnemies(shooter, ball);
                    const dt = projectile.loveHateDamageType;

                    if (isAlly) {
                        if (ball.hp < ball.maxHP) {
                            let healAmount = 0;
                            if (dt === 'pale') {
                                const ratio = (projectile.maxHpRatioMin || 0) + Math.random() * Math.max(0, (projectile.maxHpRatioMax || 0) - (projectile.maxHpRatioMin || 0));
                                healAmount = ball.maxHP * ratio * 0.5;
                            } else {
                                healAmount = projectile.damage * 0.5;
                            }
                            if (healAmount > 0) ball.heal(healAmount);
                        }
                    } else if (!ball.isUberActive(now)) {
                        if (dt === 'pale') {
                            const ratio = (projectile.maxHpRatioMin || 0) + Math.random() * Math.max(0, (projectile.maxHpRatioMax || 0) - (projectile.maxHpRatioMin || 0));
                            ball.takeDamage(ball.maxHP * ratio, 'spiritual', 'egolovehate');
                        } else {
                            ball.takeDamage(projectile.damage, 'generic', 'egolovehate');
                            if ((dt === 'black' || dt === 'white') && projectile.burnMin != null) {
                                ball.applyAfterburn(now, projectile.burnDuration, projectile.burnMin, projectile.burnMax, projectile.burnInterval);
                            }
                        }
                    }

                    projectile.piercedBallIds.add(ball.id);
                    continue;
                }

                if (projectile.type === 'huntsman') {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage, 'piercing');
                    }

                    projectile.stuckToBallId = ball.id;
                    projectile.stickExpiresAt = now + W.huntsman.STICK_DURATION_MS;
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
                        if (projectile.sharpenStacks < W.swordSharpened.SHARPEN_MAX_STACKS) {
                            projectile.sharpenStacks++;
                            projectile.sharpenExpiresAt = now + W.swordSharpened.SHARPEN_DURATION_MS;
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
                    projectile.stickExpiresAt = now + W.swordSharpened.PIERCE_STICK_DURATION_MS;
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
                        shooter.heal(dealtActual * W.paradiseLost.LIFESTEAL_RATIO);

                        for (const ally of game.balls) {
                            if (!ally.isAlive()) continue;
                            if (ally.id === shooter.id) continue;
                            if (game.areEnemies(shooter, ally)) continue;

                            const dx = ally.pos.x - projectile.pos.x;
                            const dy = ally.pos.y - projectile.pos.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance > W.paradiseLost.ALLY_HEAL_RADIUS) continue;

                            ally.heal(dealtActual * W.paradiseLost.ALLY_HEAL_RATIO);
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
                            projectile.afterburnDuration ?? W.hornet.RIFLE_AFTERBURN_DURATION_MS,
                            projectile.afterburnMin ?? W.hornet.RIFLE_AFTERBURN_DAMAGE_MIN,
                            projectile.afterburnMax ?? W.hornet.RIFLE_AFTERBURN_DAMAGE_MAX,
                            projectile.afterburnInterval ?? W.hornet.RIFLE_AFTERBURN_INTERVAL_MS
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
                            projectile.afterburnDuration ?? W.hornet.RIFLE_AFTERBURN_DURATION_MS,
                            projectile.afterburnMin ?? W.hornet.RIFLE_AFTERBURN_DAMAGE_MIN,
                            projectile.afterburnMax ?? W.hornet.RIFLE_AFTERBURN_DAMAGE_MAX,
                            projectile.afterburnInterval ?? W.hornet.RIFLE_AFTERBURN_INTERVAL_MS
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
                        directDamage *= W.directHit.VS_FASTER_MULTIPLIER;
                    }

                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(directDamage, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || W.rocketLauncher.SPLASH_RADIUS,
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
                        projectile.splashRadius || W.pipLauncher.SPLASH_RADIUS,
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
                        projectile.splashRadius || W.rocketLauncher.SPLASH_RADIUS,
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
                        directDamage *= W.nearMissed.VS_SLOWER_MULTIPLIER;
                    }

                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(directDamage, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || W.rocketLauncher.SPLASH_RADIUS,
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
                        projectile.splashRadius || W.rocketLauncher.SPLASH_RADIUS,
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
                            W.flamethrower.AFTERBURN_DURATION_MS,
                            W.flamethrower.AFTERBURN_DAMAGE_MIN,
                            W.flamethrower.AFTERBURN_DAMAGE_MAX,
                            W.flamethrower.AFTERBURN_INTERVAL_MS
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
                        projectile.splashRadius || W.grenadeLauncher.SPLASH_RADIUS,
                        projectile.splashMaxDamage || W.grenadeLauncher.SPLASH_MAX_DAMAGE,
                        projectile.ownerId,
                        now,
                        ball.id
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'lochnload') {
                    const isFast = ball.currentSpeed > ball.maxSpeed * W.lochNLoad.FAST_SPEED_RATIO;
                    const bonus  = isFast ? (1 + W.lochNLoad.FAST_MOVE_BONUS) : 1;
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(projectile.damage * bonus, 'explosive');
                    }
                    game.triggerExplosion(
                        projectile.pos.x,
                        projectile.pos.y,
                        projectile.splashRadius || W.lochNLoad.SPLASH_RADIUS,
                        (projectile.splashMaxDamage || W.lochNLoad.SPLASH_MAX_DAMAGE) * bonus,
                        projectile.ownerId,
                        now,
                        ball.id
                    );
                    game.projectiles.splice(i, 1);
                    collided = true;
                    break;
                }

                if (projectile.type === 'faintaroma') {
                    if (!projectile.piercedBallIds) projectile.piercedBallIds = new Set();
                    if (projectile.piercedBallIds.has(ball.id)) continue;
                    projectile.piercedBallIds.add(ball.id);
                    if (!ball.isUberActive(now)) {
                        const dmg = Math.round((W.faintAroma.DAMAGE_MIN + Math.floor(Math.random() * (W.faintAroma.DAMAGE_MAX - W.faintAroma.DAMAGE_MIN + 1))) * (shooter ? shooter.getDamageMultiplier(now) : 1));
                        ball.takeDamage(dmg, 'piercing');
                    }
                    if (projectile.piercedBallIds.size >= W.faintAroma.PIERCE_COUNT) {
                        game.projectiles.splice(i, 1);
                        collided = true;
                        break;
                    }
                    continue;
                }

                if (projectile.type === 'adoration') {
                    if (!projectile.piercedBallIds) projectile.piercedBallIds = new Set();
                    if (projectile.piercedBallIds.has(ball.id)) continue;
                    projectile.piercedBallIds.add(ball.id);
                    if (!ball.isUberActive(now)) {
                        const baseDmg = W.adoration.DAMAGE_MIN + Math.floor(Math.random() * (W.adoration.DAMAGE_MAX - W.adoration.DAMAGE_MIN + 1));
                        const slowBonus = 1 + (1 - ball.getEffectiveSlowMultiplier(now));
                        const dmg = Math.round(baseDmg * slowBonus * (shooter ? shooter.getDamageMultiplier(now) : 1));
                        ball.takeDamage(dmg, 'piercing');
                        ball.applyAdorationSlow(now, W.adoration.SLOW_DURATION_MS, W.adoration.SLOW_MULTIPLIER);
                    }
                    if (projectile.piercedBallIds.size >= W.adoration.PIERCE_COUNT) {
                        game.projectiles.splice(i, 1);
                        collided = true;
                        break;
                    }
                    continue;
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
                        ball.applyShootLock(now, W.solemnVow.FUNERAL_SHOOT_LOCK_MS);
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

                if (projectile.type === 'hairspray') continue;

                const bypassUber = projectile.sourceWeaponType === 'paradiselost';
                if (bypassUber || !ball.isUberActive(now)) {
                    ball.takeDamage(projectile.damage, 'generic', projectile.sourceWeaponType);

                    if (projectile.afterburnMin != null) {
                        ball.applyAfterburn(
                            now,
                            projectile.afterburnDuration ?? 2500,
                            projectile.afterburnMin,
                            projectile.afterburnMax ?? projectile.afterburnMin,
                            projectile.afterburnInterval ?? 500
                        );
                    }

                    if (projectile.sourceWeaponType === 'egoloneliness') {
                        ball.applyLonelinessSlow(now, W.egoLoneliness.SLOW_DURATION_MS, W.egoLoneliness.SLOW_MULTIPLIER);
                    }
                }

                if (projectile.type === 'blutsauger') {
                    const healedShooter = game.balls.find(candidate => candidate.id === projectile.ownerId && candidate.isAlive());
                    if (healedShooter) {
                        const healAmount = Math.floor(Math.random() * (W.blutsauger.HEAL_MAX - W.blutsauger.HEAL_MIN + 1)) + W.blutsauger.HEAL_MIN;
                        healedShooter.heal(healAmount);
                    }
                }

                if (projectile.type === 'egosoda') {
                    const sodaShooter = game.balls.find(b => b.id === projectile.ownerId && b.isAlive());
                    if (projectile.sodaType === 'red') {
                        if (sodaShooter) {
                            const healAmt = Math.floor(Math.random() * (W.egoSoda.RED_HEAL_MAX - W.egoSoda.RED_HEAL_MIN + 1)) + W.egoSoda.RED_HEAL_MIN;
                            sodaShooter.heal(healAmt);
                        }
                    } else if (projectile.sodaType === 'blue') {
                        if (sodaShooter) {
                            const tickHeal = Math.floor(Math.random() * (W.egoSoda.BLUE_HEAL_MAX - W.egoSoda.BLUE_HEAL_MIN + 1)) + W.egoSoda.BLUE_HEAL_MIN;
                            sodaShooter.applySodaBlueHoT(now, tickHeal, W.egoSoda.BLUE_HEAL_DURATION_MS, W.egoSoda.BLUE_HEAL_INTERVAL_MS);
                        }
                    } else if (projectile.sodaType === 'purple') {
                        if (sodaShooter) {
                            sodaShooter.hp = Math.max(1, sodaShooter.hp - sodaShooter.maxHP * W.egoSoda.PURPLE_SELF_DAMAGE_PCT);
                        }
                        if (!ball.isUberActive(now)) {
                            const extraFlat = Math.floor(Math.random() * (W.egoSoda.PURPLE_DAMAGE_MAX - W.egoSoda.PURPLE_DAMAGE_MIN + 1)) + W.egoSoda.PURPLE_DAMAGE_MIN;
                            const hpPct = W.egoSoda.PURPLE_MAX_HP_PCT_MIN + Math.random() * (W.egoSoda.PURPLE_MAX_HP_PCT_MAX - W.egoSoda.PURPLE_MAX_HP_PCT_MIN);
                            ball.takeDamage(Math.floor(extraFlat + ball.maxHP * hpPct), 'generic');
                        }
                    }
                }

                if (projectile.type === 'laetitia') {
                    if (!ball.isUberActive(now)) {
                        ball.applyLaetitiaGiftMark(now, W.laetitia.MARK_DURATION_MS);
                    }
                }

                if (projectile.sourceWeaponType === 'egoloneliness' && Math.random() < W.egoLoneliness.AMMO_REFUND_CHANCE) {
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
    if (ball.weapon.ammo === Infinity || ball.weapon.ammo < W.flamethrower.AIRBLAST_AMMO_COST) return false;

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

    ball.weapon.ammo -= W.flamethrower.AIRBLAST_AMMO_COST;
    if (ball.weapon.ammo <= 0) {
        ball.weapon.ammo = 0;
        ball.weapon.startReload(now);
    }
    ball.nextAirblastAt = now + W.flamethrower.AIRBLAST_COOLDOWN_MS;
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
            const healRoll = Math.floor(Math.random() * (W.pipLauncher.ALLY_HEAL_MAX - W.pipLauncher.ALLY_HEAL_MIN + 1)) + W.pipLauncher.ALLY_HEAL_MIN;
            const scaledHeal = healRoll * (0.35 + falloff * 0.65);
            ball.heal(scaledHeal);
        }
    }
}

export function triggerExplosiveFlask(game, x, y, ownerId, now, fromPickup = false) {
    game.explosionEffects.push({ x, y, radius: W.explosiveFlask.SPLASH_RADIUS, expiresAt: now + 300 });

    const owner = game.balls.find(candidate => candidate.id === ownerId);
    if (!owner) return;

    for (const ball of game.balls) {
        if (!ball.isAlive()) continue;
        if (!game.areEnemies(owner, ball)) continue;
        if (ball.isUntargetable(now)) continue;

        const dx = ball.pos.x - x;
        const dy = ball.pos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > W.explosiveFlask.SPLASH_RADIUS + ball.radius) continue;

        if (!ball.isUberActive(now)) {
            ball.applyExplosiveFlaskDebuff(
                now,
                W.explosiveFlask.EFFECT_DURATION_MS,
                W.explosiveFlask.SLOW_MULTIPLIER,
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
