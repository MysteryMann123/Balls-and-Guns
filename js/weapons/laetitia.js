// --- Config ---
const maxAmmo        = 1;
const speed          = 14;
const fireRate       = 500;
const color          = '#ffaaff';
const projectileSize = 7;
const pelletsPerShot = 1;
const spreadAngle    = 0.02;

// --- Damage & Timing ---
const damageMin                 = 40;
const damageMax                 = 50;
const reloadMs                  = 1500;

// --- Mark ---
const markDurationMs            = 5000;
const markVulnMultiplier        = 1.2;
const markTriggerThresholdRatio = 0.1;
const markColor                 = '#ff88ff';

// --- Blast ---
const blastRadius               = 90;
const blastDamageMinRatio       = 0.03;
const blastDamageMaxRatio       = 0.06;

const CONFIG = {
    maxAmmo,
    reloadTimeMs: reloadMs,
    damage: 0,
    damageMin,
    damageMax,
    speed,
    fireRate,
    color,
    projectileSize,
    pelletsPerShot,
    spreadAngle,
};

const laetitia = {
    // Config
    MAX_AMMO:                      maxAmmo,
    SPEED:                         speed,
    FIRE_RATE:                     fireRate,
    COLOR:                         color,
    PROJECTILE_SIZE:               projectileSize,
    PELLETS_PER_SHOT:              pelletsPerShot,
    SPREAD_ANGLE:                  spreadAngle,

    // Damage & Timing
    DAMAGE_MIN:                    damageMin,
    DAMAGE_MAX:                    damageMax,
    RELOAD_MS:                     reloadMs,

    // Mark
    MARK_DURATION_MS:              markDurationMs,
    MARK_VULN_MULTIPLIER:          markVulnMultiplier,
    MARK_TRIGGER_THRESHOLD_RATIO:  markTriggerThresholdRatio,
    MARK_COLOR:                    markColor,

    // Blast
    BLAST_RADIUS:                  blastRadius,
    BLAST_DAMAGE_MIN_RATIO:        blastDamageMinRatio,
    BLAST_DAMAGE_MAX_RATIO:        blastDamageMaxRatio,
    image: 'assets/EGOWeaponLaetitia.webp',
    DISPLAY_NAME:                  'EGO WEAPON LAETITIA',

    riskClass: 'HE',

    description: [
        'HE E.G.O weapon — a single-shot pistol that inflicts the Laetitia Gift Mark on hit, making enemies take 20% more damage from all sources for 5s.',
        'On-hit damage: 40–50. Single shot per reload (1.5s).',
        'When a marked enemy takes ≥10% of their max HP in a single hit, a blast triggers at 90px radius.',
        'Blast deals 3–6% of nearby enemies\' max HP and applies the same mark to them.',
        'Blast damage itself does not re-trigger the blast (anti-cascade). A 500ms per-ball cooldown also prevents rapid re-triggering.',
        'Marked enemies are shown with a pulsing pink ring.'
    ],
};

export default laetitia;
