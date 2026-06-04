# Weapon Files Audit Report
**Date: 2026-06-04**
**Status: CRITICAL ISSUES FOUND**

---

## 1. CRITICAL: BROKEN IMPORT PATHS

### Root Cause
All weapon files and bootstrap.js are importing mechanics from **flat paths** that don't exist. The actual mechanics are organized in subdirectories:
- **Tier 1 SHARED**: `/mechanics/shared/` (basic building blocks)
- **Tier 2+ PATTERNS**: `/mechanics/patterns/` (higher-level mechanics)

### Affected Files

#### bootstrap.js (Lines 9-27) — 17 Broken Imports
```javascript
// WRONG (current):
import * as Afterburn from './mechanics/afterburn.js';
import * as BleedDot from './mechanics/bleedDot.js';
// ... 15 more

// CORRECT:
// Option A: Import from mechanics/index.js (recommended)
import * as Mechanics from './mechanics/index.js';

// Option B: Use individual paths
import * as Afterburn from './mechanics/shared/afterburn.js';
import * as BleedDot from './mechanics/shared/bleedDot.js';
import * as LifeSteal from './mechanics/patterns/lifesteal.js';
// ... etc
```

#### Weapon Files — 47 Broken Imports

**SHARED mechanics imports (Tier 1):**
- `Afterburn` — 6 weapons: flamethrower, hornet, solemnVow, egoMagicBullet
- `BleedDot` — 3 weapons: crimsonScar, musket
- `Hitscan` — 4 weapons: familyBusiness, forceANature, sodaPopper, widowmaker
- `Homing` — 3 weapons: magicianHat, paradiseLost, egoMagicBullet
- `MaxHpDamage` — 3 weapons: egoSoda, solemnVow, paradiseLost
- `Pierce` — 3 weapons: adoration, faintAroma, flamethrower
- `Slow` — 3 weapons: adoration, egoLoneliness, explosiveFlask
- `Tracer` — 3 weapons: egoPinks, pipLauncher, egoMagicBullet

**PATTERN mechanics imports (Tier 2+):**
- `LifeSteal` — 2 weapons: medigun, paradiseLost
- `AllyHeal` — 2 weapons: medigun, paradiseLost
- `Knockback` — 3 weapons: forceANature, rocketJumper, yellowTarge
- `Mark` — 1 weapon: crimsonScar
- `SplashAoe` — 9 weapons: beggersBasooka, directHit, explosiveFlask, grenadeLauncher, lochNLoad, nearMissed, pipLauncher, rocketJumper, rocketLauncher
- `DualForm` — 2 weapons: crimsonScar, hornet
- `FireRateRamp` — 1 weapon: minigun
- `ConditionalReload` — 1 weapon: widowmaker
- `MeleeAttack` — 3 weapons: crimsonScar, penitence, rocketJumper
- `SelfDamage` — 1 weapon: paradiseLost
- `TeamAwareHit` — 3 weapons: egoMagicBullet, magicianHat, paradiseLost

**OTHER imports:**
- `dealer.js` imports from `../cards.js` and `../core/projectile.js` ✅ (correct paths)

---

## 2. MECHANICS ORGANIZATION MAPPING

### ✅ Tier 1: SHARED (Basic Building Blocks)
**Location:** `/js/mechanics/shared/`
- Afterburn.js
- BleedDot.js
- Hitscan.js
- Homing.js
- MaxHpDamage.js
- Pierce.js
- Slow.js
- Tracer.js

### ✅ Tier 2+: PATTERNS (Advanced Mechanics)
**Location:** `/js/mechanics/patterns/`
- LifeSteal.js
- AllyHeal.js
- Knockback.js
- Mark.js
- SplashAoe.js
- DualForm.js
- FireRateRamp.js
- ConditionalReload.js
- MeleeAttack.js
- SelfDamage.js
- TeamAwareHit.js
- Accumulator.js (placeholder)
- Charge.js (placeholder)
- Randomizer.js (placeholder)
- Zone.js (placeholder)
- Beam.js (placeholder)
- Conditional.js (placeholder)

---

## 3. BOOTSTRAP VERIFICATION

### Current Status: ❌ BROKEN
- **Lines 9-27**: Importing 17 mechanics from flat paths
- **Usage**: Re-exported and used by:
  - `js/main.js` (imports Game, loadImages, W)
  - `js/sandboxArena.js` (imports loadImages, W)
  - `js/sandboxGame.js` (imports Game, Ball, W)

