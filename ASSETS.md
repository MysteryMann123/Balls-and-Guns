# Asset Guidelines

## Location

- Store all visual assets under the top-level `assets/` folder.
- Do not keep image files in the project root.

## Naming

- Use stable, descriptive file names for new assets.
- Prefer lowercase with hyphens for new files (example: `rocket-launcher.png`).
- Keep existing legacy file names unchanged unless a rename is intentional and all references are updated.

## Referencing

- In game scripts, reference images via `assets/<filename>`.
- If a fallback image is needed, keep the fallback in `assets/` as well.

## Adding New Assets Checklist

1. Put the file in `assets/`.
2. Update all references in JS/HTML/CSS.
3. Run a workspace search for old file names to ensure nothing is missed.
4. Verify the game page and stats page still load images correctly.
