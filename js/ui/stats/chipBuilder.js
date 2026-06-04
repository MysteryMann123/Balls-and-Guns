// Data-driven chip builder - reads properties directly from weapon/utility objects
// No constants imports, no if/type statements, only generates chips for properties that exist

function toMsText(ms) {
    return `${ms} ms (${(ms / 1000).toFixed(2)}s)`;
}

export function buildWeaponChips(weapon) {
    if (!weapon) return [];

    const chips = [];

    // Base chips - only if property exists
    // Handle both AMMO and MAX_AMMO naming conventions
    const ammo = weapon.MAX_AMMO !== undefined ? weapon.MAX_AMMO : weapon.AMMO;
    if (ammo !== undefined) {
        chips.push(['Ammo', ammo === Infinity ? '∞' : `${ammo}`]);
    }

    if (weapon.RELOAD_MS !== undefined && weapon.RELOAD_MS > 0) {
        chips.push(['Reload', toMsText(weapon.RELOAD_MS)]);
    } else if (weapon.RELOAD_MS !== undefined) {
        chips.push(['Reload', 'N/A']);
    }

    if (weapon.FIRE_RATE !== undefined) {
        chips.push(['Fire Interval', `${weapon.FIRE_RATE} ms`]);
    }

    // Handle both DAMAGE_MIN/MAX and single DAMAGE naming conventions
    if (weapon.DAMAGE_MIN !== undefined && weapon.DAMAGE_MAX !== undefined) {
        chips.push(['Damage', `${weapon.DAMAGE_MIN} - ${weapon.DAMAGE_MAX}`]);
    } else if (weapon.DAMAGE !== undefined) {
        chips.push(['Damage', `${weapon.DAMAGE}`]);
    }

    if (weapon.SPEED !== undefined) {
        chips.push(['Projectile Speed', `${weapon.SPEED}`]);
    }

    if (weapon.PELLETS_PER_SHOT !== undefined) {
        chips.push(['Pellets/Shot', `${weapon.PELLETS_PER_SHOT}`]);
    }

    // Handle both SPREAD_ANGLE and DEVIATION naming conventions
    const spread = weapon.SPREAD_ANGLE !== undefined ? weapon.SPREAD_ANGLE : weapon.DEVIATION;
    if (spread !== undefined) {
        chips.push(['Spread', `${spread}`]);
    }

    if (weapon.SPLASH_RADIUS !== undefined) {
        chips.push(['Splash Radius', `${weapon.SPLASH_RADIUS}`]);
    }

    // Generic special properties - add any chip if property exists on weapon
    // This handles all special weapon types without hardcoding

    const specialProps = [
        // Medigun
        ['BEAM_RANGE', 'Beam Range', (v) => `${v}`],
        ['ALLY_HEAL_PER_SEC', 'Ally Heal/sec', (v) => `${v}`],
        ['OVERHEAL_MULTIPLIER', 'Overheal Cap', (v) => `${Math.round(v * 100)}% max HP`],
        ['ENEMY_DAMAGE_PER_SEC', 'Enemy DPS', (v) => `${v}`],
        ['ENEMY_LIFESTEAL_PER_SEC', 'Lifesteal/sec', (v) => `${v}`],

        // Widowmaker
        ['AMMO_PER_SHOT', 'Ammo/Shot', (v) => `${v}`],
        ['LOW_AMMO_RELOAD_MS', 'Low Ammo Reload', (v) => toMsText(v)],

        // Shotgun variants
        ['HYPE_CHARGE', 'Hype Charge', (v) => `${v} damage`],
        ['HYPE_DAMAGE_MULTIPLIER', 'Hype Damage x', (v) => `${v.toFixed(2)}`],
        ['HYPE_DURATION_MS', 'Hype Duration', (v) => toMsText(v)],

        // Force-a-Nature
        ['ENEMY_KNOCKBACK', 'Enemy Knockback', (v) => `${v}`],
        ['SELF_KNOCKBACK', 'Self Recoil', (v) => `${v}`],

        // Musket
        ['BAYONET_RANGE', 'Bayonet Range', (v) => `${v}px`],
        ['BAYONET_COOLDOWN_MS', 'Bayonet Cooldown', (v) => toMsText(v)],
        ['BAYONET_HEAL_MULTIPLIER', 'Healing Effectiveness', (v) => `${Math.round(v * 100)}% while bleeding`],

        // Magician Hat
        ['TELEPORT_DISTANCE', 'Teleport Distance', (v) => `${v}px`],
        ['TELEPORT_SMOKE_DURATION_MS', 'Smoke Duration', (v) => toMsText(v)],

        // Crossbow
        ['PIERCING_COUNT', 'Pierce Count', (v) => `${v}`],

        // Yellow Targe
        ['CHARGE_RELOAD_MS', 'Charge Reload', (v) => toMsText(v)],
        ['CHARGE_TRIGGER_RANGE', 'Trigger Range', (v) => `${v}`],
        ['CHARGE_IMPULSE', 'Charge Impulse', (v) => `${v}`],

        // Short Circuit
        ['FIELD_RADIUS', 'Field Radius', (v) => `${v}px`],
        ['DOT_DAMAGE', 'DoT Damage', (v) => `${v}`],
        ['DOT_INTERVAL_MS', 'DoT Interval', (v) => toMsText(v)],
        ['FIELD_SPEED', 'Field Speed', (v) => `${v}`],

        // Grenades
        ['EXPLODE_DELAY_MS', 'Explode Delay', (v) => toMsText(v)],
        ['SPLASH_MAX_DAMAGE', 'Splash Max Damage', (v) => `${v}`],

        // Loch-n-Load
        ['FAST_MOVE_BONUS', 'Fast Move Bonus', (v) => `+${v * 100}%`],

        // Piplauncher
        ['FLASK_COOLDOWN_MS', 'Flask Cooldown', (v) => toMsText(v)],
        ['FLASK_SLOW_MULTIPLIER', 'Flask Slow', (v) => `x${v.toFixed(2)}`],

        // Minigun
        ['RAMP_RESET_DELAY_MS', 'Ramp Delay (reset)', (v) => toMsText(v)],
        ['CURRENT_FIRE_RATE', 'Min Fire Rate', (v) => `${v}ms (ramped)`],

        // Rocket Jumper
        ['MELEE_COOLDOWN_MS', 'Melee Cooldown', (v) => toMsText(v)],

        // Knockback
        ['KNOCKBACK_STRENGTH', 'Knockback', (v) => `${v}`],

        // Hairspray
        ['CLOUD_RADIUS', 'Cloud Radius', (v) => `${v}px`],
        ['MAX_RANGE', 'Max Range', (v) => `${v}px`],

        // Hypocrisy
        ['RAMP_RATE_MS_PER_SEC', 'Ramp Speed', (v) => `${v}ms/s reduction`],
        ['IDLE_RESET_MS', 'Idle Reset', (v) => `After ${v}ms`],
        ['DAMAGE_MULTIPLIER_MAX', 'Dmg Multiplier', (v) => `x${v} at base → x1 at min rate`],
        ['AMMO_REFUND_RATIO', 'Damage Refund', (v) => `${Math.round(v * 100)}% max ammo on damage taken`],

        // Crimson Scar
        ['RANGE_SWITCH_DISTANCE', 'Range Switch', (v) => `${v}px`],
        ['SPEED_BONUS', 'Speed Bonus', (v) => `+${Math.round(v * 100)}%`],
        ['DAMAGE_TAKEN_PENALTY', 'Dmg Penalty', (v) => `+${Math.round(v * 100)}% taken`],
        ['MARK_DURATION_MS', 'Mark Duration', (v) => `${v / 1000}s`],
        ['MARK_DAMAGE_BONUS', 'Mark Bonus', (v) => `+${Math.round(v * 100)}% dmg to marked`],

        // Sword Sharpened
        ['BLESSING_SHIELD_DURATION_MS', 'Shield Duration', (v) => toMsText(v)],
        ['BLESSING_SHIELD_DAMAGE_BLOCK', 'Damage Block', (v) => `${Math.round(v * 100)}%`],
        ['BLESSING_SHIELD_RADIUS', 'Shield Radius', (v) => `${v}px`],
        ['PIERCE_DAMAGE_HP_RATIO', 'Self-Damage on Miss', (v) => `${Math.round(v * 100)}% max HP`],
        ['PIERCE_STICK_DURATION_MS', 'Stick Duration', (v) => toMsText(v)],
        ['SHARPEN_DAMAGE_BONUS', 'Damage per Stack', (v) => `+${Math.round(v * 100)}%`],
        ['SHARPEN_SPEED_BONUS', 'Speed per Stack', (v) => `+${Math.round(v * 100)}%`],
        ['SHARPEN_RELOAD_BONUS', 'Reload per Stack', (v) => `+${Math.round(v * 100)}%`],
        ['SHARPEN_MAX_STACKS', 'Max Stacks', (v) => `${v}`],
        ['SHARPEN_DURATION_MS', 'Stack Duration', (v) => toMsText(v)],
        ['RESISTANCE_IGNORE', 'Resistance Ignore', (v) => `${Math.round(v * 100)}%`],

        // Blu's Basher / Bees
        ['BEE_DAMAGE_MIN', 'Bee Damage Min', (v) => `${v}`],
        ['BEE_DAMAGE_MAX', 'Bee Damage Max', (v) => `${v}`],
        ['BEE_SPEED', 'Bee Speed', (v) => `${v}`],
        ['BEE_SIZE', 'Bee Size', (v) => `${v}px`],
        ['BEE_HOMING_RANGE', 'Bee Homing Range', (v) => `${v}px`],
        ['BEE_HOMING_STRENGTH', 'Bee Homing Strength', (v) => `${v}`],
        ['BEE_MAX_ACTIVE', 'Max Active Bees', (v) => `${v}`],

        // Afterburn
        ['AFTERBURN_DAMAGE_MIN', 'Afterburn/Tick Min', (v) => `${v}`],
        ['AFTERBURN_DAMAGE_MAX', 'Afterburn/Tick Max', (v) => `${v}`],
        ['AFTERBURN_DURATION_MS', 'Afterburn Duration', (v) => toMsText(v)],
        ['AFTERBURN_INTERVAL_MS', 'Afterburn Interval', (v) => toMsText(v)],
        ['AFTERBURN_MULTIPLIER', 'Afterburn x', (v) => `${v.toFixed(2)}`],

        // Airblast
        ['AIRBLAST_AMMO_COST', 'Airblast Cost', (v) => `${v} ammo`],
        ['AIRBLAST_COOLDOWN_MS', 'Airblast Cooldown', (v) => toMsText(v)],

        // Ally heals
        ['ALLY_HEAL_MIN', 'Ally Heal Min', (v) => `${v} HP`],
        ['ALLY_HEAL_MAX', 'Ally Heal Max', (v) => `${v} HP`],
        ['ALLY_HEAL_PER_SEC', 'Ally Heal/sec', (v) => `${v} HP`],
        ['ALLY_HEAL_RADIUS', 'Heal Radius', (v) => `${v}px`],

        // Black burn (special EGO effect)
        ['BLACK_BURN_DURATION_MS', 'Black Burn Duration', (v) => toMsText(v)],
        ['BLACK_BURN_INTERVAL_MS', 'Black Burn Interval', (v) => toMsText(v)],
        ['BLACK_BURN_MIN', 'Black Burn Min', (v) => `${v}`],
        ['BLACK_BURN_MAX', 'Black Burn Max', (v) => `${v}`],

        // White burn (special EGO effect)
        ['WHITE_BURN_DURATION_MS', 'White Burn Duration', (v) => toMsText(v)],
        ['WHITE_BURN_INTERVAL_MS', 'White Burn Interval', (v) => toMsText(v)],
        ['WHITE_BURN_MIN', 'White Burn Min', (v) => `${v}`],
        ['WHITE_BURN_MAX', 'White Burn Max', (v) => `${v}`],

        // AOE/Radius effects
        ['AOE_RADIUS', 'AOE Radius', (v) => `${v}px`],
        ['AOE_HIT_COOLDOWN_MS', 'AOE Hit Cooldown', (v) => toMsText(v)],

        // Misc effects
        ['UNLOAD_MS', 'Unload Time', (v) => toMsText(v)],
        ['TRACER_RANGE', 'Tracer Range', (v) => `${v}px`],
        ['TRACER_DURATION_MS', 'Tracer Duration', (v) => toMsText(v)],
        ['STICK_DURATION_MS', 'Stick Duration', (v) => toMsText(v)],
        ['TICK_INTERVAL_MS', 'Tick Interval', (v) => toMsText(v)],
        ['SWING_ANIMATION_MS', 'Swing Time', (v) => toMsText(v)],
        ['SWING_ARC_DEGREES', 'Swing Arc', (v) => `${v}°`],

        // EGO properties
        ['PIERCE_COUNT', 'Pierce', (v) => `${v} enemies`],
        ['SLOW_DURATION_MS', 'Slow Duration', (v) => `${v / 1000}s`],
        ['WIELDER_SPEED', 'Wielder Speed', (v) => `-${Math.round((1 - v) * 100)}% move speed`],
        ['HOMING_RANGE', 'Homing', (v) => `Slight (${v}px range)`],
        ['CURSE_CYCLE', 'Cursed Shot', (v) => `Every ${v}th shot self-hits`],
        ['SELF_HIT_MULTIPLIER', 'Self-Hit Damage', (v) => `${Math.round(v * 100)}% of shot damage`],
        ['ORBITAL_CONTACT_MULTIPLIER', 'Orbital Contact', (v) => `${v * 100}% shot dmg, 0.5s cd`],
    ];

    for (const [propName, label, formatter] of specialProps) {
        if (weapon[propName] !== undefined) {
            chips.push([label, formatter(weapon[propName])]);
        }
    }

    // Multi-property chips (need special handling)
    if (weapon.BAYONET_DAMAGE_MIN !== undefined && weapon.BAYONET_DAMAGE_MAX !== undefined) {
        chips.push(['Bayonet Damage', `${weapon.BAYONET_DAMAGE_MIN} - ${weapon.BAYONET_DAMAGE_MAX}`]);
    }
    if (weapon.BAYONET_BLEED_DAMAGE_MIN !== undefined && weapon.BAYONET_BLEED_DAMAGE_MAX !== undefined) {
        chips.push(['Bleed Damage/Tick', `${weapon.BAYONET_BLEED_DAMAGE_MIN} - ${weapon.BAYONET_BLEED_DAMAGE_MAX}`]);
    }
    if (weapon.ALLY_HEAL_MIN !== undefined && weapon.ALLY_HEAL_MAX !== undefined) {
        chips.push(['Ally Heal', `${weapon.ALLY_HEAL_MIN} - ${weapon.ALLY_HEAL_MAX}`]);
    }
    if (weapon.FIRE_RATE_BASE !== undefined && weapon.FIRE_RATE_MIN !== undefined) {
        chips.push(['Fire Rate', `${weapon.FIRE_RATE_BASE}ms → ${weapon.FIRE_RATE_MIN}ms`]);
    }
    if (weapon.BURST_COUNT !== undefined && weapon.GUN_DAMAGE_MIN !== undefined && weapon.GUN_DAMAGE_MAX !== undefined) {
        chips.push(['Gun Burst', `${weapon.BURST_COUNT}x ${weapon.GUN_DAMAGE_MIN}–${weapon.GUN_DAMAGE_MAX} dmg`]);
    }
    if (weapon.BURST_INTERVAL_MS !== undefined && weapon.FIRE_RATE_GUN !== undefined) {
        chips.push(['Burst Interval', `${weapon.BURST_INTERVAL_MS}ms / ${weapon.FIRE_RATE_GUN}ms between`]);
    }
    if (weapon.BLEED_DAMAGE_MIN !== undefined && weapon.BLEED_DAMAGE_MAX !== undefined && weapon.BLEED_INTERVAL_MS !== undefined && weapon.BLEED_DURATION_MS !== undefined) {
        chips.push(['Bleed', `${weapon.BLEED_DAMAGE_MIN}–${weapon.BLEED_DAMAGE_MAX} / ${weapon.BLEED_INTERVAL_MS}ms for ${weapon.BLEED_DURATION_MS / 1000}s`]);
    }
    if (weapon.BLADE_DAMAGE_MIN !== undefined && weapon.BLADE_DAMAGE_MAX !== undefined) {
        chips.push(['Blade Damage', `${weapon.BLADE_DAMAGE_MIN}–${weapon.BLADE_DAMAGE_MAX}`]);
    }
    if (weapon.MELEE_MIN_DAMAGE !== undefined && weapon.MELEE_MAX_DAMAGE !== undefined) {
        chips.push(['Melee Damage', `${weapon.MELEE_MIN_DAMAGE} - ${weapon.MELEE_MAX_DAMAGE}`]);
    }
    if (weapon.AFTERBURN_DAMAGE_MIN !== undefined && weapon.AFTERBURN_DAMAGE_MAX !== undefined) {
        chips.push(['Afterburn/Tick', `${weapon.AFTERBURN_DAMAGE_MIN} - ${weapon.AFTERBURN_DAMAGE_MAX}`]);
    }
    if (weapon.TICK_DAMAGE_MIN !== undefined && weapon.TICK_DAMAGE_MAX !== undefined) {
        chips.push(['Tick Damage', `${weapon.TICK_DAMAGE_MIN}–${weapon.TICK_DAMAGE_MAX}`]);
    }
    if (weapon.NEAR_MAX_TICKS !== undefined && weapon.MID_MAX_TICKS !== undefined && weapon.FAR_MAX_TICKS !== undefined) {
        chips.push(['Near / Mid / Far', `${weapon.NEAR_MAX_TICKS} / ${weapon.MID_MAX_TICKS} / ${weapon.FAR_MAX_TICKS} ticks`]);
    }
    if (weapon.ALLY_SPLASH_HEAL_MIN !== undefined && weapon.ALLY_SPLASH_HEAL_MAX !== undefined) {
        chips.push(['Ally Splash Heal', `${weapon.ALLY_SPLASH_HEAL_MIN} - ${weapon.ALLY_SPLASH_HEAL_MAX}`]);
    }
    if (weapon.LIFESTEAL_HIT_MIN !== undefined && weapon.LIFESTEAL_HIT_MAX !== undefined) {
        chips.push(['Lifesteal/Hit', `${weapon.LIFESTEAL_HIT_MIN} - ${weapon.LIFESTEAL_HIT_MAX}`]);
    }
    if (weapon.SLOW_ON_HIT !== undefined && weapon.SLOW_DURATION_MS !== undefined) {
        chips.push(['Slow on Hit', `${Math.round((1 - weapon.SLOW_ON_HIT) * 100)}% for ${weapon.SLOW_DURATION_MS / 1000}s`]);
    }

    return chips;
}

export function buildUtilityChips(utility) {
    if (!utility) return [];
    const chips = [];

    // Utilities have minimal special chips - mostly handled by descriptions
    // Only add if specific properties exist

    return chips;
}
