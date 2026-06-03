import { Game, loadImages, W } from './bootstrap.js';

const canvas = document.getElementById('gameCanvas');
const statusEl = document.getElementById('status');
const dealerStatusEl = document.getElementById('dealer-status');
const playerUiEl = document.getElementById('player-ui');

const query = new URLSearchParams(window.location.search);
const queryWeapons = query.get('weapons');
const startWeapons = queryWeapons
    ? queryWeapons.split(',').map(item => item.trim().toLowerCase()).filter(Boolean)
    : [];
const allowWeaponDrops = query.get('weaponDrops') !== '0';
const allowUtilityDrops = query.get('utilityDrops') !== '0';
const gameSettings = {
    ballCount: Number(query.get('balls')) || 4,
    teamCount: Number(query.get('teams')) || 2,
    dropFrequencyMs: Number(query.get('dropMs')) || 4000,
    startWeapons,
    allowWeaponDrops,
    allowUtilityDrops
};

const images = await loadImages();
const game = new Game(canvas, images, gameSettings);

function renderPlayerUi() {
    playerUiEl.innerHTML = '';

    for (let i = 0; i < game.balls.length; i++) {
        const ball = game.balls[i];
        const row = document.createElement('div');
        row.className = 'player-info';

        row.innerHTML = `
            <div class="ball-icon" style="background: ${ball.color};"></div>
            <span>${ball.displayName} (T${ball.teamId})</span>
            <div class="hp-bar"><div class="hp-fill" id="ball${i + 1}-hp" style="width: 100%; background: ${ball.color};"></div></div>
            <span class="hp-value" id="ball${i + 1}-hp-value">${Math.round(ball.hp)} / ${Math.round(ball.maxHP)}</span>
            <span class="weapon-state" id="ball${i + 1}-weapon">${ball.weapon.getInfo()}</span>
            <span class="uber-state" id="ball${i + 1}-uber">UBER --</span>
        `;

        playerUiEl.appendChild(row);
    }
}

renderPlayerUi();

function lightenHexColor(hex, factor = 0.28) {
    if (typeof hex !== 'string') return hex;
    const match = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim());
    if (!match) return hex;

    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);

    const mix = (channel) => Math.round(channel + (255 - channel) * factor);
    const toHex = (channel) => channel.toString(16).padStart(2, '0');

    return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

function updateUI() {
    const now = Date.now();

    for (let i = 0; i < game.balls.length; i++) {
        const ball = game.balls[i];
        const hpPercent = Math.max(0, (ball.hp / ball.maxHP) * 100);
        const displayPercent = Math.min(100, hpPercent);
        const isOverhealed = ball.hp > ball.maxHP;
        const bar = document.getElementById(`ball${i + 1}-hp`);
        const value = document.getElementById(`ball${i + 1}-hp-value`);
        const weaponState = document.getElementById(`ball${i + 1}-weapon`);
        const uberState = document.getElementById(`ball${i + 1}-uber`);
        bar.style.width = `${displayPercent}%`;
        bar.style.background = isOverhealed ? lightenHexColor(ball.color, 0.34) : ball.color;
        value.textContent = `${Math.round(ball.hp)} / ${Math.round(ball.maxHP)}`;
        weaponState.textContent = ball.weapon.getInfo(now);

        if (ball.weapon.type === 'sodapopper') {
            const chargePercent = Math.round(Math.min(100, (ball.sodaPopper.chargeDamage / W.sodaPopper.CHARGE_DAMAGE_REQUIRED) * 100));
            if (now < ball.sodaPopper.hypeUntil) {
                const hypeLeft = ((ball.sodaPopper.hypeUntil - now) / 1000).toFixed(1);
                weaponState.textContent = `${ball.weapon.getInfo(now)} | HYPE x${W.sodaPopper.HYPE_DAMAGE_MULTIPLIER.toFixed(2)} (${hypeLeft}s)`;
            } else {
                weaponState.textContent = `${ball.weapon.getInfo(now)} | CHARGE ${chargePercent}%`;
            }
        }

        if (ball.weapon.type === 'medigun') {
            const healProgress = Math.min(1, (ball.medigunState.uberHealAccum || 0) / 800);
            const damageProgress = Math.min(1, (ball.medigunState.uberDamageAccum || 0) / 400);
            const uberPercent = Math.round(Math.max(healProgress, damageProgress) * 100);

            if (ball.isUberActive(now)) {
                uberState.textContent = 'UBER ACTIVE';
                uberState.classList.add('uber-active');
            } else {
                uberState.textContent = `UBER ${uberPercent}%`;
                uberState.classList.remove('uber-active');
            }
        } else {
            uberState.textContent = 'UBER --';
            uberState.classList.remove('uber-active');
        }
    }

    if (game.gameOver) {
        if (game.winnerId === 'draw') {
            statusEl.textContent = 'Round ends in a draw.';
        } else if (game.winnerId.startsWith('team-')) {
            const teamId = game.winnerId.replace('team-', '');
            statusEl.textContent = `Team ${teamId} wins.`;
        } else {
            const winnerBall = game.balls.find(ball => ball.id === game.winnerId);
            if (winnerBall) {
                const winnerName = winnerBall.displayName;
                statusEl.textContent = `${winnerName} wins.`;
            } else {
                statusEl.textContent = `${game.winnerId} wins.`;
            }
        }
    } else {
        const weapons = game.balls.map((ball, idx) => `B${idx + 1}: ${ball.weapon.getInfo(now)}`).join(' | ');
        statusEl.textContent = weapons;
    }

    dealerStatusEl.textContent = game.getDealerStatusText();
}

function loop() {
    game.update();
    game.draw();
    updateUI();
    requestAnimationFrame(loop);
}

loop();
