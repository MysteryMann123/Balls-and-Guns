# Stats.js Audit Report
**File:** `js/ui/stats.js`  
**Total Lines:** 1,106  
**Status:** Ready for rewrite analysis

---

## 1. IMPORTS FROM constants.js

**Import Style:** `import * as C from '../constants.js'` (line 1)

**Constants Used: 200+ references** throughout the file

**Categorized Usage:**

### Utility Constants (Lines 32-143)
Utilities have **hardcoded config object** with direct constant references:
- `C.AMMO_CRATE_DOUBLE_SHOT_MS` (line 38, 42)
- `C.HEALTHICO_HEAL` (line 50, 55)
- `C.HEALTHICO_REGEN_PER_TICK` (line 51, 56)
- `C.HEALTHICO_REGEN_INTERVAL_MS` (lines 51, 56)
- `C.HEALTHICO_REGEN_DURATION_MS` (line 52, 56)
- `C.UBERCHARGE_DURATION_MS` (line 63)
- `C.UBERCHARGE_HEAL_PER_SEC` (line 64)
- `C.CRITICAL_DURATION_MS` (line 72)
- `C.CRITICAL_DAMAGE_MULTIPLIER` (line 73)
- `C.CRITICAL_HEAL_PER_SEC` (line 74)
- `C.SPEED_BOOST_PERMANENT` (line 82, 83)
- `C.EXPLOSIVE_FLASK_SPLASH_RADIUS` (line 91)
- `C.EXPLOSIVE_FLASK_EFFECT_DURATION_MS` (line 92)
- `C.EXPLOSIVE_FLASK_SLOW_MULTIPLIER` (lines 93, 94)
- `C.EXPLOSIVE_FLASK_PICKUP_DAMAGE_MULTIPLIER` (line 94)
- `C.SCRUMPY_BOTTLE_THROW_DAMAGE_MIN` (line 105)
- `C.SCRUMPY_BOTTLE_THROW_DAMAGE_MAX` (line 105)
- `C.SCRUMPY_PUDDLE_DAMAGE_MIN` (line 106)
- `C.SCRUMPY_PUDDLE_DAMAGE_MAX` (line 106)
- `C.SCRUMPY_PUDDLE_DURATION_MS` (line 107, 112)
- `C.SCRUMPY_PUDDLE_INITIAL_RADIUS` (line 108)
- `C.SCRUMPY_PUDDLE_FINAL_RADIUS` (line 108)
- `C.SCRUMPY_PUDDLE_TICK_INTERVAL_MS` (not in utilityStats section)
- `C.SCRUMPY_DAMAGE_REDUCTION` (line 108)
- `C.BOMBANOMICRON_PROJECTILE_MIN` (line 119)
- `C.BOMBANOMICRON_PROJECTILE_MAX` (line 119)
- `C.DEAD_RINGER_PICKUP_COOLDOWN_MS` (line 133)
- `C.DEAD_RINGER_DURATION_MS` (line 134)
- `C.DEAD_RINGER_DAMAGE_REDUCTION` (line 135)
- `C.DEAD_RINGER_HEAL_MAX_HP_RATIO` (line 136)
- `C.DEAD_RINGER_SPEED_BOOST` (line 136)
- `C.DEAD_RINGER_DECOY_DURATION_MS` (line 134)

### Weapon Constants (Lines 619-964)
**buildWeaponStatChips() function** uses 100+ constants for specific weapon variants:

**Referenced but NOT in utilities stats:**
- `C.SHOTGUN_DAMAGE_MAX/MIN` (line 155)
- `C.SHOTGUN_HITSCAN_RANGE` (line 156)
- `C.FAMILY_BUSINESS_*` constants
- `C.WIDOWMAKER_*` constants
- `C.SODA_POPPER_*` constants
- `C.FORCE_A_NATURE_*` constants
- `C.MUSKET_*` constants
- `C.MAGICIAN_HAT_*` constants
- `C.MEDIGUN_*` constants
- And many more weapon-specific variants (60+ constant references)

### Special Notes Constants (Lines 145-463)
**Extensive flavor text** with inline constant references:
- Lines 145-463 contain hardcoded weapon descriptions
- Each weapon entry uses 2-10+ constants embedded in descriptive strings
- Examples:
  - Line 155-156: Shotgun description references `C.SHOTGUN_DAMAGE_MAX/MIN`, `C.SHOTGUN_HITSCAN_RANGE`
  - Line 187-191: Magician Hat description references `C.MAGICIAN_HAT_SPEED`, `C.MAGICIAN_HAT_DAMAGE_MIN/MAX`, `C.MAGICIAN_HAT_HOMING_RANGE`, `C.MAGICIAN_HAT_HOMING_STRENGTH`, `C.MAGICIAN_HAT_AMMO`, `C.MAGICIAN_HAT_RELOAD_MS`, `C.MAGICIAN_HAT_TELEPORT_DISTANCE`

