# Utilities Folder Migration Plan
**Goal:** Reorganize pickup/utility system following weapon folder modular pattern
**Status:** PLANNING PHASE - Awaiting approval before execution

---

## CURRENT STATE

```
js/
├── pickupConstants.js          (51 lines) ← TO BE DELETED
├── pickup.js                   (234 lines) ← TO BE REFACTORED
├── gameDrops.js               (130 lines) ← TO BE MOVED
├── game.js                    (imports from pickupConstants)
├── gameConfig.js              (imports from pickupConstants)
├── gameSystems.js             (imports from pickupConstants)
├── gameRender.js              (imports from pickupConstants)
├── sandboxArena.js            (imports from pickupConstants)
├── core/ball.js               (imports from pickupConstants)
└── weapons/
    └── ... (reference pattern)
```

---

## PROPOSED STRUCTURE

```
js/utilities/
├── items/
│   ├── healthico.js           ← Health pack utility
│   ├── ammoico.js             ← Ammo crate utility
│   ├── ubercharge.js          ← Invulnerability utility
│   ├── critical.js            ← Critical hit utility
│   ├── speed.js               ← Speed boost utility
│   ├── explosiveFlask.js      ← Explosive flask utility weapon
│   ├── scrumpyBottle.js       ← Scrumpy bottle utility weapon
│   ├── bombanomicron.js       ← Bombanomicron utility weapon
│   ├── deadRinger.js          ← Dead ringer utility
│   └── index.js               ← Re-export all items
├── constants.js               ← Spawn timing only (2 constants)
├── pickup.js                  ← Pickup entity class (REFACTORED)
├── drops.js                   ← Drop spawn/consumption (moved from gameDrops.js)
└── index.js                   ← Central re-export barrel
```

---

## CONTENT MAPPING

### **utilities/items/healthico.js**
```javascript
export const healthico = {
    color: '#6cff7a',
    image: 'assets/HealthPack.png',  // or appropriate asset
    
    // Effect values
    HEAL: 150,
    REGEN_PER_TICK: 10,
    REGEN_INTERVAL_MS: 1000,
    REGEN_DURATION_MS: 6000,
};
```

### **utilities/items/ammoico.js**
```javascript
export const ammoico = {
    color: '#8ae6ff',
    image: 'assets/AmmoCrate.png',
    
    DOUBLE_SHOT_MS: 5000,
};
```

### **utilities/items/ubercharge.js**
```javascript
export const ubercharge = {
    color: '#6be3ff',
    image: 'assets/Ubercharge.png',
    
    DURATION_MS: 5000,
    HEAL_PER_SEC: 20,
};
```

### **utilities/items/critical.js**
```javascript
export const critical = {
    color: '#ffd84d',
    image: 'assets/Critical.png',
    
    DURATION_MS: 8000,
    HEAL_PER_SEC: 6,
    DAMAGE_MULTIPLIER: 2,
};
```

### **utilities/items/speed.js**
```javascript
export const speed = {
    color: '#c58aff',
    image: 'assets/Speed.png',
    
    PERMANENT_BOOST: 0.8,
};
```

### **utilities/items/explosiveFlask.js**
```javascript
export const explosiveFlask = {
    color: '#ffc977',
    image: 'assets/ExplosiveFlask.png',
    
    // Utility weapon config (no projectile values)
};
```

### **utilities/items/scrumpyBottle.js**
```javascript
export const scrumpyBottle = {
    color: '#f2bf54',
    image: 'assets/ScrumpyBottle.png',
    
    // Throw mechanics
    BOTTLE_THROW_DAMAGE_MIN: 100,
    BOTTLE_THROW_DAMAGE_MAX: 150,
    THROW_SPEED: 9,
    
    // Puddle mechanics
    PUDDLE_DAMAGE_MIN: 10,
    PUDDLE_DAMAGE_MAX: 20,
    PUDDLE_DURATION_MS: 6000,
    PUDDLE_INITIAL_RADIUS: 38,
    PUDDLE_FINAL_RADIUS: 132,
    PUDDLE_TICK_INTERVAL_MS: 1000,
    
    // Resistance
    DAMAGE_REDUCTION: 0.1,
};
```

