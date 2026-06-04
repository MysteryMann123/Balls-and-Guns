# Pre-Removal Audit Report

## 1. Constants.js Dependencies

### Files Still Importing from constants.js:
1. **js/ui/stats.js** (OLD v1) - No longer used, stats.html loads v2
2. **js/ui/stats/chipBuilder.js** (v2) - Uses 210 unique constants for weapon special cases
3. **js/ui/stats/utility.js** (v2) - Uses 4 unique constants (EXPLOSIVE_FLASK_*)
4. **js/ui/stats/weaponDetail.js** (v2) - Uses constants (HAND_DAMAGE_TABLE)
5. **js/weapons/shotgun.js** - UNUSED IMPORT (doesn't use C at all, safe to remove)

### Utilities Decoupling Status:
✓ Fully decoupled - no longer re-exports constants.js
✓ Self-contained with their own constants in item files
✓ utilities/constants.js only has PICKUP_SPAWN_RATE_MS and PICKUP_DELAY_MS

## 2. Old stats.js Dependencies

### stats.html Status:
✓ **Already migrated** - loads `./js/ui/stats/index.js` (v2)
✓ No files reference old `js/ui/stats.js` by path

### Old stats.js Safe to Delete:
✓ Completely replaced by v2 modular system

## 3. Stats.js v2 Verification Needed

Before deletion, please verify in browser:
- [ ] All 48 weapons display with correct stats
- [ ] All descriptions render dynamically
- [ ] Risk classes show on EGO weapons (color-coded)
- [ ] All 9 utilities display with correct stats
- [ ] Utility descriptions are dynamic
- [ ] Tab switching (weapons ↔ utilities) works
- [ ] No console errors

## 4. pickupConstants.js Status

✓ **Zero references** - fully removed already
✓ All constants migrated to utilities/items/ files

## 5. Safe Deletion Candidates

### SAFE TO DELETE (not used anywhere):
1. **js/ui/stats.js** - v1 replaced by js/ui/stats/index.js
2. **js/weapons/shotgun.js** - unused import of constants.js (can remove import)

### KEEP (required for v2):
1. **js/constants.js** - 502 lines, 210+ constants needed by chipBuilder.js
2. **js/ui/stats/index.js** - v2 entry point (active)
3. **js/ui/stats/** folder - all v2 modules (active)

## 6. Orphan Files Check

✓ No other orphaned files detected
✓ No dead code sitting around besides old stats.js

## Summary

### Candidates for Removal:
1. **js/ui/stats.js** (old v1)
2. **shotgun.js unused import** (just the C import line)

### Candidates for Keeping:
1. **js/constants.js** - Essential (210+ constants for chipBuilder)
2. **Entire js/ui/stats/** folder - v2 system in use

### Critical Note:
constants.js **cannot be removed** - v2 chipBuilder uses 210 weapon-specific constants.
It could be refactored/organized, but the constants themselves are needed.

