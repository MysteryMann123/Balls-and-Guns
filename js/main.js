import { SODA_POPPER_CHARGE_DAMAGE_REQUIRED, SODA_POPPER_HYPE_DAMAGE_MULTIPLIER } from './constants.js';
import { Game } from './game.js';
import { fireControlledWeapon as fireControlledWeaponImpl } from './gameShooting.js';

const canvas = document.getElementById('gameCanvas');
const statusEl = document.getElementById('status');
const dealerStatusEl = document.getElementById('dealer-status');
const playerUiEl = document.getElementById('player-ui');
const sandboxDpsEl = document.getElementById('sandbox-dps');

const query = new URLSearchParams(window.location.search);
const sandboxMode = query.get('sandbox') === '1' || window.location.pathname.toLowerCase().endsWith('/sandbox.html');
const sandboxWeapon = (query.get('weapon') || 'pistol').trim().toLowerCase() || 'pistol';
const queryWeapons = query.get('weapons');
const startWeapons = queryWeapons
    ? queryWeapons.split(',').map(item => item.trim().toLowerCase()).filter(Boolean)
    : [];
const allowWeaponDrops = query.get('weaponDrops') !== '0';
const allowUtilityDrops = query.get('utilityDrops') !== '0';
const gameSettings = sandboxMode
    ? {
        ballCount: 3,
        teamCount: 2,
        dropFrequencyMs: 7000,
        startWeapons: [sandboxWeapon, 'pistol', 'pistol'],
        allowWeaponDrops: false,
        allowUtilityDrops: false
    }
    : {
        ballCount: Number(query.get('balls')) || 4,
        teamCount: Number(query.get('teams')) || 2,
        dropFrequencyMs: Number(query.get('dropMs')) || 4000,
        startWeapons,
        allowWeaponDrops,
        allowUtilityDrops
    };

