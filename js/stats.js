import * as C from './constants.js';
import { Weapon } from './weapon.js';

const tabButtons = {
    weapons: document.getElementById('tab-weapons'),
    utilities: document.getElementById('tab-utilities')
};

const listEl = document.getElementById('stats-list');
const detailTitleEl = document.getElementById('detail-title');
const detailSubtitleEl = document.getElementById('detail-subtitle');
const chipsEl = document.getElementById('detail-chips');
const notesEl = document.getElementById('detail-notes');
const detailImgWrapEl = document.getElementById('detail-img-wrap');
const detailImgEl = document.getElementById('detail-img');
const dealerTableWrapEl = document.getElementById('dealer-table-wrap');
const dealerTableBodyEl = document.getElementById('dealer-table-body');

const weaponTypes = C.START_WEAPON_OPTIONS;
const utilityTypes = C.DROP_UTILITY_TYPES;

const riskClassColors = {
    ZAYIN: '#19e04b',
    TETH: '#3ca3f7',
    HE: '#f8eb3a',
    WAW: '#8317f7',
    ALEPH: '#f03333'
};

const utilityStats = {
    ammoico: {
        title: 'Ammo Crate',
        subtitle: 'Utility Drop',
        chips: [
            ['Effect', 'Refill active weapon ammo'],
            ['Scope', 'Current weapon only']
        ],
        notes: ['Fully restores ammo for finite-ammo weapons.']
    },
    healthico: {
        title: 'Health Pack',
        subtitle: 'Utility Drop',
        chips: [
            ['Heal', `${C.HEALTHICO_HEAL} HP`],
            ['Type', 'Instant']
        ],
        notes: ['Heals on pickup, up to max HP.']
    },
    ubercharge: {
        title: 'Ubercharge Canteen',
        subtitle: 'Utility Drop',
        chips: [
            ['Duration', `${(C.UBERCHARGE_DURATION_MS / 1000).toFixed(1)}s`],
            ['Heal/sec', `${C.UBERCHARGE_HEAL_PER_SEC}`]
        ],
        notes: ['Grants invulnerability and healing over time while active.']
    },
    critical: {
        title: 'Critical Canteen',
        subtitle: 'Utility Drop',
        chips: [
            ['Duration', `${(C.CRITICAL_DURATION_MS / 1000).toFixed(1)}s`],
            ['Damage x', `${C.CRITICAL_DAMAGE_MULTIPLIER}`],
            ['Heal/sec', `${C.CRITICAL_HEAL_PER_SEC}`]
        ],
        notes: ['Boosts outgoing damage and grants light regen.']
    },
    speed: {
        title: 'Speed Boost',
        subtitle: 'Utility Drop',
        chips: [
            ['Max Speed +', `${C.SPEED_BOOST_PERMANENT}`],
            ['Min Speed +', `${(C.SPEED_BOOST_PERMANENT * 0.2).toFixed(2)}`]
        ],
        notes: ['Permanent movement boost for the ball that picks it up.']
    },
    explosiveflask: {
        title: 'Explosive Flask',
        subtitle: 'Utility Drop (Consumable)',
        chips: [
            ['Splash Radius', `${C.EXPLOSIVE_FLASK_SPLASH_RADIUS}`],
            ['Debuff Duration', `${(C.EXPLOSIVE_FLASK_EFFECT_DURATION_MS / 1000).toFixed(1)}s`],
            ['Slow', `x${C.EXPLOSIVE_FLASK_SLOW_MULTIPLIER.toFixed(2)} move speed`],
            ['Vulnerability', `x${C.EXPLOSIVE_FLASK_PICKUP_DAMAGE_MULTIPLIER.toFixed(2)} explosive damage received`]
        ],
        notes: [
            'Auto-thrown at the nearest enemy when picked up.',
            'Marked enemies take increased explosive damage from all sources while debuffed.'
        ]
    },
    scrumpybottle: {
        title: 'Scrumpy Bottle',
        subtitle: 'Utility Drop (Consumable)',
        chips: [
            ['Throw Damage', `${C.SCRUMPY_BOTTLE_THROW_DAMAGE_MIN} - ${C.SCRUMPY_BOTTLE_THROW_DAMAGE_MAX}`],
            ['Puddle Damage/Tick', `${C.SCRUMPY_PUDDLE_DAMAGE_MIN} - ${C.SCRUMPY_PUDDLE_DAMAGE_MAX}`],
            ['Puddle Duration', `${(C.SCRUMPY_PUDDLE_DURATION_MS / 1000).toFixed(1)}s`],
            ['Resistance', `${Math.round(C.SCRUMPY_DAMAGE_REDUCTION * 100)}% reduced incoming damage`]
        ],
        notes: [
            'Auto-thrown at the nearest enemy when picked up.',
            'Spills an expanding damage puddle that lasts the full duration.'
        ]
    },
    bombanomicron: {
        title: 'Bombanomicron',
        subtitle: 'Utility Drop (Consumable)',
        chips: [
            ['Projectile Count', `${C.BOMBANOMICRON_PROJECTILE_MIN} - ${C.BOMBANOMICRON_PROJECTILE_MAX}`],
            ['Payload Mix', 'Scrumpy, grenades, rockets'],
            ['Targeting', 'Enemy cluster area'],
            ['Damage Type', 'Explosive']
        ],
        notes: [
            'Throws a random explosive barrage into the enemy zone.',
            'Each cast uses mixed projectile types from multiple weapons.'
        ]
    },
    deadringer: {
        title: 'Dead Ringer',
        subtitle: 'Utility Drop (Special Consumable)',
        chips: [
            ['Cooldown', `${(C.DEAD_RINGER_PICKUP_COOLDOWN_MS / 1000).toFixed(0)}s`],
            ['Duration', `${(C.DEAD_RINGER_DURATION_MS / 1000).toFixed(1)}s`],
            ['Damage Reduction', `${Math.round(C.DEAD_RINGER_DAMAGE_REDUCTION * 100)}%`],
            ['Heal On Trigger', `${Math.round(C.DEAD_RINGER_HEAL_MAX_HP_RATIO * 100)}% max HP`]
        ],
        notes: [
            'Arms one charge per ball and shows icon above the ball.',
            'On trigger: damage cut, heal burst, speed boost, untargetable invis, and decoy fly-out.'
        ]
    }
};

