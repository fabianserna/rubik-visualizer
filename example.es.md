# 🧊 Guía Interactiva: Movimientos, Posición Inicial y Funciones de Rubik Studio Visualizer

> 🌐 **Idioma / Language:** [🇺🇸 English](./example.md) | **🇪🇸 Español (Actual)**

Esta nota de ejemplo está diseñada para abrirse en **Obsidian** con el plugin **Rubik Studio Visualizer** activo. En cada ejemplo verás primero el **bloque de código (`yaml`)** para que puedas leer y copiar los parámetros, e inmediatamente debajo el **bloque `rubik-viz` renderizado en vivo** por el plugin.

---

## 🛠️ 1. Funciones Propias del Plugin y Cómo Usarlas en esta Guía

Cada bloque `rubik-viz` incorpora herramientas interactivas diseñadas específicamente en el plugin para estudiar algoritmos y ubicaciones espaciales:

1. **Botonera Interactiva de Movimientos Paso a Paso (`tokenizeAlg` + `setActiveStep`):**
   - Debajo del cubo, el plugin divide automáticamente el parámetro `alg` en **botones individuales por movimiento**.
   - Haz clic sobre cualquier botón (por ejemplo, el 3.er movimiento): el plugin posicionará el cubo **exactamente en el estado posterior a ese giro**, iluminará el movimiento actual (`is-active`) y marcará los movimientos previos ya aplicados (`is-past`).
2. **Conmutador en Vivo `3d o 2d` (`3D / 2D`):**
   - En la esquina superior derecha de cada tarjeta tienes un botón para alternar en vivo entre **3D** y la **planta desplegada 2D (Net)** sin editar la nota.
   - En 3D solo ves 3 caras a la vez (`U`, `F`, `R`). Si haces clic en un movimiento y luego pulsas **`3d o 2d`**, verás al instante qué pasó en las caras traseras e inferiores (`B`, `L`, `D`).
3. **Botones `Centrar` y `Reiniciar`:**
   - Pulsa **`Centrar`** para volver al ángulo de cámara natural (`U`, `F`, `R`) sin perder el paso en el que vas.
   - Si estuviste inspeccionando pasos intermedios o cambiaste entre 2D/3D, pulsa **`Reiniciar`** para restaurar el algoritmo al inicio (`jumpToStart()`) y centrar la vista del cubo.
4. **Cálculo de Inversión Automática (`invertMoves` con `anchor: end`):**
   - Cuando configuras `anchor: end`, el plugin calcula internamente la secuencia inversa del algoritmo junto con tu `setup` para que puedas usar los **botones de movimiento paso a paso** y ver cómo el cubo desordenado converge hasta quedar resuelto en el último botón.
5. **Barra de Estado `Setup:` y Badges de Cabecera (`3x3` / `4x4` + `mask`):**
   - La cabecera identifica automáticamente el tamaño del cubo (`3x3` o `4x4`) y la máscara activa (`OLL`, `PLL`, `F2L`, `centers`). Además, cuando defines una ubicación inicial con `setup`, el plugin muestra debajo del visor la barra `Setup:`.

---

## 🧭 2. Ubicación de la Posición Inicial del Cubo

Antes de ejecutar cualquier movimiento, necesitas saber **dónde está cada color** y cómo el plugin ubica el cubo en el espacio.

### 2.1 Orientación Estándar Inicial (`setup` vacío)
Cuando no especificas `setup`, el cubo se inicializa con la orientación oficial WCA:

| Cara | Letra | Ubicación en el visor 3D | Color inicial |
| :--- | :---: | :--- | :--- |
| **Up** | `U` | Cara superior | ⬜ **Blanco** |
| **Down** | `D` | Cara inferior (oculta en 3D) | 🟨 **Amarillo** |
| **Front** | `F` | Cara frontal izquierda | 🟩 **Verde** |
| **Right** | `R` | Cara frontal derecha | 🟥 **Rojo** |
| **Back** | `B` | Cara trasera derecha (oculta en 3D) | 🟦 **Azul** |
| **Left** | `L` | Cara trasera izquierda (oculta en 3D) | 🟧 **Naranja** |