const pistolProjectileImage = new Image();
pistolProjectileImage.src = 'assets/bullet_pistolpng.png';
const syringeAmmoImage = new Image();
syringeAmmoImage.src = 'assets/RED_Syringe_Gun_Ammo.png';
const rocketAmmoImage = new Image();
rocketAmmoImage.src = 'assets/48px-Rocket.png';
const grenadeAmmoImage = new Image();
grenadeAmmoImage.src = 'assets/33px-Grenade_proj_red.png';
const arrowProjectileImage = new Image();
arrowProjectileImage.src = 'assets/Arrow_proj.png';
const crusadersCrossbowProjectileImage = new Image();
crusadersCrossbowProjectileImage.src = "assets/Festive_Crusader's_Crossbow_Projectile_RED.png";
const explosiveFlaskImage = new Image();
explosiveFlaskImage.src = 'assets/Explosive_Flask.png';
const bunnyProjectileImage = new Image();
bunnyProjectileImage.src = 'assets/cute-bunny-rabbit-on-isolated-transparent-background-free-png-1435143763.png';
const magicBulletProjectileImage = new Image();
magicBulletProjectileImage.src = 'assets/MagicBullet.webp';
const appleProjectileImage = new Image();
appleProjectileImage.src = 'assets/apple-transparent-background-free-png-3539805000.png';
appleProjectileImage.onerror = () => {
    appleProjectileImage.src = 'assets/Apple.png';
};
explosiveFlaskImage.onerror = () => {
    explosiveFlaskImage.src = 'assets/BottleScreen.png';
};
const sniperRifleImage = new Image();
sniperRifleImage.src = 'assets/Sniper_rifle.png';
const machinaImage = new Image();
machinaImage.src = 'assets/Machina.png';
const huntsmanImage = new Image();
huntsmanImage.src = 'assets/Huntsman.png';
const crusadersCrossbowImage = new Image();
crusadersCrossbowImage.src = "assets/RED_Crusader's_Crossbow.png";
const smgImage = new Image();
smgImage.src = 'assets/SMG.png';
const tommyGunImage = new Image();
tommyGunImage.src = 'assets/TOMMY_GUN.png';
const egoWeaponMagicBulletImage = new Image();
egoWeaponMagicBulletImage.src = 'assets/EGOWeaponMagicBullet.webp';
const egoWeaponLonelinessImage = new Image();
egoWeaponLonelinessImage.src = 'assets/EGOWeaponLoneliness.webp';
const egoWeaponPenitenceImage = new Image();
egoWeaponPenitenceImage.src = 'assets/EGOWeaponPenitence.webp';
const egoWeaponParadiseLostImage = new Image();
egoWeaponParadiseLostImage.src = 'assets/EGOWeaponParadiseLost.webp';
const egoWeaponHarmonyImage = new Image();
egoWeaponHarmonyImage.src = 'assets/EGOWeaponHarmony.webp';
const egoWeaponHornetImage = new Image();
egoWeaponHornetImage.src = 'assets/EGOWeaponHornet.png';
const hornetShotgunSpriteImage = new Image();
hornetShotgunSpriteImage.src = 'assets/Lobotomy_E.G.O_Hornet_Alteration_Shotgun_Sprite.png';
const sporeImage = new Image();
sporeImage.src = 'assets/25px-Spore.webp';
const sporeRoundImage = new Image();
sporeRoundImage.src = 'assets/25px-Spore_Round_-Base-.webp';
const swordSharpenedImage = new Image();
swordSharpenedImage.src = 'assets/EGOWeaponSwordSharpenedbyTears.webp';
const blessingShieldImage = new Image();
blessingShieldImage.src = 'assets/KnightOfDespairBlessingShield.png';
const egoWeaponSolemnVowBlackImage = new Image();
egoWeaponSolemnVowBlackImage.src = 'assets/EGOWeaponSolemnVow_Black.jpg';
const egoWeaponSolemnVowWhiteImage = new Image();
egoWeaponSolemnVowWhiteImage.src = 'assets/EGOWeaponSolemnVow_White.jpg';
const kaleidoscopeMuzzleImage = new Image();
kaleidoscopeMuzzleImage.src = 'assets/KaleidoscopeMuzzle.png';
kaleidoscopeMuzzleImage.onerror = () => {
    kaleidoscopeMuzzleImage.src = 'assets/ButterfliesSpriteSheet.png';
};
const funeralDeadButterfliesPortraitImage = new Image();
funeralDeadButterfliesPortraitImage.src = 'assets/FuneraloftheDeadButterfliesPortrait.webp';
funeralDeadButterfliesPortraitImage.onerror = () => {
    funeralDeadButterfliesPortraitImage.src = 'assets/ButterfliesSpriteSheet.png';
};
const portalImage = new Image();
portalImage.src = 'assets/DerFreischützPortal.png';
const minigunImage = new Image();
minigunImage.src = 'assets/Minigun_IMG.png';
const blutsaugerImage = new Image();
blutsaugerImage.src = 'assets/Blutsauger.png';
const shortCircuitImage = new Image();
shortCircuitImage.src = 'assets/Short_circuit.png';
const rocketLauncherImage = new Image();
rocketLauncherImage.src = 'assets/Rocket_launcher.png';
const pipLauncherImage = new Image();
pipLauncherImage.src = 'assets/Pip_launcher.png';
const beggersBazookaImage = new Image();
beggersBazookaImage.src = "assets/Beggar's_Bazooka.png";
const directHitImage = new Image();
directHitImage.src = 'assets/Directhittransparent.png';
const rocketJumperImage = new Image();
rocketJumperImage.src = 'assets/Rocket_Jumper.png';
const yellowTargeImage = new Image();
yellowTargeImage.src = 'assets/YellowTarge.png';
const medigunImage = new Image();
medigunImage.src = 'assets/RED_Medigun.png';
const grenadeLauncherImage = new Image();
grenadeLauncherImage.src = 'assets/Grenade_Launcher.png';
const flamethrowerImage = new Image();
flamethrowerImage.src = 'assets/RedFlamethrowerpng.png';
const deadRingerImage = new Image();
deadRingerImage.src = 'assets/Dead_Ringer.png';
const scrumpyBottleImage = new Image();
scrumpyBottleImage.src = 'assets/BottleScreen.png';
const truePistolImage = new Image();
truePistolImage.src = 'assets/Pistol_True.png';
const revolverImage = new Image();
revolverImage.src = 'assets/Pistol.png';
const pickupShotgunIcon = new Image();
pickupShotgunIcon.src = 'assets/Shotgun_IMG.png';
const familyBusinessImage = new Image();
familyBusinessImage.src = 'assets/Familybusiness.PNG';
const sodaPopperImage = new Image();
sodaPopperImage.src = 'assets/250px-Soda_Popper.PNG';
const forceANatureImage = new Image();
forceANatureImage.src = 'assets/Force-A-Nature.png';
forceANatureImage.onerror = () => {
    forceANatureImage.src = 'assets/250px-Soda_Popper.PNG';
};
const magicianHatImage = new Image();
magicianHatImage.src = 'assets/Magic-Hat-PNG-Image-File-3052888691.png';
const musketImage = new Image();
musketImage.src = 'assets/rifle-on-a-transparent-free-png-864369422.png';
const smokeImage = new Image();
smokeImage.src = 'assets/smoke_PNG55177-3419754768.png';
const widowmakerImage = new Image();
widowmakerImage.src = 'assets/Widowmaker.png';
const pickupPokerIcon = new Image();
pickupPokerIcon.src = 'assets/Poker.jpg';
const pickupAmmoicoIcon = new Image();
pickupAmmoicoIcon.src = 'assets/Ammoico.png';
const pickupHealthicoIcon = new Image();
pickupHealthicoIcon.src = 'assets/Healthico.png';
const pickupUberIcon = new Image();
pickupUberIcon.src = 'assets/UberCharge_Canteen.png';
const pickupCriticalIcon = new Image();
pickupCriticalIcon.src = 'assets/Critical_Hit_Boost_Canteen.png';
const pickupSpeedIcon = new Image();
pickupSpeedIcon.src = 'assets/SPEED.png';
const pickupBombanomicronIcon = new Image();
pickupBombanomicronIcon.src = 'assets/RED_Bombinomicon.png';

