# Pickup System Audit Report
**Date: 2026-06-04**
**Objective: Drain pickupConstants.js and reorganize pickup system**

---

## 1. CURRENT STRUCTURE

### pickupConstants.js (51 lines)
**Location:** `js/pickupConstants.js`
**Purpose:** Central configuration for all utility/pickup mechanics

**Contents (grouped by system):**

#### Spawn Timing
```
PICKUP_SPAWN_RATE_MS = 4000    ← used by gameConfig, game.js
PICKUP_DELAY_MS = 500           ← used by ball.js
```

#### Health Pack (healthico)
```
HEALTHICO_HEAL = 150
HEALTHICO_REGEN_PER_TICK = 10
HEALTHICO_REGEN_INTERVAL_MS = 1000
HEALTHICO_REGEN_DURATION_MS = 6000
```

#### Ammo Crate (ammoico)
```
AMMO_CRATE_DOUBLE_SHOT_MS = 5000
```

#### Ubercharge
```
UBERCHARGE_DURATION_MS = 5000
UBERCHARGE_HEAL_PER_SEC = 20
```

#### Critical Hit
```
CRITICAL_DURATION_MS = 8000
CRITICAL_HEAL_PER_SEC = 6
CRITICAL_DAMAGE_MULTIPLIER = 2
```

#### Speed Boost
```
SPEED_BOOST_PERMANENT = 0.8
```

#### Scrumpy Bottle (utility weapon)
```
SCRUMPY_BOTTLE_THROW_DAMAGE_MIN = 100
SCRUMPY_BOTTLE_THROW_DAMAGE_MAX = 150
SCRUMPY_PUDDLE_DAMAGE_MIN = 10
SCRUMPY_PUDDLE_DAMAGE_MAX = 20
SCRUMPY_PUDDLE_DURATION_MS = 6000
SCRUMPY_PUDDLE_INITIAL_RADIUS = 38
SCRUMPY_PUDDLE_FINAL_RADIUS = 132
SCRUMPY_PUDDLE_TICK_INTERVAL_MS = 1000
SCRUMPY_THROW_SPEED = 9
SCRUMPY_DAMAGE_REDUCTION = 0.1
```

#### Bombanomicron (utility weapon)
```
BOMBANOMICRON_PROJECTILE_MIN = 6
BOMBANOMICRON_PROJECTILE_MAX = 10
BOMBANOMICRON_TARGET_SPREAD = 140
```

#### Dead Ringer (utility with cooldown)
```
DEAD_RINGER_PICKUP_COOLDOWN_MS = 120000
DEAD_RINGER_DURATION_MS = 4000
DEAD_RINGER_DAMAGE_REDUCTION = 0.9
DEAD_RINGER_HEAL_MAX_HP_RATIO = 0.1
DEAD_RINGER_SPEED_BOOST = 1.8
DEAD_RINGER_DECOY_DURATION_MS = 950
DEAD_RINGER_DECOY_SPEED = 16
```

---

## 2. IMPORT ANALYSIS

### Files importing pickupConstants.js (7 files)

| File | Imports | Purpose |
|------|---------|---------|
| **gameDrops.js** | AMMO_CRATE_DOUBLE_SHOT_MS, DEAD_RINGER_PICKUP_COOLDOWN_MS, HEALTHICO_* (4) | Drop handling/consumption logic |
| **gameSystems.js** | SCRUMPY_*, BOMBANOMICRON_* (14) | Scrumpy puddle & bombanomicron mechanics |
| **gameRender.js** | DEAD_RINGER_DECOY_DURATION_MS, SCRUMPY_PUDDLE_DURATION_MS | Rendering utility visuals |
| **game.js** | DEAD_RINGER_* (7), PICKUP_SPAWN_RATE_MS | Core game loop (spawn rate, pickup handling) |
| **gameConfig.js** | PICKUP_SPAWN_RATE_MS | Default settings during game init |
| **core/ball.js** | CRITICAL_*, DEAD_RINGER_*, HEALTHICO_*, UBERCHARGE_*, SPEED_BOOST_PERMANENT, SCRUMPY_DAMAGE_REDUCTION, PICKUP_DELAY_MS (18) | Ball state & effect timers |
| **sandboxArena.js** | Various | Testing/sandbox mode |

**Total: 18+ unique constants imported across 7 files**

---

## 3. RELATED FILES

