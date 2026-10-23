# 🟧 Tutorial Progresivo: Cómo Armar un Cubo 4x4x4 Desordenado (De Principio a Fin)

> [!info] Un mismo cubo 4x4x4 desarmado que evoluciona paso a paso
> En este tutorial todos los bloques usan **`anchor: start` sobre el mismo cubo 4x4x4 desordenado**:
> - En la **Fase 1** armamos los **Centros ($2\times 2$)** y verás que al terminar **las aristas y la última capa siguen desordenadas**.
> - En la **Fase 2** emparejamos las **Últimas 2 Aristas** sin desarmar los centros, pero la última capa sigue con sus paridades pendientes.
> - En la **Fase 3** volteamos el cubo (`z2`) y orientamos las esquinas como en un 3x3x3.
> - En la **Fase 4** resolvemos primero la **Paridad de OLL** (dejando solo la Paridad de PLL pendiente) y finalmente aplicamos la **Paridad de PLL** para dejar el cubo **100% resuelto**.
>
> 💡 **Resaltado Automático:** Todos los giros de **capas dobles (`Rw`, `Uw`, `Lw`)** y **capas internas (`2R2`)** aparecen **resaltados en color ámbar** debajo del cubo.

---

## 🎲 Estado 0: Nuestro Cubo 4x4x4 Desordenado Inicial

Aquí tienes el cubo 4x4x4 inicial antes de empezar:
- Los centros **Verde (`F`)** y **Blanco (`U`)** tienen sus barras partidas.
- Las aristas frontales (**`FL`** y **`FR`**) están separadas/desparejadas.
- La capa Amarilla tiene tanto **Paridad de OLL** como **Paridad de PLL** esperando al final.

```rubik-viz
title: "Estado 0 - Cubo 4x4x4 Desordenado Inicial (Centros, Aristas y Paridades pendientes)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw Rw U' Rw'"
alg: ""
mask: full
controls: false
```

---

## 🎯 Fase 1: Terminar los Centros ($2\times 2$)

> [!warning] Esquema de colores en el 4x4x4 (BOY)
> Como el 4x4x4 no tiene centros fijos, recuerda que con el **Blanco Arriba (`U`)** y el **Verde al Frente (`F`)**, el **Rojo va siempre a la Derecha (`R`)**, el **Naranja a la Izquierda (`L`)**, el **Azul Atrás (`B`)** y el **Amarillo Abajo (`D`)**.

### Paso 1.1: Unir las últimas barras de los Centros Superior (`U`) y Frontal (`F`) (`Rw U Rw'`)
En nuestro cubo inicial, mira la cara **Blanca (`U`)** y la cara **Verde (`F`)**: cada una tiene su barra derecha intercambiada.
Al ejecutar **`Rw U Rw'`**, subimos la mitad derecha, giramos `U` para emparejar las barras y regresamos `Rw'`.
**Observa el resultado al final del paso:** Los **6 centros ($2\times 2$) quedan 100% terminados**, pero las aristas frontales (`FL` y `FR`) y el resto del cubo siguen desordenados:

```rubik-viz
title: "Paso 1.1 - Completar los 6 Centros 2x2 sin resolver aún las Aristas (Rw U Rw')"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw Rw U' Rw'"
alg: "Rw U Rw'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

#### 💡 Opción Alternativa en Fase 1: Subir una barra al Centro Superior (`U`) sin romper el Centro Inferior (`D`) (`Rw U2 Rw'`)
*(Caso independiente)*: Cuando ya tienes el **Centro Blanco resuelto abajo (`D`)** y estás armando el **Centro Amarillo opuesto arriba (`U`)**, si subes una barra amarilla desde el frente (`F`) con `Rw`, sacarás una barra blanca de abajo hacia atrás.
Para **insertar la barra amarilla arriba y devolver intacta la barra blanca a su sitio abajo**, coloca ambas barras en la mitad derecha de `U` y `F` y ejecuta **`Rw U2 Rw'`**:

