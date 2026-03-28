import { HAND_DAMAGE_TABLE } from './constants.js';

const SUITS = [
    { key: 'S', symbol: '♠', color: '#111' },
    { key: 'H', symbol: '♥', color: '#cc0000' },
    { key: 'D', symbol: '♦', color: '#cc0000' },
    { key: 'C', symbol: '♣', color: '#111' }
];

const RANKS = [
    { key: '2', value: 2 }, { key: '3', value: 3 }, { key: '4', value: 4 }, { key: '5', value: 5 },
    { key: '6', value: 6 }, { key: '7', value: 7 }, { key: '8', value: 8 }, { key: '9', value: 9 },
    { key: '10', value: 10 }, { key: 'J', value: 11 }, { key: 'Q', value: 12 }, { key: 'K', value: 13 }, { key: 'A', value: 14 }
];

export class Deck {
    constructor() {
        this.cards = [];
        this.discarded = [];
        this.reset();
    }

    reset() {
        this.cards = [];
        this.discarded = [];
        for (const suit of SUITS) {
            for (const rank of RANKS) {
                this.cards.push({
                    rank: rank.key,
                    value: rank.value,
                    suit: suit.key,
                    suitSymbol: suit.symbol,
                    color: suit.color,
                    label: `${rank.key}${suit.symbol}`
                });
            }
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(count) {
        const drawn = [];
        const actualCount = Math.min(count, this.cards.length);

        for (let i = 0; i < actualCount; i++) {
            const card = this.cards.pop();
            drawn.push(card);
            this.discarded.push(card);
        }
        return drawn;
    }

    remaining() {
        return this.cards.length;
    }
}

function isStraight(valuesDesc) {
    const unique = [...new Set(valuesDesc)].sort((a, b) => b - a);
    if (unique.length !== 5) return false;

    let isNormalStraight = true;
    for (let i = 0; i < unique.length - 1; i++) {
        if (unique[i] - unique[i + 1] !== 1) {
            isNormalStraight = false;
            break;
        }
    }

    if (isNormalStraight) return true;

    const aceLow = [14, 5, 4, 3, 2];
    return unique.every((value, idx) => value === aceLow[idx]);
}

export function evaluatePokerHand(cards) {
    const values = cards.map(card => card.value).sort((a, b) => b - a);
    const suits = cards.map(card => card.suit);

    const rankCounts = new Map();
    for (const value of values) {
        rankCounts.set(value, (rankCounts.get(value) || 0) + 1);
    }

    const counts = [...rankCounts.values()].sort((a, b) => b - a);
    const flush = suits.every(s => s === suits[0]);
    const straight = isStraight(values);

    let handName = 'High Card';

    if (straight && flush) handName = 'Straight Flush';
    else if (counts[0] === 4) handName = 'Four of a Kind';
    else if (counts[0] === 3 && counts[1] === 2) handName = 'Full House';
    else if (flush) handName = 'Flush';
    else if (straight) handName = 'Straight';
    else if (counts[0] === 3) handName = 'Three of a Kind';
    else if (counts[0] === 2 && counts[1] === 2) handName = 'Two Pair';
    else if (counts[0] === 2) handName = 'Pair';

    const table = HAND_DAMAGE_TABLE[handName];
    return {
        handName,
        value: table.value,
        multiplier: table.multiplier,
        damagePerCard: table.value * table.multiplier
    };
}