### pickup.js (234 lines)
**Purpose:** Pickup entity class
**Exports:** `Pickup` class
**What it does:**
- Constructor: Sets position, size, color based on weapon/utility type
  - Color mapping: 50+ weapon/utility types hardcoded as if/else chain (lines 8-100)
- `collidesWith(ball)`: Distance-based collision detection
- `draw(ctx, pickupIcons)`: Renders pickup with icon fallback (very complex nested ternary, lines 112-204)

**Issues:**
- Massive if/else chain for color mapping (95 lines!)
- Massive nested ternary for icon fallback (93 lines!)
- Should be refactored to use lookup tables

### gameDrops.js (130 lines)
**Purpose:** Drop spawning and pickup consumption
**Exports:** `updatePickups()`, `spawnPickups()`, `rollRandomDropType()`
**What it does:**
- `updatePickups()`: Check collisions, handle pickup effects on balls
  - Weapon pickups: Call `ball.equipWeapon()`
  - Utilities: Call ball methods like `applyUbercharge()`, `applyHealthRegen()`, etc.
- `spawnPickups()`: Random drop at game rate
- `rollRandomDropType()`: Weighted random selection from DROP_WEAPON_TYPES/DROP_UTILITY_TYPES

**Dependencies:**
- gameConfig.js (DROP_WEAPON_TYPES, DROP_UTILITY_TYPES)
- pickupConstants.js (for effect configs)
- Pickup class

### gameConfig.js (190 lines)
**Purpose:** Game configuration
**Exports:** 
- `START_WEAPON_OPTIONS[]` — 48 weapons available at game start
- `DROP_WEAPON_TYPES[]` — 48 weapons that can drop
- `DROP_UTILITY_TYPES[]` — 9 utilities that can drop
- `buildGameSettings()` — Game settings builder
- `createDefaultDropWeights()` — Drop rate weightings for all 57 drops

**Note:** This file imports PICKUP_SPAWN_RATE_MS from pickupConstants

---

## 4. PROPOSED REORGANIZATION

### Goal: Drain pickupConstants.js → Delete it

**Proposed New Structure: `/js/utilities/`**

```
utilities/
  ├── index.js                ← Central re-export
  ├── pickupTypes.js          ← Weapon drop definitions & colors/icons
  ├── utilityTypes.js         ← Utility drop config & mechanics
  ├── drops.js                ← Drop spawn/handling logic (from gameDrops.js)
  ├── pickup.js               ← Pickup entity class (moved/renamed)
  └── constants.js            ← Utility timing & effect constants
```

### Detailed Breakdown

#### **utilities/constants.js** (NEW)
**Moves from:** pickupConstants.js
**Purpose:** All utility effect configuration

**Content:**
```javascript
// Spawn timing
export const PICKUP_SPAWN_RATE_MS = 4000;
export const PICKUP_DELAY_MS = 500;

// Utility effect configs
export const HEALTHICO_HEAL = 150;
export const HEALTHICO_REGEN_PER_TICK = 10;
export const HEALTHICO_REGEN_INTERVAL_MS = 1000;
export const HEALTHICO_REGEN_DURATION_MS = 6000;

export const AMMO_CRATE_DOUBLE_SHOT_MS = 5000;

export const UBERCHARGE_DURATION_MS = 5000;
export const UBERCHARGE_HEAL_PER_SEC = 20;

export const CRITICAL_DURATION_MS = 8000;
export const CRITICAL_HEAL_PER_SEC = 6;
export const CRITICAL_DAMAGE_MULTIPLIER = 2;

export const SPEED_BOOST_PERMANENT = 0.8;

export const SCRUMPY_BOTTLE_THROW_DAMAGE_MIN = 100;
export const SCRUMPY_BOTTLE_THROW_DAMAGE_MAX = 150;
export const SCRUMPY_PUDDLE_DAMAGE_MIN = 10;
export const SCRUMPY_PUDDLE_DAMAGE_MAX = 20;
export const SCRUMPY_PUDDLE_DURATION_MS = 6000;
export const SCRUMPY_PUDDLE_INITIAL_RADIUS = 38;
export const SCRUMPY_PUDDLE_FINAL_RADIUS = 132;
export const SCRUMPY_PUDDLE_TICK_INTERVAL_MS = 1000;
export const SCRUMPY_THROW_SPEED = 9;
export const SCRUMPY_DAMAGE_REDUCTION = 0.1;

export const BOMBANOMICRON_PROJECTILE_MIN = 6;
export const BOMBANOMICRON_PROJECTILE_MAX = 10;
export const BOMBANOMICRON_TARGET_SPREAD = 140;

export const DEAD_RINGER_PICKUP_COOLDOWN_MS = 120000;
export const DEAD_RINGER_DURATION_MS = 4000;
export const DEAD_RINGER_DAMAGE_REDUCTION = 0.9;
export const DEAD_RINGER_HEAL_MAX_HP_RATIO = 0.1;
export const DEAD_RINGER_SPEED_BOOST = 1.8;
export const DEAD_RINGER_DECOY_DURATION_MS = 950;
export const DEAD_RINGER_DECOY_SPEED = 16;
```

