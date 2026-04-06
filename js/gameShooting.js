import {
    BEGGERS_BAZOOKA_DEVIATION,
    EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MAX,
    EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MIN,
    EGO_MAGIC_BULLET_AFTERBURN_DURATION_MS,
    EGO_MAGIC_BULLET_AFTERBURN_INTERVAL_MS,
    EGO_MAGIC_BULLET_CURSE_CYCLE,
    EGO_MAGIC_BULLET_SELF_HIT_MULTIPLIER,
    EGO_MAGIC_BULLET_CURSE_SPAWN_BEHIND_DISTANCE,
    PENITENCE_ALLY_HEAL_FROM_DAMAGE,
    PENITENCE_ALLY_HELP_HP_RATIO,
    PENITENCE_DAMAGE_MAX,
    PENITENCE_DAMAGE_MIN,
    PENITENCE_MELEE_RANGE,
    PENITENCE_SWING_ANIMATION_MS,
    PENITENCE_SWING_ARC_DEGREES,
    PARADISE_LOST_MAX_HP_DAMAGE_MAX_RATIO,
    PARADISE_LOST_MAX_HP_DAMAGE_MIN_RATIO,
    EXPLOSIVE_FLASK_COOLDOWN_MS,
    FLAMETHROWER_HITSCAN_RANGE,
    FLAMETHROWER_PARTICLE_LIFETIME_MS,
    MUSKET_BAYONET_BLEED_DAMAGE_MAX,
    MUSKET_BAYONET_BLEED_DAMAGE_MIN,
    MUSKET_BAYONET_BLEED_DURATION_MS,
    MUSKET_BAYONET_BLEED_INTERVAL_MS,
    MUSKET_BAYONET_COOLDOWN_MS,
    MUSKET_BAYONET_DAMAGE_MAX,
    MUSKET_BAYONET_DAMAGE_MIN,
    MUSKET_BAYONET_HEAL_MULTIPLIER,
    MUSKET_BAYONET_RANGE,
    ROCKET_JUMPER_SELF_BLAST_IMPULSE,
    SHORT_CIRCUIT_DURATION_MS,
    SHORT_CIRCUIT_RADIUS,
    SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MAX_RATIO,
    SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MIN_RATIO,
    SOLEMN_VOW_BLACK_PELLETS_PER_SHOT,
    SOLEMN_VOW_BLACK_SPREAD_ANGLE,
    SOLEMN_VOW_FUNERAL_COOLDOWN_MS,
    SOLEMN_VOW_FUNERAL_PELLETS_REQUIRED,
    SOLEMN_VOW_FUNERAL_PROJECTILE_SIZE,
    SOLEMN_VOW_FUNERAL_PROJECTILE_SPEED,
    SOLEMN_VOW_MUZZLE_FLASH_MS,
    SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MAX,
    SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MIN,
    SOLEMN_VOW_WHITE_AFTERBURN_DURATION_MS,
    SOLEMN_VOW_WHITE_AFTERBURN_INTERVAL_MS,
    SOLEMN_VOW_WHITE_PELLETS_PER_SHOT,
    SOLEMN_VOW_WHITE_PROJECTILE_SIZE,
    SOLEMN_VOW_WHITE_PROJECTILE_SPEED,
    SOLEMN_VOW_WHITE_SPREAD_ANGLE,
    HARMONY_DAMAGE_MAX,
    HARMONY_DAMAGE_MIN,
    HARMONY_PELLETS_PER_SHOT,
    HARMONY_PROJECTILE_SIZE,
    HARMONY_PROJECTILE_SPEED,
    HARMONY_SELF_HP_COST_RATIO,
    HARMONY_SPREAD_ANGLE,
    HORNET_RANGE_SWITCH_DISTANCE,
    HORNET_RIFLE_AFTERBURN_DAMAGE_MAX,
    HORNET_RIFLE_AFTERBURN_DAMAGE_MIN,
    HORNET_RIFLE_AFTERBURN_DURATION_MS,
    HORNET_RIFLE_AFTERBURN_INTERVAL_MS,
    HORNET_RIFLE_DAMAGE_MAX,
    HORNET_RIFLE_DAMAGE_MIN,
    HORNET_RIFLE_PROJECTILE_SIZE,
    HORNET_RIFLE_SPEED,
    HORNET_SHOTGUN_PELLETS_PER_SHOT,
    HORNET_SHOTGUN_SPREAD_ANGLE,
    SWORD_SHARPENED_BLESSING_SHIELD_RADIUS,
    SWORD_SHARPENED_DAMAGE_MIN,
    SWORD_SHARPENED_DAMAGE_MAX,
    SWORD_SHARPENED_SHARPEN_MAX_STACKS,
    SWORD_SHARPENED_SHARPEN_SPEED_BONUS,
    SWORD_SHARPENED_SPEED,
    SWORD_SHARPENED_SIZE,
    SWORD_SHARPENED_BLESSING_SHIELD_DURATION_MS,
    SWORD_SHARPENED_BLESSING_SHIELD_DAMAGE_BLOCK,
    YELLOW_TARGE_CHARGE_IMPULSE,
    YELLOW_TARGE_CHARGE_TRIGGER_RANGE
} from './constants.js';
import { DealerWeapon } from './dealer.js';
import { Projectile } from './projectile.js';
import { Vector } from './vector.js';

