// --- Timing ---
const cooldownMs             = 4000;

// --- Projectile ---
const speed                  = 9.4;
const splashRadius           = 100;

// --- Debuff ---
const effectDurationMs       = 4000;
const slowMultiplier         = 0.72;
const pipDamageMultiplier    = 1.5;
const pickupDamageMultiplier = 1.4;

const explosiveFlask = {
    // Timing
    COOLDOWN_MS:              cooldownMs,

    // Projectile
    SPEED:                    speed,
    SPLASH_RADIUS:            splashRadius,

    // Debuff
    EFFECT_DURATION_MS:       effectDurationMs,
    SLOW_MULTIPLIER:          slowMultiplier,
    PIP_DAMAGE_MULTIPLIER:    pipDamageMultiplier,
    PICKUP_DAMAGE_MULTIPLIER: pickupDamageMultiplier,
};

export default explosiveFlask;