const game = new Game(
    canvas,
    pistolProjectileImage,
    syringeAmmoImage,
    rocketAmmoImage,
    grenadeAmmoImage,
    arrowProjectileImage,
    crusadersCrossbowProjectileImage,
    explosiveFlaskImage,
    bunnyProjectileImage,
    magicBulletProjectileImage,
    appleProjectileImage,
    sniperRifleImage,
    machinaImage,
    huntsmanImage,
    crusadersCrossbowImage,
    smgImage,
    tommyGunImage,
    egoWeaponMagicBulletImage,
    egoWeaponLonelinessImage,
    egoWeaponPenitenceImage,
    egoWeaponParadiseLostImage,
    egoWeaponHarmonyImage,
    egoWeaponSolemnVowBlackImage,
    egoWeaponSolemnVowWhiteImage,
    kaleidoscopeMuzzleImage,
    funeralDeadButterfliesPortraitImage,
    portalImage,
    minigunImage,
    blutsaugerImage,
    shortCircuitImage,
    rocketLauncherImage,
    pipLauncherImage,
    beggersBazookaImage,
    directHitImage,
    rocketJumperImage,
    yellowTargeImage,
    medigunImage,
    grenadeLauncherImage,
    flamethrowerImage,
    deadRingerImage,
    truePistolImage,
    revolverImage,
    pickupShotgunIcon,
    familyBusinessImage,
    sodaPopperImage,
    forceANatureImage,
    magicianHatImage,
    musketImage,
    widowmakerImage,
    scrumpyBottleImage,
    smokeImage,
    egoWeaponHornetImage,
    hornetShotgunSpriteImage,
    sporeImage,
    sporeRoundImage,
    swordSharpenedImage,
    blessingShieldImage,
    {
    pistol: truePistolImage,
    revolver: revolverImage,
    shotgun: pickupShotgunIcon,
    familybusiness: familyBusinessImage,
    sodapopper: sodaPopperImage,
    forceanature: forceANatureImage,
    musket: musketImage,
    magicianhat: magicianHatImage,
    widowmaker: widowmakerImage,
    poker: pickupPokerIcon,
    sniper: sniperRifleImage,
    machina: machinaImage,
    huntsman: huntsmanImage,
    crusaderscrossbow: crusadersCrossbowImage,
    smg: smgImage,
    tommygun: tommyGunImage,
    egomagicbullet: egoWeaponMagicBulletImage,
    egoloneliness: egoWeaponLonelinessImage,
    penitence: egoWeaponPenitenceImage,
    paradiselost: egoWeaponParadiseLostImage,
    harmony: egoWeaponHarmonyImage,
    hornet: egoWeaponHornetImage,
    solemnvow: egoWeaponSolemnVowBlackImage,
    minigun: minigunImage,
    blutsauger: blutsaugerImage,
        shortcircuit: shortCircuitImage,
    rocketlauncher: rocketLauncherImage,
    piplauncher: pipLauncherImage,
    beggersbazooka: beggersBazookaImage,
    directhit: directHitImage,
    nearmissed: directHitImage,
    rocketjumper: rocketJumperImage,
    yellowtarge: yellowTargeImage,
    medigun: medigunImage,
    grenadelauncher: grenadeLauncherImage,
    flamethrower: flamethrowerImage,
    ammoico: pickupAmmoicoIcon,
        healthico: pickupHealthicoIcon,
        ubercharge: pickupUberIcon,
        critical: pickupCriticalIcon,
        speed: pickupSpeedIcon,
        explosiveflask: explosiveFlaskImage,
        scrumpybottle: scrumpyBottleImage,
        bombanomicron: pickupBombanomicronIcon,
        deadringer: deadRingerImage
    },
    gameSettings
);

