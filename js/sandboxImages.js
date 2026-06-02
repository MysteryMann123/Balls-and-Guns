// Loads every game image and returns them in the exact order Game's constructor expects,
// plus a structured pickupIcons map. Import this instead of duplicating the loading in
// each entry-point file.

function img(src, fallbackSrc) {
    const i = new Image();
    i.src = src;
    if (fallbackSrc) i.onerror = () => { i.src = fallbackSrc; };
    return i;
}

export function loadGameImages() {
    const pistolProjectile          = img('assets/bullet_pistolpng.png');
    const syringeAmmo               = img('assets/RED_Syringe_Gun_Ammo.png');
    const rocketAmmo                = img('assets/48px-Rocket.png');
    const grenadeAmmo               = img('assets/33px-Grenade_proj_red.png');
    const arrowProjectile           = img('assets/Arrow_proj.png');
    const crusadersCrossbowProjectile = img("assets/Festive_Crusader's_Crossbow_Projectile_RED.png");
    const explosiveFlask            = img('assets/Explosive_Flask.png', 'assets/BottleScreen.png');
    const bunnyProjectile           = img('assets/cute-bunny-rabbit-on-isolated-transparent-background-free-png-1435143763.png');
    const magicBulletProjectile     = img('assets/MagicBullet.webp');
    const appleProjectile           = img('assets/apple-transparent-background-free-png-3539805000.png', 'assets/Apple.png');
    const sniperRifle               = img('assets/Sniper_rifle.png');
    const machina                   = img('assets/Machina.png');
    const huntsman                  = img('assets/Huntsman.png');
    const crusadersCrossbow         = img("assets/RED_Crusader's_Crossbow.png");
    const smg                       = img('assets/SMG.png');
    const tommyGun                  = img('assets/TOMMY_GUN.png');
    const egoMagicBullet            = img('assets/EGOWeaponMagicBullet.webp');
    const egoLoneliness             = img('assets/EGOWeaponLoneliness.webp');
    const egoPenitence              = img('assets/EGOWeaponPenitence.webp');
    const egoParadiseLost           = img('assets/EGOWeaponParadiseLost.webp');
    const egoHarmony                = img('assets/EGOWeaponHarmony.webp');
    const egoSolemnVowBlack         = img('assets/EGOWeaponSolemnVow_Black.jpg');
    const egoSolemnVowWhite         = img('assets/EGOWeaponSolemnVow_White.jpg');
    const kaleidoscopeMuzzle        = img('assets/KaleidoscopeMuzzle.png', 'assets/ButterfliesSpriteSheet.png');
    const funeralPortrait           = img('assets/FuneraloftheDeadButterfliesPortrait.webp', 'assets/ButterfliesSpriteSheet.png');
    const portal                    = img('assets/DerFreischützPortal.png');
    const minigun                   = img('assets/Minigun_IMG.png');
    const blutsauger                = img('assets/Blutsauger.png');
    const shortCircuit              = img('assets/Short_circuit.png');
    const rocketLauncher            = img('assets/Rocket_launcher.png');
    const pipLauncher               = img('assets/Pip_launcher.png');
    const beggersBasooka            = img("assets/Beggar's_Bazooka.png");
    const directHit                 = img('assets/Directhittransparent.png');
    const rocketJumper              = img('assets/Rocket_Jumper.png');
    const yellowTarge               = img('assets/YellowTarge.png');
    const medigun                   = img('assets/RED_Medigun.png');
    const grenadeLauncher           = img('assets/Grenade_Launcher.png');
    const lochnLoad                 = img('assets/LochnLoad.png');
    const faintaromaWeapon          = img('assets/EGOWeaponReverberation.webp');
    const hairspray                 = img('assets/Emz_hairspray.jpg');
    const adorationWeapon           = img('assets/EGOWeaponAdoration.webp');
    const hypocrisyWeapon           = img('assets/EGOWeaponHypocrisy.webp');
    const flamethrower              = img('assets/RedFlamethrowerpng.png');
    const deadRinger                = img('assets/Dead_Ringer.png');
    const truePistol                = img('assets/Pistol_True.png');
    const revolver                  = img('assets/Pistol.png');
    const shotgun                   = img('assets/Shotgun_IMG.png');
    const familyBusiness            = img('assets/Familybusiness.PNG');
    const sodaPopper                = img('assets/250px-Soda_Popper.PNG');
    const forceANature              = img('assets/Force-A-Nature.png', 'assets/250px-Soda_Popper.PNG');
    const magicianHat               = img('assets/Magic-Hat-PNG-Image-File-3052888691.png');
    const musket                    = img('assets/rifle-on-a-transparent-free-png-864369422.png');
    const widowmaker                = img('assets/Widowmaker.png');
    const scrumpyBottle             = img('assets/BottleScreen.png');
    const smoke                     = img('assets/smoke_PNG55177-3419754768.png');
    const hornetRifle               = img('assets/EGOWeaponHornet.png');
    const hornetShotgun             = img('assets/Lobotomy_E.G.O_Hornet_Alteration_Shotgun_Sprite.png');
    const spore                     = img('assets/25px-Spore.webp');
    const sporeRound                = img('assets/25px-Spore_Round_-Base-.webp');
    const swordSharpened            = img('assets/EGOWeaponSwordSharpenedbyTears.webp');
    const blessingShield            = img('assets/KnightOfDespairBlessingShield.png');
    const egoWeaponLoveHate         = img('assets/EGOWeaponIntheNameofLoveandHate.webp');
    const crimsonScarGun            = img('assets/EGOCrimsonGun.png');
    const crimsonScarBlade          = img('assets/EGOCrimsonBlade.png');
    const crimsonScarMark           = img('assets/LittleRedTarget.webp');
    const crimsonScarPickup         = img('assets/EGOWeaponCrimsonScar.webp');
    const pinksWeapon               = img('assets/EGOWeaponPinks.webp');
    const sodaWeapon                = img('assets/EGOWeaponSoda.webp');
    const laetitiaWeapon            = img('assets/EGOWeaponLaetitia.webp');

    const pickupPoker               = img('assets/Poker.jpg');
    const pickupAmmo                = img('assets/Ammoico.png');
    const pickupHealth              = img('assets/Healthico.png');
    const pickupUber                = img('assets/UberCharge_Canteen.png');
    const pickupCritical            = img('assets/Critical_Hit_Boost_Canteen.png');
    const pickupSpeed               = img('assets/SPEED.png');
    const pickupBombanomicron       = img('assets/RED_Bombinomicon.png');

    const pickupIcons = {
        pistol: truePistol,
        revolver,
        shotgun,
        familybusiness: familyBusiness,
        sodapopper: sodaPopper,
        forceanature: forceANature,
        musket,
        magicianhat: magicianHat,
        widowmaker,
        poker: pickupPoker,
        sniper: sniperRifle,
        machina,
        huntsman,
        crusaderscrossbow: crusadersCrossbow,
        smg,
        tommygun: tommyGun,
        egomagicbullet: egoMagicBullet,
        egoloneliness: egoLoneliness,
        penitence: egoPenitence,
        paradiselost: egoParadiseLost,
        harmony: egoHarmony,
        hornet: hornetRifle,
        solemnvow: egoSolemnVowBlack,
        egolovehate: egoWeaponLoveHate,
        minigun,
        blutsauger,
        shortcircuit: shortCircuit,
        rocketlauncher: rocketLauncher,
        piplauncher: pipLauncher,
        beggersbazooka: beggersBasooka,
        directhit: directHit,
        nearmissed: directHit,
        rocketjumper: rocketJumper,
        yellowtarge: yellowTarge,
        medigun,
        grenadelauncher: grenadeLauncher,
        lochnload: lochnLoad,
        faintaroma: faintaromaWeapon,
        hairspray,
        adoration: adorationWeapon,
        hypocrisy: hypocrisyWeapon,
        crimsonscar: crimsonScarPickup,
        egopinks: pinksWeapon,
        egosoda: sodaWeapon,
        laetitia: laetitiaWeapon,
        flamethrower,
        ammoico: pickupAmmo,
        healthico: pickupHealth,
        ubercharge: pickupUber,
        critical: pickupCritical,
        speed: pickupSpeed,
        explosiveflask: explosiveFlask,
        scrumpybottle: scrumpyBottle,
        bombanomicron: pickupBombanomicron,
        deadringer: deadRinger,
    };

    // Returned in the exact positional order Game's constructor declares them.
    return {
        args: [
            pistolProjectile, syringeAmmo, rocketAmmo, grenadeAmmo,
            arrowProjectile, crusadersCrossbowProjectile, explosiveFlask,
            bunnyProjectile, magicBulletProjectile, appleProjectile,
            sniperRifle, machina, huntsman, crusadersCrossbow,
            smg, tommyGun,
            egoMagicBullet, egoLoneliness, egoPenitence, egoParadiseLost,
            egoHarmony, egoSolemnVowBlack, egoSolemnVowWhite,
            kaleidoscopeMuzzle, funeralPortrait, portal,
            minigun, blutsauger, shortCircuit,
            rocketLauncher, pipLauncher, beggersBasooka, directHit,
            rocketJumper, yellowTarge, medigun, grenadeLauncher, lochnLoad, faintaromaWeapon, hairspray, adorationWeapon, flamethrower,
            deadRinger, truePistol, revolver, shotgun, familyBusiness,
            sodaPopper, forceANature, magicianHat, musket, widowmaker,
            scrumpyBottle, smoke, hornetRifle, hornetShotgun,
            spore, sporeRound, swordSharpened, blessingShield, hypocrisyWeapon,
            crimsonScarGun, crimsonScarBlade, crimsonScarMark, pinksWeapon, sodaWeapon, laetitiaWeapon,
            pickupIcons,
        ],
        smoke,
    };
}
