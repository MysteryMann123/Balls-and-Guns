import { setupTabs, setActiveTab } from './tabs.js';
import { renderWeaponList } from './weaponList.js';
import { renderUtilityList } from './utilityList.js';

// Get DOM references
const listEl = document.getElementById('stats-list');

function initStatsV2() {
    // Setup tab switching
    const callbacks = {
        onWeapons: () => renderWeaponList(listEl),
        onUtilities: () => renderUtilityList(listEl)
    };

    setupTabs(callbacks);

    // Initial render: weapons tab
    setActiveTab('weapons', callbacks);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsV2);
} else {
    initStatsV2();
}

export { initStatsV2 };
