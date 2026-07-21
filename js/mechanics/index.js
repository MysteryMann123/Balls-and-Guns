// Central mechanics barrel — re-exports from shared and pattern subfolders

// Tier 1 Shared Mechanics (basic building blocks)
export * as Afterburn from './shared/afterburn.js';
export * as BleedDot from './shared/bleedDot.js';
export * as Hitscan from './shared/hitscan.js';
export * as Homing from './shared/homing.js';
export * as MaxHpDamage from './shared/maxHpDamage.js';
export * as Pierce from './shared/pierce.js';
export * as Slow from './shared/slow.js';
export * as Tracer from './shared/tracer.js';

// Tier 2 Pattern Mechanics
export * as LifeSteal from './patterns/lifesteal.js';
export * as AllyHeal from './patterns/allyHeal.js';
export * as Knockback from './patterns/knockback.js';
export * as Mark from './patterns/mark.js';
export * as SplashAoe from './patterns/splashAoe.js';
export * as DualForm from './patterns/dualForm.js';

// Tier 3 Pattern Mechanics
export * as FireRateRamp from './patterns/fireRateRamp.js';
export * as ConditionalReload from './patterns/conditionalReload.js';
export * as MeleeAttack from './patterns/meleeAttack.js';
export * as SelfDamage from './patterns/selfDamage.js';
export * as TeamAwareHit from './patterns/teamAwareHit.js';

// New Pattern Mechanics (placeholders)
export * as Accumulator from './patterns/accumulator.js';
export * as Charge from './patterns/charge.js';
export * as Randomizer from './patterns/randomizer.js';
export * as Zone from './patterns/zone.js';
export * as Beam from './patterns/beam.js';
export * as Conditional from './patterns/conditional.js';
export * as BurstFire from './patterns/burstFire.js';
