// bootstrap.js — Central import controller
// Forces all dependencies to load in safe order, catching any circular dependencies early

// 1. Core utilities (no dependencies)
import { Vector } from './core/vector.js';
import { PhysicsEngine } from './core/physics.js';

// 2. Mechanics (no dependencies)
import * as Afterburn from './mechanics/afterburn.js';
import * as BleedDot from './mechanics/bleedDot.js';
import * as Hitscan from './mechanics/hitscan.js';
import * as Homing from './mechanics/homing.js';
import * as MaxHpDamage from './mechanics/maxHpDamage.js';
import * as Pierce from './mechanics/pierce.js';
import * as Slow from './mechanics/slow.js';
import * as Tracer from './mechanics/tracer.js';
import * as LifeSteal from './mechanics/lifesteal.js';
import * as AllyHeal from './mechanics/allyHeal.js';
import * as Knockback from './mechanics/knockback.js';
import * as Mark from './mechanics/mark.js';
import * as SplashAoe from './mechanics/splashAoe.js';
import * as DualForm from './mechanics/dualForm.js';
import * as FireRateRamp from './mechanics/fireRateRamp.js';
import * as ConditionalReload from './mechanics/conditionalReload.js';
import * as MeleeAttack from './mechanics/meleeAttack.js';
import * as SelfDamage from './mechanics/selfDamage.js';
import * as TeamAwareHit from './mechanics/teamAwareHit.js';

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
