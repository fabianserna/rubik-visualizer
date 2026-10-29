# 📋 Historial de Cambios (Changelog) — Rubik Studio Visualizer

> 🌐 **Idioma / Language:** [🇺🇸 English](./CHANGELOG.md) | **🇪🇸 Español (Actual)**

Todos los cambios relevantes del plugin **Rubik Studio Visualizer** para Obsidian se documentan en este archivo.
Este proyecto sigue el estándar de [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [Versionado Semántico (SemVer)](https://semver.org/lang/es/).

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
