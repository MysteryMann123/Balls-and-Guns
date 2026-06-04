import { scrumpyBottle, bombanomicron } from './utilities/items/index.js';
import * as W from './weapons/index.js';
import { Projectile } from './core/projectile.js';
import { Vector } from './core/vector.js';

export function updateRocketJumperMelee(game, now) {
    for (const attacker of game.balls) {
        if (!attacker.isAlive()) continue;
        if (attacker.weapon.type !== 'rocketjumper') continue;
        if (attacker.rocketJumperPhase !== 'seekEnemy') continue;
        if (now < attacker.nextMeleeAllowedAt) continue;

        for (const target of game.balls) {
            if (!target.isAlive()) continue;
            if (target.id === attacker.id) continue;
            if (!game.areEnemies(attacker, target)) continue;
            if (target.isUntargetable(now)) continue;

            const dx = target.pos.x - attacker.pos.x;
            const dy = target.pos.y - attacker.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > attacker.radius + target.radius + 5) continue;

            const rawDamage = attacker.currentSpeed * W.rocketJumper.MELEE_DAMAGE_PER_SPEED;
            const clampedDamage = Math.max(W.rocketJumper.MELEE_MIN_DAMAGE, Math.min(W.rocketJumper.MELEE_MAX_DAMAGE, rawDamage));
            const meleeDamage = clampedDamage * attacker.getDamageMultiplier(now);

            if (!target.isUberActive(now)) {
                target.takeDamage(meleeDamage, 'impact');
            }

            attacker.nextMeleeAllowedAt = now + W.rocketJumper.MELEE_COOLDOWN_MS;
            attacker.rocketJumperPhase = 'seekWall';
            break;
        }
    }
}

export function updateYellowTargeCharges(game, now) {
    for (const attacker of game.balls) {
        if (!attacker.isAlive()) continue;
        if (attacker.weapon.type !== 'yellowtarge') continue;
        if (!attacker.targeChargeActive) continue;

        const stepDistance = Math.sqrt(
            (attacker.pos.x - attacker.targeLastPos.x) * (attacker.pos.x - attacker.targeLastPos.x) +
            (attacker.pos.y - attacker.targeLastPos.y) * (attacker.pos.y - attacker.targeLastPos.y)
        );
        attacker.targeChargeDistance += stepDistance;
        attacker.targeLastPos = attacker.pos.clone();

        if (now - attacker.targeChargeStartAt > W.yellowTarge.CHARGE_MAX_DURATION_MS) {
            attacker.targeChargeActive = false;
            attacker.targeTargetId = null;
            continue;
        }

        const target = game.balls.find(candidate => candidate.id === attacker.targeTargetId && candidate.isAlive());
        if (!target || !game.areEnemies(attacker, target)) {
            attacker.targeChargeActive = false;
            attacker.targeTargetId = null;
            continue;
        }
        if (target.isUntargetable(now)) {
            attacker.targeChargeActive = false;
            attacker.targeTargetId = null;
            continue;
        }

        const dx = target.pos.x - attacker.pos.x;
        const dy = target.pos.y - attacker.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > attacker.radius + target.radius + 5) continue;

        const rawDamage = W.yellowTarge.CHARGE_DAMAGE_MIN + attacker.targeChargeDistance * W.yellowTarge.DAMAGE_PER_DISTANCE;
        const chargeDamage = Math.max(W.yellowTarge.CHARGE_DAMAGE_MIN, Math.min(W.yellowTarge.CHARGE_DAMAGE_MAX, rawDamage)) * attacker.getDamageMultiplier(now);
        const targetWasAlive = target.isAlive();

        if (!target.isUberActive(now)) {
            target.takeDamage(chargeDamage, 'impact');
        }

        const distanceSafe = Math.max(1, distance);
        const knockbackDir = new Vector(dx / distanceSafe, dy / distanceSafe);
        target.applyImpulse(knockbackDir.multiply(W.yellowTarge.KNOCKBACK));

        if (targetWasAlive && !target.isAlive()) {
            attacker.weapon.isReloading = false;
            attacker.weapon.ammo = attacker.weapon.maxAmmo;
        }

        attacker.targeChargeActive = false;
        attacker.targeTargetId = null;
    }
}

