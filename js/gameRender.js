import {
    DEAD_RINGER_DECOY_DURATION_MS,
    MAGICIAN_HAT_TELEPORT_SMOKE_DURATION_MS,
    SCRUMPY_PUDDLE_DURATION_MS
} from './constants.js';

export function draw(game) {
    const ctx = game.ctx;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, game.canvas.width, game.canvas.height);

    for (const pickup of game.pickups) pickup.draw(ctx, game.pickupIcons);
    for (const effect of game.explosionEffects) {
        const lifeRatio = Math.max(0, (effect.expiresAt - Date.now()) / 300);
        const alpha = 0.15 + lifeRatio * 0.25;
        ctx.fillStyle = `rgba(255, 170, 80, ${alpha})`;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.radius * (1.2 - lifeRatio * 0.2), 0, Math.PI * 2);
        ctx.fill();
    }
    for (const effect of game.teleportSmokeEffects) {
        const lifeRatio = Math.max(0, (effect.expiresAt - Date.now()) / MAGICIAN_HAT_TELEPORT_SMOKE_DURATION_MS);
        const size = 24 + (1 - lifeRatio) * 18;
        if (game.smokeImage && game.smokeImage.complete && game.smokeImage.naturalWidth > 0) {
            ctx.save();
            ctx.globalAlpha = 0.2 + lifeRatio * 0.45;
            ctx.drawImage(game.smokeImage, effect.x - size / 2, effect.y - size / 2, size, size);
            ctx.restore();
        } else {
            ctx.save();
            ctx.globalAlpha = 0.16 + lifeRatio * 0.3;
            ctx.fillStyle = '#d9d9d9';
            ctx.beginPath();
            ctx.arc(effect.x, effect.y, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    for (const field of game.shortCircuitFields) {
        const gradient = ctx.createRadialGradient(field.pos.x, field.pos.y, 5, field.pos.x, field.pos.y, field.radius);
        gradient.addColorStop(0, 'rgba(125, 249, 255, 0.50)');
        gradient.addColorStop(1, 'rgba(125, 249, 255, 0.08)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(field.pos.x, field.pos.y, field.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(125, 249, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(field.pos.x, field.pos.y, field.radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    for (const puddle of game.scrumpyPuddles) {
        const lifeRatio = Math.max(0, Math.min(1, (Date.now() - puddle.createdAt) / SCRUMPY_PUDDLE_DURATION_MS));
        const radius = puddle.initialRadius + (puddle.finalRadius - puddle.initialRadius) * lifeRatio;
        const alpha = 0.3 * (1 - lifeRatio * 0.55);

        const gradient = ctx.createRadialGradient(puddle.x, puddle.y, 8, puddle.x, puddle.y, radius);
        gradient.addColorStop(0, `rgba(196, 255, 117, ${Math.max(0.15, alpha)})`);
        gradient.addColorStop(1, `rgba(92, 153, 41, ${Math.max(0.08, alpha * 0.45)})`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(puddle.x, puddle.y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(222, 255, 148, ${Math.max(0.1, alpha * 1.2)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(puddle.x, puddle.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    for (const decoy of game.deadRingerDecoys) {
        const lifeRatio = Math.max(0, Math.min(1, (Date.now() - decoy.createdAt) / DEAD_RINGER_DECOY_DURATION_MS));
        const alpha = Math.max(0, 0.95 - lifeRatio);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = decoy.color;
        ctx.beginPath();
        ctx.arc(decoy.x, decoy.y, 14, 0, Math.PI * 2);
        ctx.fill();

        if (game.deadRingerImage && game.deadRingerImage.complete && game.deadRingerImage.naturalWidth > 0) {
            ctx.drawImage(game.deadRingerImage, decoy.x - 10, decoy.y - 26, 20, 20);
        }
        ctx.restore();
    }

    for (const shooter of game.balls) {
        if (!shooter.isAlive()) continue;
        if (shooter.weapon.type !== 'medigun') continue;

        const state = shooter.medigunState;
        if (!state.targetId) continue;

        const target = game.balls.find(candidate => candidate.id === state.targetId && candidate.isAlive());
        if (!target) continue;

        ctx.save();
        ctx.strokeStyle = state.mode === 'ally' ? 'rgba(120, 220, 255, 0.9)' : 'rgba(255, 96, 96, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(shooter.pos.x, shooter.pos.y);
        ctx.lineTo(target.pos.x, target.pos.y);
        ctx.stroke();
        ctx.restore();
    }

    for (const projectile of game.projectiles) {
        projectile.draw(ctx, game.pistolProjectileImage, game.syringeAmmoImage, game.rocketAmmoImage, game.grenadeAmmoImage, game.arrowProjectileImage, game.crusadersCrossbowProjectileImage, game.explosiveFlaskImage, game.scrumpyBottleImage, game.bunnyProjectileImage, game.magicBulletProjectileImage, game.appleProjectileImage, game.funeralDeadButterfliesPortraitImage, game.sporeImage, game.sporeRoundImage, game.swordSharpenedImage);
    }

    for (const ball of game.balls) {
        if (!ball.isAlive()) continue;
        const now = Date.now();
        ball.draw(
            ctx,
            now,
            game.sniperRifleImage,
            game.machinaImage,
            game.huntsmanImage,
            game.crusadersCrossbowImage,
            game.smgImage,
            game.tommyGunImage,
            game.egoWeaponMagicBulletImage,
            game.egoWeaponLonelinessImage,
            game.egoWeaponPenitenceImage,
            game.egoWeaponParadiseLostImage,
            game.egoWeaponHarmonyImage,
            game.portalImage,
            game.minigunImage,
            game.blutsaugerImage,
            game.shortCircuitImage,
            game.rocketLauncherImage,
            game.pipLauncherImage,
            game.beggersBazookaImage,
            game.directHitImage,
            game.rocketJumperImage,
            game.yellowTargeImage,
            game.medigunImage,
            game.grenadeLauncherImage,
            game.flamethrowerImage,
            game.deadRingerImage,
            game.truePistolWeaponImage,
            game.revolverWeaponImage,
            game.shotgunWeaponImage,
            game.familyBusinessWeaponImage,
            game.sodaPopperWeaponImage,
            game.forceANatureWeaponImage,
            game.magicianHatWeaponImage,
            game.musketWeaponImage,
            game.widowmakerWeaponImage,
            game.hornetRifleImage,
            game.hornetShotgunImage,
            game.egoWeaponSolemnVowBlackImage,
            game.egoWeaponSolemnVowWhiteImage,
            game.kaleidoscopeMuzzleImage,
            game.swordSharpenedImage
        );

        // Draw blessing shield indicator if active
        if (now < ball.blessingShield.until) {
            ctx.save();
            const iconX = ball.pos.x;
            const iconY = ball.pos.y - ball.radius - 18;

            if (game.blessingShieldImage && game.blessingShieldImage.complete && game.blessingShieldImage.naturalWidth > 0) {
                const iconSize = 28;
                ctx.drawImage(game.blessingShieldImage, iconX - iconSize / 2, iconY - iconSize / 2, iconSize, iconSize);
            } else {
                ctx.fillStyle = 'rgba(77, 166, 255, 0.8)';
                ctx.strokeStyle = '#4da6ff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(iconX, iconY, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(iconX - 3, iconY);
                ctx.lineTo(iconX - 1, iconY + 3);
                ctx.lineTo(iconX + 4, iconY - 2);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    for (let i = game.damagePopups.length - 1; i >= 0; i--) {
        const popup = game.damagePopups[i];
        const age = Date.now() - popup.createdAt;
        if (age >= popup.lifeMs) {
            game.damagePopups.splice(i, 1);
            continue;
        }

        const t = age / popup.lifeMs;
        const alpha = Math.max(0, 1 - t);
        const rise = 20 * t;
        const scale = 1 + (1 - t) * 0.2;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `bold ${Math.round(16 * scale)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';
        ctx.fillStyle = popup.color || '#ff3b3b';
        ctx.shadowColor = 'rgba(0,0,0,0.65)';
        ctx.shadowBlur = 4;
        ctx.strokeText(popup.text, popup.x, popup.y - rise);
        ctx.fillText(popup.text, popup.x, popup.y - rise);
        ctx.restore();

        popup.y -= popup.vy;
    }
}
