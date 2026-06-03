import * as W from './weapons/index.js';

function createImg(src, fallback) {
    const i = new Image();
    if (fallback) i.onerror = () => { i.src = fallback; };
    i.src = src;
    return i;
}

function waitFor(img) {
    if (img.complete) return Promise.resolve(img);
    return new Promise(resolve => {
        const done = () => resolve(img);
        img.onload = done;
        img.onerror = done;
    });
}

export function createImages() {
    const images = {
        // ── Projectile images ──────────────────────────────────────────────────
        pistolProjectileImage:               createImg('assets/bullet_pistolpng.png'),
        syringeAmmoImage:                    createImg('assets/RED_Syringe_Gun_Ammo.png'),
        rocketAmmoImage:                     createImg('assets/48px-Rocket.png'),
        grenadeAmmoImage:                    createImg('assets/33px-Grenade_proj_red.png'),
        arrowProjectileImage:                createImg('assets/Arrow_proj.png'),
        crusadersCrossbowProjectileImage:    createImg("assets/Festive_Crusader's_Crossbow_Projectile_RED.png"),
        explosiveFlaskImage:                 createImg('assets/Explosive_Flask.png', 'assets/BottleScreen.png'),
        bunnyProjectileImage:                createImg('assets/cute-bunny-rabbit-on-isolated-transparent-background-free-png-1435143763.png'),
        magicBulletProjectileImage:          createImg('assets/MagicBullet.webp'),
        appleProjectileImage:                createImg('assets/apple-transparent-background-free-png-3539805000.png', 'assets/Apple.png'),

        // ── Effect / overlay images ────────────────────────────────────────────
        funeralDeadButterfliesPortraitImage: createImg(W.solemnVow.images.portrait, W.solemnVow.images.portraitFallback),
        kaleidoscopeMuzzleImage:             createImg(W.solemnVow.images.muzzle),
        scrumpyBottleImage:                  createImg('assets/BottleScreen.png'),
        smokeImage:                          createImg('assets/smoke_PNG55177-3419754768.png'),
        sporeImage:                          createImg('assets/25px-Spore.webp'),
        sporeRoundImage:                     createImg('assets/25px-Spore_Round_-Base-.webp'),
        deadRingerImage:                     createImg('assets/Dead_Ringer.png'),
        blessingShieldImage:                 createImg(W.swordSharpened.images.shield),
        crimsonScarMarkImage:                createImg(W.crimsonScar.images.mark),

        // ── Weapon held sprites ────────────────────────────────────────────────
        truePistolWeaponImage:               createImg(W.pistol.image),
        revolverWeaponImage:                 createImg(W.revolver.image),
        sniperRifleImage:                    createImg(W.sniper.image),
        machinaImage:                        createImg(W.machina.image),
        huntsmanImage:                       createImg(W.huntsman.image),
        blutsaugerImage:                     createImg(W.blutsauger.image),
        shotgunWeaponImage:                  createImg(W.shotgun.image),
        familyBusinessWeaponImage:           createImg(W.familyBusiness.image),
        widowmakerWeaponImage:               createImg(W.widowmaker.image),
        sodaPopperWeaponImage:               createImg(W.sodaPopper.image),
        forceANatureWeaponImage:             createImg(W.forceANature.image),
        smgImage:                            createImg(W.smg.image),
        tommyGunImage:                       createImg(W.tommyGun.image),
        egoWeaponMagicBulletImage:           createImg(W.egoMagicBullet.images.weapon),
        portalImage:                         createImg(W.egoMagicBullet.images.portal),
        egoWeaponLonelinessImage:            createImg(W.egoLoneliness.image),
        magicianHatWeaponImage:              createImg(W.magicianHat.image),
        musketWeaponImage:                   createImg(W.musket.image),
        crusadersCrossbowImage:              createImg(W.crusadersCrossbow.image),
        egoWeaponPenitenceImage:             createImg(W.penitence.image),
        egoWeaponParadiseLostImage:          createImg(W.paradiseLost.image),
        egoWeaponSolemnVowBlackImage:        createImg(W.solemnVow.images.black),
        egoWeaponSolemnVowWhiteImage:        createImg(W.solemnVow.images.white),
        egoWeaponHarmonyImage:               createImg(W.harmony.image),
        swordSharpenedImage:                 createImg(W.swordSharpened.images.weapon),
        adorationWeaponImage:                createImg(W.adoration.image),
        faintaromaWeaponImage:               createImg(W.faintAroma.image),
        hairsprayImage:                      createImg(W.hairspray.image),
        hypocrisyWeaponImage:                createImg(W.hypocrisy.image),
        crimsonScarGunImage:                 createImg(W.crimsonScar.images.gun),
        crimsonScarBladeImage:               createImg(W.crimsonScar.images.blade),
        yellowTargeImage:                    createImg(W.yellowTarge.image),
        shortCircuitImage:                   createImg(W.shortCircuit.image),
        medigunImage:                        createImg(W.medigun.image),
        rocketLauncherImage:                 createImg(W.rocketLauncher.image),
        pipLauncherImage:                    createImg(W.pipLauncher.image),
        beggersBazookaImage:                 createImg(W.beggersBasooka.image),
        directHitImage:                      createImg(W.directHit.image),
        rocketJumperImage:                   createImg(W.rocketJumper.image),
        grenadeLauncherImage:                createImg(W.grenadeLauncher.image),
        lochnLoadImage:                      createImg(W.lochNLoad.image),
        flamethrowerImage:                   createImg(W.flamethrower.image),
        minigunImage:                        createImg(W.minigun.image),
        pinksWeaponImage:                    createImg(W.egoPinks.image),
        sodaWeaponImage:                     createImg(W.egoSoda.image),
        laetitiaWeaponImage:                 createImg(W.laetitia.image),
        hornetRifleImage:                    createImg(W.hornet.images.rifle),
        hornetShotgunImage:                  createImg(W.hornet.images.shotgun),
    };

    // ── Pickup icons ───────────────────────────────────────────────────────────
    images.pickupIcons = {
        // Weapon drops — reuse already-created Image objects where possible
        pistol:           images.truePistolWeaponImage,
        revolver:         images.revolverWeaponImage,
        shotgun:          images.shotgunWeaponImage,
        familybusiness:   images.familyBusinessWeaponImage,
        sodapopper:       images.sodaPopperWeaponImage,
        forceanature:     images.forceANatureWeaponImage,
        musket:           images.musketWeaponImage,
        magicianhat:      images.magicianHatWeaponImage,
        widowmaker:       images.widowmakerWeaponImage,
        poker:            createImg(W.dealer.image),
        sniper:           images.sniperRifleImage,
        machina:          images.machinaImage,
        huntsman:         images.huntsmanImage,
        crusaderscrossbow: images.crusadersCrossbowImage,
        smg:              images.smgImage,
        tommygun:         images.tommyGunImage,
        egomagicbullet:   images.egoWeaponMagicBulletImage,
        egoloneliness:    images.egoWeaponLonelinessImage,
        penitence:        images.egoWeaponPenitenceImage,
        paradiselost:     images.egoWeaponParadiseLostImage,
        harmony:          images.egoWeaponHarmonyImage,
        hornet:           images.hornetRifleImage,
        solemnvow:        images.egoWeaponSolemnVowBlackImage,
        egolovehate:      createImg(W.egoLoveHate.image),
        soundofstar:      createImg(W.soundOfStar.image),
        swordsharpened:   images.swordSharpenedImage,
        minigun:          images.minigunImage,
        blutsauger:       images.blutsaugerImage,
        shortcircuit:     images.shortCircuitImage,
        rocketlauncher:   images.rocketLauncherImage,
        piplauncher:      images.pipLauncherImage,
        beggersbazooka:   images.beggersBazookaImage,
        directhit:        images.directHitImage,
        nearmissed:       images.directHitImage,
        rocketjumper:     images.rocketJumperImage,
        yellowtarge:      images.yellowTargeImage,
        medigun:          images.medigunImage,
        grenadelauncher:  images.grenadeLauncherImage,
        lochnload:        images.lochnLoadImage,
        faintaroma:       images.faintaromaWeaponImage,
        hairspray:        images.hairsprayImage,
        adoration:        images.adorationWeaponImage,
        hypocrisy:        images.hypocrisyWeaponImage,
        crimsonscar:      createImg(W.crimsonScar.images.pickup),
        egopinks:         images.pinksWeaponImage,
        egosoda:          images.sodaWeaponImage,
        laetitia:         images.laetitiaWeaponImage,
        flamethrower:     images.flamethrowerImage,
        // Utility pickup icons
        ammoico:          createImg('assets/Ammoico.png'),
        healthico:        createImg('assets/Healthico.png'),
        ubercharge:       createImg('assets/UberCharge_Canteen.png'),
        critical:         createImg('assets/Critical_Hit_Boost_Canteen.png'),
        speed:            createImg('assets/SPEED.png'),
        explosiveflask:   images.explosiveFlaskImage,
        scrumpybottle:    images.scrumpyBottleImage,
        bombanomicron:    createImg('assets/RED_Bombinomicon.png'),
        deadringer:       images.deadRingerImage,
    };

    return images;
}

export async function loadImages() {
    const images = createImages();
    const seen = new Set();
    const all = [...Object.values(images), ...Object.values(images.pickupIcons)]
        .filter(v => {
            if (!(v instanceof Image) || seen.has(v)) return false;
            seen.add(v);
            return true;
        });
    await Promise.all(all.map(waitFor));
    return images;
}