#### **utilities/pickupTypes.js** (NEW)
**Purpose:** Weapon drop type definitions & visual properties
**Content:**
```javascript
// Weapon color mappings (from pickup.js lines 8-100)
export const WEAPON_COLORS = {
    pistol: '#ffff00',
    revolver: '#ffd84d',
    shotgun: '#ff6600',
    // ... 45+ more weapons
};

// Weapon icon fallbacks (from pickup.js draw() method)
export const WEAPON_ICON_FALLBACKS = {
    piplauncher: ['piplauncher', 'rocketlauncher'],
    directhit: ['directhit', 'rocketlauncher'],
    // ... define all fallback chains
};

// Could later add pickup size, respawn time, rarity
export const WEAPON_DROP_CONFIG = {
    pistol: { color: WEAPON_COLORS.pistol, size: 14, rarity: 'common' },
    // ... extend as needed
};
```

#### **utilities/utilityTypes.js** (NEW)
**Purpose:** Utility drop type definitions & mechanics
**Content:**
```javascript
import * as Constants from './constants.js';

export const UTILITY_COLORS = {
    ammoico: '#8ae6ff',
    healthico: '#6cff7a',
    ubercharge: '#6be3ff',
    critical: '#ffd84d',
    speed: '#c58aff',
    explosiveflask: '#ffc977',
    scrumpybottle: '#f2bf54',
    bombanomicron: '#d96aff',
    deadringer: '#f2d06a',
};

export const UTILITY_CONFIG = {
    ammoico: {
        color: UTILITY_COLORS.ammoico,
        effect: 'refill_ammo',
        duration: Constants.AMMO_CRATE_DOUBLE_SHOT_MS,
    },
    healthico: {
        color: UTILITY_COLORS.healthico,
        effect: 'heal',
        healAmount: Constants.HEALTHICO_HEAL,
        regenTicks: Constants.HEALTHICO_REGEN_PER_TICK,
        regenInterval: Constants.HEALTHICO_REGEN_INTERVAL_MS,
        regenDuration: Constants.HEALTHICO_REGEN_DURATION_MS,
    },
    ubercharge: {
        color: UTILITY_COLORS.ubercharge,
        effect: 'invulnerability',
        duration: Constants.UBERCHARGE_DURATION_MS,
        healPerSec: Constants.UBERCHARGE_HEAL_PER_SEC,
    },
    // ... etc for each utility
};
```

#### **utilities/pickup.js** (MOVED FROM js/pickup.js)
**Purpose:** Pickup entity class
**Changes:**
- Replace 95-line if/else color chain with lookup table:
  ```javascript
  this.color = WEAPON_COLORS[weaponType] || UTILITY_COLORS[weaponType] || '#d8b84f';
  ```
- Replace 93-line nested ternary with lookup table

#### **utilities/drops.js** (MOVED FROM js/gameDrops.js)
**Purpose:** Drop spawning & handling
**Changes:** Just rename file + update imports

#### **utilities/index.js** (NEW)
**Purpose:** Central re-export
**Content:**
```javascript
export * from './constants.js';
export { WEAPON_COLORS, UTILITY_COLORS, WEAPON_CONFIG, UTILITY_CONFIG } from './utilityTypes.js';
export { WEAPON_ICON_FALLBACKS } from './pickupTypes.js';
export { Pickup } from './pickup.js';
export { updatePickups, spawnPickups, rollRandomDropType } from './drops.js';
```

---

## 5. IMPORT PATH UPDATES NEEDED

After reorganization, these 7 files need import updates:

