import { Vector } from './core/vector.js';

const _arenaImage = new Image();
_arenaImage.src = 'assets/Arena.jpg';

const W = 800, H = 600;
const R = 22;
const SANDBOX_HP = 1_000_000;
const PLAYER_SPEED = 4;
const MOVER_SPEED = 3.5;

// ---------------------------------------------------------------------------
// Weapon definitions (damage scaled so HP bar is meaningfully impacted)
// ---------------------------------------------------------------------------
const WEAPONS = [
    {
        key: '1', name: 'Pistol',
        dmg: 8_000,  rate: 200,  pellets: 1,  spread: 0,    bSpeed: 16, bR: 5,
        color: '#ffe066', stat: '8k dmg · 200ms',
    },
    {
        key: '2', name: 'Shotgun',
        dmg: 4_000,  rate: 750,  pellets: 8,  spread: 0.20, bSpeed: 13, bR: 5,
        color: '#ff9f43', stat: '8×4k · 750ms',
    },
    {
        key: '3', name: 'Revolver',
        dmg: 22_000, rate: 500,  pellets: 1,  spread: 0,    bSpeed: 19, bR: 5,
        color: '#ffd84d', stat: '22k dmg · 500ms',
    },
    {
        key: '4', name: 'Sniper',
        dmg: 90_000, rate: 1600, pellets: 1,  spread: 0,    bSpeed: 32, bR: 4,
        color: '#66e3ff', stat: '90k dmg · 1.6s',
    },
    {
        key: '5', name: 'Minigun',
        dmg: 2_000,  rate: 75,   pellets: 1,  spread: 0.08, bSpeed: 15, bR: 4,
        color: '#ffd84d', stat: '2k dmg · 75ms',
    },
    {
        key: '6', name: 'Rocket',
        dmg: 55_000, rate: 1000, pellets: 1,  spread: 0,    bSpeed: 8,  bR: 10,
        color: '#ff6b6b', stat: '55k dmg · 1s',
    },
    {
        key: '7', name: 'Flamethrower',
        dmg: 1_000,  rate: 55,   pellets: 3,  spread: 0.32, bSpeed: 9,  bR: 7,
        color: '#ff9500', stat: '3×1k · 55ms', maxTravel: 220,
    },
    {
        key: '8', name: 'SMG',
        dmg: 3_000,  rate: 110,  pellets: 1,  spread: 0.07, bSpeed: 16, bR: 4,
        color: '#b7ff4a', stat: '3k dmg · 110ms',
    },
];

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------
function makeEntity(x, y, vx, vy, color, label, kind) {
    return {
        pos: new Vector(x, y),
        vel: new Vector(vx, vy),
        hp: SANDBOX_HP,
        maxHP: SANDBOX_HP,
        radius: R,
        color,
        label,
        kind, // 'player' | 'static' | 'mover'
        aimAngle: 0,
        nextFireAt: 0,
    };
}

const player     = makeEntity(150, 300, 0, 0, '#4ecdc4', 'Player', 'player');
const staticBall = makeEntity(650, 300, 0, 0, '#c8c8c8', 'Static', 'static');
const mover      = makeEntity(400, 130, MOVER_SPEED, MOVER_SPEED * 0.65, '#ff6b6b', 'Mover', 'mover');

const allEntities = [player, staticBall, mover];

// Mover weapon (fixed)
const MOVER_WEAPON = { dmg: 4_000, rate: 1_200, bSpeed: 14, bR: 5, color: '#ff8a80', pellets: 1, spread: 0 };

// Projectile: { x, y, vx, vy, damage, owner, color, radius, traveled, maxTravel }
const projectiles = [];

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------
const keys = {};
let mouseX = W / 2, mouseY = H / 2;
let mouseDown = false;
let playerWeaponIdx = 0;

window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
        e.preventDefault();
    }
    // Number keys switch weapon
    const numIdx = parseInt(e.key) - 1;
    if (numIdx >= 0 && numIdx < WEAPONS.length) selectWeapon(numIdx);
});
window.addEventListener('keyup', e => { keys[e.key] = false; });

const canvas = document.getElementById('sandbox-canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) * (W / rect.width);
    mouseY = (e.clientY - rect.top) * (H / rect.height);
});
canvas.addEventListener('mousedown', e => { if (e.button === 0) mouseDown = true; });
canvas.addEventListener('mouseup',   e => { if (e.button === 0) mouseDown = false; });

// ---------------------------------------------------------------------------
// Weapon bar (HTML)
// ---------------------------------------------------------------------------
const weaponBar = document.getElementById('weapon-bar');

