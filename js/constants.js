export const ARENA_WIDTH = 800;
export const ARENA_HEIGHT = 600;

export const BALL_MAX_HP = 1600;
export const BALL_BASE_SPEED = 4;
export const BALL_MIN_SPEED = 1;

export const PISTOL_DAMAGE = 12;
export const REVOLVER_DAMAGE = 30;
export const SHOTGUN_PELLET_DAMAGE = 25;
export const SHOTGUN_DAMAGE_MIN = 4;
export const SHOTGUN_DAMAGE_MAX = 25;
export const SHOTGUN_HITSCAN_RANGE = 750;
export const SHOTGUN_TRACER_DURATION_MS = 100;
export const WIDOWMAKER_AMMO = 200;
export const WIDOWMAKER_AMMO_PER_SHOT = 30;
export const WIDOWMAKER_PELLETS_PER_SHOT = 6;
export const WIDOWMAKER_DAMAGE_MIN = 5;
export const WIDOWMAKER_DAMAGE_MAX = 20;
export const WIDOWMAKER_HITSCAN_RANGE = SHOTGUN_HITSCAN_RANGE;
export const WIDOWMAKER_FIRE_RATE = 800;
export const WIDOWMAKER_RELOAD_MS = 3000;
export const WIDOWMAKER_LOW_AMMO_RELOAD_MS = 10000;
export const WIDOWMAKER_SPREAD_ANGLE = 0.15;
export const SODA_POPPER_AMMO = 2;
export const SODA_POPPER_RELOAD_MS = 1500;
export const SODA_POPPER_PELLETS_PER_SHOT = 8;
export const SODA_POPPER_DAMAGE_MIN = 2;
export const SODA_POPPER_DAMAGE_MAX = 25;
export const SODA_POPPER_HITSCAN_RANGE = SHOTGUN_HITSCAN_RANGE;
export const SODA_POPPER_FIRE_RATE = 260;
export const SODA_POPPER_SPREAD_ANGLE = 0.24;
export const SODA_POPPER_CHARGE_DAMAGE_REQUIRED = 400;
export const SODA_POPPER_HYPE_DAMAGE_MULTIPLIER = 1.25;
export const SODA_POPPER_HYPE_SPEED_BOOST = 0.6;
export const SODA_POPPER_HYPE_DURATION_MS = 4000;
export const FORCE_A_NATURE_AMMO = 2;
export const FORCE_A_NATURE_RELOAD_MS = 1600;
export const FORCE_A_NATURE_PELLETS_PER_SHOT = 8;
export const FORCE_A_NATURE_DAMAGE_MIN = 3;
export const FORCE_A_NATURE_DAMAGE_MAX = 32;
export const FORCE_A_NATURE_HITSCAN_RANGE = SHOTGUN_HITSCAN_RANGE;
export const FORCE_A_NATURE_FIRE_RATE = 380;
export const FORCE_A_NATURE_SPREAD_ANGLE = 0.25;
export const FORCE_A_NATURE_SELF_KNOCKBACK = 3.2;
export const FORCE_A_NATURE_ENEMY_KNOCKBACK = 1.1;
export const MAGICIAN_HAT_AMMO = 1;
export const MAGICIAN_HAT_RELOAD_MS = 1200;
export const MAGICIAN_HAT_DAMAGE_MIN = 60;
export const MAGICIAN_HAT_DAMAGE_MAX = 75;
export const MAGICIAN_HAT_SPEED = 10;
export const MAGICIAN_HAT_FIRE_RATE = 260;
export const MAGICIAN_HAT_PROJECTILE_SIZE = 11;
export const MAGICIAN_HAT_TELEPORT_DISTANCE = 160;
export const MAGICIAN_HAT_TELEPORT_SMOKE_DURATION_MS = 360;
export const MAGICIAN_HAT_HOMING_STRENGTH = 0.06;
export const MAGICIAN_HAT_HOMING_RANGE = 420;
export const SNIPER_DAMAGE_MIN = 150;
export const SNIPER_DAMAGE_MAX = 300;
export const MACHINA_DAMAGE_MIN = 150;
export const MACHINA_DAMAGE_MAX = 275;
export const MACHINA_TRACER_RANGE = 950;
export const MACHINA_TRACER_DURATION_MS = 90;
export const HUNTSMAN_DAMAGE_MIN = 100;
export const HUNTSMAN_DAMAGE_MAX = 200;
export const HUNTSMAN_STICK_DURATION_MS = 1400;
export const CRUSADERS_CROSSBOW_AMMO = 1;
export const CRUSADERS_CROSSBOW_RELOAD_MS = 1800;
export const CRUSADERS_CROSSBOW_DAMAGE_MIN = 100;
export const CRUSADERS_CROSSBOW_DAMAGE_MAX = 150;
export const CRUSADERS_CROSSBOW_HEAL_MIN = 75;
export const CRUSADERS_CROSSBOW_HEAL_MAX = 100;
export const BLUTSAUGER_DAMAGE = 15;
export const BLUTSAUGER_HEAL_MIN = 5;
export const BLUTSAUGER_HEAL_MAX = 10;
export const SHORT_CIRCUIT_AMMO = 5;
export const SHORT_CIRCUIT_SPEED = 2.4;
export const SHORT_CIRCUIT_RADIUS = 76;
export const SHORT_CIRCUIT_DURATION_MS = 4500;
export const SHORT_CIRCUIT_DOT_DAMAGE = 10;
export const SHORT_CIRCUIT_DOT_INTERVAL_MS = 1000;
export const ROCKET_LAUNCHER_AMMO = 4;
export const ROCKET_LAUNCHER_DIRECT_DAMAGE = 100;
export const ROCKET_LAUNCHER_SPEED = 16;
export const ROCKET_LAUNCHER_SPLASH_RADIUS = 90;
export const PIP_LAUNCHER_AMMO = 6;
export const PIP_LAUNCHER_RELOAD_MS = 3500;
export const PIP_LAUNCHER_DAMAGE_MIN = 50;
export const PIP_LAUNCHER_DAMAGE_MAX = 80;
export const PIP_LAUNCHER_SPEED = 12;
export const PIP_LAUNCHER_SPLASH_RADIUS = 115;
export const PIP_LAUNCHER_ALLY_HEAL_MIN = 50;
export const PIP_LAUNCHER_ALLY_HEAL_MAX = 80;
export const PIP_LAUNCHER_TRACER_DURATION_MS = 90;
export const EXPLOSIVE_FLASK_COOLDOWN_MS = 4000;
export const EXPLOSIVE_FLASK_SPEED = 9.4;
export const EXPLOSIVE_FLASK_SPLASH_RADIUS = 100;
export const EXPLOSIVE_FLASK_EFFECT_DURATION_MS = 4000;
export const EXPLOSIVE_FLASK_SLOW_MULTIPLIER = 0.72;
export const EXPLOSIVE_FLASK_PIP_DAMAGE_MULTIPLIER = 1.5;
export const EXPLOSIVE_FLASK_PICKUP_DAMAGE_MULTIPLIER = 1.4;
export const BEGGERS_BAZOOKA_AMMO = 4;
export const BEGGERS_BAZOOKA_RELOAD_MS = 3800;
export const BEGGERS_BAZOOKA_DAMAGE = Math.round(ROCKET_LAUNCHER_DIRECT_DAMAGE * 0.8);
export const BEGGERS_BAZOOKA_SPEED = ROCKET_LAUNCHER_SPEED * 1.4;
export const BEGGERS_BAZOOKA_SPLASH_RADIUS = ROCKET_LAUNCHER_SPLASH_RADIUS * 0.75;
export const BEGGERS_BAZOOKA_FIRE_RATE = 180;
export const BEGGERS_BAZOOKA_DEVIATION = 0.15;
export const DIRECT_HIT_AMMO = 4;
export const DIRECT_HIT_DAMAGE = 125;
export const DIRECT_HIT_SPEED = ROCKET_LAUNCHER_SPEED * 1.8;
export const DIRECT_HIT_SPLASH_RADIUS = ROCKET_LAUNCHER_SPLASH_RADIUS * 0.25;
export const DIRECT_HIT_VS_FASTER_MULTIPLIER = 1.5;
export const ROCKET_JUMPER_AMMO = 4;
export const ROCKET_JUMPER_SPEED = ROCKET_LAUNCHER_SPEED;
export const ROCKET_JUMPER_SPLASH_RADIUS = 56;
export const ROCKET_JUMPER_KNOCKBACK = 4;
export const ROCKET_JUMPER_SELF_BLAST_IMPULSE = 28;
export const ROCKET_JUMPER_MELEE_DAMAGE_PER_SPEED = 30;
export const ROCKET_JUMPER_MELEE_MIN_DAMAGE = 30;
export const ROCKET_JUMPER_MELEE_MAX_DAMAGE = 300;
export const ROCKET_JUMPER_MELEE_COOLDOWN_MS = 650;
export const YELLOW_TARGE_CHARGE_RELOAD_MS = 2500;
export const YELLOW_TARGE_CHARGE_TRIGGER_RANGE = 1000;
export const YELLOW_TARGE_CHARGE_IMPULSE = 40;
export const YELLOW_TARGE_CHARGE_MAX_DURATION_MS = 1000;
export const YELLOW_TARGE_CHARGE_DAMAGE_MIN = 45;
export const YELLOW_TARGE_CHARGE_DAMAGE_MAX = 260;
export const YELLOW_TARGE_DAMAGE_PER_DISTANCE = 0.62;
export const YELLOW_TARGE_KNOCKBACK = 5.4;
export const YELLOW_TARGE_DAMAGE_REDUCTION_ALL = 0.2;
export const YELLOW_TARGE_DAMAGE_REDUCTION_EXPLOSIVE = 0.3;
export const MEDIGUN_AMMO = 1;
export const MEDIGUN_RELOAD_MS = 1000;
export const MEDIGUN_BEAM_RANGE = 600;
export const MEDIGUN_ALLY_HEAL_PER_SEC = 30;
export const MEDIGUN_ENEMY_DAMAGE_PER_SEC = 25;
export const MEDIGUN_ENEMY_LIFESTEAL_PER_SEC = 8;
export const MEDIGUN_SELF_REGEN_PER_SEC = 4;
export const MEDIGUN_SELF_REGEN_DELAY_MS = 4000;
export const MEDIGUN_SELF_REGEN_CAP = 14;
export const MEDIGUN_OVERHEAL_MULTIPLIER = 1.25;
export const MEDIGUN_UBER_HEAL_THRESHOLD = 800;
export const MEDIGUN_UBER_DAMAGE_THRESHOLD = 600;
export const MEDIGUN_UBER_DURATION_MS = 6000;
export const GRENADE_LAUNCHER_AMMO = 6;
export const GRENADE_LAUNCHER_DIRECT_DAMAGE = 100;
export const GRENADE_LAUNCHER_SPEED = 8.5;
export const GRENADE_LAUNCHER_SPLASH_RADIUS = 72;
export const GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE = 90;
export const GRENADE_LAUNCHER_EXPLODE_DELAY_MS = 1200;
export const FLAMETHROWER_AMMO = 200;
export const FLAMETHROWER_DAMAGE_MIN = 2;
export const FLAMETHROWER_DAMAGE_MAX = 5;
export const FLAMETHROWER_PARTICLES_PER_SHOT = 4;
export const FLAMETHROWER_SPEED = 15;
export const FLAMETHROWER_FIRE_RATE = 1;
export const FLAMETHROWER_SPREAD_ANGLE = 0.09;
export const FLAMETHROWER_PARTICLE_LIFETIME_MS = 380;
export const FLAMETHROWER_HITSCAN_RANGE = 400;
export const FLAMETHROWER_PIERCE_COUNT = 10;
export const FLAMETHROWER_AFTERBURN_DAMAGE_MIN = 5;
export const FLAMETHROWER_AFTERBURN_DAMAGE_MAX = 6;
export const FLAMETHROWER_AFTERBURN_INTERVAL_MS = 500;
export const FLAMETHROWER_AFTERBURN_DURATION_MS = 3500;
export const PYRO_AIRBLAST_COOLDOWN_MS = 3500;
export const PYRO_AIRBLAST_AMMO_COST = 20;

