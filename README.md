# 🧊 Rubik Studio Visualizer — Obsidian Plugin

> 🌐 **Language / Idioma:** **🇺🇸 English (Current)** | [🇪🇸 Español](./README.es.md)

<div align="center">

```text
███████╗ █████╗ ██████╗ ██╗██████╗ ███████╗██╗   ██╗  ██╗██████╗ 
██╔════╝██╔══██╗██╔══██╗██║██╔══██╗██╔════╝██║   ██║ ██╔╝╚════██╗
█████╗  ███████║██████╔╝██║██║  ██║█████╗  ██║   ██║██╔╝  █████╔╝
██╔══╝  ██╔══██║██╔══██╗██║██║  ██║██╔══╝  ╚██╗ ██╔╝╚██╗  ╚═══██╗
██║     ██║  ██║██████╔╝██║██████╔╝███████╗ ╚████╔╝  ╚██╗██████╔╝
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝╚═════╝ ╚══════╝  ╚═══╝    ╚═╝╚═════╝ 
                 Obsidian Plugin by: FabiDev<3
```

![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7C3AED?style=for-the-badge&logo=obsidian&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.1-22C55E?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![cubing.js](https://img.shields.io/badge/Engine-cubing.js-F97316?style=for-the-badge)
![Antigravity](https://img.shields.io/badge/Built%20with-Google%20Antigravity-4285F4?style=for-the-badge&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-EAB308?style=for-the-badge)

**Interactive 3D & 2D Rubik's Cube visualizer (`3x3x3` and `4x4x4`), real-time step-by-step algorithm player, and physical cube state calculator directly inside your Obsidian notes.**

[**📖 3x3x3 Tutorial**](./tutorial-3x3x3.md) · [**🟧 4x4x4 Tutorial**](./tutorial-4x4x4.md) · [**🧪 Examples Gallery**](./example.md) · [**🇪🇸 Documentación en Español**](./README.es.md)

</div>

---

## 💡 Credits, Original Idea & Technology Stack

- **Author & Original Concept:** **Fabian Serna** (**`FabiDev<3`**) — Functional vision, pedagogical design of the progressive 3x3x3 / 4x4x4 tutorials, UX architecture, and physical cube color mapper/solver.
- **Agentic Development Environment:** Built with **Google Antigravity**, featuring self-contained Web Worker bundling, a multi-stage constructive BFS solver engine, and reactive synchronization with Obsidian's virtual DOM.
- **Core Libraries & Engines:**
  - [**`obsidian` API**](https://github.com/obsidianmd/obsidian-api): Official Obsidian Plugin API (`Plugin`, `Modal`, `MarkdownRenderChild`, `parseYaml`, `Command Palette`) for reactive rendering of ```` ```rubik-viz ```` code blocks and interactive modals.
  - [**`cubing` (`cubing.js` / `TwistyPlayer`)**](https://js.cubing.net/cubing/): WebGL/3D/2D engine by *Lucas Garron* and the speedcubing community, powering `3x3x3` and `4x4x4` geometric simulation, stickering masks (`OLL`, `PLL`, `F2L`, `centers-only`), and animation timelines.
  - [**`esbuild`**](https://esbuild.github.io/) + **TypeScript**: High-performance bundler with inline Web Worker injection and idempotent Custom Elements registration (`customElements.define`) to prevent duplicate renders in Obsidian's virtual scroller.

---

## ✨ Key Features

### 1. 🎮 Interactive 3D & 2D Visualization in Markdown Blocks (`rubik-viz`)
Render **3x3x3** and **4x4x4** cubes inside any note using clean YAML blocks:
- **Live `3D / 2D` (`3d o 2d`) Toggle**: Switch between the interactive 3D cube and the unfolded 2D net with a single click without editing the note.
- **`Center` (`Centrar`) Button**: Instantly restores the 3D camera orbit to its natural reading angle (prioritizing the Top **`U`**, Front **`F`**, and Right **`R`** faces) **without losing your current move step**.
- **`Reset` (`Reiniciar`) Button**: Returns the timeline to the initial state and centers the camera.
- **Automatic Language Detection (`EN` / `ES`)**: Automatically adapts plugin buttons, modals, commands, and validation messages to your Obsidian interface language (English or Spanish).

### 2. ⚡ Real-Time Synchronization with 3D Animation
- **Live move-by-move highlighting**: Connected directly to `player.experimentalModel.currentMoveInfo` in `cubing.js`. As the cube rotates in 3D, the exact move button currently executing lights up below the cube (e.g., `R`, then `U`, then `R'`) alongside an animated status pill (`▶ R` / `✓ R`).
- **Single-move playback on click**: Clicking any move button in the bottom bar jumps to that point in the timeline and **plays only that single 3D rotation**, pausing automatically when the move completes.
- **Automatic `4x4x4` move highlighting**: Automatically highlights **double-layer wide moves (`Rw`, `Uw`, `Lw`, `r`, `l`)** and **inner-slice moves (`2R`, `2R2`, `2U`)** in amber—essential for OLL and PLL parity algorithms.

### 3. 🎨 Physical Cube State Calculator & Solver (`Map Real 3x3 Cube`)
Holding a scrambled physical Rubik's Cube in your hands?
- Open the Command Palette (`Ctrl + P` / `Cmd + P`) and run:
  - **`Rubik Studio Visualizer: Map real cube colors (3x3 initial state calculator)`**
- **Interactive 54-sticker painter**: Paint all 6 faces (`U`, `L`, `F`, `R`, `B`, `D`) with real-time physical validation:
  - Verifies exact 9-sticker counts per color, valid existence of all 12 edges and 8 corners, corner orientation ($\sum co \equiv 0 \pmod 3$), edge orientation ($\sum eo \equiv 0 \pmod 2$), and permutation parity.
- **Built-in 3x3 Solver Engine (`RealCubeSolver`)**: Computes both the exact **`setup`** of your physical cube and a **step-by-step `alg` solution** in under `5 ms` so you can watch in 3D how to solve your own cube.

### 4. 🧰 Visual Studio Builder with Live Preview
- Run **`Rubik Studio Visualizer: Insert cube state`** from the Command Palette to open the interactive studio featuring quick presets (*Sexy Move*, *Sune*, *T-Perm*, *4x4 OLL Parity*, *4x4 PLL Parity*), a move keypad, and instant 3D preview.

---

## 🚀 `rubik-viz` Block Syntax

````markdown
```rubik-viz
title: "4x4x4 - Solve PLL Parity"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: start
mask: full
tempo: 1.0
controls: true
```
````

### Supported YAML Parameters

| Parameter | Allowed Values | Default | Description |
| :--- | :--- | :---: | :--- |
| `title` | Free text | `"Cube 3x3"` / `"Cubo 3x3"` | Title displayed in the card header. |
| `puzzle` | `3x3x3`, `3x3`, `4x4x4`, `4x4` | `3x3x3` | Cube puzzle type to render. |
| `view` | `3D`, `2D`, `PG3D` | `3D` | Initial visualization mode (`3D` interactive or `2D` unfolded net). |
| `setup` | WCA notation (`z2`, scrambles, etc.) | `""` | Pre-moves defining the initial state of the cube before `alg`. |
| `state` | 54-character string (`U,R,F,D,L,B` or `W,R,G,Y,O,B`) | `""` | *(Optional)* Defines the initial 3x3 state directly from 54 sticker colors. |
| `alg` | WCA notation (`R U R' U'`, `Rw`, `2R2`...) | `""` | Sequence of moves animated step by step. |
| `anchor` | `start`, `end` | `start` | `start`: begins at `setup` and executes `alg`. `end`: finishes solved at the end of `alg`. |
| `mask` | `full`, `OLL`, `PLL`, `F2L`, `centers` | `full` | Stickering mask to highlight only pieces relevant to a specific stage. |
| `tempo` | Positive number (`0.3` to `3.0`) | `1.0` | Animation playback speed multiplier. |
| `controls` | `true`, `false` | `true` | Shows or hides the bottom `cubing.js` playback scrubber bar. |

---

## 📚 Interactive Tutorials & Documentation (English & Spanish)

All documentation and interactive tutorials are available in both **English** (`.md`) and **Spanish** (`.es.md`), ready to open directly inside your Obsidian vault:

| Document | 🇺🇸 English (Primary) | 🇪🇸 Español | Description |
| :--- | :--- | :--- | :--- |
| **Main README** | [`README.md`](./README.md) | [`README.es.md`](./README.es.md) | Overview, installation, and YAML syntax reference. |
| **3x3x3 Tutorial** | [`tutorial-3x3x3.md`](./tutorial-3x3x3.md) | [`tutorial-3x3x3.es.md`](./tutorial-3x3x3.es.md) | Progressive 3x3x3 beginner-to-full solve tutorial with phase alternatives. |
| **4x4x4 Tutorial** | [`tutorial-4x4x4.md`](./tutorial-4x4x4.md) | [`tutorial-4x4x4.es.md`](./tutorial-4x4x4.es.md) | Progressive 4x4x4 reduction tutorial (Centers, Edge Pairing, OLL/PLL Parities). |
| **Examples Gallery** | [`example.md`](./example.md) | [`example.es.md`](./example.es.md) | Interactive reference guide for views, spatial rotations, masks, and moves. |
| **Changelog** | [`CHANGELOG.md`](./CHANGELOG.md) | [`CHANGELOG.es.md`](./CHANGELOG.es.md) | Version history and release notes (`1.0.0`, `1.0.1`, ...). |

---

## 📦 Installation in Obsidian

### From Obsidian Community Plugins
1. Open Obsidian and go to **Settings → Community plugins → Browse**.
2. Search for **Rubik Studio Visualizer**.
3. Click **Install** and then **Enable**.

### Manual Installation
1. Download the latest release assets (`main.js`, `manifest.json`, and `styles.css`).
2. Create the folder `<YourVault>/.obsidian/plugins/rubik-visualizer/`.
3. Copy `main.js`, `manifest.json`, and `styles.css` into that folder.
4. In Obsidian, go to **Settings → Community plugins**, reload the list, and enable **Rubik Studio Visualizer**.

### Building from Source
```bash
# 1. Install dependencies
npm install

# 2. Build for production (generates main.js with inline Web Workers)
npm run build

# 3. Development mode with hot-reload (watch)
npm run dev
```

---

## 📄 License

Distributed under the **MIT** License. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center">
  <sub>Created with ❤️ by <b>Fabian Serna (FabiDev&lt;3)</b> · Powered by <b>Google Antigravity</b> &amp; <b>cubing.js</b></sub>
</div>
