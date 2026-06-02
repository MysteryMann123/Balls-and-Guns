import {
    ARENA_HEIGHT,
    ARENA_WIDTH,
    START_WEAPON_OPTIONS,
} from './gameConfig.js';
import {
    DEAD_RINGER_DECOY_DURATION_MS,
    DEAD_RINGER_DECOY_SPEED,
    PICKUP_SPAWN_RATE_MS,
} from './pickupConstants.js';
import {
    LAETITIA_BLAST_RADIUS,
    LAETITIA_BLAST_DAMAGE_MIN_RATIO,
    LAETITIA_BLAST_DAMAGE_MAX_RATIO,
    LAETITIA_MARK_DURATION_MS,
} from './constants.js';
import { Ball } from './ball.js';
import { DealerWeapon } from './weapons/dealer.js';
import {
    applyEgoMagicBulletHoming as applyEgoMagicBulletHomingImpl,
    fireEgoLonelinessTracer as fireEgoLonelinessTracerImpl,
    applyMagicianHatHoming as applyMagicianHatHomingImpl,
    applyParadiseLostHoming as applyParadiseLostHomingImpl,
    findNearest as findNearestImpl,
    fireEgoMagicTracer as fireEgoMagicTracerImpl,
    fireHornetShotgunRay as fireHornetShotgunRayImpl,
    fireForceANatureRay as fireForceANatureRayImpl,
    fireMachinaTracer as fireMachinaTracerImpl,
    firePinksTracer as firePinksTracerImpl,
    fireShotgunRay as fireShotgunRayImpl,
    fireSodaPopperRay as fireSodaPopperRayImpl,
    fireWidowmakerRay as fireWidowmakerRayImpl,
    rayCircleHitDistance as rayCircleHitDistanceImpl,
    teleportMagicianHatShooter as teleportMagicianHatShooterImpl
} from './gameCombat.js';
import {
    triggerExplosiveFlask as triggerExplosiveFlaskImpl,
    triggerExplosion as triggerExplosionImpl,
    triggerPipExplosion as triggerPipExplosionImpl,
    tryPyroAirblast as tryPyroAirblastImpl,
    updateExplosionEffects as updateExplosionEffectsImpl,
    updateProjectiles as updateProjectilesImpl,
    updateTeleportSmokeEffects as updateTeleportSmokeEffectsImpl
} from './gameProjectiles.js';
import {
    rollRandomDropType as rollRandomDropTypeImpl,
    spawnPickups as spawnPickupsImpl,
    updatePickups as updatePickupsImpl
} from './gameDrops.js';
import {
    getEnemyClusterCenter as getEnemyClusterCenterImpl,
    getMedigunTarget as getMedigunTargetImpl,
    launchBombanomicron as launchBombanomicronImpl,
    spawnScrumpyPuddle as spawnScrumpyPuddleImpl,
    throwExplosiveFlask as throwExplosiveFlaskImpl,
    throwScrumpyBottle as throwScrumpyBottleImpl,
    updateDeadRingerDecoys as updateDeadRingerDecoysImpl,
    updateMediguns as updateMedigunsImpl,
    updateRocketJumperMelee as updateRocketJumperMeleeImpl,
    updateScrumpyPuddles as updateScrumpyPuddlesImpl,
    updateShortCircuitFields as updateShortCircuitFieldsImpl,
    updateYellowTargeCharges as updateYellowTargeChargesImpl
} from './gameSystems.js';
import { buildGameSettings, createDefaultDropWeights } from './gameConfig.js';
import { ballShooting as ballShootingImpl } from './gameShooting.js';
import { draw as drawImpl } from './gameRender.js';

