# Right-Click Secondary Abilities

## Overview
Right-click now triggers secondary abilities for weapons that have them in **Sandbox Mode** only.

## Secondary Abilities by Weapon

### Pip Launcher
- **Right-click action**: Throw explosive poison flask at target
- **Cooldown**: 4000ms between flasks
- **Effect**: Applies poison damage and vulnerability status to hit targets

### Hornet Form Switcher  
- **Right-click action**: Toggle between rifle and shotgun forms
- **Rifle Form**: Long-range, single projectile
- **Shotgun Form**: Close-range, multiple pellets
- **Auto-switches** based on distance during normal firing (distance ≤ 150px = shotgun)

### Musket
- **Right-click action**: Bayonet stab attack (melee)
- **Range**: Close-range melee attack
- **Effect**: Applies bleed damage to hit targets
- **Cooldown**: Managed by weapon cooldown

### Penitence (Ego Weapon)
- **Right-click action**: Swing attack in arc
- **Range**: 120-degree cone in front of player
- **Effect**: Damages enemies, heals allies nearby
- **Cooldown**: 500ms minimum between swings

### Solemn Vow (Ego Weapon)
- **Right-click action**: Fire funeral projectile
- **Effect**: Special projectile with unique properties
- **Requirement**: Must be in reload phase
- **Cooldown**: 1500ms between funeral shots

### Sword Sharpened (Ego Weapon)
- **Right-click action**: Deploy blessing shield
- **Target**: Nearest ally within 280px radius (or self if no allies)
- **Effect**: Blocks 80% of damage for 4 seconds
- **Radius**: 280px from player

### Yellow Targe
- **Right-click action**: Charge attack
- **Range**: Only works if enemy within 300px
- **Effect**: Applies knockback impulse and marks the target
- **Cooldown**: Prevents spam charging

### Other Weapons
- Weapons without secondary abilities (e.g., Pistol, Shotgun, Sniper, etc.) will not respond to right-click

## Controls

### Sandbox Mode
- **Left Click**: Fire weapon (hold to continuous fire)
- **Right Click**: Trigger secondary ability
- **WASD**: Movement
- **R**: Manual reload
- **Mouse Position**: Aiming

## Implementation Details

- Secondary abilities are triggered via `triggerSecondaryAbility()` function in `gameShooting.js`
- Event listeners handle sandbox mode only
- Context menu is suppressed to allow right-click functionality
- Weapon cooldowns and states are properly managed
- Works seamlessly with existing weapon mechanics
