import * as W from './weapons/index.js';
import { DealerWeapon } from './weapons/dealer.js';
import { Projectile } from './core/projectile.js';
import { Vector } from './core/vector.js';

const _loveHateProjectileImage = new Image();
_loveHateProjectileImage.src = 'assets/EGOProjectileIntheNameofLoveandHate.webp';

const _laetitiaProjectileImage = new Image();
_laetitiaProjectileImage.src = 'assets/LaetitiaGiftMark.webp';

const _soundOfStarImage = new Image();
_soundOfStarImage.src = 'assets/EGOWeaponSoundofaStar.webp';

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
    if (bestDistance > shooter.radius + bestTarget.radius + W.musket.BAYONET_RANGE) return false;

    const damageRoll = Math.floor(Math.random() * (W.musket.BAYONET_DAMAGE_MAX - W.musket.BAYONET_DAMAGE_MIN + 1)) + W.musket.BAYONET_DAMAGE_MIN;
    const stabDamage = damageRoll * shooter.getDamageMultiplier(now);

    if (!bestTarget.isUberActive(now)) {
        bestTarget.takeDamage(stabDamage, 'slash', 'musket');
        bestTarget.applyBayonetBleed(
            now,
            W.musket.BAYONET_BLEED_DURATION_MS,
            W.musket.BAYONET_BLEED_DAMAGE_MIN,
            W.musket.BAYONET_BLEED_DAMAGE_MAX,
            W.musket.BAYONET_BLEED_INTERVAL_MS,
            W.musket.BAYONET_HEAL_MULTIPLIER
        );
    }

    shooter.nextMusketBayonetAt = now + W.musket.BAYONET_COOLDOWN_MS;
    return true;
}

function angleDiffRadians(a, b) {
    let diff = a - b;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return Math.abs(diff);
}

function getPenitenceTarget(game, shooter, teamEnemies, teamAllies) {
    const woundedAllies = teamAllies.filter(ball => ball.hp < ball.maxHP && (ball.hp / ball.maxHP) <= W.penitence.ALLY_HELP_HP_RATIO);
    const targetPool = woundedAllies.length > 0 ? woundedAllies : teamEnemies;
    if (targetPool.length === 0) return null;
    return game.findNearest(shooter, targetPool);
}

function tryCrimsonScarBlade(game, shooter, now) {
    const coneHalfAngle = (W.crimsonScar.BLADE_SWING_ARC_DEGREES * Math.PI / 180) * 0.5;
    const meleeReach = W.crimsonScar.BLADE_RANGE;
    const damageMultiplier = shooter.getDamageMultiplier(now);

    for (const candidate of game.balls) {
        if (!candidate.isAlive()) continue;
        if (candidate.id === shooter.id) continue;
        if (candidate.isUntargetable(now)) continue;
        if (!game.areEnemies(shooter, candidate)) continue;
        if (candidate.isUberActive(now)) continue;

        const dx = candidate.pos.x - shooter.pos.x;
        const dy = candidate.pos.y - shooter.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > shooter.radius + candidate.radius + meleeReach) continue;

        const angleToCandidate = Math.atan2(dy, dx);
        if (angleDiffRadians(angleToCandidate, shooter.aimAngle) > coneHalfAngle) continue;

        const damageRoll = Math.floor(Math.random() * (W.crimsonScar.BLADE_DAMAGE_MAX - W.crimsonScar.BLADE_DAMAGE_MIN + 1)) + W.crimsonScar.BLADE_DAMAGE_MIN;
        candidate.takeDamage(damageRoll * damageMultiplier, 'slash', 'crimsonscar');

        candidate.crimsonScarBleed.until = now + W.crimsonScar.BLEED_DURATION_MS;
        candidate.crimsonScarBleed.nextTickAt = now + W.crimsonScar.BLEED_INTERVAL_MS;
        candidate.crimsonScarBleed.damageMin = W.crimsonScar.BLEED_DAMAGE_MIN;
        candidate.crimsonScarBleed.damageMax = W.crimsonScar.BLEED_DAMAGE_MAX;
        candidate.crimsonScarBleed.intervalMs = W.crimsonScar.BLEED_INTERVAL_MS;
    }
}

