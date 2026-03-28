import { Deck, evaluatePokerHand } from './cards.js';
import { Projectile } from './projectile.js';

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
