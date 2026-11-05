# 🧊 Tutorial Progresivo 2x2x2 (Pocket Cube — Método por Capas)

> 🌐 **Idioma / Language**: [English](tutorial-2x2x2.md) | **Español**

¡Bienvenido al tutorial interactivo paso a paso para armar el cubo **2x2x2 (Pocket Cube)**! A diferencia de las tablas de algoritmos aislados, en esta nota **resolveremos exactamente el mismo cubo 2x2x2 desordenado de principio a fin**.

> 📌 **Antes de empezar (Guía de Funcionamiento del Plugin)**:
> Este tutorial interactivo funciona gracias al plugin **Rubik Studio Visualizer** (bloques de código `rubik-viz`). Si antes de comenzar deseas entender cómo funciona cada propiedad del plugin (`puzzle: 2x2x2`, `view`, `setup`, `alg`, `anchor`, `tempo`, `controls`), puedes consultar la nota de referencia en GitHub: **[`example.es.md`](https://github.com/fabianserna/rubik-visualizer/blob/main/example.es.md)** (*English version*: **[`example.md`](https://github.com/fabianserna/rubik-visualizer/blob/main/example.md)**).

Cada bloque `rubik-viz` de esta guía está configurado con `puzzle: 2x2x2` y `anchor: start`:
1. **Antes de darle Play**, ves el **estado exacto en el que quedó nuestro cubo al terminar el paso anterior**.
2. **Al darle Play** (o hacer clic movimiento por movimiento en los botones debajo del cubo), ves cómo el algoritmo transforma el cubo hasta alcanzar la **siguiente meta**.
3. **Jerarquía Estandarizada**: A lo largo del tutorial, los pasos principales siguen la secuencia **`Fase X` → `Paso X.Y`**, y las variantes opcionales mantienen la jerarquía explícita **`Fase X - Alternativa A/B`** para identificar claramente a qué fase pertenecen, terminando en el nivel de avance real de esa fase (sin saltar a un cubo completamente armado antes de tiempo).

---

## 🔍 Concepto Clave: El Cubo 2x2x2 son las 8 Esquinas de un 3x3x3

El cubo **2x2x2** **no tiene centros ni aristas** — está formado exclusivamente por **8 esquinas**:
1. Como no existen centros fijos, en la **Fase 1** **tú eliges una esquina blanca cualquiera como pieza de referencia fija** y armas las otras 3 esquinas blancas alrededor de ella haciendo coincidir sus colores laterales.
2. En la **Fase 2 (OLL)** y **Fase 3 (PLL)**, utilizas **exactamente los mismos algoritmos de esquinas** del método de 3x3x3 (`Sune`, `Anti-Sune`, `T-Perm`, `Y-Perm`).

---

## 🎲 Estado 0: Nuestro Cubo 2x2x2 Inicial Desordenado

Comenzamos con la cara **Blanca arriba (`U`)**, **Verde al frente (`F`)** y **Roja a la derecha (`R`)**.
Tomaremos como esquina fija de referencia la esquina **Blanco-Azul-Naranja (`UBL`, atrás a la izquierda)**, que ya tiene su color blanco mirando hacia arriba (`U`):

```rubik-viz
title: "Estado 0 - Cubo 2x2x2 Inicial Desordenado (Esquina de Referencia UBL Lista)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D F' D F R D' R'"
alg: ""
anchor: start
mask: full
controls: false
```

---

## ⬜ Fase 1: Armar la Primera Capa Blanca (Con Colores Laterales Coincidentes)

> **Objetivo**: Colocar las 4 esquinas blancas en la capa superior (`U`) de modo que toda la cara `U` sea blanca **y además** los colores laterales de cada par de esquinas vecinas coincidan formando barras del mismo color (Azul en `B`, Naranja en `L`, Verde en `F`, Rojo en `R`).

### Paso 1.1: Formar la Barra Trasera Blanco-Azul (Esquina `UBR`)
Nuestra esquina de referencia en `UBL` tiene **Blanco** arriba (`U`) y **Azul** atrás (`B`).
Debemos colocar a su lado (`UBR`, atrás a la derecha) la esquina que también tiene **Blanco y Azul** (la esquina **Blanco-Azul-Rojo**). Como está en la capa inferior con el blanco mirando hacia atrás (`B`), `R D R'` la sube directamente a su lugar:

```rubik-viz
title: "Paso 1.1 - Insertar Esquina Blanco-Azul-Rojo en UBR (R D R')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D F' D F R D' R'"
alg: "R D R'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Paso 1.2: Insertar la 3ª Esquina Blanca (`UFL` — Blanco-Verde-Naranja)
Con la barra trasera Azul completada (`UBL` + `UBR`), ahora buscamos la esquina **Blanco-Verde-Naranja** para la posición frontal-izquierda (`UFL`).
Está justo debajo en `DFL`, así que ejecutamos `F' D' F` para subirla emparejando también la barra lateral **Naranja (`L`)**:

```rubik-viz
title: "Paso 1.2 - Insertar Esquina Blanco-Verde-Naranja en UFL (F' D' F)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D F' D F"
alg: "F' D' F"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### Paso 1.3: Insertar la 4ª y Última Esquina Blanca (`UFR` — Blanco-Verde-Rojo)
Ya tenemos 3 de las 4 esquinas blancas resueltas. Solo falta la esquina frontal-derecha (`UFR`, **Blanco-Verde-Rojo**).
La ubicamos debajo de su destino con `D'` y la insertamos con `R' D' R`, dejando **toda la Primera Capa Blanca 100% resuelta**:

```rubik-viz
title: "Paso 1.3 - Completar la Primera Capa Blanca en U (D' R' D' R)"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 R' D R D"
alg: "D' R' D' R"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### 💡 Fase 1 - Alternativa A: Esquina con el Blanco Mirando a la Derecha (`D F D F'`)
Si la esquina en la capa inferior tiene su **pegatina blanca mirando hacia la Derecha (`R`)** en lugar del Frente (`F`), ubícala debajo de `UFR` con `D` e insértala por el frente con `F D F'`. Observa cómo el ejemplo termina con la **Primera Capa Blanca armada en `U`**, mientras la capa inferior amarilla sigue desordenada:

```rubik-viz
title: "Fase 1 - Alternativa A: Inserción Frontal con Blanco a la Derecha (D F D F')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R' z2 F D' F' D'"
alg: "D F D F'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

### 💡 Fase 1 - Alternativa B: Esquina con el Blanco Mirando Hacia Abajo (`3x R' D' R D`)
Si la esquina está debajo de `UFR` (`DFR`) pero con su **pegatina blanca apuntando hacia abajo (`D`)**, repite el ciclo de 4 movimientos `(R' D' R D)` **3 veces seguidas** para girarla e insertarla en `UFR`:

```rubik-viz
title: "Fase 1 - Alternativa B: Blanco Mirando Hacia Abajo (3x R' D' R D)"
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

## 🔄 Transición: Voltear el Cubo (`z2`)

Con nuestra **Primera Capa Blanca 100% armada**, damos media vuelta completa al cubo (`z2`).
A partir de este momento:
- La **capa Blanca resuelta descansa abajo (`D`)**.
- La **capa Amarilla queda arriba (`U`)** lista para orientar (OLL) y permutar (PLL).

```rubik-viz
title: "Transición - Voltear el Cubo para Poner Amarillo Arriba (z2)"
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

## 🟨 Fase 2: Orientar las Esquinas de la Última Capa (OLL Amarillo)

> **Objetivo**: Hacer que las 4 esquinas superiores tengan el color **Amarillo mirando hacia arriba (`U`)** utilizando el algoritmo clásico **Sune (`R U R' U R U2 R'`)**.

### Paso 2.1: Orientar toda la Cara Amarilla con Sune (`R U R' U R U2 R'`)
Observa la cara superior (`U`) de nuestro cubo:
- **Exactamente 1 esquina (`UFL`, frente-izquierda)** ya tiene el amarillo mirando hacia arriba (`U`).
- La esquina frontal-derecha (`UFR`) tiene su pegatina amarilla mirando hacia el **Frente (`F`)**.
Este es el caso **Sune**. Al ejecutar `R U R' U R U2 R'`, las 4 esquinas quedan con el amarillo hacia arriba:

```rubik-viz
title: "Paso 2.1 - Orientar las 4 Esquinas Amarillas con Sune (R U R' U R U2 R')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U2 R' U' R U' R'"
alg: "R U R' U R U2 R'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

### 💡 Fase 2 - Alternativa A: Caso Anti-Sune (`R U2 R' U' R U' R'`)
Si tienes **1 sola esquina amarilla orientada en `U`**, pero al ponerla atrás a la derecha (`UBR`) la esquina `UFR` tiene el amarillo mirando a la **Derecha (`R`)**, aplica **Anti-Sune (`R U2 R' U' R U' R'`)**. Observa cómo el cubo termina exactamente en el nivel de avance de esta Fase 2 (cara amarilla orientada en `U`, pero con las esquinas laterales aún pendientes de permutar en la Fase 3):

```rubik-viz
title: "Fase 2 - Alternativa A: Caso Anti-Sune (R U2 R' U' R U' R')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R' R U R' U R U2 R'"
alg: "R U2 R' U' R U' R'"
anchor: start
mask: full
tempo: 1.0
controls: true
```

### 💡 Fase 2 - Alternativa B: 0 o 2 Esquinas Amarillas en U (Repetir Sune)
¿Qué pasa si ninguna (`0`) o `2` esquinas tienen amarillo arriba (`U`)? No necesitas aprender otro algoritmo: basta con aplicar **Sune**, acomodar `U` y volver a aplicar **Sune**:
- **Si hay 0 esquinas amarillas en `U`**: Sujeta el cubo con dos pegatinas amarillas ("faros") mirando hacia la **Izquierda (`L`)**.
- **Si hay 2 esquinas amarillas en `U`**: Sujeta el cubo de modo que la esquina frontal-izquierda (`UFL`) tenga su pegatina amarilla mirando al **Frente (`F`)**.

```rubik-viz
title: "Fase 2 - Alternativa B: 0 Esquinas Amarillas en U -> Sune + U' + Sune"
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

## 🏆 Fase 3: Permutar las Esquinas de la Última Capa (PLL — ¡Cubo Resuelto!)

> **Objetivo**: Intercambiar las esquinas superiores para que coincidan las 4 caras laterales y terminar el cubo 2x2x2 al 100%.

### Paso 3.1: Permutación de Esquinas Adyacentes con T-Perm (`R U R' U' R' F R2 U' R' U' R U R' F'`)
Observa los colores laterales de la capa superior (`U`):
- En la **cara Izquierda (`L`, Roja)**, las dos esquinas superiores ya coinciden formando una **barra resuelta ("faros" en `L`)**.
- En la **cara Derecha (`R`, Naranja)**, las dos esquinas (`UFR` y `UBR`) están intercambiadas.
Sujetando la **barra resuelta a la Izquierda (`L`)**, aplicamos **T-Perm** para intercambiar las dos esquinas derechas y **terminar nuestro cubo 2x2x2 100% resuelto**:

```rubik-viz
title: "Paso 3.1 - ¡T-Perm Final para Resolver el Cubo 2x2x2! (R U R' U' R' F R2 U' R' U' R U R' F')"
puzzle: 2x2x2
view: 3D
setup: "z2 F R U' R' U R U R2 F' R U R U' R'"
alg: "R U R' U' R' F R2 U' R' U' R U R' F'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

### 💡 Fase 3 - Alternativa A: Intercambio Diagonal sin Barra Resuelta (Y-Perm)
Si en ninguna de las 4 caras laterales hay un par de esquinas del mismo color (intercambio diagonal de esquinas), puedes aplicar directamente **Y-Perm** desde cualquier ángulo (`F R U' R' U' R U R' F' R U R' U' R' F R F'`), o bien ejecutar T-Perm una vez para crear una barra resuelta, colocarla a la izquierda (`L`) y aplicar T-Perm una segunda vez:

```rubik-viz
title: "Fase 3 - Alternativa A: Intercambio Diagonal de Esquinas con Y-Perm"
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

## 📋 Resumen Rápido del Método por Capas 2x2x2

| Fase | Meta | Algoritmo Principal |
| :--- | :--- | :--- |
| **Fase 1** | Primera Capa Blanca en `U` (con barras laterales) | Derecha: `R' D' R` · Frente: `F D F'` · Blanco abajo: `3x (R' D' R D)` |
| **Transición** | Poner capa Blanca en `D` y Amarilla en `U` | `z2` |
| **Fase 2 (OLL)** | Orientar las 4 esquinas amarillas en `U` | **Sune**: `R U R' U R U2 R'` · **Anti-Sune**: `R U2 R' U' R U' R'` |
| **Fase 3 (PLL)** | Permutar esquinas superiores (barra en `L`) | **T-Perm**: `R U R' U' R' F R2 U' R' U' R U R' F'` · **Y-Perm** (diagonal): `F R U' R' U' R U R' F' R U R' U' R' F R F'` |