function tryPenitenceSwing(game, shooter, now) {
    if (shooter.weapon.type !== 'penitence') return false;

    const coneHalfAngle = (W.penitence.SWING_ARC_DEGREES * Math.PI / 180) * 0.5;
    const meleeReach = W.penitence.MELEE_RANGE;
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

        const damageRoll = Math.floor(Math.random() * (W.penitence.DAMAGE_MAX - W.penitence.DAMAGE_MIN + 1)) + W.penitence.DAMAGE_MIN;
        const dealtAmount = damageRoll * damageMultiplier;

        if (game.areEnemies(shooter, candidate)) {
            if (!candidate.isUberActive(now)) {
                candidate.takeDamage(dealtAmount, 'slash', 'penitence');
                didHit = true;
            }
        } else if (candidate.hp < candidate.maxHP) {
            candidate.heal(dealtAmount * W.penitence.ALLY_HEAL_FROM_DAMAGE);
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
            speed: W.solemnVow.FUNERAL_PROJECTILE_SPEED,
            damage: 0,
            color: '#e8f8ff',
            size: W.solemnVow.FUNERAL_PROJECTILE_SIZE,
            ownerId: shooter.id,
            type: 'solemnvowfuneral',
            sourceWeaponType: 'solemnvow'
        })
    );

    shooter.solemnVow.nextFuneralAllowedAt = now + W.solemnVow.FUNERAL_COOLDOWN_MS;
    if (shooter.solemnVow.pelletsShotSinceFuneral >= W.solemnVow.FUNERAL_PELLETS_REQUIRED) {
        shooter.solemnVow.pelletsShotSinceFuneral = 0;
    }
    if (shooter.weapon.isReloading) {
        shooter.solemnVow.funeralUsedThisReload = true;
    }
}

function fireSoundOfStarShot(game, shooter, orbAngle, now) {
    const startX = shooter.pos.x + Math.cos(orbAngle) * W.soundOfStar.ORBIT_RADIUS;
    const startY = shooter.pos.y + Math.sin(orbAngle) * W.soundOfStar.ORBIT_RADIUS;
    const damageRoll = Math.floor(Math.random() * (W.soundOfStar.DAMAGE_MAX - W.soundOfStar.DAMAGE_MIN + 1)) + W.soundOfStar.DAMAGE_MIN;
    const damage = damageRoll * shooter.getDamageMultiplier(now);

    // Use the shooter's tracked aim angle (toward cursor for player, toward nearest enemy for AI).
    // orbAngle is only for spawn position — not fire direction.
    const fireAngle = shooter.aimAngle !== undefined ? shooter.aimAngle : orbAngle;

    game.projectiles.push(new Projectile({
        x: startX,
        y: startY,
        targetX: startX + Math.cos(fireAngle) * 900,
        targetY: startY + Math.sin(fireAngle) * 900,
        speed: W.soundOfStar.SPEED,
        damage,
        color: '#ffee88',
        size: W.soundOfStar.PROJECTILE_SIZE,
        ownerId: shooter.id,
        type: 'soundofstar',
        sourceWeaponType: 'soundofstar',
        afterburnMin: W.soundOfStar.BURN_DAMAGE_MIN,
        afterburnMax: W.soundOfStar.BURN_DAMAGE_MAX,
        afterburnDuration: W.soundOfStar.BURN_DURATION_MS,
        afterburnInterval: W.soundOfStar.BURN_INTERVAL_MS,
        soundStarHomingStrength: W.soundOfStar.HOMING_STRENGTH,
        soundStarHomingRange: W.soundOfStar.HOMING_RANGE,
        soundStarOrbitAngle: orbAngle,
        soundStarImage: _soundOfStarImage,
        expiresAt: now + 6000,
    }));
}

