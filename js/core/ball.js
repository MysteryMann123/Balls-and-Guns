import {
    BALL_BASE_SPEED,
    BALL_MAX_HP,
    BALL_MIN_SPEED,
    REACTION_DELAY_MS,
} from '../gameConfig.js';
import {
    CRITICAL_DAMAGE_MULTIPLIER,
    CRITICAL_DURATION_MS,
    CRITICAL_HEAL_PER_SEC,
    DEAD_RINGER_DAMAGE_REDUCTION,
    DEAD_RINGER_DURATION_MS,
    DEAD_RINGER_HEAL_MAX_HP_RATIO,
    DEAD_RINGER_PICKUP_COOLDOWN_MS,
    DEAD_RINGER_SPEED_BOOST,
    HEALTHICO_REGEN_PER_TICK,
    HEALTHICO_REGEN_INTERVAL_MS,
    HEALTHICO_REGEN_DURATION_MS,
    PICKUP_DELAY_MS,
    SCRUMPY_DAMAGE_REDUCTION,
    SPEED_BOOST_PERMANENT,
    UBERCHARGE_DURATION_MS,
    UBERCHARGE_HEAL_PER_SEC,
} from '../pickupConstants.js';
import * as W from '../weapons/index.js';
import { PhysicsEngine } from './physics.js';
import { Vector } from './vector.js';
import { Weapon } from '../weapon.js';

const _egoWeaponLoveHateImage = new Image();
_egoWeaponLoveHateImage.src = 'assets/EGOWeaponIntheNameofLoveandHate.webp';

export class Ball {
    constructor(x, y, radius, color, id, displayName, teamId, arenaWidth, arenaHeight) {
        this.id = id;
        this.displayName = displayName;
        this.teamId = teamId;
        this.pos = new Vector(x, y);
        const seed = new Vector(Math.random() - 0.5, Math.random() - 0.5);
        if (seed.magnitude() === 0) seed.x = 1;
        this.vel = seed.normalize().multiply(BALL_BASE_SPEED);
        this.impulseVel = new Vector(0, 0);
        this.currentSpeed = this.vel.magnitude();

        this.radius = radius;
        this.color = color;
        this.arenaWidth = arenaWidth;
        this.arenaHeight = arenaHeight;

        this.maxHP = BALL_MAX_HP;
        this.hp = BALL_MAX_HP;

        this.maxSpeed = BALL_BASE_SPEED;
        this.minSpeed = BALL_MIN_SPEED;

        this.weapon = new Weapon('pistol');
        this.dealerWeaponState = null;
        this.pickupDelayMs = PICKUP_DELAY_MS;
        this.reactionDelayMs = REACTION_DELAY_MS;
        this.nextShootAllowedAt = Date.now() + this.pickupDelayMs;
        this.aimAngle = Math.atan2(this.vel.y, this.vel.x);

        this.effectTimers = {
            uberUntil: 0,
            critUntil: 0,
            scrumpyResistUntil: 0
        };
        this.afterburn = {
            until: 0,
            nextTickAt: 0,
            damageMin: W.flamethrower.AFTERBURN_DAMAGE_MIN,
            damageMax: W.flamethrower.AFTERBURN_DAMAGE_MAX,
            intervalMs: W.flamethrower.AFTERBURN_INTERVAL_MS
        };
        this.bayonetBleed = {
            until: 0,
            nextTickAt: 0,
            damageMin: W.musket.BAYONET_BLEED_DAMAGE_MIN,
            damageMax: W.musket.BAYONET_BLEED_DAMAGE_MAX,
            intervalMs: W.musket.BAYONET_BLEED_INTERVAL_MS,
            healMultiplier: W.musket.BAYONET_HEAL_MULTIPLIER
        };
        this.crimsonScarBleed = {
            until: 0,
            nextTickAt: 0,
            damageMin: W.crimsonScar.BLEED_DAMAGE_MIN,
            damageMax: W.crimsonScar.BLEED_DAMAGE_MAX,
            intervalMs: W.crimsonScar.BLEED_INTERVAL_MS,
        };
        this.crimsonScarMarkUntil = 0;
        this.ammoCrateDoubleShotUntil = 0;
        this.healthRegen = {
            until: 0,
            nextTickAt: 0,
            perTick: HEALTHICO_REGEN_PER_TICK,
            intervalMs: HEALTHICO_REGEN_INTERVAL_MS
        };
        this.sodaHoTs = [];
        this.laetitiaGiftMark = { until: 0 };
        this.laetitiaBlastCooldownUntil = 0;
        this.faintAromaDebuff = {
            until: 0,
            healReductionRatio: 0
        };

        this.lastDamagedAt = Date.now();
        this.medigunState = {
            targetId: null,
            mode: null,
            uberHealAccum: 0,
            uberDamageAccum: 0,
            selfRegenAnchorHp: this.hp
        };

        this.rocketJumperPhase = 'seekWall';
        this.nextMeleeAllowedAt = 0;
        this.targeChargeActive = false;
        this.targeChargeDistance = 0;
        this.targeChargeStartAt = 0;
        this.targeLastPos = this.pos.clone();
        this.targeTargetId = null;
        this.nextAirblastAt = 0;

        this.deadRinger = {
            has: false,
            activeUntil: 0,
            pickupAvailableAt: 0,
            speedBoostApplied: 0,
            pendingDecoy: null
        };

        this.sodaPopper = {
            chargeDamage: 0,
            hypeUntil: 0,
            speedBoostApplied: 0
        };

        this.explosiveFlask = {
            slowUntil: 0,
            slowMultiplier: 1,
            pipVulnUntil: 0,
            pickupVulnUntil: 0
        };

        this.lonelinessSlow = {
            slowUntil: 0,
            slowMultiplier: 1
        };

        this.adorationSlow = {
            slowUntil: 0,
            slowMultiplier: 1
        };

        this.penitence = {
            maxHpBonus: 0,
            speedBonus: 0,
            swingStartedAt: 0,
            swingUntil: 0
        };

        this.paradiseLost = {
            adaptedDamageType: null,
            nextAdaptAt: 0,
            nextSelfDotAt: 0
        };

        this.harmony = {
            hasteUntil: 0,
            hasteBonus: 0
        };

        this.solemnVow = {
            nextBlackShot: true,
            muzzleFlashUntil: 0,
            pelletsShotSinceFuneral: 0,
            funeralUsedThisReload: false,
            nextFuneralAllowedAt: 0
        };

        this.blessingShield = {
            until: 0,
            damageBlockRatio: 0
        };

        this.swordSharpenStacks = 0;
        this.swordSharpenExpiresAt = 0;

        this.shootLockedUntil = 0;

        this.nextPipFlaskAt = 0;
        this.egoMagicBulletShotCount = 0;
    }

