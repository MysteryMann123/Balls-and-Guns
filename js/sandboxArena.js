import { SandboxGame } from './sandboxGame.js';
import { loadImages } from './assetManager.js';
import {
    AMMO_CRATE_DOUBLE_SHOT_MS,
    DEAD_RINGER_PICKUP_COOLDOWN_MS,
    HEALTHICO_HEAL,
    HEALTHICO_REGEN_DURATION_MS,
    HEALTHICO_REGEN_INTERVAL_MS,
    HEALTHICO_REGEN_PER_TICK,
} from './pickupConstants.js';
import * as W from './weapons/index.js';

// --- Read URL params ---
const query        = new URLSearchParams(window.location.search);
const playerWeapon = query.get('playerWeapon') || 'pistol';
const moverWeapon  = query.get('moverWeapon')  || 'pistol';
const startHp      = Math.max(1000, Number(query.get('startHp')) || 1_000_000);
const enemyFireOn  = query.get('enemyFire') !== '0'; // default ON
const moverBall    = query.get('moverBall') === '1'; // default OFF

// --- Canvas & UI elements ---
const canvas      = document.getElementById('gameCanvas');
const playerUiEl  = document.getElementById('player-ui');
const statusEl    = document.getElementById('status');

// --- Load images & create game ---
const images = await loadImages();
const game = new SandboxGame(canvas, images, playerWeapon, moverWeapon, startHp, moverBall);

// --- Input state ---
const keys = {};
let mouseX    = canvas.width  / 2;
let mouseY    = canvas.height / 2;
let mouseDown = false;

window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', e => { keys[e.key] = false; });

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) * (canvas.width  / rect.width);
    mouseY = (e.clientY - rect.top)  * (canvas.height / rect.height);
});
canvas.addEventListener('mousedown', e => { if (e.button === 0) mouseDown = true; });
canvas.addEventListener('mouseup',   e => { if (e.button === 0) mouseDown = false; });

// --- DPS / HPS tracking ---
const WINDOW_MS = 3000;

const damageLog = []; // { time, amount }
let totalDamage = 0;
let peakDps = 0;

const healLog = []; // { time, amount }
let totalHeal = 0;
let peakHps = 0;

const prevHps = {};    // hp snapshots for enemy balls (damage tracking)
let prevPlayerHp = 0;  // hp snapshot for player (heal tracking)

function recordDamage(amount, now) {
    damageLog.push({ time: now, amount });
    totalDamage += amount;
}

function recordHeal(amount, now) {
    healLog.push({ time: now, amount });
    totalHeal += amount;
}

function getRollingRate(log, now) {
    const cutoff = now - WINDOW_MS;
    while (log.length && log[0].time < cutoff) log.shift();
    return log.reduce((s, e) => s + e.amount, 0) / (WINDOW_MS / 1000);
}

function resetStats() {
    damageLog.length = 0;
    totalDamage = 0;
    peakDps = 0;
    healLog.length = 0;
    totalHeal = 0;
    peakHps = 0;
    document.getElementById('dps-value').textContent  = '0';
    document.getElementById('dps-total').textContent  = '0';
    document.getElementById('dps-peak').textContent   = '0';
    document.getElementById('hps-value').textContent  = '0';
    document.getElementById('hps-total').textContent  = '0';
    document.getElementById('mhdps-value').textContent = '0%';
}

document.getElementById('dps-reset').addEventListener('click', resetStats);

// --- Enemy fire toggle ---
game.enemiesShootEnabled = enemyFireOn;
const toggleFireBtn = document.getElementById('toggle-enemy-fire');
toggleFireBtn.textContent = `Enemy Fire: ${game.enemiesShootEnabled ? 'ON' : 'OFF'}`;
toggleFireBtn.className   = game.enemiesShootEnabled ? 'btn-quick' : 'btn-start';
toggleFireBtn.addEventListener('click', () => {
    game.enemiesShootEnabled = !game.enemiesShootEnabled;
    toggleFireBtn.textContent = `Enemy Fire: ${game.enemiesShootEnabled ? 'ON' : 'OFF'}`;
    toggleFireBtn.className   = game.enemiesShootEnabled ? 'btn-quick' : 'btn-start';
});

// --- Infinite buffs toggle ---
let infiniteBuffs = false;
const toggleInfBtn = document.getElementById('toggle-inf-buffs');
toggleInfBtn.addEventListener('click', () => {
    infiniteBuffs = !infiniteBuffs;
    toggleInfBtn.textContent = `Inf. Buffs: ${infiniteBuffs ? 'ON' : 'OFF'}`;
    toggleInfBtn.className   = infiniteBuffs ? 'btn-start' : 'btn-quick';
});