const sandboxInput = sandboxMode
    ? {
        keys: new Set(),
        pointerX: game.canvas.width / 2,
        pointerY: game.canvas.height / 2,
        isFiring: false
    }
    : null;

const sandboxMetrics = sandboxMode
    ? {
        damageSamples: [],
        hpById: new Map()
    }
    : null;

if (sandboxMode) {
    const player = game.balls[0];
    const staticDummy = game.balls[1];
    const movingDummy = game.balls[2];

    player.isPlayerControlled = true;
    player.teamId = 1;
    player.displayName = 'Sandbox Tester';
    player.maxHP = 100000;
    player.hp = 100000;
    player.maxSpeed = 4;
    player.minSpeed = 0;
    player.pos.x = 160;
    player.pos.y = 300;
    player.vel.x = 0;
    player.vel.y = 0;
    player.impulseVel.x = 0;
    player.impulseVel.y = 0;
    player.nextShootAllowedAt = 0;

    staticDummy.isTrainingDummy = true;
    staticDummy.teamId = 2;
    staticDummy.displayName = 'Static Dummy';
    staticDummy.maxHP = 100000;
    staticDummy.hp = 100000;
    staticDummy.maxSpeed = 0;
    staticDummy.minSpeed = 0;
    staticDummy.pos.x = 560;
    staticDummy.pos.y = 300;
    staticDummy.vel.x = 0;
    staticDummy.vel.y = 0;
    staticDummy.impulseVel.x = 0;
    staticDummy.impulseVel.y = 0;

    movingDummy.isTrainingDummy = true;
    movingDummy.teamId = 2;
    movingDummy.displayName = 'Moving Dummy';
    movingDummy.maxHP = 100000;
    movingDummy.hp = 100000;
    movingDummy.maxSpeed = 4;
    movingDummy.minSpeed = 1;
    movingDummy.pos.x = 640;
    movingDummy.pos.y = 170;
    movingDummy.vel.x = -3.2;
    movingDummy.vel.y = 2.4;
    movingDummy.impulseVel.x = 0;
    movingDummy.impulseVel.y = 0;

    sandboxMetrics.hpById.set(staticDummy.id, staticDummy.hp);
    sandboxMetrics.hpById.set(movingDummy.id, movingDummy.hp);
}

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