    update(otherBalls) {
        const hpRatio = this.hp / this.maxHP;
        const now = Date.now();
        const flaskSlow = this.weapon.type === 'paradiselost'
            ? 1
            : (now < this.explosiveFlask.slowUntil ? this.explosiveFlask.slowMultiplier : 1);
        const lonelinessSlow = this.weapon.type === 'paradiselost'
            ? 1
            : (now < this.lonelinessSlow.slowUntil ? this.lonelinessSlow.slowMultiplier : 1);
        const adorationSlowMult = this.weapon.type === 'paradiselost'
            ? 1
            : (now < this.adorationSlow.slowUntil ? this.adorationSlow.slowMultiplier : 1);
        const adorationWielderPenalty = this.weapon.type === 'adoration' ? W.adoration.WIELDER_SPEED_MULTIPLIER : 1;
        const soundOfStarPenalty = this.weapon.type === 'soundofstar'
            ? Math.max(0.1, 1 - this.weapon.ammo * W.soundOfStar.WIELDER_SLOW_PER_STAR)
            : 1;
        const crimsonScarSpeedMult = this.weapon.type === 'crimsonscar' ? (1 + W.crimsonScar.SPEED_BONUS) : 1;
        const effectiveHpRatio = this.weapon.type === 'paradiselost'
            ? (0.5 + 0.5 * hpRatio)
            : hpRatio;
        let movement;
        if (this.controller === 'player') {
            // Player vel is set directly from key input — skip AI normalization.
            movement = this.vel.clone().add(this.impulseVel);
        } else {
            const speed = Math.max(this.minSpeed, this.maxSpeed * effectiveHpRatio * flaskSlow * lonelinessSlow * adorationSlowMult * adorationWielderPenalty * soundOfStarPenalty * crimsonScarSpeedMult);
            if (this.vel.magnitude() === 0) {
                this.vel = new Vector(1, 0).multiply(speed);
            } else {
                this.vel.normalize().multiply(speed);
            }
            movement = this.vel.clone().add(this.impulseVel);
        }
        this.currentSpeed = movement.magnitude();
        this.pos.add(movement);

        this.impulseVel.multiply(0.9);
        if (this.impulseVel.magnitude() < 0.05) {
            this.impulseVel.x = 0;
            this.impulseVel.y = 0;
        }

        if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
            this.vel.x = Math.abs(this.vel.x);
        }
        if (this.pos.x + this.radius > this.arenaWidth) {
            this.pos.x = this.arenaWidth - this.radius;
            this.vel.x = -Math.abs(this.vel.x);
        }
        if (this.pos.y - this.radius < 0) {
            this.pos.y = this.radius;
            this.vel.y = Math.abs(this.vel.y);
        }
        if (this.pos.y + this.radius > this.arenaHeight) {
            this.pos.y = this.arenaHeight - this.radius;
            this.vel.y = -Math.abs(this.vel.y);
        }

