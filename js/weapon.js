import * as W from './weapons/index.js';

const WEAPON_CONFIGS = {
    pistol: {
        maxAmmo:         W.pistol.MAX_AMMO,
        reloadTimeMs:    W.pistol.RELOAD_MS,
        damage:          W.pistol.DAMAGE,
        speed:           W.pistol.SPEED,
        fireRate:        W.pistol.FIRE_RATE,
        color:           W.pistol.COLOR,
        projectileSize:  W.pistol.PROJECTILE_SIZE,
        pelletsPerShot:  W.pistol.PELLETS_PER_SHOT,
        spreadAngle:     W.pistol.SPREAD_ANGLE,
    },
    revolver: {
        maxAmmo:         W.revolver.MAX_AMMO,
        reloadTimeMs:    W.revolver.RELOAD_MS,
        damage:          W.revolver.DAMAGE,
        speed:           W.revolver.SPEED,
        fireRate:        W.revolver.FIRE_RATE,
        color:           W.revolver.COLOR,
        projectileSize:  W.revolver.PROJECTILE_SIZE,
        pelletsPerShot:  W.revolver.PELLETS_PER_SHOT,
        spreadAngle:     W.revolver.SPREAD_ANGLE,
    },
    egoloneliness: {
        maxAmmo:          W.egoLoneliness.AMMO,
        reloadTimeMs:     W.egoLoneliness.RELOAD_MS,
        damage:           W.egoLoneliness.DAMAGE,
        speed:            W.egoLoneliness.SPEED,
        fireRate:         W.egoLoneliness.FIRE_RATE,
        color:            W.egoLoneliness.COLOR,
        projectileSize:   W.egoLoneliness.PROJECTILE_SIZE,
        pelletsPerShot:   W.egoLoneliness.PELLETS_PER_SHOT,
        spreadAngle:      W.egoLoneliness.SPREAD_ANGLE,
        slowDurationMs:   W.egoLoneliness.SLOW_DURATION_MS,
        slowMultiplier:   W.egoLoneliness.SLOW_MULTIPLIER,
    },
    penitence: {
        maxAmmo:         W.penitence.MAX_AMMO,
        reloadTimeMs:    W.penitence.RELOAD_MS,
        damage:          0,
        damageMin:       W.penitence.DAMAGE_MIN,
        damageMax:       W.penitence.DAMAGE_MAX,
        speed:           W.penitence.SPEED,
        fireRate:        W.penitence.FIRE_RATE,
        color:           W.penitence.COLOR,
        projectileSize:  W.penitence.PROJECTILE_SIZE,
        pelletsPerShot:  W.penitence.PELLETS_PER_SHOT,
        spreadAngle:     W.penitence.SPREAD_ANGLE,
    },
    paradiselost: {
        maxAmmo:         W.paradiseLost.AMMO,
        reloadTimeMs:    W.paradiseLost.RELOAD_MS,
        damage:          0,
        damageMin:       W.paradiseLost.DAMAGE_MIN,
        damageMax:       W.paradiseLost.DAMAGE_MAX,
        speed:           W.paradiseLost.SPEED,
        fireRate:        W.paradiseLost.FIRE_RATE,
        color:           W.paradiseLost.COLOR,
        projectileSize:  W.paradiseLost.PROJECTILE_SIZE,
        pelletsPerShot:  W.paradiseLost.PELLETS_PER_SHOT,
        spreadAngle:     W.paradiseLost.SPREAD_ANGLE,
    },
    solemnvow: {
        maxAmmo:         W.solemnVow.AMMO,
        reloadTimeMs:    W.solemnVow.RELOAD_MS,
        damage:          0,
        speed:           W.solemnVow.BLACK_PROJECTILE_SPEED,
        fireRate:        W.solemnVow.FIRE_RATE,
        color:           W.solemnVow.COLOR,
        projectileSize:  W.solemnVow.BLACK_PROJECTILE_SIZE,
        pelletsPerShot:  W.solemnVow.BLACK_PELLETS_PER_SHOT,
        spreadAngle:     W.solemnVow.SPREAD_ANGLE,
    },
    harmony: {
        maxAmmo:         W.harmony.AMMO,
        reloadTimeMs:    W.harmony.RELOAD_MS,
        damage:          0,
        damageMin:       W.harmony.DAMAGE_MIN,
        damageMax:       W.harmony.DAMAGE_MAX,
        speed:           W.harmony.PROJECTILE_SPEED,
        fireRate:        W.harmony.FIRE_RATE,
        color:           W.harmony.COLOR,
        projectileSize:  W.harmony.PROJECTILE_SIZE,
        pelletsPerShot:  W.harmony.PELLETS_PER_SHOT,
        spreadAngle:     W.harmony.SPREAD_ANGLE,
    },
    hornet: {
        maxAmmo:                   W.hornet.RIFLE_AMMO,
        reloadTimeMs:              W.hornet.RELOAD_MS,
        damage:                    0,
        damageMin:                 W.hornet.RIFLE_DAMAGE_MIN,
        damageMax:                 W.hornet.RIFLE_DAMAGE_MAX,
        speed:                     W.hornet.RIFLE_SPEED,
        fireRate:                  W.hornet.FIRE_RATE,
        color:                     W.hornet.COLOR,
        projectileSize:            W.hornet.RIFLE_PROJECTILE_SIZE,
        pelletsPerShot:            W.hornet.PELLETS_PER_SHOT,
        spreadAngle:               W.hornet.SPREAD_ANGLE,
        hornetRangeSwitchDistance: W.hornet.RANGE_SWITCH_DISTANCE,
        hornetShotgunMaxAmmo:      W.hornet.SHOTGUN_AMMO,
        hornetRifleMaxAmmo:        W.hornet.RIFLE_AMMO,
        hornetShotgunAmmo:         W.hornet.SHOTGUN_AMMO,
        hornetRifleAmmo:           W.hornet.RIFLE_AMMO,
        hornetShotgunDamageMin:    W.hornet.SHOTGUN_DAMAGE_MIN,
        hornetShotgunDamageMax:    W.hornet.SHOTGUN_DAMAGE_MAX,
        hornetShotgunPelletsPerShot: W.hornet.SHOTGUN_PELLETS_PER_SHOT,
        hornetShotgunSpreadAngle:  W.hornet.SHOTGUN_SPREAD_ANGLE,
        hornetForm:                W.hornet.INITIAL_FORM,
        hornetReloadingForm:       null,
    },
    soundofstar: {
        maxAmmo:         W.soundOfStar.MAX_AMMO,
        reloadTimeMs:    W.soundOfStar.CHARGE_MS,
        damage:          0,
        damageMin:       W.soundOfStar.DAMAGE_MIN,
        damageMax:       W.soundOfStar.DAMAGE_MAX,
        speed:           W.soundOfStar.SPEED,
        fireRate:        W.soundOfStar.BURST_FIRE_RATE,
        color:           W.soundOfStar.COLOR,
        projectileSize:  W.soundOfStar.PROJECTILE_SIZE,
        pelletsPerShot:  W.soundOfStar.PELLETS_PER_SHOT,
        spreadAngle:     W.soundOfStar.SPREAD_ANGLE,
    },
    egolovehate: {
        maxAmmo:         W.egoLoveHate.AMMO,
        reloadTimeMs:    W.egoLoveHate.RELOAD_MS,
        damage:          0,
        speed:           W.egoLoveHate.SPEED,
        fireRate:        W.egoLoveHate.FIRE_RATE,
        color:           W.egoLoveHate.COLOR,
        projectileSize:  W.egoLoveHate.PROJECTILE_SIZE,
        pelletsPerShot:  W.egoLoveHate.PELLETS_PER_SHOT,
        spreadAngle:     W.egoLoveHate.SPREAD_ANGLE,
    },
    swordsharpened: {
        maxAmmo:         W.swordSharpened.AMMO,
        reloadTimeMs:    W.swordSharpened.RELOAD_MS,
        damage:          0,
        damageMin:       W.swordSharpened.DAMAGE_MIN,
        damageMax:       W.swordSharpened.DAMAGE_MAX,
        speed:           W.swordSharpened.SPEED,
        fireRate:        W.swordSharpened.FIRE_RATE,
        color:           W.swordSharpened.COLOR,
        projectileSize:  W.swordSharpened.SIZE,
        pelletsPerShot:  W.swordSharpened.PELLETS_PER_SHOT,
        spreadAngle:     W.swordSharpened.SPREAD_ANGLE,
        unloadTimeMs:    W.swordSharpened.UNLOAD_MS,
    },
    shotgun: {
        maxAmmo:         W.shotgun.MAX_AMMO,
        reloadTimeMs:    W.shotgun.RELOAD_MS,
        damage:          W.shotgun.DAMAGE_MAX,
        damageMin:       W.shotgun.DAMAGE_MIN,
        damageMax:       W.shotgun.DAMAGE_MAX,
        speed:           W.shotgun.SPEED,
        fireRate:        W.shotgun.FIRE_RATE,
        color:           W.shotgun.COLOR,
        projectileSize:  W.shotgun.PROJECTILE_SIZE,
        pelletsPerShot:  W.shotgun.PELLETS_PER_SHOT,
        spreadAngle:     W.shotgun.SPREAD_ANGLE,
    },
    familybusiness: {
        maxAmmo:         W.familyBusiness.AMMO,
        reloadTimeMs:    W.familyBusiness.RELOAD_MS,
        damage:          W.familyBusiness.DAMAGE_MAX,
        damageMin:       W.familyBusiness.DAMAGE_MIN,
        damageMax:       W.familyBusiness.DAMAGE_MAX,
        speed:           W.familyBusiness.SPEED,
        fireRate:        W.familyBusiness.FIRE_RATE,
        color:           W.familyBusiness.COLOR,
        projectileSize:  W.familyBusiness.PROJECTILE_SIZE,
        pelletsPerShot:  W.familyBusiness.PELLETS_PER_SHOT,
        spreadAngle:     W.familyBusiness.SPREAD_ANGLE,
    },
    sodapopper: {
        maxAmmo:         W.sodaPopper.AMMO,
        reloadTimeMs:    W.sodaPopper.RELOAD_MS,
        damage:          W.sodaPopper.DAMAGE_MAX,
        damageMin:       W.sodaPopper.DAMAGE_MIN,
        damageMax:       W.sodaPopper.DAMAGE_MAX,
        speed:           W.sodaPopper.SPEED,
        fireRate:        W.sodaPopper.FIRE_RATE,
        color:           W.sodaPopper.COLOR,
        projectileSize:  W.sodaPopper.PROJECTILE_SIZE,
        pelletsPerShot:  W.sodaPopper.PELLETS_PER_SHOT,
        spreadAngle:     W.sodaPopper.SPREAD_ANGLE,
    },
    forceanature: {
        maxAmmo:         W.forceANature.AMMO,
        reloadTimeMs:    W.forceANature.RELOAD_MS,
        damage:          W.forceANature.DAMAGE_MAX,
        damageMin:       W.forceANature.DAMAGE_MIN,
        damageMax:       W.forceANature.DAMAGE_MAX,
        speed:           W.forceANature.SPEED,
        fireRate:        W.forceANature.FIRE_RATE,
        color:           W.forceANature.COLOR,
        projectileSize:  W.forceANature.PROJECTILE_SIZE,
        pelletsPerShot:  W.forceANature.PELLETS_PER_SHOT,
        spreadAngle:     W.forceANature.SPREAD_ANGLE,
        selfKnockback:   W.forceANature.SELF_KNOCKBACK,
        enemyKnockback:  W.forceANature.ENEMY_KNOCKBACK,
    },
    magicianhat: {
        maxAmmo:         W.magicianHat.AMMO,
        reloadTimeMs:    W.magicianHat.RELOAD_MS,
        damage:          0,
        damageMin:       W.magicianHat.DAMAGE_MIN,
        damageMax:       W.magicianHat.DAMAGE_MAX,
        speed:           W.magicianHat.SPEED,
        fireRate:        W.magicianHat.FIRE_RATE,
        color:           W.magicianHat.COLOR,
        projectileSize:  W.magicianHat.PROJECTILE_SIZE,
        pelletsPerShot:  W.magicianHat.PELLETS_PER_SHOT,
        spreadAngle:     W.magicianHat.SPREAD_ANGLE,
    },
    musket: {
        maxAmmo:         W.musket.AMMO,
        reloadTimeMs:    W.musket.RELOAD_MS,
        damage:          0,
        damageMin:       W.musket.DAMAGE_MIN,
        damageMax:       W.musket.DAMAGE_MAX,
        speed:           W.musket.SPEED,
        fireRate:        W.musket.FIRE_RATE,
        color:           W.musket.COLOR,
        projectileSize:  W.musket.PROJECTILE_SIZE,
        pelletsPerShot:  W.musket.PELLETS_PER_SHOT,
        spreadAngle:     W.musket.SPREAD_ANGLE,
    },
    widowmaker: {
        maxAmmo:         W.widowmaker.AMMO,
        reloadTimeMs:    W.widowmaker.RELOAD_MS,
        damage:          W.widowmaker.DAMAGE_MAX,
        damageMin:       W.widowmaker.DAMAGE_MIN,
        damageMax:       W.widowmaker.DAMAGE_MAX,
        speed:           W.widowmaker.SPEED,
        fireRate:        W.widowmaker.FIRE_RATE,
        color:           W.widowmaker.COLOR,
        projectileSize:  W.widowmaker.PROJECTILE_SIZE,
        pelletsPerShot:  W.widowmaker.PELLETS_PER_SHOT,
        spreadAngle:     W.widowmaker.SPREAD_ANGLE,
    },
    machina: {
        maxAmmo:         W.machina.MAX_AMMO,
        reloadTimeMs:    W.machina.RELOAD_MS,
        damage:          0,
        damageMin:       W.machina.DAMAGE_MIN,
        damageMax:       W.machina.DAMAGE_MAX,
        speed:           W.machina.SPEED,
        fireRate:        W.machina.FIRE_RATE,
        color:           W.machina.COLOR,
        projectileSize:  W.machina.PROJECTILE_SIZE,
        pelletsPerShot:  W.machina.PELLETS_PER_SHOT,
        spreadAngle:     W.machina.SPREAD_ANGLE,
    },
    egopinks: {
        maxAmmo:         W.egoPinks.MAX_AMMO,
        reloadTimeMs:    W.egoPinks.RELOAD_MS,
        damage:          0,
        damageMin:       W.egoPinks.DAMAGE_MIN,
        damageMax:       W.egoPinks.DAMAGE_MAX,
        speed:           W.egoPinks.SPEED,
        fireRate:        W.egoPinks.FIRE_RATE,
        color:           W.egoPinks.COLOR,
        projectileSize:  W.egoPinks.PROJECTILE_SIZE,
        pelletsPerShot:  W.egoPinks.PELLETS_PER_SHOT,
        spreadAngle:     W.egoPinks.SPREAD_ANGLE,
    },
    egosoda: {
        maxAmmo:         W.egoSoda.MAX_AMMO,
        reloadTimeMs:    W.egoSoda.RELOAD_MS,
        damage:          W.egoSoda.DAMAGE,
        speed:           W.egoSoda.SPEED,
        fireRate:        W.egoSoda.FIRE_RATE,
        color:           W.egoSoda.COLOR,
        projectileSize:  W.egoSoda.PROJECTILE_SIZE,
        pelletsPerShot:  W.egoSoda.PELLETS_PER_SHOT,
        spreadAngle:     W.egoSoda.SPREAD_ANGLE,
    },
    laetitia: {
        maxAmmo:         W.laetitia.MAX_AMMO,
        reloadTimeMs:    W.laetitia.RELOAD_MS,
        damage:          0,
        damageMin:       W.laetitia.DAMAGE_MIN,
        damageMax:       W.laetitia.DAMAGE_MAX,
        speed:           W.laetitia.SPEED,
        fireRate:        W.laetitia.FIRE_RATE,
        color:           W.laetitia.COLOR,
        projectileSize:  W.laetitia.PROJECTILE_SIZE,
        pelletsPerShot:  W.laetitia.PELLETS_PER_SHOT,
        spreadAngle:     W.laetitia.SPREAD_ANGLE,
    },
    huntsman: {
        maxAmmo:         W.huntsman.MAX_AMMO,
        reloadTimeMs:    W.huntsman.RELOAD_MS,
        damage:          0,
        damageMin:       W.huntsman.DAMAGE_MIN,
        damageMax:       W.huntsman.DAMAGE_MAX,
        speed:           W.huntsman.SPEED,
        fireRate:        W.huntsman.FIRE_RATE,
        color:           W.huntsman.COLOR,
        projectileSize:  W.huntsman.PROJECTILE_SIZE,
        pelletsPerShot:  W.huntsman.PELLETS_PER_SHOT,
        spreadAngle:     W.huntsman.SPREAD_ANGLE,
    },
    crusaderscrossbow: {
        maxAmmo:         W.crusadersCrossbow.AMMO,
        reloadTimeMs:    W.crusadersCrossbow.RELOAD_MS,
        damage:          0,
        damageMin:       W.crusadersCrossbow.DAMAGE_MIN,
        damageMax:       W.crusadersCrossbow.DAMAGE_MAX,
        healMin:         W.crusadersCrossbow.HEAL_MIN,
        healMax:         W.crusadersCrossbow.HEAL_MAX,
        speed:           W.crusadersCrossbow.SPEED,
        fireRate:        W.crusadersCrossbow.FIRE_RATE,
        color:           W.crusadersCrossbow.COLOR,
        projectileSize:  W.crusadersCrossbow.PROJECTILE_SIZE,
        pelletsPerShot:  W.crusadersCrossbow.PELLETS_PER_SHOT,
        spreadAngle:     W.crusadersCrossbow.SPREAD_ANGLE,
    },
    sniper: {
        maxAmmo:         W.sniper.MAX_AMMO,
        reloadTimeMs:    W.sniper.RELOAD_MS,
        damage:          0,
        damageMin:       W.sniper.DAMAGE_MIN,
        damageMax:       W.sniper.DAMAGE_MAX,
        speed:           W.sniper.SPEED,
        fireRate:        W.sniper.FIRE_RATE,
        color:           W.sniper.COLOR,
        projectileSize:  W.sniper.PROJECTILE_SIZE,
        pelletsPerShot:  W.sniper.PELLETS_PER_SHOT,
        spreadAngle:     W.sniper.SPREAD_ANGLE,
    },
    blutsauger: {
        maxAmmo:         W.blutsauger.MAX_AMMO,
        reloadTimeMs:    W.blutsauger.RELOAD_MS,
        damage:          W.blutsauger.DAMAGE,
        damageMin:       W.blutsauger.DAMAGE,
        damageMax:       W.blutsauger.DAMAGE,
        healMin:         W.blutsauger.HEAL_MIN,
        healMax:         W.blutsauger.HEAL_MAX,
        speed:           W.blutsauger.SPEED,
        fireRate:        W.blutsauger.FIRE_RATE,
        color:           W.blutsauger.COLOR,
        projectileSize:  W.blutsauger.PROJECTILE_SIZE,
        pelletsPerShot:  W.blutsauger.PELLETS_PER_SHOT,
        spreadAngle:     W.blutsauger.SPREAD_ANGLE,
    },
    shortcircuit: {
        maxAmmo:         W.shortCircuit.AMMO,
        reloadTimeMs:    W.shortCircuit.RELOAD_MS,
        damage:          W.shortCircuit.DAMAGE,
        speed:           W.shortCircuit.SPEED,
        fireRate:        W.shortCircuit.FIRE_RATE,
        color:           W.shortCircuit.COLOR,
        projectileSize:  W.shortCircuit.PROJECTILE_SIZE,
        pelletsPerShot:  W.shortCircuit.PELLETS_PER_SHOT,
        spreadAngle:     W.shortCircuit.SPREAD_ANGLE,
    },
    rocketlauncher: {
        maxAmmo:         W.rocketLauncher.AMMO,
        reloadTimeMs:    W.rocketLauncher.RELOAD_MS,
        damage:          W.rocketLauncher.DIRECT_DAMAGE,
        speed:           W.rocketLauncher.SPEED,
        fireRate:        W.rocketLauncher.FIRE_RATE,
        color:           W.rocketLauncher.COLOR,
        projectileSize:  W.rocketLauncher.PROJECTILE_SIZE,
        pelletsPerShot:  W.rocketLauncher.PELLETS_PER_SHOT,
        spreadAngle:     W.rocketLauncher.SPREAD_ANGLE,
        splashRadius:    W.rocketLauncher.SPLASH_RADIUS,
    },
    piplauncher: {
        maxAmmo:         W.pipLauncher.AMMO,
        reloadTimeMs:    W.pipLauncher.RELOAD_MS,
        damage:          0,
        damageMin:       W.pipLauncher.DAMAGE_MIN,
        damageMax:       W.pipLauncher.DAMAGE_MAX,
        speed:           W.pipLauncher.SPEED,
        fireRate:        W.pipLauncher.FIRE_RATE,
        color:           W.pipLauncher.COLOR,
        projectileSize:  W.pipLauncher.PROJECTILE_SIZE,
        pelletsPerShot:  W.pipLauncher.PELLETS_PER_SHOT,
        spreadAngle:     W.pipLauncher.SPREAD_ANGLE,
        splashRadius:    W.pipLauncher.SPLASH_RADIUS,
    },
    beggersbazooka: {
        maxAmmo:         W.beggersBasooka.AMMO,
        reloadTimeMs:    W.beggersBasooka.RELOAD_MS,
        damage:          W.beggersBasooka.DAMAGE,
        speed:           W.beggersBasooka.SPEED,
        fireRate:        W.beggersBasooka.FIRE_RATE,
        color:           W.beggersBasooka.COLOR,
        projectileSize:  W.beggersBasooka.PROJECTILE_SIZE,
        pelletsPerShot:  W.beggersBasooka.PELLETS_PER_SHOT,
        spreadAngle:     W.beggersBasooka.DEVIATION,
        splashRadius:    W.beggersBasooka.SPLASH_RADIUS,
    },
    directhit: {
        maxAmmo:         W.directHit.AMMO,
        reloadTimeMs:    W.directHit.RELOAD_MS,
        damage:          W.directHit.DAMAGE,
        speed:           W.directHit.SPEED,
        fireRate:        W.directHit.FIRE_RATE,
        color:           W.directHit.COLOR,
        projectileSize:  W.directHit.PROJECTILE_SIZE,
        pelletsPerShot:  W.directHit.PELLETS_PER_SHOT,
        spreadAngle:     W.directHit.SPREAD_ANGLE,
        splashRadius:    W.directHit.SPLASH_RADIUS,
    },
    nearmissed: {
        maxAmmo:         W.nearMissed.AMMO,
        reloadTimeMs:    W.nearMissed.RELOAD_MS,
        damage:          W.nearMissed.DAMAGE,
        speed:           W.nearMissed.SPEED,
        fireRate:        W.nearMissed.FIRE_RATE,
        color:           W.nearMissed.COLOR,
        projectileSize:  W.nearMissed.PROJECTILE_SIZE,
        pelletsPerShot:  W.nearMissed.PELLETS_PER_SHOT,
        spreadAngle:     W.nearMissed.SPREAD_ANGLE,
        splashRadius:    W.nearMissed.SPLASH_RADIUS,
    },
    rocketjumper: {
        maxAmmo:          W.rocketJumper.AMMO,
        reloadTimeMs:     W.rocketJumper.RELOAD_MS,
        damage:           0,
        speed:            W.rocketJumper.SPEED,
        fireRate:         W.rocketJumper.FIRE_RATE,
        color:            W.rocketJumper.COLOR,
        projectileSize:   W.rocketJumper.PROJECTILE_SIZE,
        pelletsPerShot:   W.rocketJumper.PELLETS_PER_SHOT,
        spreadAngle:      W.rocketJumper.SPREAD_ANGLE,
        splashRadius:     W.rocketJumper.SPLASH_RADIUS,
        knockbackStrength: W.rocketJumper.KNOCKBACK,
    },
    medigun: {
        maxAmmo:         W.medigun.AMMO,
        reloadTimeMs:    W.medigun.RELOAD_MS,
        damage:          W.medigun.DAMAGE,
        speed:           W.medigun.SPEED,
        fireRate:        W.medigun.FIRE_RATE,
        color:           W.medigun.COLOR,
        projectileSize:  W.medigun.PROJECTILE_SIZE,
        pelletsPerShot:  W.medigun.PELLETS_PER_SHOT,
        spreadAngle:     W.medigun.SPREAD_ANGLE,
    },
    yellowtarge: {
        maxAmmo:         W.yellowTarge.MAX_AMMO,
        reloadTimeMs:    W.yellowTarge.CHARGE_RELOAD_MS,
        damage:          W.yellowTarge.DAMAGE,
        speed:           W.yellowTarge.SPEED,
        fireRate:        W.yellowTarge.FIRE_RATE,
        color:           W.yellowTarge.COLOR,
        projectileSize:  W.yellowTarge.PROJECTILE_SIZE,
        pelletsPerShot:  W.yellowTarge.PELLETS_PER_SHOT,
        spreadAngle:     W.yellowTarge.SPREAD_ANGLE,
    },
    grenadelauncher: {
        maxAmmo:          W.grenadeLauncher.AMMO,
        reloadTimeMs:     W.grenadeLauncher.RELOAD_MS,
        damage:           W.grenadeLauncher.DIRECT_DAMAGE,
        speed:            W.grenadeLauncher.SPEED,
        fireRate:         W.grenadeLauncher.FIRE_RATE,
        color:            W.grenadeLauncher.COLOR,
        projectileSize:   W.grenadeLauncher.PROJECTILE_SIZE,
        pelletsPerShot:   W.grenadeLauncher.PELLETS_PER_SHOT,
        spreadAngle:      W.grenadeLauncher.SPREAD_ANGLE,
        splashRadius:     W.grenadeLauncher.SPLASH_RADIUS,
        splashMaxDamage:  W.grenadeLauncher.SPLASH_MAX_DAMAGE,
        explodeDelayMs:   W.grenadeLauncher.EXPLODE_DELAY_MS,
    },
    lochnload: {
        maxAmmo:          W.lochNLoad.AMMO,
        reloadTimeMs:     W.lochNLoad.RELOAD_MS,
        damage:           W.lochNLoad.DIRECT_DAMAGE,
        speed:            W.lochNLoad.SPEED,
        fireRate:         W.lochNLoad.FIRE_RATE,
        color:            W.lochNLoad.COLOR,
        projectileSize:   W.lochNLoad.PROJECTILE_SIZE,
        pelletsPerShot:   W.lochNLoad.PELLETS_PER_SHOT,
        spreadAngle:      W.lochNLoad.SPREAD_ANGLE,
        splashRadius:     W.lochNLoad.SPLASH_RADIUS,
        splashMaxDamage:  W.lochNLoad.SPLASH_MAX_DAMAGE,
    },
    faintaroma: {
        maxAmmo:         W.faintAroma.MAX_AMMO,
        reloadTimeMs:    W.faintAroma.RELOAD_MS,
        damage:          W.faintAroma.DAMAGE_MIN,
        damageMax:       W.faintAroma.DAMAGE_MAX,
        speed:           W.faintAroma.SPEED,
        fireRate:        W.faintAroma.FIRE_RATE,
        color:           W.faintAroma.COLOR,
        projectileSize:  W.faintAroma.PROJECTILE_SIZE,
        pelletsPerShot:  W.faintAroma.PELLETS_PER_SHOT,
        spreadAngle:     W.faintAroma.SPREAD_ANGLE,
        piercingCount:   W.faintAroma.PIERCE_COUNT,
    },
    hairspray: {
        maxAmmo:         W.hairspray.AMMO,
        reloadTimeMs:    W.hairspray.RELOAD_MS,
        damage:          W.hairspray.TICK_DAMAGE_MIN,
        damageMax:       W.hairspray.TICK_DAMAGE_MAX,
        speed:           W.hairspray.SPEED,
        fireRate:        W.hairspray.FIRE_RATE,
        color:           W.hairspray.COLOR,
        projectileSize:  W.hairspray.CLOUD_RADIUS,
        pelletsPerShot:  W.hairspray.PELLETS_PER_SHOT,
        spreadAngle:     W.hairspray.SPREAD_ANGLE,
    },
    adoration: {
        maxAmmo:         W.adoration.AMMO,
        reloadTimeMs:    W.adoration.RELOAD_MS,
        damage:          W.adoration.DAMAGE_MIN,
        damageMax:       W.adoration.DAMAGE_MAX,
        speed:           W.adoration.SPEED,
        fireRate:        W.adoration.FIRE_RATE,
        color:           W.adoration.COLOR,
        projectileSize:  W.adoration.PROJECTILE_SIZE,
        pelletsPerShot:  W.adoration.PELLETS_PER_SHOT,
        spreadAngle:     W.adoration.SPREAD_ANGLE,
        piercingCount:   W.adoration.PIERCE_COUNT,
    },
    hypocrisy: {
        maxAmmo:         W.hypocrisy.AMMO,
        reloadTimeMs:    W.hypocrisy.RELOAD_MS,
        damage:          0,
        damageMin:       W.hypocrisy.DAMAGE_MIN,
        damageMax:       W.hypocrisy.DAMAGE_MAX,
        speed:           W.hypocrisy.SPEED,
        fireRate:        W.hypocrisy.FIRE_RATE_BASE,
        color:           W.hypocrisy.COLOR,
        projectileSize:  W.hypocrisy.PROJECTILE_SIZE,
        pelletsPerShot:  W.hypocrisy.PELLETS_PER_SHOT,
        spreadAngle:     W.hypocrisy.SPREAD_ANGLE,
    },
    crimsonscar: {
        maxAmmo:         W.crimsonScar.GUN_AMMO,
        reloadTimeMs:    W.crimsonScar.RELOAD_MS,
        damage:          0,
        damageMin:       W.crimsonScar.GUN_DAMAGE_MIN,
        damageMax:       W.crimsonScar.GUN_DAMAGE_MAX,
        speed:           W.crimsonScar.GUN_SPEED,
        fireRate:        W.crimsonScar.FIRE_RATE,
        color:           W.crimsonScar.COLOR,
        projectileSize:  W.crimsonScar.GUN_PROJECTILE_SIZE,
        pelletsPerShot:  W.crimsonScar.PELLETS_PER_SHOT,
        spreadAngle:     W.crimsonScar.SPREAD_ANGLE,
    },
    flamethrower: {
        maxAmmo:         W.flamethrower.AMMO,
        reloadTimeMs:    W.flamethrower.RELOAD_MS,
        damage:          0,
        damageMin:       W.flamethrower.DAMAGE_MIN,
        damageMax:       W.flamethrower.DAMAGE_MAX,
        speed:           W.flamethrower.SPEED,
        fireRate:        W.flamethrower.FIRE_RATE,
        color:           W.flamethrower.COLOR,
        projectileSize:  W.flamethrower.PROJECTILE_SIZE,
        pelletsPerShot:  W.flamethrower.PARTICLES_PER_SHOT,
        spreadAngle:     W.flamethrower.SPREAD_ANGLE,
        piercingCount:   W.flamethrower.PIERCE_COUNT,
    },
    smg: {
        maxAmmo:         W.smg.AMMO,
        reloadTimeMs:    W.smg.RELOAD_MS,
        damage:          W.smg.DAMAGE,
        speed:           W.smg.SPEED,
        fireRate:        W.smg.FIRE_RATE,
        color:           W.smg.COLOR,
        projectileSize:  W.smg.PROJECTILE_SIZE,
        pelletsPerShot:  W.smg.PELLETS_PER_SHOT,
        spreadAngle:     W.smg.SPREAD_ANGLE,
    },
    tommygun: {
        maxAmmo:         W.tommyGun.AMMO,
        reloadTimeMs:    W.tommyGun.RELOAD_MS,
        damage:          W.tommyGun.DAMAGE,
        damageMin:       W.tommyGun.DAMAGE,
        damageMax:       W.tommyGun.DAMAGE,
        speed:           W.tommyGun.SPEED,
        fireRate:        W.tommyGun.FIRE_RATE,
        color:           W.tommyGun.COLOR,
        projectileSize:  W.tommyGun.PROJECTILE_SIZE,
        pelletsPerShot:  W.tommyGun.PELLETS_PER_SHOT,
        spreadAngle:     W.tommyGun.SPREAD_ANGLE,
    },
    egomagicbullet: {
        maxAmmo:         W.egoMagicBullet.AMMO,
        reloadTimeMs:    W.egoMagicBullet.RELOAD_MS,
        damage:          0,
        damageMin:       W.egoMagicBullet.DAMAGE_MIN,
        damageMax:       W.egoMagicBullet.DAMAGE_MAX,
        speed:           W.egoMagicBullet.SPEED,
        fireRate:        W.egoMagicBullet.FIRE_RATE,
        color:           W.egoMagicBullet.COLOR,
        projectileSize:  W.egoMagicBullet.PROJECTILE_SIZE,
        pelletsPerShot:  W.egoMagicBullet.PELLETS_PER_SHOT,
        spreadAngle:     W.egoMagicBullet.SPREAD_ANGLE,
    },
    minigun: {
        maxAmmo:          W.minigun.MAX_AMMO,
        reloadTimeMs:     W.minigun.RELOAD_MS,
        damage:           W.minigun.DAMAGE_MIN,
        damageMin:        W.minigun.DAMAGE_MIN,
        damageMax:        W.minigun.DAMAGE_MAX,
        speed:            W.minigun.SPEED,
        fireRate:         W.minigun.FIRE_RATE,
        color:            W.minigun.COLOR,
        projectileSize:   W.minigun.PROJECTILE_SIZE,
        pelletsPerShot:   W.minigun.PELLETS_PER_SHOT,
        spreadAngle:      W.minigun.SPREAD_ANGLE,
        currentFireRate:  W.minigun.INITIAL_FIRE_RATE,
        minFireRate:      W.minigun.MIN_FIRE_RATE,
        rampPerShot:      W.minigun.RAMP_PER_SHOT,
        rampResetDelayMs: W.minigun.RAMP_RESET_DELAY_MS,
    },
};