export function getMedigunTarget(game, shooter) {
    const inRange = game.balls.filter(candidate => {
        if (!candidate.isAlive()) return false;
        if (candidate.id === shooter.id) return false;
        if (candidate.isUntargetable(Date.now())) return false;

        const dx = candidate.pos.x - shooter.pos.x;
        const dy = candidate.pos.y - shooter.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= W.medigun.BEAM_RANGE;
    });

    const alliesNeedingHeal = inRange
        .filter(candidate => !game.areEnemies(shooter, candidate) && candidate.hp < candidate.maxHP * W.medigun.OVERHEAL_MULTIPLIER)
        .sort((left, right) => {
            const leftRatio = left.hp / left.maxHP;
            const rightRatio = right.hp / right.maxHP;
            if (leftRatio !== rightRatio) return leftRatio - rightRatio;
            const leftDist = Math.hypot(left.pos.x - shooter.pos.x, left.pos.y - shooter.pos.y);
            const rightDist = Math.hypot(right.pos.x - shooter.pos.x, right.pos.y - shooter.pos.y);
            return leftDist - rightDist;
        });

    if (alliesNeedingHeal.length > 0) {
        return { target: alliesNeedingHeal[0], mode: 'ally' };
    }

    const enemies = inRange
        .filter(candidate => game.areEnemies(shooter, candidate))
        .sort((left, right) => {
            const leftDist = Math.hypot(left.pos.x - shooter.pos.x, left.pos.y - shooter.pos.y);
            const rightDist = Math.hypot(right.pos.x - shooter.pos.x, right.pos.y - shooter.pos.y);
            return leftDist - rightDist;
        });

    if (enemies.length > 0) {
        return { target: enemies[0], mode: 'enemy' };
    }

    return null;
}

export function updateMediguns(game, now, deltaMs) {
    const deltaSeconds = deltaMs / 1000;

    for (const shooter of game.balls) {
        if (!shooter.isAlive()) continue;
        if (shooter.weapon.type !== 'medigun') continue;

        const state = shooter.medigunState;

        if (now - shooter.lastDamagedAt >= W.medigun.SELF_REGEN_DELAY_MS) {
            const regenCap = Math.min(shooter.maxHP, state.selfRegenAnchorHp + W.medigun.SELF_REGEN_CAP);
            if (shooter.hp < regenCap) {
                shooter.heal(W.medigun.SELF_REGEN_PER_SEC * deltaSeconds);
                if (shooter.hp > regenCap) shooter.hp = regenCap;
            }
        }

        if (state.targetId) {
            const target = game.balls.find(candidate => candidate.id === state.targetId && candidate.isAlive());
            if (!target) {
                state.targetId = null;
                state.mode = null;
                continue;
            }

            const dx = target.pos.x - shooter.pos.x;
            const dy = target.pos.y - shooter.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const outOfRange = distance > W.medigun.BEAM_RANGE;
            const doneHealing = state.mode === 'ally' && target.hp >= target.maxHP * W.medigun.OVERHEAL_MULTIPLIER;
            const doneEnemy = state.mode === 'enemy' && !target.isAlive();
            const hidden = target.isUntargetable(now);

            if (outOfRange || doneHealing || doneEnemy || hidden) {
                state.targetId = null;
                state.mode = null;
                continue;
            }

            if (state.mode === 'ally') {
                const before = target.hp;
                const overhealCap = target.maxHP * W.medigun.OVERHEAL_MULTIPLIER;
                target.hp = Math.min(overhealCap, target.hp + W.medigun.ALLY_HEAL_PER_SEC * deltaSeconds);
                const healed = Math.max(0, target.hp - before);
                state.uberHealAccum += healed;
            } else {
                const before = target.hp;
                if (!target.isUberActive(now)) {
                    target.takeDamage(W.medigun.ENEMY_DAMAGE_PER_SEC * deltaSeconds, 'energy');
                }
                const dealt = Math.max(0, before - target.hp);
                state.uberDamageAccum += dealt;
                shooter.heal(W.medigun.ENEMY_LIFESTEAL_PER_SEC * deltaSeconds);

                if (!target.isAlive()) {
                    state.targetId = null;
                    state.mode = null;
                }
            }

            while (state.uberHealAccum >= W.medigun.UBER_HEAL_THRESHOLD || state.uberDamageAccum >= W.medigun.UBER_DAMAGE_THRESHOLD) {
                if (state.uberHealAccum >= W.medigun.UBER_HEAL_THRESHOLD) {
                    state.uberHealAccum -= W.medigun.UBER_HEAL_THRESHOLD;
                } else {
                    state.uberDamageAccum -= W.medigun.UBER_DAMAGE_THRESHOLD;
                }
                shooter.applyUbercharge(now, W.medigun.UBER_DURATION_MS);
            }

            continue;
        }

        const candidate = getMedigunTarget(game, shooter);
        if (!candidate) continue;

        if (!shooter.weapon.shoot(now)) continue;
        state.targetId = candidate.target.id;
        state.mode = candidate.mode;
        shooter.aimAngle = Math.atan2(candidate.target.pos.y - shooter.pos.y, candidate.target.pos.x - shooter.pos.x);
        shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
    }
}