export class Game {
    constructor(canvas, pistolProjectileImage, syringeAmmoImage, rocketAmmoImage, grenadeAmmoImage, arrowProjectileImage, crusadersCrossbowProjectileImage, explosiveFlaskImage, bunnyProjectileImage, magicBulletProjectileImage, appleProjectileImage, sniperRifleImage, machinaImage, huntsmanImage, crusadersCrossbowImage, smgImage, tommyGunImage, egoWeaponMagicBulletImage, egoWeaponLonelinessImage, egoWeaponPenitenceImage, egoWeaponParadiseLostImage, egoWeaponHarmonyImage, egoWeaponSolemnVowBlackImage, egoWeaponSolemnVowWhiteImage, kaleidoscopeMuzzleImage, funeralDeadButterfliesPortraitImage, portalImage, minigunImage, blutsaugerImage, shortCircuitImage, rocketLauncherImage, pipLauncherImage, beggersBazookaImage, directHitImage, rocketJumperImage, yellowTargeImage, medigunImage, grenadeLauncherImage, lochnLoadImage, faintaromaWeaponImage, hairsprayImage, adorationWeaponImage, flamethrowerImage, deadRingerImage, truePistolWeaponImage, revolverWeaponImage, shotgunWeaponImage, familyBusinessWeaponImage, sodaPopperWeaponImage, forceANatureWeaponImage, magicianHatWeaponImage, musketWeaponImage, widowmakerWeaponImage, scrumpyBottleImage, smokeImage, hornetRifleImage, hornetShotgunImage, sporeImage, sporeRoundImage, swordSharpenedImage, blessingShieldImage, hypocrisyWeaponImage, crimsonScarGunImage, crimsonScarBladeImage, crimsonScarMarkImage, pinksWeaponImage, sodaWeaponImage, laetitiaWeaponImage, pickupIcons, settings = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pistolProjectileImage = pistolProjectileImage;
        this.syringeAmmoImage = syringeAmmoImage;
        this.rocketAmmoImage = rocketAmmoImage;
        this.grenadeAmmoImage = grenadeAmmoImage;
        this.arrowProjectileImage = arrowProjectileImage;
        this.crusadersCrossbowProjectileImage = crusadersCrossbowProjectileImage;
        this.explosiveFlaskImage = explosiveFlaskImage;
        this.bunnyProjectileImage = bunnyProjectileImage;
        this.magicBulletProjectileImage = magicBulletProjectileImage;
        this.appleProjectileImage = appleProjectileImage;
        this.sniperRifleImage = sniperRifleImage;
        this.machinaImage = machinaImage;
        this.huntsmanImage = huntsmanImage;
        this.crusadersCrossbowImage = crusadersCrossbowImage;
        this.smgImage = smgImage;
        this.tommyGunImage = tommyGunImage;
        this.egoWeaponMagicBulletImage = egoWeaponMagicBulletImage;
        this.egoWeaponLonelinessImage = egoWeaponLonelinessImage;
        this.egoWeaponPenitenceImage = egoWeaponPenitenceImage;
        this.egoWeaponParadiseLostImage = egoWeaponParadiseLostImage;
        this.egoWeaponHarmonyImage = egoWeaponHarmonyImage;
        this.egoWeaponSolemnVowBlackImage = egoWeaponSolemnVowBlackImage;
        this.egoWeaponSolemnVowWhiteImage = egoWeaponSolemnVowWhiteImage;
        this.kaleidoscopeMuzzleImage = kaleidoscopeMuzzleImage;
        this.funeralDeadButterfliesPortraitImage = funeralDeadButterfliesPortraitImage;
        this.portalImage = portalImage;
        this.minigunImage = minigunImage;
        this.blutsaugerImage = blutsaugerImage;
        this.shortCircuitImage = shortCircuitImage;
        this.rocketLauncherImage = rocketLauncherImage;
        this.pipLauncherImage = pipLauncherImage;
        this.beggersBazookaImage = beggersBazookaImage;
        this.directHitImage = directHitImage;
        this.rocketJumperImage = rocketJumperImage;
        this.yellowTargeImage = yellowTargeImage;
        this.medigunImage = medigunImage;
        this.grenadeLauncherImage = grenadeLauncherImage;
        this.lochnLoadImage = lochnLoadImage;
        this.faintaromaWeaponImage = faintaromaWeaponImage;
        this.hairsprayImage = hairsprayImage;
        this.adorationWeaponImage = adorationWeaponImage;
        this.flamethrowerImage = flamethrowerImage;
        this.deadRingerImage = deadRingerImage;
        this.truePistolWeaponImage = truePistolWeaponImage;
        this.revolverWeaponImage = revolverWeaponImage;
        this.shotgunWeaponImage = shotgunWeaponImage;
        this.familyBusinessWeaponImage = familyBusinessWeaponImage;
        this.sodaPopperWeaponImage = sodaPopperWeaponImage;
        this.forceANatureWeaponImage = forceANatureWeaponImage;
        this.magicianHatWeaponImage = magicianHatWeaponImage;
        this.musketWeaponImage = musketWeaponImage;
        this.widowmakerWeaponImage = widowmakerWeaponImage;
        this.scrumpyBottleImage = scrumpyBottleImage;
        this.smokeImage = smokeImage;
        this.hornetRifleImage = hornetRifleImage;
        this.hornetShotgunImage = hornetShotgunImage;
        this.sporeImage = sporeImage;
        this.sporeRoundImage = sporeRoundImage;
        this.swordSharpenedImage = swordSharpenedImage;
        this.blessingShieldImage = blessingShieldImage;
        this.hypocrisyWeaponImage = hypocrisyWeaponImage;
        this.crimsonScarGunImage = crimsonScarGunImage;
        this.crimsonScarBladeImage = crimsonScarBladeImage;
        this.crimsonScarMarkImage = crimsonScarMarkImage;
        this.pinksWeaponImage = pinksWeaponImage;
        this.sodaWeaponImage = sodaWeaponImage;
        this.laetitiaWeaponImage = laetitiaWeaponImage;
        this.pickupIcons = pickupIcons || {};

        this.settings = buildGameSettings(settings, this.normalizeStartWeapons.bind(this));

        this.balls = this.createBalls(this.settings.ballCount, this.settings.teamCount);
        this.applyStartWeapons(this.settings.startWeapons);

        this.projectiles = [];
        this.shortCircuitFields = [];
        this.scrumpyPuddles = [];
        this.deadRingerDecoys = [];
        this.explosionEffects = [];
        this.damagePopups = [];
        this.teleportSmokeEffects = [];
        this.pickups = [];

        this.gameOver = false;
        this.winnerId = null;
        this.lastUpdateAt = Date.now();

        this.lastPickupSpawn = Date.now();
        this.pickupSpawnRate = this.settings.dropFrequencyMs;
        this.dropWeights = createDefaultDropWeights();
        this.lastDropType = null;
    }