```rubik-viz
title: "Fase 1 (Opción Alternativa) - Subir Barra al Centro Opuesto sin desarmar Abajo (Rw U2 Rw')"
puzzle: 4x4x4
view: 3D
setup: "z2 Rw U2 Rw'"
alg: "Rw U2 Rw'"
anchor: start
mask: full
tempo: 0.9
controls: true
```

---

## 🔗 Fase 2: Emparejar las Aristas (*Edge Pairing - Slice, Flip, Slice*)

Partimos exactamente del estado donde nos dejó el Paso 1.1: **los 6 centros ya están armados**, pero mira las dos columnas de adelante (**Frontal-Izquierda `FL`** y **Frontal-Derecha `FR`**): sus piezas de arista están desparejadas y enfrentadas en la misma fila horizontal.

### Paso 2.1: Emparejar las 2 Aristas Frontales (`Uw' R U R' F R' F' R Uw`)
Aplicamos la técnica **Cortar (`Uw'`) + Voltear arista derecha (`R U R' F R' F' R`) + Restaurar centros (`Uw`)**:
1. **`Uw'`** → Desplaza las dos capas superiores para juntar temporalmente el par.
2. **`R U R' F R' F' R`** → Voltea la arista Frontal-Derecha (`FR`) sobre sí misma.
3. **`Uw`** → Regresa las dos capas superiores.
**Observa cómo termina el cubo:** ¡Los 6 centros siguen intactos y las **12 aristas dobles ya están emparejadas**, pero las esquinas y paridades de la capa amarilla siguen sin resolver!

```rubik-viz
title: "Paso 2.1 - Emparejar las Aristas Frontales con Slice-Flip-Slice (Uw' R U R' F R' F' R Uw)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2 Rw U2 Rw U2 Rw' U2 Rw U2 Lw' U2 Rw U2 Rw' U2 Rw' x' U2 Rw' R U2 R' U' R U' R' z2 Uw' R' F R F' R U' R' Uw"
alg: "Uw' R U R' F R' F' R Uw"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Opción Alternativa en Fase 2: Cuando las 2 piezas de arista están en Diagonal (Una arriba en `FL` y su pareja abajo en `FR`)
*(Caso independiente)*: Si las dos piezas que quieres emparejar tienen los mismos colores mirándote de frente en `FL` y `FR`, pero **están en diagonal** (una en la mitad superior y otra en la mitad inferior), **primero** aplica el algoritmo de volteo **`R U R' F R' F' R`** para ponerlas en la misma fila horizontal, y enseguida ejecuta **`Uw' R U R' F R' F' R Uw`**:

```rubik-viz
title: "Fase 2 (Opción Alternativa) - Piezas en Diagonal: Voltear primero y luego Slice-Flip-Slice"
puzzle: 4x4x4
view: 3D
setup: "Uw' R' F R F' R U' R' Uw R' F R F' R U' R'"
alg: "R U R' F R' F' R Uw' R U R' F R' F' R Uw"
anchor: start
mask: full
tempo: 1.1
controls: true
```

---

## 🧩 Fase 3: Voltear el Cubo (`z2`) y Etapa 3x3x3

Con los 6 centros y las 12 aristas emparejadas, el 4x4x4 ya se mueve como un **3x3x3**.
En este bloque partimos del estado exacto donde terminó el Paso 2.1:
1. Primero damos la vuelta al cubo (**`z2`**) para poner la **cara Amarilla Arriba (`U`)** y dejar la capa Blanca ya armada abajo (`D`).
2. Luego aplicamos **Sune (`R U R' U R U2 R'`)** usando solo las capas externas para orientar las 4 esquinas amarillas.
**Observa cómo queda el cubo al terminar:** ¡Las 4 esquinas amarillas quedan orientadas, revelando claramente en el frente superior (`UF`) la **Paridad de OLL**!