function buildWeaponBar() {
    weaponBar.innerHTML = '';
    WEAPONS.forEach((w, i) => {
        const btn = document.createElement('button');
        btn.className = 'weapon-btn' + (i === playerWeaponIdx ? ' active' : '');
        btn.id = `wb-${i}`;
        btn.innerHTML = `<span class="key-badge">${w.key}</span><span class="wname">${w.name}</span><span class="wstat">${w.stat}</span>`;
        btn.addEventListener('click', () => selectWeapon(i));
        weaponBar.appendChild(btn);
    });
}

function selectWeapon(idx) {
    const prev = document.getElementById(`wb-${playerWeaponIdx}`);
    if (prev) prev.classList.remove('active');
    playerWeaponIdx = idx;
    const next = document.getElementById(`wb-${playerWeaponIdx}`);
    if (next) next.classList.add('active');
    // Reset fire timer so switching doesn't accidentally lock the gun
    player.nextFireAt = 0;
}

buildWeaponBar();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fireBullets(fromEntity, baseAngle, weaponDef) {
    for (let p = 0; p < weaponDef.pellets; p++) {
        const spreadAngle = weaponDef.spread > 0
            ? baseAngle + (Math.random() - 0.5) * weaponDef.spread * 2
            : baseAngle;
        projectiles.push({
            x: fromEntity.pos.x,
            y: fromEntity.pos.y,
            vx: Math.cos(spreadAngle) * weaponDef.bSpeed,
            vy: Math.sin(spreadAngle) * weaponDef.bSpeed,
            damage: weaponDef.dmg,
            owner: fromEntity,
            color: weaponDef.color,
            radius: weaponDef.bR,
            traveled: 0,
            maxTravel: weaponDef.maxTravel || 1100,
        });
    }
}

function findNearest(source, candidates) {
    let best = null, bestDist = Infinity;
    for (const c of candidates) {
        if (c.hp <= 0) continue;
        const dx = c.pos.x - source.pos.x, dy = c.pos.y - source.pos.y;
        const d = dx * dx + dy * dy;
        if (d < bestDist) { bestDist = d; best = c; }
    }
    return best;
}

function clamp(entity) {
    entity.pos.x = Math.max(entity.radius, Math.min(W - entity.radius, entity.pos.x));
    entity.pos.y = Math.max(entity.radius, Math.min(H - entity.radius, entity.pos.y));
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------
function update() {
    const now = Date.now();
    const weapon = WEAPONS[playerWeaponIdx];

    // --- Player ---
    if (player.hp > 0) {
        let dx = 0, dy = 0;
        if (keys['w'] || keys['ArrowUp'])    dy -= 1;
        if (keys['s'] || keys['ArrowDown'])  dy += 1;
        if (keys['a'] || keys['ArrowLeft'])  dx -= 1;
        if (keys['d'] || keys['ArrowRight']) dx += 1;
        if (dx !== 0 || dy !== 0) {
            const len = Math.sqrt(dx * dx + dy * dy);
            player.pos.x += (dx / len) * PLAYER_SPEED;
            player.pos.y += (dy / len) * PLAYER_SPEED;
            clamp(player);
        }
        player.aimAngle = Math.atan2(mouseY - player.pos.y, mouseX - player.pos.x);

        if (mouseDown && now >= player.nextFireAt) {
            player.nextFireAt = now + weapon.rate;
            fireBullets(player, player.aimAngle, weapon);
        }
    }

    // --- Mover ---
    if (mover.hp > 0) {
        mover.pos.x += mover.vel.x;
        mover.pos.y += mover.vel.y;
        if (mover.pos.x - mover.radius < 0) { mover.pos.x = mover.radius;     mover.vel.x =  Math.abs(mover.vel.x); }
        if (mover.pos.x + mover.radius > W) { mover.pos.x = W - mover.radius; mover.vel.x = -Math.abs(mover.vel.x); }
        if (mover.pos.y - mover.radius < 0) { mover.pos.y = mover.radius;     mover.vel.y =  Math.abs(mover.vel.y); }
        if (mover.pos.y + mover.radius > H) { mover.pos.y = H - mover.radius; mover.vel.y = -Math.abs(mover.vel.y); }

        const targets = allEntities.filter(e => e !== mover && e.hp > 0);
        const target = findNearest(mover, targets);
        if (target) {
            mover.aimAngle = Math.atan2(target.pos.y - mover.pos.y, target.pos.x - mover.pos.x);
            if (now >= mover.nextFireAt) {
                mover.nextFireAt = now + MOVER_WEAPON.rate;
                fireBullets(mover, mover.aimAngle, MOVER_WEAPON);
            }
        }
    }

    // --- Ball-ball push (skip static) ---
    for (let i = 0; i < allEntities.length - 1; i++) {
        for (let j = i + 1; j < allEntities.length; j++) {
            const a = allEntities[i], b = allEntities[j];
            if (a.hp <= 0 || b.hp <= 0) continue;
            const dx = b.pos.x - a.pos.x, dy = b.pos.y - a.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = a.radius + b.radius;
            if (dist > 0 && dist < minDist) {
                const overlap = (minDist - dist) / 2;
                const nx = dx / dist, ny = dy / dist;
                if (a.kind !== 'static') { a.pos.x -= nx * overlap; a.pos.y -= ny * overlap; }
                if (b.kind !== 'static') { b.pos.x += nx * overlap; b.pos.y += ny * overlap; }
            }
        }
    }

    // --- Projectiles ---
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.traveled += Math.sqrt(p.vx * p.vx + p.vy * p.vy);

        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20 || p.traveled > p.maxTravel) {
            projectiles.splice(i, 1);
            continue;
        }

        let hit = false;
        for (const e of allEntities) {
            if (e === p.owner || e.hp <= 0) continue;
            const dx = e.pos.x - p.x, dy = e.pos.y - p.y;
            if (Math.sqrt(dx * dx + dy * dy) < e.radius + p.radius) {
                e.hp = Math.max(0, e.hp - p.damage);
                hit = true;
                break;
            }
        }
        if (hit) projectiles.splice(i, 1);
    }
}

