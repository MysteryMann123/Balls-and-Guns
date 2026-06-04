import { START_WEAPON_OPTIONS } from '../../gameConfig.js';
import * as Weapons from '../../weapons/index.js';
import { renderWeaponDetail } from './weaponDetail.js';
import { formatLabel, TYPE_IMAGES } from './utility.js';

// Map lowercase weapon types to camelCase export names
const WEAPON_NAME_MAP = {
    'familybusiness': 'familyBusiness',
    'sodapopper': 'sodaPopper',
    'forceanature': 'forceANature',
    'magicianhat': 'magicianHat',
    'crusaderscrossbow': 'crusadersCrossbow',
    'egomagicbullet': 'egoMagicBullet',
    'egoloneliness': 'egoLoneliness',
    'paradiselost': 'paradiseLost',
    'solemnvow': 'solemnVow',
    'swordsharpened': 'swordSharpened',
    'egolovehate': 'egoLoveHate',
    'soundofstar': 'soundOfStar',
    'tommygun': 'tommyGun',
    'shortcircuit': 'shortCircuit',
    'yellowtarge': 'yellowTarge',
    'rocketlauncher': 'rocketLauncher',
    'piplauncher': 'pipLauncher',
    'grenadelauncher': 'grenadeLauncher',
    'lochnload': 'lochNLoad',
    'beggersbazooka': 'beggersBasooka',
    'directhit': 'directHit',
    'nearmissed': 'nearMissed',
    'rocketjumper': 'rocketJumper',
    'crimsonscar': 'crimsonScar',
    'egopinks': 'egoPinks',
    'egosoda': 'egoSoda',
    'faintaroma': 'faintAroma'
};

function renderWeaponList(listEl) {
    listEl.innerHTML = '';

    for (const type of START_WEAPON_OPTIONS) {
        const button = document.createElement('button');
        button.className = 'list-item';

        // Get weapon module and apply risk class styling
        const exportName = WEAPON_NAME_MAP[type] || type;
        const weaponModule = Weapons[exportName];

        if (weaponModule?.riskClass) {
            if (weaponModule.riskClass === 'TAV') {
                button.classList.add('list-item-tav');
            } else {
                button.dataset.risk = weaponModule.riskClass;
            }
        }

        const label = formatLabel(type);

        // Add thumbnail and label
        const imageFile = TYPE_IMAGES[type];
        const thumbWrap = document.createElement('span');
        thumbWrap.className = 'list-thumb-wrap';
        const thumb = document.createElement('img');
        thumb.className = 'list-thumb';

        if (imageFile) {
            thumb.src = `./${imageFile}`;
            thumb.alt = `${label} icon`;
            thumb.onerror = () => {
                thumbWrap.classList.add('hidden');
                thumb.removeAttribute('src');
                thumb.onerror = null;
            };
        } else {
            thumbWrap.classList.add('hidden');
        }

        const labelEl = document.createElement('span');
        labelEl.className = 'list-label';
        labelEl.textContent = label;

        thumbWrap.appendChild(thumb);
        button.appendChild(thumbWrap);
        button.appendChild(labelEl);

        // Attach click handler
        button.addEventListener('click', () => {
            setActiveButton(button);
            renderWeaponDetail(type);
        });

        listEl.appendChild(button);
    }

    // Auto-select first weapon
    const first = listEl.querySelector('button');
    if (first) {
        first.click();
    }
}

function setActiveButton(button) {
    const buttons = Array.from(button.parentElement.querySelectorAll('button'));
    for (const item of buttons) {
        item.classList.toggle('active', item === button);
    }
}

export { renderWeaponList };