export function ballShooting(game, now) {
    for (const shooter of game.balls) {
        if (!shooter.isAlive()) continue;
        shooter.weapon.updateReload(now);

        // Sync Sound of Star orbital stars to current charge count and check contact damage
        if (shooter.weapon.type === 'soundofstar') {
            const targetCount = shooter.weapon.ammo;
            if (!shooter.soundStarOrbitals) shooter.soundStarOrbitals = [];
            while (shooter.soundStarOrbitals.length < targetCount) {
                const initAngle = (shooter.soundStarOrbitals.length / W.soundOfStar.MAX_AMMO) * Math.PI * 2;
                shooter.soundStarOrbitals.push({ angle: initAngle, orbitRadius: W.soundOfStar.ORBIT_RADIUS, size: W.soundOfStar.PROJECTILE_SIZE });
            }
            shooter.soundStarOrbitals.length = Math.min(shooter.soundStarOrbitals.length, targetCount);
            for (const orb of shooter.soundStarOrbitals) {
                orb.angle += W.soundOfStar.ORBIT_RATE;

                const ox = shooter.pos.x + Math.cos(orb.angle) * W.soundOfStar.ORBIT_RADIUS;
                const oy = shooter.pos.y + Math.sin(orb.angle) * W.soundOfStar.ORBIT_RADIUS;
                for (const ball of game.balls) {
                    if (!ball.isAlive() || !game.areEnemies(shooter, ball) || ball.isUntargetable(now)) continue;
                    if (Math.hypot(ball.pos.x - ox, ball.pos.y - oy) > W.soundOfStar.PROJECTILE_SIZE + ball.radius) continue;
                    if (!orb.lastHitByBall) orb.lastHitByBall = {};
                    if ((orb.lastHitByBall[ball.id] || 0) + 500 > now) continue;
                    orb.lastHitByBall[ball.id] = now;
                    if (!ball.isUberActive(now)) {
                        const dmg = (Math.floor(Math.random() * (W.soundOfStar.DAMAGE_MAX - W.soundOfStar.DAMAGE_MIN + 1)) + W.soundOfStar.DAMAGE_MIN) * shooter.getDamageMultiplier(now) * W.soundOfStar.ORBITAL_CONTACT_MULTIPLIER;
                        ball.takeDamage(dmg, 'spiritual', 'soundofstar');
                        ball.applyAfterburn(now, W.soundOfStar.BURN_DURATION_MS, W.soundOfStar.BURN_DAMAGE_MIN, W.soundOfStar.BURN_DAMAGE_MAX, W.soundOfStar.BURN_INTERVAL_MS);
                    }
                }
            }
        }

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

            if (!shooter.controller) {
                const chaseDirection = new Vector(target.pos.x - shooter.pos.x, target.pos.y - shooter.pos.y);
                if (chaseDirection.magnitude() > 0.001) {
                    shooter.vel = chaseDirection.normalize().multiply(Math.max(shooter.minSpeed, shooter.maxSpeed));
                }
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

            if (!shooter.controller) {
                const moveDirection = new Vector(target.pos.x - shooter.pos.x, target.pos.y - shooter.pos.y);
                if (moveDirection.magnitude() > 0.001) {
                    shooter.vel = moveDirection.normalize().multiply(Math.max(shooter.minSpeed, shooter.maxSpeed));
                }
            }
        }

        // Player-controlled balls keep their mouse-derived aimAngle; AI balls auto-aim at target.
        if (!shooter.controller) {
            shooter.aimAngle = Math.atan2(target.pos.y - shooter.pos.y, target.pos.x - shooter.pos.x);
        } else if (shooter.controller === 'player' && !game.playerFiring) {
            continue; // player only fires on explicit input
        }

        if (shooter.weapon.type === 'flamethrower') {
            const dx = target.pos.x - shooter.pos.x;
            const dy = target.pos.y - shooter.pos.y;
            const distanceToTarget = Math.sqrt(dx * dx + dy * dy);
            if (distanceToTarget > W.flamethrower.HITSCAN_RANGE) {
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
            shooter.penitence.swingUntil = now + W.penitence.SWING_ANIMATION_MS;
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
            const hornetForm = distanceToTarget <= W.hornet.RANGE_SWITCH_DISTANCE ? 'shotgun' : 'rifle';
            shooter.weapon.hornetForm = hornetForm;

            if (!shooter.weapon.shoot(now, hornetForm)) continue;

            const damageMultiplier = shooter.getDamageMultiplier(now);

            if (hornetForm === 'shotgun') {
                for (let p = 0; p < W.hornet.SHOTGUN_PELLETS_PER_SHOT; p++) {
                    const spreadOffset = (Math.random() * 2 - 1) * W.hornet.SHOTGUN_SPREAD_ANGLE;
                    game.fireHornetShotgunRay(shooter, shooter.aimAngle + spreadOffset, now, damageMultiplier);
                }
            } else {
                const damageRoll = Math.floor(Math.random() * (W.hornet.RIFLE_DAMAGE_MAX - W.hornet.RIFLE_DAMAGE_MIN + 1)) + W.hornet.RIFLE_DAMAGE_MIN;
                game.projectiles.push(
                    new Projectile({
                        x: shooter.pos.x,
                        y: shooter.pos.y,
                        targetX: shooter.pos.x + Math.cos(shooter.aimAngle) * 1000,
                        targetY: shooter.pos.y + Math.sin(shooter.aimAngle) * 1000,
                        speed: W.hornet.RIFLE_SPEED,
                        damage: damageRoll * damageMultiplier,
                        color: '#ffe07a',
                        size: W.hornet.RIFLE_PROJECTILE_SIZE,
                        ownerId: shooter.id,
                        type: 'hornetrifle',
                        sourceWeaponType: 'hornet',
                        afterburnMin: W.hornet.RIFLE_AFTERBURN_DAMAGE_MIN,
                        afterburnMax: W.hornet.RIFLE_AFTERBURN_DAMAGE_MAX,
                        afterburnDuration: W.hornet.RIFLE_AFTERBURN_DURATION_MS,
                        afterburnInterval: W.hornet.RIFLE_AFTERBURN_INTERVAL_MS
                    })
                );
            }

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'crimsonscar') {
            const distToTarget = Math.hypot(target.pos.x - shooter.pos.x, target.pos.y - shooter.pos.y);
            const crimsonForm = distToTarget <= W.crimsonScar.RANGE_SWITCH_DISTANCE ? 'blade' : 'gun';
            shooter.weapon.crimsonScarForm = crimsonForm;

            if (!shooter.weapon.canShoot(now, crimsonForm)) continue;
            if (!shooter.weapon.shoot(now, crimsonForm)) continue;

            const damageMultiplier = shooter.getDamageMultiplier(now);

            if (crimsonForm === 'blade') {
                shooter.weapon.crimsonScarBladeSwingStartedAt = now;
                tryCrimsonScarBlade(game, shooter, now);
            } else {
                const damageRoll = Math.floor(Math.random() * (W.crimsonScar.GUN_DAMAGE_MAX - W.crimsonScar.GUN_DAMAGE_MIN + 1)) + W.crimsonScar.GUN_DAMAGE_MIN;
                game.projectiles.push(
                    new Projectile({
                        x: shooter.pos.x,
                        y: shooter.pos.y,
                        targetX: shooter.pos.x + Math.cos(shooter.aimAngle) * 1000,
                        targetY: shooter.pos.y + Math.sin(shooter.aimAngle) * 1000,
                        speed: W.crimsonScar.GUN_SPEED,
                        damage: damageRoll * damageMultiplier,
                        color: '#cc2222',
                        size: W.crimsonScar.GUN_PROJECTILE_SIZE,
                        ownerId: shooter.id,
                        type: 'crimsonscar',
                        sourceWeaponType: 'crimsonscar',
                    })
                );
            }

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'egolovehate') {
            if (!shooter.weapon.shoot(now)) continue;

            const damageMultiplier = shooter.getDamageMultiplier(now);
            const roll = Math.random();
            let projectileColor, loveHateDamageType, baseDamage, burnMin, burnMax, burnDuration, burnInterval, maxHpRatioMin, maxHpRatioMax;

            if (roll < 0.25) {
                loveHateDamageType = 'red';
                baseDamage = (Math.floor(Math.random() * (W.egoLoveHate.RED_DAMAGE_MAX - W.egoLoveHate.RED_DAMAGE_MIN + 1)) + W.egoLoveHate.RED_DAMAGE_MIN) * damageMultiplier;
                projectileColor = '#ff3333';
            } else if (roll < 0.5) {
                loveHateDamageType = 'black';
                baseDamage = (Math.floor(Math.random() * (W.egoLoveHate.BLACK_DAMAGE_MAX - W.egoLoveHate.BLACK_DAMAGE_MIN + 1)) + W.egoLoveHate.BLACK_DAMAGE_MIN) * damageMultiplier;
                projectileColor = '#2b2b2b';
                burnMin = W.egoLoveHate.BLACK_BURN_MIN * damageMultiplier;
                burnMax = W.egoLoveHate.BLACK_BURN_MAX * damageMultiplier;
                burnDuration = W.egoLoveHate.BLACK_BURN_DURATION_MS;
                burnInterval = W.egoLoveHate.BLACK_BURN_INTERVAL_MS;
            } else if (roll < 0.75) {
                loveHateDamageType = 'white';
                baseDamage = (Math.floor(Math.random() * (W.egoLoveHate.WHITE_DAMAGE_MAX - W.egoLoveHate.WHITE_DAMAGE_MIN + 1)) + W.egoLoveHate.WHITE_DAMAGE_MIN) * damageMultiplier;
                projectileColor = '#f0f0f0';
                burnMin = W.egoLoveHate.WHITE_BURN_MIN * damageMultiplier;
                burnMax = W.egoLoveHate.WHITE_BURN_MAX * damageMultiplier;
                burnDuration = W.egoLoveHate.WHITE_BURN_DURATION_MS;
                burnInterval = W.egoLoveHate.WHITE_BURN_INTERVAL_MS;
            } else {
                loveHateDamageType = 'pale';
                baseDamage = 0;
                projectileColor = '#d4b8b8';
                maxHpRatioMin = W.egoLoveHate.PALE_MIN_RATIO;
                maxHpRatioMax = W.egoLoveHate.PALE_MAX_RATIO;
            }

            game.projectiles.push(new Projectile({
                x: shooter.pos.x,
                y: shooter.pos.y,
                targetX: shooter.pos.x + Math.cos(shooter.aimAngle) * 900,
                targetY: shooter.pos.y + Math.sin(shooter.aimAngle) * 900,
                speed: W.egoLoveHate.SPEED,
                damage: baseDamage,
                color: projectileColor,
                size: W.egoLoveHate.PROJECTILE_SIZE,
                ownerId: shooter.id,
                type: 'egolovehate',
                sourceWeaponType: 'egolovehate',
                loveHateDamageType,
                burnMin,
                burnMax,
                burnDuration,
                burnInterval,
                maxHpRatioMin,
                maxHpRatioMax,
                loveHateImage: _loveHateProjectileImage
            }));

            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'soundofstar') {
            if (!shooter.weapon.shoot(now)) continue;
            const orb = (shooter.soundStarOrbitals || []).shift();
            if (orb) fireSoundOfStarShot(game, shooter, orb.angle, now);
            shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
            continue;
        }

        if (shooter.weapon.type === 'swordsharpened') {
            if (!shooter.weapon.shoot(now)) continue;

            const damageMultiplier = shooter.getDamageMultiplier(now);
            const damageRoll = Math.floor(Math.random() * (W.swordSharpened.DAMAGE_MAX - W.swordSharpened.DAMAGE_MIN + 1)) + W.swordSharpened.DAMAGE_MIN;
            const damage = damageRoll * damageMultiplier;

            const sharpenStacks = Math.max(0, Math.min(W.swordSharpened.SHARPEN_MAX_STACKS, shooter.swordSharpenStacks || 0));
            const speedMultiplier = 1 + Math.min(0.6, W.swordSharpened.SHARPEN_SPEED_BONUS * sharpenStacks);

            // Try to give blessing shield to nearby ally
            const alliedBalls = game.balls.filter(b => b.isAlive() && b.teamId === shooter.teamId && b.id !== shooter.id);
            let blessingTargetId = null;
            if (alliedBalls.length > 0) {
                let closestAlly = alliedBalls[0];
                let closestDist = Math.hypot(closestAlly.pos.x - shooter.pos.x, closestAlly.pos.y - shooter.pos.y);
                for (const ally of alliedBalls) {
                    const dist = Math.hypot(ally.pos.x - shooter.pos.x, ally.pos.y - shooter.pos.y);
                    if (dist < closestDist && dist <= W.swordSharpened.BLESSING_SHIELD_RADIUS) {
                        closestAlly = ally;
                        closestDist = dist;
                    }
                }
                if (closestDist <= W.swordSharpened.BLESSING_SHIELD_RADIUS) {
                    blessingTargetId = closestAlly.id;
                }
            }

            game.projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX: shooter.pos.x + Math.cos(shooter.aimAngle) * 1000,
                    targetY: shooter.pos.y + Math.sin(shooter.aimAngle) * 1000,
                    speed: W.swordSharpened.SPEED * speedMultiplier,
                    damage: damage,
                    color: '#4da6ff',
                    size: W.swordSharpened.SIZE,
                    ownerId: shooter.id,
                    type: 'swordsharpened',
                    sourceWeaponType: 'swordsharpened',
                    blessingTargetId: blessingTargetId
                })
            );

            // Apply blessing shield immediately to target or self
            const blessingTarget = blessingTargetId ? game.balls.find(b => b.id === blessingTargetId) : shooter;
            if (blessingTarget) {
                blessingTarget.blessingShield.until = now + W.swordSharpened.BLESSING_SHIELD_DURATION_MS;
                blessingTarget.blessingShield.damageBlockRatio = W.swordSharpened.BLESSING_SHIELD_DAMAGE_BLOCK;
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

            if (distance <= W.yellowTarge.CHARGE_TRIGGER_RANGE) {
                const direction = new Vector(dx, dy).normalize();
                shooter.applyImpulse(direction.multiply(W.yellowTarge.CHARGE_IMPULSE));
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
                radius: W.shortCircuit.RADIUS,
                expiresAt: now + W.shortCircuit.DURATION_MS,
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
            const intendedSelfHpCost = Math.min(shooter.maxHP * W.harmony.SELF_HP_COST_RATIO, Math.max(0, shooter.hp - 1));
            const selfHpCost = shooter.hp > 1 && shooter.hp - intendedSelfHpCost > 1 ? intendedSelfHpCost : 0;

            if (selfHpCost > 0) {
                shooter.takeDamage(selfHpCost, 'spiritual', 'harmony');
            }

            const boostedMultiplier = damageMultiplier * (selfHpCost > 0 ? 2 : 1);

            for (let p = 0; p < W.harmony.PELLETS_PER_SHOT; p++) {
                const spreadOffset = (Math.random() * 2 - 1) * W.harmony.SPREAD_ANGLE;
                const angle = shooter.aimAngle + spreadOffset;
                const pelletDamage = (Math.floor(Math.random() * (W.harmony.DAMAGE_MAX - W.harmony.DAMAGE_MIN + 1)) + W.harmony.DAMAGE_MIN) * boostedMultiplier;

                game.projectiles.push(
                    new Projectile({
                        x: shooter.pos.x,
                        y: shooter.pos.y,
                        targetX: shooter.pos.x + Math.cos(angle) * 900,
                        targetY: shooter.pos.y + Math.sin(angle) * 900,
                        speed: W.harmony.PROJECTILE_SPEED,
                        damage: pelletDamage,
                        color: '#dcecff',
                        size: W.harmony.PROJECTILE_SIZE,
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
            shooter.solemnVow.muzzleFlashUntil = now + W.solemnVow.MUZZLE_FLASH_MS;

            if (isBlackShot) {
                for (let p = 0; p < W.solemnVow.BLACK_PELLETS_PER_SHOT; p++) {
                    const spreadOffset = (Math.random() * 2 - 1) * W.solemnVow.BLACK_SPREAD_ANGLE;
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
                            maxHpRatioMin: W.solemnVow.BLACK_MAX_HP_DAMAGE_MIN_RATIO,
                            maxHpRatioMax: W.solemnVow.BLACK_MAX_HP_DAMAGE_MAX_RATIO,
                            solemnDamageMultiplier: damageMultiplier
                        })
                    );
                }
                shooter.markSolemnVowPelletsFired(W.solemnVow.BLACK_PELLETS_PER_SHOT);
            } else {
                    for (let p = 0; p < W.solemnVow.WHITE_PELLETS_PER_SHOT; p++) {
                        const spreadOffset = (Math.random() * 2 - 1) * W.solemnVow.WHITE_SPREAD_ANGLE;
                        const angle = shooter.aimAngle + spreadOffset;

                        game.projectiles.push(
                            new Projectile({
                                x: shooter.pos.x,
                                y: shooter.pos.y,
                                targetX: shooter.pos.x + Math.cos(angle) * 900,
                                targetY: shooter.pos.y + Math.sin(angle) * 900,
                                speed: W.solemnVow.WHITE_PROJECTILE_SPEED,
                                damage: 0,
                                color: '#e8e8ff',
                                size: W.solemnVow.WHITE_PROJECTILE_SIZE,
                                ownerId: shooter.id,
                                type: 'solemnvowwhite',
                                sourceWeaponType: 'solemnvow',
                                afterburnMin: W.solemnVow.WHITE_AFTERBURN_DAMAGE_MIN * damageMultiplier,
                                afterburnMax: W.solemnVow.WHITE_AFTERBURN_DAMAGE_MAX * damageMultiplier,
                                afterburnDuration: W.solemnVow.WHITE_AFTERBURN_DURATION_MS,
                                afterburnInterval: W.solemnVow.WHITE_AFTERBURN_INTERVAL_MS
                            })
                        );
                    }
                    shooter.markSolemnVowPelletsFired(W.solemnVow.WHITE_PELLETS_PER_SHOT);
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

            if (shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'hypocrisy') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'beggersbazooka') {
                const randomDeviation = (Math.random() * 2 - 1) * W.beggersBasooka.DEVIATION;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'flamethrower') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'lochnload') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;
            }

            if (shooter.weapon.type === 'piplauncher') {
                const randomDeviation = (Math.random() * 2 - 1) * shooter.weapon.spreadAngle;
                angle += randomDeviation;

                if (p === 0 && now >= (shooter.nextPipFlaskAt || 0)) {
                    game.throwExplosiveFlask(shooter, target, now, false);
                    shooter.nextPipFlaskAt = now + W.explosiveFlask.COOLDOWN_MS;
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

            if (shooter.weapon.type === 'laetitia') {
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
            if (shooter.weapon.type === 'sniper' || shooter.weapon.type === 'minigun' || shooter.weapon.type === 'machina' || shooter.weapon.type === 'egopinks' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'flamethrower' || shooter.weapon.type === 'magicianhat' || shooter.weapon.type === 'musket' || shooter.weapon.type === 'egomagicbullet' || shooter.weapon.type === 'paradiselost' || shooter.weapon.type === 'hypocrisy' || shooter.weapon.type === 'laetitia') {
                damage = Math.floor(Math.random() * (shooter.weapon.damageMax - shooter.weapon.damageMin + 1)) + shooter.weapon.damageMin;
            }

            if (shooter.weapon.type === 'paradiselost') {
                const maxHpRatioRoll = W.paradiseLost.MAX_HP_DAMAGE_MIN_RATIO + Math.random() * (W.paradiseLost.MAX_HP_DAMAGE_MAX_RATIO - W.paradiseLost.MAX_HP_DAMAGE_MIN_RATIO);
                damage += shooter.maxHP * maxHpRatioRoll;
            }

            if (shooter.weapon.type === 'hypocrisy') {
                const currentRate = shooter.weapon.hypocrisyCurrentRate ?? W.hypocrisy.FIRE_RATE_BASE;
                const ratio = (currentRate - W.hypocrisy.FIRE_RATE_MIN) / (W.hypocrisy.FIRE_RATE_BASE - W.hypocrisy.FIRE_RATE_MIN);
                damage *= 1 + ratio * (W.hypocrisy.DAMAGE_MULTIPLIER_MAX - 1);
            }

            const damageMultiplier = shooter.getDamageMultiplier(now);
            damage *= damageMultiplier;

            if (shooter.weapon.type === 'shotgun' || shooter.weapon.type === 'familybusiness') {
                game.fireShotgunRay(shooter, angle, now, damageMultiplier);
                if (now < (shooter.ammoCrateDoubleShotUntil || 0)) {
                    game.fireShotgunRay(shooter, angle + (Math.random() * 2 - 1) * 0.07, now, damageMultiplier);
                }
                continue;
            }

            if (shooter.weapon.type === 'widowmaker') {
                game.fireWidowmakerRay(shooter, angle, now, damageMultiplier);
                if (now < (shooter.ammoCrateDoubleShotUntil || 0)) {
                    game.fireWidowmakerRay(shooter, angle + (Math.random() * 2 - 1) * 0.07, now, damageMultiplier);
                }
                continue;
            }

            if (shooter.weapon.type === 'sodapopper') {
                game.fireSodaPopperRay(shooter, angle, now, damageMultiplier);
                if (now < (shooter.ammoCrateDoubleShotUntil || 0)) {
                    game.fireSodaPopperRay(shooter, angle + (Math.random() * 2 - 1) * 0.07, now, damageMultiplier);
                }
                continue;
            }

            if (shooter.weapon.type === 'forceanature') {
                game.fireForceANatureRay(shooter, angle, now, damageMultiplier, p === 0);
                if (now < (shooter.ammoCrateDoubleShotUntil || 0)) {
                    game.fireForceANatureRay(shooter, angle + (Math.random() * 2 - 1) * 0.07, now, damageMultiplier, false);
                }
                continue;
            }

            if (shooter.weapon.type === 'machina') {
                game.fireMachinaTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'egopinks') {
                game.firePinksTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'egomagicbullet') {
                game.fireEgoMagicTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'egoloneliness') {
                game.fireEgoLonelinessTracer(shooter, angle, now);
            }

            if (shooter.weapon.type === 'rocketjumper') {
                const blastDirection = new Vector(Math.cos(angle), Math.sin(angle));
                const selfImpulse = blastDirection.clone().multiply(-W.rocketJumper.SELF_BLAST_IMPULSE);
                shooter.applyImpulse(selfImpulse);
            }

            let spawnX = shooter.pos.x;
            let spawnY = shooter.pos.y;
            let finalTargetX = targetX;
            let finalTargetY = targetY;

            if (shooter.weapon.type === 'egomagicbullet') {
                shooter.egoMagicBulletShotCount = (shooter.egoMagicBulletShotCount || 0) + 1;
                const isCursedShot = shooter.egoMagicBulletShotCount % W.egoMagicBullet.CURSE_CYCLE === 0;
                if (isCursedShot) {
                    const fireDirX = Math.cos(angle);
                    const fireDirY = Math.sin(angle);
                    spawnX = shooter.pos.x - fireDirX * W.egoMagicBullet.CURSE_SPAWN_BEHIND_DISTANCE;
                    spawnY = shooter.pos.y - fireDirY * W.egoMagicBullet.CURSE_SPAWN_BEHIND_DISTANCE;
                    finalTargetX = shooter.pos.x + fireDirX * 900;
                    finalTargetY = shooter.pos.y + fireDirY * 900;

                    shooter.hp = Math.max(0, shooter.hp - damage * W.egoMagicBullet.SELF_HIT_MULTIPLIER);
                    shooter.lastDamagedAt = now;
                    shooter.medigunState.selfRegenAnchorHp = shooter.hp;
                    shooter.applyAfterburn(
                        now,
                        W.egoMagicBullet.AFTERBURN_DURATION_MS,
                        W.egoMagicBullet.AFTERBURN_DAMAGE_MIN,
                        W.egoMagicBullet.AFTERBURN_DAMAGE_MAX,
                        W.egoMagicBullet.AFTERBURN_INTERVAL_MS
                    );
                }
            }

            let _egosodaType = null;
            if (shooter.weapon.type === 'egosoda') {
                const _sodaRoll = Math.random();
                if (_sodaRoll < W.egoSoda.PURPLE_CHANCE) {
                    _egosodaType = 'purple';
                } else if (_sodaRoll < W.egoSoda.PURPLE_CHANCE + (1 - W.egoSoda.PURPLE_CHANCE) * 0.5) {
                    _egosodaType = 'blue';
                } else {
                    _egosodaType = 'red';
                }
            }
            const _egosodaColor = _egosodaType === 'purple' ? W.egoSoda.PURPLE_COLOR : _egosodaType === 'blue' ? W.egoSoda.BLUE_COLOR : _egosodaType === 'red' ? W.egoSoda.RED_COLOR : null;
            const _projColor = shooter.weapon.type === 'egosoda' ? _egosodaColor
                : shooter.weapon.type === 'machina' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'hypocrisy' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'egomagicbullet' ? shooter.color : shooter.weapon.color;
            const _projType = shooter.weapon.type === 'nearmissed'
                ? 'rocketlauncher'
                : shooter.weapon.type === 'hypocrisy'
                ? 'huntsman'
                : shooter.weapon.type === 'pistol' || shooter.weapon.type === 'revolver' || shooter.weapon.type === 'sniper' || shooter.weapon.type === 'machina' || shooter.weapon.type === 'egopinks' || shooter.weapon.type === 'egosoda' || shooter.weapon.type === 'laetitia' || shooter.weapon.type === 'huntsman' || shooter.weapon.type === 'crusaderscrossbow' || shooter.weapon.type === 'smg' || shooter.weapon.type === 'tommygun' || shooter.weapon.type === 'minigun' || shooter.weapon.type === 'blutsauger' || shooter.weapon.type === 'rocketlauncher' || shooter.weapon.type === 'piplauncher' || shooter.weapon.type === 'beggersbazooka' || shooter.weapon.type === 'directhit' || shooter.weapon.type === 'rocketjumper' || shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'lochnload' || shooter.weapon.type === 'faintaroma' || shooter.weapon.type === 'hairspray' || shooter.weapon.type === 'adoration' || shooter.weapon.type === 'flamethrower' || shooter.weapon.type === 'magicianhat' || shooter.weapon.type === 'musket' || shooter.weapon.type === 'egomagicbullet' || shooter.weapon.type === 'egoloneliness' || shooter.weapon.type === 'paradiselost'
                    ? shooter.weapon.type
                    : 'bullet';
            const _projParams = {
                x: spawnX,
                y: spawnY,
                targetX: finalTargetX,
                targetY: finalTargetY,
                speed: shooter.weapon.speed,
                damage,
                color: _projColor,
                size: shooter.weapon.projectileSize,
                ownerId: shooter.id,
                type: _projType,
                sourceWeaponType: shooter.weapon.type,
                healMin: shooter.weapon.type === 'crusaderscrossbow' ? shooter.weapon.healMin : undefined,
                healMax: shooter.weapon.type === 'crusaderscrossbow' ? shooter.weapon.healMax : undefined,
                sodaType: _egosodaType,
                laetitiaImage: shooter.weapon.type === 'laetitia' ? _laetitiaProjectileImage : undefined,
                splashRadius: shooter.weapon.splashRadius,
                knockbackStrength: shooter.weapon.knockbackStrength,
                splashMaxDamage: shooter.weapon.splashMaxDamage,
                expiresAt: shooter.weapon.type === 'flamethrower' ? now + W.flamethrower.PARTICLE_LIFETIME_MS : undefined,
                explodeAt: shooter.weapon.type === 'grenadelauncher' ? now + shooter.weapon.explodeDelayMs : undefined,
                gravity: (shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'lochnload') ? 0.1 : 0,
                drag: (shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'lochnload') ? 0.996 : 1,
                angularVelocity: (shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'lochnload') ? (Math.random() * 0.3 + 0.15) * (Math.random() < 0.5 ? -1 : 1) : 0,
                aoeRadius: shooter.weapon.type === 'faintaroma' ? W.faintAroma.AOE_RADIUS : undefined,
                mechanics: shooter.weapon.mechanics || [],
            };
            game.projectiles.push(new Projectile(_projParams));

            if (now < (shooter.ammoCrateDoubleShotUntil || 0)) {
                const _dupOffset = (Math.random() * 2 - 1) * 0.07;
                const _dupAngle = angle + _dupOffset;
                game.projectiles.push(new Projectile({
                    ..._projParams,
                    targetX: spawnX + Math.cos(_dupAngle) * 900,
                    targetY: spawnY + Math.sin(_dupAngle) * 900,
                    angularVelocity: (shooter.weapon.type === 'grenadelauncher' || shooter.weapon.type === 'lochnload') ? (Math.random() * 0.3 + 0.15) * (Math.random() < 0.5 ? -1 : 1) : 0
                }));
            }
        }

        if (shooter.weapon.type === 'magicianhat') {
            game.teleportMagicianHatShooter(shooter, target, now);
        }

        shooter.nextShootAllowedAt = now + shooter.reactionDelayMs;
    }
}
