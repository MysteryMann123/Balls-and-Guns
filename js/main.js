import { BALL_MAX_HP, SODA_POPPER_CHARGE_DAMAGE_REQUIRED, SODA_POPPER_HYPE_DAMAGE_MULTIPLIER } from './constants.js';
import { Game } from './game.js';

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
const sodaPopperImage = new Image();
sodaPopperImage.src = 'assets/250px-Soda_Popper.PNG';
const forceANatureImage = new Image();
forceANatureImage.src = 'assets/Force-A-Nature.png';
forceANatureImage.onerror = () => {
    forceANatureImage.src = 'assets/250px-Soda_Popper.PNG';
};
const magicianHatImage = new Image();
magicianHatImage.src = 'assets/Magic-Hat-PNG-Image-File-3052888691.png';
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
    sniperRifleImage,
    machinaImage,
    huntsmanImage,
    crusadersCrossbowImage,
    smgImage,
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
    sodaPopperImage,
    forceANatureImage,
    magicianHatImage,
    widowmakerImage,
    scrumpyBottleImage,
    smokeImage,
    {
    pistol: truePistolImage,
    revolver: revolverImage,
    shotgun: pickupShotgunIcon,
    sodapopper: sodaPopperImage,
    forceanature: forceANatureImage,
    magicianhat: magicianHatImage,
    widowmaker: widowmakerImage,
    poker: pickupPokerIcon,
    sniper: sniperRifleImage,
    machina: machinaImage,
    huntsman: huntsmanImage,
    crusaderscrossbow: crusadersCrossbowImage,
    minigun: minigunImage,
    blutsauger: blutsaugerImage,
        shortcircuit: shortCircuitImage,
    rocketlauncher: rocketLauncherImage,
    piplauncher: pipLauncherImage,
    beggersbazooka: beggersBazookaImage,
    directhit: directHitImage,
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
            <span class="hp-value" id="ball${i + 1}-hp-value">${BALL_MAX_HP} / ${BALL_MAX_HP}</span>
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
        const hpPercent = Math.max(0, (ball.hp / BALL_MAX_HP) * 100);
        const displayPercent = Math.min(100, hpPercent);
        const isOverhealed = ball.hp > BALL_MAX_HP;
        const bar = document.getElementById(`ball${i + 1}-hp`);
        const value = document.getElementById(`ball${i + 1}-hp-value`);
        const weaponState = document.getElementById(`ball${i + 1}-weapon`);
        const uberState = document.getElementById(`ball${i + 1}-uber`);
        bar.style.width = `${displayPercent}%`;
        bar.style.background = isOverhealed ? lightenHexColor(ball.color, 0.34) : ball.color;
        value.textContent = `${Math.round(ball.hp)} / ${BALL_MAX_HP}`;
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