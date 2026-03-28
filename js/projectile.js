import { Vector } from './vector.js';

export class Projectile {
    constructor({ x, y, targetX, targetY, speed, damage, color, size, ownerId, type = 'bullet', label = '', ...extra }) {
        this.pos = new Vector(x, y);
        this.damage = damage;
        this.color = color;
        this.size = size;
        this.ownerId = ownerId;
        this.type = type;
        this.label = label;
        this.distanceTraveled = 0;
        Object.assign(this, extra);

        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.vel = new Vector((dx / distance) * speed, (dy / distance) * speed);
            this.rotation = Math.atan2(this.vel.y, this.vel.x);
        } else {
            this.vel = new Vector(speed, 0);
            this.rotation = 0;
        }

        if (!this.maxTravelDistance) {
            this.maxTravelDistance = Math.max(1, distance);
        }
    }

    update() {
        if (this.type === 'shotgunray' || this.type === 'machinaray') {
            return;
        }

        if (this.type === 'huntsman' && this.stuckToBallId) {
            return;
        }

        this.prevPos = this.pos.clone();

        if (this.type === 'grenadelauncher') {
            this.rotation += this.angularVelocity || 0;
            this.vel.y += this.gravity || 0;
            this.vel.x *= this.drag || 1;
        }

        this.distanceTraveled += Math.hypot(this.vel.x, this.vel.y);
        this.pos.add(this.vel);
    }

    draw(ctx, pistolImage, syringeImage, rocketImage, grenadeImage, arrowImage, crusadersCrossbowProjectileImage, explosiveFlaskImage, bottleImage, bunnyImage) {
        if (this.type === 'huntsman' || this.type === 'crusaderscrossbow' || this.type === 'piplauncher') {
            if (!this.stuckToBallId) {
                const velX = this.vel ? this.vel.x : Math.cos(this.rotation);
                const velY = this.vel ? this.vel.y : Math.sin(this.rotation);
                const speed = Math.hypot(velX, velY) || 1;
                const dirX = velX / speed;
                const dirY = velY / speed;
                const travelRatio = Math.max(0, Math.min(1, (this.distanceTraveled || 0) / (this.maxTravelDistance || 1)));
                const tailLength = 24 + 30 * travelRatio;
                const tailX = this.pos.x - dirX * tailLength;
                const tailY = this.pos.y - dirY * tailLength;
                const outerAlpha = 0.78 - travelRatio * 0.58;
                const innerAlpha = 0.54 - travelRatio * 0.42;

                ctx.save();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2.8;
                ctx.globalAlpha = Math.max(0.14, outerAlpha);
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(this.pos.x, this.pos.y);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.25;
                ctx.globalAlpha = Math.max(0.08, innerAlpha);
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(this.pos.x, this.pos.y);
                ctx.stroke();
                ctx.restore();
            }

            const projectileImage = this.type === 'crusaderscrossbow'
                ? crusadersCrossbowProjectileImage
                : this.type === 'huntsman'
                    ? arrowImage
                    : null;

            if (projectileImage && projectileImage.complete && projectileImage.naturalWidth > 0) {
                const spriteWidth = 30;
                const spriteHeight = 8;
                ctx.save();
                ctx.translate(this.pos.x, this.pos.y);
                ctx.rotate(this.rotation);
                ctx.drawImage(projectileImage, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
                ctx.restore();
                return;
            }
        }

        if (this.type === 'shotgunray') {
            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.tracerWidth || 2.5;
            ctx.globalAlpha = 0.9;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.endX, this.endY);
            ctx.stroke();

            ctx.strokeStyle = '#fff3c9';
            ctx.lineWidth = Math.max(1, (this.tracerWidth || 2.5) * 0.45);
            ctx.globalAlpha = 0.65;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.endX, this.endY);
            ctx.stroke();
            ctx.restore();
            return;
        }

        if (this.type === 'machinaray') {
            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.tracerWidth || 4.2;
            ctx.globalAlpha = 0.94;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.endX, this.endY);
            ctx.stroke();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = Math.max(1.4, (this.tracerWidth || 4.2) * 0.38);
            ctx.globalAlpha = 0.72;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.endX, this.endY);
            ctx.stroke();
            ctx.restore();
            return;
        }

        if (this.type === 'blutsauger' && syringeImage && syringeImage.complete && syringeImage.naturalWidth > 0) {
            const spriteWidth = 26;
            const spriteHeight = 10;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation);
            ctx.drawImage(syringeImage, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
            ctx.restore();
            return;
        }

        if ((this.type === 'rocketlauncher' || this.type === 'beggersbazooka' || this.type === 'directhit' || this.type === 'rocketjumper') && rocketImage && rocketImage.complete && rocketImage.naturalWidth > 0) {
            const spriteWidth = 28;
            const spriteHeight = 14;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation);
            ctx.drawImage(rocketImage, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
            ctx.restore();
            return;
        }

        if (this.type === 'piplauncher') {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.95;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, Math.max(5, this.size), 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8;
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, Math.max(5, this.size), 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            return;
        }

        if (this.type === 'grenadelauncher' && grenadeImage && grenadeImage.complete && grenadeImage.naturalWidth > 0) {
            const spriteSize = 18;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation);
            ctx.drawImage(grenadeImage, -spriteSize / 2, -spriteSize / 2, spriteSize, spriteSize);
            ctx.restore();
            return;
        }

        if (this.type === 'scrumpybottle' && bottleImage && bottleImage.complete && bottleImage.naturalWidth > 0) {
            const spriteWidth = 20;
            const spriteHeight = 24;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation + Math.PI / 2);
            ctx.drawImage(bottleImage, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
            ctx.restore();
            return;
        }

        if ((this.type === 'explosiveflask' || this.type === 'pickupexplosiveflask')) {
            const sprite = explosiveFlaskImage && explosiveFlaskImage.complete && explosiveFlaskImage.naturalWidth > 0
                ? explosiveFlaskImage
                : bottleImage;

            if (sprite && sprite.complete && sprite.naturalWidth > 0) {
                const spriteWidth = 18;
                const spriteHeight = 22;
                ctx.save();
                ctx.translate(this.pos.x, this.pos.y);
                ctx.rotate(this.rotation + Math.PI / 2);
                ctx.drawImage(sprite, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
                ctx.restore();
                return;
            }
        }

        if ((this.type === 'pistol' || this.type === 'revolver' || this.type === 'sniper' || this.type === 'smg' || this.type === 'minigun' || this.type === 'machina') && pistolImage && pistolImage.complete && pistolImage.naturalWidth > 0) {
            const spriteWidth = 24;
            const spriteHeight = 12;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation);
            ctx.drawImage(pistolImage, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
            ctx.restore();
            return;
        }

        if (this.type === 'magicianhat' && bunnyImage && bunnyImage.complete && bunnyImage.naturalWidth > 0) {
            const spriteWidth = 34;
            const spriteHeight = 31;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation + Math.PI / 2);
            ctx.drawImage(bunnyImage, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);
            ctx.restore();
            return;
        }

        if (this.type === 'card') {
            const cardWidth = 18;
            const cardHeight = 24;
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 1;
            ctx.strokeRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);

            ctx.fillStyle = this.color;
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.label, 0, 0);
            ctx.restore();
            return;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isOffScreen(width, height) {
        return this.pos.x < -60 || this.pos.x > width + 60 || this.pos.y < -60 || this.pos.y > height + 60;
    }
}