import { Vector } from './vector.js';

export class Pickup {
    constructor(x, y, weaponType) {
        this.pos = new Vector(x, y);
        this.size = 14;
        this.weaponType = weaponType;
        if (weaponType === 'pistol') {
            this.color = '#ffff00';
        } else if (weaponType === 'revolver') {
            this.color = '#ffd84d';
        } else if (weaponType === 'shotgun') {
            this.color = '#ff6600';
        } else if (weaponType === 'familybusiness') {
            this.color = '#d78f49';
        } else if (weaponType === 'sodapopper') {
            this.color = '#9fe9ff';
        } else if (weaponType === 'forceanature') {
            this.color = '#b6f4ff';
        } else if (weaponType === 'musket') {
            this.color = '#f1e6cf';
        } else if (weaponType === 'magicianhat') {
            this.color = '#e8d9ff';
        } else if (weaponType === 'widowmaker') {
            this.color = '#ffb76b';
        } else if (weaponType === 'sniper') {
            this.color = '#66d9ff';
        } else if (weaponType === 'machina') {
            this.color = '#94ecff';
        } else if (weaponType === 'huntsman') {
            this.color = '#d0ff8a';
        } else if (weaponType === 'crusaderscrossbow') {
            this.color = '#95f85f';
        } else if (weaponType === 'smg') {
            this.color = '#b5ff66';
        } else if (weaponType === 'tommygun') {
            this.color = '#d4a35a';
        } else if (weaponType === 'egomagicbullet') {
            this.color = '#b575ff';
        } else if (weaponType === 'egoloneliness') {
            this.color = '#9f9f9f';
        } else if (weaponType === 'penitence') {
            this.color = '#4ad66d';
        } else if (weaponType === 'paradiselost') {
            this.color = '#ff5d5d';
        } else if (weaponType === 'harmony') {
            this.color = '#dcecff';
        } else if (weaponType === 'hornet') {
            this.color = '#ffd84a';
        } else if (weaponType === 'swordsharpened') {
            this.color = '#4da6ff';
        } else if (weaponType === 'solemnvow') {
            this.color = '#f2f2f2';
        } else if (weaponType === 'minigun') {
            this.color = '#f5d142';
        } else if (weaponType === 'blutsauger') {
            this.color = '#ff4d4d';
        } else if (weaponType === 'shortcircuit') {
            this.color = '#7df9ff';
        } else if (weaponType === 'rocketlauncher') {
            this.color = '#ff954d';
        } else if (weaponType === 'piplauncher') {
            this.color = '#7fd8ff';
        } else if (weaponType === 'beggersbazooka') {
            this.color = '#ffa66d';
        } else if (weaponType === 'directhit') {
            this.color = '#ff8f4f';
        } else if (weaponType === 'nearmissed') {
            this.color = '#ffb58a';
        } else if (weaponType === 'rocketjumper') {
            this.color = '#8fd8ff';
        } else if (weaponType === 'medigun') {
            this.color = '#ff6b7d';
        } else if (weaponType === 'yellowtarge') {
            this.color = '#ffd84d';
        } else if (weaponType === 'grenadelauncher') {
            this.color = '#85ff5e';
        } else if (weaponType === 'flamethrower') {
            this.color = '#ff8b3d';
        } else if (weaponType === 'ammoico') {
            this.color = '#8ae6ff';
        } else if (weaponType === 'healthico') {
            this.color = '#6cff7a';
        } else if (weaponType === 'ubercharge') {
            this.color = '#6be3ff';
        } else if (weaponType === 'critical') {
            this.color = '#ffd84d';
        } else if (weaponType === 'speed') {
            this.color = '#c58aff';
        } else if (weaponType === 'explosiveflask') {
            this.color = '#ffc977';
        } else if (weaponType === 'scrumpybottle') {
            this.color = '#f2bf54';
        } else if (weaponType === 'bombanomicron') {
            this.color = '#d96aff';
        } else if (weaponType === 'deadringer') {
            this.color = '#f2d06a';
        } else {
            this.color = '#d8b84f';
        }
    }

    collidesWith(ball) {
        const dx = ball.pos.x - this.pos.x;
        const dy = ball.pos.y - this.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < ball.radius + this.size + 15;
    }