// ---------------------------------------------------------------------------
// Draw
// ---------------------------------------------------------------------------
function drawEntity(e) {
    const dead = e.hp <= 0;
    ctx.globalAlpha = dead ? 0.3 : 1;

    ctx.fillStyle = e.color;
    ctx.beginPath();
    ctx.arc(e.pos.x, e.pos.y, e.radius, 0, Math.PI * 2);
    ctx.fill();

    const hpRatio = e.hp / e.maxHP;
    ctx.strokeStyle = hpRatio > 0.66 ? '#39d98a' : hpRatio > 0.33 ? '#ffcc00' : '#ff4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(e.pos.x, e.pos.y, e.radius + 4, 0, Math.PI * 2);
    ctx.stroke();

    if (e.kind !== 'static' && !dead) {
        ctx.strokeStyle = e.kind === 'player' ? 'rgba(255,240,80,0.75)' : 'rgba(255,100,100,0.65)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(e.pos.x, e.pos.y);
        ctx.lineTo(e.pos.x + Math.cos(e.aimAngle) * 42, e.pos.y + Math.sin(e.aimAngle) * 42);
        ctx.stroke();
    }

    ctx.globalAlpha = 1;

    ctx.fillStyle = dead ? '#888' : '#fff';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(dead ? `${e.label} [DEFEATED]` : e.label, e.pos.x, e.pos.y - e.radius - 20);

    const barW = 76, barH = 7;
    const barX = e.pos.x - barW / 2;
    const barY = e.pos.y - e.radius - 14;
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = hpRatio > 0.66 ? '#39d98a' : hpRatio > 0.33 ? '#ffcc00' : '#ff4444';
    ctx.fillRect(barX, barY, barW * hpRatio, barH);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    ctx.fillStyle = '#ccc';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(e.hp).toLocaleString()} / ${e.maxHP.toLocaleString()}`, e.pos.x, e.pos.y + e.radius + 15);
}

function drawHud() {
    const w = WEAPONS[playerWeaponIdx];
    // Weapon readout top-left
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 170, 36);
    ctx.fillStyle = w.color;
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`[${w.key}] ${w.name}`, 14, 25);
    ctx.fillStyle = '#888';
    ctx.font = '11px Arial';
    ctx.fillText(w.stat, 14, 39);

    // Controls bottom
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('WASD / ↑↓←→: Move   |   Mouse: Aim   |   Click & Hold: Shoot   |   1-8: Switch Weapon', W / 2, H - 8);
}

function draw() {
    if (_arenaImage.complete && _arenaImage.naturalWidth > 0) {
        ctx.drawImage(_arenaImage, 0, 0, W, H);
    } else {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, W, H);
    }

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, W - 2, H - 2);

    for (const p of projectiles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    for (const e of allEntities) drawEntity(e);

    drawHud();
}

// ---------------------------------------------------------------------------
// Loop
// ---------------------------------------------------------------------------
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