> [!TIP]
> Usa el botón **`3d o 2d`** en la esquina superior derecha de la tarjeta para desplegar las 6 caras y comprobar dónde se ubican **Amarillo (`D`)**, **Naranja (`L`)** y **Azul (`B`)**.

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Orientación Estándar Inicial (U = Blanco, F = Verde)"
puzzle: 3x3x3
view: 3D
controls: false
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Orientación Estándar Inicial (U = Blanco, F = Verde)"
puzzle: 3x3x3
view: 3D
controls: false
```

---

### 2.2 Orientación Speedcubing con `setup: "z2"` (Amarillo arriba, Blanco abajo)
En speedcubing (F2L, OLL y PLL), la cara `U` suele ser la **amarilla** y la `D` la **blanca**. Aplicando `setup: "z2"` el plugin ubica el cubo en esa posición inicial y muestra la barra inferior `Setup: z2`:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Orientación Speedcubing (setup: z2 → Amarillo arriba, Blanco abajo)"
puzzle: 3x3x3
view: 3D
setup: "z2"
controls: false
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Orientación Speedcubing (setup: z2 → Amarillo arriba, Blanco abajo)"
puzzle: 3x3x3
view: 3D
setup: "z2"
controls: false
```

---

### 2.3 Reubicar la Posición Inicial con Rotaciones (`x`, `y`, `z`) y `mask: centers`
Si usamos `mask: centers` (que oculta aristas y esquinas dejando solo los **6 centros**), podemos ver con total claridad cómo las rotaciones espaciales cambian la ubicación del cubo. Haz clic en cada botón inferior (`x`, `x'`, `y`, `y'`, `z`, `z'`) para inspeccionar cómo se mueven los centros:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Ubicación de Centros con Rotaciones Espaciales (mask: centers)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "x x' y y' z z'"
mask: centers
tempo: 0.8
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Ubicación de Centros con Rotaciones Espaciales (mask: centers)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "x x' y y' z z'"
mask: centers
tempo: 0.8
controls: true
```

---

## 🔄 3. Cómo Funciona Cada Movimiento (Inspección Paso a Paso)

Cada letra gira su cara **90°** como si la miraras de frente:
- **Letra sola (`R`, `U`, `F`, `L`, `D`, `B`):** Giro de **90° en sentido horario**.
- **Letra con apóstrofe (`R'`, `U'`, `F'`, `L'`, `D'`, `B'`):** Giro de **90° en sentido antihorario**.
- **Letra con `2` (`R2`, `U2`, `F2`, ...):** Giro doble de **180°**.

### 3.1 Giros de las 6 Caras Externas (`R`, `U`, `F`, `L`, `D`, `B`)
Haz clic en cada botón de movimiento debajo del cubo (`R`, `U`, `F`, `L`, `D`, `B`) para animar ese paso exacto, y usa **`3d o 2d`** para ver el efecto en las caras traseras:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Giros Horarios de las 6 Caras (90°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U F L D B"
tempo: 0.8
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Giros Horarios de las 6 Caras (90°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R U F L D B"
tempo: 0.8
controls: true
```

---