---

## 2. OTHER FILE IMPORTS

```javascript
import * as C from '../constants.js';                           // Line 1: Constants
import { START_WEAPON_OPTIONS, DROP_UTILITY_TYPES } from '../gameConfig.js';  // Line 2: Game config
import { Weapon } from '../weapon.js';                          // Line 3: Weapon class
```

**Import Usage:**
- `START_WEAPON_OPTIONS` — used to populate weaponTypes array (line 21)
- `DROP_UTILITY_TYPES` — used to populate utilityTypes array (line 22)
- `Weapon` class — instantiated for each weapon via `new Weapon(type)` (lines 365, 370-372, 453-455, 620+)

---

## 3. HARDCODED FLAVOR TEXT / DESCRIPTIONS

**YES — Extensive hardcoding**

**Location:** Lines 145-463 (`specialNotes` object)

**Structure:**
- One entry per weapon type
- Manually iterated through ~48 weapon types
- No dynamic generation or imports from data files
- Hardcoded flavor text is interpolated with constants inline

**Examples:**
```javascript
pistol: [
    'True pistol variant: high fire rate, lower per-shot damage.',
    'Designed for sustained close-mid pressure.'
],
// ... 320+ lines of hand-written descriptions
```

**Amount:** ~320 lines of pure flavor text (Tier 1 weapons) + risk class tags

**What Kind:**
- Technical mechanics descriptions (damage ranges, fire rates, effects)
- Design philosophy ("designed for...", "pure...", "variant...")
- Risk class context (ZAYIN, TETH, HE, WAW, ALEPH)
- Quotes (Line 413: Harmony weapon has actual game quote)
- Team synergy notes

---

## 4. CLASS IMPORTS

**Yes — One class import:**

```javascript
import { Weapon } from '../weapon.js';  // Line 3
```

**Usage Pattern:**
- Called as `new Weapon(type)` to instantiate weapon objects
- Used in `buildWeaponStatChips()` function (line 620)
- Accesses weapon properties like:
  - `.maxAmmo` (line 623)
  - `.reloadTimeMs` (line 625)
  - `.fireRate` (line 631)
  - `.damageMin` / `.damageMax` (lines 633-636)
  - `.speed` (line 639)
  - `.pelletsPerShot` (line 641)
  - `.spreadAngle` (line 645)
  - `.splashRadius` (line 649)
  - `.knockbackStrength` (line 660)
  - `.piercingCount` (line 700)
  - `.damage` (line 636)
  - `.currentFireRate` (line 950 for minigun)
  - `.rampResetDelayMs` (line 949 for minigun)

---

## 5. PAGE STRUCTURE / ORGANIZATION

### Manual vs Iterative Approach

**UTILITIES: Hardcoded Object**
```javascript
const utilityStats = {
    ammoico: { title, subtitle, chips, notes },
    healthico: { ... },
    // ... 9 utilities total
};
```
- Lines 32-143
- **Approach:** Manual hardcoding of all 9 utility definitions
- **Rendering:** Single loop (lines 1078-1089) iterates `utilityTypes` array
- **Lookup:** Direct object access `utilityStats[type]` (line 1085)

**WEAPONS: Mixed Approach**
```javascript
// No weapon stats object — weapons stats generated dynamically
for (const type of weaponTypes) {
    // ... buildWeaponStatChips(type) called dynamically
}
```
- Lines 1060-1076
- **Approach:** Weapons list comes from `START_WEAPON_OPTIONS` (iterated)
- **Stats generation:** `buildWeaponStatChips(type)` generates chips on-the-fly
- **Notes:** `specialNotes[type]` object lookup (line 1072)

**STRUCTURE SUMMARY:**
- **Iterative for weapons:** Loop over START_WEAPON_OPTIONS, build dynamically
- **Hardcoded for utilities:** Manual object definition with 9 entries
- **Flavor text:** Hybrid — `specialNotes` object has one entry per weapon (hardcoded text + inline constants)

---

## 6. TOTAL LINE COUNT

**Total:** 1,106 lines