const specialNotes = {
    pistol: [
        'True pistol variant: high fire rate, lower per-shot damage.',
        'Designed for sustained close-mid pressure.'
    ],
    revolver: [
        'Legacy pistol behavior renamed to Revolver.',
        'Higher damage, slower fire cadence.'
    ],
    shotgun: [
        `Hitscan pellets with falloff from ${C.SHOTGUN_DAMAGE_MAX} to ${C.SHOTGUN_DAMAGE_MIN}.`,
        `Range cap around ${C.SHOTGUN_HITSCAN_RANGE}px with short tracers.`
    ],
    familybusiness: [
        `Shotgun variant with ${Math.round((1 - (C.FAMILY_BUSINESS_FIRE_RATE / new Weapon('shotgun').fireRate)) * 100)}% faster fire interval than Shotgun.`,
        `Carries ${C.FAMILY_BUSINESS_AMMO} shells (~${Math.round(((C.FAMILY_BUSINESS_AMMO / new Weapon('shotgun').maxAmmo) - 1) * 100)}% more ammo than Shotgun).`,
        `Damage range reduced to ${C.FAMILY_BUSINESS_DAMAGE_MIN}-${C.FAMILY_BUSINESS_DAMAGE_MAX} (${Math.round((1 - (C.FAMILY_BUSINESS_DAMAGE_MAX / C.SHOTGUN_DAMAGE_MAX)) * 100)}% lower vs Shotgun).`
    ],
    widowmaker: [
        `Consumes ${C.WIDOWMAKER_AMMO_PER_SHOT} ammo per shot and fires ${C.WIDOWMAKER_PELLETS_PER_SHOT} pellets.`,
        `Pellet damage range: ${C.WIDOWMAKER_DAMAGE_MIN}-${C.WIDOWMAKER_DAMAGE_MAX} (shotgun-style falloff).`,
        `Refunds ammo equal to damage dealt; reloads for ${(C.WIDOWMAKER_LOW_AMMO_RELOAD_MS / 1000).toFixed(1)}s when below ${C.WIDOWMAKER_AMMO_PER_SHOT} ammo.`
    ],
    sodapopper: [
        `Fast shotgun variant with ${C.SODA_POPPER_AMMO}-shell chamber and ${(C.SODA_POPPER_RELOAD_MS / 1000).toFixed(1)}s reload.`,
        `Pellet damage range: ${C.SODA_POPPER_DAMAGE_MIN}-${C.SODA_POPPER_DAMAGE_MAX} (shotgun-style falloff).`,
        `Hype meter: deal ${C.SODA_POPPER_CHARGE_DAMAGE_REQUIRED} damage to gain x${C.SODA_POPPER_HYPE_DAMAGE_MULTIPLIER.toFixed(2)} damage and speed boost for ${(C.SODA_POPPER_HYPE_DURATION_MS / 1000).toFixed(1)}s.`
    ],
    forceanature: [
        `Double-barrel shotgun variant with ${C.FORCE_A_NATURE_AMMO}-shell chamber and ${(C.FORCE_A_NATURE_RELOAD_MS / 1000).toFixed(1)}s reload.`,
        `Pellet damage range: ${C.FORCE_A_NATURE_DAMAGE_MIN}-${C.FORCE_A_NATURE_DAMAGE_MAX} (shotgun-style falloff, higher max damage).`,
        `Slower unload at ${C.FORCE_A_NATURE_FIRE_RATE}ms between shots compared to Soda Popper's ${C.SODA_POPPER_FIRE_RATE}ms.`,
        `Applies self-recoil (${C.FORCE_A_NATURE_SELF_KNOCKBACK}) and enemy knockback (${C.FORCE_A_NATURE_ENEMY_KNOCKBACK}) on hit.`,
        'No Hype meter: pure burst + knockback utility.'
    ],
    musket: [
        `Smoothbore musket with ${C.MUSKET_AMMO} shot and ${(C.MUSKET_RELOAD_MS / 1000).toFixed(1)}s reload.`,
        `Shot damage roll: ${C.MUSKET_DAMAGE_MIN}-${C.MUSKET_DAMAGE_MAX}.`,
        `Very inaccurate spread (${C.MUSKET_SPREAD_ANGLE}) to match smoothbore behavior.`,
        `Bayonet stab: ${C.MUSKET_BAYONET_DAMAGE_MIN}-${C.MUSKET_BAYONET_DAMAGE_MAX} plus bleed ${C.MUSKET_BAYONET_BLEED_DAMAGE_MIN}-${C.MUSKET_BAYONET_BLEED_DAMAGE_MAX} per ${(C.MUSKET_BAYONET_BLEED_INTERVAL_MS / 1000).toFixed(1)}s for ${(C.MUSKET_BAYONET_BLEED_DURATION_MS / 1000).toFixed(1)}s.`,
        `Bleeding targets receive only ${Math.round(C.MUSKET_BAYONET_HEAL_MULTIPLIER * 100)}% healing during bleed duration.`
    ],
    magicianhat: [
        `Launches bunny projectiles at speed ${C.MAGICIAN_HAT_SPEED} with ${C.MAGICIAN_HAT_DAMAGE_MIN}-${C.MAGICIAN_HAT_DAMAGE_MAX} damage rolls.`,
        `Bunny projectile has slight homing toward nearby enemies (range ${C.MAGICIAN_HAT_HOMING_RANGE}px, strength ${C.MAGICIAN_HAT_HOMING_STRENGTH}).`,
        `Single-shot cadence: ${C.MAGICIAN_HAT_AMMO} ammo with ${(C.MAGICIAN_HAT_RELOAD_MS / 1000).toFixed(1)}s reload.`,
        `Every attack teleports the wielder by ~${C.MAGICIAN_HAT_TELEPORT_DISTANCE}px with smoke vanish/reappear effects.`
    ],
    sniper: [
        'High-damage rifle that fires slow projectile bullets.',
        `Damage roll per shot: ${C.SNIPER_DAMAGE_MIN}-${C.SNIPER_DAMAGE_MAX}.`,
        'Projectile travels at moderate speed; longer reload time for precision.'
    ],
    machina: [
        'Piercing rounds with long team-colored tracer rays.',
        `Damage roll per shot: ${C.MACHINA_DAMAGE_MIN}-${C.MACHINA_DAMAGE_MAX}.`,
        'Can pass through multiple targets; ignores early shots on same ball.'
    ],
    huntsman: [
        `Arrow projectile with slight wobble and stick duration ${(C.HUNTSMAN_STICK_DURATION_MS / 1000).toFixed(1)}s.`,
        `Damage roll per shot: ${C.HUNTSMAN_DAMAGE_MIN}-${C.HUNTSMAN_DAMAGE_MAX}.`
    ],
    crusaderscrossbow: [
        `Bolt projectile with huntsman-style trail visuals.`,
        `Enemy hit damage: ${C.CRUSADERS_CROSSBOW_DAMAGE_MIN}-${C.CRUSADERS_CROSSBOW_DAMAGE_MAX}.`,
        `Ally hit heal: ${C.CRUSADERS_CROSSBOW_HEAL_MIN}-${C.CRUSADERS_CROSSBOW_HEAL_MAX} (falloff by distance).`,
        'Automatically switches between ally-heal and enemy-damage modes based on targeting.'
    ],
    blutsauger: [
        'Balanced SMG that fires projectile bullets with lifesteal on hits.',
        `Damage per shot: ${C.BLUTSAUGER_DAMAGE}.`,
        `Lifesteal per hit: ${C.BLUTSAUGER_HEAL_MIN}-${C.BLUTSAUGER_HEAL_MAX}.`,
        'Lifesteal works against enemy-aligned targets only.'
    ],
    piplauncher: [
        `Explosive launcher with team-colored projectile trail and splash falloff by distance.`,
        `Automatically throws an Explosive Flask every ${(C.EXPLOSIVE_FLASK_COOLDOWN_MS / 1000).toFixed(1)}s while firing.`,
        `Pip flask debuff: slows enemies to x${C.EXPLOSIVE_FLASK_SLOW_MULTIPLIER.toFixed(2)} and increases pip damage taken by x${C.EXPLOSIVE_FLASK_PIP_DAMAGE_MULTIPLIER.toFixed(2)} for ${(C.EXPLOSIVE_FLASK_EFFECT_DURATION_MS / 1000).toFixed(1)}s.`,
        `Nearby allies receive splash healing: ${C.PIP_LAUNCHER_ALLY_HEAL_MIN}-${C.PIP_LAUNCHER_ALLY_HEAL_MAX} (falloff scaled).`
    ],
    beggersbazooka: [
        `Rapid ${C.BEGGERS_BAZOOKA_AMMO}-rocket burst with accuracy spread.`,
        `Fires ${C.BEGGERS_BAZOOKA_AMMO} rockets per activation with ${C.BEGGERS_BAZOOKA_DEVIATION.toFixed(2)} rad deviation.`,
        `Rocket damage: ${C.BEGGERS_BAZOOKA_DAMAGE} (-20% vs standard).`,
        `Rocket speed: x${(C.BEGGERS_BAZOOKA_SPEED / C.ROCKET_LAUNCHER_SPEED).toFixed(2)} vs standard.`,
        `Splash radius: x${(C.BEGGERS_BAZOOKA_SPLASH_RADIUS / C.ROCKET_LAUNCHER_SPLASH_RADIUS).toFixed(2)} vs standard.`,
        'Can self-damage from own splash if standing in area.'
    ],
    flamethrower: [
        'Spray-fire weapon with particle spread and afterburn DoT.',
        `Particles per shot: ${C.FLAMETHROWER_PARTICLES_PER_SHOT} (spread-based accuracy).`,
        `Fire damage per particle: ${C.FLAMETHROWER_DAMAGE_MIN}-${C.FLAMETHROWER_DAMAGE_MAX}.`,
        `Afterburn damage: ${C.FLAMETHROWER_AFTERBURN_DAMAGE_MIN}-${C.FLAMETHROWER_AFTERBURN_DAMAGE_MAX} per tick.`,
        `Afterburn interval: ${(C.FLAMETHROWER_AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s, duration ${(C.FLAMETHROWER_AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Airblast deflect: costs ${C.PYRO_AIRBLAST_AMMO_COST} ammo every ${(C.PYRO_AIRBLAST_COOLDOWN_MS / 1000).toFixed(1)}s (reflects projectiles).`
    ],
    directhit: [
        'Rocket variant: faster projectile, tighter splash radius, bonus vs faster targets.',
        `Speed boost: x${(C.DIRECT_HIT_SPEED / C.ROCKET_LAUNCHER_SPEED).toFixed(2)} vs standard rocket.`,
        `Splash radius penalty: x${(C.DIRECT_HIT_SPLASH_RADIUS / C.ROCKET_LAUNCHER_SPLASH_RADIUS).toFixed(2)} vs standard rocket.`,
        `Bonus vs faster target: x${C.DIRECT_HIT_VS_FASTER_MULTIPLIER} damage if target is faster than shooter.`
    ],
    nearmissed: [
        'Rocket Launcher variant that uses standard rocket projectile behavior, but tuned for anti-slow targets.',
        `Damage penalty: ${Math.round((1 - (C.NEAR_MISSED_DAMAGE / C.ROCKET_LAUNCHER_DIRECT_DAMAGE)) * 100)}% lower than Rocket Launcher (${C.NEAR_MISSED_DAMAGE} vs ${C.ROCKET_LAUNCHER_DIRECT_DAMAGE}).`,
        `Projectile speed: x${(C.NEAR_MISSED_SPEED / C.ROCKET_LAUNCHER_SPEED).toFixed(2)} of Rocket Launcher (${Math.round((1 - (C.NEAR_MISSED_SPEED / C.ROCKET_LAUNCHER_SPEED)) * 100)}% slower).`,
        `Splash radius: x${(C.NEAR_MISSED_SPLASH_RADIUS / C.ROCKET_LAUNCHER_SPLASH_RADIUS).toFixed(2)} of Rocket Launcher (+${Math.round(((C.NEAR_MISSED_SPLASH_RADIUS / C.ROCKET_LAUNCHER_SPLASH_RADIUS) - 1) * 100)}%).`,
        `Bonus vs slower target: x${C.NEAR_MISSED_VS_SLOWER_MULTIPLIER} direct damage when target is slower than shooter.`
    ],
    rocketjumper: [
        'Mobility blast rifle: zero splash damage, pure knockback and close-range melee.',
        `Self impulse from blast: ${C.ROCKET_JUMPER_SELF_BLAST_IMPULSE} (away from impact).`,
        `Melee damage scales with current speed: ${C.ROCKET_JUMPER_MELEE_MIN_DAMAGE}-${C.ROCKET_JUMPER_MELEE_MAX_DAMAGE}.`,
        `Melee attack cooldown: ${(C.ROCKET_JUMPER_MELEE_COOLDOWN_MS / 1000).toFixed(2)}s (triggered on enemy contact).`,
        'Explosion deals zero damage; enemies are only hurt by direct melee contact attacks.'
    ],
    yellowtarge: [
        'Charge weapon: gains damage and knockback while sliding toward enemies.',
        `Base damage resistances: ${(C.YELLOW_TARGE_DAMAGE_REDUCTION_ALL * 100).toFixed(0)}% all sources, ${(C.YELLOW_TARGE_DAMAGE_REDUCTION_EXPLOSIVE * 100).toFixed(0)}% explosive.`,
        `Charge damage: scales with distance traveled during charge activation.`,
        `Charge trigger range: ${C.YELLOW_TARGE_CHARGE_TRIGGER_RANGE}px (auto targets nearest enemy).`,
        `Charge impulse: ${C.YELLOW_TARGE_CHARGE_IMPULSE} (propels toward target).`
    ],
    medigun: [
        'Beam attachment weapon: heals allies, damages + lifesteals from enemies.',
        `Ally overheal cap: ${Math.round(C.MEDIGUN_OVERHEAL_MULTIPLIER * 100)}% max HP (visual: lighter bar color).`,
        `Self HP regen when not healing: ${C.MEDIGUN_SELF_REGEN_PER_SEC}/sec (after ${(C.MEDIGUN_SELF_REGEN_DELAY_MS / 1000).toFixed(1)}s idle).`,
        `Regen cap: ${C.MEDIGUN_SELF_REGEN_CAP} HP.`,
        `Uber threshold: build from ${C.MEDIGUN_UBER_HEAL_THRESHOLD} healing OR ${C.MEDIGUN_UBER_DAMAGE_THRESHOLD} damage taken.`,
        `Uber invulnerability duration: ${(C.MEDIGUN_UBER_DURATION_MS / 1000).toFixed(1)}s (applies to holder and target).`
    ],
    shortcircuit: [
        'Deploys a moving electric field that damages enemies and cancels incoming projectiles.',
        `Field radius: ${C.SHORT_CIRCUIT_RADIUS}px, movement speed ${C.SHORT_CIRCUIT_SPEED}.`,
        `Duration: ${(C.SHORT_CIRCUIT_DURATION_MS / 1000).toFixed(1)}s on the map.`,
        `DoT damage: ${C.SHORT_CIRCUIT_DOT_DAMAGE} per ${(C.SHORT_CIRCUIT_DOT_INTERVAL_MS / 1000).toFixed(1)}s to enemies inside (once per interval per ball).`,
        'Projectiles inside are cancelled and removed (except bullets, medigun beams); incoming rockets/grenades cannot pass through.'
    ],
    rocketlauncher: [
        'Explosive launcher with knockback splash falloff.',
        `Direct hit damage: ${C.ROCKET_LAUNCHER_DIRECT_DAMAGE}.`,
        `Splash radius: ${C.ROCKET_LAUNCHER_SPLASH_RADIUS}px with falloff damage.`,
        'Knockback scales by explosion falloff distance.',
        'Splash is area-of-effect but can self-damage the shooter if standing in own explosion.'
    ],
    grenadelauncher: [
        'Arcing grenades that bounce and explode after delay or manual impact.',
        `Direct impact damage: ${C.GRENADE_LAUNCHER_DIRECT_DAMAGE}.`,
        `Splash radius: ${C.GRENADE_LAUNCHER_SPLASH_RADIUS}px with falloff.`,
        `Auto-detonation timer: ${(C.GRENADE_LAUNCHER_EXPLODE_DELAY_MS / 1000).toFixed(2)}s.`,
        'Bounces and loses momentum while traveling, then detonates on timer or impact.',
        'Can self-damage from own splash if standing in blast area.'
    ],
    smg: [
        'Rapid close-range bullet spray with low per-shot damage.',
        `Damage per shot: ${new Weapon('smg').damage}, fires projectile bullets in spread pattern.`,
        'High spread angle for spray mechanics; effective at short range.',
        'Best for sustained pressure and cleanup on weakened targets.'
    ],
    tommygun: [
        `SMG variant with ${Math.round(((new Weapon('tommygun').maxAmmo / new Weapon('smg').maxAmmo) - 1) * 100)}% more ammo and classic gangland spray style.`,
        `Damage per shot reduced by ${Math.round((1 - (new Weapon('tommygun').damage / new Weapon('smg').damage)) * 100)}% (${new Weapon('tommygun').damage} vs ${new Weapon('smg').damage}).`,
        `Fires faster at ${new Weapon('tommygun').fireRate}ms interval (vs ${new Weapon('smg').fireRate}ms), with speed ${new Weapon('tommygun').speed} and wider spread ${new Weapon('tommygun').spreadAngle}.`,
        `Reload is slower: ${toMsText(new Weapon('tommygun').reloadTimeMs)}.`
    ],
    egomagicbullet: [
        'Cursed magic weapon with infinite pierce, fast projectile speed, and slight homing.',
        `Damage per shot: ${C.EGO_MAGIC_BULLET_DAMAGE_MIN}-${C.EGO_MAGIC_BULLET_DAMAGE_MAX}.`,
        `Afterburn: ${C.EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MIN}-${C.EGO_MAGIC_BULLET_AFTERBURN_DAMAGE_MAX} per ${(C.EGO_MAGIC_BULLET_AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(C.EGO_MAGIC_BULLET_AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Every ${C.EGO_MAGIC_BULLET_CURSE_CYCLE}th shot always self-hits for ${Math.round(C.EGO_MAGIC_BULLET_SELF_HIT_MULTIPLIER * 100)}% shot damage, then applies the same afterburn.`,
        'The cursed shot spawns behind the wielder and pierces through anyone along its path.'
    ],
    egoloneliness: [
        'Revolver variant with a colder shot profile and light tracer feedback.',
        `Damage per shot: ${C.EGO_LONELINESS_DAMAGE} (${Math.round((1 - (C.EGO_LONELINESS_DAMAGE / C.REVOLVER_DAMAGE)) * 100)}% lower than Revolver).`,
        `Projectile speed: ${C.EGO_LONELINESS_SPEED} (slightly faster than the default Revolver shot).`,
        `On hit: applies ${Math.round((1 - C.EGO_LONELINESS_SLOW_MULTIPLIER) * 100)}% slow for ${(C.EGO_LONELINESS_SLOW_DURATION_MS / 1000).toFixed(1)}s.`,
        `Ammo refund: ${Math.round(C.EGO_LONELINESS_AMMO_REFUND_CHANCE * 100)}% chance to refund 1 ammo on hit.`,
        'Uses the normal revolver projectile sprite, with a huntsman-style grey trail.'
    ],
    penitence: [
        'True melee E.G.O weapon that swings in a wide frontal arc.',
        `Swing damage: ${C.PENITENCE_DAMAGE_MIN}-${C.PENITENCE_DAMAGE_MAX} in a ${C.PENITENCE_SWING_ARC_DEGREES} degree cone at close range.`,
        `Equip bonus: +${Math.round(C.PENITENCE_MAX_HP_BONUS_RATIO * 100)}% max HP and +${Math.round(C.PENITENCE_SPEED_BONUS_RATIO * 100)}% movement speed.`,
        `Pickup sustain: heals ${Math.round(C.PENITENCE_PICKUP_HEAL_RATIO * 100)}% max HP when equipped.`,
        `Team support: heals nearby allies for ${Math.round(C.PENITENCE_ALLY_HEAL_FROM_DAMAGE * 100)}% of swing damage dealt.`,
        `Defensive trait: ${Math.round(C.PENITENCE_KNOCKBACK_RESISTANCE * 100)}% knockback resistance while equipped.`
    ],
    paradiselost: [
        'ALEPH E.G.O weapon that fires a homing Apple projectile with anti-resistance damage profile.',
        `Damage per shot: ${C.PARADISE_LOST_DAMAGE_MIN}-${C.PARADISE_LOST_DAMAGE_MAX} plus ${(C.PARADISE_LOST_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(1)}%-${(C.PARADISE_LOST_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(1)}% of wielder max HP.`,
        `Homing: slight guidance (${C.PARADISE_LOST_HOMING_RANGE}px range, strength ${C.PARADISE_LOST_HOMING_STRENGTH}).`,
        `On hit lifesteal: restores ${Math.round(C.PARADISE_LOST_LIFESTEAL_RATIO * 100)}% of actual damage dealt to the wielder.`,
        `Nearby ally support: allies within ${C.PARADISE_LOST_ALLY_HEAL_RADIUS}px are healed for ${Math.round(C.PARADISE_LOST_ALLY_HEAL_RATIO * 100)}% of actual damage dealt.`,
        `Adaptive defense: learns incoming damage type and gains ${Math.round(C.PARADISE_LOST_ADAPTIVE_RESISTANCE * 100)}% resistance to it, refreshing every ${(C.PARADISE_LOST_ADAPTIVE_INTERVAL_MS / 1000).toFixed(1)}s.`,
        `Self-erosion: loses ${(C.PARADISE_LOST_SELF_DOT_MIN_RATIO * 100).toFixed(1)}%-${(C.PARADISE_LOST_SELF_DOT_MAX_RATIO * 100).toFixed(1)}% max HP every ${(C.PARADISE_LOST_SELF_DOT_INTERVAL_MS / 1000).toFixed(1)}s while equipped.`,
        'Ignores move-speed slows and suffers a reduced low-HP speed penalty while active.'
    ],
    harmony: [
        'HE E.G.O weapon Harmony: a 10-pellet burst that consumes life to amplify damage.',
        `Each shot fires ${C.HARMONY_PELLETS_PER_SHOT} pellets for ${C.HARMONY_DAMAGE_MIN}-${C.HARMONY_DAMAGE_MAX} damage per pellet, then doubles damage only if the user can spend health.`,
        `Firing costs up to ${(C.HARMONY_SELF_HP_COST_RATIO * 100).toFixed(0)}% max HP, but never drops the wielder below 1 HP; at 1 HP, it still fires without draining health.`,
        `Taking enemy damage boosts reload/attack speed by up to ${(C.HARMONY_HASTE_MAX_BONUS * 100).toFixed(0)}% for ${(C.HARMONY_HASTE_DURATION_MS / 1000).toFixed(1)}s.`,
        'Quote: “After all, art is a devil\'s gift, born from despair and suffering. Never stop performing until the body crumbles to dust.”'
    ],
    hornet: [
        'WAW E.G.O weapon Hornet: hybrid form that swaps between close shotgun and long-range rifle based on enemy distance.',
        `Close form (<= ${C.HORNET_RANGE_SWITCH_DISTANCE}px): ${C.HORNET_SHOTGUN_PELLETS_PER_SHOT} hitscan pellets for ${C.HORNET_SHOTGUN_DAMAGE_MIN}-${C.HORNET_SHOTGUN_DAMAGE_MAX} each, with ${C.HORNET_SHOTGUN_AMMO} ammo.`,
        `Far form: rifle shot for ${C.HORNET_RIFLE_DAMAGE_MIN}-${C.HORNET_RIFLE_DAMAGE_MAX} with ${C.HORNET_RIFLE_AMMO} ammo at ${C.HORNET_FIRE_RATE}ms interval; applies afterburn ${C.HORNET_RIFLE_AFTERBURN_DAMAGE_MIN}-${C.HORNET_RIFLE_AFTERBURN_DAMAGE_MAX} every ${(C.HORNET_RIFLE_AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(C.HORNET_RIFLE_AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Reactive bees: when hit by enemies, summons a homing bee (${C.HORNET_BEE_DAMAGE_MIN}-${C.HORNET_BEE_DAMAGE_MAX} sting) that applies the same afterburn; max ${C.HORNET_BEE_MAX_ACTIVE} bees active per wielder.`
    ],
    swordsharpened: [
        'WAW E.G.O weapon Sword Sharpened by Tears: throwable melee blade that pierces and sticks to enemies, growing stronger with each hit.',
        `Blessing Shield: grants ${(C.SWORD_SHARPENED_BLESSING_SHIELD_DAMAGE_BLOCK * 100).toFixed(0)}% damage reduction to nearby ally for ${(C.SWORD_SHARPENED_BLESSING_SHIELD_DURATION_MS / 1000).toFixed(1)}s or self if no ally in range.`,
        `Base damage: ${C.SWORD_SHARPENED_DAMAGE_MIN}-${C.SWORD_SHARPENED_DAMAGE_MAX}. On hit, the sword sticks for up to ${(C.SWORD_SHARPENED_PIERCE_STICK_DURATION_MS / 1000).toFixed(0)}s. If it misses, the wielder takes ${(C.SWORD_SHARPENED_PIERCE_DAMAGE_HP_RATIO * 100).toFixed(0)}% max HP self-damage.`,
        `Sharpening: each hit increases damage (+${(C.SWORD_SHARPENED_SHARPEN_DAMAGE_BONUS * 100).toFixed(0)}%), projectile speed (+${(C.SWORD_SHARPENED_SHARPEN_SPEED_BONUS * 100).toFixed(0)}%), and reload speed (+${(C.SWORD_SHARPENED_SHARPEN_RELOAD_BONUS * 100).toFixed(0)}%) per stack; max ${C.SWORD_SHARPENED_SHARPEN_MAX_STACKS} stacks lasting ${(C.SWORD_SHARPENED_SHARPEN_DURATION_MS / 1000).toFixed(0)}s each. Ignores ${(C.SWORD_SHARPENED_RESISTANCE_IGNORE * 100).toFixed(0)}% resistances.`
    ],
    solemnvow: [
        `HE E.G.O weapon with dual revolvers and alternating black/white shot rhythm.`,
        `Black shot: ${C.SOLEMN_VOW_BLACK_PELLETS_PER_SHOT} pellets, each dealing ${(C.SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(1)}%-${(C.SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(1)}% of enemy max HP.`,
        `White shot: ${C.SOLEMN_VOW_WHITE_PELLETS_PER_SHOT} pellets applying ${C.SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MIN}-${C.SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MAX} afterburn every ${(C.SOLEMN_VOW_WHITE_AFTERBURN_INTERVAL_MS / 1000).toFixed(1)}s for ${(C.SOLEMN_VOW_WHITE_AFTERBURN_DURATION_MS / 1000).toFixed(1)}s.`,
        `Funeral skill: after ${C.SOLEMN_VOW_FUNERAL_PELLETS_REQUIRED} pellets (or during reload), fires the portrait projectile to lock enemy shooting for ${(C.SOLEMN_VOW_FUNERAL_SHOOT_LOCK_MS / 1000).toFixed(1)}s.`,
        `Total ammo: ${C.SOLEMN_VOW_AMMO} (${C.SOLEMN_VOW_AMMO / 2} shots per revolver), medium reload.`
    ],
    minigun: [
        'High-capacity heavy weapon with fire-rate ramp-up.',
        `Magazine: ${new Weapon('minigun').maxAmmo} rounds, damage per shot: ${new Weapon('minigun').damageMin}-${new Weapon('minigun').damageMax} (random roll).`,
        `Fire rate ramps down from ${new Weapon('minigun').currentFireRate}ms to base ${new Weapon('minigun').fireRate}ms with successive shots.`,
        `Ramp resets after ${(new Weapon('minigun').rampResetDelayMs / 1000).toFixed(1)}s of idle.`,
        'Damage multiplier applies once ramped up; sustains damage output with continuous fire.'
    ],
    dealer: [
        'Auto-draw card weapon: damage output scales with poker hand strength (infinite ammo).',
        `Each draw (draw time ~${C.DEALER_DRAW_INTERVAL_MS}ms) fires a random card projectile.`,
        'Hand strength (high card → royal flush) increases damage multiplier up to ~3x+.',
        'Targets are selected randomly from nearby enemies; auto-fires when available.'
    ]
};