// --- Utility tray ---
const UTILITY_DEFS = [
    { type: 'ammoico',       label: 'Ammo Crate',    icon: 'assets/Ammoico.png' },
    { type: 'healthico',     label: 'Health Pack',   icon: 'assets/Healthico.png' },
    { type: 'ubercharge',    label: 'Ubercharge',    icon: 'assets/UberCharge_Canteen.png' },
    { type: 'critical',      label: 'Critical',      icon: 'assets/Critical_Hit_Boost_Canteen.png' },
    { type: 'speed',         label: 'Speed Boost',   icon: 'assets/SPEED.png' },
    { type: 'explosiveflask',label: 'Expl. Flask',   icon: 'assets/Explosive_Flask.png' },
    { type: 'scrumpybottle', label: 'Scrumpy',       icon: 'assets/BottleScreen.png' },
    { type: 'bombanomicron', label: 'Bombanomicron', icon: 'assets/RED_Bombinomicon.png' },
    { type: 'deadringer',    label: 'Dead Ringer',   icon: 'assets/Dead_Ringer.png' },
];

function applyUtilityToPlayer(type) {
    const now = Date.now();
    const player = game.balls.find(b => b.controller === 'player');
    if (!player || !player.isAlive()) return;

    if (type === 'ammoico') {
        if (player.weapon.ammo !== Infinity) {
            player.weapon.ammo = player.weapon.maxAmmo;
            if (player.weapon.type === 'minigun') player.weapon.currentFireRate = player.weapon.fireRate;
        }
        player.ammoCrateDoubleShotUntil = now + AMMO_CRATE_DOUBLE_SHOT_MS;
    } else if (type === 'healthico') {
        player.heal(HEALTHICO_HEAL);
        player.applyHealthRegen(now, HEALTHICO_REGEN_PER_TICK, HEALTHICO_REGEN_DURATION_MS, HEALTHICO_REGEN_INTERVAL_MS);
    } else if (type === 'ubercharge') {
        player.applyUbercharge(now);
    } else if (type === 'critical') {
        player.applyCritical(now);
    } else if (type === 'speed') {
        player.applySpeedBoost();
    } else if (type === 'explosiveflask') {
        const enemies = game.balls.filter(b => b.isAlive() && b.id !== player.id && game.areEnemies(player, b));
        if (enemies.length > 0) {
            const target = game.findNearest(player, enemies);
            player.aimAngle = Math.atan2(target.pos.y - player.pos.y, target.pos.x - player.pos.x);
            game.throwExplosiveFlask(player, target, now, true);
        }
    } else if (type === 'scrumpybottle') {
        const enemies = game.balls.filter(b => b.isAlive() && b.id !== player.id && game.areEnemies(player, b));
        if (enemies.length > 0) {
            const target = game.findNearest(player, enemies);
            player.aimAngle = Math.atan2(target.pos.y - player.pos.y, target.pos.x - player.pos.x);
            game.throwScrumpyBottle(player, target, now);
        }
    } else if (type === 'bombanomicron') {
        game.launchBombanomicron(player, now);
    } else if (type === 'deadringer') {
        player.deadRinger.pickupAvailableAt = 0;
        player.giveDeadRinger(now);
    }
}

const trayEl = document.getElementById('utility-tray');
for (const def of UTILITY_DEFS) {
    const btn = document.createElement('button');
    btn.className = 'utility-btn';
    btn.title = def.label;
    btn.innerHTML = `<img src="${def.icon}" alt="${def.label}"><span>${def.label}</span>`;
    btn.addEventListener('click', () => applyUtilityToPlayer(def.type));
    trayEl.appendChild(btn);
}

// --- Build HP-bar UI ---
function buildUI() {
    playerUiEl.innerHTML = '';
    for (const ball of game.balls) {
        const row = document.createElement('div');
        row.className = 'player-info';
        row.innerHTML = `
            <div class="ball-icon" style="background:${ball.color};"></div>
            <span>${ball.displayName}</span>
            <div class="hp-bar"><div class="hp-fill" id="sbhp-${ball.id}" style="width:100%;background:${ball.color};"></div></div>
            <span class="hp-value" id="sbhpv-${ball.id}">${ball.maxHP.toLocaleString()} / ${ball.maxHP.toLocaleString()}</span>
            <span class="weapon-state" id="sbwep-${ball.id}">${ball.weapon.getInfo()}</span>
        `;
        playerUiEl.appendChild(row);
    }
}
buildUI();

