# BallsAndGuns

## Project Docs

- Asset conventions: `ASSETS.md`

## Quick Maintenance

- Check for stale root image paths (PowerShell):
	`Select-String -Path .\js\*.js,.\*.html,.\*.css -Pattern "(?<!assets/)\b[\w' -]+\.(png|PNG|jpg|jpeg|webp)\b"`

## Game Module Layout

Core game logic is split into focused modules so `Game` stays as an orchestrator.

- `js/game.js` — Main `Game` class, high-level update flow, thin wrappers to modules.
- `js/gameConfig.js` — Game settings normalization and default drop-weight setup.
- `js/gameRender.js` — Full draw/render pipeline.
- `js/gameCombat.js` — Hitscan/raycast helpers, tracers, Force-A-Nature/Magician Hat combat helpers.
- `js/gameProjectiles.js` — Projectile lifecycle, collisions, explosions, pyro airblast, effect updates.
- `js/gameDrops.js` — Pickup updates, spawning, weighted drop rolling.
- `js/gameSystems.js` — Ongoing systems (medigun, targe charge, short-circuit fields, scrumpy puddles, decoys, bombanomicron support).
- `js/gameShooting.js` — Main shooting decision flow and projectile spawning per weapon.

## Refactor Pattern

When adding new gameplay behavior:

1. Put specialized logic in the most relevant module (`gameCombat`, `gameProjectiles`, `gameSystems`, etc.).
2. Keep `Game` methods as wrappers (`return someImpl(this, ...)`) where practical.
3. Preserve existing behavior first, then tune balance separately.
4. Run diagnostics after changes to ensure cross-module imports stay healthy.
