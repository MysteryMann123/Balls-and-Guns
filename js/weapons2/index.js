// weapons2/index.js — the one file that registers every data-driven weapon.
//
// To add a new weapon: create js/weapons2/data/<name>.js with its stats
// (copy pistol.js as a template), import it below, and call
// registerWeaponData() on it. That's the entire integration step — no other
// file in the project needs to change.
//
// If a weapon needs logic a data file can't express, write a BaseWeapon
// subclass instead (see js/core/weapons/BaseWeapon.js) and register it the
// same way pistol's old class-based version did, via WeaponFactory.register().

import { registerWeaponData } from '../core/weapons/DataWeapon.js';

import pistolData from './data/pistol.js';

registerWeaponData(pistolData);
