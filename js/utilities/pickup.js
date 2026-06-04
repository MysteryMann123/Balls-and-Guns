import { Vector } from '../core/vector.js';
import { ITEM_COLORS } from './items/index.js';

// Weapon colors (extracted from original if/else chain)
const WEAPON_COLORS = {
    pistol: '#ffff00',
    revolver: '#ffd84d',
    shotgun: '#ff6600',
    familybusiness: '#d78f49',
    sodapopper: '#9fe9ff',
    forceanature: '#b6f4ff',
    musket: '#f1e6cf',
    magicianhat: '#e8d9ff',
    widowmaker: '#ffb76b',
    sniper: '#66d9ff',
    machina: '#94ecff',
    huntsman: '#d0ff8a',
    crusaderscrossbow: '#95f85f',
    smg: '#b5ff66',
    tommygun: '#d4a35a',
    egomagicbullet: '#b575ff',
    egoloneliness: '#9f9f9f',
    penitence: '#4ad66d',
    paradiselost: '#ff5d5d',
    harmony: '#dcecff',
    hornet: '#ffd84a',
    swordsharpened: '#4da6ff',
    solemnvow: '#f2f2f2',
    minigun: '#f5d142',
    blutsauger: '#ff4d4d',
    shortcircuit: '#7df9ff',
    rocketlauncher: '#ff954d',
    piplauncher: '#7fd8ff',
    beggersbazooka: '#ffa66d',
    directhit: '#ff8f4f',
    nearmissed: '#ffb58a',
    rocketjumper: '#8fd8ff',
    medigun: '#ff6b7d',
    yellowtarge: '#ffd84d',
    grenadelauncher: '#85ff5e',
    lochnload: '#85ff5e',
    faintaroma: '#ffc977',
    hairspray: '#ff69b4',
    adoration: '#ff69b4',
    flamethrower: '#ff8b3d',
    hypocrisy: '#ff69b4',
    crimsonscar: '#cc2222',
    egopinks: '#ff85c2',
    egosoda: '#ffffff',
    laetitia: '#ffffff',
    egolovehate: '#ff69b4',
    soundofstar: '#a8a8a8',
    dealer: '#ffffff',
};

// Weapon icon fallback chains (extracted from original nested ternary)
const WEAPON_ICON_FALLBACKS = {
    familybusiness: ['familybusiness', 'shotgun'],
    sodapopper: ['sodapopper', 'shotgun'],
    forceanature: ['forceanature', 'sodapopper', 'shotgun'],
    musket: ['musket', 'forceanature', 'shotgun'],
    magicianhat: ['magicianhat', 'forceanature', 'sodapopper'],
    sniper: ['sniper'],
    machina: ['machina', 'sniper'],
    huntsman: ['huntsman'],
    crusaderscrossbow: ['crusaderscrossbow', 'huntsman'],
    tommygun: ['tommygun', 'smg'],
    egomagicbullet: ['egomagicbullet', 'tommygun', 'smg'],
    egoloneliness: ['egoloneliness', 'revolver', 'pistol'],
    penitence: ['penitence', 'egoloneliness', 'revolver'],
    paradiselost: ['paradiselost', 'penitence', 'revolver'],
    harmony: ['harmony', 'paradiselost', 'solemnvow', 'revolver'],
    hornet: ['hornet', 'sniper', 'shotgun'],
    swordsharpened: ['swordsharpened', 'hornet', 'sniper'],
    solemnvow: ['solemnvow', 'paradiselost', 'revolver'],
    piplauncher: ['piplauncher', 'rocketlauncher'],
    beggersbazooka: ['beggersbazooka', 'rocketlauncher'],
    directhit: ['directhit', 'rocketlauncher'],
    nearmissed: ['nearmissed', 'directhit', 'rocketlauncher'],
    rocketjumper: ['rocketjumper', 'rocketlauncher'],
};

export class Pickup {
    constructor(x, y, weaponType) {
        this.pos = new Vector(x, y);
        this.size = 14;
        this.weaponType = weaponType;

        // REFACTORED: Unified color lookup (utilities first, then weapons, then default)
        this.color = ITEM_COLORS[weaponType] || WEAPON_COLORS[weaponType] || '#d8b84f';
    }

    collidesWith(ball) {
        const dx = ball.pos.x - this.pos.x;
        const dy = ball.pos.y - this.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < ball.radius + this.size + 15;
    }

    draw(ctx, pickupIcons) {
        // REFACTORED: Use helper method instead of nested ternary
        const icon = this._getIcon(pickupIcons);

        if (icon && icon.complete && icon.naturalWidth > 0) {
            const diameter = (this.size + 5) * 2;
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size + 5, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(icon, this.pos.x - diameter / 2, this.pos.y - diameter / 2, diameter, diameter);
            ctx.restore();

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size + 5, 0, Math.PI * 2);
            ctx.stroke();
            return;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size + 5, 0, Math.PI * 2);
        ctx.stroke();
    }

    _getIcon(pickupIcons) {
        // Try fallback chain if defined
        const fallbacks = WEAPON_ICON_FALLBACKS[this.weaponType];
        if (fallbacks) {
            for (const key of fallbacks) {
                if (pickupIcons[key]) return pickupIcons[key];
            }
        }
        // Try direct lookup
        if (pickupIcons[this.weaponType]) return pickupIcons[this.weaponType];
        return null;
    }
}