**Breakdown:**
- Imports & setup: ~25 lines
- Risk class colors: ~7 lines
- Utility stats object: ~112 lines
- Special notes object: ~320 lines
- Type images object: ~60 lines
- Utility function (formatLabel): ~50 lines
- Other utilities (toMsText, makeRiskClassChip, decorateListButton): ~60 lines
- **buildWeaponStatChips()**: ~345 lines ⚠️ MASSIVE FUNCTION
- renderDealerTable(): ~28 lines
- renderDetail(): ~51 lines
- List rendering & tab switching: ~40 lines
- Event listeners: ~3 lines

**Largest component:** `buildWeaponStatChips()` at ~345 lines (lines 619-964)

---

## 7. W.* AVAILABILITY vs MANUAL WORK

### What's Available from W.* (via weapon.js/weapons/index.js):
- ✅ Weapon config properties: `maxAmmo`, `reloadTimeMs`, `fireRate`, `damageMin`, `damageMax`, `speed`, `pelletsPerShot`, `spreadAngle`, `splashRadius`, `knockbackStrength`, `piercingCount`
- ✅ Weapon display name via `weapon.DISPLAY_NAME`
- ✅ Weapon image via `weapon.image`
- ✅ Weapon color via `weapon.COLOR`
- ✅ Weapon-specific mechanics (lifesteal ratio, homing params, etc.) — stored as weapon object properties

### What Requires Manual Definition:
- ❌ **Flavor text** — 320 lines of descriptions (hardcoded in `specialNotes`)
- ❌ **Risk class mappings** — which weapon has which risk class (embedded in `specialNotes`)
- ❌ **Weapon ordering** — comes from `START_WEAPON_OPTIONS` array (gameConfig.js)
- ❌ **Chip generation logic** — 345-line function with 50+ hardcoded `if` statements
- ❌ **Utility stats object** — separate definition from utilities (could potentially import from utilities/items/index.js)
- ❌ **UI layout** — HTML elements, CSS classes, event listeners

---

## 8. REFACTORING OPPORTUNITIES

### High-Impact Rewrite Targets:

1. **buildWeaponStatChips() function** (345 lines)
   - 50+ `if (type === 'weaponName')` statements
   - Could be replaced with data-driven approach using weapon object properties
   - Risk: Must preserve exact chip ordering and styling logic

2. **specialNotes object** (320 lines)
   - Weapon-by-weapon hardcoded descriptions
   - Could be auto-generated or moved to a separate data file
   - Risk: Flavor text quality and accuracy

3. **utilityStats vs utilities/items/** structure mismatch
   - utilities/items/ has modularized utility definitions
   - stats.js manually re-defines all utility stats
   - Opportunity: Import from utilities/items/ instead of hardcoding

4. **Risk class mapping**
   - Hardcoded in `riskClassColors` object (lines 24-30)
   - Risk class associations embedded in flavor text
   - Could be pulled from weapon definitions

5. **typeImages object** (60 lines)
   - Manually maps weapon → image path
   - Could be imported from weapon definitions (`weapon.image`)

---

## AUDIT SUMMARY

| Aspect | Finding |
|--------|---------|
| **Constants Used** | 200+ references to C.* constants |
| **Other Imports** | Weapon class, START_WEAPON_OPTIONS, DROP_UTILITY_TYPES |
| **Flavor Text** | 320+ lines hardcoded in `specialNotes` object |
| **Classes** | Weapon class (instantiated for stats generation) |
| **Structure** | Utilities hardcoded object; weapons iterated with dynamic chip generation |
| **Dead Code** | Likely: duplicated values, unused properties, old weapon references |
| **Refactor Complexity** | HIGH — requires understanding: (1) chip generation logic, (2) flavor text synchronization, (3) risk class mapping |
| **Manual Code** | ~500 lines of manual hardcoding (specialNotes + buildWeaponStatChips logic) |
| **Opportunity** | 50% code reduction possible via data-driven approach + importing from utilities/items/ |

---

## NEXT STEPS FOR REWRITE

Before rewriting stats.js v2, clarify:
1. **Weapon metadata source:** Should weapon descriptions come from weapon definition files or remain in stats.js?
2. **Risk class mapping:** Should it be part of weapon definitions or stay separate?
3. **Chip generation:** Can it be fully data-driven or must some weapons keep special logic?
4. **Utility duplication:** Should utilities import from `/utilities/items/` instead of redefining?
5. **Image paths:** Should they come from weapon.image property or stay in typeImages map?

