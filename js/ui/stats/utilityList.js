import { DROP_UTILITY_TYPES } from '../../gameConfig.js';
import { renderUtilityDetail } from './utilityDetail.js';
import { formatLabel, TYPE_IMAGES } from './utility.js';

function renderUtilityList(listEl) {
    listEl.innerHTML = '';

    for (const type of DROP_UTILITY_TYPES) {
        const button = document.createElement('button');
        button.className = 'list-item';
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
            renderUtilityDetail(type);
        });

        listEl.appendChild(button);
    }

    // Auto-select first utility
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

export { renderUtilityList };