const typeImages = {
    pistol: 'assets/Pistol_True.png',
    revolver: 'assets/Pistol.png',
    shotgun: 'assets/Shotgun_IMG.png',
    familybusiness: 'assets/Familybusiness.PNG',
    sodapopper: 'assets/250px-Soda_Popper.PNG',
    forceanature: 'assets/Force-A-Nature.png',
    musket: 'assets/rifle-on-a-transparent-free-png-864369422.png',
    magicianhat: 'assets/Magic-Hat-PNG-Image-File-3052888691.png',
    widowmaker: 'assets/Widowmaker.png',
    sniper: 'assets/Sniper_rifle.png',
    machina: 'assets/Machina.png',
    huntsman: 'assets/Huntsman.png',
    crusaderscrossbow: "assets/RED_Crusader's_Crossbow.png",
    flamethrower: 'assets/RedFlamethrowerpng.png',
    smg: 'assets/SMG.png',
    tommygun: 'assets/TOMMY_GUN.png',
    egomagicbullet: 'assets/EGOWeaponMagicBullet.webp',
    egoloneliness: 'assets/EGOWeaponLoneliness.webp',
    penitence: 'assets/EGOWeaponPenitence.webp',
    paradiselost: 'assets/EGOWeaponParadiseLost.webp',
    harmony: 'assets/EGOWeaponHarmony.webp',
    hornet: 'assets/EGOWeaponHornet.png',
    swordsharpened: 'assets/EGOWeaponSwordSharpenedbyTears.webp',
    solemnvow: 'assets/EGOWeaponSolemnVow.webp',
    minigun: 'assets/Minigun_IMG.png',
    blutsauger: 'assets/Blutsauger.png',
    shortcircuit: 'assets/Short_circuit.png',
    rocketlauncher: 'assets/Rocket_launcher.png',
    piplauncher: 'assets/Pip_launcher.png',
    beggersbazooka: "assets/Beggar's_Bazooka.png",
    directhit: 'assets/Directhittransparent.png',
    nearmissed: 'assets/Directhittransparent.png',
    rocketjumper: 'assets/Rocket_Jumper.png',
    medigun: 'assets/RED_Medigun.png',
    yellowtarge: 'assets/YellowTarge.png',
    grenadelauncher: 'assets/Grenade_Launcher.png',
    dealer: 'assets/Poker.jpg',
    ammoico: 'assets/Ammoico.png',
    healthico: 'assets/Healthico.png',
    ubercharge: 'assets/UberCharge_Canteen.png',
    critical: 'assets/Critical_Hit_Boost_Canteen.png',
    speed: 'assets/SPEED.png',
    explosiveflask: 'assets/Explosive_Flask.png',
    scrumpybottle: 'assets/BottleScreen.png',
    bombanomicron: 'assets/RED_Bombinomicon.png',
    deadringer: 'assets/Dead_Ringer.png'
};