### **utilities/items/bombanomicron.js**
```javascript
export const bombanomicron = {
    color: '#d96aff',
    image: 'assets/Bombanomicron.png',
    
    PROJECTILE_MIN: 6,
    PROJECTILE_MAX: 10,
    TARGET_SPREAD: 140,
};
```

### **utilities/items/deadRinger.js**
```javascript
export const deadRinger = {
    color: '#f2d06a',
    image: 'assets/DeadRinger.png',
    
    PICKUP_COOLDOWN_MS: 120000,
    DURATION_MS: 4000,
    DAMAGE_REDUCTION: 0.9,
    HEAL_MAX_HP_RATIO: 0.1,
    SPEED_BOOST: 1.8,
    
    // Decoy mechanics
    DECOY_DURATION_MS: 950,
    DECOY_SPEED: 16,
};
```

### **utilities/items/index.js**
```javascript
export { healthico } from './healthico.js';
export { ammoico } from './ammoico.js';
export { ubercharge } from './ubercharge.js';
export { critical } from './critical.js';
export { speed } from './speed.js';
export { explosiveFlask } from './explosiveFlask.js';
export { scrumpyBottle } from './scrumpyBottle.js';
export { bombanomicron } from './bombanomicron.js';
export { deadRinger } from './deadRinger.js';

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

// Helper: Lookup table for images (used in pickup.js)
export const ITEM_IMAGES = {
    healthico: healthico.image,
    ammoico: ammoico.image,
    ubercharge: ubercharge.image,
    critical: critical.image,
    speed: speed.image,
    explosiveFlask: explosiveFlask.image,
    scrumpyBottle: scrumpyBottle.image,
    bombanomicron: bombanomicron.image,
    deadRinger: deadRinger.image,
};
```

### **utilities/constants.js**
```javascript
// Spawn timing
export const PICKUP_SPAWN_RATE_MS = 4000;
export const PICKUP_DELAY_MS = 500;
```

### **utilities/pickup.js** (REFACTORED)
```javascript
import { Vector } from '../core/vector.js';
import { ITEM_COLORS, ITEM_IMAGES } from './items/index.js';

// Weapon colors (from gameConfig weapons)
const WEAPON_COLORS = {
    pistol: '#ffff00',
    revolver: '#ffd84d',
    // ... all 48 weapon colors
};

// Weapon icon fallbacks
const WEAPON_ICON_FALLBACKS = {
    piplauncher: ['piplauncher', 'rocketlauncher'],
    directhit: ['directhit', 'rocketlauncher'],
    // ... all fallback chains
};

export class Pickup {
    constructor(x, y, weaponType) {
        this.pos = new Vector(x, y);
        this.size = 14;
        this.weaponType = weaponType;
        
        // REFACTORED: Replace if/else chain with lookup
        this.color = ITEM_COLORS[weaponType] || WEAPON_COLORS[weaponType] || '#d8b84f';
    }

    collidesWith(ball) {
        const dx = ball.pos.x - this.pos.x;
        const dy = ball.pos.y - this.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < ball.radius + this.size + 15;
    }

    draw(ctx, pickupIcons) {
        // REFACTORED: Replace nested ternary with helper method
        const icon = this._getIcon(pickupIcons);
        
        if (icon && icon.complete && icon.naturalWidth > 0) {
            const diameter = (this.size + 5) * 2;
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size + 5, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(icon, this.pos.x - diameter / 2, this.pos.y - diameter / 2, diameter, diameter);
            ctx.restore();

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size + 5, 0, Math.PI * 2);
            ctx.stroke();
            return;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size + 5, 0, Math.PI * 2);
        ctx.stroke();
    }

    _getIcon(pickupIcons) {
        // NEW: Helper method using WEAPON_ICON_FALLBACKS lookup
        const fallbacks = WEAPON_ICON_FALLBACKS[this.weaponType];
        if (fallbacks) {
            for (const key of fallbacks) {
                if (pickupIcons[key]) return pickupIcons[key];
            }
        }
        return pickupIcons[this.weaponType] || null;
    }
}
```

