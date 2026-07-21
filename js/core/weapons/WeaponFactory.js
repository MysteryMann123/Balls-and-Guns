// WeaponFactory — Factory Method registry for weapons.
//
// Weapon modules self-register by calling WeaponFactory.register(type, WeaponClass)
// as a side effect of being imported (see js/weapons2/Pistol.js). This file never
// needs to know weapon type strings in advance — adding a new weapon never means
// editing this file, unlike the old WEAPON_CONFIGS / _weaponNS maps in js/weapon.js.

const registry = new Map();

export const WeaponFactory = {
    register(type, WeaponClass) {
        if (registry.has(type)) {
            throw new Error(`WeaponFactory: "${type}" is already registered`);
        }
        registry.set(type, WeaponClass);
    },

    create(type, ...args) {
        const WeaponClass = registry.get(type);
        if (!WeaponClass) {
            throw new Error(`WeaponFactory: no weapon registered for type "${type}". Did you forget to import its module?`);
        }
        return new WeaponClass(...args);
    },

    has(type) {
        return registry.has(type);
    },

    types() {
        return [...registry.keys()];
    },
};