export function updateDeadRingerDecoys(game, now) {
    for (let i = game.deadRingerDecoys.length - 1; i >= 0; i--) {
        const decoy = game.deadRingerDecoys[i];
        decoy.x += decoy.vx;
        decoy.y += decoy.vy;
        decoy.vx *= 1.02;
        decoy.vy *= 1.02;

        const offScreen = decoy.x < -80 || decoy.x > game.canvas.width + 80 || decoy.y < -80 || decoy.y > game.canvas.height + 80;
        if (offScreen || now >= decoy.expiresAt) {
            game.deadRingerDecoys.splice(i, 1);
        }
    }
}

export function updateShortCircuitFields(game, now) {
    for (let index = game.shortCircuitFields.length - 1; index >= 0; index--) {
        const field = game.shortCircuitFields[index];

        field.pos.add(field.vel);

        if (field.pos.x < -field.radius || field.pos.x > game.canvas.width + field.radius || field.pos.y < -field.radius || field.pos.y > game.canvas.height + field.radius || now > field.expiresAt) {
            game.shortCircuitFields.splice(index, 1);
            continue;
        }

        for (let i = game.projectiles.length - 1; i >= 0; i--) {
            const projectile = game.projectiles[i];
            if (projectile.ownerId === field.ownerId) continue;
            if (projectile.type === 'card') continue;
            if (projectile.type === 'pistol' || projectile.type === 'revolver' || projectile.type === 'egoloneliness' || projectile.type === 'paradiselost' || projectile.type === 'solemnvowblack' || projectile.type === 'solemnvowwhite' || projectile.type === 'solemnvowfuneral' || projectile.type === 'blutsauger' || projectile.type === 'smg' || projectile.type === 'tommygun' || projectile.type === 'egomagicbullet' || projectile.type === 'minigun' || projectile.type === 'medigun' || projectile.type === 'flamethrower') continue;

            const dx = projectile.pos.x - field.pos.x;
            const dy = projectile.pos.y - field.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= field.radius + projectile.size) {
                game.projectiles.splice(i, 1);
            }
        }

        for (const ball of game.balls) {
            if (!ball.isAlive()) continue;
            if (ball.id === field.ownerId) continue;
            if (ball.isUntargetable(now)) continue;

            const owner = game.balls.find(candidate => candidate.id === field.ownerId);
            if (owner && !game.areEnemies(owner, ball)) {
                continue;
            }

            const dx = ball.pos.x - field.pos.x;
            const dy = ball.pos.y - field.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= field.radius + ball.radius) {
                const lastTickAt = field.lastTickByBall[ball.id] || 0;
                if (now - lastTickAt >= W.shortCircuit.DOT_INTERVAL_MS) {
                    if (!ball.isUberActive(now)) {
                        ball.takeDamage(W.shortCircuit.DOT_DAMAGE, 'energy');
                    }
                    field.lastTickByBall[ball.id] = now;
                }
            }
        }
    }
}