```rubik-viz
title: "Paso 3.1 - Voltear a la Cara Amarilla (z2) y Orientar Esquinas con Sune"
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

## ⚡ Fase 4: Resolver las 2 Paridades en la Cara Amarilla (`U`)

### 🟧 Paso 4.1: Resolver la Paridad de OLL (Arista Amarilla-Verde volteada en `UF`)
Arrancamos exactamente donde terminó el Paso 3.1.
Mira la cara superior (`U`): toda es amarilla **excepto la arista doble frontal (`UF`)**, que tiene el color **Verde hacia arriba** y el **Amarillo hacia ti**.
Ejecutamos el algoritmo de **Paridad de OLL**:
**`Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'`**

**Observa el estado al terminar este paso:** ¡La arista frontal ya se volteó y toda la cara superior (`U`) es 100% amarilla! Pero fíjate en el color lateral de la arista frontal (`UF` es Azul sobre el centro Verde) y trasera (`UB` es Verde sobre el centro Azul): **aún nos queda la Paridad de PLL**.

```rubik-viz
title: "Paso 4.1 - Resolver Paridad de OLL (Quedando pendiente solo la Paridad de PLL)"
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

### 🟪 Paso 4.2: Paso Final — Resolver la Paridad de PLL (`2R2 U2 2R2 Uw2 2R2 Uw2`)
Arrancamos en el estado exacto que nos dejó el Paso 4.1: todo el cubo está armado salvo las **dos aristas opuestas `UF` (Azul) y `UB` (Verde)** que están intercambiadas entre sí.
Ejecuta los 6 movimientos de la **Paridad de PLL**:
**`2R2 U2 2R2 Uw2 2R2 Uw2`**
¡Y observa cómo al terminar el sexto movimiento el cubo **4x4x4 queda 100% resuelto**!

```rubik-viz
title: "Paso 4.2 - Resolver Paridad de PLL e Intercambiar las 2 Últimas Aristas (Cubo 100% Resuelto)"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: start
mask: full
tempo: 1.0
controls: true
```

#### 💡 Opción Alternativa A en 4.2: Cuando las 2 Aristas Intercambiadas son Adyacentes (`UF` y `UR`)
*(Caso independiente)*: Si al llegar al final las dos únicas aristas dobles intercambiadas están **una al lado de la otra** (en el Frente `UF` y en la Derecha `UR`):
1. Hacemos **`R U R' U'`** para colocarlas temporalmente una frente a la otra (opuestas).
2. Ejecutamos la **Paridad de PLL (`2R2 U2 2R2 Uw2 2R2 Uw2`)**.
3. Deshacemos la preparación con **`U R U' R'`**:

```rubik-viz
title: "Paso 4.2 (Opción Aristas Adyacentes) - Intercambiar UF y UR (R U R' U' 2R2 U2 2R2 Uw2 2R2 Uw2 U R U' R')"
puzzle: 4x4x4
view: 3D
setup: "z2 R U R' U' Uw2 2R2 Uw2 2R2 U2 2R2 U R U' R'"
alg: "R U R' U' 2R2 U2 2R2 Uw2 2R2 Uw2 U R U' R'"
anchor: start
mask: full
tempo: 1.1
controls: true
```

#### 💡 Opción Alternativa B en 4.2: Cuando parecen estar intercambiadas solo 2 Esquinas Superiores
*(Caso independiente)*: Si todas las aristas parecen resueltas pero te quedan **solo 2 esquinas intercambiadas** (por ejemplo las dos de la derecha `UFR` y `UBR`), también es **Paridad de PLL**:
1. Aplica la **Paridad de PLL (`2R2 U2 2R2 Uw2 2R2 Uw2`)** para convertir el caso en un 3x3x3 normal.
2. Gira **`U'`** y aplica **T-Perm (`R U R' U' R' F R2 U' R' U' R U R' F'`)** seguido de **`U`**:

```rubik-viz
title: "Paso 4.2 (Opción 2 Esquinas Intercambiadas) - Paridad de PLL + T-Perm"
puzzle: 4x4x4
view: 3D
setup: "z2 U' F R U' R' U R U R2 F' R U R U' R' U Uw2 2R2 Uw2 2R2 U2 2R2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2 U' R U R' U' R' F R2 U' R' U' R U R' F' U"
anchor: start
mask: full
tempo: 1.2
controls: true
```
