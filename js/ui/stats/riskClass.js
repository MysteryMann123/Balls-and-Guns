// Risk class color mappings and chip creation
const RISK_CLASS_COLORS = {
    ZAYIN: '#19e04b',
    TETH: '#3ca3f7',
    HE: '#f8eb3a',
    WAW: '#8317f7',
    ALEPH: '#f03333',
    TAV: '#ffd700' // Gold base, animated rainbow effect
};

function makeChip(riskClass) {
    const chip = {
        label: 'Risk Class',
        value: riskClass,
        valueColor: RISK_CLASS_COLORS[riskClass] || '#ffffff'
    };

    // Mark TAV for special rainbow animation
    if (riskClass === 'TAV') {
        chip.special = 'rainbow';
    }

    return chip;
}

export { RISK_CLASS_COLORS, makeChip };
