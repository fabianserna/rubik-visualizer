# 🧩 Tutorial Progresivo: Cómo Armar un Cubo 3x3x3 Desordenado (De Principio a Fin)

> 🌐 **Idioma / Language:** [🇺🇸 English](./tutorial-3x3x3.md) | **🇪🇸 Español (Actual)**

> [!tip] Antes de empezar: ¿Cómo funciona el plugin **Rubik Studio Visualizer**?
> Este tutorial interactivo funciona gracias al plugin **Rubik Studio Visualizer** (bloques ```` ```rubik-viz ````).
> Si quieres conocer primero cómo funcionan los controles interactivos, las vistas `3D`/`2D`, las máscaras y los botones de movimientos paso a paso, consulta la guía de referencia en [**`example.es.md`**](./example.es.md) (también disponible en GitHub en [**`fabianserna/rubik-visualizer/blob/main/example.es.md`**](https://github.com/fabianserna/rubik-visualizer/blob/main/example.es.md) o en inglés en [**`example.md`**](./example.md)).

> [!info] Un mismo cubo desordenado que se va armando paso a paso
> En este tutorial **tanto los pasos principales como sus alternativas trabajan sobre un cubo que avanza progresivamente** (`anchor: start`):
> - Durante las **Fases 1, 2 y 3** mantenemos siempre el **Centro Blanco Arriba (`U`)**, el **Verde al Frente (`F`)** y el **Rojo a la Derecha (`R`)**:
>   - Al terminar la **Fase 1** (y su *Alternativa A*), queda lista únicamente la **Cruz Blanca**, mientras el resto del cubo sigue desordenado.
>   - Al terminar la **Fase 2** (y sus *Alternativas A y B*), queda lista toda la **Primera Capa Blanca**, mientras las otras dos capas siguen desordenadas.
>   - Al terminar la **Fase 3** (y su *Alternativa A*), quedan listas **las Dos Primeras Capas completas (F2L)**, dejando solo la capa inferior pendiente.
> - **Después de terminar la Fase 3**, damos la vuelta al cubo (**`z2`**) para enviar las dos capas ya armadas hacia abajo (`D`) y subir la **Capa Amarilla a la vista (`U`)** para resolver las **Fases 4 (OLL) y 5 (PLL)**.

---

## 🎲 Estado 0: Nuestro Cubo Desordenado Inicial (*Scramble Maestro*)

Este es el cubo revuelto con el que vamos a empezar.
Observa que tenemos el **Centro Blanco Arriba (`U`)**, el **Centro Verde al Frente (`F`)** y el **Centro Rojo a la Derecha (`R`)**, pero todas sus aristas y esquinas están desordenadas:

```rubik-viz
title: "Estado 0: Cubo 3x3x3 Desordenado Inicial (Blanco Arriba U, Verde al Frente F, Rojo a la Derecha R)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U F' R2"
alg: ""
mask: full
controls: false
```

---

## ➕ Fase 1: Armar la Cruz Blanca en la Cara Superior (`U`)

**Objetivo:** Subir las 4 aristas blancas alrededor del **Centro Blanco (`U`)** haciendo que coincidan con los centros laterales (**Verde, Rojo, Azul y Naranja**).

### Paso 1.1: Subir la arista Blanco-Rojo desde abajo (`R2`)
Mira la cara derecha (`R`): la arista **Blanco-Rojo** está en la parte inferior (`DR`) alineada con su centro Rojo.
Haz clic en **Play (▶)** o en el botón **`R2`** para subirla a su lugar en la cara superior (`UR`):

```rubik-viz
title: "Fase 1 - Paso 1.1: Subir Arista Blanco-Rojo a la Cruz Superior (R2)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U F' R2"
alg: "R2"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Paso 1.2: Voltear la arista Blanco-Verde invertida (`F U' R U`)
Nuestro cubo arranca exactamente donde quedó el Paso 1.1.
Observa la arista **Blanco-Verde** en el frente superior (`UF`): está en su posición pero **al revés** (el verde mira hacia arriba y el blanco hacia ti).
Ejecuta **`F U' R U`** y observa cómo al terminar la animación **las 4 aristas de la Cruz Blanca quedan 100% armadas arriba**, mientras las esquinas y el resto del cubo siguen desordenados:

```rubik-viz
title: "Fase 1 - Paso 1.2: Voltear Arista Blanco-Verde y Completar la Cruz Blanca (F U' R U)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L' U' R' U F'"
alg: "F U' R U"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Fase 1 - Alternativa A: Cuando la arista blanca está en la capa media lateral (`U' R U`)
Si en esta etapa inicial de armado la arista **Blanco-Verde** se encuentra en la **capa media derecha (`FR`)** con el **Blanco mirando al frente (`F`)**, abrimos su espacio arriba con **`U'`**, subimos la arista con **`R`** y devolvemos la cruz con **`U`**.
Observa que al finalizar **solo queda lista la Cruz Blanca superior**, mientras las esquinas, la capa media y la capa inferior continúan desordenadas:

```rubik-viz
title: "Fase 1 - Alternativa A: Insertar Arista desde la Capa Media (U' R U)"
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

## 📐 Fase 2: Colocar las Esquinas Blancas (Completar la Primera Capa Superior)

Ya tenemos la **Cruz Blanca armada en `U`**, pero nos faltan las dos esquinas blancas frontales (`UFL` y `UFR`), que están abajo en la capa inferior (`D`).

### Paso 2.1: Subir la esquina Blanco-Verde-Naranja a la izquierda (`L D' L'`)
La esquina **Blanco-Verde-Naranja** está abajo a la izquierda con el blanco mirándote de frente.
Al ejecutar **`L D' L'`**, bajamos la columna izquierda, encajamos la esquina y la subimos a `UFL` sin desarmar la Cruz Blanca:

```rubik-viz
title: "Fase 2 - Paso 2.1: Insertar Esquina Blanca Frontal-Izquierda (L D' L')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F' L D L'"
alg: "L D' L'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Paso 2.2: Subir la última esquina Blanco-Verde-Rojo (`F D F'`)
Ahora solo falta una esquina blanca en `UFR`. La esquina **Blanco-Verde-Rojo** está justo debajo (`DFR`) con el blanco apuntando al frente (`F`).
Ejecuta **`F D F'`** y observa el resultado final: **¡Toda la Primera Capa Blanca superior está 100% terminada, mientras la capa media y la inferior siguen desordenadas!**

```rubik-viz
title: "Fase 2 - Paso 2.2: Completar Toda la Primera Capa Blanca Superior (F D F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' F D' F'"
alg: "F D F'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Fase 2 - Alternativa A: Cuando el Blanco apunta hacia la Derecha (`R' D' R`)
Si en esta segunda fase la esquina **Blanco-Verde-Rojo** está abajo en `DFR` pero con la pegatina **Blanca mirando hacia la Derecha (`R`)**, la insertamos bajando la cara derecha con **`R' D' R`**.
Observa que al terminar **queda armada toda la Primera Capa Blanca**, mientras la segunda y tercera capa siguen desordenadas:

```rubik-viz
title: "Fase 2 - Alternativa A: Esquina con el Blanco mirando a la Derecha (R' D' R)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D' R' D R"
alg: "R' D' R"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Fase 2 - Alternativa B: Cuando el Blanco apunta hacia Abajo (`R' D2 R D R' D' R`)
Si la esquina está abajo en `DFR` pero la pegatina **Blanca apunta directo hacia el suelo (`D`)**:
1. Primero hacemos **`R' D2 R`** para girar la esquina y lograr que el blanco pase a mirar de lado.
2. Luego la colocamos bajo su esquina con **`D`** y la subimos con **`R' D' R`**, completando la **Primera Capa Blanca** mientras el resto del cubo sigue desordenado:

```rubik-viz
title: "Fase 2 - Alternativa B: Esquina con el Blanco mirando hacia Abajo D (R' D2 R D R' D' R)"
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

## 🧱 Fase 3: Armar la Segunda Capa (Manteniendo el Blanco Arriba en `U`)

Seguimos con la **cara Blanca armada arriba (`U`)**, el **Verde al Frente (`F`)**, el **Rojo a la Derecha (`R`)** y el **Naranja a la Izquierda (`L`)**.
Ahora vamos a subir las aristas de la capa media desde la capa inferior (`D`) hacia los huecos **Frontal-Izquierdo (`FL`)** y **Frontal-Derecho (`FR`)** sin desarmar la cara blanca superior.

### Paso 3.1: Insertar la arista Verde-Naranja hacia la Izquierda (`D L D' L' D' F' D F`)
La arista **Verde-Naranja** está abajo en el frente (`DF`), alineada con el centro Verde (`F`), y debe subir al hueco de la **izquierda (`FL`, entre Verde y Naranja)**:
1. **`D L D' L'`** → Aleja la arista por abajo hacia la derecha (`D`), baja la esquina izquierda (`L`), engancha la arista (`D'`) y sube (`L'`).
2. **`D' F' D F`** → Vuelve a meter la esquina blanca junto con su arista **Verde-Naranja** en la columna frontal-izquierda (`FL`).

```rubik-viz
title: "Fase 3 - Paso 3.1: Insertar Arista Verde-Naranja en la Capa Media Izquierda (D L D' L' D' F' D F)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D F' D' F D L D L' D'"
alg: "D L D' L' D' F' D F"
anchor: start
mask: full
tempo: 1.0
controls: true
```

### Paso 3.2: Insertar la arista Verde-Rojo hacia la Derecha (`D' R' D R D F D' F'`)
Arrancamos donde terminó el Paso 3.1: el lado izquierdo ya tiene su arista media puesta.
Ahora la arista **Verde-Rojo** está abajo en el frente (`DF`), alineada con el centro Verde (`F`), lista para subir al hueco de la **derecha (`FR`, entre Verde y Rojo)**:
1. **`D' R' D R`** → Aleja la arista por abajo hacia la izquierda (`D'`), baja la derecha (`R'`), recupera (`D`) y sube (`R`).
2. **`D F D' F'`** → Inserta la esquina blanca junto con su arista **Verde-Rojo** en la columna frontal-derecha (`FR`).

**Observa cómo queda el cubo al terminar este paso:** ¡Tanto la **Primera Capa Blanca (`U`)** como **toda la Segunda Capa Media** están **100% armadas** frente a tus ojos!

```rubik-viz
title: "Fase 3 - Paso 3.2: Insertar Arista Verde-Rojo a la Derecha y Completar las 2 Primeras Capas (D' R' D R D F D' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F' z2 F D F' D' R' D' R D"
alg: "D' R' D R D F D' F'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Fase 3 - Alternativa A: Sacar y Reinsertar una Arista Invertida en la Capa Media
Si durante la Fase 3 la arista **Verde-Rojo** ya está metida en la columna `FR` pero **con los colores invertidos** (Rojo en el frente y Verde a la derecha):
1. Aplicamos una vez el algoritmo de la derecha (**`D' R' D R D F D' F'`**) para **sacarla** hacia la capa inferior (`D`).
2. Giramos **`D2`** para alinearla con su centro Verde (`F`).
3. Volvemos a aplicar **`D' R' D R D F D' F'`** para **reinsertarla derecha**, dejando listas las **dos primeras capas (F2L)** mientras la capa inferior sigue desordenada:

```rubik-viz
title: "Fase 3 - Alternativa A: Sacar y Reinsertar una Arista Invertida en la Capa Media"
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

## 🔄 Transición (Después de la Fase 3): Damos la Vuelta al Cubo (`z2`)

¡Ya completamos **las dos primeras capas enteras** (la capa Blanca y la capa Media)!
Como la única capa que falta por resolver es la **Capa Amarilla** que estaba escondida abajo (`D`), ahora **damos media vuelta completa al cubo (`z2`)**:
- Las **dos primeras capas ya terminadas pasan hacia Abajo (`D`)**.
- La **Última Capa Amarilla sube a la Cara Superior (`U`)**, donde la veremos de frente para las Fases 4 y 5.

Dale a **Play (▶)** para ver cómo volteamos el cubo:

```rubik-viz
title: "Transición: Voltear el Cubo después de la Fase 3 (z2: Las 2 Capas Armadas pasan Abajo y Amarillo sube a U)"
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

## 🟨 Fase 4: Orientar la Cara Amarilla Superior (OLL en 2 Pasos)

Mira cómo quedó la cara superior (`U`) tras voltear el cubo con `z2`: las dos capas inferiores están resueltas y arriba tenemos una **Línea Amarilla horizontal**.

### Paso 4.1: De Línea Horizontal a Cruz Amarilla (`F R U R' U' F'`)
Con la línea amarilla en posición horizontal (de izquierda a derecha), aplicamos **`F R U R' U' F'`**.
Al finalizar el movimiento, observa que **ya tienes la Cruz Amarilla armada en `U`** (formando la figura de "el Pez" con 1 esquina amarilla en `UFL`), pero las otras 3 esquinas y los lados aún no están resueltos:

```rubik-viz
title: "Fase 4 - Paso 4.1: Formar la Cruz Amarilla desde la Línea Horizontal (F R U R' U' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F U R U' R' F'"
alg: "F R U R' U' F'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Paso 4.1 - Alternativa A: Cuando queda el Centro y 2 Aristas en forma de "L" (`F U R U' R' F'`)
Si al mirar la cara superior (`U`) ves el **Centro Amarillo y 2 aristas amarillas adyacentes formando una "L"**:
1. Gira la capa superior (`U`) hasta colocar la **"L" mirando hacia Atrás (`UB`) y hacia la Izquierda (`UL`)** (como las agujas del reloj marcando las **9 y las 12**).
2. Aplica **`F U R U' R' F'`** para pasar directamente de la **"L"** a la **Cruz Amarilla**, quedando aún pendientes por orientar las esquinas y los lados:

```rubik-viz
title: "Paso 4.1 - Alternativa A: De Forma de 'L' (9 y 12 del reloj) a Cruz Amarilla (F U R U' R' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F R U R' U' F'"
alg: "F U R U' R' F'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Paso 4.1 - Alternativa B: Del Punto Amarillo a la Cruz Amarilla (`F R U R' U' F' U2 F U R U' R' F'`)
Si al voltear el cubo ves únicamente el **Centro Amarillo (El Punto)** sin ninguna de las 4 aristas amarillas mirando hacia arriba:
1. Aplica el algoritmo de la Línea (**`F R U R' U' F'`**) desde cualquier cara para hacer aparecer la **"L"**.
2. Gira **`U2`** para ubicar la **"L" a las 9 y 12 del reloj** y aplica el algoritmo de la "L" (**`F U R U' R' F'`**). Observa que al terminar **queda armada la Cruz Amarilla**, mientras las esquinas y bordes laterales siguen pendientes para el Paso 4.2:

```rubik-viz
title: "Paso 4.1 - Alternativa B: Del Punto Amarillo a la Cruz Amarilla (F R U R' U' F' U2 F U R U' R' F')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' F R U R' U' F' U2 F U R U' R' F'"
alg: "F R U R' U' F' U2 F U R U' R' F'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

### Paso 4.2: Orientar las Esquinas Amarillas con Sune (`R U R' U R U2 R'`)
Partiendo exactamente del "Pez" que nos dejó el Paso 4.1 (con la única esquina amarilla arriba ubicada en **Frontal-Izquierda `UFL`**), aplicamos **Sune (`R U R' U R U2 R'`)**.
Al terminar la animación, **toda la cara superior (`U`) es 100% amarilla**, pero si miras los colores laterales de arriba verás que las esquinas y aristas aún están desordenadas:

```rubik-viz
title: "Fase 4 - Paso 4.2: Completar toda la Cara Amarilla con Sune (R U R' U R U2 R')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R'"
alg: "R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Paso 4.2 - Alternativa A: Caso Anti-Sune (`R U2 R' U' R U' R'`)
Si tienes la figura de "el Pez" (1 sola esquina amarilla arriba), pero al poner esa esquina en `UFL` la pegatina amarilla de `UFR` **no te mira de frente**, coloca la esquina amarilla resuelta en **Trasera-Derecha (`UBR`)** (con una pegatina amarilla mirándote de frente en `UFR`) y aplica **Anti-Sune (`R U2 R' U' R U' R'`)**.
Observa que al terminar **toda la cara superior (`U`) queda amarilla**, mientras los colores laterales de la última capa (Fase 5) siguen desordenados:

```rubik-viz
title: "Paso 4.2 - Alternativa A: Orientar las Esquinas con Anti-Sune (R U2 R' U' R U' R')"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R' R U R' U R U2 R'"
alg: "R U2 R' U' R U' R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Paso 4.2 - Alternativa B: Cuando tienes 0 o 2 Esquinas Amarillas arriba (Doble Sune)
Si tienes la Cruz Amarilla pero **ninguna** (0) o **dos** (2) esquinas amarillas miran hacia arriba, basta con aplicar **Sune**, reorientar `U'` y volver a aplicar **Sune**.
Observa que al finalizar **toda la cara superior (`U`) queda amarilla**, dejando únicamente pendientes de permutar los colores laterales para la Fase 5:

```rubik-viz
title: "Paso 4.2 - Alternativa B: Resolver 0 Esquinas / Cruz Doble con Doble Sune (R U R' U R U2 R' U' R U R' U R U2 R')"
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

## 🏁 Fase 5: Permutar los Colores Laterales de la Última Capa (PLL en 2 Pasos)

Estamos en la recta final: las dos primeras capas y toda la cara amarilla están listas. Solo falta ordenar el borde de la capa superior.

### Paso 5.1: Ordenar las 4 Esquinas Superiores con T-Perm
En el estado donde nos dejó el Paso 4.2, las dos esquinas de la izquierda (`L`) ya son del mismo color ("faros"), mientras que las dos esquinas de la derecha (`R`) están intercambiadas.
Ejecutamos **T-Perm (`R U R' U' R' F R2 U' R' U' R U R' F'`)**: al terminar, **las 4 esquinas superiores quedan en sus caras correctas** (y la cara Azul trasera queda completa), faltando únicamente rotar las 3 aristas de adelante:

```rubik-viz
title: "Fase 5 - Paso 5.1: Ordenar las 4 Esquinas Superiores con T-Perm"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U R U R2 F' R U R U' R'"
alg: "R U R' U' R' F R2 U' R' U' R U R' F'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

#### 💡 Paso 5.1 - Alternativa A: Sin "Faros" — Intercambio Diagonal de Esquinas (Y-Perm)
Si al revisar los 4 lados superiores **ninguna cara tiene dos esquinas del mismo color** ("sin faros"), significa que hay que intercambiar dos esquinas en diagonal. Aplica **Y-Perm (`F R U' R' U' R U R' F' R U R' U' R' F R F'`)** (o aplica T-Perm dos veces).
Observa que al terminar **las 4 esquinas superiores quedan ordenadas en sus caras**, pero las 3 aristas superiores aún siguen pendientes para el Paso 5.2:

```rubik-viz
title: "Paso 5.1 - Alternativa A: Intercambio Diagonal de Esquinas con Y-Perm (Sin Faros)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R' F R U' R' U' R U R' F' R U R' U' R' F R F'"
alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
anchor: start
mask: full
tempo: 1.2
controls: true
```

### Paso 5.2: Paso Final — Rotar las Últimas 3 Aristas (Ua-Perm)
Arrancamos en el estado exacto que dejó el Paso 5.1: solo las 3 aristas superiores están intercambiadas entre sí, con la cara Azul resuelta atrás (`B`).
Ejecuta **`R U' R U R U R U' R' U' R2`** (ciclo antihorario de 3 aristas) y ahora sí: **¡El cubo queda 100% resuelto!**

```rubik-viz
title: "Fase 5 - Paso 5.2: Ciclo Final Antihorario de 3 Aristas y Cubo 100% Resuelto (Ua-Perm)"
puzzle: 3x3x3
view: 3D
setup: "z2 R2 U R U R' U' R' U' R' U R'"
alg: "R U' R U R U R U' R' U' R2"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Paso 5.2 - Alternativa A: Ciclo Horario de 3 Aristas (Ub-Perm: `R2 U R U R' U' R' U' R' U R'`)
Si en este paso final con la cara completa atrás (`B`) las 3 aristas deben rotar en **sentido horario** (Izquierda → Derecha → Frente), aplica **Ub-Perm (`R2 U R U R' U' R' U' R' U R'`)**:

```rubik-viz
title: "Paso 5.2 - Alternativa A: Ciclo Horario de las 3 Aristas Superiores (Ub-Perm)"
puzzle: 3x3x3
view: 3D
setup: "z2 R U' R U R U R U' R' U' R2"
alg: "R2 U R U R' U' R' U' R' U R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Paso 5.2 - Alternativa B: Las 4 Aristas Opuestas Intercambiadas (H-Perm: `M2 U M2 U2 M2 U M2`)
Si en este paso final ninguna de las 4 aristas superiores está resuelta y cada una debe ir al lado **opuesto** (Verde ↔ Azul y Rojo ↔ Naranja), aplica **H-Perm (`M2 U M2 U2 M2 U M2`)**:

```rubik-viz
title: "Paso 5.2 - Alternativa B: Intercambiar las 4 Aristas Opuestas (H-Perm)"
puzzle: 3x3x3
view: 3D
setup: "z2 M2 U' M2 U2 M2 U' M2"
alg: "M2 U M2 U2 M2 U M2"
anchor: start
mask: full
tempo: 1.1
controls: true
```