    createBalls(ballCount, teamCount) {
        const palette = [
            { name: 'Red', color: '#ff6b6b' },
            { name: 'Blue', color: '#4ecdc4' },
            { name: 'Yellow', color: '#ffd84d' },
            { name: 'Green', color: '#6cff7a' },
            { name: 'Purple', color: '#b57cff' },
            { name: 'Orange', color: '#ff9f43' },
            { name: 'Pink', color: '#ff78c6' },
            { name: 'Cyan', color: '#66e3ff' },
            { name: 'Lime', color: '#b7ff4a' },
            { name: 'White', color: '#f3f3f3' },
            { name: 'Teal', color: '#3dd6b6' },
            { name: 'Gold', color: '#ffc93c' }
        ];

        const centerX = ARENA_WIDTH / 2;
        const centerY = ARENA_HEIGHT / 2;
        const spawnRadius = Math.min(ARENA_WIDTH, ARENA_HEIGHT) * 0.32;
        const balls = [];

        for (let i = 0; i < ballCount; i++) {
            const angle = (Math.PI * 2 * i) / ballCount;
            const x = centerX + Math.cos(angle) * spawnRadius;
            const y = centerY + Math.sin(angle) * spawnRadius;
            const style = palette[i % palette.length];
            const teamId = (i % teamCount) + 1;

            balls.push(
                new Ball(
                    x,
                    y,
                    20,
                    style.color,
                    `ball-${i + 1}`,
                    style.name,
                    teamId,
                    ARENA_WIDTH,
                    ARENA_HEIGHT
                )
            );
            balls[balls.length - 1].game = this;
        }

        return balls;
    }

    normalizeStartWeapons(startWeapons, ballCount) {
        const fallback = 'pistol';
        const allowed = new Set(START_WEAPON_OPTIONS);
        const raw = Array.isArray(startWeapons) ? startWeapons : [];
        const normalized = [];

        for (let i = 0; i < ballCount; i++) {
            const type = typeof raw[i] === 'string' ? raw[i].toLowerCase() : fallback;
            normalized.push(allowed.has(type) ? type : fallback);
        }

        return normalized;
    }

    applyStartWeapons(startWeapons) {
        for (let i = 0; i < this.balls.length; i++) {
            const type = startWeapons[i] || 'pistol';
            this.balls[i].equipWeapon(type);
            if (type === 'dealer') {
                this.balls[i].dealerWeaponState = new DealerWeapon();
            }
        }
    }

    areEnemies(ballA, ballB) {
        return ballA.teamId !== ballB.teamId;
    }

    getNearestWallPoint(ball) {
        const left = ball.pos.x;
        const right = this.canvas.width - ball.pos.x;
        const top = ball.pos.y;
        const bottom = this.canvas.height - ball.pos.y;

        const minDistance = Math.min(left, right, top, bottom);
        if (minDistance === left) return { x: 0, y: ball.pos.y, distance: left };
        if (minDistance === right) return { x: this.canvas.width, y: ball.pos.y, distance: right };
        if (minDistance === top) return { x: ball.pos.x, y: 0, distance: top };
        return { x: ball.pos.x, y: this.canvas.height, distance: bottom };
    }

    updateRocketJumperMelee(now) {
        return updateRocketJumperMeleeImpl(this, now);
    }