export function updateScrumpyPuddles(game, now) {
    for (let index = game.scrumpyPuddles.length - 1; index >= 0; index--) {
        const puddle = game.scrumpyPuddles[index];
        if (now >= puddle.expiresAt) {
            game.scrumpyPuddles.splice(index, 1);
            continue;
        }

        if (now - puddle.lastTickAt < scrumpyBottle.PUDDLE_TICK_INTERVAL_MS) {
            continue;
        }
        puddle.lastTickAt = now;

        const owner = game.balls.find(candidate => candidate.id === puddle.ownerId);
        const lifeRatio = Math.max(0, Math.min(1, (now - puddle.createdAt) / scrumpyBottle.PUDDLE_DURATION_MS));
        const currentRadius = puddle.initialRadius + (puddle.finalRadius - puddle.initialRadius) * lifeRatio;

        for (const ball of game.balls) {
            if (!ball.isAlive()) continue;
            if (ball.id === puddle.ownerId) continue;
            if (owner && !game.areEnemies(owner, ball)) continue;
            if (ball.isUntargetable(now)) continue;

            const dx = ball.pos.x - puddle.x;
            const dy = ball.pos.y - puddle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > currentRadius + ball.radius) continue;

            const tickDamage = Math.floor(Math.random() * (scrumpyBottle.PUDDLE_DAMAGE_MAX - scrumpyBottle.PUDDLE_DAMAGE_MIN + 1)) + scrumpyBottle.PUDDLE_DAMAGE_MIN;
            if (!ball.isUberActive(now)) {
                ball.takeDamage(tickDamage, puddle.damageType || 'chemical');
            }
        }
    }
}

export function spawnScrumpyPuddle(game, x, y, ownerId, now, damageType = 'chemical') {
    game.scrumpyPuddles.push({
        ownerId,
        x,
        y,
        damageType,
        createdAt: now,
        expiresAt: now + scrumpyBottle.PUDDLE_DURATION_MS,
        initialRadius: scrumpyBottle.PUDDLE_INITIAL_RADIUS,
        finalRadius: scrumpyBottle.PUDDLE_FINAL_RADIUS,
        lastTickAt: now
    });
}

export function throwScrumpyBottle(game, shooter, target, now) {
    const damage = Math.floor(Math.random() * (scrumpyBottle.BOTTLE_THROW_DAMAGE_MAX - scrumpyBottle.BOTTLE_THROW_DAMAGE_MIN + 1)) + scrumpyBottle.BOTTLE_THROW_DAMAGE_MIN;
    shooter.applyScrumpyResistance(now, scrumpyBottle.PUDDLE_DURATION_MS);

    game.projectiles.push(
        new Projectile({
            x: shooter.pos.x,
            y: shooter.pos.y,
            targetX: target.pos.x,
            targetY: target.pos.y,
            speed: scrumpyBottle.THROW_SPEED,
            damage,
            color: '#f2bf54',
            size: 8,
            ownerId: shooter.id,
            type: 'scrumpybottle'
        })
    );
}

export function throwExplosiveFlask(game, shooter, target, now, fromPickup = false) {
    game.projectiles.push(
        new Projectile({
            x: shooter.pos.x,
            y: shooter.pos.y,
            targetX: target.pos.x,
            targetY: target.pos.y,
            speed: W.explosiveFlask.SPEED,
            damage: 0,
            color: '#ffc977',
            size: 7,
            ownerId: shooter.id,
            type: fromPickup ? 'pickupexplosiveflask' : 'explosiveflask',
            expiresAt: now + 2200
        })
    );
}