### **utilities/drops.js** (MOVED FROM gameDrops.js)
**No logic changes — just moved file with updated imports:**
```javascript
import { DROP_UTILITY_TYPES, DROP_WEAPON_TYPES } from '../gameConfig.js';
import * as Items from './items/index.js';
import { Pickup } from './pickup.js';
import { DealerWeapon } from '../weapons/dealer.js';

// updatePickups(), spawnPickups(), rollRandomDropType() — unchanged
```

### **utilities/index.js** (RE-EXPORT BARREL)
```javascript
// Constants
export * from './constants.js';

// Items
export * from './items/index.js';

// Classes & Functions
export { Pickup } from './pickup.js';
export { updatePickups, spawnPickups, rollRandomDropType } from './drops.js';
```

---

## IMPORT PATH UPDATES

### Files to Update (7 files + 1 internal)

| File | Current | New | Notes |
|------|---------|-----|-------|
| gameDrops.js → **utilities/drops.js** | `./pickupConstants.js` | `./constants.js` | Internal |
| gameSystems.js | `./pickupConstants.js` | `./utilities/constants.js` OR just use from items |
| gameRender.js | `./pickupConstants.js` | `./utilities/constants.js` |
| game.js | `./pickupConstants.js` | `./utilities/constants.js` |
| gameConfig.js | `./pickupConstants.js` | `./utilities/constants.js` |
| core/ball.js | `../pickupConstants.js` | `../utilities/constants.js` OR import from items |
| sandboxArena.js | `./pickupConstants.js` | `./utilities/constants.js` |
| gameRender.js | `./pickup.js` | `./utilities/pickup.js` |
| gameDrops.js | `./gameDrops.js` | `./utilities/drops.js` |

---

## PHASE BREAKDOWN

### **PHASE 1: Create Folder Structure & Item Files**
**Files to create:**
- `js/utilities/` directory
- `js/utilities/items/` directory
- All 9 item files (healthico.js, ammoico.js, etc.)
- `js/utilities/items/index.js`
- `js/utilities/constants.js`

**Validation:**
- ✅ All constants moved exactly (no changes)
- ✅ All colors correct
- ✅ All effect values intact
- ✅ Item files self-contained (no imports from gameConfig, etc.)

**Effort:** ~30 lines of code per file × 9 items = 270 new lines
**Difficulty:** Low (copy/paste + formatting)

---

### **PHASE 2: Refactor pickup.js & Move drops.js**
**Files to create:**
- `js/utilities/pickup.js` (refactored)
- `js/utilities/drops.js` (moved from gameDrops.js)
- `js/utilities/index.js` (re-export barrel)

**Changes to pickup.js:**
- Remove 95-line if/else color chain → replace with `ITEM_COLORS[weaponType] || WEAPON_COLORS[weaponType]`
- Remove 93-line nested ternary → replace with `_getIcon()` helper using `WEAPON_ICON_FALLBACKS` lookup
- Keep weapon color mapping (48 weapons) + icon fallbacks

**Line reduction:**
- Old pickup.js: 234 lines
- New pickup.js: ~120 lines (refactored)
- Savings: ~114 lines

**Difficulty:** Medium (refactoring logic but no behavior changes)

---

### **PHASE 3: Update All Import Paths**
**Files to update:**
1. gameSystems.js
2. gameRender.js
3. game.js
4. gameConfig.js
5. core/ball.js
6. sandboxArena.js

**Import pattern example:**
```javascript
// Before
import {
    SCRUMPY_BOTTLE_THROW_DAMAGE_MAX,
    SCRUMPY_PUDDLE_DURATION_MS,
} from './pickupConstants.js';

// After (Option A: Import specific items)
import { scrumpyBottle } from './utilities/items/index.js';
const SCRUMPY_BOTTLE_THROW_DAMAGE_MAX = scrumpyBottle.BOTTLE_THROW_DAMAGE_MAX;

// After (Option B: Import from utilities barrel)
import { scrumpyBottle } from './utilities/index.js';

// After (Option C: For timing constants only)
import { PICKUP_SPAWN_RATE_MS, PICKUP_DELAY_MS } from './utilities/constants.js';
```

**Difficulty:** Low (mechanical find/replace)

---

