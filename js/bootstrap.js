// bootstrap.js — Central import controller
// Forces all dependencies to load in safe order, catching any circular dependencies early

// 1. Core utilities (no dependencies)
import { Vector } from './core/vector.js';
import { PhysicsEngine } from './core/physics.js';

// 2. Mechanics (no dependencies)
// Tier 1: Shared mechanics
import * as Afterburn from './mechanics/shared/afterburn.js';
import * as BleedDot from './mechanics/shared/bleedDot.js';
import * as Hitscan from './mechanics/shared/hitscan.js';
import * as Homing from './mechanics/shared/homing.js';
import * as MaxHpDamage from './mechanics/shared/maxHpDamage.js';
import * as Pierce from './mechanics/shared/pierce.js';
import * as Slow from './mechanics/shared/slow.js';
import * as Tracer from './mechanics/shared/tracer.js';
// Tier 2+: Pattern mechanics
import * as LifeSteal from './mechanics/patterns/lifesteal.js';
import * as AllyHeal from './mechanics/patterns/allyHeal.js';
import * as Knockback from './mechanics/patterns/knockback.js';
import * as Mark from './mechanics/patterns/mark.js';
import * as SplashAoe from './mechanics/patterns/splashAoe.js';
import * as DualForm from './mechanics/patterns/dualForm.js';
import * as FireRateRamp from './mechanics/patterns/fireRateRamp.js';
import * as ConditionalReload from './mechanics/patterns/conditionalReload.js';
import * as MeleeAttack from './mechanics/patterns/meleeAttack.js';
import * as SelfDamage from './mechanics/patterns/selfDamage.js';
import * as TeamAwareHit from './mechanics/patterns/teamAwareHit.js';

// 3. Weapons (depends on mechanics via weapon files)
import * as W from './weapons/index.js';

// 4. Core classes (safe now — projectile.js and ball.js don't import weapons)
import { Projectile } from './core/projectile.js';
import { Ball } from './core/ball.js';

// 5. Game systems and utilities
import { Game } from './game.js';
import { loadImages } from './assetManager.js';

// Re-export everything needed by the rest of the application
export {
  Vector,
  PhysicsEngine,
  Projectile,
  Ball,
  Game,
  loadImages,
  W,
  Afterburn,
  BleedDot,
  Hitscan,
  Homing,
  MaxHpDamage,
  Pierce,
  Slow,
  Tracer,
  LifeSteal,
  AllyHeal,
  Knockback,
  Mark,
  SplashAoe,
  DualForm,
  FireRateRamp,
  ConditionalReload,
  MeleeAttack,
  SelfDamage,
  TeamAwareHit,
};