function getSandboxTarget(now) {
    if (!sandboxMode) return null;

    const player = game.balls[0];
    const enemies = game.balls.filter(ball => ball.id !== player.id && ball.isAlive() && game.areEnemies(player, ball) && !ball.isUntargetable(now));
    if (enemies.length === 0) return null;

    // Prefer the dummy directly under the reticle.
    let hovered = null;
    let hoveredDistance = Infinity;
    for (const candidate of enemies) {
        const dx = candidate.pos.x - sandboxInput.pointerX;
        const dy = candidate.pos.y - sandboxInput.pointerY;
        const distance = Math.hypot(dx, dy);
        if (distance <= candidate.radius + 6 && distance < hoveredDistance) {
            hovered = candidate;
            hoveredDistance = distance;
        }
    }
    if (hovered) return hovered;

    // Otherwise choose the first enemy intersected by the current aim ray.
    const aimDx = sandboxInput.pointerX - player.pos.x;
    const aimDy = sandboxInput.pointerY - player.pos.y;
    const aimLength = Math.hypot(aimDx, aimDy);
    if (aimLength > 0.0001) {
        const dirX = aimDx / aimLength;
        const dirY = aimDy / aimLength;
        const maxDistance = Math.max(game.canvas.width, game.canvas.height) * 2;

        let firstHit = null;
        let firstHitDistance = Infinity;

        for (const candidate of enemies) {
            const hitDistance = game.rayCircleHitDistance(
                player.pos.x,
                player.pos.y,
                dirX,
                dirY,
                candidate.pos.x,
                candidate.pos.y,
                candidate.radius,
                maxDistance
            );

            if (hitDistance !== null && hitDistance < firstHitDistance) {
                firstHit = candidate;
                firstHitDistance = hitDistance;
            }
        }

        if (firstHit) return firstHit;

        // If no exact intersection, choose the closest target to the aim line in front of the player.
        let bestAligned = null;
        let bestLineDistance = Infinity;

        for (const candidate of enemies) {
            const toX = candidate.pos.x - player.pos.x;
            const toY = candidate.pos.y - player.pos.y;
            const projection = toX * dirX + toY * dirY;
            if (projection <= 0) continue;

            const closestX = player.pos.x + dirX * projection;
            const closestY = player.pos.y + dirY * projection;
            const lineDistance = Math.hypot(candidate.pos.x - closestX, candidate.pos.y - closestY);
            const lockThreshold = candidate.radius + 20;

            if (lineDistance <= lockThreshold && lineDistance < bestLineDistance) {
                bestAligned = candidate;
                bestLineDistance = lineDistance;
            }
        }

        if (bestAligned) return bestAligned;
    }

    return null;
}

function updateSandboxControls() {
    if (!sandboxMode) return;

    const player = game.balls[0];
    const moveX = (sandboxInput.keys.has('d') ? 1 : 0) - (sandboxInput.keys.has('a') ? 1 : 0);
    const moveY = (sandboxInput.keys.has('s') ? 1 : 0) - (sandboxInput.keys.has('w') ? 1 : 0);

    if (moveX === 0 && moveY === 0) {
        player.vel.x = 0;
        player.vel.y = 0;
    } else {
        const length = Math.hypot(moveX, moveY) || 1;
        const speed = player.maxSpeed || 4;
        player.vel.x = (moveX / length) * speed;
        player.vel.y = (moveY / length) * speed;
    }

    player.aimAngle = Math.atan2(sandboxInput.pointerY - player.pos.y, sandboxInput.pointerX - player.pos.x);
}

