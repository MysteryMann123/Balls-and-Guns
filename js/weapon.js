import {
    BEGGERS_BAZOOKA_AMMO,
    BEGGERS_BAZOOKA_DAMAGE,
    BEGGERS_BAZOOKA_DEVIATION,
    BEGGERS_BAZOOKA_FIRE_RATE,
    BEGGERS_BAZOOKA_RELOAD_MS,
    BEGGERS_BAZOOKA_SPEED,
    BEGGERS_BAZOOKA_SPLASH_RADIUS,
    BLUTSAUGER_DAMAGE,
    BLUTSAUGER_HEAL_MAX,
    BLUTSAUGER_HEAL_MIN,
    CRUSADERS_CROSSBOW_AMMO,
    CRUSADERS_CROSSBOW_DAMAGE_MAX,
    CRUSADERS_CROSSBOW_DAMAGE_MIN,
    CRUSADERS_CROSSBOW_HEAL_MAX,
    CRUSADERS_CROSSBOW_HEAL_MIN,
    CRUSADERS_CROSSBOW_RELOAD_MS,
    DEALER_DRAW_INTERVAL_MS,
    DIRECT_HIT_AMMO,
    DIRECT_HIT_DAMAGE,
    DIRECT_HIT_SPEED,
    DIRECT_HIT_SPLASH_RADIUS,
    EGO_MAGIC_BULLET_AMMO,
    EGO_MAGIC_BULLET_DAMAGE_MAX,
    EGO_MAGIC_BULLET_DAMAGE_MIN,
    EGO_MAGIC_BULLET_FIRE_RATE,
    EGO_MAGIC_BULLET_PROJECTILE_SIZE,
    EGO_MAGIC_BULLET_RELOAD_MS,
    EGO_MAGIC_BULLET_SPEED,
    EGO_MAGIC_BULLET_SPREAD_ANGLE,
    EGO_LONELINESS_AMMO,
    EGO_LONELINESS_DAMAGE,
    EGO_LONELINESS_FIRE_RATE,
    EGO_LONELINESS_RELOAD_MS,
    EGO_LONELINESS_SPEED,
    EGO_LONELINESS_SLOW_DURATION_MS,
    EGO_LONELINESS_SLOW_MULTIPLIER,
    HARMONY_AMMO,
    HARMONY_DAMAGE_MAX,
    HARMONY_DAMAGE_MIN,
    HARMONY_HASTE_DURATION_MS,
    HARMONY_HASTE_MAX_BONUS,
    HARMONY_PELLETS_PER_SHOT,
    HARMONY_PROJECTILE_SIZE,
    HARMONY_PROJECTILE_SPEED,
    HARMONY_RELOAD_MS,
    HARMONY_SPREAD_ANGLE,
    HORNET_FIRE_RATE,
    HORNET_RANGE_SWITCH_DISTANCE,
    HORNET_RELOAD_MS,
    HORNET_RIFLE_AMMO,
    HORNET_RIFLE_DAMAGE_MAX,
    HORNET_RIFLE_DAMAGE_MIN,
    HORNET_RIFLE_PROJECTILE_SIZE,
    HORNET_RIFLE_SPEED,
    HORNET_SHOTGUN_AMMO,
    HORNET_SHOTGUN_DAMAGE_MAX,
    HORNET_SHOTGUN_DAMAGE_MIN,
    HORNET_SHOTGUN_PELLETS_PER_SHOT,
    HORNET_SHOTGUN_SPREAD_ANGLE,
    SWORD_SHARPENED_SHARPEN_DAMAGE_BONUS,
    SWORD_SHARPENED_SHARPEN_SPEED_BONUS,
    SWORD_SHARPENED_SHARPEN_RELOAD_BONUS,
    SWORD_SHARPENED_SHARPEN_MAX_STACKS,
    SWORD_SHARPENED_AMMO,
    SWORD_SHARPENED_RELOAD_MS,
    SWORD_SHARPENED_FIRE_RATE,
    SWORD_SHARPENED_DAMAGE_MIN,
    SWORD_SHARPENED_DAMAGE_MAX,
    SWORD_SHARPENED_SPEED,
    SWORD_SHARPENED_SIZE,
    FAMILY_BUSINESS_AMMO,
    FAMILY_BUSINESS_DAMAGE_MAX,
    FAMILY_BUSINESS_DAMAGE_MIN,
    FAMILY_BUSINESS_FIRE_RATE,
    FAMILY_BUSINESS_PELLETS_PER_SHOT,
    FAMILY_BUSINESS_RELOAD_MS,
    FAMILY_BUSINESS_SPREAD_ANGLE,
    NEAR_MISSED_AMMO,
    NEAR_MISSED_DAMAGE,
    NEAR_MISSED_SPEED,
    NEAR_MISSED_SPLASH_RADIUS,
    FLAMETHROWER_AMMO,
    FLAMETHROWER_DAMAGE_MAX,
    FLAMETHROWER_DAMAGE_MIN,
    FLAMETHROWER_FIRE_RATE,
    FLAMETHROWER_PARTICLES_PER_SHOT,
    FLAMETHROWER_PIERCE_COUNT,
    FLAMETHROWER_SPEED,
    FLAMETHROWER_SPREAD_ANGLE,
    FORCE_A_NATURE_AMMO,
    FORCE_A_NATURE_DAMAGE_MAX,
    FORCE_A_NATURE_DAMAGE_MIN,
    FORCE_A_NATURE_FIRE_RATE,
    FORCE_A_NATURE_PELLETS_PER_SHOT,
    FORCE_A_NATURE_RELOAD_MS,
    FORCE_A_NATURE_SELF_KNOCKBACK,
    FORCE_A_NATURE_ENEMY_KNOCKBACK,
    FORCE_A_NATURE_SPREAD_ANGLE,
    GRENADE_LAUNCHER_AMMO,
    GRENADE_LAUNCHER_DIRECT_DAMAGE,
    GRENADE_LAUNCHER_EXPLODE_DELAY_MS,
    GRENADE_LAUNCHER_SPEED,
    GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE,
    GRENADE_LAUNCHER_SPLASH_RADIUS,
    HUNTSMAN_DAMAGE_MAX,
    HUNTSMAN_DAMAGE_MIN,
    MAGICIAN_HAT_AMMO,
    MAGICIAN_HAT_DAMAGE_MAX,
    MAGICIAN_HAT_DAMAGE_MIN,
    MAGICIAN_HAT_FIRE_RATE,
    MAGICIAN_HAT_PROJECTILE_SIZE,
    MAGICIAN_HAT_RELOAD_MS,
    MAGICIAN_HAT_SPEED,
    MUSKET_AMMO,
    MUSKET_DAMAGE_MAX,
    MUSKET_DAMAGE_MIN,
    MUSKET_FIRE_RATE,
    MUSKET_RELOAD_MS,
    MUSKET_SPEED,
    MUSKET_SPREAD_ANGLE,
    MACHINA_DAMAGE_MAX,
    MACHINA_DAMAGE_MIN,
    MEDIGUN_AMMO,
    MEDIGUN_RELOAD_MS,
    PIP_LAUNCHER_AMMO,
    PIP_LAUNCHER_DAMAGE_MAX,
    PIP_LAUNCHER_DAMAGE_MIN,
    PIP_LAUNCHER_RELOAD_MS,
    PIP_LAUNCHER_SPEED,
    PIP_LAUNCHER_SPLASH_RADIUS,
    PARADISE_LOST_AMMO,
    PARADISE_LOST_DAMAGE_MAX,
    PARADISE_LOST_DAMAGE_MIN,
    PARADISE_LOST_FIRE_RATE,
    PARADISE_LOST_RELOAD_MS,
    PARADISE_LOST_SPEED,
    PENITENCE_DAMAGE_MAX,
    PENITENCE_DAMAGE_MIN,
    PENITENCE_FIRE_RATE,
    PISTOL_DAMAGE,
    REVOLVER_DAMAGE,
    ROCKET_JUMPER_AMMO,
    ROCKET_JUMPER_KNOCKBACK,
    ROCKET_JUMPER_SPEED,
    ROCKET_JUMPER_SPLASH_RADIUS,
    ROCKET_LAUNCHER_AMMO,
    ROCKET_LAUNCHER_DIRECT_DAMAGE,
    ROCKET_LAUNCHER_SPEED,
    ROCKET_LAUNCHER_SPLASH_RADIUS,
    SHORT_CIRCUIT_AMMO,
    SHORT_CIRCUIT_SPEED,
    SHOTGUN_DAMAGE_MIN,
    SHOTGUN_DAMAGE_MAX,
    SHOTGUN_PELLET_DAMAGE,
    SOLEMN_VOW_AMMO,
    SOLEMN_VOW_BLACK_PELLETS_PER_SHOT,
    SOLEMN_VOW_BLACK_PROJECTILE_SIZE,
    SOLEMN_VOW_BLACK_PROJECTILE_SPEED,
    SOLEMN_VOW_FIRE_RATE,
    SOLEMN_VOW_RELOAD_MS,
    SMG_AMMO,
    SMG_DAMAGE,
    SMG_FIRE_RATE,
    SMG_RELOAD_MS,
    SMG_SPEED,
    SMG_SPREAD_ANGLE,
    SODA_POPPER_AMMO,
    SODA_POPPER_DAMAGE_MAX,
    SODA_POPPER_DAMAGE_MIN,
    SODA_POPPER_FIRE_RATE,
    SODA_POPPER_PELLETS_PER_SHOT,
    SODA_POPPER_RELOAD_MS,
    SODA_POPPER_SPREAD_ANGLE,
    SNIPER_DAMAGE_MAX,
    SNIPER_DAMAGE_MIN,
    WIDOWMAKER_AMMO,
    WIDOWMAKER_AMMO_PER_SHOT,
    WIDOWMAKER_DAMAGE_MAX,
    WIDOWMAKER_DAMAGE_MIN,
    WIDOWMAKER_FIRE_RATE,
    WIDOWMAKER_LOW_AMMO_RELOAD_MS,
    WIDOWMAKER_PELLETS_PER_SHOT,
    WIDOWMAKER_RELOAD_MS,
    WIDOWMAKER_SPREAD_ANGLE,
    TOMMY_GUN_AMMO,
    TOMMY_GUN_DAMAGE,
    TOMMY_GUN_FIRE_RATE,
    TOMMY_GUN_RELOAD_MS,
    TOMMY_GUN_SPEED,
    TOMMY_GUN_SPREAD_ANGLE,
    YELLOW_TARGE_CHARGE_RELOAD_MS
} from './constants.js';