        for (const other of otherBalls) {
            if (other === this) continue;
            const collision = PhysicsEngine.checkCircleCollision(this.pos, this.radius, other.pos, other.radius);
            if (collision) PhysicsEngine.resolveCircleCollision(this, other);
        }
    }

    equipWeapon(type) {
        const previousType = this.weapon?.type;
        if (previousType === 'penitence') {
            if (this.penitence.maxHpBonus > 0) {
                this.maxHP -= this.penitence.maxHpBonus;
                this.hp = Math.min(this.hp, this.maxHP);
                this.penitence.maxHpBonus = 0;
            }
            if (this.penitence.speedBonus > 0) {
                this.maxSpeed -= this.penitence.speedBonus;
                this.minSpeed -= this.penitence.speedBonus * 0.2;
                this.penitence.speedBonus = 0;
            }
        }

        this.weapon = new Weapon(type);
        this.dealerWeaponState = type === 'dealer' ? this.dealerWeaponState : null;
        this.rocketJumperPhase = 'seekWall';
        this.nextMeleeAllowedAt = 0;
        this.targeChargeActive = false;
        this.targeChargeDistance = 0;
        this.targeTargetId = null;
        this.nextAirblastAt = 0;

        this.deadRinger.activeUntil = 0;
        this.deadRinger.pendingDecoy = null;
        if (this.deadRinger.speedBoostApplied > 0) {
            this.maxSpeed -= this.deadRinger.speedBoostApplied;
            this.minSpeed -= this.deadRinger.speedBoostApplied * 0.2;
            this.deadRinger.speedBoostApplied = 0;
        }

        if (type !== 'medigun') {
            this.medigunState.targetId = null;
            this.medigunState.mode = null;
        }

        if (type !== 'sodapopper') {
            this.sodaPopper.chargeDamage = 0;
            this.sodaPopper.hypeUntil = 0;
            if (this.sodaPopper.speedBoostApplied > 0) {
                this.maxSpeed -= this.sodaPopper.speedBoostApplied;
                this.minSpeed -= this.sodaPopper.speedBoostApplied * 0.2;
                this.sodaPopper.speedBoostApplied = 0;
            }
        }

        if (type !== 'piplauncher') {
            this.nextPipFlaskAt = 0;
        }

        if (type !== 'egomagicbullet') {
            this.egoMagicBulletShotCount = 0;
        }

        if (type !== 'egoloneliness') {
            this.lonelinessSlow.slowUntil = 0;
            this.lonelinessSlow.slowMultiplier = 1;
        }

        if (type !== 'paradiselost') {
            this.paradiseLost.adaptedDamageType = null;
            this.paradiseLost.nextAdaptAt = 0;
            this.paradiseLost.nextSelfDotAt = 0;
        } else {
            const now = Date.now();
            this.paradiseLost.nextSelfDotAt = now + W.paradiseLost.SELF_DOT_INTERVAL_MS;
            this.paradiseLost.nextAdaptAt = now;
            this.paradiseLost.adaptedDamageType = null;
        }

        if (type !== 'harmony') {
            this.harmony.hasteUntil = 0;
            this.harmony.hasteBonus = 0;
        }

        this.solemnVow.nextBlackShot = true;
        this.solemnVow.muzzleFlashUntil = 0;
        this.solemnVow.pelletsShotSinceFuneral = 0;
        this.solemnVow.funeralUsedThisReload = false;
        this.solemnVow.nextFuneralAllowedAt = 0;

        if (type === 'penitence') {
            this.penitence.maxHpBonus = this.maxHP * W.penitence.MAX_HP_BONUS_RATIO;
            this.maxHP += this.penitence.maxHpBonus;
            this.penitence.speedBonus = this.maxSpeed * W.penitence.SPEED_BONUS_RATIO;
            this.maxSpeed += this.penitence.speedBonus;
            this.minSpeed += this.penitence.speedBonus * 0.2;
            this.heal(this.maxHP * W.penitence.PICKUP_HEAL_RATIO);
            this.penitence.swingStartedAt = 0;
            this.penitence.swingUntil = 0;
        }

        this.nextShootAllowedAt = Date.now() + this.pickupDelayMs;
    }

    takeDamage(amount, damageType = 'generic', sourceWeaponType = null, ignoreBlessingShield = false) {
        let adjusted = amount;
        const now = Date.now();
        const isParadiseLostAttack = sourceWeaponType === 'paradiselost';
        const isHarmonySelfDamage = sourceWeaponType === 'harmony';
        const isLaetitiaBlast = sourceWeaponType === 'laetitia_blast';

        if (now < this.explosiveFlask.pickupVulnUntil) {
            adjusted *= W.explosiveFlask.PICKUP_DAMAGE_MULTIPLIER;
            damageType = 'explosive';
        }

        if (sourceWeaponType === 'piplauncher' && now < this.explosiveFlask.pipVulnUntil) {
            adjusted *= W.explosiveFlask.PIP_DAMAGE_MULTIPLIER;
        }

        if (!isParadiseLostAttack && !isHarmonySelfDamage && adjusted > 0 && this.deadRinger.has && now >= this.deadRinger.activeUntil) {
            this.deadRinger.has = false;
            this.deadRinger.activeUntil = now + DEAD_RINGER_DURATION_MS;
            this.deadRinger.pickupAvailableAt = now + DEAD_RINGER_PICKUP_COOLDOWN_MS;
            this.heal(this.maxHP * DEAD_RINGER_HEAL_MAX_HP_RATIO);
            if (this.deadRinger.speedBoostApplied <= 0) {
                this.deadRinger.speedBoostApplied = DEAD_RINGER_SPEED_BOOST;
                this.maxSpeed += DEAD_RINGER_SPEED_BOOST;
                this.minSpeed += DEAD_RINGER_SPEED_BOOST * 0.2;
            }

            const baseDir = this.vel.magnitude() > 0.001 ? this.vel.clone().normalize() : new Vector(Math.cos(this.aimAngle), Math.sin(this.aimAngle));
            this.deadRinger.pendingDecoy = {
                x: this.pos.x,
                y: this.pos.y,
                vx: baseDir.x,
                vy: baseDir.y,
                color: this.color,
                createdAt: now
            };
        }

        if (!isParadiseLostAttack && !isHarmonySelfDamage && now < this.deadRinger.activeUntil) {
            adjusted *= (1 - DEAD_RINGER_DAMAGE_REDUCTION);
        }

        if (!isParadiseLostAttack && !isHarmonySelfDamage && !ignoreBlessingShield && now < this.blessingShield.until) {
            adjusted *= (1 - this.blessingShield.damageBlockRatio);
        }

        if (!isParadiseLostAttack && !isHarmonySelfDamage && this.weapon.type === 'yellowtarge') {
            const reduction = damageType === 'explosive'
                ? W.yellowTarge.DAMAGE_REDUCTION_EXPLOSIVE
                : W.yellowTarge.DAMAGE_REDUCTION_ALL;
            adjusted *= (1 - reduction);
        }

        if (!isParadiseLostAttack && !isHarmonySelfDamage && now < this.effectTimers.scrumpyResistUntil) {
            adjusted *= (1 - SCRUMPY_DAMAGE_REDUCTION);
        }

        if (sourceWeaponType === 'crimsonscar' && adjusted > 0 && now < this.crimsonScarMarkUntil) {
            adjusted *= (1 + W.crimsonScar.MARK_DAMAGE_BONUS);
        }

        if (this.weapon.type === 'crimsonscar' && adjusted > 0 && !isHarmonySelfDamage && !isParadiseLostAttack) {
            adjusted *= (1 + W.crimsonScar.DAMAGE_TAKEN_PENALTY);
        }

        if (now < this.laetitiaGiftMark.until && adjusted > 0) {
            adjusted *= W.laetitia.MARK_VULN_MULTIPLIER;
        }

        if (this.weapon.type === 'paradiselost' && adjusted > 0) {
            if (now >= this.paradiseLost.nextAdaptAt) {
                this.paradiseLost.adaptedDamageType = damageType;
                this.paradiseLost.nextAdaptAt = now + W.paradiseLost.ADAPTIVE_INTERVAL_MS;
            }

            if (this.paradiseLost.adaptedDamageType && damageType === this.paradiseLost.adaptedDamageType) {
                adjusted *= (1 - W.paradiseLost.ADAPTIVE_RESISTANCE);
            }
        }

        if (adjusted > 0) {
            this.lastDamagedAt = now;
            this.medigunState.selfRegenAnchorHp = this.hp - adjusted;
        }

        if (this.weapon.isHasteWeapon() && adjusted > 0 && sourceWeaponType && sourceWeaponType !== this.weapon.type) {
            this.weapon.addHaste(now, adjusted, this.maxHP);
            this.harmony.hasteBonus = this.weapon.hasteBonus;
            this.harmony.hasteUntil = this.weapon.hasteUntil;

            if (this.weapon.isReloading) {
                const remaining = Math.max(0, this.weapon.reloadCompleteAt - now);
                this.weapon.reloadCompleteAt = now + remaining * (1 - Math.min(this.weapon.hasteMaxBonus, adjusted / Math.max(1, this.maxHP)));
            }
        }

        if (adjusted > 0 && this.game && Array.isArray(this.game.damagePopups)) {
            this.game.damagePopups.push({
                x: this.pos.x + (Math.random() * 16 - 8),
                y: this.pos.y - this.radius - 12,
                vy: -0.6 - Math.random() * 0.4,
                lifeMs: 900,
                createdAt: now,
                text: `${Math.max(1, Math.round(adjusted))}`,
                color: '#ff3b3b'
            });

            if (this.game.damagePopups.length > 80) {
                this.game.damagePopups.splice(0, this.game.damagePopups.length - 80);
            }
        }

        this.hp = Math.max(0, this.hp - adjusted);

        if (adjusted > 0 && !isLaetitiaBlast && now < this.laetitiaGiftMark.until && adjusted >= this.maxHP * W.laetitia.MARK_TRIGGER_THRESHOLD_RATIO && now >= (this.laetitiaBlastCooldownUntil || 0)) {
            this.laetitiaBlastCooldownUntil = now + 500;
            if (this.game) this.game.triggerLaetitiaBlast(this, now);
        }

        if (adjusted > 0 && this.weapon.type === 'hypocrisy') {
            const refund = Math.floor(this.weapon.maxAmmo * W.hypocrisy.AMMO_REFUND_RATIO);
            if (refund > 0) {
                this.weapon.ammo = Math.min(this.weapon.maxAmmo, this.weapon.ammo + refund);
                if (this.weapon.isReloading && this.weapon.ammo > 0) {
                    this.weapon.isReloading = false;
                }
            }
        }

        if (sourceWeaponType === 'crimsonscar' && adjusted > 0) {
            this.crimsonScarMarkUntil = Math.max(this.crimsonScarMarkUntil, now + W.crimsonScar.MARK_DURATION_MS);
        }
    }

    heal(amount) {
        const now = Date.now();
        const beforeHp = this.hp;
        const aromaReduction = (now < this.faintAromaDebuff.until) ? (1 - this.faintAromaDebuff.healReductionRatio) : 1;
        const effectiveHeal = now < this.bayonetBleed.until
            ? amount * this.bayonetBleed.healMultiplier * aromaReduction
            : amount * aromaReduction;
        this.hp = Math.min(this.maxHP, this.hp + effectiveHeal);

        const healed = this.hp - beforeHp;
        if (healed > 0 && this.game && Array.isArray(this.game.damagePopups)) {
            this.game.damagePopups.push({
                x: this.pos.x + (Math.random() * 16 - 8),
                y: this.pos.y - this.radius - 12,
                vy: -0.55 - Math.random() * 0.35,
                lifeMs: 900,
                createdAt: now,
                text: `+${Math.max(1, Math.round(healed))}`,
                color: '#65ff65'
            });

            if (this.game.damagePopups.length > 80) {
                this.game.damagePopups.splice(0, this.game.damagePopups.length - 80);
            }
        }
    }

    applyUbercharge(now, durationMs = UBERCHARGE_DURATION_MS) {
        this.effectTimers.uberUntil = Math.max(this.effectTimers.uberUntil, now + durationMs);
    }

    applyCritical(now) {
        this.effectTimers.critUntil = Math.max(this.effectTimers.critUntil, now + CRITICAL_DURATION_MS);
    }

    applySpeedBoost() {
        this.maxSpeed += SPEED_BOOST_PERMANENT;
        this.minSpeed += SPEED_BOOST_PERMANENT * 0.2;
    }

    applyScrumpyResistance(now, durationMs) {
        this.effectTimers.scrumpyResistUntil = Math.max(this.effectTimers.scrumpyResistUntil, now + durationMs);
    }

    applyExplosiveFlaskDebuff(now, durationMs, slowMultiplier, fromPickup = false) {
        if (this.weapon.type === 'paradiselost') return;
        const until = now + durationMs;
        this.explosiveFlask.slowUntil = Math.max(this.explosiveFlask.slowUntil, until);
        this.explosiveFlask.slowMultiplier = Math.min(this.explosiveFlask.slowMultiplier, slowMultiplier);

        if (fromPickup) {
            this.explosiveFlask.pickupVulnUntil = Math.max(this.explosiveFlask.pickupVulnUntil, until);
        } else {
            this.explosiveFlask.pipVulnUntil = Math.max(this.explosiveFlask.pipVulnUntil, until);
        }
    }

    applyLonelinessSlow(now, durationMs = W.egoLoneliness.SLOW_DURATION_MS, slowMultiplier = W.egoLoneliness.SLOW_MULTIPLIER) {
        if (this.weapon.type === 'paradiselost') return;
        const until = now + durationMs;
        this.lonelinessSlow.slowUntil = Math.max(this.lonelinessSlow.slowUntil, until);
        this.lonelinessSlow.slowMultiplier = Math.min(this.lonelinessSlow.slowMultiplier, slowMultiplier);
    }

    applyAdorationSlow(now, durationMs = W.adoration.SLOW_DURATION_MS, slowMultiplier = W.adoration.SLOW_MULTIPLIER) {
        if (this.weapon.type === 'paradiselost') return;
        const until = now + durationMs;
        this.adorationSlow.slowUntil = Math.max(this.adorationSlow.slowUntil, until);
        this.adorationSlow.slowMultiplier = Math.min(this.adorationSlow.slowMultiplier, slowMultiplier);
    }

    getEffectiveSlowMultiplier(now) {
        let m = 1;
        if (now < this.explosiveFlask.slowUntil)  m = Math.min(m, this.explosiveFlask.slowMultiplier);
        if (now < this.lonelinessSlow.slowUntil)  m = Math.min(m, this.lonelinessSlow.slowMultiplier);
        if (now < this.adorationSlow.slowUntil)   m = Math.min(m, this.adorationSlow.slowMultiplier);
        return m;
    }

    canPickupDeadRinger(now) {
        return !this.deadRinger.has && now >= this.deadRinger.pickupAvailableAt;
    }

    giveDeadRinger(now) {
        if (!this.canPickupDeadRinger(now)) return false;
        this.deadRinger.has = true;
        this.deadRinger.activeUntil = 0;
        return true;
    }

    consumeDeadRingerDecoyEvent() {
        if (!this.deadRinger.pendingDecoy) return null;
        const event = this.deadRinger.pendingDecoy;
        this.deadRinger.pendingDecoy = null;
        return event;
    }

    applyAfterburn(now, durationMs = W.flamethrower.AFTERBURN_DURATION_MS, damageMin = W.flamethrower.AFTERBURN_DAMAGE_MIN, damageMax = W.flamethrower.AFTERBURN_DAMAGE_MAX, intervalMs = W.flamethrower.AFTERBURN_INTERVAL_MS) {
        this.afterburn.until = Math.max(this.afterburn.until, now + durationMs);
        this.afterburn.damageMin = damageMin;
        this.afterburn.damageMax = damageMax;
        this.afterburn.intervalMs = intervalMs;
        if (this.afterburn.nextTickAt <= now) {
            this.afterburn.nextTickAt = now + intervalMs;
        }
    }

    applyBayonetBleed(now, durationMs = W.musket.BAYONET_BLEED_DURATION_MS, damageMin = W.musket.BAYONET_BLEED_DAMAGE_MIN, damageMax = W.musket.BAYONET_BLEED_DAMAGE_MAX, intervalMs = W.musket.BAYONET_BLEED_INTERVAL_MS, healMultiplier = W.musket.BAYONET_HEAL_MULTIPLIER) {
        this.bayonetBleed.until = Math.max(this.bayonetBleed.until, now + durationMs);
        this.bayonetBleed.damageMin = damageMin;
        this.bayonetBleed.damageMax = damageMax;
        this.bayonetBleed.intervalMs = intervalMs;
        this.bayonetBleed.healMultiplier = healMultiplier;
        if (this.bayonetBleed.nextTickAt <= now) {
            this.bayonetBleed.nextTickAt = now + intervalMs;
        }
    }

    applyHealthRegen(now, perTick = HEALTHICO_REGEN_PER_TICK, durationMs = HEALTHICO_REGEN_DURATION_MS, intervalMs = HEALTHICO_REGEN_INTERVAL_MS) {
        this.healthRegen.until = Math.max(this.healthRegen.until, now + durationMs);
        this.healthRegen.perTick = perTick;
        this.healthRegen.intervalMs = intervalMs;
        if (this.healthRegen.nextTickAt <= now) {
            this.healthRegen.nextTickAt = now + intervalMs;
        }
    }

    applySodaBlueHoT(now, perTick, durationMs, intervalMs) {
        this.sodaHoTs.push({ perTick, intervalMs, nextTickAt: now + intervalMs, expiresAt: now + durationMs });
    }

    applyLaetitiaGiftMark(now, durationMs) {
        this.laetitiaGiftMark.until = Math.max(this.laetitiaGiftMark.until, now + durationMs);
    }

    applyFaintAromaDebuff(now, durationMs, healReductionRatio) {
        this.faintAromaDebuff.until = Math.max(this.faintAromaDebuff.until, now + durationMs);
        this.faintAromaDebuff.healReductionRatio = healReductionRatio;
    }

    applyImpulse(vector) {
        const impulse = vector.clone();
        if (this.weapon.type === 'penitence') {
            impulse.multiply(1 - W.penitence.KNOCKBACK_RESISTANCE);
        }
        this.impulseVel.add(impulse);
    }

    isUberActive(now) {
        return now < this.effectTimers.uberUntil;
    }

    isCriticalActive(now) {
        return now < this.effectTimers.critUntil;
    }

    isUntargetable(now) {
        return now < this.deadRinger.activeUntil;
    }

    isShootLocked(now) {
        return now < this.shootLockedUntil;
    }

    applyShootLock(now, durationMs) {
        this.shootLockedUntil = Math.max(this.shootLockedUntil, now + durationMs);
        this.nextShootAllowedAt = Math.max(this.nextShootAllowedAt, this.shootLockedUntil);
    }

    canUseSolemnVowFuneral(now) {
        if (this.weapon.type !== 'solemnvow') return false;
        if (this.isShootLocked(now)) return false;
        if (now < this.solemnVow.nextFuneralAllowedAt) return false;

        return this.solemnVow.pelletsShotSinceFuneral >= W.solemnVow.FUNERAL_PELLETS_REQUIRED
            || (this.weapon.isReloading && !this.solemnVow.funeralUsedThisReload);
    }

    markSolemnVowPelletsFired(count) {
        if (this.weapon.type !== 'solemnvow') return;
        this.solemnVow.pelletsShotSinceFuneral += Math.max(0, count | 0);
    }

    registerSodaPopperDamage(amount, now = Date.now()) {
        const dealt = Math.max(0, amount || 0);
        if (dealt <= 0) return;

        this.sodaPopper.chargeDamage += dealt;
        while (this.sodaPopper.chargeDamage >= W.sodaPopper.CHARGE_DAMAGE_REQUIRED) {
            this.sodaPopper.chargeDamage -= W.sodaPopper.CHARGE_DAMAGE_REQUIRED;
            this.activateSodaPopperHype(now);
        }
    }

    activateSodaPopperHype(now = Date.now()) {
        this.sodaPopper.hypeUntil = now + W.sodaPopper.HYPE_DURATION_MS;

        if (this.sodaPopper.speedBoostApplied <= 0) {
            this.sodaPopper.speedBoostApplied = W.sodaPopper.HYPE_SPEED_BOOST;
            this.maxSpeed += W.sodaPopper.HYPE_SPEED_BOOST;
            this.minSpeed += W.sodaPopper.HYPE_SPEED_BOOST * 0.2;
        }
    }

    getDamageMultiplier(now) {
        let multiplier = this.isCriticalActive(now) ? CRITICAL_DAMAGE_MULTIPLIER : 1;
        if (now < this.sodaPopper.hypeUntil) {
            multiplier *= W.sodaPopper.HYPE_DAMAGE_MULTIPLIER;
        }
        // Apply sword sharpening stacks to wielder damage
        if (now < this.swordSharpenExpiresAt && this.swordSharpenStacks > 0) {
            multiplier *= (1 + W.swordSharpened.SHARPEN_DAMAGE_BONUS * this.swordSharpenStacks);
        }
        return multiplier;
    }

    updateEffects(now, deltaMs) {
        const deltaSeconds = deltaMs / 1000;

        if (this.isUberActive(now)) {
            this.heal(UBERCHARGE_HEAL_PER_SEC * deltaSeconds);
        }

        if (this.isCriticalActive(now)) {
            this.heal(CRITICAL_HEAL_PER_SEC * deltaSeconds);
        }

        while (this.healthRegen.nextTickAt > 0 && this.healthRegen.nextTickAt <= now && this.healthRegen.nextTickAt <= this.healthRegen.until && this.isAlive()) {
            this.heal(this.healthRegen.perTick);
            this.healthRegen.nextTickAt += this.healthRegen.intervalMs;
        }
        if (now > this.healthRegen.until) {
            this.healthRegen.nextTickAt = 0;
        }

        for (let _si = this.sodaHoTs.length - 1; _si >= 0; _si--) {
            const _hot = this.sodaHoTs[_si];
            if (now >= _hot.expiresAt) { this.sodaHoTs.splice(_si, 1); continue; }
            while (_hot.nextTickAt <= now && _hot.nextTickAt <= _hot.expiresAt && this.isAlive()) {
                this.heal(_hot.perTick);
                _hot.nextTickAt += _hot.intervalMs;
            }
        }

        while (this.afterburn.nextTickAt > 0 && this.afterburn.nextTickAt <= now && this.afterburn.nextTickAt <= this.afterburn.until && this.isAlive()) {
            if (!this.isUberActive(now)) {
                const burnDamage = Math.floor(Math.random() * (this.afterburn.damageMax - this.afterburn.damageMin + 1)) + this.afterburn.damageMin;
                const adorationBoost = (now < this.adorationSlow.slowUntil) ? W.adoration.AFTERBURN_MULTIPLIER : 1;
                this.takeDamage(burnDamage * adorationBoost, 'fire');
            }
            this.afterburn.nextTickAt += this.afterburn.intervalMs;
        }

        if (now > this.afterburn.until) {
            this.afterburn.nextTickAt = 0;
        }

        while (this.bayonetBleed.nextTickAt > 0 && this.bayonetBleed.nextTickAt <= now && this.bayonetBleed.nextTickAt <= this.bayonetBleed.until && this.isAlive()) {
            if (!this.isUberActive(now)) {
                const bleedDamage = Math.floor(Math.random() * (this.bayonetBleed.damageMax - this.bayonetBleed.damageMin + 1)) + this.bayonetBleed.damageMin;
                this.takeDamage(bleedDamage, 'bleed');
            }
            this.bayonetBleed.nextTickAt += this.bayonetBleed.intervalMs;
        }

        if (now > this.bayonetBleed.until) {
            this.bayonetBleed.nextTickAt = 0;
        }

        while (this.crimsonScarBleed.nextTickAt > 0 && this.crimsonScarBleed.nextTickAt <= now && this.crimsonScarBleed.nextTickAt <= this.crimsonScarBleed.until && this.isAlive()) {
            if (!this.isUberActive(now)) {
                const bleedDamage = Math.floor(Math.random() * (this.crimsonScarBleed.damageMax - this.crimsonScarBleed.damageMin + 1)) + this.crimsonScarBleed.damageMin;
                this.takeDamage(bleedDamage, 'bleed');
            }
            this.crimsonScarBleed.nextTickAt += this.crimsonScarBleed.intervalMs;
        }
        if (now > this.crimsonScarBleed.until) {
            this.crimsonScarBleed.nextTickAt = 0;
        }

        if (now >= this.deadRinger.activeUntil && this.deadRinger.speedBoostApplied > 0) {
            this.maxSpeed -= this.deadRinger.speedBoostApplied;
            this.minSpeed -= this.deadRinger.speedBoostApplied * 0.2;
            this.deadRinger.speedBoostApplied = 0;
        }

        if (now >= this.sodaPopper.hypeUntil && this.sodaPopper.speedBoostApplied > 0) {
            this.maxSpeed -= this.sodaPopper.speedBoostApplied;
            this.minSpeed -= this.sodaPopper.speedBoostApplied * 0.2;
            this.sodaPopper.speedBoostApplied = 0;
        }

        if (now >= this.explosiveFlask.slowUntil) {
            this.explosiveFlask.slowMultiplier = 1;
        }

        if (now >= this.lonelinessSlow.slowUntil) {
            this.lonelinessSlow.slowMultiplier = 1;
        }

        if (now >= this.adorationSlow.slowUntil) {
            this.adorationSlow.slowMultiplier = 1;
        }

        if (this.weapon.type === 'harmony' && now >= this.harmony.hasteUntil) {
            this.harmony.hasteBonus = 0;
        }

        if (this.weapon.type === 'paradiselost' && this.isAlive()) {
            while (this.paradiseLost.nextSelfDotAt > 0 && this.paradiseLost.nextSelfDotAt <= now && this.isAlive()) {
                const ratio = W.paradiseLost.SELF_DOT_MIN_RATIO + Math.random() * (W.paradiseLost.SELF_DOT_MAX_RATIO - W.paradiseLost.SELF_DOT_MIN_RATIO);
                const selfDamage = this.maxHP * ratio;
                this.hp = Math.max(0, this.hp - selfDamage);
                this.lastDamagedAt = now;
                this.medigunState.selfRegenAnchorHp = this.hp;
                this.paradiseLost.nextSelfDotAt += W.paradiseLost.SELF_DOT_INTERVAL_MS;
            }
        }
    }

    isAlive() {
        return this.hp > 0;
    }

    draw(ctx, now, sniperRifleImage, machinaImage, huntsmanImage, crusadersCrossbowImage, smgImage, tommyGunImage, egoWeaponMagicBulletImage, egoWeaponLonelinessImage, egoWeaponPenitenceImage, egoWeaponParadiseLostImage, egoWeaponHarmonyImage, portalImage, minigunImage, blutsaugerImage, shortCircuitImage, rocketLauncherImage, pipLauncherImage, beggersBazookaImage, directHitImage, rocketJumperImage, yellowTargeImage, medigunImage, grenadeLauncherImage, lochnLoadImage, faintaromaWeaponImage, hairsprayImage, adorationWeaponImage, flamethrowerImage, deadRingerImage, truePistolWeaponImage, revolverWeaponImage, shotgunWeaponImage, familyBusinessWeaponImage, sodaPopperWeaponImage, forceANatureWeaponImage, magicianHatWeaponImage, musketWeaponImage, widowmakerWeaponImage, hornetRifleImage, hornetShotgunImage, egoWeaponSolemnVowBlackImage, egoWeaponSolemnVowWhiteImage, kaleidoscopeMuzzleImage, swordSharpenedImage, hypocrisyWeaponImage, crimsonScarGunImage, crimsonScarBladeImage, pinksWeaponImage, sodaWeaponImage, laetitiaWeaponImage) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.isCriticalActive(now)) {
            ctx.save();
            ctx.strokeStyle = '#ffd84d';
            ctx.lineWidth = 4;
            ctx.shadowColor = '#ffd84d';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius + 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        if (this.isUberActive(now)) {
            ctx.save();
            ctx.strokeStyle = '#6be3ff';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#6be3ff';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius + 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        if (this.airblastFlashUntil && now < this.airblastFlashUntil) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius + 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        if (this.deadRinger.has && deadRingerImage && deadRingerImage.complete && deadRingerImage.naturalWidth > 0) {
            const iconSize = 18;
            ctx.save();
            ctx.drawImage(deadRingerImage, this.pos.x - iconSize / 2, this.pos.y - this.radius - iconSize - 6, iconSize, iconSize);
            ctx.restore();
        }

        const drawHeldWeapon = (image, width, height, flipX = false) => {
            if (!image || !image.complete || image.naturalWidth <= 0) {
                return;
            }

            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.aimAngle);
            if (flipX) {
                ctx.scale(-1, 1);
                ctx.drawImage(image, -width + 6, -height / 2, width, height);
            } else {
                ctx.drawImage(image, -6, -height / 2, width, height);
            }
            ctx.restore();
        };


        if (this.weapon.type === 'egomagicbullet' && portalImage && portalImage.complete && portalImage.naturalWidth > 0) {
            const flicker = 0.86 + Math.sin(now / 90) * 0.12;
            const portalSize = 22;
            const offset = 20;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.aimAngle);
            ctx.globalAlpha = Math.max(0.2, Math.min(1, flicker));
            ctx.drawImage(portalImage, offset - portalSize / 2, -portalSize / 2, portalSize, portalSize);
            ctx.restore();
        }

        if (this.weapon.type === 'sniper' && sniperRifleImage && sniperRifleImage.complete && sniperRifleImage.naturalWidth > 0) {
            drawHeldWeapon(sniperRifleImage, 42, 18, true);
        } else if (this.weapon.type === 'machina' && machinaImage && machinaImage.complete && machinaImage.naturalWidth > 0) {
            drawHeldWeapon(machinaImage, 42, 18, true);
        } else if (this.weapon.type === 'huntsman' && huntsmanImage && huntsmanImage.complete && huntsmanImage.naturalWidth > 0) {
            drawHeldWeapon(huntsmanImage, 42, 18, true);
        } else if (this.weapon.type === 'crusaderscrossbow' && crusadersCrossbowImage && crusadersCrossbowImage.complete && crusadersCrossbowImage.naturalWidth > 0) {
            drawHeldWeapon(crusadersCrossbowImage, 42, 18, true);
        } else if (this.weapon.type === 'blutsauger' && blutsaugerImage && blutsaugerImage.complete && blutsaugerImage.naturalWidth > 0) {
            drawHeldWeapon(blutsaugerImage, 38, 15, true);
        } else if (this.weapon.type === 'shortcircuit' && shortCircuitImage && shortCircuitImage.complete && shortCircuitImage.naturalWidth > 0) {
            drawHeldWeapon(shortCircuitImage, 40, 16, true);
        } else if (this.weapon.type === 'rocketlauncher' && rocketLauncherImage && rocketLauncherImage.complete && rocketLauncherImage.naturalWidth > 0) {
            drawHeldWeapon(rocketLauncherImage, 44, 18, true);
        } else if (this.weapon.type === 'piplauncher' && pipLauncherImage && pipLauncherImage.complete && pipLauncherImage.naturalWidth > 0) {
            drawHeldWeapon(pipLauncherImage, 42, 18, true);
        } else if (this.weapon.type === 'beggersbazooka' && beggersBazookaImage && beggersBazookaImage.complete && beggersBazookaImage.naturalWidth > 0) {
            drawHeldWeapon(beggersBazookaImage, 44, 18, true);
        } else if ((this.weapon.type === 'directhit' || this.weapon.type === 'nearmissed') && directHitImage && directHitImage.complete && directHitImage.naturalWidth > 0) {
            drawHeldWeapon(directHitImage, 44, 18, true);
        } else if (this.weapon.type === 'rocketjumper' && rocketJumperImage && rocketJumperImage.complete && rocketJumperImage.naturalWidth > 0) {
            drawHeldWeapon(rocketJumperImage, 44, 18, true);
        } else if (this.weapon.type === 'yellowtarge' && yellowTargeImage && yellowTargeImage.complete && yellowTargeImage.naturalWidth > 0) {
            drawHeldWeapon(yellowTargeImage, 36, 36, true);
        } else if (this.weapon.type === 'medigun' && medigunImage && medigunImage.complete && medigunImage.naturalWidth > 0) {
            drawHeldWeapon(medigunImage, 44, 18, true);
        } else if (this.weapon.type === 'grenadelauncher' && grenadeLauncherImage && grenadeLauncherImage.complete && grenadeLauncherImage.naturalWidth > 0) {
            drawHeldWeapon(grenadeLauncherImage, 44, 18, true);
        } else if (this.weapon.type === 'lochnload' && lochnLoadImage && lochnLoadImage.complete && lochnLoadImage.naturalWidth > 0) {
            drawHeldWeapon(lochnLoadImage, 44, 18, true);
        } else if (this.weapon.type === 'faintaroma' && faintaromaWeaponImage && faintaromaWeaponImage.complete && faintaromaWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(faintaromaWeaponImage, 36, 16, true);
        } else if (this.weapon.type === 'hairspray' && hairsprayImage && hairsprayImage.complete && hairsprayImage.naturalWidth > 0) {
            drawHeldWeapon(hairsprayImage, 40, 18, false);
        } else if (this.weapon.type === 'adoration' && adorationWeaponImage && adorationWeaponImage.complete && adorationWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(adorationWeaponImage, 38, 16, true);
        } else if (this.weapon.type === 'flamethrower' && flamethrowerImage && flamethrowerImage.complete && flamethrowerImage.naturalWidth > 0) {
            drawHeldWeapon(flamethrowerImage, 44, 18, true);
        } else if (this.weapon.type === 'smg' && smgImage && smgImage.complete && smgImage.naturalWidth > 0) {
            drawHeldWeapon(smgImage, 40, 16, true);
        } else if (this.weapon.type === 'tommygun' && tommyGunImage && tommyGunImage.complete && tommyGunImage.naturalWidth > 0) {
            drawHeldWeapon(tommyGunImage, 42, 16, true);
        } else if (this.weapon.type === 'egomagicbullet' && egoWeaponMagicBulletImage && egoWeaponMagicBulletImage.complete && egoWeaponMagicBulletImage.naturalWidth > 0) {
            drawHeldWeapon(egoWeaponMagicBulletImage, 46, 18, true);
        } else if (this.weapon.type === 'egoloneliness' && egoWeaponLonelinessImage && egoWeaponLonelinessImage.complete && egoWeaponLonelinessImage.naturalWidth > 0) {
            drawHeldWeapon(egoWeaponLonelinessImage, 46, 18, true);
        } else if (this.weapon.type === 'egolovehate' && _egoWeaponLoveHateImage && _egoWeaponLoveHateImage.complete && _egoWeaponLoveHateImage.naturalWidth > 0) {
            drawHeldWeapon(_egoWeaponLoveHateImage, 46, 18, true);
        } else if (this.weapon.type === 'penitence' && egoWeaponPenitenceImage && egoWeaponPenitenceImage.complete && egoWeaponPenitenceImage.naturalWidth > 0) {
            const isSwinging = now < this.penitence.swingUntil;
            let swingOffset = 0;
            if (isSwinging) {
                const progress = Math.max(0, Math.min(1, (now - this.penitence.swingStartedAt) / W.penitence.SWING_ANIMATION_MS));
                const phase = progress < 0.5 ? (progress / 0.5) : ((1 - progress) / 0.5);
                const maxArc = Math.PI * 0.36;
                swingOffset = -maxArc + (phase * 2 * maxArc);
            }

            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.aimAngle + swingOffset);
            ctx.scale(-1, 1);
            ctx.drawImage(egoWeaponPenitenceImage, -42 + 8, -22 / 2, 42, 22);
            ctx.restore();
        } else if (this.weapon.type === 'paradiselost' && egoWeaponParadiseLostImage && egoWeaponParadiseLostImage.complete && egoWeaponParadiseLostImage.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.aimAngle);
            ctx.scale(-1, 1);
            ctx.globalAlpha = 0.88;
            ctx.filter = 'saturate(0.58) brightness(1.12) contrast(0.92)';
            ctx.drawImage(egoWeaponParadiseLostImage, -46 + 6, -18 / 2, 46, 18);
            ctx.restore();
        } else if (this.weapon.type === 'swordsharpened' && swordSharpenedImage && swordSharpenedImage.complete && swordSharpenedImage.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.aimAngle);
            ctx.drawImage(swordSharpenedImage, -40, -8, 40, 16);
            ctx.restore();
        } else if (this.weapon.type === 'hornet') {
            const hornetForm = this.weapon.activeForm || 'rifle';
            if (hornetForm === 'shotgun' && hornetShotgunImage && hornetShotgunImage.complete && hornetShotgunImage.naturalWidth > 0) {
                // Draw shotgun without flipping
                ctx.save();
                ctx.translate(this.pos.x, this.pos.y);
                ctx.rotate(this.aimAngle);
                ctx.drawImage(hornetShotgunImage, -6, -18 / 2, 44, 18);
                ctx.restore();
            } else if (hornetRifleImage && hornetRifleImage.complete && hornetRifleImage.naturalWidth > 0) {
                drawHeldWeapon(hornetRifleImage, 46, 18, true);
            }
        } else if (this.weapon.type === 'harmony' && egoWeaponHarmonyImage && egoWeaponHarmonyImage.complete && egoWeaponHarmonyImage.naturalWidth > 0) {
            drawHeldWeapon(egoWeaponHarmonyImage, 44, 18, true);
        } else if (this.weapon.type === 'solemnvow' && egoWeaponSolemnVowBlackImage && egoWeaponSolemnVowBlackImage.complete && egoWeaponSolemnVowBlackImage.naturalWidth > 0 && egoWeaponSolemnVowWhiteImage && egoWeaponSolemnVowWhiteImage.complete && egoWeaponSolemnVowWhiteImage.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.aimAngle);
            ctx.scale(-1, 1);

            // Black revolver (top)
            ctx.drawImage(egoWeaponSolemnVowBlackImage, -28, -26, 34, 24);

            // White revolver (bottom)
            ctx.drawImage(egoWeaponSolemnVowWhiteImage, -28, 2, 34, 24);

            ctx.restore();
        } else if (this.weapon.type === 'minigun' && minigunImage && minigunImage.complete && minigunImage.naturalWidth > 0) {
            drawHeldWeapon(minigunImage, 46, 18, false);
        } else if (this.weapon.type === 'pistol' && truePistolWeaponImage && truePistolWeaponImage.complete && truePistolWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(truePistolWeaponImage, 34, 14, true);
        } else if (this.weapon.type === 'revolver' && revolverWeaponImage && revolverWeaponImage.complete && revolverWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(revolverWeaponImage, 34, 14, true);
        } else if (this.weapon.type === 'shotgun' && shotgunWeaponImage && shotgunWeaponImage.complete && shotgunWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(shotgunWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'familybusiness' && familyBusinessWeaponImage && familyBusinessWeaponImage.complete && familyBusinessWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(familyBusinessWeaponImage, 42, 16, false);
        } else if (this.weapon.type === 'sodapopper' && sodaPopperWeaponImage && sodaPopperWeaponImage.complete && sodaPopperWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(sodaPopperWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'forceanature' && forceANatureWeaponImage && forceANatureWeaponImage.complete && forceANatureWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(forceANatureWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'magicianhat' && magicianHatWeaponImage && magicianHatWeaponImage.complete && magicianHatWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(magicianHatWeaponImage, 40, 24, true);
        } else if (this.weapon.type === 'musket' && musketWeaponImage && musketWeaponImage.complete && musketWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(musketWeaponImage, 48, 18, true);
        } else if (this.weapon.type === 'widowmaker' && widowmakerWeaponImage && widowmakerWeaponImage.complete && widowmakerWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(widowmakerWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'hypocrisy' && hypocrisyWeaponImage && hypocrisyWeaponImage.complete && hypocrisyWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(hypocrisyWeaponImage, 42, 18, true);
        } else if (this.weapon.type === 'crimsonscar') {
            const csForm = this.weapon.activeForm || 'gun';
            const csImg = csForm === 'blade' ? crimsonScarBladeImage : crimsonScarGunImage;
            if (csImg && csImg.complete && csImg.naturalWidth > 0) {
                drawHeldWeapon(csImg, 42, 18, true);
            }
        } else if (this.weapon.type === 'egopinks' && pinksWeaponImage && pinksWeaponImage.complete && pinksWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(pinksWeaponImage, 42, 18, true);
        } else if (this.weapon.type === 'egosoda' && sodaWeaponImage && sodaWeaponImage.complete && sodaWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(sodaWeaponImage, 32, 18, true);
        } else if (this.weapon.type === 'laetitia' && laetitiaWeaponImage && laetitiaWeaponImage.complete && laetitiaWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(laetitiaWeaponImage, 34, 18, true);
        }

        if (this.weapon.type === 'solemnvow' && this.solemnVow.muzzleFlashUntil && now < this.solemnVow.muzzleFlashUntil) {
            const flashLifeMs = W.solemnVow.MUZZLE_FLASH_MS;
            const flashProgress = 1 - Math.max(0, Math.min(1, (this.solemnVow.muzzleFlashUntil - now) / flashLifeMs));
            const flicker = 0.82 + Math.sin(now / 24) * 0.18;
            const muzzleDistance = 24;
            const muzzleX = this.pos.x + Math.cos(this.aimAngle) * muzzleDistance;
            const muzzleY = this.pos.y + Math.sin(this.aimAngle) * muzzleDistance;

            ctx.save();
            ctx.translate(muzzleX, muzzleY);
            ctx.rotate(this.aimAngle);
            ctx.globalAlpha = Math.max(0.1, 0.9 - flashProgress * 0.6) * flicker;
            ctx.globalCompositeOperation = 'lighter';

            if (kaleidoscopeMuzzleImage && kaleidoscopeMuzzleImage.complete && kaleidoscopeMuzzleImage.naturalWidth > 0) {
                const size = 26 + (1 - flashProgress) * 8;
                ctx.drawImage(kaleidoscopeMuzzleImage, -size / 2, -size / 2, size, size);
            } else {
                const burst = ctx.createRadialGradient(0, 0, 2, 0, 0, 20);
                burst.addColorStop(0, 'rgba(255,255,255,0.85)');
                burst.addColorStop(0.4, 'rgba(126,255,255,0.55)');
                burst.addColorStop(1, 'rgba(126,255,255,0)');
                ctx.fillStyle = burst;
                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        const hpRatio = this.hp / this.maxHP;
        ctx.strokeStyle = hpRatio > 0.66 ? '#00ff00' : hpRatio > 0.33 ? '#ffff00' : '#ff0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius + 4, 0, Math.PI * 2);
        ctx.stroke();
    }
}