const DEALER_CONFIG = {
    maxAmmo:         W.dealer.MAX_AMMO,
    reloadTimeMs:    W.dealer.RELOAD_MS,
    damage:          W.dealer.DAMAGE,
    speed:           W.dealer.SPEED,
    fireRate:        W.dealer.DRAW_INTERVAL_MS,
    color:           W.dealer.COLOR,
    projectileSize:  W.dealer.PROJECTILE_SIZE,
    pelletsPerShot:  W.dealer.PELLETS_PER_SHOT,
    spreadAngle:     W.dealer.SPREAD_ANGLE,
};

const _weaponNS = {
    pistol:            W.pistol,
    revolver:          W.revolver,
    egoloneliness:     W.egoLoneliness,
    penitence:         W.penitence,
    paradiselost:      W.paradiseLost,
    solemnvow:         W.solemnVow,
    harmony:           W.harmony,
    soundofstar:       W.soundOfStar,
    egolovehate:       W.egoLoveHate,
    swordsharpened:    W.swordSharpened,
    egomagicbullet:    W.egoMagicBullet,
    shotgun:           W.shotgun,
    familybusiness:    W.familyBusiness,
    sodapopper:        W.sodaPopper,
    forceanature:      W.forceANature,
    magicianhat:       W.magicianHat,
    musket:            W.musket,
    widowmaker:        W.widowmaker,
    machina:           W.machina,
    egopinks:          W.egoPinks,
    egosoda:           W.egoSoda,
    laetitia:          W.laetitia,
    huntsman:          W.huntsman,
    crusaderscrossbow: W.crusadersCrossbow,
    sniper:            W.sniper,
    blutsauger:        W.blutsauger,
    shortcircuit:      W.shortCircuit,
    rocketlauncher:    W.rocketLauncher,
    piplauncher:       W.pipLauncher,
    beggersbazooka:    W.beggersBasooka,
    directhit:         W.directHit,
    nearmissed:        W.nearMissed,
    rocketjumper:      W.rocketJumper,
    medigun:           W.medigun,
    yellowtarge:       W.yellowTarge,
    grenadelauncher:   W.grenadeLauncher,
    lochnload:         W.lochNLoad,
    faintaroma:        W.faintAroma,
    hairspray:         W.hairspray,
    adoration:         W.adoration,
    hypocrisy:         W.hypocrisy,
    crimsonscar:       W.crimsonScar,
    hornet:            W.hornet,
    dealer:            W.dealer,
    flamethrower:      W.flamethrower,
    smg:               W.smg,
    tommygun:          W.tommyGun,
    minigun:           W.minigun,
};