export class Weapon {
    constructor(type) {
        this.type = type;
        this.lastShotAt = 0;
        this.reloadTimeMs = 0;
        this.isReloading = false;
        this.reloadCompleteAt = 0;
        this.harmonyHasteBonus = 0;
        this.harmonyHasteUntil = 0;

        if (type === 'pistol') {
            this.maxAmmo = 12;
            this.ammo = 12;
            this.reloadTimeMs = 1600;
            this.damage = PISTOL_DAMAGE;
            this.speed = 12;
            this.fireRate = 120;
            this.color = '#ffff00';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.35;
        } else if (type === 'revolver') {
            this.maxAmmo = 6;
            this.ammo = 6;
            this.reloadTimeMs = 1500;
            this.damage = REVOLVER_DAMAGE;
            this.speed = 12;
            this.fireRate = 600;
            this.color = '#ffd84d';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'egoloneliness') {
            this.maxAmmo = EGO_LONELINESS_AMMO;
            this.ammo = EGO_LONELINESS_AMMO;
            this.reloadTimeMs = EGO_LONELINESS_RELOAD_MS;
            this.damage = EGO_LONELINESS_DAMAGE;
            this.speed = EGO_LONELINESS_SPEED;
            this.fireRate = EGO_LONELINESS_FIRE_RATE;
            this.color = '#a8a8a8';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.slowDurationMs = EGO_LONELINESS_SLOW_DURATION_MS;
            this.slowMultiplier = EGO_LONELINESS_SLOW_MULTIPLIER;
        } else if (type === 'penitence') {
            this.maxAmmo = Infinity;
            this.ammo = Infinity;
            this.reloadTimeMs = 0;
            this.damage = 0;
            this.damageMin = PENITENCE_DAMAGE_MIN;
            this.damageMax = PENITENCE_DAMAGE_MAX;
            this.speed = 0;
            this.fireRate = PENITENCE_FIRE_RATE;
            this.color = '#6adf76';
            this.projectileSize = 0;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'paradiselost') {
            this.maxAmmo = PARADISE_LOST_AMMO;
            this.ammo = PARADISE_LOST_AMMO;
            this.reloadTimeMs = PARADISE_LOST_RELOAD_MS;
            this.damage = 0;
            this.damageMin = PARADISE_LOST_DAMAGE_MIN;
            this.damageMax = PARADISE_LOST_DAMAGE_MAX;
            this.speed = PARADISE_LOST_SPEED;
            this.fireRate = PARADISE_LOST_FIRE_RATE;
            this.color = '#ffe27a';
            this.projectileSize = 6;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.02;
        } else if (type === 'solemnvow') {
            this.maxAmmo = SOLEMN_VOW_AMMO;
            this.ammo = SOLEMN_VOW_AMMO;
            this.reloadTimeMs = SOLEMN_VOW_RELOAD_MS;
            this.damage = 0;
            this.speed = SOLEMN_VOW_BLACK_PROJECTILE_SPEED;
            this.fireRate = SOLEMN_VOW_FIRE_RATE;
            this.color = '#b9bcc1';
            this.projectileSize = SOLEMN_VOW_BLACK_PROJECTILE_SIZE;
            this.pelletsPerShot = SOLEMN_VOW_BLACK_PELLETS_PER_SHOT;
            this.spreadAngle = 0;
        } else if (type === 'harmony') {
            this.maxAmmo = HARMONY_AMMO;
            this.ammo = HARMONY_AMMO;
            this.reloadTimeMs = HARMONY_RELOAD_MS;
            this.damage = 0;
            this.damageMin = HARMONY_DAMAGE_MIN;
            this.damageMax = HARMONY_DAMAGE_MAX;
            this.speed = HARMONY_PROJECTILE_SPEED;
            this.fireRate = 420;
            this.color = '#dcecff';
            this.projectileSize = HARMONY_PROJECTILE_SIZE;
            this.pelletsPerShot = HARMONY_PELLETS_PER_SHOT;
            this.spreadAngle = HARMONY_SPREAD_ANGLE;
        } else if (type === 'hornet') {
            this.maxAmmo = HORNET_RIFLE_AMMO;
            this.ammo = HORNET_RIFLE_AMMO;
            this.reloadTimeMs = HORNET_RELOAD_MS;
            this.damage = 0;
            this.damageMin = HORNET_RIFLE_DAMAGE_MIN;
            this.damageMax = HORNET_RIFLE_DAMAGE_MAX;
            this.speed = HORNET_RIFLE_SPEED;
            this.fireRate = HORNET_FIRE_RATE;
            this.color = '#ffd95a';
            this.projectileSize = HORNET_RIFLE_PROJECTILE_SIZE;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.hornetRangeSwitchDistance = HORNET_RANGE_SWITCH_DISTANCE;
            this.hornetShotgunMaxAmmo = HORNET_SHOTGUN_AMMO;
            this.hornetRifleMaxAmmo = HORNET_RIFLE_AMMO;
            this.hornetShotgunAmmo = HORNET_SHOTGUN_AMMO;
            this.hornetRifleAmmo = HORNET_RIFLE_AMMO;
            this.hornetShotgunDamageMin = HORNET_SHOTGUN_DAMAGE_MIN;
            this.hornetShotgunDamageMax = HORNET_SHOTGUN_DAMAGE_MAX;
            this.hornetShotgunPelletsPerShot = HORNET_SHOTGUN_PELLETS_PER_SHOT;
            this.hornetShotgunSpreadAngle = HORNET_SHOTGUN_SPREAD_ANGLE;
            this.hornetForm = 'rifle';
            this.hornetReloadingForm = null;
        } else if (type === 'swordsharpened') {
            this.maxAmmo = SWORD_SHARPENED_AMMO;
            this.ammo = SWORD_SHARPENED_AMMO;
            this.reloadTimeMs = SWORD_SHARPENED_RELOAD_MS;
            this.damage = 0;
            this.damageMin = SWORD_SHARPENED_DAMAGE_MIN;
            this.damageMax = SWORD_SHARPENED_DAMAGE_MAX;
            this.speed = SWORD_SHARPENED_SPEED;
            this.fireRate = SWORD_SHARPENED_FIRE_RATE;
            this.color = '#4da6ff';
            this.projectileSize = SWORD_SHARPENED_SIZE;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.unloadTimeMs = 800;
        } else if (type === 'shotgun') {
            this.maxAmmo = 6;
            this.ammo = 6;
            this.reloadTimeMs = 3000;
            this.damage = SHOTGUN_DAMAGE_MAX;
            this.damageMin = SHOTGUN_DAMAGE_MIN;
            this.damageMax = SHOTGUN_DAMAGE_MAX;
            this.speed = 50;
            this.fireRate = 950;
            this.color = '#ff6600';
            this.projectileSize = 4;
            this.pelletsPerShot = 6;
            this.spreadAngle = 0.11;
        } else if (type === 'familybusiness') {
            this.maxAmmo = FAMILY_BUSINESS_AMMO;
            this.ammo = FAMILY_BUSINESS_AMMO;
            this.reloadTimeMs = FAMILY_BUSINESS_RELOAD_MS;
            this.damage = FAMILY_BUSINESS_DAMAGE_MAX;
            this.damageMin = FAMILY_BUSINESS_DAMAGE_MIN;
            this.damageMax = FAMILY_BUSINESS_DAMAGE_MAX;
            this.speed = 50;
            this.fireRate = FAMILY_BUSINESS_FIRE_RATE;
            this.color = '#d78f49';
            this.projectileSize = 4;
            this.pelletsPerShot = FAMILY_BUSINESS_PELLETS_PER_SHOT;
            this.spreadAngle = FAMILY_BUSINESS_SPREAD_ANGLE;
        } else if (type === 'sodapopper') {
            this.maxAmmo = SODA_POPPER_AMMO;
            this.ammo = SODA_POPPER_AMMO;
            this.reloadTimeMs = SODA_POPPER_RELOAD_MS;
            this.damage = SODA_POPPER_DAMAGE_MAX;
            this.damageMin = SODA_POPPER_DAMAGE_MIN;
            this.damageMax = SODA_POPPER_DAMAGE_MAX;
            this.speed = 50;
            this.fireRate = SODA_POPPER_FIRE_RATE;
            this.color = '#9fe9ff';
            this.projectileSize = 4;
            this.pelletsPerShot = SODA_POPPER_PELLETS_PER_SHOT;
            this.spreadAngle = SODA_POPPER_SPREAD_ANGLE;
        } else if (type === 'forceanature') {
            this.maxAmmo = FORCE_A_NATURE_AMMO;
            this.ammo = FORCE_A_NATURE_AMMO;
            this.reloadTimeMs = FORCE_A_NATURE_RELOAD_MS;
            this.damage = FORCE_A_NATURE_DAMAGE_MAX;
            this.damageMin = FORCE_A_NATURE_DAMAGE_MIN;
            this.damageMax = FORCE_A_NATURE_DAMAGE_MAX;
            this.speed = 50;
            this.fireRate = FORCE_A_NATURE_FIRE_RATE;
            this.color = '#b6f4ff';
            this.projectileSize = 4;
            this.pelletsPerShot = FORCE_A_NATURE_PELLETS_PER_SHOT;
            this.spreadAngle = FORCE_A_NATURE_SPREAD_ANGLE;
            this.selfKnockback = FORCE_A_NATURE_SELF_KNOCKBACK;
            this.enemyKnockback = FORCE_A_NATURE_ENEMY_KNOCKBACK;
        } else if (type === 'magicianhat') {
            this.maxAmmo = MAGICIAN_HAT_AMMO;
            this.ammo = MAGICIAN_HAT_AMMO;
            this.reloadTimeMs = MAGICIAN_HAT_RELOAD_MS;
            this.damage = 0;
            this.damageMin = MAGICIAN_HAT_DAMAGE_MIN;
            this.damageMax = MAGICIAN_HAT_DAMAGE_MAX;
            this.speed = MAGICIAN_HAT_SPEED;
            this.fireRate = MAGICIAN_HAT_FIRE_RATE;
            this.color = '#f6f1ff';
            this.projectileSize = MAGICIAN_HAT_PROJECTILE_SIZE;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'musket') {
            this.maxAmmo = MUSKET_AMMO;
            this.ammo = MUSKET_AMMO;
            this.reloadTimeMs = MUSKET_RELOAD_MS;
            this.damage = 0;
            this.damageMin = MUSKET_DAMAGE_MIN;
            this.damageMax = MUSKET_DAMAGE_MAX;
            this.speed = MUSKET_SPEED;
            this.fireRate = MUSKET_FIRE_RATE;
            this.color = '#f1e6cf';
            this.projectileSize = 5;
            this.pelletsPerShot = 1;
            this.spreadAngle = MUSKET_SPREAD_ANGLE;
        } else if (type === 'widowmaker') {
            this.maxAmmo = WIDOWMAKER_AMMO;
            this.ammo = WIDOWMAKER_AMMO;
            this.reloadTimeMs = WIDOWMAKER_RELOAD_MS;
            this.damage = WIDOWMAKER_DAMAGE_MAX;
            this.damageMin = WIDOWMAKER_DAMAGE_MIN;
            this.damageMax = WIDOWMAKER_DAMAGE_MAX;
            this.speed = 50;
            this.fireRate = WIDOWMAKER_FIRE_RATE;
            this.color = '#ffb76b';
            this.projectileSize = 4;
            this.pelletsPerShot = WIDOWMAKER_PELLETS_PER_SHOT;
            this.spreadAngle = WIDOWMAKER_SPREAD_ANGLE;
        } else if (type === 'machina') {
            this.maxAmmo = 1;
            this.ammo = 1;
            this.reloadTimeMs = 2500;
            this.damage = 0;
            this.damageMin = MACHINA_DAMAGE_MIN;
            this.damageMax = MACHINA_DAMAGE_MAX;
            this.speed = 34;
            this.fireRate = 900;
            this.color = '#ffffff';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'huntsman') {
            this.maxAmmo = 1;
            this.ammo = 1;
            this.reloadTimeMs = 1000;
            this.damage = 0;
            this.damageMin = HUNTSMAN_DAMAGE_MIN;
            this.damageMax = HUNTSMAN_DAMAGE_MAX;
            this.speed = 15;
            this.fireRate = 900;
            this.color = '#f3f3f3';
            this.projectileSize = 8;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.04;
        } else if (type === 'crusaderscrossbow') {
            this.maxAmmo = CRUSADERS_CROSSBOW_AMMO;
            this.ammo = CRUSADERS_CROSSBOW_AMMO;
            this.reloadTimeMs = CRUSADERS_CROSSBOW_RELOAD_MS;
            this.damage = 0;
            this.damageMin = CRUSADERS_CROSSBOW_DAMAGE_MIN;
            this.damageMax = CRUSADERS_CROSSBOW_DAMAGE_MAX;
            this.healMin = CRUSADERS_CROSSBOW_HEAL_MIN;
            this.healMax = CRUSADERS_CROSSBOW_HEAL_MAX;
            this.speed = 15;
            this.fireRate = 1200;
            this.color = '#95f85f';
            this.projectileSize = 7;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.03;
        } else if (type === 'sniper') {
            this.maxAmmo = 1;
            this.ammo = 1;
            this.reloadTimeMs = 2500;
            this.damage = 0;
            this.damageMin = SNIPER_DAMAGE_MIN;
            this.damageMax = SNIPER_DAMAGE_MAX;
            this.speed = 25;
            this.fireRate = 900;
            this.color = '#66d9ff';
            this.projectileSize = 5;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'blutsauger') {
            this.maxAmmo = 50;
            this.ammo = 50;
            this.reloadTimeMs = 2200;
            this.damage = BLUTSAUGER_DAMAGE;
            this.damageMin = BLUTSAUGER_DAMAGE;
            this.damageMax = BLUTSAUGER_DAMAGE;
            this.healMin = BLUTSAUGER_HEAL_MIN;
            this.healMax = BLUTSAUGER_HEAL_MAX;
            this.speed = 9;
            this.fireRate = 180;
            this.color = '#ff4d4d';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.07;
        } else if (type === 'shortcircuit') {
            this.maxAmmo = SHORT_CIRCUIT_AMMO;
            this.ammo = SHORT_CIRCUIT_AMMO;
            this.reloadTimeMs = 3000;
            this.damage = 5;
            this.speed = SHORT_CIRCUIT_SPEED;
            this.fireRate = 850;
            this.color = '#7df9ff';
            this.projectileSize = 12;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'rocketlauncher') {
            this.maxAmmo = ROCKET_LAUNCHER_AMMO;
            this.ammo = ROCKET_LAUNCHER_AMMO;
            this.reloadTimeMs = 2400;
            this.damage = ROCKET_LAUNCHER_DIRECT_DAMAGE;
            this.speed = ROCKET_LAUNCHER_SPEED;
            this.fireRate = 950;
            this.color = '#ff954d';
            this.projectileSize = 9;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.splashRadius = ROCKET_LAUNCHER_SPLASH_RADIUS;
        } else if (type === 'piplauncher') {
            this.maxAmmo = PIP_LAUNCHER_AMMO;
            this.ammo = PIP_LAUNCHER_AMMO;
            this.reloadTimeMs = PIP_LAUNCHER_RELOAD_MS;
            this.damage = 0;
            this.damageMin = PIP_LAUNCHER_DAMAGE_MIN;
            this.damageMax = PIP_LAUNCHER_DAMAGE_MAX;
            this.speed = PIP_LAUNCHER_SPEED;
            this.fireRate = 460;
            this.color = '#94ecff';
            this.projectileSize = 8;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.02;
            this.splashRadius = PIP_LAUNCHER_SPLASH_RADIUS;
        } else if (type === 'beggersbazooka') {
            this.maxAmmo = BEGGERS_BAZOOKA_AMMO;
            this.ammo = BEGGERS_BAZOOKA_AMMO;
            this.reloadTimeMs = BEGGERS_BAZOOKA_RELOAD_MS;
            this.damage = BEGGERS_BAZOOKA_DAMAGE;
            this.speed = BEGGERS_BAZOOKA_SPEED;
            this.fireRate = BEGGERS_BAZOOKA_FIRE_RATE;
            this.color = '#ffa66d';
            this.projectileSize = 9;
            this.pelletsPerShot = 1;
            this.spreadAngle = BEGGERS_BAZOOKA_DEVIATION;
            this.splashRadius = BEGGERS_BAZOOKA_SPLASH_RADIUS;
        } else if (type === 'directhit') {
            this.maxAmmo = DIRECT_HIT_AMMO;
            this.ammo = DIRECT_HIT_AMMO;
            this.reloadTimeMs = 2400;
            this.damage = DIRECT_HIT_DAMAGE;
            this.speed = DIRECT_HIT_SPEED;
            this.fireRate = 950;
            this.color = '#ff8f4f';
            this.projectileSize = 8;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.splashRadius = DIRECT_HIT_SPLASH_RADIUS;
        } else if (type === 'nearmissed') {
            this.maxAmmo = NEAR_MISSED_AMMO;
            this.ammo = NEAR_MISSED_AMMO;
            this.reloadTimeMs = 2400;
            this.damage = NEAR_MISSED_DAMAGE;
            this.speed = NEAR_MISSED_SPEED;
            this.fireRate = 950;
            this.color = '#ffb58a';
            this.projectileSize = 8;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.splashRadius = NEAR_MISSED_SPLASH_RADIUS;
        } else if (type === 'rocketjumper') {
            this.maxAmmo = ROCKET_JUMPER_AMMO;
            this.ammo = ROCKET_JUMPER_AMMO;
            this.reloadTimeMs = 2400;
            this.damage = 0;
            this.speed = ROCKET_JUMPER_SPEED;
            this.fireRate = 700;
            this.color = '#8fd8ff';
            this.projectileSize = 8;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
            this.splashRadius = ROCKET_JUMPER_SPLASH_RADIUS;
            this.knockbackStrength = ROCKET_JUMPER_KNOCKBACK;
        } else if (type === 'medigun') {
            this.maxAmmo = MEDIGUN_AMMO;
            this.ammo = MEDIGUN_AMMO;
            this.reloadTimeMs = MEDIGUN_RELOAD_MS;
            this.damage = 40;
            this.speed = 0;
            this.fireRate = 200;
            this.color = '#ff4d4d';
            this.projectileSize = 0;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'yellowtarge') {
            this.maxAmmo = 1;
            this.ammo = 1;
            this.reloadTimeMs = YELLOW_TARGE_CHARGE_RELOAD_MS;
            this.damage = 0;
            this.speed = 0;
            this.fireRate = 400;
            this.color = '#ffd84d';
            this.projectileSize = 0;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0;
        } else if (type === 'grenadelauncher') {
            this.maxAmmo = GRENADE_LAUNCHER_AMMO;
            this.ammo = GRENADE_LAUNCHER_AMMO;
            this.reloadTimeMs = 4500;
            this.damage = GRENADE_LAUNCHER_DIRECT_DAMAGE;
            this.speed = GRENADE_LAUNCHER_SPEED;
            this.fireRate = 900;
            this.color = '#85ff5e';
            this.projectileSize = 9;
            this.pelletsPerShot = 1;
            this.spreadAngle = 0.03;
            this.splashRadius = GRENADE_LAUNCHER_SPLASH_RADIUS;
            this.splashMaxDamage = GRENADE_LAUNCHER_SPLASH_MAX_DAMAGE;
            this.explodeDelayMs = GRENADE_LAUNCHER_EXPLODE_DELAY_MS;
        } else if (type === 'flamethrower') {
            this.maxAmmo = FLAMETHROWER_AMMO;
            this.ammo = FLAMETHROWER_AMMO;
            this.reloadTimeMs = 3200;
            this.damage = 0;
            this.damageMin = FLAMETHROWER_DAMAGE_MIN;
            this.damageMax = FLAMETHROWER_DAMAGE_MAX;
            this.speed = FLAMETHROWER_SPEED;
            this.fireRate = FLAMETHROWER_FIRE_RATE;
            this.color = '#ff8b3d';
            this.projectileSize = 5;
            this.pelletsPerShot = FLAMETHROWER_PARTICLES_PER_SHOT;
            this.spreadAngle = FLAMETHROWER_SPREAD_ANGLE;
            this.piercingCount = FLAMETHROWER_PIERCE_COUNT;
        } else if (type === 'smg') {
            this.maxAmmo = SMG_AMMO;
            this.ammo = SMG_AMMO;
            this.reloadTimeMs = SMG_RELOAD_MS;
            this.damage = SMG_DAMAGE;
            this.speed = SMG_SPEED;
            this.fireRate = SMG_FIRE_RATE;
            this.color = '#b5ff66';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = SMG_SPREAD_ANGLE;
        } else if (type === 'tommygun') {
            this.maxAmmo = TOMMY_GUN_AMMO;
            this.ammo = TOMMY_GUN_AMMO;
            this.reloadTimeMs = TOMMY_GUN_RELOAD_MS;
            this.damage = TOMMY_GUN_DAMAGE;
            this.speed = TOMMY_GUN_SPEED;
            this.fireRate = TOMMY_GUN_FIRE_RATE;
            this.color = '#d4a35a';
            this.projectileSize = 4;
            this.pelletsPerShot = 1;
            this.spreadAngle = TOMMY_GUN_SPREAD_ANGLE;
            this.damageMin = TOMMY_GUN_DAMAGE;
            this.damageMax = TOMMY_GUN_DAMAGE;
        } else if (type === 'egomagicbullet') {
            this.maxAmmo = EGO_MAGIC_BULLET_AMMO;
            this.ammo = EGO_MAGIC_BULLET_AMMO;
            this.reloadTimeMs = EGO_MAGIC_BULLET_RELOAD_MS;
            this.damage = 0;
            this.damageMin = EGO_MAGIC_BULLET_DAMAGE_MIN;
            this.damageMax = EGO_MAGIC_BULLET_DAMAGE_MAX;
            this.speed = EGO_MAGIC_BULLET_SPEED;
            this.fireRate = EGO_MAGIC_BULLET_FIRE_RATE;
            this.color = '#b575ff';
            this.projectileSize = EGO_MAGIC_BULLET_PROJECTILE_SIZE;
            this.pelletsPerShot = 1;
            this.spreadAngle = EGO_MAGIC_BULLET_SPREAD_ANGLE;
        } else if (type === 'minigun') {
            this.maxAmmo = 200;
            this.ammo = 200;
            this.reloadTimeMs = 8000;
            this.damage = 6;
            this.damageMin = 6;
            this.damageMax = 18;
            this.speed = 15;
            this.fireRate = 220;
            this.color = '#f5d142';
            this.projectileSize = 5;
            this.pelletsPerShot = 2;
            this.spreadAngle = 0.02;

            this.currentFireRate = 320;
            this.minFireRate = 0.005;
            this.rampPerShot = 15;
            this.rampResetDelayMs = 700;
        } else {
            this.maxAmmo = Infinity;
            this.ammo = Infinity;
            this.damage = 0;
            this.speed = 5.2;
            this.fireRate = DEALER_DRAW_INTERVAL_MS;
            this.color = '#ffffff';
            this.projectileSize = 6;
            this.pelletsPerShot = 5;
            this.spreadAngle = 0.08;
        }
    }