    updateYellowTargeCharges(now) {
        return updateYellowTargeChargesImpl(this, now);
    }

    getMedigunTarget(shooter) {
        return getMedigunTargetImpl(this, shooter);
    }

    updateMediguns(now, deltaMs) {
        return updateMedigunsImpl(this, now, deltaMs);
    }

    update() {
        if (this.gameOver) return;

        const now = Date.now();
        const deltaMs = Math.max(0, now - this.lastUpdateAt);
        this.lastUpdateAt = now;

        for (const ball of this.balls) {
            if (ball.isAlive()) {
                ball.update(this.balls.filter(other => other.isAlive()));
                ball.updateEffects(now, deltaMs);
                ball.weapon.updateReload(now);

                const decoyEvent = ball.consumeDeadRingerDecoyEvent();
                if (decoyEvent) {
                    this.deadRingerDecoys.push({
                        x: decoyEvent.x,
                        y: decoyEvent.y,
                        vx: decoyEvent.vx * DEAD_RINGER_DECOY_SPEED,
                        vy: decoyEvent.vy * DEAD_RINGER_DECOY_SPEED,
                        color: decoyEvent.color,
                        createdAt: now,
                        expiresAt: now + DEAD_RINGER_DECOY_DURATION_MS
                    });
                }
            }
        }

        this.updateRocketJumperMelee(now);
        this.updateYellowTargeCharges(now);
        this.updateMediguns(now, deltaMs);
        this.updateDeadRingerDecoys(now);

        this.updateShortCircuitFields(now);
        this.updateScrumpyPuddles(now);
        this.updateProjectiles(now);
        this.updatePickups();
        this.spawnPickups(now);
        this.ballShooting(now);
        this.updateExplosionEffects(now);
        this.updateTeleportSmokeEffects(now);

        this.checkGameOver();
    }

    updateProjectiles(now) {
        return updateProjectilesImpl(this, now);
    }

    tryPyroAirblast(ball, projectile, now) {
        return tryPyroAirblastImpl(this, ball, projectile, now);
    }

    triggerExplosion(x, y, radius, maxDamage, ownerId, now, ignoredBallId = null, knockbackStrength = 0, includeOwner = false) {
        return triggerExplosionImpl(this, x, y, radius, maxDamage, ownerId, now, ignoredBallId, knockbackStrength, includeOwner);
    }

    triggerPipExplosion(x, y, radius, maxDamage, ownerId, now, ignoredBallId = null) {
        return triggerPipExplosionImpl(this, x, y, radius, maxDamage, ownerId, now, ignoredBallId);
    }

    triggerExplosiveFlask(x, y, ownerId, now, fromPickup = false) {
        return triggerExplosiveFlaskImpl(this, x, y, ownerId, now, fromPickup);
    }

    triggerLaetitiaBlast(victim, now) {
        this.explosionEffects.push({ x: victim.pos.x, y: victim.pos.y, radius: LAETITIA_BLAST_RADIUS, expiresAt: now + 350 });
        for (const ball of this.balls) {
            if (!ball.isAlive() || ball.id === victim.id) continue;
            if (!this.areEnemies(victim, ball)) continue;
            if (ball.isUntargetable(now)) continue;
            const dist = Math.hypot(ball.pos.x - victim.pos.x, ball.pos.y - victim.pos.y);
            if (dist > LAETITIA_BLAST_RADIUS + ball.radius) continue;
            if (!ball.isUberActive(now)) {
                const dmgRatio = LAETITIA_BLAST_DAMAGE_MIN_RATIO + Math.random() * (LAETITIA_BLAST_DAMAGE_MAX_RATIO - LAETITIA_BLAST_DAMAGE_MIN_RATIO);
                ball.takeDamage(ball.maxHP * dmgRatio, 'generic', 'laetitia_blast');
                ball.applyLaetitiaGiftMark(now, LAETITIA_MARK_DURATION_MS);
            }
        }
    }

    updateExplosionEffects(now) {
        return updateExplosionEffectsImpl(this, now);
    }

    updateTeleportSmokeEffects(now) {
        return updateTeleportSmokeEffectsImpl(this, now);
    }

    updateDeadRingerDecoys(now) {
        return updateDeadRingerDecoysImpl(this, now);
    }

    updateShortCircuitFields(now) {
        return updateShortCircuitFieldsImpl(this, now);
    }

    updateScrumpyPuddles(now) {
        return updateScrumpyPuddlesImpl(this, now);
    }

    spawnScrumpyPuddle(x, y, ownerId, now, damageType = 'chemical') {
        return spawnScrumpyPuddleImpl(this, x, y, ownerId, now, damageType);
    }