function tryMusketBayonet(game, shooter, now) {
    if (shooter.weapon.type !== 'musket') return false;
    if (now < (shooter.nextMusketBayonetAt || 0)) return false;

    let bestTarget = null;
    let bestDistance = Infinity;

    for (const candidate of game.balls) {
        if (!candidate.isAlive()) continue;
        if (candidate.id === shooter.id) continue;
        if (!game.areEnemies(shooter, candidate)) continue;
        if (candidate.isUntargetable(now)) continue;

        const dx = candidate.pos.x - shooter.pos.x;
        const dy = candidate.pos.y - shooter.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bestDistance) {
            bestDistance = distance;
            bestTarget = candidate;
        }
    }

    if (!bestTarget) return false;
    if (bestDistance > shooter.radius + bestTarget.radius + MUSKET_BAYONET_RANGE) return false;

    const damageRoll = Math.floor(Math.random() * (MUSKET_BAYONET_DAMAGE_MAX - MUSKET_BAYONET_DAMAGE_MIN + 1)) + MUSKET_BAYONET_DAMAGE_MIN;
    const stabDamage = damageRoll * shooter.getDamageMultiplier(now);

    if (!bestTarget.isUberActive(now)) {
        bestTarget.takeDamage(stabDamage, 'slash', 'musket');
        bestTarget.applyBayonetBleed(
            now,
            MUSKET_BAYONET_BLEED_DURATION_MS,
            MUSKET_BAYONET_BLEED_DAMAGE_MIN,
            MUSKET_BAYONET_BLEED_DAMAGE_MAX,
            MUSKET_BAYONET_BLEED_INTERVAL_MS,
            MUSKET_BAYONET_HEAL_MULTIPLIER
        );
    }

    shooter.nextMusketBayonetAt = now + MUSKET_BAYONET_COOLDOWN_MS;
    return true;
}

function angleDiffRadians(a, b) {
    let diff = a - b;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return Math.abs(diff);
}

function getPenitenceTarget(game, shooter, teamEnemies, teamAllies) {
    const woundedAllies = teamAllies.filter(ball => ball.hp < ball.maxHP && (ball.hp / ball.maxHP) <= PENITENCE_ALLY_HELP_HP_RATIO);
    const targetPool = woundedAllies.length > 0 ? woundedAllies : teamEnemies;
    if (targetPool.length === 0) return null;
    return game.findNearest(shooter, targetPool);
}