    updateReload(now) {
        if (!this.isReloading) return;
        if (now < this.reloadCompleteAt) return;

        this.isReloading = false;

        if (this.type === 'hornet') {
            const reloadForm = this.hornetReloadingForm || this.hornetForm || 'rifle';
            if (reloadForm === 'shotgun') {
                this.hornetShotgunAmmo = this.hornetShotgunMaxAmmo;
                this.ammo = this.hornetShotgunAmmo;
                this.maxAmmo = this.hornetShotgunMaxAmmo;
            } else {
                this.hornetRifleAmmo = this.hornetRifleMaxAmmo;
                this.ammo = this.hornetRifleAmmo;
                this.maxAmmo = this.hornetRifleMaxAmmo;
            }
            this.hornetReloadingForm = null;
            return;
        }

        this.ammo = this.maxAmmo;

        if (this.type === 'minigun') {
            this.currentFireRate = this.fireRate;
        }
    }

    startReload(now, formOverride = null) {
        if (this.ammo === Infinity) return;
        if (this.isReloading) return;
        if (this.reloadTimeMs <= 0) return;

        if (this.type === 'hornet') {
            const targetForm = formOverride || this.hornetForm || 'rifle';
            const currentAmmo = targetForm === 'shotgun' ? this.hornetShotgunAmmo : this.hornetRifleAmmo;
            const targetMaxAmmo = targetForm === 'shotgun' ? this.hornetShotgunMaxAmmo : this.hornetRifleMaxAmmo;
            if (currentAmmo >= targetMaxAmmo) return;

            this.isReloading = true;
            this.hornetReloadingForm = targetForm;
            this.reloadCompleteAt = now + this.reloadTimeMs;
            this.ammo = currentAmmo;
            this.maxAmmo = targetMaxAmmo;
            return;
        }

        if (this.ammo >= this.maxAmmo) return;

        this.isReloading = true;
        const reloadDuration = this.type === 'widowmaker' && this.ammo < WIDOWMAKER_AMMO_PER_SHOT
            ? WIDOWMAKER_LOW_AMMO_RELOAD_MS
            : this.reloadTimeMs;
        const harmonyBonus = this.type === 'harmony' && now < this.harmonyHasteUntil
            ? Math.min(this.harmonyHasteBonus || 0, HARMONY_HASTE_MAX_BONUS)
            : 0;

        if (this.type === 'swordsharpened') {
            const sharpenStacks = Math.max(0, Math.min(SWORD_SHARPENED_SHARPEN_MAX_STACKS, this.swordSharpenStacks || 0));
            const reloadBonus = Math.min(0.6, SWORD_SHARPENED_SHARPEN_RELOAD_BONUS * sharpenStacks);
            this.reloadCompleteAt = now + reloadDuration * (1 - reloadBonus);
            return;
        }

        this.reloadCompleteAt = now + reloadDuration * (1 - harmonyBonus);
    }