    throwScrumpyBottle(shooter, target, now) {
        return throwScrumpyBottleImpl(this, shooter, target, now);
    }

    throwExplosiveFlask(shooter, target, now, fromPickup = false) {
        return throwExplosiveFlaskImpl(this, shooter, target, now, fromPickup);
    }

    getEnemyClusterCenter(shooter) {
        return getEnemyClusterCenterImpl(this, shooter);
    }

    launchBombanomicron(shooter, now) {
        return launchBombanomicronImpl(this, shooter, now);
    }

    updatePickups() {
        return updatePickupsImpl(this);
    }

    spawnPickups(now) {
        return spawnPickupsImpl(this, now);
    }

    rollRandomDropType() {
        return rollRandomDropTypeImpl(this);
    }

    ballShooting(now) {
        return ballShootingImpl(this, now);
    }

    fireShotgunRay(shooter, angle, now, damageMultiplier = 1) {
        return fireShotgunRayImpl(this, shooter, angle, now, damageMultiplier);
    }

    fireHornetShotgunRay(shooter, angle, now, damageMultiplier = 1) {
        return fireHornetShotgunRayImpl(this, shooter, angle, now, damageMultiplier);
    }

    fireWidowmakerRay(shooter, angle, now, damageMultiplier = 1) {
        return fireWidowmakerRayImpl(this, shooter, angle, now, damageMultiplier);
    }

    fireSodaPopperRay(shooter, angle, now, damageMultiplier = 1) {
        return fireSodaPopperRayImpl(this, shooter, angle, now, damageMultiplier);
    }

    fireForceANatureRay(shooter, angle, now, damageMultiplier = 1, applySelfKnockback = false) {
        return fireForceANatureRayImpl(this, shooter, angle, now, damageMultiplier, applySelfKnockback);
    }

    teleportMagicianHatShooter(shooter, target, now) {
        return teleportMagicianHatShooterImpl(this, shooter, target, now);
    }

    applyMagicianHatHoming(projectile, now) {
        return applyMagicianHatHomingImpl(this, projectile, now);
    }

    applyEgoMagicBulletHoming(projectile, now) {
        return applyEgoMagicBulletHomingImpl(this, projectile, now);
    }

    applyParadiseLostHoming(projectile, now) {
        return applyParadiseLostHomingImpl(this, projectile, now);
    }

    applyLonelinessSlow(ball, now, durationMs, slowMultiplier) {
        return ball.applyLonelinessSlow(now, durationMs, slowMultiplier);
    }

    fireMachinaTracer(shooter, angle, now) {
        return fireMachinaTracerImpl(this, shooter, angle, now);
    }

    firePinksTracer(shooter, angle, now) {
        return firePinksTracerImpl(this, shooter, angle, now);
    }

    fireEgoMagicTracer(shooter, angle, now) {
        return fireEgoMagicTracerImpl(this, shooter, angle, now);
    }

    fireEgoLonelinessTracer(shooter, angle, now) {
        return fireEgoLonelinessTracerImpl(this, shooter, angle, now);
    }

    rayCircleHitDistance(originX, originY, dirX, dirY, centerX, centerY, radius, maxDistance) {
        return rayCircleHitDistanceImpl(originX, originY, dirX, dirY, centerX, centerY, radius, maxDistance);
    }

    findNearest(source, candidates) {
        return findNearestImpl(source, candidates);
    }

    checkGameOver() {
        const alive = this.balls.filter(ball => ball.isAlive());
        const aliveTeams = new Set(alive.map(ball => ball.teamId));
        if (aliveTeams.size > 1) return;

        this.gameOver = true;
        this.winnerId = alive.length === 0 ? 'draw' : `team-${alive[0].teamId}`;
    }

    getDealerStatusText() {
        const dealerBall = this.balls.find(ball => ball.weapon.type === 'dealer');
        if (!dealerBall) {
            return 'Dealer weapon: not currently equipped.';
        }

        const dealerLabel = `${dealerBall.displayName} (T${dealerBall.teamId})`;
        if (!dealerBall.isAlive()) {
            return `Dealer weapon: ${dealerLabel} was defeated.`;
        }

        if (!dealerBall.dealerWeaponState) {
            return `Dealer weapon: ${dealerLabel} initializing deck...`;
        }

        const exhausted = dealerBall.dealerWeaponState.isExhausted() ? ' | deck exhausted (pick another weapon)' : '';
        return `Dealer weapon: ${dealerLabel} | ${dealerBall.dealerWeaponState.getStatusText()}${exhausted}`;
    }

    draw() {
        return drawImpl(this);
    }
}