function tryPenitenceSwing(game, shooter, now) {
    if (shooter.weapon.type !== 'penitence') return false;

    const coneHalfAngle = (PENITENCE_SWING_ARC_DEGREES * Math.PI / 180) * 0.5;
    const meleeReach = PENITENCE_MELEE_RANGE;
    const damageMultiplier = shooter.getDamageMultiplier(now);
    let didHit = false;

    for (const candidate of game.balls) {
        if (!candidate.isAlive()) continue;
        if (candidate.id === shooter.id) continue;
        if (candidate.isUntargetable(now)) continue;

        const dx = candidate.pos.x - shooter.pos.x;
        const dy = candidate.pos.y - shooter.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = shooter.radius + candidate.radius + meleeReach;
        if (distance > maxDistance) continue;

        const angleToCandidate = Math.atan2(dy, dx);
        if (angleDiffRadians(angleToCandidate, shooter.aimAngle) > coneHalfAngle) continue;

        const damageRoll = Math.floor(Math.random() * (PENITENCE_DAMAGE_MAX - PENITENCE_DAMAGE_MIN + 1)) + PENITENCE_DAMAGE_MIN;
        const dealtAmount = damageRoll * damageMultiplier;

        if (game.areEnemies(shooter, candidate)) {
            if (!candidate.isUberActive(now)) {
                candidate.takeDamage(dealtAmount, 'slash', 'penitence');
                didHit = true;
            }
        } else if (candidate.hp < candidate.maxHP) {
            candidate.heal(dealtAmount * PENITENCE_ALLY_HEAL_FROM_DAMAGE);
            didHit = true;
        }
    }

    return didHit;
}

function fireSolemnVowFuneral(game, shooter, target, now) {
    const angle = Math.atan2(target.pos.y - shooter.pos.y, target.pos.x - shooter.pos.x);

    game.projectiles.push(
        new Projectile({
            x: shooter.pos.x,
            y: shooter.pos.y,
            targetX: shooter.pos.x + Math.cos(angle) * 900,
            targetY: shooter.pos.y + Math.sin(angle) * 900,
            speed: SOLEMN_VOW_FUNERAL_PROJECTILE_SPEED,
            damage: 0,
            color: '#e8f8ff',
            size: SOLEMN_VOW_FUNERAL_PROJECTILE_SIZE,
            ownerId: shooter.id,
            type: 'solemnvowfuneral',
            sourceWeaponType: 'solemnvow'
        })
    );

    shooter.solemnVow.nextFuneralAllowedAt = now + SOLEMN_VOW_FUNERAL_COOLDOWN_MS;
    if (shooter.solemnVow.pelletsShotSinceFuneral >= SOLEMN_VOW_FUNERAL_PELLETS_REQUIRED) {
        shooter.solemnVow.pelletsShotSinceFuneral = 0;
    }
    if (shooter.weapon.isReloading) {
        shooter.solemnVow.funeralUsedThisReload = true;
    }
}

