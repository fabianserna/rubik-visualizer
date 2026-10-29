# 🧊 Rubik Studio Visualizer — Plugin para Obsidian

> 🌐 **Idioma / Language:** [🇺🇸 English](./README.md) | **🇪🇸 Español (Actual)**

<div align="center">

```text
███████╗ █████╗ ██████╗ ██╗██████╗ ███████╗██╗   ██╗  ██╗██████╗ 
██╔════╝██╔══██╗██╔══██╗██║██╔══██╗██╔════╝██║   ██║ ██╔╝╚════██╗
█████╗  ███████║██████╔╝██║██║  ██║█████╗  ██║   ██║██╔╝  █████╔╝
██╔══╝  ██╔══██║██╔══██╗██║██║  ██║██╔══╝  ╚██╗ ██╔╝╚██╗  ╚═══██╗
██║     ██║  ██║██████╔╝██║██████╔╝███████╗ ╚████╔╝  ╚██╗██████╔╝
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝╚═════╝ ╚══════╝  ╚═══╝    ╚═╝╚═════╝ 
                 Obsidian Plugin by: FabiDev<3
```

![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7C3AED?style=for-the-badge&logo=obsidian&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.1-22C55E?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![cubing.js](https://img.shields.io/badge/Engine-cubing.js-F97316?style=for-the-badge)
![Antigravity](https://img.shields.io/badge/Built%20with-Google%20Antigravity-4285F4?style=for-the-badge&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-EAB308?style=for-the-badge)

**Visualizador interactivo 3D y 2D de Cubos de Rubik (`3x3x3` y `4x4x4`), reproductor paso a paso sincronizado en tiempo real y calculador de estados desde cubos físicos reales directamente dentro de tus notas de Obsidian.**

[**📖 Tutorial 3x3x3 (ES)**](./tutorial-3x3x3.es.md) · [**🟧 Tutorial 4x4x4 (ES)**](./tutorial-4x4x4.es.md) · [**🧪 Galería de Ejemplos (ES)**](./example.es.md) · [**🇺🇸 English Docs**](./README.md)

</div>

---

## 💡 Créditos, Idea Original y Ecosistema Tecnológico

- **Autor e Idea Original:** **Fabian Serna** (**`FabiDev<3`**) — Concepción funcional, diseño pedagógico de los tutoriales progresivos 3x3x3 / 4x4x4, arquitectura de experiencia de usuario y calculador de mapeo desde cubos físicos reales.
- **Entorno de Desarrollo Agéntico:** Desarrollado desde **Google Antigravity**, integrando empaquetado autónomo de Web Workers, motor de resolución constructiva por fases (BFS) y sincronización reactiva con el DOM virtual de Obsidian.
- **Plugins, Librerías y Motores Consumidos:**
  - [**`obsidian` API**](https://github.com/obsidianmd/obsidian-api): API oficial de plugins de Obsidian (`Plugin`, `Modal`, `MarkdownRenderChild`, `parseYaml`, `Command Palette`) para el renderizado reactivo de bloques de código ```` ```rubik-viz ```` y modales interactivos.
  - [**`cubing` (`cubing.js` / `TwistyPlayer`)**](https://js.cubing.net/cubing/): Motor criptográfico y gráfico WebGL/3D/2D de *Lucas Garron* y la comunidad de speedcubing usado para la simulación geométrica de puzzles `3x3x3` y `4x4x4`, máscaras de stickering (`OLL`, `PLL`, `F2L`, `centers-only`) y línea de tiempo de animaciones.
  - [**`esbuild`**](https://esbuild.github.io/) + **TypeScript**: Empaquetador de alto rendimiento con inyección inline del Web Worker de búsqueda de `cubing.js` y parche de registro idempotente de Custom Elements (`customElements.define`) para evitar colisiones en el *virtual scroller* de Obsidian.

---

## ✨ Características Principales

### 1. 🎮 Visualización 3D y 2D Interactiva en Bloques Markdown (`rubik-viz`)
Renderiza cubos **3x3x3** y **4x4x4** dentro de cualquier nota usando bloques YAML limpios:
- **Alternancia en vivo `3d o 2d` (`3D / 2D`)**: Cambia entre el cubo 3D orbital y la planta desplegada 2D con un solo clic sin editar la nota.
- **Botón `Centrar` (`Center`)**: Restablece al instante la órbita de la cámara 3D a su posición natural de lectura (priorizando las caras Superior **`U`**, Frontal **`F`** y Derecha **`R`**) **sin perder el paso actual** de la secuencia.
- **Botón `Reiniciar` (`Reset`)**: Regresa la línea de tiempo al estado inicial y centra la cámara.
- **Detección Automática de Idioma (`EN` / `ES`)**: La interfaz del plugin adapta automáticamente sus botones, menús y validaciones al idioma configurado en Obsidian (Inglés o Español).

### 2. ⚡ Sincronización en Tiempo Real con la Animación 3D
- **Iluminación en vivo movimiento por movimiento**: Conectado directamente a `player.experimentalModel.currentMoveInfo` de `cubing.js`. A medida que el cubo gira en 3D, se ilumina debajo el botón exacto del movimiento que se está ejecutando en ese instante (ej. `R`, luego `U`, luego `R'`) junto con una píldora animada (`▶ R` / `✓ R`).
- **Reproducción individual al hacer clic**: Al hacer clic sobre cualquier movimiento de la lista inferior, el cubo salta a ese instante y **reproduce únicamente la animación 3D de ese giro**, deteniéndose al terminar el movimiento.
- **Resaltado automático para `4x4x4`**: Distingue automáticamente con etiquetas ámbar los movimientos de **capas dobles (`Rw`, `Uw`, `Lw`, `r`, `l`)** y **capas internas (`2R`, `2R2`, `2U`)** esenciales para las paridades de OLL y PLL.

### 3. 🎨 Calculador de Estado Inicial desde un Cubo Real (`Mapear Cubo Real 3x3`)
¿Tienes un cubo de Rubik físico desordenado en la mano?
- Abre la paleta de comandos (`Ctrl + P` / `Cmd + P`) y ejecuta:
  - **`Rubik Studio Visualizer: Mapear colores de cubo real (Calculador de estado inicial 3x3)`**
- **Pintor interactivo de 54 casillas**: Pinta las 6 caras (`U`, `L`, `F`, `R`, `B`, `D`) con validación física en tiempo real:
  - Verifica conteo exacto de 9 colores por cara, existencia de las 12 aristas y 8 esquinas reales, orientación de esquinas ($\sum co \equiv 0 \pmod 3$), orientación de aristas ($\sum eo \equiv 0 \pmod 2$) y paridad de permutación.
- **Motor Solver 3x3 integrado (`RealCubeSolver`)**: Calcula en menos de `5 ms` tanto el **`setup`** exacto de tu cubo real como una **solución paso a paso en `alg`** para que veas en 3D cómo se arma tu propio cubo.

### 4. 🧰 Constructor Visual con Vista Previa en Vivo
- Ejecuta **`Rubik Studio Visualizer: Insertar estado de cubo`** desde la paleta de comandos para abrir el estudio interactivo con plantillas rápidas (*Sexy Move*, *Sune*, *T-Perm*, *Paridad OLL 4x4*, *Paridad PLL 4x4*), teclado de movimientos y previsualización 3D instantánea.

---

## 🚀 Sintaxis del Bloque `rubik-viz`

````markdown
```rubik-viz
title: "4x4x4 - Resolver Paridad de PLL"
puzzle: 4x4x4
view: 3D
setup: "z2 Uw2 2R2 Uw2 2R2 U2 2R2"
alg: "2R2 U2 2R2 Uw2 2R2 Uw2"
anchor: start
mask: full
tempo: 1.0
controls: true
```
````

### Parámetros YAML soportados

| Parámetro | Valores permitidos | Por defecto | Descripción |
| :--- | :--- | :---: | :--- |
| `title` | Texto libre | `"Cube 3x3"` / `"Cubo 3x3"` | Título mostrado en el encabezado de la tarjeta. |
| `puzzle` | `3x3x3`, `3x3`, `4x4x4`, `4x4` | `3x3x3` | Tipo de cubo a renderizar. |
| `view` | `3D`, `2D`, `PG3D` | `3D` | Vista inicial del cubo (`3D` interactiva o `2D` desplegada). |
| `setup` | Notación WCA (`z2`, scrambles, etc.) | `""` | Giros previos que definen el estado inicial del cubo antes de `alg`. |
| `state` | Cadena de 54 caracteres (`U,R,F,D,L,B` o `W,R,G,Y,O,B`) | `""` | *(Opcional)* Define el estado inicial pintando directamente las 54 pegatinas de un cubo 3x3 real. |
| `alg` | Notación WCA (`R U R' U'`, `Rw`, `2R2`...) | `""` | Secuencia de movimientos que se animará paso a paso. |
| `anchor` | `start`, `end` | `start` | `start`: inicia en `setup` y ejecuta `alg`. `end`: termina resuelto al finalizar `alg`. |
| `mask` | `full`, `OLL`, `PLL`, `F2L`, `centers` | `full` | Máscara de colores para resaltar únicamente las piezas de una etapa específica. |
| `tempo` | Número positivo (`0.3` a `3.0`) | `1.0` | Velocidad de reproducción de la animación. |
| `controls` | `true`, `false` | `true` | Muestra u oculta la barra inferior de reproducción de `cubing.js`. |

---

## 📚 Documentación y Tutoriales Interactivos (Inglés y Español)

El repositorio incluye toda su documentación y tutoriales en **Inglés** (archivos principales `.md`) y **Español** (`.es.md`), listos para abrirse directamente en tu bóveda de Obsidian:

| Documento | 🇺🇸 Inglés (Principal) | 🇪🇸 Español | Descripción |
| :--- | :--- | :--- | :--- |
| **README Principal** | [`README.md`](./README.md) | [`README.es.md`](./README.es.md) | Descripción general, instalación y sintaxis YAML. |
| **Tutorial 3x3x3** | [`tutorial-3x3x3.md`](./tutorial-3x3x3.md) | [`tutorial-3x3x3.es.md`](./tutorial-3x3x3.es.md) | Tutorial progresivo 3x3x3 de principio a fin con casos alternativos por fase. |
| **Tutorial 4x4x4** | [`tutorial-4x4x4.md`](./tutorial-4x4x4.md) | [`tutorial-4x4x4.es.md`](./tutorial-4x4x4.es.md) | Tutorial progresivo 4x4x4 por reducción (Centros, Aristas y Paridades OLL/PLL). |
| **Galería de Ejemplos** | [`example.md`](./example.md) | [`example.es.md`](./example.es.md) | Guía de referencia con ejemplos de vistas, rotaciones, máscaras y parámetros. |
| **Historial de Cambios** | [`CHANGELOG.md`](./CHANGELOG.md) | [`CHANGELOG.es.md`](./CHANGELOG.es.md) | Registro histórico de versiones y novedades (`1.0.0`, `1.0.1`, ...). |

---

## 📦 Instalación en Obsidian

### Instalación desde Plugins Comunitarios de Obsidian
1. Abre Obsidian y ve a **Ajustes → Plugins comunitarios → Explorar**.
2. Busca **Rubik Studio Visualizer**.
3. Haz clic en **Instalar** y luego en **Activar**.

### Instalación Manual
1. Descarga los archivos de la última versión (`main.js`, `manifest.json` y `styles.css`).
2. Crea la carpeta `<TuBoveda>/.obsidian/plugins/rubik-visualizer/`.
3. Copia dentro `main.js`, `manifest.json` y `styles.css`.
4. En Obsidian, ve a **Ajustes → Plugins comunitarios**, recarga la lista y activa **Rubik Studio Visualizer**.

### Compilación desde el Código Fuente
```bash
# 1. Instalar dependencias
npm install

# 2. Compilar en modo producción (genera main.js empaquetado con Web Workers inline)
npm run build

# 3. Modo desarrollo con recarga en caliente (watch)
npm run dev
```

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [`LICENSE`](./LICENSE) para más detalles.

---

<div align="center">
  <sub>Creado con ❤️ por <b>Fabian Serna (FabiDev&lt;3)</b> · Impulsado por <b>Google Antigravity</b> &amp; <b>cubing.js</b></sub>
</div>
