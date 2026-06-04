import { UTILITY_STATS, TYPE_IMAGES } from './utility.js';

const containerSelectors = {
    title: '#detail-title',
    subtitle: '#detail-subtitle',
    chips: '#detail-chips',
    notes: '#detail-notes',
    imgWrap: '#detail-img-wrap',
    img: '#detail-img',
    dealerTableWrap: '#dealer-table-wrap'
};

function renderUtilityDetail(type) {
    const utilityData = UTILITY_STATS[type];

    if (!utilityData) {
        console.warn(`No utility data found for type: ${type}`);
        return;
    }

    // Get DOM elements
    const titleEl = document.querySelector(containerSelectors.title);
    const subtitleEl = document.querySelector(containerSelectors.subtitle);
    const chipsEl = document.querySelector(containerSelectors.chips);
    const notesEl = document.querySelector(containerSelectors.notes);
    const imgWrapEl = document.querySelector(containerSelectors.imgWrap);
    const imgEl = document.querySelector(containerSelectors.img);
    const dealerTableWrapEl = document.querySelector(containerSelectors.dealerTableWrap);

    // Set title and subtitle
    titleEl.textContent = utilityData.title;
    subtitleEl.textContent = utilityData.subtitle;

    // Set image
    const imageFile = TYPE_IMAGES[type];
    if (imageFile) {
        imgEl.onerror = () => {
            imgWrapEl.classList.add('hidden');
            imgEl.removeAttribute('src');
            imgEl.onerror = null;
        };
        imgEl.src = `./${imageFile}`;
        imgEl.alt = `${utilityData.title} image`;
        imgWrapEl.classList.remove('hidden');
    } else {
        imgWrapEl.classList.add('hidden');
        imgEl.removeAttribute('src');
    }

    // Render chips
    chipsEl.innerHTML = '';
    for (const chipData of (utilityData.chips || [])) {
        const chip = document.createElement('div');
        chip.className = 'stat-chip';
        if (Array.isArray(chipData)) {
            const [chipLabel, chipValue, chipColor] = chipData;
            chip.innerHTML = `<span class="chip-label">${chipLabel}</span><span class="chip-value"${chipColor ? ` style="color: ${chipColor};"` : ''}>${chipValue}</span>`;
        } else if (typeof chipData === 'object' && chipData) {
            chip.innerHTML = `<span class="chip-label">${chipData.label}</span><span class="chip-value" style="color: ${chipData.valueColor || '#fff'};">${chipData.value}</span>`;
        }
        chipsEl.appendChild(chip);
    }

    // Render notes
    notesEl.innerHTML = '';
    for (const note of (utilityData.notes || [])) {
        const noteEl = document.createElement('li');
        noteEl.textContent = note;
        notesEl.appendChild(noteEl);
    }

    // Hide dealer table for utilities
    dealerTableWrapEl.classList.add('hidden');
}

export { renderUtilityDetail };
