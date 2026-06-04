import { Weapon } from '../weapon.js';
import * as C from '../constants.js';
import { toMsText } from './utility.js';
import { makeChip } from './riskClass.js';

function buildWeaponChips(type) {
    const weapon = new Weapon(type);
    const chips = [];

    chips.push(['Ammo', weapon.maxAmmo === Infinity ? '∞' : `${weapon.maxAmmo}`]);

    if (weapon.reloadTimeMs && weapon.reloadTimeMs > 0) {
        chips.push(['Reload', toMsText(weapon.reloadTimeMs)]);
    } else {
        chips.push(['Reload', 'N/A']);
    }

    chips.push(['Fire Interval', `${weapon.fireRate} ms`]);

    if (typeof weapon.damageMin === 'number' && typeof weapon.damageMax === 'number') {
        chips.push(['Damage', `${weapon.damageMin} - ${weapon.damageMax}`]);
    } else {
        chips.push(['Damage', `${weapon.damage ?? 0}`]);
    }

    chips.push(['Projectile Speed', `${weapon.speed}`]);

    if (typeof weapon.pelletsPerShot === 'number') {
        chips.push(['Pellets/Shot', `${weapon.pelletsPerShot}`]);
    }

    if (typeof weapon.spreadAngle === 'number') {
        chips.push(['Spread', `${weapon.spreadAngle}`]);
    }

    if (typeof weapon.splashRadius === 'number') {
        chips.push(['Splash Radius', `${weapon.splashRadius}`]);
    }

    // Special weapon type handling
    if (type === 'piplauncher') {
        chips.push(['Flask Cooldown', toMsText(C.EXPLOSIVE_FLASK_COOLDOWN_MS)]);
        chips.push(['Pip Flask Vuln', `x${C.EXPLOSIVE_FLASK_PIP_DAMAGE_MULTIPLIER.toFixed(2)}`]);
        chips.push(['Flask Slow', `x${C.EXPLOSIVE_FLASK_SLOW_MULTIPLIER.toFixed(2)}`]);
        chips.push(['Ally Splash Heal', `${C.PIP_LAUNCHER_ALLY_HEAL_MIN} - ${C.PIP_LAUNCHER_ALLY_HEAL_MAX}`]);
    }

    if (typeof weapon.knockbackStrength === 'number') {
        chips.push(['Knockback', `${weapon.knockbackStrength}`]);
    }

    if (type === 'widowmaker') {
        chips.push(['Ammo/Shot', `${C.WIDOWMAKER_AMMO_PER_SHOT}`]);
        chips.push(['Low Ammo Reload', toMsText(C.WIDOWMAKER_LOW_AMMO_RELOAD_MS)]);
    }

    if (type === 'sodapopper') {
        chips.push(['Hype Charge', `${C.SODA_POPPER_CHARGE_DAMAGE_REQUIRED} damage`]);
        chips.push(['Hype Damage x', `${C.SODA_POPPER_HYPE_DAMAGE_MULTIPLIER.toFixed(2)}`]);
        chips.push(['Hype Duration', toMsText(C.SODA_POPPER_HYPE_DURATION_MS)]);
    }

    if (type === 'forceanature') {
        chips.push(['Enemy Knockback', `${C.FORCE_A_NATURE_ENEMY_KNOCKBACK}`]);
        chips.push(['Self Recoil', `${C.FORCE_A_NATURE_SELF_KNOCKBACK}`]);
        chips.push(['Hype Meter', 'None']);
    }

    if (type === 'musket') {
        chips.push(['Bayonet Damage', `${C.MUSKET_BAYONET_DAMAGE_MIN} - ${C.MUSKET_BAYONET_DAMAGE_MAX}`]);
        chips.push(['Bayonet Range', `${C.MUSKET_BAYONET_RANGE}px`]);
        chips.push(['Bayonet Cooldown', toMsText(C.MUSKET_BAYONET_COOLDOWN_MS)]);
        chips.push(['Bleed Damage/Tick', `${C.MUSKET_BAYONET_BLEED_DAMAGE_MIN} - ${C.MUSKET_BAYONET_BLEED_DAMAGE_MAX}`]);
        chips.push(['Bleed Duration', toMsText(C.MUSKET_BAYONET_BLEED_DURATION_MS)]);
        chips.push(['Healing Effectiveness', `${Math.round(C.MUSKET_BAYONET_HEAL_MULTIPLIER * 100)}% while bleeding`]);
    }

    if (type === 'magicianhat') {
        chips.push(['Projectile', 'Bunny']);
        chips.push(['Teleport Distance', `${C.MAGICIAN_HAT_TELEPORT_DISTANCE}px`]);
        chips.push(['Smoke Duration', toMsText(C.MAGICIAN_HAT_TELEPORT_SMOKE_DURATION_MS)]);
    }

    if (type === 'crusaderscrossbow') {
        chips.push(['Ally Heal', `${C.CRUSADERS_CROSSBOW_HEAL_MIN} - ${C.CRUSADERS_CROSSBOW_HEAL_MAX}`]);
    }

    if (typeof weapon.piercingCount === 'number') {
        chips.push(['Pierce Count', `${weapon.piercingCount}`]);
    }

    if (type === 'medigun') {
        chips.push(['Beam Range', `${C.MEDIGUN_BEAM_RANGE}`]);
        chips.push(['Ally Heal/sec', `${C.MEDIGUN_ALLY_HEAL_PER_SEC}`]);
        chips.push(['Overheal Cap', `${Math.round(C.MEDIGUN_OVERHEAL_MULTIPLIER * 100)}% max HP`]);
        chips.push(['Enemy DPS', `${C.MEDIGUN_ENEMY_DAMAGE_PER_SEC}`]);
        chips.push(['Lifesteal/sec', `${C.MEDIGUN_ENEMY_LIFESTEAL_PER_SEC}`]);
    }

    if (type === 'yellowtarge') {
        chips.push(['Charge Reload', toMsText(C.YELLOW_TARGE_CHARGE_RELOAD_MS)]);
        chips.push(['Trigger Range', `${C.YELLOW_TARGE_CHARGE_TRIGGER_RANGE}`]);
        chips.push(['Charge Impulse', `${C.YELLOW_TARGE_CHARGE_IMPULSE}`]);
    }

    if (type === 'blutsauger') {
        chips.push(['Lifesteal/Hit', `${C.BLUTSAUGER_HEAL_MIN} - ${C.BLUTSAUGER_HEAL_MAX}`]);
        chips.push(['Lifesteal Target', 'Enemy-aligned only']);
    }

    if (type === 'shortcircuit') {
        chips.push(['Field Radius', `${C.SHORT_CIRCUIT_RADIUS}px`]);
        chips.push(['DoT Damage', `${C.SHORT_CIRCUIT_DOT_DAMAGE}`]);
        chips.push(['DoT Interval', toMsText(C.SHORT_CIRCUIT_DOT_INTERVAL_MS)]);
        chips.push(['Field Speed', `${C.SHORT_CIRCUIT_SPEED}`]);
    }

    if (type === 'grenadelauncher') {
        chips.push(['Explode Delay', toMsText(C.GRENADE_LAUNCHER_EXPLODE_DELAY_MS)]);
        chips.push(['Splash Max Damage', `${C.GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE}`]);
    }

    if (type === 'lochnload') {
        chips.push(['On Hit Only', 'No bounce / no timer']);
        chips.push(['Splash Max Damage', `${C.LOCH_N_LOAD_SPLASH_MAX_DAMAGE}`]);
        chips.push(['Fast Move Bonus', `+${C.LOCH_N_LOAD_FAST_MOVE_BONUS * 100}%`]);
    }

    if (type === 'hairspray') {
        chips.push(makeChip('ZAYIN'));
        chips.push(['Cloud Radius', `${C.HAIRSPRAY_CLOUD_RADIUS}px`]);
        chips.push(['Max Range', `${C.HAIRSPRAY_MAX_RANGE}px`]);
        chips.push(['Tick Damage', `${C.HAIRSPRAY_TICK_DAMAGE_MIN}–${C.HAIRSPRAY_TICK_DAMAGE_MAX}`]);
        chips.push(['Near / Mid / Far', `${C.HAIRSPRAY_NEAR_MAX_TICKS} / ${C.HAIRSPRAY_MID_MAX_TICKS} / ${C.HAIRSPRAY_FAR_MAX_TICKS} ticks`]);
    }

    // EGO Weapons
    if (type === 'hypocrisy') {
        chips.push(makeChip('WAW'));
        chips.push(['Fire Rate', `${C.HYPOCRISY_FIRE_RATE_BASE}ms → ${C.HYPOCRISY_FIRE_RATE_MIN}ms`]);
        chips.push(['Ramp Speed', `${C.HYPOCRISY_RAMP_RATE_MS_PER_SEC}ms/s reduction`]);
        chips.push(['Idle Reset', `After ${C.HYPOCRISY_IDLE_RESET_MS}ms`]);
        chips.push(['Dmg Multiplier', `x${C.HYPOCRISY_DAMAGE_MULTIPLIER_MAX} at base → x1 at min rate`]);
        chips.push(['Damage Refund', `${Math.round(C.HYPOCRISY_AMMO_REFUND_RATIO * 100)}% max ammo on damage taken`]);
        chips.push(['Refund Amount', `${Math.floor(C.HYPOCRISY_AMMO * C.HYPOCRISY_AMMO_REFUND_RATIO)} arrows`]);
    }

    if (type === 'crimsonscar') {
        chips.push(makeChip('WAW'));
        chips.push(['Range Switch', `${C.CRIMSON_SCAR_RANGE_SWITCH_DISTANCE}px`]);
        chips.push(['Gun Burst', `${C.CRIMSON_SCAR_BURST_COUNT}x ${C.CRIMSON_SCAR_GUN_DAMAGE_MIN}–${C.CRIMSON_SCAR_GUN_DAMAGE_MAX} dmg`]);
        chips.push(['Burst Interval', `${C.CRIMSON_SCAR_BURST_INTERVAL_MS}ms / ${C.CRIMSON_SCAR_FIRE_RATE}ms between`]);
        chips.push(['Blade Damage', `${C.CRIMSON_SCAR_BLADE_DAMAGE_MIN}–${C.CRIMSON_SCAR_BLADE_DAMAGE_MAX}`]);
        chips.push(['Bleed', `${C.CRIMSON_SCAR_BLEED_DAMAGE_MIN}–${C.CRIMSON_SCAR_BLEED_DAMAGE_MAX} / ${C.CRIMSON_SCAR_BLEED_INTERVAL_MS}ms for ${C.CRIMSON_SCAR_BLEED_DURATION_MS / 1000}s`]);
        chips.push(['Mark Duration', `${C.CRIMSON_SCAR_MARK_DURATION_MS / 1000}s`]);
        chips.push(['Mark Bonus', `+${Math.round(C.CRIMSON_SCAR_MARK_DAMAGE_BONUS * 100)}% dmg to marked`]);
        chips.push(['Speed Bonus', `+${Math.round(C.CRIMSON_SCAR_SPEED_BONUS * 100)}%`]);
        chips.push(['Dmg Penalty', `+${Math.round(C.CRIMSON_SCAR_DAMAGE_TAKEN_PENALTY * 100)}% taken`]);
    }

    if (type === 'egopinks') {
        chips.push(makeChip('ALEPH'));
        chips.push(['Piercing', 'Passes through all targets']);
        chips.push(['Tracer', 'Fixed hot-pink (not team color)']);
    }

    if (type === 'egosoda') {
        chips.push(makeChip('ZAYIN'));
        chips.push(['Red', `Heals ${C.EGOSODA_RED_HEAL_MIN}–${C.EGOSODA_RED_HEAL_MAX} HP on hit`]);
        chips.push(['Blue', `HoT ${C.EGOSODA_BLUE_HEAL_MIN}–${C.EGOSODA_BLUE_HEAL_MAX} HP / ${C.EGOSODA_BLUE_HEAL_INTERVAL_MS / 1000}s for ${C.EGOSODA_BLUE_HEAL_DURATION_MS / 1000}s`]);
        chips.push(['Purple (10%)', `+${C.EGOSODA_PURPLE_DAMAGE_MIN}–${C.EGOSODA_PURPLE_DAMAGE_MAX} + 0.5–1% maxHP dmg`]);
    }

    if (type === 'laetitia') {
        chips.push(makeChip('HE'));
        chips.push(['Mark Duration', `${C.LAETITIA_MARK_DURATION_MS / 1000}s`]);
        chips.push(['Vulnerability', `x${C.LAETITIA_MARK_VULN_MULTIPLIER}`]);
        chips.push(['Blast Trigger', `≥${Math.round(C.LAETITIA_MARK_TRIGGER_THRESHOLD_RATIO * 100)}% max HP hit`]);
        chips.push(['Blast Radius', `${C.LAETITIA_BLAST_RADIUS}px`]);
        chips.push(['Blast Damage', `${Math.round(C.LAETITIA_BLAST_DAMAGE_MIN_RATIO * 100)}–${Math.round(C.LAETITIA_BLAST_DAMAGE_MAX_RATIO * 100)}% max HP`]);
    }

    if (type === 'adoration') {
        chips.push(makeChip('ALEPH'));
        chips.push(['Pierce', `${C.ADORATION_PIERCE_COUNT} enemies`]);
        chips.push(['Slow on Hit', `${Math.round((1 - C.ADORATION_SLOW_MULTIPLIER) * 100)}% for ${C.ADORATION_SLOW_DURATION_MS / 1000}s`]);
        chips.push(['Afterburn on Slowed', `x${C.ADORATION_AFTERBURN_MULTIPLIER} multiplier`]);
        chips.push(['Damage vs Slow', 'Scales with target slow (any source)']);
        chips.push(['Wielder Speed', `-${Math.round((1 - C.ADORATION_WIELDER_SPEED_MULTIPLIER) * 100)}% move speed`]);
    }

    if (type === 'faintaroma') {
        chips.push(makeChip('WAW'));
        chips.push(['Pierce', `${C.FAINT_AROMA_PIERCE_COUNT} enemies`]);
        chips.push(['DOT', `${C.FAINT_AROMA_DOT_DAMAGE_MIN}–${C.FAINT_AROMA_DOT_DAMAGE_MAX} / ${C.FAINT_AROMA_DOT_INTERVAL_MS}ms`]);
        chips.push(['Heal Reduction', `-${C.FAINT_AROMA_HEAL_REDUCTION * 100}%`]);
        chips.push(['AOE Radius', `${C.FAINT_AROMA_AOE_RADIUS}px`]);
    }

    if (type === 'rocketlauncher') {
        chips.push(['Self-Damage', 'Yes (splash falloff)']);
    }

    if (type === 'nearmissed') {
        chips.push(['Damage Penalty', `-${Math.round((1 - (C.NEAR_MISSED_DAMAGE / C.ROCKET_LAUNCHER_DIRECT_DAMAGE)) * 100)}% vs Rocket Launcher`]);
        chips.push(['Projectile Type', 'Rocket Launcher (variant)']);
        chips.push(['Projectile Speed', `${(C.NEAR_MISSED_SPEED / C.ROCKET_LAUNCHER_SPEED * 100).toFixed(0)}% of Rocket Launcher`]);
        chips.push(['Splash Radius', `+${Math.round(((C.NEAR_MISSED_SPLASH_RADIUS / C.ROCKET_LAUNCHER_SPLASH_RADIUS) - 1) * 100)}% vs Rocket Launcher`]);
        chips.push(['Bonus vs Slow', `x${C.NEAR_MISSED_VS_SLOWER_MULTIPLIER}`]);
    }

    if (type === 'egomagicbullet') {
        chips.push(['Pierce Count', 'Infinite']);
        chips.push(['Homing', `Slight (${C.EGO_MAGIC_BULLET_HOMING_RANGE}px range)`]);
        chips.push(['Afterburn/Tick', `${C.EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MIN} - ${C.EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MAX}`]);
        chips.push(['Afterburn Duration', toMsText(C.EGO_MAGIC_BULLET_AFTERBURN_DURATION_MS)]);
        chips.push(['Cursed Shot', `Every ${C.EGO_MAGIC_BULLET_CURSE_CYCLE}th shot self-hits`]);
        chips.push(['Self-Hit Damage', `${Math.round(C.EGO_MAGIC_BULLET_SELF_HIT_MULTIPLIER * 100)}% of shot damage`]);
        chips.push(makeChip('WAW'));
    }

    if (type === 'egoloneliness') {
        chips.push(['Damage Penalty', `-${Math.round((1 - (C.EGO_LONELINESS_DAMAGE / C.REVOLVER_DAMAGE)) * 100)}% vs Revolver`]);
        chips.push(['Projectile Type', 'Normal Revolver bullet']);
        chips.push(['Tracer Style', 'Grey huntsman-style trail']);
        chips.push(['Slow on Hit', `${Math.round((1 - C.EGO_LONELINESS_SLOW_MULTIPLIER) * 100)}% for ${toMsText(C.EGO_LONELINESS_SLOW_DURATION_MS)}`]);
        chips.push(['Ammo Refund', `${Math.round(C.EGO_LONELINESS_AMMO_REFUND_CHANCE * 100)}% chance to refund 1 ammo`]);
        chips.push(makeChip('TETH'));
    }

    if (type === 'penitence') {
        chips.push(['Weapon Type', 'True Melee']);
        chips.push(['Swing Arc', `${C.PENITENCE_SWING_ARC_DEGREES} deg`]);
        chips.push(['Melee Range', `${C.PENITENCE_MELEE_RANGE}px`]);
        chips.push(['Equip Max HP', `+${Math.round(C.PENITENCE_MAX_HP_BONUS_RATIO * 100)}%`]);
        chips.push(['Pickup Heal', `${Math.round(C.PENITENCE_PICKUP_HEAL_RATIO * 100)}% max HP`]);
        chips.push(['Ally Heal', `${Math.round(C.PENITENCE_ALLY_HEAL_FROM_DAMAGE * 100)}% of swing damage`]);
        chips.push(['Speed Bonus', `+${Math.round(C.PENITENCE_SPEED_BONUS_RATIO * 100)}%`]);
        chips.push(['Knockback Resist', `${Math.round(C.PENITENCE_KNOCKBACK_RESISTANCE * 100)}%`]);
        chips.push(makeChip('ZAYIN'));
    }

    if (type === 'paradiselost') {
        chips.push(['Damage Bonus', `${(C.PARADISE_LOST_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(1)}%-${(C.PARADISE_LOST_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(1)}% max HP`]);
        chips.push(['Homing', `Slight (${C.PARADISE_LOST_HOMING_RANGE}px range)`]);
        chips.push(['Lifesteal', `${Math.round(C.PARADISE_LOST_LIFESTEAL_RATIO * 100)}% of damage dealt`]);
        chips.push(['Ally Heal', `${Math.round(C.PARADISE_LOST_ALLY_HEAL_RATIO * 100)}% within ${C.PARADISE_LOST_ALLY_HEAL_RADIUS}px`]);
        chips.push(['Adaptive Resist', `${Math.round(C.PARADISE_LOST_ADAPTIVE_RESISTANCE * 100)}% every ${toMsText(C.PARADISE_LOST_ADAPTIVE_INTERVAL_MS)}`]);
        chips.push(['Self HP Drain', `${(C.PARADISE_LOST_SELF_DOT_MIN_RATIO * 100).toFixed(1)}%-${(C.PARADISE_LOST_SELF_DOT_MAX_RATIO * 100).toFixed(1)}% per ${toMsText(C.PARADISE_LOST_SELF_DOT_INTERVAL_MS)}`]);
        chips.push(['CC Resist', 'Move-slow immunity while equipped']);
        chips.push(makeChip('ALEPH'));
    }

    if (type === 'harmony') {
        chips.push(['Pellets', `${C.HARMONY_PELLETS_PER_SHOT}`]);
        chips.push(['Damage / Pellet', `${C.HARMONY_DAMAGE_MIN}-${C.HARMONY_DAMAGE_MAX}`]);
        chips.push(['Self HP Cost', `${Math.round(C.HARMONY_SELF_HP_COST_RATIO * 100)}% max HP / shot (stops at 1 HP)`]);
        chips.push(['Damage Bonus', 'x2 only when HP is spent']);
        chips.push(['Haste Bonus', `Up to ${Math.round(C.HARMONY_HASTE_MAX_BONUS * 100)}% on hit`]);
        chips.push(['Haste Duration', toMsText(C.HARMONY_HASTE_DURATION_MS)]);
        chips.push(makeChip('HE'));
    }

    if (type === 'hornet') {
        chips.push(['Range Switch', `<= ${C.HORNET_RANGE_SWITCH_DISTANCE}px uses shotgun`]);
        chips.push(['Shotgun Ammo', `${C.HORNET_SHOTGUN_AMMO}`]);
        chips.push(['Shotgun Pellets', `${C.HORNET_SHOTGUN_PELLETS_PER_SHOT}`]);
        chips.push(['Shotgun Damage', `${C.HORNET_SHOTGUN_DAMAGE_MIN}-${C.HORNET_SHOTGUN_DAMAGE_MAX}`]);
        chips.push(['Rifle Ammo', `${C.HORNET_RIFLE_AMMO}`]);
        chips.push(['Rifle Damage', `${C.HORNET_RIFLE_DAMAGE_MIN}-${C.HORNET_RIFLE_DAMAGE_MAX}`]);
        chips.push(['Rifle Fire Interval', `${C.HORNET_FIRE_RATE} ms`]);
        chips.push(['Reload', toMsText(C.HORNET_RELOAD_MS)]);
        chips.push(['Afterburn', `${C.HORNET_RIFLE_AFTERBURN_DAMAGE_MIN}-${C.HORNET_RIFLE_AFTERBURN_DAMAGE_MAX} / ${toMsText(C.HORNET_RIFLE_AFTERBURN_INTERVAL_MS)}`]);
        chips.push(['Afterburn Duration', toMsText(C.HORNET_RIFLE_AFTERBURN_DURATION_MS)]);
        chips.push(['Bee Damage', `${C.HORNET_BEE_DAMAGE_MIN}-${C.HORNET_BEE_DAMAGE_MAX}`]);
        chips.push(['Max Bees', `${C.HORNET_BEE_MAX_ACTIVE} per wielder`]);
        chips.push(makeChip('WAW'));
    }

    if (type === 'egolovehate') {
        chips.push(['Pierce', 'Infinite — passes through all targets']);
        chips.push(['Damage Type', 'Random per shot (25% each)']);
        chips.push(['Red Damage', `${C.EGO_LOVE_HATE_RED_DAMAGE_MIN}-${C.EGO_LOVE_HATE_RED_DAMAGE_MAX} (slashing)`]);
        chips.push(['Black Damage', `${C.EGO_LOVE_HATE_BLACK_DAMAGE_MIN}-${C.EGO_LOVE_HATE_BLACK_DAMAGE_MAX} + burn (blunt)`]);
        chips.push(['Black Burn/Tick', `${C.EGO_LOVE_HATE_BLACK_BURN_MIN}-${C.EGO_LOVE_HATE_BLACK_BURN_MAX}`]);
        chips.push(['Black Burn Duration', `${(C.EGO_LOVE_HATE_BLACK_BURN_DURATION_MS / 1000).toFixed(1)}s every ${(C.EGO_LOVE_HATE_BLACK_BURN_INTERVAL_MS / 1000).toFixed(1)}s`]);
        chips.push(['White Damage', `${C.EGO_LOVE_HATE_WHITE_DAMAGE_MIN}-${C.EGO_LOVE_HATE_WHITE_DAMAGE_MAX} + burn (divine)`]);
        chips.push(['White Burn/Tick', `${C.EGO_LOVE_HATE_WHITE_BURN_MIN}-${C.EGO_LOVE_HATE_WHITE_BURN_MAX}`]);
        chips.push(['White Burn Duration', `${(C.EGO_LOVE_HATE_WHITE_BURN_DURATION_MS / 1000).toFixed(1)}s every ${(C.EGO_LOVE_HATE_WHITE_BURN_INTERVAL_MS / 1000).toFixed(1)}s`]);
        chips.push(['Pale Damage', `${(C.EGO_LOVE_HATE_PALE_MIN_RATIO * 100).toFixed(0)}%-${(C.EGO_LOVE_HATE_PALE_MAX_RATIO * 100).toFixed(0)}% target max HP (spiritual)`]);
        chips.push(['Ally Hit', 'Heals for 50% of equivalent damage']);
        chips.push(makeChip('WAW'));
    }

    if (type === 'soundofstar') {
        chips.push(['Charge Speed', `1 star per ${C.SOUND_OF_STAR_CHARGE_MS}ms`]);
        chips.push(['Charge Lock', `${C.SOUND_OF_STAR_MAX_AMMO}/${C.SOUND_OF_STAR_MAX_AMMO} required to fire`]);
        chips.push(['Burst Fire', `1 star per 100ms → recharge from 0`]);
        chips.push(['Aim', 'Toward cursor / nearest enemy']);
        chips.push(['Shot Damage', `${C.SOUND_OF_STAR_DAMAGE_MIN}–${C.SOUND_OF_STAR_DAMAGE_MAX}`]);
        chips.push(['Orbital Contact', `${Math.round(C.SOUND_OF_STAR_DAMAGE_MIN * C.SOUND_OF_STAR_ORBITAL_CONTACT_MULTIPLIER)}–${Math.round(C.SOUND_OF_STAR_DAMAGE_MAX * C.SOUND_OF_STAR_ORBITAL_CONTACT_MULTIPLIER)} (${C.SOUND_OF_STAR_ORBITAL_CONTACT_MULTIPLIER * 100}% shot dmg, 0.5s cd)`]);
        chips.push(['Burn / Tick', `${C.SOUND_OF_STAR_BURN_DAMAGE_MIN}–${C.SOUND_OF_STAR_BURN_DAMAGE_MAX} every ${(C.SOUND_OF_STAR_BURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(C.SOUND_OF_STAR_BURN_DURATION_MS / 1000).toFixed(1)}s`]);
        chips.push(['Wielder Slow', `${C.SOUND_OF_STAR_WIELDER_SLOW_PER_STAR * 100}% per star held (max ${C.SOUND_OF_STAR_MAX_AMMO * C.SOUND_OF_STAR_WIELDER_SLOW_PER_STAR * 100}%)`]);
        chips.push(['Homing', 'Slight — spiraling wobble path']);
        chips.push(makeChip('ALEPH'));
    }

    if (type === 'swordsharpened') {
        chips.push(['Throw Type', 'Melee projectile']);
        chips.push(['Base Damage', `${C.SWORD_SHARPENED_DAMAGE_MIN}-${C.SWORD_SHARPENED_DAMAGE_MAX}`]);
        chips.push(['Pierce Damage', `${(C.SWORD_SHARPENED_PIERCE_DAMAGE_HP_RATIO * 100).toFixed(0)}% max HP`]);
        chips.push(['Pierce Stick Duration', toMsText(C.SWORD_SHARPENED_PIERCE_STICK_DURATION_MS)]);
        chips.push(['Blessing Shield Target', `Nearby ally (${C.SWORD_SHARPENED_BLESSING_SHIELD_RADIUS}px radius)`]);
        chips.push(['Blessing Damage Reduction', `${Math.round(C.SWORD_SHARPENED_BLESSING_SHIELD_DAMAGE_BLOCK * 100)}%`]);
        chips.push(['Blessing Duration', toMsText(C.SWORD_SHARPENED_BLESSING_SHIELD_DURATION_MS)]);
        chips.push(['Sharpening Stacks', `Max ${C.SWORD_SHARPENED_SHARPEN_MAX_STACKS}, duration ${toMsText(C.SWORD_SHARPENED_SHARPEN_DURATION_MS)}`]);
        chips.push(['Sharpen - Damage', `+${Math.round(C.SWORD_SHARPENED_SHARPEN_DAMAGE_BONUS * 100)}% per stack`]);
        chips.push(['Sharpen - Speed', `+${Math.round(C.SWORD_SHARPENED_SHARPEN_SPEED_BONUS * 100)}% per stack`]);
        chips.push(['Sharpen - Reload', `+${Math.round(C.SWORD_SHARPENED_SHARPEN_RELOAD_BONUS * 100)}% per stack`]);
        chips.push(['Resistance Ignore', `${Math.round(C.SWORD_SHARPENED_RESISTANCE_IGNORE * 100)}%`]);
        chips.push(['Fire Rate', toMsText(C.SWORD_SHARPENED_FIRE_RATE)]);
        chips.push(['Reload', toMsText(C.SWORD_SHARPENED_RELOAD_MS)]);
        chips.push(makeChip('WAW'));
    }

    if (type === 'solemnvow') {
        chips.push(['Black Pellets', `${C.SOLEMN_VOW_BLACK_PELLETS_PER_SHOT}`]);
        chips.push(['Black Damage', `${(C.SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(1)}%-${(C.SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(1)}% max HP / pellet`]);
        chips.push(['White Pellets', `${C.SOLEMN_VOW_WHITE_PELLETS_PER_SHOT}`]);
        chips.push(['White Afterburn', `${C.SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MIN}-${C.SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MAX} / ${toMsText(C.SOLEMN_VOW_WHITE_AFTERBURN_INTERVAL_MS)}`]);
        chips.push(['Afterburn Duration', toMsText(C.SOLEMN_VOW_WHITE_AFTERBURN_DURATION_MS)]);
        chips.push(['Funeral Trigger', `${C.SOLEMN_VOW_FUNERAL_PELLETS_REQUIRED} pellets or reload`]);
        chips.push(['Funeral Lockout', toMsText(C.SOLEMN_VOW_FUNERAL_SHOOT_LOCK_MS)]);
        chips.push(makeChip('HE'));
    }

    if (type === 'minigun') {
        chips.push(['Ramp Delay (reset)', toMsText(weapon.rampResetDelayMs)]);
        chips.push(['Min Fire Rate', `${weapon.currentFireRate}ms (ramped)`]);
    }

    if (type === 'sniper') {
        chips.push(['Hit Type', 'Hitscan (instant)']);
        chips.push(['Crit Chance', 'None (random damage roll)']);
    }

    if (type === 'rocketjumper') {
        chips.push(['Melee Damage', `${C.ROCKET_JUMPER_MELEE_MIN_DAMAGE} - ${C.ROCKET_JUMPER_MELEE_MAX_DAMAGE}`]);
        chips.push(['Melee Cooldown', toMsText(C.ROCKET_JUMPER_MELEE_COOLDOWN_MS)]);
        chips.push(['Explosion Damage', '0 (mobility only)']);
    }

    return chips;
}

function buildUtilityChips(type, utility) {
    return [];
}

export { buildWeaponChips, buildUtilityChips };