export class Weapon {
    constructor(type) {
        this.type = type;
        this.lastShotAt = 0;
        this.reloadTimeMs = 0;
        this.isReloading = false;
        this.reloadCompleteAt = 0;
        this.harmonyHasteBonus = 0;
        this.harmonyHasteUntil = 0;

        Object.assign(this, WEAPON_CONFIGS[type] ?? DEALER_CONFIG);
        this.ammo = this.maxAmmo ?? 0;
    }

    updateReload(now) {
        if (!this.isReloading) return;
        if (now < this.reloadCompleteAt) return;

        this.isReloading = false;

        const ns = _weaponNS[this.type];
        if (ns?.onReloadComplete?.(this, now)) return;

        this.ammo = this.maxAmmo;
        ns?.onAfterAmmoReset?.(this, now);
    }

    startReload(now, formOverride = null) {
        if (this.ammo === Infinity) return;
        if (this.isReloading) return;
        if (this.reloadTimeMs <= 0) return;

        const ns = _weaponNS[this.type];
        if (ns?.onStartReload?.(this, now, formOverride)) return;

        if (this.ammo >= this.maxAmmo) return;

        this.isReloading = true;
        this.reloadCompleteAt = now + (ns?.getReloadDuration?.(this, now) ?? this.reloadTimeMs);
    }