    draw(ctx) {
        const pickupIcons = arguments[1] || {};
        const icon = this.weaponType === 'pistol'
            ? pickupIcons.pistol
            : this.weaponType === 'revolver'
                ? pickupIcons.revolver
            : this.weaponType === 'shotgun'
                ? pickupIcons.shotgun
                : this.weaponType === 'familybusiness'
                    ? pickupIcons.familybusiness || pickupIcons.shotgun
                : this.weaponType === 'sodapopper'
                    ? pickupIcons.sodapopper || pickupIcons.shotgun
                : this.weaponType === 'forceanature'
                    ? pickupIcons.forceanature || pickupIcons.sodapopper || pickupIcons.shotgun
                : this.weaponType === 'musket'
                    ? pickupIcons.musket || pickupIcons.forceanature || pickupIcons.shotgun
                : this.weaponType === 'magicianhat'
                    ? pickupIcons.magicianhat || pickupIcons.forceanature || pickupIcons.sodapopper
                : this.weaponType === 'widowmaker'
                    ? pickupIcons.widowmaker || pickupIcons.shotgun
                : this.weaponType === 'dealer'
                    ? pickupIcons.poker
                    : this.weaponType === 'sniper'
                        ? pickupIcons.sniper
                        : this.weaponType === 'machina'
                            ? pickupIcons.machina || pickupIcons.sniper
                        : this.weaponType === 'huntsman'
                            ? pickupIcons.huntsman
                        : this.weaponType === 'crusaderscrossbow'
                            ? pickupIcons.crusaderscrossbow || pickupIcons.huntsman
                        : this.weaponType === 'smg'
                            ? pickupIcons.smg
                        : this.weaponType === 'tommygun'
                            ? pickupIcons.tommygun || pickupIcons.smg
                        : this.weaponType === 'egomagicbullet'
                            ? pickupIcons.egomagicbullet || pickupIcons.tommygun || pickupIcons.smg
                        : this.weaponType === 'egoloneliness'
                            ? pickupIcons.egoloneliness || pickupIcons.revolver || pickupIcons.pistol
                        : this.weaponType === 'penitence'
                            ? pickupIcons.penitence || pickupIcons.egoloneliness || pickupIcons.revolver
                        : this.weaponType === 'paradiselost'
                            ? pickupIcons.paradiselost || pickupIcons.penitence || pickupIcons.revolver
                        : this.weaponType === 'harmony'
                            ? pickupIcons.harmony || pickupIcons.paradiselost || pickupIcons.solemnvow || pickupIcons.revolver
                        : this.weaponType === 'hornet'
                            ? pickupIcons.hornet || pickupIcons.sniper || pickupIcons.shotgun
                        : this.weaponType === 'swordsharpened'
                            ? pickupIcons.swordsharpened || pickupIcons.hornet || pickupIcons.sniper
                        : this.weaponType === 'solemnvow'
                            ? pickupIcons.solemnvow || pickupIcons.paradiselost || pickupIcons.revolver
                        : this.weaponType === 'minigun'
                            ? pickupIcons.minigun
                            : this.weaponType === 'blutsauger'
                                ? pickupIcons.blutsauger
                                : this.weaponType === 'ammoico'
                                    ? pickupIcons.ammoico
                                    : this.weaponType === 'healthico'
                                        ? pickupIcons.healthico
                                        : this.weaponType === 'shortcircuit'
                                            ? pickupIcons.shortcircuit
                                            : this.weaponType === 'rocketlauncher'
                                                ? pickupIcons.rocketlauncher
                                                : this.weaponType === 'piplauncher'
                                                    ? pickupIcons.piplauncher || pickupIcons.rocketlauncher
                                                : this.weaponType === 'beggersbazooka'
                                                    ? pickupIcons.beggersbazooka || pickupIcons.rocketlauncher
                                                : this.weaponType === 'directhit'
                                                    ? pickupIcons.directhit || pickupIcons.rocketlauncher
                                                    : this.weaponType === 'nearmissed'
                                                        ? pickupIcons.nearmissed || pickupIcons.directhit || pickupIcons.rocketlauncher
                                                    : this.weaponType === 'rocketjumper'
                                                        ? pickupIcons.rocketjumper || pickupIcons.rocketlauncher
                                                        : this.weaponType === 'medigun'
                                                            ? pickupIcons.medigun
                                                        : this.weaponType === 'yellowtarge'
                                                            ? pickupIcons.yellowtarge
                                                : this.weaponType === 'grenadelauncher'
                                                    ? pickupIcons.grenadelauncher
                                                : this.weaponType === 'flamethrower'
                                                    ? pickupIcons.flamethrower
                                            : this.weaponType === 'ubercharge'
                                                ? pickupIcons.ubercharge
                                                : this.weaponType === 'critical'
                                                    ? pickupIcons.critical
                                                    : this.weaponType === 'speed'
                                                        ? pickupIcons.speed
                                                        : this.weaponType === 'explosiveflask'
                                                            ? pickupIcons.explosiveflask || pickupIcons.scrumpybottle
                                                        : this.weaponType === 'scrumpybottle'
                                                            ? pickupIcons.scrumpybottle
                                                            : this.weaponType === 'bombanomicron'
                                                                ? pickupIcons.bombanomicron
                                                                : this.weaponType === 'deadringer'
                                                                    ? pickupIcons.deadringer
                            : null;

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
}