# ChipBuilder Data-Driven Refactor Analysis

## Current State (Monolithic)

### chipBuilder.js
- **210+ constants** imported from constants.js
- **60+ if/type === statements** for special weapon handling
- Logic: check if weapon type matches hardcoded names → generate chips
- **Problem**: defeats modularity, impossible to add weapons without modifying chipBuilder

### Pattern Examples (Current):
```javascript
if (type === 'piplauncher') {
  chips.push(['Flask Cooldown', toMsText(C.EXPLOSIVE_FLASK_COOLDOWN_MS)]);
  chips.push(['Pip Flask Vuln', `x${C.EXPLOSIVE_FLASK_PIP_DAMAGE_MULTIPLIER.toFixed(2)}`]);
}

if (type === 'medigun') {
  chips.push(['Beam Range', `${C.MEDIGUN_BEAM_RANGE}`]);
  chips.push(['Ally Heal/sec', `${C.MEDIGUN_ALLY_HEAL_PER_SEC}`]);
}
```

## Target State (Data-Driven)

### Approach:
1. **Pass weapon object** (not type) to chipBuilder
2. **Read properties directly** from weapon (W.property_name)
3. **Generate chips conditionally** - only if property exists
4. **Zero if statements** - use property existence checks
5. **Zero constants.js imports** - all data in weapon objects

### Example Pattern:
```javascript
// Instead of:
if (type === 'piplauncher') chips.push(['Flask Cooldown', C.EXPLOSIVE_FLASK_COOLDOWN_MS]);

// Do this:
if (weapon.FLASK_COOLDOWN_MS) chips.push(['Flask Cooldown', toMsText(weapon.FLASK_COOLDOWN_MS)]);
```

## Files Requiring Changes

### 1. chipBuilder.js
**Current**: 
- Import: 210+ constants from constants.js
- Signature: `buildWeaponChips(type)`
- Logic: type-based if statements

**Required Changes**:
- Remove ALL constant imports
- Change signature: `buildWeaponChips(weapon)` - accept weapon object
- Remove all `if (type === 'X')` checks
- Replace with property existence checks: `if (weapon.X_PROPERTY)`
- Refactor special cases as optional weapon properties

**Example Refactor**:
```javascript
// Base chips (always check)
if (weapon.AMMO) chips.push(['Ammo', ...]);
if (weapon.RELOAD_MS) chips.push(['Reload', toMsText(weapon.RELOAD_MS)]);

// Special chips (only if property exists)
if (weapon.FLASK_COOLDOWN_MS) chips.push(['Flask Cooldown', toMsText(weapon.FLASK_COOLDOWN_MS)]);
if (weapon.BEAM_RANGE) chips.push(['Beam Range', `${weapon.BEAM_RANGE}`]);
if (weapon.FIRE_RATE_RAMP) chips.push(['Ramp Speed', ...]);
```

### 2. weaponDetail.js
**Current**:
- Calls: `chipBuilder.buildWeaponChips(type)`
- Also imports C from constants.js

**Required Changes**:
- Pass weapon module: `chipBuilder.buildWeaponChips(weaponModule)`
- Remove constants.js import (C)
- Let weapon object provide all needed data

### 3. utilityDetail.js & utility.js
**Current**:
- utility.js imports 4 EXPLOSIVE_FLASK_* constants
- chipBuilder would handle utilities same way

**Required Changes**:
- Move constants into utility object properties
- Pass utility to chipBuilder
- utility.js: remove constants.js imports

## Weapon Properties to Add to Weapon Modules

For special weapon cases, add these properties to weapon objects:

| Property | Used By | Example Weapons |
|----------|---------|-----------------|
| FLASK_COOLDOWN_MS | piplauncher | piplauncher |
| FLASK_VULNERABILITY | piplauncher | piplauncher |
| AMMO_PER_SHOT | widowmaker | widowmaker |
| LOW_AMMO_RELOAD_MS | widowmaker | widowmaker |
| HYPE_* | sodapopper | sodapopper, forceanature |
| BAYONET_* | musket | musket |
| TELEPORT_DISTANCE | magicianhat | magicianhat |
| FIELD_RADIUS | shortcircuit | shortcircuit |
| DOT_DAMAGE | shortcircuit, hairspray | shortcircuit, hairspray |
| RAMP_* | minigun | minigun |
| [Plus 50+ more] | Various | EGO weapons, special mechanics |

## Implementation Strategy

