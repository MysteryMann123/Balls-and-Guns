import { healthico } from './healthico.js';
import { ammoico } from './ammoico.js';
import { ubercharge } from './ubercharge.js';
import { critical } from './critical.js';
import { speed } from './speed.js';
import { explosiveFlask } from './explosiveFlask.js';
import { scrumpyBottle } from './scrumpyBottle.js';
import { bombanomicron } from './bombanomicron.js';
import { deadRinger } from './deadRinger.js';

// Re-export all items
export { healthico, ammoico, ubercharge, critical, speed, explosiveFlask, scrumpyBottle, bombanomicron, deadRinger };

// Helper: Lookup table for colors (used in pickup.js)
export const ITEM_COLORS = {
    healthico: healthico.color,
    ammoico: ammoico.color,
    ubercharge: ubercharge.color,
    critical: critical.color,
    speed: speed.color,
    explosiveFlask: explosiveFlask.color,
    scrumpyBottle: scrumpyBottle.color,
    bombanomicron: bombanomicron.color,
    deadRinger: deadRinger.color,
};