function formatLabel(value) {
    if (value === 'yellowtarge') return "Chargin' Targe";
    if (value === 'shortcircuit') return 'Short Circuit';
    if (value === 'rocketlauncher') return 'Rocket Launcher';
    if (value === 'piplauncher') return 'Pip Launcher';
    if (value === 'beggersbazooka') return "Begger's Bazooka";
    if (value === 'widowmaker') return 'Widowmaker';
    if (value === 'familybusiness') return 'Family Business';
    if (value === 'sodapopper') return 'Soda Popper';
    if (value === 'forceanature') return 'Force-A-Nature';
    if (value === 'musket') return 'Musket';
    if (value === 'tommygun') return 'Tommy Gun';
    if (value === 'egomagicbullet') return 'EGO Magic Bullet';
    if (value === 'egoloneliness') return 'EGO Weapon Loneliness';
    if (value === 'penitence') return 'EGO Weapon Penitence';
    if (value === 'paradiselost') return 'EGO Weapon Paradise Lost';
    if (value === 'harmony') return 'EGO Weapon Harmony';
    if (value === 'hornet') return 'EGO Weapon Hornet';
    if (value === 'swordsharpened') return 'EGO Weapon Sword Sharpened by Tears';
    if (value === 'solemnvow') return 'EGO Weapon Solemn Vow';
    if (value === 'magicianhat') return 'Magician Hat';
    if (value === 'crusaderscrossbow') return "Crusader's Crossbow";
    if (value === 'grenadelauncher') return 'Grenade Launcher';
    if (value === 'flamethrower') return 'Flamethrower';
    if (value === 'directhit') return 'Direct Hit';
    if (value === 'nearmissed') return 'Near Missed';
    if (value === 'rocketjumper') return 'Rocket Jumper';
    if (value === 'healthico') return 'Health Pack';
    if (value === 'ammoico') return 'Ammo Crate';
    if (value === 'ubercharge') return 'Ubercharge';
    if (value === 'critical') return 'Critical Boost';
    if (value === 'explosiveflask') return 'Explosive Flask';
    if (value === 'scrumpybottle') return 'Scrumpy Bottle';
    if (value === 'bombanomicron') return 'Bombanomicron';
    if (value === 'deadringer') return 'Dead Ringer';
    return value
        .split(/[_\s-]+/g)
        .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
        .join(' ');
}

