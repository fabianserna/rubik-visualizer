# 🧊 Interactive Guide: Moves, Initial Orientation, and Features of Rubik Studio Visualizer

> 🌐 **Language / Idioma:** **🇺🇸 English (Current)** | [🇪🇸 Español](./example.es.md)

This example note is designed to be opened in **Obsidian** with the **Rubik Studio Visualizer** plugin enabled. In each section you will first see the **YAML code block** so you can inspect and copy its parameters, followed immediately by the **live `rubik-viz` block** rendered by the plugin.

---

## 🛠️ 1. Built-in Plugin Features and How to Use Them in This Guide

Every `rubik-viz` block includes interactive tools purpose-built for studying algorithms and spatial orientations:

1. **Interactive Step-by-Step Move Bar (`tokenizeAlg` + `setActiveStep`):**
   - Below the cube, the plugin automatically splits the `alg` parameter into **individual move buttons**.
   - Click any move button (for example, the 3rd move): the plugin jumps the cube to that move, animates that single rotation in 3D, highlights the active move (`is-active`), and marks previous moves (`is-past`).
2. **Live `3D / 2D` (`3d o 2d`) View Switcher:**
   - In the top-right corner of every card you have a button to switch live between **3D** and the **unfolded 2D Net** without editing the note.
   - In 3D you see 3 faces at a time (`U`, `F`, `R`). If you click a move button and then press **`3D / 2D`**, you can immediately inspect what happened on the back and bottom faces (`B`, `L`, `D`).
3. **`Center` (`Centrar`) and `Reset` (`Reiniciar`) Buttons:**
   - Press **`Center`** to restore the natural 3D camera angle (`U`, `F`, `R`) without losing your current step in the sequence.
   - If you were inspecting intermediate steps or switched between 2D/3D, press **`Reset`** to return the algorithm to the start (`jumpToStart()`) and restore the original view.
4. **Automatic Move Inversion (`invertMoves` with `anchor: end`):**
   - When you set `anchor: end`, the plugin computes the inverse sequence of the algorithm alongside your `setup` so you can step through the move buttons and watch the scrambled case converge to a solved state on the final move.
5. **`Setup:` Status Bar and Header Badges (`3x3` / `4x4` + `mask`):**
   - The card header automatically displays the puzzle badge (`3x3` or `4x4`) and active stickering mask (`OLL`, `PLL`, `F2L`, `centers`). When `setup` is defined, the plugin also displays the `Setup:` bar below the viewport.

---

## 🧭 2. Initial Cube Orientation in Space

Before executing any move, it is essential to know **where each color starts** and how the plugin orients the cube in 3D space.

### 2.1 Standard WCA Initial Orientation (Empty `setup`)
When `setup` is omitted, the cube initializes in official WCA orientation:

| Face | Letter | Location in 3D Viewport | Initial Color |
| :--- | :---: | :--- | :--- |
| **Up** | `U` | Top face | ⬜ **White** |
| **Down** | `D` | Bottom face (hidden in 3D) | 🟨 **Yellow** |
| **Front** | `F` | Front-left face | 🟩 **Green** |
| **Right** | `R` | Front-right face | 🟥 **Red** |
| **Back** | `B` | Back-right face (hidden in 3D) | 🟦 **Blue** |
| **Left** | `L` | Back-left face (hidden in 3D) | 🟧 **Orange** |

> [!TIP]
> Use the **`3D / 2D`** button in the top-right corner of the card to unfold all 6 faces and verify where **Yellow (`D`)**, **Orange (`L`)**, and **Blue (`B`)** are located.

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Standard Initial Orientation (U = White, F = Green)"
puzzle: 3x3x3
view: 3D
controls: false
```

**Live rendered result:**
```rubik-viz
title: "Standard Initial Orientation (U = White, F = Green)"
puzzle: 3x3x3
view: 3D
controls: false
```

---

### 2.2 Speedcubing Orientation with `setup: "z2"` (Yellow on Top, White on Bottom)
In speedcubing (F2L, OLL, and PLL), the `U` face is typically **Yellow** and `D` is **White**. Using `setup: "z2"` places the cube in that starting orientation and displays `Setup: z2` below the viewport:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Speedcubing Orientation (setup: z2 → Yellow on Top, White on Bottom)"
puzzle: 3x3x3
view: 3D
setup: "z2"
controls: false
```