### **PHASE 4: Delete pickupConstants.js & Verify**
**Actions:**
1. Delete `js/pickupConstants.js`
2. Run game to verify no import errors
3. Test all utilities work correctly
4. Verify no broken references

**Difficulty:** Low (cleanup phase)

---

## ESTIMATED IMPACT

### Code Changes
```
Files created:    11 new files
Files deleted:    1 (pickupConstants.js)
Files modified:   7 (import updates)
Files moved:      2 (gameDrops.js → drops.js, pickup.js → utilities/pickup.js)

Lines added:      ~300 (items/ folder + refactored pickup.js)
Lines removed:    ~50 (pickupConstants.js deletion)
Lines refactored: ~120 (pickup.js if/else → lookup)

Net change:       +150 lines (due to explicit config expansion vs constants)
                  -2 files in root (pickupConstants.js, gameDrops.js)
```

### Benefits
✅ **Modular:** Each utility fully self-contained (like weapons)  
✅ **Discoverable:** New devs find utilities easier  
✅ **Maintainable:** Change one utility without affecting others  
✅ **Readable:** pickup.js shrinks from 234 → 120 lines  
✅ **Consistent:** Follows weapon folder pattern exactly  
✅ **Organized:** Spawn logic isolated, utilities isolated, pickup logic isolated  

---

## RISK ASSESSMENT

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Import path errors | Low | High | Systematic updates, verify each file |
| Missing values | Low | High | Value comparison checklist per item |
| Weapon colors still missing | Low | Medium | Keep WEAPON_COLORS in pickup.js |
| Game logic breaks | Very Low | High | No logic changes, only refactoring |

---

## EXECUTION CHECKLIST

### Pre-execution
- [ ] Review this plan
- [ ] Confirm structure acceptable
- [ ] Confirm phase order

### Phase 1 (Create structure)
- [ ] Create js/utilities/ directory
- [ ] Create js/utilities/items/ directory
- [ ] Create all 9 item files
- [ ] Create items/index.js
- [ ] Create constants.js
- [ ] Verify all values copied exactly

### Phase 2 (Refactor & move)
- [ ] Create refactored pickup.js
- [ ] Create utilities/drops.js (moved from gameDrops.js)
- [ ] Create utilities/index.js
- [ ] Verify no logic changes
- [ ] Verify file counts match

### Phase 3 (Update imports)
- [ ] Update gameSystems.js
- [ ] Update gameRender.js
- [ ] Update game.js
- [ ] Update gameConfig.js
- [ ] Update core/ball.js
- [ ] Update sandboxArena.js
- [ ] Verify no dangling imports

### Phase 4 (Cleanup & verify)
- [ ] Delete pickupConstants.js
- [ ] Delete old gameDrops.js
- [ ] Delete old pickup.js
- [ ] Test game runs
- [ ] Test all utilities work
- [ ] Commit to git

---

## QUESTIONS FOR APPROVAL

1. **Weapon colors in pickup.js:** Should I keep them inline or move to a separate file?
   - Recommendation: Keep inline (they're not items, just visual properties)

2. **Icon fallback chains:** Should I expand the fallback chains for all weapons or keep minimal?
   - Recommendation: Keep all current fallbacks (don't change behavior)

3. **Import style:** Which pattern do you prefer?
   ```javascript
   // Option A (item-based)
   import { scrumpyBottle } from './utilities/items/index.js';
   
   // Option B (barrel-based)
   import { scrumpyBottle } from './utilities/index.js';
   
   // Option C (constant-based)
   import { SCRUMPY_PUDDLE_DURATION_MS } from './utilities/constants.js';
   ```
   - Recommendation: Option B (consistent with weapons pattern)

4. **GameConfig.js:** Should it still define DROP_WEAPON_TYPES and DROP_UTILITY_TYPES or move to utilities?
   - Recommendation: Keep in gameConfig.js (it's game-wide config, not utility-specific)

---

## READY FOR EXECUTION?

This plan covers:
✅ Complete folder structure  
✅ Every file content mapped  
✅ All imports documented  
✅ Phase-by-phase breakdown  
✅ Risk mitigation  
✅ Execution checklist  

**Awaiting approval to proceed with Phase 1 (Create folder structure & items).**