function toMsText(ms) {
    return `${ms} ms (${(ms / 1000).toFixed(2)}s)`;
}

function makeRiskClassChip(riskClass) {
    return {
        label: 'Risk Class',
        value: riskClass,
        valueColor: riskClassColors[riskClass] || '#ffffff'
    };
}

function decorateListButton(button, type, label) {
    const imageFile = typeImages[type];

    const thumbWrap = document.createElement('span');
    thumbWrap.className = 'list-thumb-wrap';
    const thumb = document.createElement('img');
    thumb.className = 'list-thumb';

    if (imageFile) {
        thumb.src = `./${imageFile}`;
        thumb.alt = `${label} icon`;
        thumb.onerror = () => {
            thumbWrap.classList.add('hidden');
            thumb.removeAttribute('src');
            thumb.onerror = null;
        };
    } else {
        thumbWrap.classList.add('hidden');
    }

    const labelEl = document.createElement('span');
    labelEl.className = 'list-label';
    labelEl.textContent = label;

    thumbWrap.appendChild(thumb);
    button.appendChild(thumbWrap);
    button.appendChild(labelEl);
}

function buildWeaponStatChips(type) {
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
        chips.push(makeRiskClassChip('WAW'));
    }

    if (type === 'egoloneliness') {
        chips.push(['Damage Penalty', `-${Math.round((1 - (C.EGO_LONELINESS_DAMAGE / C.REVOLVER_DAMAGE)) * 100)}% vs Revolver`]);
        chips.push(['Projectile Type', 'Normal Revolver bullet']);
        chips.push(['Tracer Style', 'Grey huntsman-style trail']);
        chips.push(['Slow on Hit', `${Math.round((1 - C.EGO_LONELINESS_SLOW_MULTIPLIER) * 100)}% for ${toMsText(C.EGO_LONELINESS_SLOW_DURATION_MS)}`]);
        chips.push(['Ammo Refund', `${Math.round(C.EGO_LONELINESS_AMMO_REFUND_CHANCE * 100)}% chance to refund 1 ammo`]);
        chips.push(makeRiskClassChip('TETH'));
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
        chips.push(makeRiskClassChip('ZAYIN'));
    }

    if (type === 'paradiselost') {
        chips.push(['Damage Bonus', `${(C.PARADISE_LOST_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(1)}%-${(C.PARADISE_LOST_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(1)}% max HP`]);
        chips.push(['Homing', `Slight (${C.PARADISE_LOST_HOMING_RANGE}px range)`]);
        chips.push(['Lifesteal', `${Math.round(C.PARADISE_LOST_LIFESTEAL_RATIO * 100)}% of damage dealt`]);
        chips.push(['Ally Heal', `${Math.round(C.PARADISE_LOST_ALLY_HEAL_RATIO * 100)}% within ${C.PARADISE_LOST_ALLY_HEAL_RADIUS}px`]);
        chips.push(['Adaptive Resist', `${Math.round(C.PARADISE_LOST_ADAPTIVE_RESISTANCE * 100)}% every ${toMsText(C.PARADISE_LOST_ADAPTIVE_INTERVAL_MS)}`]);
        chips.push(['Self HP Drain', `${(C.PARADISE_LOST_SELF_DOT_MIN_RATIO * 100).toFixed(1)}%-${(C.PARADISE_LOST_SELF_DOT_MAX_RATIO * 100).toFixed(1)}% per ${toMsText(C.PARADISE_LOST_SELF_DOT_INTERVAL_MS)}`]);
        chips.push(['CC Resist', 'Move-slow immunity while equipped']);
        chips.push(makeRiskClassChip('ALEPH'));
    }

    if (type === 'harmony') {
        chips.push(['Pellets', `${C.HARMONY_PELLETS_PER_SHOT}`]);
        chips.push(['Damage / Pellet', `${C.HARMONY_DAMAGE_MIN}-${C.HARMONY_DAMAGE_MAX}`]);
        chips.push(['Self HP Cost', `${Math.round(C.HARMONY_SELF_HP_COST_RATIO * 100)}% max HP / shot (stops at 1 HP)`]);
        chips.push(['Damage Bonus', 'x2 only when HP is spent']);
        chips.push(['Haste Bonus', `Up to ${Math.round(C.HARMONY_HASTE_MAX_BONUS * 100)}% on hit`]);
        chips.push(['Haste Duration', toMsText(C.HARMONY_HASTE_DURATION_MS)]);
        chips.push(makeRiskClassChip('HE'));
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
        chips.push(makeRiskClassChip('WAW'));
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
        chips.push(makeRiskClassChip('WAW'));
    }

    if (type === 'solemnvow') {
        chips.push(['Black Pellets', `${C.SOLEMN_VOW_BLACK_PELLETS_PER_SHOT}`]);
        chips.push(['Black Damage', `${(C.SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MIN_RATIO * 100).toFixed(1)}%-${(C.SOLEMN_VOW_BLACK_MAX_HP_DAMAGE_MAX_RATIO * 100).toFixed(1)}% max HP / pellet`]);
        chips.push(['White Pellets', `${C.SOLEMN_VOW_WHITE_PELLETS_PER_SHOT}`]);
        chips.push(['White Afterburn', `${C.SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MIN}-${C.SOLEMN_VOW_WHITE_AFTERBURN_DAMAGE_MAX} / ${toMsText(C.SOLEMN_VOW_WHITE_AFTERBURN_INTERVAL_MS)}`]);
        chips.push(['Afterburn Duration', toMsText(C.SOLEMN_VOW_WHITE_AFTERBURN_DURATION_MS)]);
        chips.push(['Funeral Trigger', `${C.SOLEMN_VOW_FUNERAL_PELLETS_REQUIRED} pellets or reload`]);
        chips.push(['Funeral Lockout', toMsText(C.SOLEMN_VOW_FUNERAL_SHOOT_LOCK_MS)]);
        chips.push(makeRiskClassChip('HE'));
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

function renderDealerTable(type) {
    if (type !== 'dealer') {
        dealerTableWrapEl.classList.add('hidden');
        dealerTableBodyEl.innerHTML = '';
        return;
    }

    dealerTableBodyEl.innerHTML = '';
    const handEntries = Object.entries(C.HAND_DAMAGE_TABLE || {});

    for (const [handName, values] of handEntries) {
        const row = document.createElement('tr');
        const handCell = document.createElement('td');
        const baseCell = document.createElement('td');
        const multCell = document.createElement('td');

        handCell.textContent = handName;
        baseCell.textContent = `${values?.value ?? 0}`;
        multCell.textContent = `x${values?.multiplier ?? 1}`;

        row.appendChild(handCell);
        row.appendChild(baseCell);
        row.appendChild(multCell);
        dealerTableBodyEl.appendChild(row);
    }

    dealerTableWrapEl.classList.remove('hidden');
}

function renderDetail(entry) {
    detailTitleEl.textContent = entry.title;
    detailSubtitleEl.textContent = entry.subtitle;

    const imageFile = typeImages[entry.type];
    if (imageFile) {
        detailImgEl.onerror = () => {
            detailImgWrapEl.classList.add('hidden');
            detailImgEl.removeAttribute('src');
            detailImgEl.onerror = null;
        };
        detailImgEl.src = `./${imageFile}`;
        detailImgEl.alt = `${entry.title} image`;
        detailImgWrapEl.classList.remove('hidden');
    } else {
        detailImgWrapEl.classList.add('hidden');
        detailImgEl.removeAttribute('src');
    }

    chipsEl.innerHTML = '';
    for (const chipData of entry.chips) {
        const chip = document.createElement('div');
        chip.className = 'stat-chip';
        if (Array.isArray(chipData)) {
            const [chipLabel, chipValue, chipColor] = chipData;
            chip.innerHTML = `<span class="chip-label">${chipLabel}</span><span class="chip-value"${chipColor ? ` style="color: ${chipColor};"` : ''}>${chipValue}</span>`;
        } else if (typeof chipData === 'object' && chipData) {
            chip.innerHTML = `<span class="chip-label">${chipData.label}</span><span class="chip-value" style="color: ${chipData.valueColor || '#fff'};">${chipData.value}</span>`;
        } else {
            chip.innerHTML = `<span class="chip-label"></span><span class="chip-value"></span>`;
        }
        chipsEl.appendChild(chip);
    }

    notesEl.innerHTML = '';
    for (const note of entry.notes || []) {
        const noteEl = document.createElement('li');
        noteEl.textContent = note;
        notesEl.appendChild(noteEl);
    }

    renderDealerTable(entry.type);
}

function setActiveButton(button) {
    const buttons = Array.from(listEl.querySelectorAll('button'));
    for (const item of buttons) {
        item.classList.toggle('active', item === button);
    }
}

function renderList(mode) {
    listEl.innerHTML = '';

    if (mode === 'weapons') {
        for (const type of weaponTypes) {
            const button = document.createElement('button');
            button.className = 'list-item';
            const label = formatLabel(type);
            decorateListButton(button, type, label);
            button.addEventListener('click', () => {
                setActiveButton(button);
                renderDetail({
                    type,
                    title: label,
                    subtitle: 'Weapon',
                    chips: buildWeaponStatChips(type),
                    notes: specialNotes[type] || []
                });
            });
            listEl.appendChild(button);
        }
    } else {
        for (const type of utilityTypes) {
            const button = document.createElement('button');
            button.className = 'list-item';
            const label = formatLabel(type);
            decorateListButton(button, type, label);
            button.addEventListener('click', () => {
                setActiveButton(button);
                renderDetail({ type, ...utilityStats[type] });
            });
            listEl.appendChild(button);
        }
    }

    const first = listEl.querySelector('button');
    if (first) {
        first.click();
    }
}

function switchTab(mode) {
    tabButtons.weapons.classList.toggle('active', mode === 'weapons');
    tabButtons.utilities.classList.toggle('active', mode === 'utilities');
    renderList(mode);
}

tabButtons.weapons.addEventListener('click', () => switchTab('weapons'));
tabButtons.utilities.addEventListener('click', () => switchTab('utilities'));

switchTab('weapons');
