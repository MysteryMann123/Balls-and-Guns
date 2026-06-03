import { Deck, evaluatePokerHand } from '../cards.js';
import { Projectile } from '../projectile.js';

// --- Timing ---
const drawIntervalMs  = 500;

// --- Hand Damage Table ---
const handDamageTable = {
    'Straight Flush': { value: 200, multiplier: 8 },
    'Four of a Kind': { value: 120, multiplier: 7 },
    'Full House':     { value: 80,  multiplier: 4 },
    'Flush':          { value: 70,  multiplier: 4 },
    'Straight':       { value: 60,  multiplier: 4 },
    'Three of a Kind':{ value: 60,  multiplier: 3 },
    'Two Pair':       { value: 40,  multiplier: 2 },
    'Pair':           { value: 20,  multiplier: 2 },
    'High Card':      { value: 10,  multiplier: 1 },
};

// --- Config ---
const maxAmmo        = Infinity;
const reloadMs       = 0;
const damage         = 0;
const speed          = 5.2;
const color          = '#ffffff';
const projectileSize = 6;
const pelletsPerShot = 5;
const spreadAngle    = 0.08;

const dealer = {
    // Timing
    DRAW_INTERVAL_MS:  drawIntervalMs,
    HAND_DAMAGE_TABLE: handDamageTable,

    // Config
    MAX_AMMO:          maxAmmo,
    RELOAD_MS:         reloadMs,
    DAMAGE:            damage,
    SPEED:             speed,
    COLOR:             color,
    PROJECTILE_SIZE:   projectileSize,
    PELLETS_PER_SHOT:  pelletsPerShot,
    SPREAD_ANGLE:      spreadAngle,
    image: 'assets/Poker.jpg',
    DISPLAY_NAME:      'DEALER',

    CONFIG: {
        maxAmmo,
        reloadTimeMs: reloadMs,
        damage,
        speed,
        fireRate: 0,
        color,
        projectileSize,
        pelletsPerShot,
        spreadAngle,
    },

    getInfo() {
        return 'DEALER';
    },
};

export default dealer;

export class DealerWeapon {
    constructor() {
        this.deck = new Deck();
        this.lastHandCards = [];
        this.lastHandResult = null;
    }

    fire(shooter, enemies, projectiles) {
        if (!shooter || enemies.length === 0) return;

        const hand = this.deck.draw(5);
        if (hand.length === 0) return;

        const result = evaluatePokerHand(hand);

        this.lastHandCards = hand;
        this.lastHandResult = result;

        const target = this.findNearestTarget(shooter, enemies);
        if (!target) return;

        const baseAngle = Math.atan2(target.pos.y - shooter.pos.y, target.pos.x - shooter.pos.x);
        const spacing = 0.08;

        for (let i = 0; i < hand.length; i++) {
            const card = hand[i];
            const offset = (i - (hand.length - 1) / 2) * spacing;
            const angle = baseAngle + offset;

            projectiles.push(
                new Projectile({
                    x: shooter.pos.x,
                    y: shooter.pos.y,
                    targetX: shooter.pos.x + Math.cos(angle) * 900,
                    targetY: shooter.pos.y + Math.sin(angle) * 900,
                    speed: 5.2,
                    damage: result.damagePerCard,
                    color: card.color,
                    size: 6,
                    ownerId: shooter.id,
                    type: 'card',
                    label: card.label
                })
            );
        }
    }

    findNearestTarget(shooter, enemies) {
        let nearest = null;
        let bestDist = Infinity;

        for (const enemy of enemies) {
            const dx = enemy.pos.x - shooter.pos.x;
            const dy = enemy.pos.y - shooter.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < bestDist) {
                bestDist = dist;
                nearest = enemy;
            }
        }

        return nearest;
    }

    getStatusText() {
        if (!this.lastHandResult || this.lastHandCards.length === 0) {
            return `Deck: ${this.deck.remaining()} cards | waiting for first draw...`;
        }

        const cardsText = this.lastHandCards.map(card => card.label).join(' ');
        return `${this.lastHandResult.handName} [${cardsText}] | ${this.lastHandResult.value} x ${this.lastHandResult.multiplier} = ${this.lastHandResult.damagePerCard} dmg/card | deck left: ${this.deck.remaining()}`;
    }

    isExhausted() {
        return this.deck.remaining() === 0;
    }
}
