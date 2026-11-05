# 📋 Historial de Cambios (Changelog) — Rubik Studio Visualizer

> 🌐 **Idioma / Language:** [🇺🇸 English](./CHANGELOG.md) | **🇪🇸 Español (Actual)**

Todos los cambios relevantes del plugin **Rubik Studio Visualizer** para Obsidian se documentan en este archivo.
Este proyecto sigue el estándar de [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [Versionado Semántico (SemVer)](https://semver.org/lang/es/).

---

## [1.0.2] - 2026-11-05

### Añadido
- **Soporte para Cubo 2x2x2 (`puzzle: 2x2x2` / `2x2`)**:
  - Se habilitó el visor interactivo 3D y 2D para cubos `2x2x2` (Pocket Cube) en bloques `rubik-viz`, con insignia `2x2` en color cian (`.rubik-viz-badge.is-2x2`), botón selector `2x2x2` en el modal constructor y plantillas rápidas (`2x2 - OLL Sune`, `2x2 - PLL T-Perm`).
  - Se crearon los **Tutoriales Progresivos 2x2x2 por Capas** en inglés y español ([`tutorial-2x2x2.md`](./tutorial-2x2x2.md) y [`tutorial-2x2x2.es.md`](./tutorial-2x2x2.es.md)) cubriendo Primera Capa Blanca con barras laterales, transición `z2`, OLL (`Sune`, `Anti-Sune`, `Doble Sune`) y PLL (`T-Perm`, `Y-Perm`) con ejemplos `Fase X - Alternativa A/B` de avance parcial (resuelve [Issue #1](https://github.com/fabianserna/rubik-visualizer/issues/1)).
- **Mapeador y Solver de Cubo Real para `2x2x2`, `3x3x3` y `4x4x4`**:
  - Se amplió la cuadrícula 2D desplegada de **Mapear Cubo Real** para adaptarse dinámicamente a `2x2x2` (cuadrícula $2 \times 2$ por cara, 24 casillas, contador `4/4`), `3x3x3` ($3 \times 3$ por cara, 54 casillas, `9/9`) y `4x4x4` ($4 \times 4$ por cara, 96 casillas, `16/16`).
  - Se añadió validación física y cálculo automático de `setup` + solución paso a paso `alg` en `RealCubeSolver` para `2x2x2` y `4x4x4` (incluyendo soporte de paridades OLL/PLL en `4x4x4`), así como soporte para **`Leer desde Setup`** y parámetro YAML `state:` de 24, 54 y 96 casillas.
- **Vista Previa 3D (`Cube3D` y `PG3D`) y 2D en Tiempo Real Mientras se Pinta**:
  - Al seleccionar un color y hacer clic o arrastrar sobre las casillas de la red 2D en `2x2x2`, `3x3x3` o `4x4x4`, cada pegatina se pinta de inmediato sobre el cubo 3D interactivo y 2D de la vista previa.

### Corregido
- **Visibilidad de Colores en los Botones de la Red 2D Inferior**:
  - Se reforzaron los estilos de `.rubik-viz-sticker-btn` en CSS e inline con `!important` para evitar que la regla global `button:not(.clickable-icon)` del tema de Obsidian mostrara todas las casillas inferiores en blanco.
- **Limpieza de Aserción de Tipo en TypeScript**:
  - Se eliminó la aserción innecesaria `as unknown as number` en `window.setTimeout` dentro de `main.ts` reportada por el validador de Obsidian Community Plugins.

---

## [1.0.1] - 2026-10-29

### Añadido
- **Arquitectura de Documentación Bilingüe (`EN` / `ES`)**:
  - Documentación principal en inglés: [`README.md`](./README.md), [`tutorial-3x3x3.md`](./tutorial-3x3x3.md), [`tutorial-4x4x4.md`](./tutorial-4x4x4.md) y [`example.md`](./example.md).
  - Documentación equivalente en español con sufijo estándar ISO 639-1 (`.es.md`): [`README.es.md`](./README.es.md), [`tutorial-3x3x3.es.md`](./tutorial-3x3x3.es.md), [`tutorial-4x4x4.es.md`](./tutorial-4x4x4.es.md) y [`example.es.md`](./example.es.md) con barra superior de cambio de idioma.
- **Detección Automática de Idioma en la Interfaz de Obsidian (`i18n`)**:
  - Detecta automáticamente el idioma configurado en Obsidian (`es` o `en` por defecto) para mostrar los botones (`Centrar` / `Center`, `Reiniciar` / `Reset`, `3d o 2d` / `3D / 2D`), comandos de la paleta, modales y mensajes de validación del calculador 3x3 en el idioma del usuario.
- **Referencias a la Guía de Ejemplos en los Tutoriales**:
  - Se añadieron bloques introductorios `[!tip]` al inicio de los tutoriales `3x3x3` y `4x4x4` enlazando a [`example.md`](./example.md) / [`example.es.md`](./example.es.md) para comprender el funcionamiento del plugin antes de comenzar.

### Cambiado
- **Botones Compactos Optimizados para Obsidian Mobile**:
  - Se redujo el texto y el espaciado de los 3 botones superiores (`Centrar` / `Center`, `Reiniciar` / `Reset`, `3d o 2d` / `3D / 2D`) para una visualización limpia en pantallas móviles.
- **Jerarquía Estandarizada y Avance Progresivo en Alternativas**:
  - Se estandarizaron todos los subtítulos y campos `title:` bajo el esquema `Fase X - Alternativa A/B` (fases de un solo paso) y `Paso X.Y - Alternativa A/B` (fases divididas en sub-pasos).
  - Se actualizaron los `setup` de todas las alternativas intermedias en [`tutorial-3x3x3.es.md`](./tutorial-3x3x3.es.md) y [`tutorial-4x4x4.es.md`](./tutorial-4x4x4.es.md) (y sus pares en inglés) para que cada alternativa culmine en la etapa parcial correspondiente a su fase en lugar de mostrar un cubo 100% resuelto antes de tiempo.

---

## [1.0.0] - 2026-10-22

### Añadido
- **Lanzamiento Oficial Inicial en Obsidian Community Plugins**:
  - Visualizador interactivo **3D** y **2D** de cubos de Rubik `3x3x3` y `4x4x4` dentro de bloques Markdown ```` ```rubik-viz ```` impulsado por `cubing.js`.
  - **Sincronización en Tiempo Real con la Animación 3D**: Iluminación en vivo botón por botón y píldora de estado animada (`▶` / `✓`) conectada al giro exacto de `TwistyPlayer`.
  - **Reproducción Individual por Movimiento**: Al hacer clic en cualquier botón de movimiento, el cubo salta a ese instante y anima únicamente ese giro en 3D.
  - **Resaltado Automático en `4x4x4`**: Etiquetas en color ámbar para giros de capas dobles (`Rw`, `Uw`, `Lw`, `r`, `l`) y capas internas (`2R`, `2R2`, `2U`).
  - **Centrado Instantáneo de Cámara 3D (`centerCubeCamera`)**: Restablece el ángulo natural de lectura (`U`, `F`, `R`) sin perder el paso actual de la secuencia.
  - **Pintor de Cubo Físico Real 3x3 y Motor Solver BFS (`RealCubeSolver`)**: Plantilla desplegada de 54 casillas con validación física en tiempo real y cálculo de `setup` + solución paso a paso en menos de `5 ms`.
  - **Modal Constructor Visual con Vista Previa en Vivo**: Plantillas rápidas (*Sexy Move*, *Sune*, *T-Perm*, *Paridad OLL 4x4*, *Paridad PLL 4x4*), teclado rápido de movimientos e inserción directa en el cursor.
  - **Parche Idempotente de Custom Elements**: Evita duplicación de cubos WebGL y controles cuando el *virtual scroller* de Obsidian desmonta y vuelve a montar los bloques Markdown.