export function getEnemyClusterCenter(game, shooter) {
    const enemies = game.balls.filter(candidate => candidate.isAlive() && candidate.id !== shooter.id && game.areEnemies(shooter, candidate));
    if (enemies.length === 0) return null;

    let sumX = 0;
    let sumY = 0;
    for (const enemy of enemies) {
        sumX += enemy.pos.x;
        sumY += enemy.pos.y;
    }

    return {
        x: sumX / enemies.length,
        y: sumY / enemies.length
    };
}

export function launchBombanomicron(game, shooter, now) {
    const cluster = getEnemyClusterCenter(game, shooter);
    if (!cluster) return;

    const projectileCount = Math.floor(Math.random() * (bombanomicron.PROJECTILE_MAX - bombanomicron.PROJECTILE_MIN + 1)) + bombanomicron.PROJECTILE_MIN;
    const payloadTypes = ['scrumpybottle', 'grenadelauncher', 'rocketlauncher', 'directhit'];

    for (let i = 0; i < projectileCount; i++) {
        const payloadType = payloadTypes[Math.floor(Math.random() * payloadTypes.length)];
        const targetX = Math.max(20, Math.min(game.canvas.width - 20, cluster.x + (Math.random() * 2 - 1) * bombanomicron.TARGET_SPREAD));
        const targetY = Math.max(20, Math.min(game.canvas.height - 20, cluster.y + (Math.random() * 2 - 1) * bombanomicron.TARGET_SPREAD));

        if (payloadType === 'scrumpybottle') {
            const scrumpyDamage = Math.floor(Math.random() * (scrumpyBottle.BOTTLE_THROW_DAMAGE_MAX - scrumpyBottle.BOTTLE_THROW_DAMAGE_MIN + 1)) + scrumpyBottle.BOTTLE_THROW_DAMAGE_MIN;
            game.projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX,
                    targetY,
                    speed: scrumpyBottle.THROW_SPEED,
                    damage: scrumpyDamage,
                    color: '#f2bf54',
                    size: 8,
                    ownerId: shooter.id,
                    type: 'scrumpybottle',
                    damageType: 'explosive',
                    puddleDamageType: 'explosive'
                })
            );
            continue;
        }

        if (payloadType === 'grenadelauncher') {
            game.projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX,
                    targetY,
                    speed: W.grenadeLauncher.SPEED,
                    damage: W.grenadeLauncher.DIRECT_DAMAGE,
                    color: '#85ff5e',
                    size: 9,
                    ownerId: shooter.id,
                    type: 'grenadelauncher',
                    splashRadius: W.grenadeLauncher.SPLASH_RADIUS,
                    splashMaxDamage: W.grenadeLauncher.SPLASH_MAX_DAMAGE,
                    explodeAt: now + W.grenadeLauncher.EXPLODE_DELAY_MS,
                    gravity: 0.1,
                    drag: 0.996,
                    angularVelocity: (Math.random() * 0.3 + 0.15) * (Math.random() < 0.5 ? -1 : 1)
                })
            );
            continue;
        }

        if (payloadType === 'rocketlauncher') {
            game.projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX,
                    targetY,
                    speed: W.rocketLauncher.SPEED,
                    damage: W.rocketLauncher.DIRECT_DAMAGE,
                    color: '#ff954d',
                    size: 9,
                    ownerId: shooter.id,
                    type: 'rocketlauncher',
                    splashRadius: W.rocketLauncher.SPLASH_RADIUS
                })
            );
            continue;
        }

        game.projectiles.push(
            new Projectile({
                x: shooter.pos.x,
                y: shooter.pos.y,
                targetX,
                targetY,
                speed: W.directHit.SPEED,
                damage: W.directHit.DAMAGE,
                color: '#ff8f4f',
                size: 8,
                ownerId: shooter.id,
                type: 'directhit',
                splashRadius: W.directHit.SPLASH_RADIUS
            })
        );
    }
}
