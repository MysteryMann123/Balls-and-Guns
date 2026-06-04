import * as C from '../../constants.js';
import { healthico } from '../../utilities/items/healthico.js';
import { ammoico } from '../../utilities/items/ammoico.js';
import { ubercharge } from '../../utilities/items/ubercharge.js';
import { critical } from '../../utilities/items/critical.js';
import { speed } from '../../utilities/items/speed.js';
import { explosiveFlask } from '../../utilities/items/explosiveFlask.js';
import { scrumpyBottle } from '../../utilities/items/scrumpyBottle.js';
import { bombanomicron } from '../../utilities/items/bombanomicron.js';
import { deadRinger } from '../../utilities/items/deadRinger.js';

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
    if (value === 'egolovehate') return 'EGO: In the Name of Love and Hate';
    if (value === 'soundofstar') return 'EGO: Sound of a Star';
    if (value === 'swordsharpened') return 'EGO Weapon Sword Sharpened by Tears';
    if (value === 'solemnvow') return 'EGO Weapon Solemn Vow';
    if (value === 'magicianhat') return 'Magician Hat';
    if (value === 'crusaderscrossbow') return "Crusader's Crossbow";
    if (value === 'grenadelauncher') return 'Grenade Launcher';
    if (value === 'lochnload') return 'Loch-n-Load';
    if (value === 'hypocrisy') return 'EGO: Hypocrisy';
    if (value === 'crimsonscar') return 'EGO: CrimsonScar';
    if (value === 'egopinks') return 'EGO: Pinks';
    if (value === 'egosoda') return 'EGO: Soda';
    if (value === 'laetitia') return 'EGO: Laetitia';
    if (value === 'adoration') return 'EGO: Adoration';
    if (value === 'faintaroma') return 'Faint Aroma';
    if (value === 'hairspray') return 'Hairspray';
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

const TYPE_IMAGES = {
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
    egolovehate: 'assets/EGOWeaponIntheNameofLoveandHate.webp',
    soundofstar: 'assets/EGOWeaponSoundofaStar.webp',
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
    lochnload: 'assets/LochnLoad.png',
    hypocrisy: 'assets/EGOWeaponHypocrisy.webp',
    crimsonscar: 'assets/EGOWeaponCrimsonScar.webp',
    egopinks: 'assets/EGOWeaponPinks.webp',
    egosoda: 'assets/EGOWeaponSoda.webp',
    laetitia: 'assets/EGOWeaponLaetitia.webp',
    adoration: 'assets/EGOWeaponAdoration.webp',
    faintaroma: 'assets/EGOWeaponReverberation.webp',
    hairspray: 'assets/Emz_hairspray.jpg',
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

const UTILITY_STATS = {
    ammoico: {
        title: 'Ammo Crate',
        subtitle: 'Utility Drop',
        chips: [
            ['Effect', 'Refill + Double Shot'],
            ['Double Shot Duration', `${(ammoico.DOUBLE_SHOT_MS / 1000).toFixed(0)}s`]
        ],
        notes: [
            'Fully restores ammo for the active weapon on pickup.',
            `For ${ammoico.DOUBLE_SHOT_MS / 1000}s after pickup, every shot fires a second projectile at a slight spread angle.`,
            'Works for all projectile weapons. Hitscan weapons (shotgun, widowmaker, etc.) also fire a duplicate ray.'
        ]
    },
    healthico: {
        title: 'Health Pack',
        subtitle: 'Utility Drop',
        chips: [
            ['Instant Heal', `${healthico.HEAL} HP`],
            ['Regen', `+${healthico.REGEN_PER_TICK} HP / ${healthico.REGEN_INTERVAL_MS / 1000}s`],
            ['Regen Duration', `${healthico.REGEN_DURATION_MS / 1000}s`],
        ],
        notes: [
            `Instantly heals ${healthico.HEAL} HP on pickup.`,
            `Then regenerates +${healthico.REGEN_PER_TICK} HP every ${healthico.REGEN_INTERVAL_MS / 1000}s for ${healthico.REGEN_DURATION_MS / 1000}s (${healthico.REGEN_PER_TICK * (healthico.REGEN_DURATION_MS / healthico.REGEN_INTERVAL_MS)} HP total).`,
        ]
    },
    ubercharge: {
        title: 'Ubercharge Canteen',
        subtitle: 'Utility Drop',
        chips: [
            ['Duration', `${(ubercharge.DURATION_MS / 1000).toFixed(1)}s`],
            ['Heal/sec', `${ubercharge.HEAL_PER_SEC}`]
        ],
        notes: ['Grants invulnerability and healing over time while active.']
    },
    critical: {
        title: 'Critical Canteen',
        subtitle: 'Utility Drop',
        chips: [
            ['Duration', `${(critical.DURATION_MS / 1000).toFixed(1)}s`],
            ['Damage x', `${critical.DAMAGE_MULTIPLIER}`],
            ['Heal/sec', `${critical.HEAL_PER_SEC}`]
        ],
        notes: ['Boosts outgoing damage and grants light regen.']
    },
    speed: {
        title: 'Speed Boost',
        subtitle: 'Utility Drop',
        chips: [
            ['Max Speed +', `${speed.PERMANENT_BOOST}`],
            ['Min Speed +', `${(speed.PERMANENT_BOOST * 0.2).toFixed(2)}`]
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
            ['Throw Damage', `${scrumpyBottle.BOTTLE_THROW_DAMAGE_MIN} - ${scrumpyBottle.BOTTLE_THROW_DAMAGE_MAX}`],
            ['Puddle Damage/Tick', `${scrumpyBottle.PUDDLE_DAMAGE_MIN} - ${scrumpyBottle.PUDDLE_DAMAGE_MAX}`],
            ['Puddle Duration', `${(scrumpyBottle.PUDDLE_DURATION_MS / 1000).toFixed(1)}s`],
            ['Resistance', `${Math.round(scrumpyBottle.DAMAGE_REDUCTION * 100)}% reduced incoming damage`]
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
            ['Projectile Count', `${bombanomicron.PROJECTILE_MIN} - ${bombanomicron.PROJECTILE_MAX}`],
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
            ['Cooldown', `${(deadRinger.PICKUP_COOLDOWN_MS / 1000).toFixed(0)}s`],
            ['Duration', `${(deadRinger.DURATION_MS / 1000).toFixed(1)}s`],
            ['Damage Reduction', `${Math.round(deadRinger.DAMAGE_REDUCTION * 100)}%`],
            ['Heal On Trigger', `${Math.round(deadRinger.HEAL_MAX_HP_RATIO * 100)}% max HP`]
        ],
        notes: [
            'Arms one charge per ball and shows icon above the ball.',
            'On trigger: damage cut, heal burst, speed boost, untargetable invis, and decoy fly-out.'
        ]
    }
};

export { formatLabel, toMsText, TYPE_IMAGES, UTILITY_STATS };
