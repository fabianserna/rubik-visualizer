# 🧩 Progressive Tutorial: How to Solve a Scrambled 3x3x3 Cube (From Start to Finish)

> 🌐 **Language / Idioma:** **🇺🇸 English (Current)** | [🇪🇸 Español](./tutorial-3x3x3.es.md)

> [!tip] Before You Start: How does the **Rubik Studio Visualizer** plugin work?
> This interactive tutorial is powered by the **Rubik Studio Visualizer** plugin (```` ```rubik-viz ```` code blocks).
> If you want to learn how the interactive controls, `3D`/`2D` views, masks, and step-by-step move buttons work first, check out the reference guide in [**`example.md`**](./example.md) (also available on GitHub at [**`fabianserna/rubik-visualizer/blob/main/example.md`**](https://github.com/fabianserna/rubik-visualizer/blob/main/example.md) or in Spanish at [**`example.es.md`**](./example.es.md)).

> [!info] A single scrambled cube that progresses step by step
> In this tutorial, **both the main steps and their alternatives work on a progressively solved cube** (`anchor: start`):
> - During **Phases 1, 2, and 3**, we always keep the **White Center on Top (`U`)**, **Green in Front (`F`)**, and **Red on the Right (`R`)**:
>   - At the end of **Phase 1** (and its *Alternative A*), only the **White Cross** is completed, while the rest of the cube remains scrambled.
>   - At the end of **Phase 2** (and its *Alternatives A & B*), the entire **First White Layer** is completed, while the other two layers remain scrambled.
>   - At the end of **Phase 3** (and its *Alternative A*), **the First Two Layers (F2L)** are completed, leaving only the bottom layer unsolved.
> - **After completing Phase 3**, we flip the cube upside down (**`z2`**) to send the two solved layers to the bottom (`D`) and bring the **Yellow Layer to the top (`U`)** to solve **Phases 4 (OLL) and 5 (PLL)**.

---

## 🎲 State 0: Our Initial Scrambled Cube (*Master Scramble*)

This is the scrambled cube we will start with.
Notice that we have the **White Center on Top (`U`)**, the **Green Center in Front (`F`)**, and the **Red Center on the Right (`R`)**, while all edges and corners are scrambled:

```rubik-viz
title: "State 0: Initial Scrambled 3x3x3 Cube (White on U, Green on F, Red on R)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U F' R2"
alg: ""
mask: full
controls: false
```

---

## ➕ Phase 1: Build the White Cross on the Top Face (`U`)

**Goal:** Bring the 4 white edges around the **White Center (`U`)** while matching each edge with its lateral center (**Green, Red, Blue, and Orange**).

### Step 1.1: Bring up the White-Red edge from the bottom (`R2`)
Look at the right face (`R`): the **White-Red** edge is at the bottom (`DR`), already aligned with its Red center.
Click **Play (▶)** or click the **`R2`** button to bring it up to its spot on the top face (`UR`):

```rubik-viz
title: "Phase 1 - Step 1.1: Bring the White-Red Edge to the Top Cross (R2)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U F' R2"
alg: "R2"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Step 1.2: Flip the inverted White-Green edge (`F U' R U`)
Our cube starts right where Step 1.1 left off.
Look at the **White-Green** edge on the top-front (`UF`): it is in position but **flipped** (green faces up and white faces you).
Execute **`F U' R U`** and watch how, at the end of the animation, **all 4 edges of the White Cross are 100% solved on top**, while the corners and the rest of the cube remain scrambled:

```rubik-viz
title: "Phase 1 - Step 1.2: Flip the White-Green Edge and Complete the White Cross (F U' R U)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U F'"
alg: "F U' R U"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Phase 1 - Alternative A: When the white edge is in the middle layer (`U' R U`)
If at this early stage of the solve the **White-Green** edge is in the **front-right middle layer (`FR`)** with **White facing Front (`F`)**, we move its top slot over with **`U'`**, lift the edge with **`R`**, and restore the cross with **`U`**.
Notice that when the move finishes, **only the top White Cross is solved**, while the corners, middle layer, and bottom layer remain scrambled:

```rubik-viz
title: "Phase 1 - Alternative A: Insert Edge from the Middle Layer (U' R U)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U"
alg: "U' R U"
anchor: start
mask: full
tempo: 0.9
controls: true
```

---

## 📐 Phase 2: Insert the White Corners (Complete the First Top Layer)

We now have the **White Cross solved on `U`**, but we are missing the two front white corners (`UFL` and `UFR`), which are in the bottom layer (`D`).

### Step 2.1: Insert the White-Green-Orange corner on the left (`L D' L'`)
The **White-Green-Orange** corner is at the bottom-left with its white sticker facing you.
By executing **`L D' L'`**, we lower the left column, tuck the corner in, and lift it up to `UFL` without disturbing the White Cross:

```rubik-viz
title: "Phase 2 - Step 2.1: Insert Front-Left White Corner (L D' L')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L'"
alg: "L D' L'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Step 2.2: Insert the last White-Green-Red corner (`F D F'`)
Now only one white corner is missing at `UFR`. The **White-Green-Red** corner is directly below it (`DFR`) with white facing front (`F`).
Execute **`F D F'`** and observe the result: **The entire First White Layer on top is 100% completed, while the middle and bottom layers remain scrambled!**

```rubik-viz
title: "Phase 2 - Step 2.2: Complete the Entire Top White Layer (F D F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F'"
alg: "F D F'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Phase 2 - Alternative A: When White faces Right (`R' D' R`)
If during this second phase the **White-Green-Red** corner is at the bottom in `DFR` with the **White sticker facing Right (`R`)**, we insert it by lowering the right face with **`R' D' R`**.
Notice that when finished, **the entire First White Layer is solved**, while the second and third layers remain scrambled:

```rubik-viz
title: "Phase 2 - Alternative A: Corner with White Facing Right (R' D' R)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' R' D R"
alg: "R' D' R"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Phase 2 - Alternative B: When White faces Down (`R' D2 R D R' D' R`)
If the corner is at the bottom in `DFR` with the **White sticker pointing straight Down (`D`)**:
1. First execute **`R' D2 R`** to twist the corner so the white sticker faces the side.
2. Then position it under its slot with **`D`** and insert it with **`R' D' R`**, completing the **First White Layer** while the rest of the cube remains scrambled:

```rubik-viz
title: "Phase 2 - Alternative B: Corner with White Facing Down D (R' D2 R D R' D' R)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' R' D R D' R' D2 R"
alg: "R' D2 R D R' D' R"
anchor: start
mask: full
tempo: 0.9
controls: true
```

---

## 🧱 Phase 3: Solve the Middle Layer (Keeping White on Top `U`)

We keep the **solved White face on Top (`U`)**, **Green in Front (`F`)**, **Red on the Right (`R`)**, and **Orange on the Left (`L`)**.
Now we will insert the middle-layer edges from the bottom layer (`D`) into the **Front-Left (`FL`)** and **Front-Right (`FR`)** slots without disturbing the top white layer.

### Step 3.1: Insert the Green-Orange edge to the Left (`D L D' L' D' F' D F`)
The **Green-Orange** edge is at the bottom-front (`DF`), aligned with the Green center (`F`), and needs to go into the **left slot (`FL`, between Green and Orange)**:
1. **`D L D' L'`** → Move the edge away to the right (`D`), lower the left corner (`L`), hook the edge (`D'`), and lift back up (`L'`).
2. **`D' F' D F`** → Reinsert the white corner together with its **Green-Orange** edge into the front-left column (`FL`).

```rubik-viz
title: "Phase 3 - Step 3.1: Insert Green-Orange Edge into the Left Middle Slot (D L D' L' D' F' D F)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D'"
alg: "D L D' L' D' F' D F"
anchor: start
mask: full
tempo: 1.0
controls: true
```

### Step 3.2: Insert the Green-Red edge to the Right (`D' R' D R D F D' F'`)
We start right where Step 3.1 finished: the left middle edge is in place.
Now the **Green-Red** edge is at the bottom-front (`DF`), aligned with the Green center (`F`), ready to go into the **right slot (`FR`, between Green and Red)**:
1. **`D' R' D R`** → Move the edge away to the left (`D'`), lower the right side (`R'`), reconnect (`D`), and lift (`R`).
2. **`D F D' F'`** → Insert the white corner together with its **Green-Red** edge into the front-right column (`FR`).

**Watch how the cube looks when this step finishes:** Both the **First White Layer (`U`)** and **the entire Second Middle Layer** are **100% solved** right in front of you!

```rubik-viz
title: "Phase 3 - Step 3.2: Insert Green-Red Edge to the Right and Complete the First 2 Layers (D' R' D R D F D' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D"
alg: "D' R' D R D F D' F'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Phase 3 - Alternative A: Take Out and Reinsert a Flipped Edge in the Middle Layer
If during Phase 3 the **Green-Red** edge is already inside the `FR` slot but **flipped backwards** (Red on front and Green on right):
1. Apply the right-hand algorithm once (**`D' R' D R D F D' F'`**) to **pop it out** into the bottom layer (`D`).
2. Turn **`D2`** to align it with its Green center (`F`).
3. Apply **`D' R' D R D F D' F'`** again to **reinsert it correctly**, leaving the **first two layers (F2L)** solved while the bottom layer remains scrambled:

```rubik-viz
title: "Phase 3 - Alternative A: Take Out and Reinsert a Flipped Edge in the Middle Layer"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D D2 F D F' D' R' D' R D"
alg: "D' R' D R D F D' F' D2 D' R' D R D F D' F'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

---

## 🔄 Transition (After Phase 3): Flip the Cube Upside Down (`z2`)

We have now completed **the entire first two layers** (the White layer and the Middle layer)!
Since the only remaining layer is the **Yellow Layer** hidden at the bottom (`D`), we now **flip the entire cube upside down (`z2`)**:
- The **two solved layers move to the Bottom (`D`)**.
- The **Last Yellow Layer moves to the Top (`U`)**, where we can clearly see it for Phases 4 and 5.

Press **Play (▶)** to watch the cube flip:

```rubik-viz
title: "Transition: Flip the Cube After Phase 3 (z2: Solved F2L Moves to D and Yellow Moves to U)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2"
alg: "z2"
anchor: start
mask: full
tempo: 0.9
controls: true
```

---

## 🟨 Phase 4: Orient the Top Yellow Face (2-Look OLL)

Look at the top face (`U`) after flipping the cube with `z2`: the bottom two layers are solved and on top we have a **Horizontal Yellow Line**.

### Step 4.1: From Horizontal Line to Yellow Cross (`F R U R' U' F'`)
With the yellow line positioned horizontally (left to right), apply **`F R U R' U' F'`**.
When the move finishes, notice that **you now have the Yellow Cross formed on `U`** (forming the "Fish" pattern with 1 yellow corner at `UFL`), while the other 3 corners and side colors are still unsolved:

```rubik-viz
title: "Phase 4 - Step 4.1: Form the Yellow Cross from the Horizontal Line (F R U R' U' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F'"
alg: "F R U R' U' F'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Step 4.1 - Alternative A: When the Center and 2 Edges Form an "L" Shape (`F U R U' R' F'`)
If looking at the top face (`U`) you see the **Yellow Center and 2 adjacent yellow edges forming an "L"**:
1. Rotate the top layer (`U`) until the **"L" points to the Back (`UB`) and Left (`UL`)** (like clock hands at **9:00 and 12:00**).
2. Apply **`F U R U' R' F'`** to jump directly from the **"L"** to the **Yellow Cross**, leaving the corners and side colors for the next steps:

```rubik-viz
title: "Step 4.1 - Alternative A: From 'L' Shape (9 and 12 o'clock) to Yellow Cross (F U R U' R' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F R U R' U' F'"
alg: "F U R U' R' F'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Step 4.1 - Alternative B: From Yellow Dot to Yellow Cross (`F R U R' U' F' U2 F U R U' R' F'`)
If after flipping the cube you only see the **Yellow Center (Dot Case)** with no yellow edges facing up:
1. Apply the Line algorithm (**`F R U R' U' F'`**) from any angle to create the **"L" shape**.
2. Turn **`U2`** to place the **"L" at 9:00 and 12:00**, then apply the "L" algorithm (**`F U R U' R' F'`**). Notice that at the end **the Yellow Cross is formed**, while the corners and side colors remain pending for Step 4.2:

```rubik-viz
title: "Step 4.1 - Alternative B: From Yellow Dot to Yellow Cross (F R U R' U' F' U2 F U R U' R' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F R U R' U' F' U2 F U R U' R' F'"
alg: "F R U R' U' F' U2 F U R U' R' F'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

### Step 4.2: Orient the Yellow Corners with Sune (`R U R' U R U2 R'`)
Starting from the exact "Fish" state left by Step 4.1 (with the single oriented yellow corner at **Front-Left `UFL`**), we apply **Sune (`R U R' U R U2 R'`)**.
When the animation ends, **the entire top face (`U`) is 100% yellow**, though looking at the upper side colors shows the corners and edges still need permutation:

```rubik-viz
title: "Phase 4 - Step 4.2: Complete the Entire Yellow Face with Sune (R U R' U R U2 R')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R'"
alg: "R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Step 4.2 - Alternative A: Anti-Sune Case (`R U2 R' U' R U' R'`)
If you have the "Fish" pattern (only 1 yellow corner on top), but when placing that corner at `UFL` the yellow sticker at `UFR` **does not face you**, place the solved yellow corner at **Back-Right (`UBR`)** (with a yellow sticker facing you at `UFR`) and apply **Anti-Sune (`R U2 R' U' R U' R'`)**.
Notice that when finished, **the entire top face (`U`) is yellow**, while the lateral colors of the last layer (Phase 5) remain scrambled:

```rubik-viz
title: "Step 4.2 - Alternative A: Orient Corners with Anti-Sune (R U2 R' U' R U' R')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U R' U R U2 R'"
alg: "R U2 R' U' R U' R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Step 4.2 - Alternative B: When 0 or 2 Yellow Corners Face Up (Double Sune)
If you have the Yellow Cross with **zero** (0) or **two** (2) yellow corners facing up, simply apply **Sune**, adjust with `U'`, and apply **Sune** a second time.
Notice that when finished, **the entire top face (`U`) is yellow**, leaving only the lateral colors to be permuted in Phase 5:

```rubik-viz
title: "Step 4.2 - Alternative B: Solve 0 Corners / Double Cross with Double Sune (R U R' U R U2 R' U' R U R' U R U2 R')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' U R U2 R' U' R U' R'"
alg: "R U R' U R U2 R' U' R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

---

## 🏁 Phase 5: Permute the Last Layer Lateral Colors (2-Look PLL)

We are in the home stretch: the first two layers and the entire yellow face are complete. All that remains is ordering the outer rim of the top layer.

### Step 5.1: Permute the 4 Top Corners with T-Perm
In the state left by Step 4.2, the two left corners (`L`) already share the same color ("headlights"), while the two right corners (`R`) are swapped.
We execute **T-Perm (`R U R' U' R' F R2 U' R' U' R U R' F'`)**: when finished, **all 4 top corners are in their correct faces** (and the back Blue face is completely solved), leaving only the 3 front edges to cycle:

```rubik-viz
title: "Phase 5 - Step 5.1: Permute the 4 Top Corners with T-Perm"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R'"
alg: "R U R' U' R' F R2 U' R' U' R U R' F'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

#### 💡 Step 5.1 - Alternative A: No "Headlights" — Diagonal Corner Swap (Y-Perm)
If you check all 4 upper sides and **no face has two matching corners** ("no headlights"), two corners need to be swapped diagonally. Apply **Y-Perm (`F R U' R' U' R U R' F' R U R' U' R' F R F'`)** (or apply T-Perm twice).
Notice that when finished, **all 4 top corners are solved on their respective faces**, while the 3 top edges remain pending for Step 5.2:

```rubik-viz
title: "Step 5.1 - Alternative A: Diagonal Corner Swap with Y-Perm (No Headlights)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U' R U R' F' R U R' U' R' F R F'"
alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

### Step 5.2: Final Step — Cycle the Last 3 Edges (Ua-Perm)
We start in the exact state left by Step 5.1: only the 3 top edges are swapped among themselves, with the solved Blue face at the back (`B`).
Execute **`R U' R U R U R U' R' U' R2`** (counter-clockwise 3-edge cycle) and now: **The cube is 100% solved!**

```rubik-viz
title: "Phase 5 - Step 5.2: Final Counter-Clockwise 3-Edge Cycle & 100% Solved Cube (Ua-Perm)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R'"
alg: "R U' R U R U R U' R' U' R2"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Step 5.2 - Alternative A: Clockwise 3-Edge Cycle (Ub-Perm: `R2 U R U R' U' R' U' R' U R'`)
If in this final step—with the solved face at the back (`B`)—the 3 edges need to cycle **clockwise** (Left → Right → Front), apply **Ub-Perm (`R2 U R U R' U' R' U' R' U R'`)**:

```rubik-viz
title: "Step 5.2 - Alternative A: Clockwise Cycle of the 3 Top Edges (Ub-Perm)"
puzzle: 3x3x3
view: 3D
setup: "z2 R U' R U R U R U' R' U' R2"
alg: "R2 U R U R' U' R' U' R' U R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Step 5.2 - Alternative B: All 4 Opposite Edges Swapped (H-Perm: `M2 U M2 U2 M2 U M2`)
If in this final step none of the 4 top edges are solved and each needs to swap with its **opposite** side (Green ↔ Blue and Red ↔ Orange), apply **H-Perm (`M2 U M2 U2 M2 U M2`)**:

```rubik-viz
title: "Step 5.2 - Alternative B: Swap All 4 Opposite Edges (H-Perm)"
puzzle: 3x3x3
view: 3D
setup: "z2 M2 U' M2 U2 M2 U' M2"
alg: "M2 U M2 U2 M2 U M2"
anchor: start
mask: full
tempo: 1.1
controls: true
```
