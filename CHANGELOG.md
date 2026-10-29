# 📋 Changelog — Rubik Studio Visualizer

> 🌐 **Language / Idioma:** **🇺🇸 English (Current)** | [🇪🇸 Español](./CHANGELOG.es.md)

All notable changes to the **Rubik Studio Visualizer** Obsidian plugin are documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] - 2026-10-29

### Added
- **Bilingual Documentation Architecture (`EN` / `ES`)**:
  - Added full English primary documentation: [`README.md`](./README.md), [`tutorial-3x3x3.md`](./tutorial-3x3x3.md), [`tutorial-4x4x4.md`](./tutorial-4x4x4.md), and [`example.md`](./example.md).
  - Added equivalent Spanish documentation using ISO 639-1 `.es.md` suffixes: [`README.es.md`](./README.es.md), [`tutorial-3x3x3.es.md`](./tutorial-3x3x3.es.md), [`tutorial-4x4x4.es.md`](./tutorial-4x4x4.es.md), and [`example.es.md`](./example.es.md) with top language switchers.
- **Automatic Obsidian UI Language Detection (`i18n`)**:
  - Automatically detects Obsidian's configured language (`es` vs `en` default) to render card buttons (`Center` / `Centrar`, `Reset` / `Reiniciar`, `3D / 2D` / `3d o 2d`), Command Palette actions, studio modals, and physical 3x3 solver validation messages in the user's language.
- **Reference Links in Tutorials**:
  - Added introductory callout boxes in both the `3x3x3` and `4x4x4` tutorials referencing [`example.md`](./example.md) / [`example.es.md`](./example.es.md) so readers can understand plugin controls before starting.

### Changed
- **Mobile-Friendly Header Buttons**:
  - Shortened and optimized card action button labels (`Center` / `Centrar`, `Reset` / `Reiniciar`, `3D / 2D` / `3d o 2d`) and CSS spacing so all 3 buttons fit cleanly on Obsidian Mobile screens.
- **Standardized Tutorial Hierarchy & Progressive Partial-Solve States**:
  - Unified all alternative headings and block titles under `Phase X - Alternative A/B` (single-step phases) and `Step X.Y - Alternative A/B` (multi-step phases).
  - Updated `setup` scrambles across all intermediate alternatives in [`tutorial-3x3x3.md`](./tutorial-3x3x3.md) and [`tutorial-4x4x4.md`](./tutorial-4x4x4.md) so each alternative ends at the realistic partial stage of that phase rather than a 100% solved cube.

---

## [1.0.0] - 2026-10-22

### Added
- **Initial Official Release on Obsidian Community Plugins**:
  - Interactive **3D** and **2D** visualization for `3x3x3` and `4x4x4` Rubik's Cubes inside ```` ```rubik-viz ```` Markdown code blocks powered by `cubing.js`.
  - **Real-Time Move Synchronization**: Live move-by-move button highlighting and animated status pill (`▶` / `✓`) synchronized with `TwistyPlayer` 3D rotations.
  - **Single-Move Playback**: Clicking any move token jumps to that timestamp and animates only that single move in 3D.
  - **Automatic `4x4x4` Wide & Inner-Slice Highlighting**: Amber badges for `Rw`, `Uw`, `Lw`, `r`, `l`, `2R`, `2R2`, and `2U` moves.
  - **3D Camera Centering (`centerCubeCamera`)**: Restores the natural front-top-right (`U`, `F`, `R`) camera orbit without losing current timeline progress.
  - **Physical 3x3 Cube Color Mapper & BFS Solver (`RealCubeSolver`)**: Interactive 54-sticker 2D net painter with physical parity/orientation validation and sub-5ms `setup` + step-by-step `alg` calculation.
  - **Interactive Visual Studio Modal**: Live 3D preview, quick presets (*Sexy Move*, *Sune*, *T-Perm*, *4x4 OLL Parity*, *4x4 PLL Parity*), move keypad, and one-click cursor insertion.
  - **Idempotent Custom Element Guard**: Prevents duplicate WebGL viewports and control bars when Obsidian's virtual scroller detaches and re-attaches Markdown blocks.
