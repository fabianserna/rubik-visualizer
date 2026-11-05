# 🧊 Progressive 2x2x2 Tutorial (Pocket Cube — Layer-by-Layer Method)

> 🌐 **Language / Idioma**: **English** | [Español](tutorial-2x2x2.es.md)

Welcome to the interactive **2x2x2 Pocket Cube** step-by-step tutorial! Unlike isolated algorithm tables, in this note **we will solve the exact same scrambled 2x2x2 cube from start to finish**.

> 📌 **Before You Begin (Plugin Guide)**:
> This interactive tutorial is powered by the **Rubik Studio Visualizer** plugin (`rubik-viz` code blocks). If you want to learn how every YAML parameter (`puzzle: 2x2x2`, `view`, `setup`, `alg`, `anchor`, `tempo`, `controls`) works before starting, check out the reference note: **[`example.md`](https://github.com/fabianserna/rubik-visualizer/blob/main/example.md)** (*Spanish version*: **[`example.es.md`](https://github.com/fabianserna/rubik-visualizer/blob/main/example.es.md)**).

Every `rubik-viz` block in this guide is configured with `puzzle: 2x2x2` and `anchor: start`:
1. **Before pressing Play**, you see the **exact state our cube reached at the end of the previous step**.
2. **While pressing Play** (or clicking each move button below the cube), you see how the algorithm transforms the cube into the **next milestone**.
3. **Standardized Hierarchy**: Throughout the tutorial, main steps follow the sequence **`Phase X` → `Step X.Y`**, while optional cases keep the explicit hierarchy **`Phase X - Alternative A/B`** so you always know which phase they belong to, and each alternative ends at the exact progress stage of that phase (without jumping ahead to a fully solved cube).

---

## 🔍 Key Concept: A 2x2x2 Cube Is Just the 8 Corners of a 3x3x3

The **2x2x2 cube** has **no center pieces and no edge pieces** — it consists exclusively of **8 corner pieces**:
1. Because there are no fixed centers, **you choose a single corner piece as your fixed reference** in Phase 1 and build the rest of the first layer around it, matching both the **White sticker** and the **adjacent side colors**.
2. In Phase 2 (OLL) and Phase 3 (PLL), you use the **exact same corner algorithms** you already know from the 3x3x3 (`Sune`, `Anti-Sune`, `T-Perm`, `Y-Perm`)!

---

## 🎲 State 0: Our Starting Scrambled 2x2x2 Cube

We begin with **White on Top (`U`)**, **Green in Front (`F`)**, and **Red on the Right (`R`)**.
Our fixed reference piece is the **White-Blue-Orange corner (`UBL`)**, which is already sitting in the back-left of the top layer with White facing up:

```rubik-viz
title: "State 0 - Initial Scrambled 2x2x2 Cube (UBL Reference Corner Ready)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D F' D F R D' R'"
alg: ""
anchor: start
mask: full
controls: false
```

---

## ⬜ Phase 1: Solve the First White Layer (With Matching Side Colors)

> **Goal**: Place all 4 White corners on the top face (`U`) so that the top face is all White **and** the side stickers of adjacent corners match each other (Blue bar on `B`, Orange bar on `L`, Green bar on `F`, Red bar on `R`).

### Step 1.1: Build the Back White-Blue Bar (`UBR` Corner)
Our reference corner at `UBL` has **White** on top (`U`) and **Blue** on the back (`B`).
We need to place the **White-Blue-Red** corner into the back-right slot (`UBR`). It is currently in the bottom layer with White facing the back (`B`), so `R D R'` lifts it cleanly into place:

```rubik-viz
title: "Step 1.1 - Insert the White-Blue-Red Corner into UBR (R D R')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D F' D F R D' R'"
alg: "R D R'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Step 1.2: Insert the 3rd White Corner (`UFL` — White-Green-Orange)
Now the back bar (`UBL` + `UBR`) is solved. Next, we need the **White-Green-Orange** corner in the front-left slot (`UFL`).
It sits below the slot at `DFL`, so we apply `F' D' F` to insert it while matching the **Orange (`L`)** side bar:

```rubik-viz
title: "Step 1.2 - Insert the White-Green-Orange Corner into UFL (F' D' F)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D F' D F"
alg: "F' D' F"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Step 1.3: Insert the 4th and Final White Corner (`UFR` — White-Green-Red)
3 of the 4 White corners are solved! Only the front-right corner (`UFR`, **White-Green-Red**) is missing.
We align it underneath with `D'` and insert it with `R' D' R`, completing the entire **First White Layer** on `U`:

```rubik-viz
title: "Step 1.3 - Complete the First White Layer on U (D' R' D' R)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D"
alg: "D' R' D' R"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### 💡 Phase 1 - Alternative A: Corner with White Facing the Right Side (`D F D F'`)
If the corner in the bottom layer has its **White sticker facing Right (`R`)** instead of Front (`F`), align it under `UFR` with `D` and insert it from the front using `F D F'`. Notice how the cube ends with the **First White Layer solved on `U`**, while the bottom Yellow layer remains scrambled:

```rubik-viz
title: "Phase 1 - Alternative A: Front Insertion When White Faces Right (D F D F')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 F D' F' D'"
alg: "D F D F'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### 💡 Phase 1 - Alternative B: Corner with White Facing Down (`3x R' D' R D`)
If the corner is under `UFR` (`DFR`) with its **White sticker pointing straight Down (`D`)**, repeat the 4-move trigger `(R' D' R D)` **3 times** to twist and insert it into `UFR`:

```rubik-viz
title: "Phase 1 - Alternative B: White Sticker Facing Down (3x R' D' R D)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 D' R' D R D' R' D R D' R' D R"
alg: "R' D' R D R' D' R D R' D' R D"
anchor: start
mask: full
tempo: 1.2
controls: true
```

---

## 🔄 Transition: Flip the Cube Upside Down (`z2`)

With our **First White Layer 100% solved**, we flip the entire cube upside down (`z2`).
From this point on:
- The solved **White layer rests on the Bottom (`D`)**.
- The **Yellow layer is on Top (`U`)** ready for OLL and PLL.

```rubik-viz
title: "Transition - Flip the Cube so Yellow Is on Top (z2)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2"
alg: "z2"
anchor: start
mask: full
tempo: 0.8
controls: true
```

---

## 🟨 Phase 2: Orient the Last Layer Corners (Yellow OLL)

> **Goal**: Make all 4 stickers on the top face (`U`) Yellow, using the classic **Sune (`R U R' U R U2 R'`)** algorithm.

### Step 2.1: Orient the Yellow Face with Sune (`R U R' U R U2 R'`)
Look at the top face (`U`) of our cube:
- **Exactly 1 corner (`UFL`, front-left)** already has its Yellow sticker facing up (`U`).
- The front-right corner (`UFR`) has its Yellow sticker facing **Front (`F`)**.
This is the classic **Sune** case! Applying `R U R' U R U2 R'` orients all 4 Yellow corners on `U` in a single step:

```rubik-viz
title: "Step 2.1 - Orient All 4 Yellow Corners with Sune (R U R' U R U2 R')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R'"
alg: "R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

### 💡 Phase 2 - Alternative A: Anti-Sune Case (`R U2 R' U' R U' R'`)
If you have **1 Yellow corner oriented on `U`**, create the single oriented corner at **back-right (`UBR`)** with Yellow facing **Right (`R`)** at `UFR`, and apply **Anti-Sune (`R U2 R' U' R U' R'`)**. Notice how the cube finishes at the exact Phase 2 milestone (Yellow face oriented on `U`, side corners still awaiting Phase 3 permutation):

```rubik-viz
title: "Phase 2 - Alternative A: Anti-Sune Case (R U2 R' U' R U' R')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U R' U R U2 R'"
alg: "R U2 R' U' R U' R'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

### 💡 Phase 2 - Alternative B: 0 or 2 Yellow Corners on U (Repeating Sune)
What if you have **0** or **2** Yellow stickers on `U`? You don't need a new algorithm — just apply **Sune**, adjust `U`, and apply **Sune** again!
- **0 Yellow corners on `U`**: Hold the cube so a pair of Yellow headlights is on the **Left (`L`)** face.
- **2 Yellow corners on `U`**: Hold the cube so the front-left corner (`UFL`) has its Yellow sticker facing **Front (`F`)**.

```rubik-viz
title: "Phase 2 - Alternative B: 0 Yellow Corners Oriented -> Sune + U' + Sune"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' U R U2 R' U' R U' R'"
alg: "R U R' U R U2 R' U' R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

---

## 🏆 Phase 3: Permute the Last Layer Corners (PLL — Final Solve!)

> **Goal**: Swap the mispositioned top-layer corners so all 4 side faces match, completing the 2x2x2 cube 100%.

### Step 3.1: Adjacent Corner Swap with T-Perm (`R U R' U' R' F R2 U' R' U' R U R' F'`)
Look at the side faces of our top layer (`U`):
- On the **Left face (`L`, Red)**, both top corners already match (**headlights / solved bar on `L`**).
- On the **Right face (`R`, Orange)**, the two corners (`UFR` and `UBR`) are swapped.
Hold the **solved bar on the Left (`L`)** and execute **T-Perm** to swap the two right-hand corners and **finish the 2x2x2 cube 100% solved!**:

```rubik-viz
title: "Step 3.1 - Final T-Perm to Solve the 2x2x2 Cube! (R U R' U' R' F R2 U' R' U' R U R' F')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R'"
alg: "R U R' U' R' F R2 U' R' U' R U R' F'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

### 💡 Phase 3 - Alternative A: Diagonal Corner Swap Without Headlights (Y-Perm)
If **none** of the 4 side faces has a matching pair of top corners (meaning two diagonally opposite corners need to swap), apply **Y-Perm** from any angle (`F R U' R' U' R U R' F' R U R' U' R' F R F'`) — or apply T-Perm once to create a solved bar, place that bar on `L`, and apply T-Perm a second time:

```rubik-viz
title: "Phase 3 - Alternative A: Diagonal Corner Swap with Y-Perm"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U' R U R' F' R U R' U' R' F R F'"
alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

---

## 📋 Quick Summary of the 2x2x2 Beginner Method

| Phase | Milestone | Core Algorithm |
| :--- | :--- | :--- |
| **Phase 1** | First White Layer on `U` (matching side bars) | Right: `R' D' R` · Front: `F D F'` · Facing Down: `3x (R' D' R D)` |
| **Transition** | Put solved White layer on `D`, Yellow on `U` | `z2` |
| **Phase 2 (OLL)** | Orient all 4 Yellow corners on `U` | **Sune**: `R U R' U R U2 R'` · **Anti-Sune**: `R U2 R' U' R U' R'` |
| **Phase 3 (PLL)** | Permute top corners (solved bar on `L`) | **T-Perm**: `R U R' U' R' F R2 U' R' U' R U R' F'` · **Y-Perm** (diagonal): `F R U' R' U' R U R' F' R U R' U' R' F R F'` |