    canShoot(now, formOverride = null) {
        this.updateReload(now);

        if (this.type === 'hornet') {
            const activeForm = formOverride || this.hornetForm || 'rifle';
            this.hornetForm = activeForm;

            if (this.isReloading) {
                return false;
            }

            const activeAmmo = activeForm === 'shotgun' ? this.hornetShotgunAmmo : this.hornetRifleAmmo;
            const activeMaxAmmo = activeForm === 'shotgun' ? this.hornetShotgunMaxAmmo : this.hornetRifleMaxAmmo;
            this.ammo = activeAmmo;
            this.maxAmmo = activeMaxAmmo;

            if (activeAmmo <= 0) {
                this.startReload(now, activeForm);
                return false;
            }

            return now - this.lastShotAt >= this.fireRate;
        }

        if (this.isReloading) {
            return false;
        }

        const ammoCost = this.type === 'widowmaker' ? WIDOWMAKER_AMMO_PER_SHOT : 1;

        if (this.ammo !== Infinity && this.ammo < ammoCost) {
            this.startReload(now);
            return false;
        }

        if (this.type === 'minigun' && now - this.lastShotAt > this.rampResetDelayMs) {
            this.currentFireRate = this.fireRate;
        }

        const hasAmmo = this.ammo === Infinity || this.ammo >= ammoCost;
        const harmonyBonus = this.type === 'harmony' && now < this.harmonyHasteUntil
            ? Math.min(this.harmonyHasteBonus || 0, HARMONY_HASTE_MAX_BONUS)
            : 0;
        const activeFireRate = this.type === 'minigun'
            ? this.currentFireRate
            : (this.type === 'harmony' ? this.fireRate * (1 - harmonyBonus) : this.fireRate);

        const sharpenStacks = this.type === 'swordsharpened'
            ? Math.max(0, Math.min(SWORD_SHARPENED_SHARPEN_MAX_STACKS, this.swordSharpenStacks || 0))
            : 0;
        const swordFireRate = this.type === 'swordsharpened'
            ? this.fireRate * (1 - Math.min(0.6, SWORD_SHARPENED_SHARPEN_SPEED_BONUS * sharpenStacks))
            : activeFireRate;
        return hasAmmo && now - this.lastShotAt >= swordFireRate;
    }