function handleSandboxShot() {
    if (!sandboxMode) return;

    const now = Date.now();
    const player = game.balls[0];
    const lockedTarget = getSandboxTarget(now);
    const target = lockedTarget || {
        id: 'sandbox-aim-point',
        pos: {
            x: sandboxInput.pointerX,
            y: sandboxInput.pointerY
        },
        isAlive: () => true,
        isUntargetable: () => false
    };

    fireControlledWeaponImpl(game, player, target, now);
}

function updateSandboxDps(now) {
    if (!sandboxMode || !sandboxMetrics) return;

    for (let i = 1; i < game.balls.length; i++) {
        const dummy = game.balls[i];
        const previousHp = sandboxMetrics.hpById.get(dummy.id);
        if (typeof previousHp === 'number' && dummy.hp < previousHp) {
            sandboxMetrics.damageSamples.push({
                time: now,
                damage: previousHp - dummy.hp
            });
        }
        sandboxMetrics.hpById.set(dummy.id, dummy.hp);
    }

    const cutoff = now - 1000;
    while (sandboxMetrics.damageSamples.length > 0 && sandboxMetrics.damageSamples[0].time < cutoff) {
        sandboxMetrics.damageSamples.shift();
    }

    let dps = 0;
    for (const sample of sandboxMetrics.damageSamples) {
        dps += sample.damage;
    }

    if (sandboxDpsEl) {
        sandboxDpsEl.textContent = `DPS: ${dps.toFixed(1)}`;
    }
}

if (sandboxMode) {
    window.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
            sandboxInput.keys.add(key);
            event.preventDefault();
            return;
        }

        if (key === 'r') {
            const player = game.balls[0];
            const now = Date.now();
            const reloadForm = player.weapon.type === 'hornet'
                ? (player.weapon.hornetForm || 'rifle')
                : null;
            player.weapon.startReload(now, reloadForm);
            event.preventDefault();
        }
    });

    window.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
            sandboxInput.keys.delete(key);
            event.preventDefault();
        }
    });

    game.canvas.addEventListener('pointermove', (event) => {
        const rect = game.canvas.getBoundingClientRect();
        const scaleX = game.canvas.width / rect.width;
        const scaleY = game.canvas.height / rect.height;
        sandboxInput.pointerX = (event.clientX - rect.left) * scaleX;
        sandboxInput.pointerY = (event.clientY - rect.top) * scaleY;
    });

    game.canvas.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;
        sandboxInput.isFiring = true;
        handleSandboxShot();
    });

    window.addEventListener('pointerup', () => {
        sandboxInput.isFiring = false;
    });

    window.addEventListener('blur', () => {
        sandboxInput.isFiring = false;
        sandboxInput.keys.clear();
    });

    game.canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
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
            const chargePercent = Math.round(Math.min(100, (ball.sodaPopper.chargeDamage / SODA_POPPER_CHARGE_DAMAGE_REQUIRED) * 100));
            if (now < ball.sodaPopper.hypeUntil) {
                const hypeLeft = ((ball.sodaPopper.hypeUntil - now) / 1000).toFixed(1);
                weaponState.textContent = `${ball.weapon.getInfo(now)} | HYPE x${SODA_POPPER_HYPE_DAMAGE_MULTIPLIER.toFixed(2)} (${hypeLeft}s)`;
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

    if (sandboxMode) {
        const weaponLabel = game.balls[0].weapon.getInfo(now);
        statusEl.textContent = `Sandbox: ${weaponLabel} | WASD move | pointer aim | hold left click shoot | R reload.`;
        dealerStatusEl.textContent = 'Training dummies: 100000 HP.';
    } else if (game.gameOver) {
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

    if (!sandboxMode) {
        dealerStatusEl.textContent = game.getDealerStatusText();
    }
}

function loop() {
    updateSandboxControls();
    if (sandboxMode && sandboxInput.isFiring) {
        handleSandboxShot();
    }
    game.update();
    updateSandboxDps(Date.now());
    game.draw();
    updateUI();
    requestAnimationFrame(loop);
}

loop();