**Live rendered result:**
```rubik-viz
title: "Speedcubing Orientation (setup: z2 → Yellow on Top, White on Bottom)"
puzzle: 3x3x3
view: 3D
setup: "z2"
controls: false
```

---

### 2.3 Reorienting the Cube with Whole-Cube Rotations (`x`, `y`, `z`) and `mask: centers`
Using `mask: centers` (which dims edges and corners to highlight only the **6 centers**), we can clearly see how whole-cube rotations reorient the puzzle in space. Click each bottom move button (`x`, `x'`, `y`, `y'`, `z`, `z'`) to inspect how the centers move:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Center Positions with Spatial Rotations (mask: centers)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "x x' y y' z z'"
mask: centers
tempo: 0.8
controls: true
```

**Live rendered result:**
```rubik-viz
title: "Center Positions with Spatial Rotations (mask: centers)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "x x' y y' z z'"
mask: centers
tempo: 0.8
controls: true
```

---

## 🔄 3. How Each Move Works (Step-by-Step Inspection)

Each letter rotates its corresponding face **90°** as if looking directly at that face:
- **Single letter (`R`, `U`, `F`, `L`, `D`, `B`):** **90° clockwise** turn.
- **Letter with apostrophe (`R'`, `U'`, `F'`, `L'`, `D'`, `B'`):** **90° counter-clockwise** (prime) turn.
- **Letter with `2` (`R2`, `U2`, `F2`, ...):** **180°** double turn.

### 3.1 Turns of All 6 Outer Faces (`R`, `U`, `F`, `L`, `D`, `B`)
Click each move button below the cube (`R`, `U`, `F`, `L`, `D`, `B`) to animate that exact step, and toggle **`3D / 2D`** to inspect the effect on the back faces:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Clockwise Turns of All 6 Faces (90°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U F L D B"
tempo: 0.8
controls: true
```

**Live rendered result:**
```rubik-viz
title: "Clockwise Turns of All 6 Faces (90°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U F L D B"
tempo: 0.8
controls: true
```

---

