# 🟧 Progressive Tutorial: How to Solve a Scrambled 4x4x4 Cube (From Start to Finish)

> 🌐 **Language / Idioma:** **🇺🇸 English (Current)** | [🇪🇸 Español](./tutorial-4x4x4.es.md)

> [!tip] Before You Start: How does the **Rubik Studio Visualizer** plugin work?
> This interactive tutorial is powered by the **Rubik Studio Visualizer** plugin (```` ```rubik-viz ```` code blocks).
> If you want to learn how the interactive controls, `3D`/`2D` views, masks, and step-by-step move buttons work first, check out the reference guide in [**`example.md`**](./example.md) (also available on GitHub at [**`fabianserna/rubik-visualizer/blob/main/example.md`**](https://github.com/fabianserna/rubik-visualizer/blob/main/example.md) or in Spanish at [**`example.es.md`**](./example.es.md)).

> [!info] A single scrambled 4x4x4 cube that evolves step by step
> In this tutorial, **both the main steps and their alternatives work on a progressively solved 4x4x4 cube** (`anchor: start`):
> - In **Phase 1** (and its *Alternative A*) we solve the **Centers ($2\times 2$)**, and when finished **the edges and last layer remain scrambled**.
> - In **Phase 2** (and its *Alternative A*) we pair the **Last 2 Edges** without breaking the centers, while the last layer corners and parities remain unsolved.
> - In **Phase 3** we flip the cube (`z2`) and orient the corners just like on a 3x3x3.
> - In **Phase 4** we first solve **OLL Parity** in **Step 4.1** (leaving only PLL Parity pending) and finally apply **PLL Parity** in **Step 4.2** (or its *Alternatives A & B*) to leave the cube **100% solved**.
>
> 💡 **Automatic Highlighting:** All **wide double-layer moves (`Rw`, `Uw`, `Lw`)** and **inner-slice moves (`2R2`)** are automatically **highlighted in amber** below the cube.

---

## 🎲 State 0: Our Initial Scrambled 4x4x4 Cube

Here is the initial 4x4x4 cube before we begin:
- The **Green (`F`)** and **White (`U`)** centers have split 1x2 bars.
- The front edges (**`FL`** and **`FR`**) are unpaired.
- The Yellow layer has both **OLL Parity** and **PLL Parity** waiting at the end.

```rubik-viz
title: "State 0: Initial Scrambled 4x4x4 Cube (Centers, Edges, and Parities Pending)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw Rw U' Rw'"
alg: ""
mask: full
controls: false
```

---

## 🎯 Phase 1: Complete the Centers ($2\times 2$)

> [!warning] 4x4x4 Color Scheme (BOY)
> Since a 4x4x4 cube has no fixed center pieces, remember that with **White on Top (`U`)** and **Green in Front (`F`)**, **Red always goes on the Right (`R`)**, **Orange on the Left (`L`)**, **Blue in Back (`B`)**, and **Yellow on the Bottom (`D`)**.

### Step 1.1: Join the last bars of the Top (`U`) and Front (`F`) Centers (`Rw U Rw'`)
On our initial cube, look at the **White (`U`)** and **Green (`F`)** faces: each has its right vertical bar swapped.
By executing **`Rw U Rw'`**, we lift the right half, turn `U` to join the bars, and return `Rw'`.
**Watch the result at the end of the step:** All **6 centers ($2\times 2$) are 100% completed**, while the front edges (`FL` and `FR`) and the rest of the cube remain scrambled:

```rubik-viz
title: "Phase 1 - Step 1.1: Complete All 6 Centers (2x2) While Edges Remain Unsolved (Rw U Rw')"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw Rw U' Rw'"
alg: "Rw U Rw'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Phase 1 - Alternative A: Insert a bar into the Top Center (`U`) without breaking the Bottom Center (`D`) (`Rw U2 Rw'`)
When you already have the **White Center solved on the bottom (`D`)** and are building the opposite **Yellow Center on top (`U`)**, lifting a yellow bar from the front (`F`) with `Rw` temporarily pushes a white bar from the bottom to the back.
To **insert the yellow bar on top and return the white bar intact to the bottom**, align both bars on the right half of `U` and `F` and execute **`Rw U2 Rw'`**.
Notice that when finished, **only the 6 centers ($2\times 2$) are completed**, while the edges and corners remain scrambled as expected in Phase 1:

```rubik-viz
title: "Phase 1 - Alternative A: Insert Bar into Opposite Center Without Breaking D (Rw U2 Rw')"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw z2 Rw U2 Rw'"
alg: "Rw U2 Rw'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

---

## 🔗 Phase 2: Pair the Edges (*Edge Pairing - Slice, Flip, Slice*)

We start in the exact state where Step 1.1 left off: **all 6 centers are solved**, but look at the two front columns (**Front-Left `FL`** and **Front-Right `FR`**): their edge pieces are unpaired and sit across from each other in the same horizontal row.

### Step 2.1: Pair the 2 Front Edges (`Uw' R U R' F R' F' R Uw`)
We apply the **Slice (`Uw'`) + Flip right edge (`R U R' F R' F' R`) + Restore centers (`Uw`)** technique:
1. **`Uw'`** → Shifts the top two layers to temporarily join the first pair.
2. **`R U R' F R' F' R`** → Flips the Front-Right (`FR`) edge in place.
3. **`Uw`** → Slices the top two layers back to restore the centers and pair the second edge.
**Watch how the cube ends:** All 6 centers remain intact and **all 12 double edges are now paired**, while the corners and parities of the yellow layer remain unsolved!

```rubik-viz
title: "Phase 2 - Step 2.1: Pair the Front Edges with Slice-Flip-Slice (Uw' R U R' F R' F' R Uw)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw"
alg: "Uw' R U R' F R' F' R Uw"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Phase 2 - Alternative A: When the 2 Edge Pieces Are Diagonal (One on top in `FL` and its partner on bottom in `FR`)
If during this second phase the two edge pieces you want to pair have matching colors facing you in `FL` and `FR` but **sit diagonally** (one in the upper slot and the other in the lower slot), **first** apply the flipping algorithm **`R U R' F R' F' R`** to put them in the same horizontal row, and then execute **`Uw' R U R' F R' F' R Uw`**.
Notice that when finished, **all 6 centers and 12 edges are paired**, while the last-layer corners and parities remain pending for Phases 3 and 4:

```rubik-viz
title: "Phase 2 - Alternative A: Diagonal Edge Pieces — Flip First, Then Slice-Flip-Slice"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw R' F R F' R U' R'"
alg: "R U R' F R' F' R Uw' R U R' F R' F' R Uw"
anchor: start
mask: full
tempo: 1.1
controls: true
```

---

## 🧩 Phase 3: Flip the Cube (`z2`) and 3x3x3 Stage

With all 6 centers and 12 edges paired, the 4x4x4 now turns like a standard **3x3x3**.

### Step 3.1: Flip to the Yellow Face (`z2`) and Orient Corners with Sune (`z2 R U R' U R U2 R'`)
In this block we start from the exact state where Phase 2 finished:
1. First we flip the cube upside down (**`z2`**) to bring the **Yellow Face to the Top (`U`)** and place the solved White layer at the bottom (`D`).
2. Next we apply **Sune (`R U R' U R U2 R'`)** using only outer layers to orient the 4 yellow corners.
**Watch how the cube looks when finished:** All 4 yellow corners are oriented, clearly revealing **OLL Parity** on the top-front edge (`UF`)!

```rubik-viz
title: "Phase 3 - Step 3.1: Flip to the Yellow Face (z2) and Orient Corners with Sune"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2"
alg: "z2 R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

---

## ⚡ Phase 4: Solve the 2 Parities on the Yellow Face (`U`)

### 🟧 Step 4.1: Solve OLL Parity (Flipped Yellow-Green Edge at `UF`)
We start right where Step 3.1 left off.
Look at the top face (`U`): everything is yellow **except the front double edge (`UF`)**, which has **Green facing up** and **Yellow facing you**.
We execute the **OLL Parity** algorithm:
**`Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'`**

**Watch the state at the end of this step:** The front edge is now flipped and the entire top face (`U`) is 100% yellow! However, look at the side color of the front edge (`UF` is Blue above the Green center) and back edge (`UB` is Green above the Blue center): **PLL Parity is still waiting**.

```rubik-viz
title: "Phase 4 - Step 4.1: Solve OLL Parity (Leaving Only PLL Parity Pending)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw'"
alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

---

### 🟪 Step 4.2: Final Step — Solve PLL Parity (`2R2 U2 2R2 Uw2 2R2 Uw2`)
We start in the exact state left by Step 4.1: the entire cube is solved except for the **two opposite edges `UF` (Blue) and `UB` (Green)** swapped with each other.
Execute the 6 moves of **PLL Parity**:
**`2R2 U2 2R2 Uw2 2R2 Uw2`**
And watch how on the sixth move the **4x4x4 cube is 100% solved**!

```rubik-viz
title: "Phase 4 - Step 4.2: Solve PLL Parity and Swap the Last 2 Edges (100% Solved Cube)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Step 4.2 - Alternative A: When the 2 Swapped Edges Are Adjacent (`UF` and `UR`)
If at this final step the two swapped double edges are **next to each other** (at Front `UF` and Right `UR`):
1. Execute **`R U R' U'`** to temporarily place them opposite each other.
2. Execute **PLL Parity (`2R2 U2 2R2 Uw2 2R2 Uw2`)**.
3. Undo the setup moves with **`U R U' R'`** to leave the cube **100% solved**:

```rubik-viz
title: "Step 4.2 - Alternative A: Adjacent Swapped Edges UF and UR (R U R' U' 2R2 U2 2R2 Uw2 2R2 Uw2 U R U' R')"
puzzle: 4x4x4
view: 3D
setup: "z2 R U R' U' Uw2 2R2 Uw2 2R2 U2 2R2 U R U' R'"
alg: "R U R' U' 2R2 U2 2R2 Uw2 2R2 Uw2 U R U' R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Step 4.2 - Alternative B: When Only 2 Top Corners Appear Swapped
If at this final step all edges appear solved but **only 2 corners are swapped** (for example the two right corners `UFR` and `UBR`), this is also **PLL Parity**:
1. Apply **PLL Parity (`2R2 U2 2R2 Uw2 2R2 Uw2`)** to convert the case into a standard 3x3x3 PLL.
2. Turn **`U'`** and apply **T-Perm (`R U R' U' R' F R2 U' R' U' R U R' F'`)** followed by **`U`** to finish the cube:

```rubik-viz
title: "Step 4.2 - Alternative B: 2 Top Corners Swapped (PLL Parity + T-Perm)"
puzzle: 4x4x4
view: 3D
setup: "z2 U' F R U' R' U R U R2 F' R U R U' R' U Uw2 2R2 Uw2 2R2 U2 2R2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2 U' R U R' U' R' F R2 U' R' U' R U R' F' U"
anchor: start
mask: full
tempo: 1.2
controls: true
```
