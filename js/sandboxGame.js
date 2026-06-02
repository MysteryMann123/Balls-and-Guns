/**
 * SandboxGame — extends Game for 3-entity testing.
 *
 * Design pattern (Strategy + Template Method):
 *   - ball.controller = 'player'  → WASD/mouse, fires only on click
 *   - ball.controller = 'frozen'  → immovable target dummy
 *   - ball.controller = undefined → normal AI (mover ball)
 *
 * gameShooting.js checks ball.controller so real weapon behavior is preserved
 * for all three entities. This class only overrides movement bookkeeping,
 * game-over logic, and ball creation.
 */

import { Game } from './game.js';
import { Ball } from './ball.js';
import { ARENA_WIDTH, ARENA_HEIGHT } from './gameConfig.js';
import { ADORATION_WIELDER_SPEED_MULTIPLIER, SOUND_OF_STAR_WIELDER_SLOW_PER_STAR, CRIMSON_SCAR_SPEED_BONUS } from './constants.js';
import { DealerWeapon } from './weapons/dealer.js';

const DEFAULT_SANDBOX_HP = 1_000_000;

export class SandboxGame extends Game {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {any[]} imageArgs   - spread of every image arg in Game constructor order
     * @param {string} playerWeapon
     * @param {string} moverWeapon
     * @param {number} startHp
     * @param {boolean} moverBall
     */
    constructor(canvas, imageArgs, playerWeapon = 'pistol', moverWeapon = 'pistol', startHp = DEFAULT_SANDBOX_HP, moverBall = false) {
        const entityCount = moverBall ? 3 : 2;
        super(canvas, ...imageArgs, {
            ballCount: entityCount,
            teamCount: entityCount,
            dropFrequencyMs: 99_999_999,
            allowWeaponDrops: false,
            allowUtilityDrops: false,
        });

        this._startHp   = Math.max(1000, startHp);
        this._moverBall = moverBall;

        // Replace auto-created balls with our sandbox setup.
        this.balls = this._makeSandboxBalls(playerWeapon, moverWeapon);

        // Input state — updated every frame by setInput().
        this.playerFiring = false;
        this._keys = {};
        this._mouseX = ARENA_WIDTH / 2;
        this._mouseY = ARENA_HEIGHT / 2;
        this.enemiesShootEnabled = true;
    }

    // -------------------------------------------------------------------------
    // Ball factory
    // -------------------------------------------------------------------------

    _makeSandboxBalls(playerWeapon, moverWeapon) {
        const make = (x, y, color, name, id, teamId) => {
            const b = new Ball(x, y, 20, color, id, name, teamId, ARENA_WIDTH, ARENA_HEIGHT);
            b.hp = this._startHp;
            b.maxHP = this._startHp;
            b.game = this;
            return b;
        };

        // Player ball — cyan, left side.
        const player = make(200, 300, '#4ecdc4', 'Player', 'sb-player', 1);
        player.controller = 'player';
        player.equipWeapon(playerWeapon);
        if (playerWeapon === 'dealer') player.dealerWeaponState = new DealerWeapon();

        // Static dummy — grey, right side, never moves.
        const staticBall = make(650, 300, '#c8c8c8', 'Static', 'sb-static', 2);
        staticBall.controller = 'frozen';
        staticBall.equipWeapon('pistol');

        // Mover ball — red, bounces around, full AI.
        const mover = make(400, 130, '#ff6b6b', 'Mover', 'sb-mover', 3);
        mover.equipWeapon(moverWeapon);
        if (moverWeapon === 'dealer') mover.dealerWeaponState = new DealerWeapon();

        const balls = [player, staticBall];
        if (this._moverBall) balls.push(mover);
        return balls;
    }

    // -------------------------------------------------------------------------
    // Input feed — called from the arena loop each frame
    // -------------------------------------------------------------------------

    setInput(keys, mouseX, mouseY, mouseDown) {
        this._keys = keys;
        this._mouseX = mouseX;
        this._mouseY = mouseY;
        this.playerFiring = mouseDown;
    }

    // -------------------------------------------------------------------------
    // Override: no game-over in sandbox
    // -------------------------------------------------------------------------

    checkGameOver() { /* sandbox runs forever */ }

    // -------------------------------------------------------------------------
    // Override: inject player input before the normal update tick
    // -------------------------------------------------------------------------

    update() {
        const player = this.balls.find(b => b.controller === 'player');
        if (player?.isAlive()) {
            const k = this._keys;
            let dx = 0, dy = 0;
            if (k['w'] || k['ArrowUp'])    dy -= 1;
            if (k['s'] || k['ArrowDown'])  dy += 1;
            if (k['a'] || k['ArrowLeft'])  dx -= 1;
            if (k['d'] || k['ArrowRight']) dx += 1;

            if (dx !== 0 || dy !== 0) {
                const len = Math.sqrt(dx * dx + dy * dy);
                const wieldMult = player.weapon.type === 'adoration' ? ADORATION_WIELDER_SPEED_MULTIPLIER
                : player.weapon.type === 'soundofstar' ? Math.max(0.1, 1 - player.weapon.ammo * SOUND_OF_STAR_WIELDER_SLOW_PER_STAR)
                : player.weapon.type === 'crimsonscar' ? (1 + CRIMSON_SCAR_SPEED_BONUS)
                : 1;
                player.vel.x = (dx / len) * player.maxSpeed * wieldMult;
                player.vel.y = (dy / len) * player.maxSpeed * wieldMult;
            } else {
                player.vel.x = 0;
                player.vel.y = 0;
            }
            // aimAngle from mouse — gameShooting.js will NOT overwrite it for 'player' controller.
            player.aimAngle = Math.atan2(this._mouseY - player.pos.y, this._mouseX - player.pos.x);
        }

        // Keep enemies shoot-locked when disabled
        if (!this.enemiesShootEnabled) {
            const lockNow = Date.now();
            for (const ball of this.balls) {
                if (ball.controller !== 'player') ball.applyShootLock(lockNow, 2000);
            }
        }

        // Freeze the static dummy: save pos, run physics, restore pos.
        const frozen = this.balls.find(b => b.controller === 'frozen');
        const frozenSnap = frozen ? { x: frozen.pos.x, y: frozen.pos.y } : null;

        super.update();

        if (frozen && frozenSnap) {
            frozen.pos.x = frozenSnap.x;
            frozen.pos.y = frozenSnap.y;
            frozen.vel.x = 0;
            frozen.vel.y = 0;
        }
    }
}
