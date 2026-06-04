import * as Weapons from '../../weapons/index.js';
import { buildWeaponChips } from './chipBuilder.js';
import { makeChip } from './riskClass.js';
import { TYPE_IMAGES } from './utility.js';

const containerSelectors = {
    title: '#detail-title',
    subtitle: '#detail-subtitle',
    chips: '#detail-chips',
    notes: '#detail-notes',
    imgWrap: '#detail-img-wrap',
    img: '#detail-img',
    dealerTableWrap: '#dealer-table-wrap',
    dealerTableBody: '#dealer-table-body',
    detailPanel: '.detail-full-panel'
};

// Map lowercase weapon types (from gameConfig) to camelCase export names (from weapons/index.js)
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

function renderWeaponDetail(type) {
    // Get weapon module, using name mapping for camelCase exports
    const exportName = WEAPON_NAME_MAP[type] || type;
    const weaponModule = Weapons[exportName];

    // Get DOM elements
    const titleEl = document.querySelector(containerSelectors.title);
    const subtitleEl = document.querySelector(containerSelectors.subtitle);
    const chipsEl = document.querySelector(containerSelectors.chips);
    const notesEl = document.querySelector(containerSelectors.notes);
    const imgWrapEl = document.querySelector(containerSelectors.imgWrap);
    const imgEl = document.querySelector(containerSelectors.img);
    const detailPanelEl = document.querySelector(containerSelectors.detailPanel);

    // Format title from weapon module DISPLAY_NAME or fallback
    const displayName = weaponModule?.DISPLAY_NAME ||
        type.split(/[_\s-]+/g).map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');

    titleEl.textContent = displayName;
    subtitleEl.textContent = 'Weapon';

    // Set image
    const imageFile = TYPE_IMAGES[type];
    if (imageFile) {
        imgEl.onerror = () => {
            imgWrapEl.classList.add('hidden');
            imgEl.removeAttribute('src');
            imgEl.onerror = null;
        };
        imgEl.src = `./${imageFile}`;
        imgEl.alt = `${displayName} image`;
        imgWrapEl.classList.remove('hidden');
    } else {
        imgWrapEl.classList.add('hidden');
        imgEl.removeAttribute('src');
    }

    // Build and render chips from weapon module properties
    const statChips = buildWeaponChips(weaponModule);

    // Add risk class chip if weapon has riskClass
    if (weaponModule?.riskClass) {
        statChips.push(makeChip(weaponModule.riskClass));
    }

    chipsEl.innerHTML = '';
    for (const chipData of statChips) {
        const chip = document.createElement('div');
        chip.className = 'stat-chip';
        if (Array.isArray(chipData)) {
            const [chipLabel, chipValue, chipColor] = chipData;
            chip.innerHTML = `<span class="chip-label">${chipLabel}</span><span class="chip-value"${chipColor ? ` style="color: ${chipColor};"` : ''}>${chipValue}</span>`;
        } else if (typeof chipData === 'object' && chipData) {
            chip.innerHTML = `<span class="chip-label">${chipData.label}</span><span class="chip-value" style="color: ${chipData.valueColor || '#fff'};">${chipData.value}</span>`;

            // Apply special TAV rainbow animation
            if (chipData.special === 'rainbow') {
                chip.classList.add('stat-chip-tav-rainbow');
            }
        }
        chipsEl.appendChild(chip);
    }

    // Render description and notes
    notesEl.innerHTML = '';
    let description = [];

    if (weaponModule?.description) {
        if (typeof weaponModule.description === 'function') {
            description = weaponModule.description(weaponModule);
        } else if (Array.isArray(weaponModule.description)) {
            description = weaponModule.description;
        }
    }

    for (const note of description) {
        const noteEl = document.createElement('li');
        noteEl.textContent = note;
        notesEl.appendChild(noteEl);
    }

    // Set risk class data attribute if applicable
    if (weaponModule?.riskClass) {
        detailPanelEl.dataset.risk = weaponModule.riskClass;
    } else {
        delete detailPanelEl.dataset.risk;
    }

    // Render dealer table if needed
    renderDealerTable(type, weaponModule);
}

function renderDealerTable(type, weaponModule) {
    const dealerTableWrapEl = document.querySelector(containerSelectors.dealerTableWrap);
    const dealerTableBodyEl = document.querySelector(containerSelectors.dealerTableBody);

    if (type !== 'dealer' || !weaponModule?.HAND_DAMAGE_TABLE) {
        dealerTableWrapEl.classList.add('hidden');
        dealerTableBodyEl.innerHTML = '';
        return;
    }

    dealerTableBodyEl.innerHTML = '';
    const handEntries = Object.entries(weaponModule.HAND_DAMAGE_TABLE);

    for (const [handName, values] of handEntries) {
        const row = document.createElement('tr');
        const handCell = document.createElement('td');
        const baseCell = document.createElement('td');
        const multCell = document.createElement('td');

        handCell.textContent = handName;
        baseCell.textContent = `${values?.value ?? 0}`;
        multCell.textContent = `x${values?.multiplier ?? 1}`;

        row.appendChild(handCell);
        row.appendChild(baseCell);
        row.appendChild(multCell);
        dealerTableBodyEl.appendChild(row);
    }

    dealerTableWrapEl.classList.remove('hidden');
}

export { renderWeaponDetail };