export const PICKUP_SPAWN_RATE_MS = 4000;
export const PICKUP_DELAY_MS = 500;
export const REACTION_DELAY_MS = 140;
export const HEALTHICO_HEAL = 150;
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

export const DEALER_DRAW_INTERVAL_MS = 500;

export const HAND_DAMAGE_TABLE = {
    'Straight Flush': { value: 200, multiplier: 8 },
    'Four of a Kind': { value: 120, multiplier: 7 },
    'Full House': { value: 80, multiplier: 4 },
    Flush: { value: 70, multiplier: 4 },
    Straight: { value: 60, multiplier: 4 },
    'Three of a Kind': { value: 60, multiplier: 3 },
    'Two Pair': { value: 40, multiplier: 2 },
    Pair: { value: 20, multiplier: 2 },
    'High Card': { value: 10, multiplier: 1 }
};

export const START_WEAPON_OPTIONS = [
    'pistol',
    'revolver',
    'shotgun',
    'sodapopper',
    'forceanature',
    'magicianhat',
    'widowmaker',
    'sniper',
    'machina',
    'huntsman',
    'crusaderscrossbow',
    'smg',
    'minigun',
    'blutsauger',
    'shortcircuit',
    'rocketlauncher',
    'piplauncher',
    'beggersbazooka',
    'directhit',
    'rocketjumper',
    'medigun',
    'yellowtarge',
    'grenadelauncher',
    'flamethrower',
    'dealer'
];

export const DROP_WEAPON_TYPES = [
    'pistol',
    'revolver',
    'shotgun',
    'sodapopper',
    'forceanature',
    'magicianhat',
    'widowmaker',
    'dealer',
    'sniper',
    'machina',
    'huntsman',
    'crusaderscrossbow',
    'smg',
    'minigun',
    'blutsauger',
    'shortcircuit',
    'rocketlauncher',
    'piplauncher',
    'beggersbazooka',
    'directhit',
    'rocketjumper',
    'medigun',
    'yellowtarge',
    'grenadelauncher',
    'flamethrower'
];

export const DROP_UTILITY_TYPES = [
    'ammoico',
    'healthico',
    'ubercharge',
    'critical',
    'speed',
    'explosiveflask',
    'scrumpybottle',
    'bombanomicron',
    'deadringer'
];