export function ballShooting(game, now) {
    for (const shooter of game.balls) {
        if (!shooter.isAlive()) continue;
        shooter.weapon.updateReload(now);
        if (shooter.isShootLocked(now)) continue;
        if (now < shooter.nextShootAllowedAt) continue;

        const enemies = game.balls.filter(ball => ball.id !== shooter.id && ball.isAlive());
        const teamEnemies = enemies.filter(ball => game.areEnemies(shooter, ball) && !ball.isUntargetable(now));
        const teamAllies = enemies.filter(ball => !game.areEnemies(shooter, ball) && !ball.isUntargetable(now));
        const healableAllies = teamAllies.filter(ball => ball.hp < ball.maxHP);
        if (shooter.weapon.type !== 'crusaderscrossbow' && shooter.weapon.type !== 'penitence' && teamEnemies.length === 0) continue;

        let target = game.findNearest(shooter, teamEnemies);
        if (shooter.weapon.type === 'crusaderscrossbow') {
            const targetPool = healableAllies.length > 0 ? healableAllies : teamEnemies;
            if (targetPool.length === 0) continue;
            target = game.findNearest(shooter, targetPool);
        }
        if (shooter.weapon.type === 'penitence') {
            const penitenceTarget = getPenitenceTarget(game, shooter, teamEnemies, teamAllies);
            if (!penitenceTarget) continue;
            target = penitenceTarget;

            const chaseDirection = new Vector(target.pos.x - shooter.pos.x, target.pos.y - shooter.pos.y);
            if (chaseDirection.magnitude() > 0.001) {
                shooter.vel = chaseDirection.normalize().multiply(Math.max(shooter.minSpeed, shooter.maxSpeed));
            }
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

        if (shooter.weapon.type === 'musket') {
            const stabbed = tryMusketBayonet(game, shooter, now);
            if (stabbed) {
                shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            }
        }

        if (shooter.weapon.type === 'penitence') {
            if (!shooter.weapon.shoot(now)) continue;
            shooter.penitence.swingStartedAt = now;
            shooter.penitence.swingUntil = now + PENITENCE_SWING_ANIMATION_MS;
            tryPenitenceSwing(game, shooter, now);
            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'solemnvow') {
            if (!shooter.weapon.isReloading) {
                shooter.solemnVow.funeralUsedThisReload = false;
            }

            if (target && shooter.canUseSolemnVowFuneral(now)) {
                fireSolemnVowFuneral(game, shooter, target, now);
                shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
                continue;
            }
        }

        if (shooter.weapon.type === 'hornet') {
            const distanceToTarget = Math.hypot(target.pos.x - shooter.pos.x, target.pos.y - shooter.pos.y);
            const hornetForm = distanceToTarget <= HORNET_RANGE_SWITCH_DISTANCE ? 'shotgun' : 'rifle';
            shooter.weapon.hornetForm = hornetForm;

            if (!shooter.weapon.shoot(now, hornetForm)) continue;

            const damageMultiplier = shooter.getDamageMultiplier(now);

            if (hornetForm === 'shotgun') {
                for (let p = 0; p < HORNET_SHOTGUN_PELLETS_PER_SHOT; p++) {
                    const spreadOffset = (Math.random() * 2 - 1) * HORNET_SHOTGUN_SPREAD_ANGLE;
                    game.fireHornetShotgunRay(shooter, shooter.aimAngle + spreadOffset, now, damageMultiplier);
                }
            } else {
                const damageRoll = Math.floor(Math.random() * (HORNET_RIFLE_DAMAGE_MAX - HORNET_RIFLE_DAMAGE_MIN + 1)) + HORNET_RIFLE_DAMAGE_MIN;
                game.projectiles.push(
                    new Projectile({
                        x: shooter.pos.x,
                        y: shooter.pos.y,
                        targetX: shooter.pos.x + Math.cos(shooter.aimAngle) * 1000,
                        targetY: shooter.pos.y + Math.sin(shooter.aimAngle) * 1000,
                        speed: HORNET_RIFLE_SPEED,
                        damage: damageRoll * damageMultiplier,
                        color: '#ffe07a',
                        size: HORNET_RIFLE_PROJECTILE_SIZE,
                        ownerId: shooter.id,
                        type: 'hornetrifle',
                        sourceWeaponType: 'hornet',
                        afterburnMin: HORNET_RIFLE_AFTERBURN_DAMAGE_MIN,
                        afterburnMax: HORNET_RIFLE_AFTERBURN_DAMAGE_MAX,
                        afterburnDuration: HORNET_RIFLE_AFTERBURN_DURATION_MS,
                        afterburnInterval: HORNET_RIFLE_AFTERBURN_INTERVAL_MS
                    })
                );
            }

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'swordsharpened') {
            if (!shooter.weapon.shoot(now)) continue;

            const damageMultiplier = shooter.getDamageMultiplier(now);
            const damageRoll = Math.floor(Math.random() * (SWORD_SHARPENED_DAMAGE_MAX - SWORD_SHARPENED_DAMAGE_MIN + 1)) + SWORD_SHARPENED_DAMAGE_MIN;
            const damage = damageRoll * damageMultiplier;

            const sharpenStacks = Math.max(0, Math.min(SWORD_SHARPENED_SHARPEN_MAX_STACKS, shooter.swordSharpenStacks || 0));
            const speedMultiplier = 1 + Math.min(0.6, SWORD_SHARPENED_SHARPEN_SPEED_BONUS * sharpenStacks);

            // Try to give blessing shield to nearby ally
            const alliedBalls = game.balls.filter(b => b.isAlive() && b.teamId === shooter.teamId && b.id !== shooter.id);
            let blessingTargetId = null;
            if (alliedBalls.length > 0) {
                let closestAlly = alliedBalls[0];
                let closestDist = Math.hypot(closestAlly.pos.x - shooter.pos.x, closestAlly.pos.y - shooter.pos.y);
                for (const ally of alliedBalls) {
                    const dist = Math.hypot(ally.pos.x - shooter.pos.x, ally.pos.y - shooter.pos.y);
                    if (dist < closestDist && dist <= SWORD_SHARPENED_BLESSING_SHIELD_RADIUS) {
                        closestAlly = ally;
                        closestDist = dist;
                    }
                }
                if (closestDist <= SWORD_SHARPENED_BLESSING_SHIELD_RADIUS) {
                    blessingTargetId = closestAlly.id;
                }
            }

            game.projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX: shooter.pos.x + Math.cos(shooter.aimAngle) * 1000,
                    targetY: shooter.pos.y + Math.sin(shooter.aimAngle) * 1000,
                    speed: SWORD_SHARPENED_SPEED * speedMultiplier,
                    damage: damage,
                    color: '#4da6ff',
                    size: SWORD_SHARPENED_SIZE,
                    ownerId: shooter.id,
                    type: 'swordsharpened',
                    sourceWeaponType: 'swordsharpened',
                    blessingTargetId: blessingTargetId
                })
            );

            // Apply blessing shield immediately to target or self
            const blessingTarget = blessingTargetId ? game.balls.find(b => b.id === blessingTargetId) : shooter;
            if (blessingTarget) {
                blessingTarget.blessingShield.until = now + SWORD_SHARPENED_BLESSING_SHIELD_DURATION_MS;
                blessingTarget.blessingShield.damageBlockRatio = SWORD_SHARPENED_BLESSING_SHIELD_DAMAGE_BLOCK;
            }

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
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

        if (shooter.weapon.type === 'harmony') {
            const damageMultiplier = shooter.getDamageMultiplier(now);
            const intendedSelfHpCost = Math.min(shooter.maxHP * HARMONY_SELF_HP_COST_RATIO, Math.max(0, shooter.hp - 1));
            const selfHpCost = shooter.hp > 1 && shooter.hp - intendedSelfHpCost > 1 ? intendedSelfHpCost : 0;

            if (selfHpCost > 0) {
                shooter.takeDamage(selfHpCost, 'spiritual', 'harmony');
            }

            const boostedMultiplier = damageMultiplier * (selfHpCost > 0 ? 2 : 1);

            for (let p = 0; p < HARMONY_PELLETS_PER_SHOT; p++) {
                const spreadOffset = (Math.random() * 2 - 1) * HARMONY_SPREAD_ANGLE;
                const angle = shooter.aimAngle + spreadOffset;
                const pelletDamage = (Math.floor(Math.random() * (HARMONY_DAMAGE_MAX - HARMONY_DAMAGE_MIN + 1)) + HARMONY_DAMAGE_MIN) * boostedMultiplier;

                game.projectiles.push(
                    new Projectile({
                        x: shooter.pos.x,
                        y: shooter.pos.y,
                        targetX: shooter.pos.x + Math.cos(angle) * 900,
                        targetY: shooter.pos.y + Math.sin(angle) * 900,
                        speed: HARMONY_PROJECTILE_SPEED,
                        damage: pelletDamage,
                        color: '#dcecff',
                        size: HARMONY_PROJECTILE_SIZE,
                        ownerId: shooter.id,
                        type: 'harmony',
                        sourceWeaponType: 'harmony'
                    })
                );
            }

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'solemnvow') {
            const damageMultiplier = shooter.getDamageMultiplier(now);
            const isBlackShot = shooter.solemnVow.nextBlackShot;
            shooter.solemnVow.muzzleFlashUntil = now + SOLEMN_VOW_MUZZLE_FLASH_MS;

            if (isBlackShot) {
                for (let p = 0; p < SOLEMN_VOW_BLACK_PELLETS_PER_SHOT; p++) {
                    const spreadOffset = (Math.random() * 2 - 1) * SOLEMN_VOW_BLACK_SPREAD_ANGLE;
                    const angle = shooter.aimAngle + spreadOffset;

                    game.projectiles.push(
                        new Projectile({
                            x: shooter.pos.x,
                            y: shooter.pos.y,
                            targetX: shooter.pos.x + Math.cos(angle) * 900,
                            targetY: shooter.pos.y + Math.sin(angle) * 900,
                            speed: shooter.weapon.speed,
                            damage: 0,
                            color: '#a9adb2',
                            size: shooter.weapon.projectileSize,
                            ownerId: shooter.id,
                            type: 'solemnvowblack',
                            sourceWeaponType: 'solemnvow',
                            maxHpRatioMin: SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MIN_RATIO,
                            maxHpRatioMax: SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MAX_RATIO,
                            solemnDamageMultiplier: damageMultiplier
                        })
                    );
                }
                shooter.markSolemnVowPelletsFired(SOLEMN_VOW_BLACK_PELLETS_PER_SHOT);
            } else {
                    for (let p = 0; p < SOLEMN_VOW_WHITE_PELLETS_PER_SHOT; p++) {
                        const spreadOffset = (Math.random() * 2 - 1) * SOLEMN_VOW_WHITE_SPREAD_ANGLE;
                        const angle = shooter.aimAngle + spreadOffset;

                        game.projectiles.push(
                            new Projectile({
                                x: shooter.pos.x,
                                y: shooter.pos.y,
                                targetX: shooter.pos.x + Math.cos(angle) * 900,
                                targetY: shooter.pos.y + Math.sin(angle) * 900,
                                speed: SOLEMN_VOW_WHITE_PROJECTILE_SPEED,
                                damage: 0,
                                color: '#e8e8ff',
                                size: SOLEMN_VOW_WHITE_PROJECTILE_SIZE,
                                ownerId: shooter.id,
                                type: 'solemnvowwhite',
                                sourceWeaponType: 'solemnvow',
                                afterburnMin: SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MIN * damageMultiplier,
                                afterburnMax: SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MAX * damageMultiplier,
                                afterburnDuration: SOLEMN_VOW_WHITE_AFTERBURN_DURATION_MS,
                                afterburnInterval: SOLEMN_VOW_WHITE_AFTERBURN_INTERVAL_MS
                            })
                        );
                    }
                    shooter.markSolemnVowPelletsFired(SOLEMN_VOW_WHITE_PELLETS_PER_SHOT);
            }

            shooter.solemnVow.nextBlackShot = !isBlackShot;
            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        const baseAngle = shooter.aimAngle;

        for (let p = 0; p < shooter.weapon.pelletsPerShot; p++) {
            let angle = baseAngle;
            if (shooter.weapon.pelletsPerShot > 1) {
                if (shooter.weapon.type === 'shotgun' || shooter.weapon.type === 'familybusiness' || shooter.weapon.type === 'widowmaker' || shooter.weapon.type === 'sodapopper' || shooter.weapon.type === 'forceanature') {
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

            if (shooter.weapon.type === 'tommygun') {
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

            if (shooter.weapon.type === 'musket') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'egomagicbullet') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'paradiselost') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            const targetX = shooter.pos.x + Math.cos(angle) * 900;
            const targetY = shooter.pos.y + Math.sin(angle) * 900;

            let damage = shooter.weapon.damage;
            if (shooter.weapon.type === 'sniper' || shooter.weapon.type === 'minigun' || shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'flamethrower' || shooter.weapon.type === 'magicianhat' || shooter.weapon.type === 'musket' || shooter.weapon.type === 'egomagicbullet' || shooter.weapon.type === 'paradiselost') {
                damage = Math.floor(Math.random() * (shooter.weapon.damageMax - shooter.weapon.damageMin + 1)) + shooter.weapon.damageMin;
            }

            if (shooter.weapon.type === 'paradiselost') {
                const maxHpRatioRoll = PARADISE_LOST_MAX_HP_DAMAGE_MIN_RATIO + Math.random() * (PARADISE_LOST_MAX_HP_DAMAGE_MAX_RATIO - PARADISE_LOST_MAX_HP_DAMAGE_MIN_RATIO);
                damage += shooter.maxHP * maxHpRatioRoll;
            }

            const damageMultiplier = shooter.getDamageMultiplier(now);
            damage *= damageMultiplier;

            if (shooter.weapon.type === 'shotgun' || shooter.weapon.type === 'familybusiness') {
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

            if (shooter.weapon.type === 'egomagicbullet') {
                game.fireEgoMagicTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'egoloneliness') {
                game.fireEgoLonelinessTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'rocketjumper') {
                const blastDirection = new Vector(Math.cos(angle), Math.sin(angle));
                const selfImpulse = blastDirection.clone().multiply(-ROCKET_JUMPER_SELF_BLAST_IMPULSE);
                shooter.applyImpulse(selfImpulse);
            }

            let spawnX = shooter.pos.x;
            let spawnY = shooter.pos.y;
            let finalTargetX = targetX;
            let finalTargetY = targetY;

            if (shooter.weapon.type === 'egomagicbullet') {
                shooter.egoMagicBulletShotCount = (shooter.egoMagicBulletShotCount || 0) + 1;
                const isCursedShot = shooter.egoMagicBulletShotCount % EGO_MAGIC_BULLET_CURSE_CYCLE === 0;
                if (isCursedShot) {
                    const fireDirX = Math.cos(angle);
                    const fireDirY = Math.sin(angle);
                    spawnX = shooter.pos.x - fireDirX * EGO_MAGIC_BULLET_CURSE_SPAWN_BEHIND_DISTANCE;
                    spawnY = shooter.pos.y - fireDirY * EGO_MAGIC_BULLET_CURSE_SPAWN_BEHIND_DISTANCE;
                    finalTargetX = shooter.pos.x + fireDirX * 900;
                    finalTargetY = shooter.pos.y + fireDirY * 900;

                    shooter.hp = Math.max(0, shooter.hp - damage * EGO_MAGIC_BULLET_SELF_HIT_MULTIPLIER);
                    shooter.lastDamagedAt = now;
                    shooter.medigunState.selfRegenAnchorHp = shooter.hp;
                    shooter.applyAfterburn(
                        now,
                        EGO_MAGIC_BULLET_AFTERBURN_DURATION_MS,
                        EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MIN,
                        EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MAX,
                        EGO_MAGIC_BULLET_AFTERBURN_INTERVAL_MS
                    );
                }
            }

            game.projectiles.push(
                new Projectile({
                    x: spawnX,
                    y: spawnY,
                    targetX: finalTargetX,
                    targetY: finalTargetY,
                    speed: shooter.weapon.speed,
                    damage,
                    color: shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'egomagicbullet' ? shooter.color : shooter.weapon.color,
                    size: shooter.weapon.projectileSize,
                    ownerId: shooter.id,
                    type: shooter.weapon.type === 'nearmissed'
                        ? 'rocketlauncher'
                        : shooter.weapon.type === 'pistol' || shooter.weapon.type === 'revolver' || shooter.weapon.type === 'sniper' || shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'smg' || shooter.weapon.type === 'tommygun' || shooter.weapon.type === 'minigun' || shooter.weapon.type === 'blutsauger' || shooter.weapon.type === 'rocketlauncher' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'beggersbazooka' || shooter.weapon.type === 'directhit' || shooter.weapon.type === 'rocketjumper' || shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'flamethrower' || shooter.weapon.type === 'magicianhat' || shooter.weapon.type === 'musket' || shooter.weapon.type === 'egomagicbullet' || shooter.weapon.type === 'egoloneliness' || shooter.weapon.type === 'paradiselost'
                            ? shooter.weapon.type
                            : 'bullet',
                    sourceWeaponType: shooter.weapon.type,
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