### 3.2 Comparison: Clockwise (`R`), Counter-Clockwise (`R'`), and Double (`R2`)
Click through the bottom buttons in order to see how `R` lifts the right layer 90°, `R'` returns it to its starting state, and `R2` performs a 180° turn:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Move Modifiers: Normal (90°), Prime (-90°), and Double (180°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R R' R2 U U' U2 F F' F2"
tempo: 0.8
controls: true
```

**Live rendered result:**
```rubik-viz
title: "Move Modifiers: Normal (90°), Prime (-90°), and Double (180°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R R' R2 U U' U2 F F' F2"
tempo: 0.8
controls: true
```

---

### 3.3 Middle Slice Moves (`M`, `E`, `S`)
The inner slices of a 3x3 cube use three letters:
- **`M` (Middle):** Between `L` and `R` (follows the direction of **`L`**, rotating downward in front).
- **`E` (Equatorial):** Between `U` and `D` (follows the direction of **`D`**).
- **`S` (Standing):** Between `F` and `B` (follows the direction of **`F`**).

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Middle Slices: M, E, S and Their Inverses"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "M M' E E' S S'"
tempo: 0.8
controls: true
```

**Live rendered result:**
```rubik-viz
title: "Middle Slices: M, E, S and Their Inverses"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "M M' E E' S S'"
tempo: 0.8
controls: true
```

---

### 3.4 Double-Layer / Wide Moves (`Rw`, `Uw`, `Fw`)
Move **two layers simultaneously** (the outer face together with its adjacent middle slice):

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Double-Layer Turns (Wide Moves)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "Rw Rw' Uw Uw' Fw Fw'"
tempo: 0.8
controls: true
```

**Live rendered result:**
```rubik-viz
title: "Double-Layer Turns (Wide Moves)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "Rw Rw' Uw Uw' Fw Fw'"
tempo: 0.8
controls: true
```

---

## 🎯 4. Setting Up Cases with `anchor: start` vs `anchor: end` and Masks

### 4.1 `anchor: start` Mode (Applies `setup` and executes `alg` from there)
The cube first applies `setup: "z2 F' U' F"` and then animates `alg: "U R U' R'"`. With `mask: F2L`, the plugin dims the top layer so you can focus exclusively on the first two layers:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "Basic F2L - Front-Right Pair Insertion (anchor: start)"
puzzle: 3x3x3
view: 3D
setup: "z2 F' U' F"
alg: "U R U' R'"
anchor: start
mask: F2L
tempo: 1
controls: true
```

**Live rendered result:**
```rubik-viz
title: "Basic F2L - Front-Right Pair Insertion (anchor: start)"
puzzle: 3x3x3
view: 3D
setup: "z2 F' U' F"
alg: "U R U' R'"
anchor: start
mask: F2L
tempo: 1
controls: true
```

---

### 4.2 `anchor: end` Mode with `mask: OLL` (Finishes Solved)
With `anchor: end`, the plugin automatically computes the inverse state (`invertMoves`) to display the **OLL 27 (Sune)** case ready to be solved. Click from the first to the last move button to watch the entire yellow top face orient:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "OLL 27 - Sune (anchor: end, mask: OLL)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U R' U R U2 R'"
anchor: end
mask: OLL
tempo: 1.2
controls: true
```

**Live rendered result:**
```rubik-viz
title: "OLL 27 - Sune (anchor: end, mask: OLL)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U R' U R U2 R'"
anchor: end
mask: OLL
tempo: 1.2
controls: true
```

---

### 4.3 `anchor: end` Mode with `mask: PLL`
Here the plugin highlights the last-layer pieces (`mask: PLL`) and finishes with the cube solved at the end of the **T-Perm**:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "PLL - T Perm (anchor: end, mask: PLL)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U R' U' R' F R2 U' R' U' R U R' F'"
anchor: end
mask: PLL
tempo: 1.5
controls: true
```

**Live rendered result:**
```rubik-viz
title: "PLL - T Perm (anchor: end, mask: PLL)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U R' U' R' F R2 U' R' U' R U R' F'"
anchor: end
mask: PLL
tempo: 1.5
controls: true
```

---

## 🧩 5. 4x4x4 Cube (`puzzle: 4x4x4`) and Inner Slices

On the **4x4x4** cube, the plugin displays the `4x4` badge and supports outer-layer turns (`R`), double-layer wide turns (`Rw`), and **single inner-slice turns** (`2R`, `2U`):

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "4x4x4 Moves: Outer (R), Wide (Rw), and Inner Slice (2R)"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "R R' Rw Rw' 2R 2R' 2U 2U'"
tempo: 0.9
controls: true
```

**Live rendered result:**
```rubik-viz
title: "4x4x4 Moves: Outer (R), Wide (Rw), and Inner Slice (2R)"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "R R' Rw Rw' 2R 2R' 2U 2U'"
tempo: 0.9
controls: true
```

---

### 5.1 OLL Parity on 4x4x4

Notice how double-layer wide moves (`Rw`, `Lw`) are **automatically highlighted in amber/orange** below the cube to distinguish them from outer turns (`U2`) and whole-cube rotations (`x`):

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "4x4x4 - OLL Parity Algorithm"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'"
anchor: end
tempo: 1.5
controls: true
```

**Live rendered result:**
```rubik-viz
title: "4x4x4 - OLL Parity Algorithm"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'"
anchor: end
tempo: 1.5
controls: true
```

---

### 5.2 PLL Parity on 4x4x4

PLL Parity combines **single inner-slice turns** (`2R2`), **double-layer wide turns** (`Uw2`), and **outer turns** (`U2`). The plugin highlights both `2R2` and `Uw2`:

**Block code (`rubik-viz`):**
```yaml
# ```rubik-viz block
title: "4x4x4 - PLL Parity Algorithm"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: end
tempo: 1.2
controls: true
```

**Live rendered result:**
```rubik-viz
title: "4x4x4 - PLL Parity Algorithm"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: end
tempo: 1.2
controls: true
```
