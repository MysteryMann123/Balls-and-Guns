import {
    DROP_UTILITY_TYPES,
    DROP_WEAPON_TYPES,
} from './gameConfig.js';
import {
    AMMO_CRATE_DOUBLE_SHOT_MS,
    DEAD_RINGER_PICKUP_COOLDOWN_MS,
    HEALTHICO_HEAL,
    HEALTHICO_REGEN_DURATION_MS,
    HEALTHICO_REGEN_INTERVAL_MS,
    HEALTHICO_REGEN_PER_TICK,
} from './pickupConstants.js';
import { DealerWeapon } from './weapons/dealer.js';
import { Pickup } from './pickup.js';

export function updatePickups(game) {
    for (let i = game.pickups.length - 1; i >= 0; i--) {
        const pickup = game.pickups[i];
        let consumed = false;

        for (const ball of game.balls) {
            if (!ball.isAlive()) continue;
            if (pickup.collidesWith(ball)) {
                if (pickup.weaponType === 'ammoico') {
                    if (ball.weapon.ammo !== Infinity) {
                        ball.weapon.ammo = ball.weapon.maxAmmo;
                        if (ball.weapon.type === 'minigun') {
                            ball.weapon.currentFireRate = ball.weapon.fireRate;
                        }
                    }
                    ball.ammoCrateDoubleShotUntil = Date.now() + AMMO_CRATE_DOUBLE_SHOT_MS;
                } else if (pickup.weaponType === 'healthico') {
                    ball.heal(HEALTHICO_HEAL);
                    ball.applyHealthRegen(Date.now(), HEALTHICO_REGEN_PER_TICK, HEALTHICO_REGEN_DURATION_MS, HEALTHICO_REGEN_INTERVAL_MS);
                } else if (pickup.weaponType === 'ubercharge') {
                    ball.applyUbercharge(Date.now());
                } else if (pickup.weaponType === 'critical') {
                    ball.applyCritical(Date.now());
                } else if (pickup.weaponType === 'speed') {
                    ball.applySpeedBoost();
                } else if (pickup.weaponType === 'scrumpybottle') {
                    const enemies = game.balls.filter(candidate => candidate.isAlive() && candidate.id !== ball.id && game.areEnemies(ball, candidate));
                    if (enemies.length > 0) {
                        const target = game.findNearest(ball, enemies);
                        ball.aimAngle = Math.atan2(target.pos.y - ball.pos.y, target.pos.x - ball.pos.x);
                        game.throwScrumpyBottle(ball, target, Date.now());
                    }
                } else if (pickup.weaponType === 'explosiveflask') {
                    const enemies = game.balls.filter(candidate => candidate.isAlive() && candidate.id !== ball.id && game.areEnemies(ball, candidate));
                    if (enemies.length > 0) {
                        const target = game.findNearest(ball, enemies);
                        ball.aimAngle = Math.atan2(target.pos.y - ball.pos.y, target.pos.x - ball.pos.x);
                        game.throwExplosiveFlask(ball, target, Date.now(), true);
                    }
                } else if (pickup.weaponType === 'bombanomicron') {
                    game.launchBombanomicron(ball, Date.now());
                } else if (pickup.weaponType === 'deadringer') {
                    const pickupNow = Date.now();
                    if (ball.giveDeadRinger(pickupNow)) {
                        ball.deadRinger.pickupAvailableAt = pickupNow + DEAD_RINGER_PICKUP_COOLDOWN_MS;
                    } else {
                        continue;
                    }
                } else {
                    ball.equipWeapon(pickup.weaponType);
                    if (pickup.weaponType === 'dealer') {
                        ball.dealerWeaponState = new DealerWeapon();
                    }
                }
                game.pickups.splice(i, 1);
                consumed = true;
                break;
            }
        }

        if (consumed) continue;
    }
}

export function spawnPickups(game, now) {
    if (!game.settings.allowWeaponDrops && !game.settings.allowUtilityDrops) {
        return;
    }

    if (now - game.lastPickupSpawn < game.pickupSpawnRate) return;

    const x = Math.random() * (game.canvas.width - 80) + 40;
    const y = Math.random() * (game.canvas.height - 80) + 40;
    const weaponType = rollRandomDropType(game);
    if (!weaponType) return;

    game.pickups.push(new Pickup(x, y, weaponType));
    game.lastDropType = weaponType;
    game.lastPickupSpawn = now;
}

export function rollRandomDropType(game) {
    let allowedTypes = [];
    if (game.settings.allowWeaponDrops) {
        allowedTypes = allowedTypes.concat(DROP_WEAPON_TYPES);
    }
    if (game.settings.allowUtilityDrops) {
        allowedTypes = allowedTypes.concat(DROP_UTILITY_TYPES);
    }

    const allowedSet = new Set(allowedTypes);
    const entries = Object.entries(game.dropWeights).filter(([type]) => allowedSet.has(type));
    if (entries.length === 0) {
        return null;
    }

    const filteredEntries = entries.filter(([type]) => type !== game.lastDropType);
    const pool = filteredEntries.length > 0 ? filteredEntries : entries;

    let totalWeight = 0;
    for (const [, weight] of pool) {
        totalWeight += weight;
    }

    let roll = Math.random() * totalWeight;
    for (const [type, weight] of pool) {
        roll -= weight;
        if (roll <= 0) {
            return type;
        }
    }

    return pool[pool.length - 1][0];
}