    canShoot(now, formOverride = null) {
        this.updateReload(now);

        const ns = _weaponNS[this.type];
        if (ns?.onCanShoot) return ns.onCanShoot(this, now, formOverride);

        if (this.isReloading) return false;

        const ammoCost = ns?.getAmmoCost?.(this) ?? 1;
        if (this.ammo !== Infinity && this.ammo < ammoCost) {
            this.startReload(now);
            return false;
        }

        const hasAmmo = this.ammo === Infinity || this.ammo >= ammoCost;
        const effectiveFireRate = ns?.getEffectiveFireRate?.(this, now) ?? this.fireRate;
        return hasAmmo && now - this.lastShotAt >= effectiveFireRate;
    }

    shoot(now, formOverride = null) {
        if (!this.canShoot(now, formOverride)) return false;

        const ns = _weaponNS[this.type];
        if (ns?.onShoot?.(this, now, formOverride)) return true;

        const ammoCost = ns?.getAmmoCost?.(this) ?? 1;
        if (this.ammo !== Infinity) {
            this.ammo -= ammoCost;
            if (this.ammo <= 0 && !ns?.SUPPRESS_AUTO_RELOAD) {
                this.startReload(now);
            }
        }

        ns?.onAfterShot?.(this, now);
        this.lastShotAt = now;
        return true;
    }

    addHarmonyHaste(now, damageTaken, maxHp) {
        _weaponNS[this.type]?.onAddHaste?.(this, now, damageTaken, maxHp);
    }

    refundAmmo(amount) {
        if (this.ammo === Infinity) return;
        const gain = Math.max(0, Math.round(amount));
        if (gain <= 0) return;
        this.ammo = Math.min(this.maxAmmo, this.ammo + gain);
    }

    getInfo(now = Date.now()) {
        this.updateReload(now);

        const config = _weaponNS[this.type];
        if (config?.getInfo) {
            return config.getInfo(this, now);
        }

        const name = config?.DISPLAY_NAME ?? this.type.toUpperCase();

        if (this.isReloading) {
            const remainingSec = (Math.max(0, this.reloadCompleteAt - now) / 1000).toFixed(1);
            return `${name} (RELOADING ${remainingSec}s)`;
        }

        const ammoText = this.ammo === Infinity ? '∞' : this.ammo;
        const maxAmmoText = this.maxAmmo === Infinity ? '∞' : this.maxAmmo;
        return `${name} (${ammoText}/${maxAmmoText})`;
    }
}
