import { Weapon } from '../weapon.js';
import * as C from '../constants.js';
import { toMsText } from './utility.js';
import { makeChip } from './riskClass.js';

function buildWeaponChips(type) {
    const weapon = new Weapon(type);
    const chips = [];

    chips.push(['Ammo', weapon.maxAmmo === Infinity ? '∞' : `${weapon.maxAmmo}`]);

    if (weapon.reloadTimeMs && weapon.reloadTimeMs > 0) {
        chips.push(['Reload', toMsText(weapon.reloadTimeMs)]);
    } else {
        chips.push(['Reload', 'N/A']);
    }

    chips.push(['Fire Interval', `${weapon.fireRate} ms`]);

    if (typeof weapon.damageMin === 'number' && typeof weapon.damageMax === 'number') {
        chips.push(['Damage', `${weapon.damageMin} - ${weapon.damageMax}`]);
    } else {
        chips.push(['Damage', `${weapon.damage ?? 0}`]);
    }

    chips.push(['Projectile Speed', `${weapon.speed}`]);

    if (typeof weapon.pelletsPerShot === 'number') {
        chips.push(['Pellets/Shot', `${weapon.pelletsPerShot}`]);
    }

    if (typeof weapon.spreadAngle === 'number') {
        chips.push(['Spread', `${weapon.spreadAngle}`]);
    }

    if (typeof weapon.splashRadius === 'number') {
        chips.push(['Splash Radius', `${weapon.splashRadius}`]);
    }

    // Special weapon type handling will be added in Phase 4
    // For now, return base stats only

    return chips;
}

function buildUtilityChips(type, utility) {
    return [];
}

export { buildWeaponChips, buildUtilityChips };