    shoot(now, formOverride = null) {
        if (!this.canShoot(now, formOverride)) return false;

        if (this.type === 'hornet') {
            const activeForm = formOverride || this.hornetForm || 'rifle';
            if (activeForm === 'shotgun') {
                this.hornetShotgunAmmo = Math.max(0, this.hornetShotgunAmmo - 1);
                this.ammo = this.hornetShotgunAmmo;
                this.maxAmmo = this.hornetShotgunMaxAmmo;
                if (this.hornetShotgunAmmo <= 0) {
                    this.startReload(now, 'shotgun');
                }
            } else {
                this.hornetRifleAmmo = Math.max(0, this.hornetRifleAmmo - 1);
                this.ammo = this.hornetRifleAmmo;
                this.maxAmmo = this.hornetRifleMaxAmmo;
                if (this.hornetRifleAmmo <= 0) {
                    this.startReload(now, 'rifle');
                }
            }

            this.lastShotAt = now;
            return true;
        }

        const ammoCost = this.type === 'widowmaker' ? WIDOWMAKER_AMMO_PER_SHOT : 1;
        if (this.ammo !== Infinity) {
            this.ammo -= ammoCost;
            if (this.type !== 'widowmaker' && this.ammo <= 0) {
                this.startReload(now);
            }
        }

        if (this.type === 'minigun') {
            this.currentFireRate = Math.max(this.minFireRate, this.currentFireRate - this.rampPerShot);
        }

        this.lastShotAt = now;
        return true;
    }