### Step 1: Identify ALL Constants Needed by chipBuilder
```bash
grep -o "C\.[A-Z_]*" js/ui/stats/chipBuilder.js | sort | uniq
# Extract exactly which constants are used
```

### Step 2: Map Constants to Weapon Properties
For each C.CONSTANT_NAME used, decide:
- Add to weapon module as CONSTANT_NAME property? OR
- Leave in constants.js as shared resource?

### Step 3: Refactor chipBuilder
1. Remove constants.js import
2. Change signature to accept weapon object
3. Replace all if/type checks with property existence checks
4. Validate: zero "C." references, zero "if (type ===" matches

### Step 4: Update weaponDetail.js
1. Remove constants.js import
2. Pass weaponModule object instead of type

### Step 5: Update utilityDetail.js & utility.js
1. Move utility constants into item objects
2. Remove constants.js imports
3. Pass utility object to chipBuilder

## What Gets Constants vs Data-Driven

### Move to Weapon Objects (Decoupled):
- Special weapon mechanics (FLASK_*, HYPE_*, BAYONET_*, etc.)
- Any property used for rendering UI chips

### Keep in constants.js (Optional, only if truly shared):
- Game-wide game balance constants?
- Or just move those to weapon objects too?

## Success Criteria
✓ chipBuilder.js: zero constants.js imports
✓ chipBuilder.js: zero if(type ===' statements  
✓ chipBuilder.js: only generates chips if properties exist on weapon
✓ weaponDetail.js: zero constants.js imports
✓ utility.js: zero constants.js imports
✓ Entire codebase: zero imports of constants.js (except maybe game.js core logic?)

---

## SCOPE SUMMARY (Exact Counts)

### chipBuilder.js Current State:
- **Lines**: ~470 lines total
- **Constants Imported**: 210 unique constants from constants.js
- **if/type === Statements**: 36 hardcoded weapon type checks
- **Special Cases Handled**: 36 weapon types have conditional logic

### Constants by Weapon Type (Sampling):
```
C.ADORATION_* (5 constants)
C.BLUTSAUGER_* (2 constants)
C.CRIMSON_SCAR_* (10 constants)
C.CRUSADERS_CROSSBOW_* (2 constants)
C.EGOSODA_* (6 constants)
C.EXPLOSIVE_FLASK_* (4 constants)
C.FAINT_AROMA_* (4 constants)
C.FORCE_A_NATURE_* (2 constants)
C.GRENADE_LAUNCHER_* (2 constants)
... [26 more weapons]
```

### Refactor Impact:
| File | Changes | Complexity |
|------|---------|-----------|
| chipBuilder.js | Remove 210 constants, remove 36 if statements | High |
| weaponDetail.js | Remove constants import, update call signature | Medium |
| utility.js | Remove 4 EXPLOSIVE_FLASK_ constants | Low |
| All 48 weapon files | Add special properties (FLASK_*, HYPE_*, BAYONET_*, etc.) | Medium |
| utilityDetail.js | Update utility rendering | Low |

## DECISION REQUIRED

### Option A: Full Refactor (True Modularity)
- Move ALL 210 constants into weapon objects
- Rewrite chipBuilder with zero type checks
- Delete constants.js completely
- **Result**: True data-driven modular system
- **Effort**: High (requires adding properties to 48 weapon files)

### Option B: Partial Refactor (Pragmatic)
- Move special weapon constants into weapon objects
- Keep shared constants (base damage, speed, etc.) in constants.js
- Rewrite chipBuilder to use property existence checks first, C.* fallback
- **Result**: Mostly modular, constants.js still exists but minimal
- **Effort**: Medium

### Option C: Status Quo (No Refactor)
- Leave as is
- constants.js stays with 210 constants
- **Result**: Works but defeats modularity goal
- **Effort**: None

---

## RECOMMENDATION

**Option A (Full Refactor)** is the right choice because:
1. Aligns with project goal: "remove constants.js"
2. Makes system truly data-driven
3. Each weapon is self-contained and independently extensible
4. Eliminates if/type statements which scale poorly
5. Future weapons need NO changes to chipBuilder

**Work items if Option A chosen**:
1. Add properties to each weapon module (once, one-time cost)
2. Rewrite chipBuilder (once, one-time cost)
3. Update weaponDetail.js, utility.js (one-time cost)
4. Delete constants.js (one-time benefit)
5. Game code continues to work unchanged