### 3.2 Comparación: Horario (`R`), Antihorario (`R'`) y Doble (`R2`)
Haz clic sucesivamente en los botones inferiores para ver cómo `R` sube la capa derecha 90°, `R'` la devuelve a su posición inicial y `R2` realiza un giro de 180°:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Modificadores: Normal (90°), Prima (-90°) y Doble (180°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R R' R2 U U' U2 F F' F2"
tempo: 0.8
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Modificadores: Normal (90°), Prima (-90°) y Doble (180°)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "R R' R2 U U' U2 F F' F2"
tempo: 0.8
controls: true
```

---

### 3.3 Capas Centrales / Slices (`M`, `E`, `S`)
Las capas intermedias del cubo 3x3 se mueven con tres letras:
- **`M` (Middle):** Entre `L` y `R` (gira en la misma dirección que **`L`**, hacia abajo por el frente).
- **`E` (Equatorial):** Entre `U` y `D` (gira en la misma dirección que **`D`**).
- **`S` (Standing):** Entre `F` y `B` (gira en la misma dirección que **`F`**).

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Capas Centrales: M, E, S y sus inversos"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "M M' E E' S S'"
tempo: 0.8
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Capas Centrales: M, E, S y sus inversos"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "M M' E E' S S'"
tempo: 0.8
controls: true
```

---

### 3.4 Giros de Doble Capa / Wide Moves (`Rw`, `Uw`, `Fw`)
Mueven **dos capas simultáneamente** (la cara externa junto con su capa central adyacente):

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Giros de Doble Capa (Wide Moves)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "Rw Rw' Uw Uw' Fw Fw'"
tempo: 0.8
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Giros de Doble Capa (Wide Moves)"
puzzle: 3x3x3
view: 3D
setup: "z2"
alg: "Rw Rw' Uw Uw' Fw Fw'"
tempo: 0.8
controls: true
```

---

## 🎯 4. Ubicación de Casos con `anchor: start` vs `anchor: end` y Máscaras

### 4.1 Modo `anchor: start` (Aplica `setup` y ejecuta `alg` desde ahí)
El cubo aplica primero `setup: "z2 F' U' F"` y luego anima `alg: "U R U' R'"`. Con `mask: F2L`, el plugin atenúa la capa superior para resaltar únicamente las dos primeras capas:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "F2L Básico - Inserción del par Frontal-Derecho (anchor: start)"
puzzle: 3x3x3
view: 3D
setup: "z2 F' U' F"
alg: "U R U' R'"
anchor: start
mask: F2L
tempo: 1
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "F2L Básico - Inserción del par Frontal-Derecho (anchor: start)"
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

### 4.2 Modo `anchor: end` con `mask: OLL` (Termina con el cubo resuelto)
Con `anchor: end`, el plugin calcula automáticamente el estado inverso (`invertMoves`) para mostrar el caso **OLL 27 (Sune)** listo para resolver. Haz clic desde el primer hasta el último botón de movimiento para ver cómo se orienta toda la cara superior amarilla:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
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

**Resultado renderizado por el plugin:**
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

### 4.3 Modo `anchor: end` con `mask: PLL`
Aquí el plugin resalta las piezas de la última capa (`mask: PLL`) y termina con el cubo resuelto al finalizar la **T Perm**:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
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

**Resultado renderizado por el plugin:**
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

## 🧩 5. Cubo 4x4x4 (`puzzle: 4x4x4`) y Capas Internas

En el cubo **4x4x4**, el plugin activa el badge `4x4` y soporta giros de capa externa (`R`), doble capa (`Rw`) y **segunda capa interna sola** (`2R`, `2U`):

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "Movimientos en 4x4x4: Externa (R), Doble (Rw) e Interna (2R)"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "R R' Rw Rw' 2R 2R' 2U 2U'"
tempo: 0.9
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "Movimientos en 4x4x4: Externa (R), Doble (Rw) e Interna (2R)"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "R R' Rw Rw' 2R 2R' 2U 2U'"
tempo: 0.9
controls: true
```

---

### 5.1 Paridad de OLL en 4x4x4

Observa cómo los movimientos de capas dobles (`Rw`, `Lw`) se **resaltan automáticamente en color ámbar/naranja** debajo del cubo para distinguirlos de los giros externos (`U2`) y rotaciones (`x`):

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "4x4x4 - Algoritmo de Paridad de OLL"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'"
anchor: end
tempo: 1.5
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "4x4x4 - Algoritmo de Paridad de OLL"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'"
anchor: end
tempo: 1.5
controls: true
```

---

### 5.2 Paridad de PLL en 4x4x4

En la paridad de PLL se combinan movimientos de **segunda capa interna sola** (`2R2`), **capas dobles** (`Uw2`) y **capa externa** (`U2`). El plugin resalta tanto `2R2` como `Uw2`:

**Código del bloque (`rubik-viz`):**
```yaml
# Bloque ```rubik-viz
title: "4x4x4 - Algoritmo de Paridad de PLL"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: end
tempo: 1.2
controls: true
```

**Resultado renderizado por el plugin:**
```rubik-viz
title: "4x4x4 - Algoritmo de Paridad de PLL"
puzzle: 4x4x4
view: 3D
setup: "z2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: end
tempo: 1.2
controls: true
```
