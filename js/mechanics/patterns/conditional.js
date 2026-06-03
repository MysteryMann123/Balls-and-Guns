// Mechanics module: conditional
// Triggers or modulates mechanics based on game state conditions.
// Enables/disables effects or changes values per condition.
//
// Weapons: lochNLoad (speed > threshold = damage), beggersBasooka (random spread)

export function create(conditions) {
    return { CONDITIONS: conditions };
}

export function checkCondition(state, condition) {
    if (!condition) return false;

    const { type, value, threshold, operator } = condition;

    switch (type) {
        case 'threshold':
            if (operator === 'above' || operator === '>') return value > threshold;
            if (operator === 'below' || operator === '<') return value < threshold;
            if (operator === 'equal' || operator === '===') return value === threshold;
            if (operator === 'atLeast' || operator === '>=') return value >= threshold;
            if (operator === 'atMost' || operator === '<=') return value <= threshold;
            break;

        case 'boolean':
            return !!value;

        case 'range':
            return value >= threshold && value <= condition.max;

        case 'custom':
            return condition.fn ? condition.fn(state) : false;
    }

    return false;
}

export function evaluateAll(state, conditions) {
    if (!conditions || conditions.length === 0) return true;
    return conditions.every(cond => checkCondition(state, cond));
}

export function evaluateAny(state, conditions) {
    if (!conditions || conditions.length === 0) return false;
    return conditions.some(cond => checkCondition(state, cond));
}

export function getActiveCondition(state, conditionList) {
    if (!conditionList || conditionList.length === 0) return null;
    for (const condition of conditionList) {
        if (checkCondition(state, condition)) {
            return condition;
        }
    }
    return null;
}

export function getModifier(state, conditionList, defaultValue) {
    const active = getActiveCondition(state, conditionList);
    return active ? (active.modifier !== undefined ? active.modifier : defaultValue) : defaultValue;
}

export function applyModifier(baseValue, modifier, operation = 'multiply') {
    if (operation === 'multiply' || operation === '*') {
        return baseValue * modifier;
    }
    if (operation === 'add' || operation === '+') {
        return baseValue + modifier;
    }
    if (operation === 'set' || operation === '=') {
        return modifier;
    }
    return baseValue;
}

export function shouldTrigger(state, conditions, defaultTrigger = false) {
    if (!conditions) return defaultTrigger;
    return evaluateAll(state, conditions);
}
