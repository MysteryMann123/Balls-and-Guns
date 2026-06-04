// Tab state management and switching logic

let currentMode = 'weapons';

function setActiveTab(mode, callbacks = {}) {
    currentMode = mode;

    const tabButtons = {
        weapons: document.getElementById('tab-weapons'),
        utilities: document.getElementById('tab-utilities')
    };

    tabButtons.weapons.classList.toggle('active', mode === 'weapons');
    tabButtons.utilities.classList.toggle('active', mode === 'utilities');

    if (mode === 'weapons' && callbacks.onWeapons) {
        callbacks.onWeapons();
    } else if (mode === 'utilities' && callbacks.onUtilities) {
        callbacks.onUtilities();
    }
}

function setupTabs(callbacks = {}) {
    const tabButtons = {
        weapons: document.getElementById('tab-weapons'),
        utilities: document.getElementById('tab-utilities')
    };

    tabButtons.weapons.addEventListener('click', () => setActiveTab('weapons', callbacks));
    tabButtons.utilities.addEventListener('click', () => setActiveTab('utilities', callbacks));
}

function getCurrentMode() {
    return currentMode;
}

export { setupTabs, setActiveTab, getCurrentMode };