| File | Current Import | New Import |
|------|---|---|
| gameDrops.js → **utilities/drops.js** | `./pickupConstants.js` | `./constants.js` |
| gameSystems.js | `./pickupConstants.js` | `./utilities/constants.js` |
| gameRender.js | `./pickupConstants.js` | `./utilities/constants.js` |
| game.js | `./pickupConstants.js` | `./utilities/constants.js` |
| gameConfig.js | `./pickupConstants.js` | `./utilities/constants.js` |
| core/ball.js | `../pickupConstants.js` | `../utilities/constants.js` |
| sandboxArena.js | `./pickupConstants.js` | `./utilities/constants.js` |

**Plus:**
- `pickup.js` → `./utilities/pickup.js` (in gameDrops, gameRender, etc.)

---

## 6. WHAT BELONGS IN /mechanics?

### Analysis
Utility effect mechanics (health regen, speed boost, invulnerability, damage reduction) **differ from weapon mechanics**:

- **Weapon mechanics:** Applied to projectiles/hits (Homing, BleedDot, Pierce, Tracer, etc.)
- **Utility mechanics:** Applied to the player/ball itself (status effects)

### Recommendation: **Keep in utilities/, NOT mechanics/**

**Why:**
1. Different domain: utilities are pickup-based temporary effects, not weapon/damage systems
2. Different lifecycle: utilities start/end on pickup/timeout, not on projectile creation
3. Different pattern: utilities modify ball state (health, speed, invulnerability), not projectiles
4. Configuration belongs with other utility configs

### Borderline Cases (could go either way):
- **Scrumpy Puddle:** Uses splash/area damage (like SplashAoe mechanic)
  - Current: Lives in gameSystems.js with constants in pickupConstants.js
  - **Recommendation:** Keep in utilities/ — it's a utility weapon, not a reusable mechanic
- **Bombanomicron:** Fires projectiles (like a weapon)
  - Current: Lives in gameSystems.js with constants in pickupConstants.js
  - **Recommendation:** Keep in utilities/ — it's a utility weapon triggered from a pickup

**Bottom line:** Keep all utility effects in `utilities/` — they're cohesive as a subsystem and distinct from core damage/hit mechanics.

---

## 7. IMPLEMENTATION CHECKLIST

### Phase 1: Create Utilities Folder Structure
- [ ] Create `js/utilities/` directory
- [ ] Create `utilities/constants.js` (move content from pickupConstants.js)
- [ ] Create `utilities/pickupTypes.js` (extract weapon colors/icons)
- [ ] Create `utilities/utilityTypes.js` (extract utility configs)
- [ ] Create `utilities/index.js` (re-export barrel)
- [ ] Move `js/pickup.js` → `utilities/pickup.js`
- [ ] Refactor pickup.js to use lookup tables (remove if/else & ternary chains)

### Phase 2: Move Drop Logic
- [ ] Move `js/gameDrops.js` → `utilities/drops.js`
- [ ] Update imports in drops.js

### Phase 3: Update All Imports
- [ ] gameSystems.js: update import paths
- [ ] gameRender.js: update import paths
- [ ] game.js: update import paths
- [ ] gameConfig.js: update import paths
- [ ] core/ball.js: update import paths
- [ ] sandboxArena.js: update import paths

### Phase 4: Cleanup
- [ ] Delete `js/pickupConstants.js`
- [ ] Verify all tests pass
- [ ] Verify game runs without errors

---

## 8. SUMMARY TABLE

| Category | Count | Status | Next |
|----------|-------|--------|------|
| Files importing pickupConstants | 7 | ⚠️ Scattered | Consolidate |
| Pickup-related files | 3 | ⚠️ Root-level | Organize |
| Lines in pickupConstants | 51 | ✅ Small | Move |
| Refactor opportunities | 2 | 🔧 Yes | pickup.js colors/icons |
| New folder structure needed | Yes | ✅ Clear | Ready |

---

## 9. BENEFITS OF REORGANIZATION

✅ **Consistency:** All pickup/utility logic in one folder  
✅ **Discoverable:** New devs know where to find pickup code  
✅ **Isolatable:** Can work on utilities independently  
✅ **Cleaner root:** Removes pickupConstants.js  
✅ **Better separation:** gameDrops stays with its domain  
✅ **Refactoring wins:** pickup.js color/icon mappings → data tables  
✅ **Maintainability:** Central index.js barrel export  

---

## 10. RISK ASSESSMENT

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Import path errors | Medium | Systematically update all 7 files, test each |
| Breaking gameplay | Low | No logic changes, just reorganization |
| Missing exports | Low | Use barrel export (index.js) |

