// Risk class color mappings and chip creation
const RISK_CLASS_COLORS = {
    ZAYIN: '#19e04b',
    TETH: '#3ca3f7',
    HE: '#f8eb3a',
    WAW: '#8317f7',
    ALEPH: '#f03333'
};

function makeChip(riskClass) {
    return {
        label: 'Risk Class',
        value: riskClass,
        valueColor: RISK_CLASS_COLORS[riskClass] || '#ffffff'
    };
}

export { RISK_CLASS_COLORS, makeChip };