function updateUI() {
    const now = Date.now();
    for (const ball of game.balls) {
        const ratio  = Math.max(0, ball.hp / ball.maxHP);
        const bar    = document.getElementById(`sbhp-${ball.id}`);
        const valEl  = document.getElementById(`sbhpv-${ball.id}`);
        const wepEl  = document.getElementById(`sbwep-${ball.id}`);
        if (!bar) continue;
        bar.style.width      = `${ratio * 100}%`;
        bar.style.background = ball.color;
        valEl.textContent    = `${Math.round(ball.hp).toLocaleString()} / ${ball.maxHP.toLocaleString()}`;
        wepEl.textContent    = ball.weapon.getInfo(now);
    }

    const player = game.balls.find(b => b.controller === 'player');
    if (player) {
        const buffs = [];
        if (player.isUberActive(now))              buffs.push('UBER');
        if (player.isCriticalActive(now))          buffs.push('CRIT');
        if (now < (player.ammoCrateDoubleShotUntil || 0)) buffs.push('DOUBLE SHOT');
        const buffStr = buffs.length ? `  |  Buffs: ${buffs.join(', ')}${infiniteBuffs ? ' ∞' : ''}` : '';

        const wieldMult = player.weapon.type === 'crimsonscar' ? (1 + W.crimsonScar.SPEED_BONUS)
            : player.weapon.type === 'adoration' ? W.adoration.WIELDER_SPEED_MULTIPLIER
            : player.weapon.type === 'soundofstar' ? Math.max(0.1, 1 - player.weapon.ammo * W.soundOfStar.WIELDER_SLOW_PER_STAR)
            : 1;
        const currentSpd = (player.currentSpeed ?? 0).toFixed(1);
        const maxSpd = (player.maxSpeed * wieldMult).toFixed(1);
        const speedStr = `  |  Speed: ${currentSpd} / ${maxSpd}`;

        statusEl.textContent = `PLAYER WEAPON: ${player.weapon.getInfo(now)} | WASD: Move  Mouse: Aim  Click: Shoot${speedStr}${buffStr}`;
    } else {
        statusEl.textContent = '';
    }
}

// --- Game loop ---
function loop() {
    const now = Date.now();

    // Snapshot HP before update
    for (const ball of game.balls) {
        if (ball.controller !== 'player') prevHps[ball.id] = ball.hp;
    }
    const player = game.balls.find(b => b.controller === 'player');
    if (player) prevPlayerHp = player.hp;

    game.setInput(keys, mouseX, mouseY, mouseDown);

    // Refresh timed buffs so they never expire when infinite mode is on
    if (infiniteBuffs) {
        const player = game.balls.find(b => b.controller === 'player');
        if (player && player.isAlive()) {
            const far = now + 60_000;
            if (player.effectTimers.uberUntil > 0)           player.effectTimers.uberUntil  = far;
            if (player.effectTimers.critUntil > 0)           player.effectTimers.critUntil  = far;
            if (player.ammoCrateDoubleShotUntil > 0)         player.ammoCrateDoubleShotUntil = far;
        }
    }

    game.update();

    // Accumulate player-dealt damage
    for (const ball of game.balls) {
        if (ball.controller !== 'player') {
            const dmg = (prevHps[ball.id] ?? ball.hp) - ball.hp;
            if (dmg > 0) recordDamage(dmg, now);
        }
    }

    // Accumulate player heals
    if (player) {
        const heal = player.hp - prevPlayerHp;
        if (heal > 0) recordHeal(heal, now);
    }

    game.draw();
    updateUI();

    // Update stat displays
    const dps  = getRollingRate(damageLog, now);
    const hps  = getRollingRate(healLog, now);
    if (dps > peakDps) peakDps = dps;
    if (hps > peakHps) peakHps = hps;

    const enemyMaxHp = game.balls.find(b => b.controller !== 'player')?.maxHP || startHp;
    const mhdps = enemyMaxHp > 0 ? (dps / enemyMaxHp * 100) : 0;

    document.getElementById('dps-value').textContent  = Math.round(dps).toLocaleString();
    document.getElementById('dps-total').textContent  = Math.round(totalDamage).toLocaleString();
    document.getElementById('dps-peak').textContent   = Math.round(peakDps).toLocaleString();
    document.getElementById('hps-value').textContent  = Math.round(hps).toLocaleString();
    document.getElementById('hps-total').textContent  = Math.round(totalHeal).toLocaleString();
    document.getElementById('mhdps-value').textContent = mhdps.toFixed(2) + '%';

    requestAnimationFrame(loop);
}

loop();