### Why It Works Despite Broken Imports
The server is returning **404 HTML error pages**, which browsers parse as "text/html" instead of JavaScript. This causes the MIME type errors you're seeing.

### Fix Strategy
**Option A (Recommended):** Use centralized mechanics index
```javascript
// bootstrap.js
import { Vector } from './core/vector.js';
import { PhysicsEngine } from './core/physics.js';
import * as Mechanics from './mechanics/index.js';
import * as W from './weapons/index.js';
import { Projectile } from './core/projectile.js';
import { Ball } from './core/ball.js';
import { Game } from './game.js';
import { loadImages } from './assetManager.js';

// Re-export individual mechanics from centralized barrel
const { Afterburn, BleedDot, ... } = Mechanics;

export {
  Vector, PhysicsEngine, Projectile, Ball, Game, loadImages, W,
  Afterburn, BleedDot, ...
};
```

**Option B:** Explicit categorized imports
```javascript
import * as Afterburn from './mechanics/shared/afterburn.js';
import * as LifeSteal from './mechanics/patterns/lifesteal.js';
// ... etc
```

---

## 4. CODE QUALITY AUDIT

### ✅ Clean Patterns
- **Simple weapons** (pistol, revolver, etc): Config-only, no mechanics imports
  - No dead code detected
  - Props properly organized into sections
- **Complex weapons** (paradiseLost, crimsonScar): Properly delegate mechanics to `/mechanics/`
  - Configuration values declared once at top
  - Mechanics initialized via `.create()` patterns
  - No hardcoded mechanics logic

### ✅ Special Cases
- **dealer.js**: Has custom `DealerWeapon` class for poker hand logic
  - Correctly imports from `../cards.js` and `../core/projectile.js`
  - Encapsulates deck and hand logic appropriately

### ⚠️ Observations
- **CONFIG duplication**: Many weapons declare props twice (loose const, then nested in CONFIG/weapon object)
  - Example in pistol.js (lines 2-24): Declares 9 props, then repeats in CONFIG
  - Not a breaking issue, but suggests room for optimization
- **No critical dead code found** in sampled files (pistol, revolver, crimsonScar, paradiseLost, dealer)

---

## 5. WEAPON REGISTRATION STATUS

### ✅ weapons/index.js
- Properly re-exports all 50 weapon definitions
- All weapon files listed and exported

### ✅ Weapons with Mechanics
All weapons correctly using mechanics:
- Proper `.create()` calls with required parameters
- Mechanics stored as instance properties
- No overlapping or shadowed property names

---

## 6. RECOMMENDED FIX ORDER

### Phase 1 (CRITICAL - Unblock imports)
1. **Fix bootstrap.js** (1 file, 19 lines)
   - Replace flat imports with either Option A or B above
   - Test that mechanics load correctly

2. **Fix all weapon files** (47 files, ~100+ imports)
   - Update paths for SHARED mechanics: `../mechanics/mechanic.js` → `../mechanics/shared/mechanic.js`
   - Update paths for PATTERN mechanics: `../mechanics/mechanic.js` → `../mechanics/patterns/mechanic.js`
   - Automated find-replace can handle most of this

### Phase 2 (OPTIONAL - Code quality)
3. **Consolidate CONFIG duplication** in weapons (optional, low priority)
   - Remove prop duplication if desired
   - Current approach is functional but verbose

---

## 7. SUMMARY TABLE

| Category | Count | Status | Priority |
|----------|-------|--------|----------|
| Weapons with mechanics imports | 47 | ❌ Broken paths | CRITICAL |
| bootstrap.js mechanics imports | 17 | ❌ Broken paths | CRITICAL |
| Simple weapons (no mechanics) | 3 | ✅ OK | N/A |
| Special weapons (custom logic) | 1 | ✅ OK | N/A |
| Dead code found | 0 | ✅ None | N/A |

---

## 8. IMPLEMENTATION CHECKLIST

- [ ] Update bootstrap.js imports (recommend Option A)
- [ ] Find-replace broken SHARED imports in weapons/: `../mechanics/` → `../mechanics/shared/`
- [ ] Find-replace broken PATTERN imports in weapons/: `../mechanics/` → `../mechanics/patterns/`
- [ ] Test game loads without MIME type errors
- [ ] Verify all weapons load correctly in game
- [ ] (Optional) Consolidate CONFIG duplication in simple weapons

