import {
    BALL_BASE_SPEED,
    BALL_MAX_HP,
    BALL_MIN_SPEED,
    CRITICAL_DAMAGE_MULTIPLIER,
    DEAD_RINGER_DAMAGE_REDUCTION,
    DEAD_RINGER_DURATION_MS,
    DEAD_RINGER_HEAL_MAX_HP_RATIO,
    DEAD_RINGER_PICKUP_COOLDOWN_MS,
    DEAD_RINGER_SPEED_BOOST,
    FLAMETHROWER_AFTERBURN_DAMAGE_MAX,
    FLAMETHROWER_AFTERBURN_DAMAGE_MIN,
    FLAMETHROWER_AFTERBURN_DURATION_MS,
    FLAMETHROWER_AFTERBURN_INTERVAL_MS,
    CRITICAL_DURATION_MS,
    CRITICAL_HEAL_PER_SEC,
    EXPLOSIVE_FLASK_PICKUP_DAMAGE_MULTIPLIER,
    EXPLOSIVE_FLASK_PIP_DAMAGE_MULTIPLIER,
    PICKUP_DELAY_MS,
    REACTION_DELAY_MS,
    SPEED_BOOST_PERMANENT,
    SCRUMPY_DAMAGE_REDUCTION,
    SODA_POPPER_CHARGE_DAMAGE_REQUIRED,
    SODA_POPPER_HYPE_DAMAGE_MULTIPLIER,
    SODA_POPPER_HYPE_DURATION_MS,
    SODA_POPPER_HYPE_SPEED_BOOST,
    UBERCHARGE_DURATION_MS,
    UBERCHARGE_HEAL_PER_SEC,
    YELLOW_TARGE_DAMAGE_REDUCTION_ALL,
    YELLOW_TARGE_DAMAGE_REDUCTION_EXPLOSIVE
} from './constants.js';
import { PhysicsEngine } from './physics.js';
import { Vector } from './vector.js';
import { Weapon } from './weapon.js';

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
            damageMin: FLAMETHROWER_AFTERBURN_DAMAGE_MIN,
            damageMax: FLAMETHROWER_AFTERBURN_DAMAGE_MAX,
            intervalMs: FLAMETHROWER_AFTERBURN_INTERVAL_MS
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

        this.nextPipFlaskAt = 0;
    }

    update(otherBalls) {
        const hpRatio = this.hp / this.maxHP;
        const now = Date.now();
        const flaskSlow = now < this.explosiveFlask.slowUntil ? this.explosiveFlask.slowMultiplier : 1;
        const speed = Math.max(this.minSpeed, this.maxSpeed * hpRatio * flaskSlow);

        if (this.vel.magnitude() === 0) {
            this.vel = new Vector(1, 0).multiply(speed);
        } else {
            this.vel.normalize().multiply(speed);
        }

        const movement = this.vel.clone().add(this.impulseVel);
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

        this.nextShootAllowedAt = Date.now() + this.pickupDelayMs;
    }

    takeDamage(amount, damageType = 'generic', sourceWeaponType = null) {
        let adjusted = amount;
        const now = Date.now();

        if (now < this.explosiveFlask.pickupVulnUntil) {
            adjusted *= EXPLOSIVE_FLASK_PICKUP_DAMAGE_MULTIPLIER;
            damageType = 'explosive';
        }

        if (sourceWeaponType === 'piplauncher' && now < this.explosiveFlask.pipVulnUntil) {
            adjusted *= EXPLOSIVE_FLASK_PIP_DAMAGE_MULTIPLIER;
        }

        if (adjusted > 0 && this.deadRinger.has && now >= this.deadRinger.activeUntil) {
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

        if (now < this.deadRinger.activeUntil) {
            adjusted *= (1 - DEAD_RINGER_DAMAGE_REDUCTION);
        }

        if (this.weapon.type === 'yellowtarge') {
            const reduction = damageType === 'explosive'
                ? YELLOW_TARGE_DAMAGE_REDUCTION_EXPLOSIVE
                : YELLOW_TARGE_DAMAGE_REDUCTION_ALL;
            adjusted *= (1 - reduction);
        }

        if (now < this.effectTimers.scrumpyResistUntil) {
            adjusted *= (1 - SCRUMPY_DAMAGE_REDUCTION);
        }

        if (adjusted > 0) {
            this.lastDamagedAt = now;
            this.medigunState.selfRegenAnchorHp = this.hp - adjusted;
        }

        this.hp = Math.max(0, this.hp - adjusted);
    }

    heal(amount) {
        this.hp = Math.min(this.maxHP, this.hp + amount);
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
        const until = now + durationMs;
        this.explosiveFlask.slowUntil = Math.max(this.explosiveFlask.slowUntil, until);
        this.explosiveFlask.slowMultiplier = Math.min(this.explosiveFlask.slowMultiplier, slowMultiplier);

        if (fromPickup) {
            this.explosiveFlask.pickupVulnUntil = Math.max(this.explosiveFlask.pickupVulnUntil, until);
        } else {
            this.explosiveFlask.pipVulnUntil = Math.max(this.explosiveFlask.pipVulnUntil, until);
        }
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

    applyAfterburn(now, durationMs = FLAMETHROWER_AFTERBURN_DURATION_MS, damageMin = FLAMETHROWER_AFTERBURN_DAMAGE_MIN, damageMax = FLAMETHROWER_AFTERBURN_DAMAGE_MAX, intervalMs = FLAMETHROWER_AFTERBURN_INTERVAL_MS) {
        this.afterburn.until = Math.max(this.afterburn.until, now + durationMs);
        this.afterburn.damageMin = damageMin;
        this.afterburn.damageMax = damageMax;
        this.afterburn.intervalMs = intervalMs;
        if (this.afterburn.nextTickAt <= now) {
            this.afterburn.nextTickAt = now + intervalMs;
        }
    }

    applyImpulse(vector) {
        this.impulseVel.add(vector);
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

    registerSodaPopperDamage(amount, now = Date.now()) {
        const dealt = Math.max(0, amount || 0);
        if (dealt <= 0) return;

        this.sodaPopper.chargeDamage += dealt;
        while (this.sodaPopper.chargeDamage >= SODA_POPPER_CHARGE_DAMAGE_REQUIRED) {
            this.sodaPopper.chargeDamage -= SODA_POPPER_CHARGE_DAMAGE_REQUIRED;
            this.activateSodaPopperHype(now);
        }
    }

    activateSodaPopperHype(now = Date.now()) {
        this.sodaPopper.hypeUntil = now + SODA_POPPER_HYPE_DURATION_MS;

        if (this.sodaPopper.speedBoostApplied <= 0) {
            this.sodaPopper.speedBoostApplied = SODA_POPPER_HYPE_SPEED_BOOST;
            this.maxSpeed += SODA_POPPER_HYPE_SPEED_BOOST;
            this.minSpeed += SODA_POPPER_HYPE_SPEED_BOOST * 0.2;
        }
    }

    getDamageMultiplier(now) {
        let multiplier = this.isCriticalActive(now) ? CRITICAL_DAMAGE_MULTIPLIER : 1;
        if (now < this.sodaPopper.hypeUntil) {
            multiplier *= SODA_POPPER_HYPE_DAMAGE_MULTIPLIER;
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

        while (this.afterburn.nextTickAt > 0 && this.afterburn.nextTickAt <= now && this.afterburn.nextTickAt <= this.afterburn.until && this.isAlive()) {
            if (!this.isUberActive(now)) {
                const burnDamage = Math.floor(Math.random() * (this.afterburn.damageMax - this.afterburn.damageMin + 1)) + this.afterburn.damageMin;
                this.takeDamage(burnDamage, 'fire');
            }
            this.afterburn.nextTickAt += this.afterburn.intervalMs;
        }

        if (now > this.afterburn.until) {
            this.afterburn.nextTickAt = 0;
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
    }

    isAlive() {
        return this.hp > 0;
    }

    draw(ctx, now, sniperRifleImage, machinaImage, huntsmanImage, crusadersCrossbowImage, smgImage, minigunImage, blutsaugerImage, shortCircuitImage, rocketLauncherImage, pipLauncherImage, beggersBazookaImage, directHitImage, rocketJumperImage, yellowTargeImage, medigunImage, grenadeLauncherImage, flamethrowerImage, deadRingerImage, truePistolWeaponImage, revolverWeaponImage, shotgunWeaponImage, sodaPopperWeaponImage, forceANatureWeaponImage, magicianHatWeaponImage, widowmakerWeaponImage) {
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
        } else if (this.weapon.type === 'directhit' && directHitImage && directHitImage.complete && directHitImage.naturalWidth > 0) {
            drawHeldWeapon(directHitImage, 44, 18, true);
        } else if (this.weapon.type === 'rocketjumper' && rocketJumperImage && rocketJumperImage.complete && rocketJumperImage.naturalWidth > 0) {
            drawHeldWeapon(rocketJumperImage, 44, 18, true);
        } else if (this.weapon.type === 'yellowtarge' && yellowTargeImage && yellowTargeImage.complete && yellowTargeImage.naturalWidth > 0) {
            drawHeldWeapon(yellowTargeImage, 36, 36, true);
        } else if (this.weapon.type === 'medigun' && medigunImage && medigunImage.complete && medigunImage.naturalWidth > 0) {
            drawHeldWeapon(medigunImage, 44, 18, true);
        } else if (this.weapon.type === 'grenadelauncher' && grenadeLauncherImage && grenadeLauncherImage.complete && grenadeLauncherImage.naturalWidth > 0) {
            drawHeldWeapon(grenadeLauncherImage, 44, 18, true);
        } else if (this.weapon.type === 'flamethrower' && flamethrowerImage && flamethrowerImage.complete && flamethrowerImage.naturalWidth > 0) {
            drawHeldWeapon(flamethrowerImage, 44, 18, true);
        } else if (this.weapon.type === 'smg' && smgImage && smgImage.complete && smgImage.naturalWidth > 0) {
            drawHeldWeapon(smgImage, 40, 16, true);
        } else if (this.weapon.type === 'minigun' && minigunImage && minigunImage.complete && minigunImage.naturalWidth > 0) {
            drawHeldWeapon(minigunImage, 46, 18, false);
        } else if (this.weapon.type === 'pistol' && truePistolWeaponImage && truePistolWeaponImage.complete && truePistolWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(truePistolWeaponImage, 34, 14, true);
        } else if (this.weapon.type === 'revolver' && revolverWeaponImage && revolverWeaponImage.complete && revolverWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(revolverWeaponImage, 34, 14, true);
        } else if (this.weapon.type === 'shotgun' && shotgunWeaponImage && shotgunWeaponImage.complete && shotgunWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(shotgunWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'sodapopper' && sodaPopperWeaponImage && sodaPopperWeaponImage.complete && sodaPopperWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(sodaPopperWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'forceanature' && forceANatureWeaponImage && forceANatureWeaponImage.complete && forceANatureWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(forceANatureWeaponImage, 42, 16, true);
        } else if (this.weapon.type === 'magicianhat' && magicianHatWeaponImage && magicianHatWeaponImage.complete && magicianHatWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(magicianHatWeaponImage, 40, 24, true);
        } else if (this.weapon.type === 'widowmaker' && widowmakerWeaponImage && widowmakerWeaponImage.complete && widowmakerWeaponImage.naturalWidth > 0) {
            drawHeldWeapon(widowmakerWeaponImage, 42, 16, true);
        }

        const hpRatio = this.hp / this.maxHP;
        ctx.strokeStyle = hpRatio > 0.66 ? '#00ff00' : hpRatio > 0.33 ? '#ffff00' : '#ff0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius + 4, 0, Math.PI * 2);
        ctx.stroke();
    }
}