    addHarmonyHaste(now, damageTaken, maxHp) {
        if (this.type !== 'harmony') return;

        const bonusGain = Math.min(HARMONY_HASTE_MAX_BONUS, Math.max(0, damageTaken) / Math.max(1, maxHp));
        this.harmonyHasteBonus = Math.min(HARMONY_HASTE_MAX_BONUS, (this.harmonyHasteBonus || 0) + bonusGain);
        this.harmonyHasteUntil = Math.max(this.harmonyHasteUntil, now + HARMONY_HASTE_DURATION_MS);
    }

    refundAmmo(amount) {
        if (this.ammo === Infinity) return;
        const gain = Math.max(0, Math.round(amount));
        if (gain <= 0) return;
        this.ammo = Math.min(this.maxAmmo, this.ammo + gain);
    }

    getInfo(now = Date.now()) {
        this.updateReload(now);

        if (this.type === 'dealer') {
            return 'DEALER';
        }

        if (this.isReloading) {
            const remainingMs = Math.max(0, this.reloadCompleteAt - now);
            const remainingSec = (remainingMs / 1000).toFixed(1);
            return `${this.type.toUpperCase()} (RELOADING ${remainingSec}s)`;
        }

        if (this.type === 'sniper') {
            return `SNIPER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'revolver') {
            return `REVOLVER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'egoloneliness') {
            return `EGO WEAPON LONELINESS (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'penitence') {
            return 'EGO WEAPON PENITENCE';
        }

        if (this.type === 'paradiselost') {
            return `EGO WEAPON PARADISE LOST (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'solemnvow') {
            return `EGO WEAPON SOLEMN VOW (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'harmony') {
            return `EGO WEAPON HARMONY (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'hornet') {
            const form = this.hornetForm || 'rifle';
            const label = form === 'shotgun' ? 'SHOTGUN' : 'RIFLE';
            const ammo = form === 'shotgun' ? this.hornetShotgunAmmo : this.hornetRifleAmmo;
            const maxAmmo = form === 'shotgun' ? this.hornetShotgunMaxAmmo : this.hornetRifleMaxAmmo;
            return `EGO WEAPON HORNET ${label} (${ammo}/${maxAmmo})`;
        }

        if (this.type === 'widowmaker') {
            return `WIDOWMAKER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'sodapopper') {
            return `SODA POPPER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'forceanature') {
            return `FORCE-A-NATURE (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'familybusiness') {
            return `FAMILY BUSINESS (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'magicianhat') {
            return `MAGICIAN HAT (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'musket') {
            return `MUSKET (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'machina') {
            return `MACHINA (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'huntsman') {
            return `HUNTSMAN (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'crusaderscrossbow') {
            return `CRUSADER'S CROSSBOW (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'smg') {
            return `SMG (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'tommygun') {
            return `TOMMY GUN (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'egomagicbullet') {
            return `EGO MAGIC BULLET (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'minigun') {
            return `MINIGUN (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'blutsauger') {
            return `BLUTSAUGER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'shortcircuit') {
            return `SHORT CIRCUIT (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'rocketlauncher') {
            return `ROCKET (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'piplauncher') {
            return `PIP LAUNCHER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'beggersbazooka') {
            return `BEGGER'S BAZOOKA (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'directhit') {
            return `DIRECT HIT (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'nearmissed') {
            return `NEAR MISSED (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'rocketjumper') {
            return `ROCKET JUMPER (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'medigun') {
            return `MEDIGUN (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'yellowtarge') {
            return `CHARGIN' TARGE (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'grenadelauncher') {
            return `GRENADE (${this.ammo}/${this.maxAmmo})`;
        }

        if (this.type === 'flamethrower') {
            return `FLAMETHROWER (${this.ammo}/${this.maxAmmo})`;
        }

        const ammoText = this.ammo === Infinity ? '∞' : this.ammo;
        const maxAmmoText = this.maxAmmo === Infinity ? '∞' : this.maxAmmo;
        return `${this.type.toUpperCase()} (${ammoText}/${maxAmmoText})`;
    }
}