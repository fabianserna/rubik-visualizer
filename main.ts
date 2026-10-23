import {
  App,
  Editor,
  MarkdownPostProcessorContext,
  MarkdownRenderChild,
  Modal,
  Notice,
  Plugin,
  parseYaml,
} from "obsidian";
import { TwistyPlayer } from "cubing/twisty";
import type {
  ExperimentalStickering,
  PuzzleID,
  TwistyPlayerConfig,
  VisualizationFormat,
} from "cubing/twisty";

type SetupAnchor = NonNullable<TwistyPlayerConfig["experimentalSetupAnchor"]>;

/**
 * Expected YAML configuration inside a ```rubik-viz code block.
 */
export interface RubikVizConfig {
  puzzle?: string;
  view?: string;
  setup?: string;
  state?: string;
  alg?: string;
  anchor?: string;
  mask?: string;
  tempo?: number | string;
  controls?: boolean | string;
  title?: string;
}

/**
 * Normalized and validated configuration ready for TwistyPlayer.
 */
interface NormalizedRubikConfig {
  puzzle: PuzzleID;
  puzzleBadge: "3x3" | "4x4";
  view: VisualizationFormat;
  setup: string;
  alg: string;
  anchor: SetupAnchor;
  mask: ExperimentalStickering;
  tempo: number;
  controls: boolean;
  title: string;
}

/**
 * Ensures all cubing Custom Elements registered in window.customElements have
 * an idempotent connectedCallback(). Obsidian's Markdown renderer and virtual
 * scroller detach and re-attach codeblock DOM nodes multiple times, which
 * otherwise causes Twisty3DSceneWrapper and TwistyButtons to duplicate cubes
 * and control buttons on every re-attachment.
 */
function ensureIdempotentCubingElements(): void {
  if (typeof window === "undefined" || !window.customElements) {
    return;
  }

  const managedCtor = window.customElements.get(
    "twisty-managed-custom-element"
  ) as { prototype?: Record<string, unknown> } | undefined;

  if (managedCtor?.prototype) {
    const origAddCSS = managedCtor.prototype.addCSS as
      | ((cssSource: CSSStyleSheet) => void) & { __rubikPatched?: boolean }
      | undefined;
    if (typeof origAddCSS === "function" && !origAddCSS.__rubikPatched) {
      const patchedAddCSS = function (
        this: { shadow?: ShadowRoot },
        cssSource: CSSStyleSheet
      ) {
        if (this.shadow?.adoptedStyleSheets?.includes(cssSource)) {
          return;
        }
        return origAddCSS.call(this, cssSource);
      };
      patchedAddCSS.__rubikPatched = true;
      managedCtor.prototype.addCSS = patchedAddCSS;
    }
  }

  const tagsToGuard = [
    "twisty-3d-scene-wrapper",
    "twisty-2d-scene-wrapper",
    "twisty-3d-vantage",
    "twisty-2d-puzzle",
    "twisty-buttons",
    "twisty-button",
    "twisty-scrubber",
    "twisty-alg-viewer",
    "twisty-alg-editor",
    "twizzle-link",
  ];

  for (const tag of tagsToGuard) {
    const ctor = window.customElements.get(tag) as
      | { prototype?: Record<string, unknown> }
      | undefined;
    if (!ctor?.prototype) {
      continue;
    }
    const origConnected = ctor.prototype.connectedCallback as
      | ((...args: unknown[]) => unknown) & { __rubikPatched?: boolean }
      | undefined;

    if (typeof origConnected === "function" && !origConnected.__rubikPatched) {
      const patchedConnected = function (
        this: {
          __rubikConnectedOnce?: boolean;
          scheduleRender?: () => void;
        },
        ...args: unknown[]
      ) {
        if (this.__rubikConnectedOnce) {
          if (typeof this.scheduleRender === "function") {
            this.scheduleRender();
          }
          return;
        }
        this.__rubikConnectedOnce = true;
        return origConnected.apply(this, args);
      };
      patchedConnected.__rubikPatched = true;
      ctor.prototype.connectedCallback = patchedConnected;
    }

    // Chromium caches connectedCallback in C++ at customElements.define() time.
    // Guard the prototype methods invoked inside connectedCallback so even an
    // older custom-element definition from a previous plugin load cannot
    // duplicate <twisty-3d-vantage> cubes or <twisty-button> controls.
    if (tag === "twisty-3d-scene-wrapper") {
      const origAddVantage = ctor.prototype.addVantage as
        | ((...args: unknown[]) => unknown) & { __rubikPatched?: boolean }
        | undefined;
      if (typeof origAddVantage === "function" && !origAddVantage.__rubikPatched) {
        const patchedAddVantage = function (
          this: { contentWrapper?: HTMLElement; vantages?: Set<unknown> },
          ...args: unknown[]
        ) {
          const existingCount =
            this.contentWrapper?.querySelectorAll?.("twisty-3d-vantage")?.length ??
            this.vantages?.size ??
            0;
          if (existingCount >= 1) {
            return;
          }
          return origAddVantage.apply(this, args);
        };
        patchedAddVantage.__rubikPatched = true;
        ctor.prototype.addVantage = patchedAddVantage;
      }

      const origOnPuzzle = ctor.prototype.onPuzzle as
        | ((...args: unknown[]) => unknown) & { __rubikPatched?: boolean }
        | undefined;
      if (typeof origOnPuzzle === "function" && !origOnPuzzle.__rubikPatched) {
        const patchedOnPuzzle = function (
          this: { __rubikPuzzleSubscribed?: boolean },
          ...args: unknown[]
        ) {
          if (this.__rubikPuzzleSubscribed) {
            return;
          }
          this.__rubikPuzzleSubscribed = true;
          return origOnPuzzle.apply(this, args);
        };
        patchedOnPuzzle.__rubikPatched = true;
        ctor.prototype.onPuzzle = patchedOnPuzzle;
      }
    }

    if (tag === "twisty-buttons") {
      const origAddElement = ctor.prototype.addElement as
        | ((...args: unknown[]) => unknown) & { __rubikPatched?: boolean }
        | undefined;
      if (typeof origAddElement === "function" && !origAddElement.__rubikPatched) {
        const patchedAddElement = function (
          this: { contentWrapper?: HTMLElement },
          ...args: unknown[]
        ) {
          const count =
            this.contentWrapper?.querySelectorAll?.("twisty-button, twizzle-link")
              ?.length ?? 0;
          if (count >= 6) {
            return args[0];
          }
          return origAddElement.apply(this, args);
        };
        patchedAddElement.__rubikPatched = true;
        ctor.prototype.addElement = patchedAddElement;
      }

      const origUpdate = ctor.prototype.update as
        | ((...args: unknown[]) => unknown) & { __rubikPatched?: boolean }
        | undefined;
      if (typeof origUpdate === "function" && !origUpdate.__rubikPatched) {
        const patchedUpdate = function (
          this: { __rubikButtonsUpdated?: boolean },
          ...args: unknown[]
        ) {
          if (this.__rubikButtonsUpdated) {
            return;
          }
          this.__rubikButtonsUpdated = true;
          return origUpdate.apply(this, args);
        };
        patchedUpdate.__rubikPatched = true;
        ctor.prototype.update = patchedUpdate;
      }
    }
  }
}

/**
 * Helper lifecycle wrapper so Obsidian mounts the player once when loaded and
 * cleans up DOM/WebGL contexts when the note closes or re-renders.
 */
class RubikVizRenderChild extends MarkdownRenderChild {
  private viewportEl: HTMLElement;
  private player: TwistyPlayer | null = null;
  private mounted = false;

  constructor(
    containerEl: HTMLElement,
    viewportEl: HTMLElement,
    player: TwistyPlayer
  ) {
    super(containerEl);
    this.viewportEl = viewportEl;
    this.player = player;
  }

  onload(): void {
    if (!this.mounted && this.player) {
      this.mounted = true;
      this.viewportEl.empty();
      this.viewportEl.appendChild(this.player);
    }
  }

  onunload(): void {
    if (this.player) {
      this.player.remove();
      this.player = null;
    }
    this.mounted = false;
  }
}

export default class RubikVisualizerPlugin extends Plugin {
  async onload(): Promise<void> {
    ensureIdempotentCubingElements();

    this.registerMarkdownCodeBlockProcessor(
      "rubik-viz",
      (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        this.renderRubikBlock(source, el, ctx);
      }
    );

    this.addCommand({
      id: "insert-rubik-cube-state",
      name: "Insertar estado de cubo",
      editorCallback: (editor: Editor) => {
        new InsertRubikModal(
          this.app,
          this,
          (markdownBlock: string) => {
            const cursor = editor.getCursor();
            const lineText = editor.getLine(cursor.line);
            const prefix = lineText.trim().length > 0 ? "\n\n" : "";
            editor.replaceSelection(`${prefix}${markdownBlock}\n`);
            new Notice("Bloque rubik-viz insertado en la posición del cursor.");
          },
          false
        ).open();
      },
    });

    this.addCommand({
      id: "map-real-rubik-cube-colors",
      name: "Mapear colores de cubo real (Calculador de estado inicial 3x3)",
      editorCallback: (editor: Editor) => {
        new InsertRubikModal(
          this.app,
          this,
          (markdownBlock: string) => {
            const cursor = editor.getCursor();
            const lineText = editor.getLine(cursor.line);
            const prefix = lineText.trim().length > 0 ? "\n\n" : "";
            editor.replaceSelection(`${prefix}${markdownBlock}\n`);
            new Notice("Bloque rubik-viz insertado en la posición del cursor.");
          },
          true
        ).open();
      },
    });
  }

  onunload(): void {
    // Cleanup is handled per-block via MarkdownRenderChild
  }

  /**
   * Parses YAML source and builds the interactive Rubik Studio Visualizer card.
   */
  private renderRubikBlock(
    source: string,
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext
  ): void {
    ensureIdempotentCubingElements();
    el.empty();

    let rawConfig: RubikVizConfig = {};
    const trimmedSource = source.trim();

    if (trimmedSource.length > 0) {
      try {
        const parsed = parseYaml(trimmedSource);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          rawConfig = parsed as RubikVizConfig;
        } else if (parsed !== null && parsed !== undefined) {
          this.renderError(
            el,
            "El contenido del bloque debe ser un objeto YAML válido (clave: valor).",
            trimmedSource
          );
          return;
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido al leer YAML.";
        this.renderError(
          el,
          "Error de sintaxis YAML en el bloque rubik-viz",
          message
        );
        return;
      }
    }

    if (typeof rawConfig.state === "string" && rawConfig.state.trim().length > 0) {
      const normalizedStateStr = RealCubeSolver.normalizeStateString(
        rawConfig.state
      );
      const validation =
        RealCubeSolver.parseAndValidateFacelets(normalizedStateStr);
      if (!validation.valid || !validation.state) {
        this.renderError(
          el,
          "Estado de colores (state) físicamente inválido",
          validation.error ?? "Revisa los 54 colores del cubo."
        );
        return;
      }
      if (!rawConfig.setup || !rawConfig.setup.trim()) {
        const solved = RealCubeSolver.solveCubieState(validation.state);
        rawConfig.setup = solved.setup;
      }
    }

    const config = this.normalizeConfig(rawConfig);
    const moves = this.tokenizeAlg(config.alg);

    // 1. Main Card Container
    const cardEl = el.createDiv({ cls: "rubik-viz-card" });

    // 2. Header (Title, Badges, Action Buttons)
    const headerEl = cardEl.createDiv({ cls: "rubik-viz-header" });
    const titleGroupEl = headerEl.createDiv({ cls: "rubik-viz-title-group" });

    // Puzzle Badge (3x3 or 4x4)
    const badgeEl = titleGroupEl.createSpan({
      cls: `rubik-viz-badge ${config.puzzleBadge === "4x4" ? "is-4x4" : "is-3x3"}`,
      text: config.puzzleBadge,
    });
    badgeEl.setAttribute("aria-label", `Cubo ${config.puzzle}`);

    // Mask Badge (if not default 'full')
    if (config.mask && config.mask !== "full") {
      titleGroupEl.createSpan({
        cls: "rubik-viz-badge-mask",
        text: config.mask,
      });
    }

    // Optional Title
    if (config.title) {
      titleGroupEl.createEl("h4", {
        cls: "rubik-viz-title",
        text: config.title,
      });
    } else {
      titleGroupEl.createEl("h4", {
        cls: "rubik-viz-title",
        text: `Cubo ${config.puzzleBadge}`,
      });
    }

    // Header Actions: Center Cube, Reset View & Live 3D/2D Toggle
    const actionsEl = headerEl.createDiv({ cls: "rubik-viz-actions" });

    const centerBtn = actionsEl.createEl("button", {
      cls: "rubik-viz-btn",
      text: "🎯 Centrar cubo",
      attr: {
        type: "button",
        title:
          "Centrar el ángulo de cámara 3D en la posición natural (caras U, F y R) sin perder el paso actual",
      },
    });

    const resetBtn = actionsEl.createEl("button", {
      cls: "rubik-viz-btn",
      text: "↺ Reiniciar vista",
      attr: {
        type: "button",
        title: "Restaurar algoritmo al inicio y centrar la vista del cubo",
      },
    });

    let currentView: VisualizationFormat = config.view;
    const is2DInitial = currentView === "2D";
    const toggleViewBtn = actionsEl.createEl("button", {
      cls: `rubik-viz-btn ${is2DInitial ? "is-active" : ""}`,
      text: is2DInitial ? "Vista: 2D (Cambiar a 3D)" : "Vista: 3D (Cambiar a 2D)",
      attr: {
        type: "button",
        title: "Alternar en vivo entre vista 3D y planta desplegada 2D",
      },
    });

    // 3. TwistyPlayer Viewport
    const viewportEl = cardEl.createDiv({ cls: "rubik-viz-viewport" });

    const player = new TwistyPlayer({
      puzzle: config.puzzle,
      visualization: config.view,
      experimentalSetupAlg: config.setup,
      alg: config.alg,
      experimentalSetupAnchor: config.anchor,
      experimentalStickering: config.mask,
      tempoScale: config.tempo,
      controlPanel: config.controls ? "bottom-row" : "none",
      background: "none",
      hintFacelets: "floating",
      backView: "none",
    });
    player.classList.add("rubik-viz-twisty-player");

    ctx.addChild(new RubikVizRenderChild(cardEl, viewportEl, player));

    // 4. Optional Setup Info Bar
    if (config.setup) {
      const setupBarEl = cardEl.createDiv({ cls: "rubik-viz-setup-bar" });
      setupBarEl.createSpan({
        cls: "rubik-viz-setup-label",
        text: "Setup:",
      });
      setupBarEl.createSpan({
        text: config.setup,
      });
    }

    // 5. Interactive Algorithm Moves Bar
    const algSectionEl = cardEl.createDiv({ cls: "rubik-viz-alg-section" });
    const algHeaderEl = algSectionEl.createDiv({ cls: "rubik-viz-alg-header" });
    const algLabelGroupEl = algHeaderEl.createDiv({
      cls: "rubik-viz-alg-label-group",
    });

    algLabelGroupEl.createSpan({
      cls: "rubik-viz-alg-label",
      text: `Algoritmo (${moves.length} ${moves.length === 1 ? "movimiento" : "movimientos"})`,
    });

    const hasWideOrInner = moves.some((m) => this.isWideOrInnerMove(m));
    if (hasWideOrInner) {
      algLabelGroupEl.createSpan({
        cls: "rubik-viz-wide-legend",
        text: "● Capa doble / interna (4x4)",
        attr: {
          title:
            "Los movimientos resaltados corresponden a capas dobles o internas (Rw, Uw, r, l, 2R, 2U...)",
        },
      });
    }

    const statusGroupEl = algHeaderEl.createDiv({
      cls: "rubik-viz-status-group",
    });

    const liveMoveBadgeEl = statusGroupEl.createSpan({
      cls: "rubik-viz-live-move-pill is-hidden",
      text: "",
    });

    const stepStatusEl = statusGroupEl.createSpan({
      cls: "rubik-viz-alg-status",
      text:
        moves.length > 0
          ? "Haz clic en Play o en un movimiento para reproducirlo"
          : "",
    });

    const movesContainerEl = algSectionEl.createDiv({
      cls: "rubik-viz-alg-moves",
    });

    const moveButtons: HTMLButtonElement[] = [];

    const setActiveStep = (
      activeIndex: number | null,
      isAnimating = false
    ) => {
      moveButtons.forEach((btn, idx) => {
        const isCurrent = activeIndex === idx;
        btn.classList.toggle("is-active", isCurrent);
        btn.classList.toggle("is-animating", isCurrent && isAnimating);
        btn.classList.toggle(
          "is-past",
          activeIndex !== null && idx < activeIndex
        );
      });

      if (activeIndex === null || activeIndex < 0 || activeIndex >= moves.length) {
        liveMoveBadgeEl.classList.add("is-hidden");
        liveMoveBadgeEl.classList.remove("is-animating");
        stepStatusEl.setText(
          moves.length > 0
            ? "Haz clic en Play o en un movimiento para reproducirlo"
            : ""
        );
      } else {
        const currentMoveText = moves[activeIndex];
        liveMoveBadgeEl.classList.remove("is-hidden");
        liveMoveBadgeEl.classList.toggle("is-animating", isAnimating);
        liveMoveBadgeEl.setText(
          isAnimating ? `▶ ${currentMoveText}` : `✓ ${currentMoveText}`
        );
        stepStatusEl.setText(
          isAnimating
            ? `Ejecutando paso ${activeIndex + 1} de ${moves.length}`
            : `Paso ${activeIndex + 1} de ${moves.length} completado`
        );
      }
    };

    if (moves.length === 0) {
      movesContainerEl.createSpan({
        cls: "rubik-viz-alg-empty",
        text: "Sin movimientos definidos (mostrando estado inicial).",
      });
    } else {
      moves.forEach((move, idx) => {
        const isSpecial4x4Move = this.isWideOrInnerMove(move);
        const moveBtn = movesContainerEl.createEl("button", {
          cls: `rubik-viz-move-btn${isSpecial4x4Move ? " is-wide-or-inner" : ""}`,
          text: move,
          attr: {
            type: "button",
            title: isSpecial4x4Move
              ? `Reproducir movimiento #${idx + 1}: ${move} (Capa doble / interna 4x4)`
              : `Reproducir movimiento #${idx + 1}: ${move}`,
          },
        });

        moveBtn.addEventListener("click", () => {
          void this.playSingleMoveAtIndex(player, idx);
        });

        moveButtons.push(moveBtn);
      });

      // Connect cubing.js real-time move events to illuminate the exact move rotating in 3D
      player.experimentalModel.currentMoveInfo.addFreshListener((moveInfo) => {
        if (moves.length === 0) return;

        const totalFinished =
          moveInfo.patternIndex +
          moveInfo.movesFinished.length +
          moveInfo.movesFinishing.length;
        const isAnimatingMove = moveInfo.currentMoves.length > 0;

        if (isAnimatingMove) {
          const activeIdx = Math.min(
            Math.max(0, totalFinished),
            moves.length - 1
          );
          setActiveStep(activeIdx, true);
        } else if (totalFinished > 0) {
          const completedIdx = Math.min(
            totalFinished - 1,
            moves.length - 1
          );
          setActiveStep(completedIdx, false);
        } else {
          setActiveStep(null, false);
        }
      });
    }

    // 6. Wire up Center Cube, Reset View & 3D/2D Toggle Buttons
    centerBtn.addEventListener("click", () => {
      if (currentView === "2D") {
        currentView = "3D";
        player.visualization = "3D";
        toggleViewBtn.classList.remove("is-active");
        toggleViewBtn.setText("Vista: 3D (Cambiar a 2D)");
      }
      this.centerCubeCamera(player);
    });

    resetBtn.addEventListener("click", () => {
      currentView = config.view;
      player.visualization = currentView;
      player.experimentalSetupAlg = config.setup;
      player.experimentalSetupAnchor = config.anchor;
      player.alg = config.alg;
      player.tempoScale = config.tempo;
      player.jumpToStart();
      this.centerCubeCamera(player);

      const is2D = currentView === "2D";
      toggleViewBtn.classList.toggle("is-active", is2D);
      toggleViewBtn.setText(
        is2D ? "Vista: 2D (Cambiar a 3D)" : "Vista: 3D (Cambiar a 2D)"
      );
      setActiveStep(null, false);
    });

    toggleViewBtn.addEventListener("click", () => {
      currentView = currentView === "2D" ? "3D" : "2D";
      player.visualization = currentView;
      const is2D = currentView === "2D";
      toggleViewBtn.classList.toggle("is-active", is2D);
      toggleViewBtn.setText(
        is2D ? "Vista: 2D (Cambiar a 3D)" : "Vista: 3D (Cambiar a 2D)"
      );
    });
  }

  /**
   * Normalizes user YAML parameters into safe defaults for TwistyPlayer.
   */
  public normalizeConfig(raw: RubikVizConfig): NormalizedRubikConfig {
    // 1. Puzzle: 3x3x3 (default) or 4x4x4
    const rawPuzzle = String(raw.puzzle ?? "3x3x3").trim().toLowerCase();
    let puzzle: PuzzleID = "3x3x3";
    let puzzleBadge: "3x3" | "4x4" = "3x3";
    if (rawPuzzle === "4x4x4" || rawPuzzle === "4x4") {
      puzzle = "4x4x4";
      puzzleBadge = "4x4";
    }

    // 2. View: 3D (default), 2D, PG3D
    const rawView = String(raw.view ?? "3D").trim().toUpperCase();
    let view: VisualizationFormat = "3D";
    if (rawView === "2D") {
      view = "2D";
    } else if (rawView === "PG3D") {
      view = "PG3D";
    }

    // 3. Setup & Alg
    const setup = typeof raw.setup === "string" ? raw.setup.trim() : "";
    const alg = typeof raw.alg === "string" ? raw.alg.trim() : "";

    // 4. Anchor: 'start' (default) or 'end'
    const rawAnchor = String(raw.anchor ?? "start").trim().toLowerCase();
    const anchor: SetupAnchor = rawAnchor === "end" ? "end" : "start";

    // 5. Mask / Stickering: full (default), OLL, PLL, F2L, centers (mapped to centers-only in cubing)
    const rawMask = String(raw.mask ?? "full").trim();
    const maskMap: Record<string, ExperimentalStickering> = {
      full: "full",
      oll: "OLL",
      pll: "PLL",
      f2l: "F2L",
      centers: "centers-only" as ExperimentalStickering,
      "centers-only": "centers-only" as ExperimentalStickering,
    };
    const mask: ExperimentalStickering =
      maskMap[rawMask.toLowerCase()] ?? (rawMask as ExperimentalStickering) ?? "full";

    // 6. Tempo: positive number (default 1)
    const parsedTempo = Number(raw.tempo);
    const tempo =
      !Number.isNaN(parsedTempo) && parsedTempo > 0 ? parsedTempo : 1;

    // 7. Controls: boolean (default true)
    let controls = true;
    if (typeof raw.controls === "boolean") {
      controls = raw.controls;
    } else if (typeof raw.controls === "string") {
      controls = raw.controls.trim().toLowerCase() !== "false";
    }

    // 8. Title
    const title = typeof raw.title === "string" ? raw.title.trim() : "";

    return {
      puzzle,
      puzzleBadge,
      view,
      setup,
      alg,
      anchor,
      mask,
      tempo,
      controls,
      title,
    };
  }

  /**
   * Splits an algorithm string into individual move tokens, stripping parentheses/brackets cleanly.
   */
  public tokenizeAlg(alg: string): string[] {
    if (!alg || !alg.trim()) {
      return [];
    }
    return alg
      .replace(/[()[\]]/g, " ")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 0);
  }

  /**
   * Identifies 4x4+ double-layer (wide) and inner-slice moves to highlight them visually:
   * - WCA wide notation: Rw, Uw, Lw, Dw, Fw, Bw (and variants like Rw', Rw2, 3Rw)
   * - Lowercase wide/inner notation: r, l, u, d, f, b (and variants like r', r2, l')
   * - Inner slice numeric prefix notation: 2R, 2U, 2L, 2D, 2F, 2B (and variants like 2R2, 2U')
   */
  public isWideOrInnerMove(move: string): boolean {
    const clean = move.trim();
    // 1. WCA wide moves: e.g., Rw, Uw', Rw2, 2Rw, 3Uw'
    if (/^\d*[URFDLB]w\d*'?$/.test(clean)) {
      return true;
    }
    // 2. Lowercase wide/slice moves: e.g., r, l, u, d, f, b (excluding rotations x, y, z)
    if (/^\d*[urfdlb]\d*'?$/.test(clean)) {
      return true;
    }
    // 3. Inner slice moves with numeric prefix: e.g., 2R, 2U, 2R2, 2L'
    if (/^[2-9]+[URFDLB]\d*'?$/.test(clean)) {
      return true;
    }
    return false;
  }

  /**
   * Computes the inverse sequence of standard move tokens (used when stepping with anchor: 'end').
   */
  public invertMoves(moves: string[]): string[] {
    return [...moves].reverse().map((move) => {
      if (move.endsWith("'")) {
        return move.slice(0, -1);
      }
      if (move.endsWith("2")) {
        return move;
      }
      return `${move}'`;
    });
  }

  /**
   * Jumps to the start of move #idx in the TwistyPlayer timeline and animates
   * that exact single move in 3D, stopping automatically when the move finishes.
   */
  public async playSingleMoveAtIndex(
    player: TwistyPlayer,
    idx: number
  ): Promise<void> {
    try {
      player.pause();
      const indexer = await player.experimentalModel.indexer.get();
      const numLeaves = indexer.numAnimatedLeaves();
      if (idx < 0 || idx >= numLeaves) {
        return;
      }
      const startTs = indexer.indexToMoveStartTimestamp(idx);
      const duration = indexer.moveDuration(idx);
      if (duration <= 0) {
        player.experimentalModel.timestampRequest.set(startTs);
        return;
      }
      // Position 1ms into the target move so currentMoveInfo immediately locks
      // onto this move's earliestEnd boundary, then play until "move".
      player.experimentalModel.timestampRequest.set(startTs + 1);
      await player.experimentalModel.detailedTimelineInfo.get();
      await player.controller.animationController.play({
        direction: 1 as never,
        untilBoundary: "move" as never,
        autoSkipToOtherEndIfStartingAtBoundary: false,
      });
    } catch {
      // Ignore if indexer is still initializing
    }
  }

  /**
   * Restores the 3D camera orbit to the natural front-top-right viewing angle
   * (showing U, F, and R clearly to understand moves) without altering the
   * current step/progress in the algorithm timeline.
   */
  public centerCubeCamera(player: TwistyPlayer): void {
    try {
      const orbitReq =
        player.experimentalModel?.twistySceneModel?.orbitCoordinatesRequest;
      if (orbitReq) {
        orbitReq.set({ latitude: 0, longitude: 0 } as never);
        orbitReq.set("auto");
      }
    } catch {
      // Ignore if 3D scene model is not initialized
    }
  }

  /**
   * Renders a styled error message inside the block container without crashing Obsidian.
   */
  private renderError(
    container: HTMLElement,
    title: string,
    details: string
  ): void {
    const errorBox = container.createDiv({ cls: "rubik-viz-error" });
    errorBox.createDiv({
      cls: "rubik-viz-error-title",
      text: `⚠️ ${title}`,
    });
    errorBox.createDiv({
      cls: "rubik-viz-error-details",
      text: details,
    });
  }
}

interface RubikPreset {
  id: string;
  label: string;
  config: Required<Omit<RubikVizConfig, "state">>;
}

const RUBIK_PRESETS: RubikPreset[] = [
  {
    id: "custom",
    label: "✨ Personalizado (Amarillo arriba z2)",
    config: {
      title: "",
      puzzle: "3x3x3",
      view: "3D",
      setup: "z2",
      alg: "",
      anchor: "start",
      mask: "full",
      tempo: 1,
      controls: true,
    },
  },
  {
    id: "sexy-move",
    label: "⚡ 3x3 - Trigger Sexy Move (R U R' U')",
    config: {
      title: "Trigger: Sexy Move",
      puzzle: "3x3x3",
      view: "3D",
      setup: "z2",
      alg: "R U R' U'",
      anchor: "start",
      mask: "full",
      tempo: 1.2,
      controls: true,
    },
  },
  {
    id: "oll-sune",
    label: "🟨 3x3 - OLL 27 (Sune)",
    config: {
      title: "OLL 27 - Sune",
      puzzle: "3x3x3",
      view: "3D",
      setup: "z2",
      alg: "R U R' U R U2 R'",
      anchor: "end",
      mask: "full",
      tempo: 1.3,
      controls: true,
    },
  },
  {
    id: "pll-tperm",
    label: "🔄 3x3 - PLL T-Perm",
    config: {
      title: "PLL - T Perm",
      puzzle: "3x3x3",
      view: "3D",
      setup: "z2",
      alg: "R U R' U' R' F R2 U' R' U' R U R' F'",
      anchor: "end",
      mask: "full",
      tempo: 1.5,
      controls: true,
    },
  },
  {
    id: "4x4-oll-parity",
    label: "🟧 4x4 - Paridad de OLL (Capas dobles Rw / Lw)",
    config: {
      title: "4x4x4 - Paridad de OLL",
      puzzle: "4x4x4",
      view: "3D",
      setup: "z2",
      alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'",
      anchor: "end",
      mask: "full",
      tempo: 1.5,
      controls: true,
    },
  },
  {
    id: "4x4-pll-parity",
    label: "🟪 4x4 - Paridad de PLL (Capas internas 2R2 / Uw2)",
    config: {
      title: "4x4x4 - Paridad de PLL",
      puzzle: "4x4x4",
      view: "3D",
      setup: "z2",
      alg: "2R2 U2 2R2 Uw2 2R2 Uw2",
      anchor: "end",
      mask: "full",
      tempo: 1.2,
      controls: true,
    },
  },
];

/**
 * Interactive Modal for building, previewing in real time, and inserting a
 * ```rubik-viz code block at the current editor cursor position.
 */
class InsertRubikModal extends Modal {
  private plugin: RubikVisualizerPlugin;
  private onSubmit: (markdownBlock: string) => void;
  private openMapperByDefault: boolean;
  private player: TwistyPlayer | null = null;
  private onWindowMouseUp: (() => void) | null = null;

  private draft: {
    title: string;
    puzzle: "3x3x3" | "4x4x4";
    view: "3D" | "2D" | "PG3D";
    setup: string;
    alg: string;
    anchor: "start" | "end";
    mask: string;
    tempo: number;
    controls: boolean;
  } = {
    title: "",
    puzzle: "3x3x3",
    view: "3D",
    setup: "z2",
    alg: "R U R' U'",
    anchor: "start",
    mask: "full",
    tempo: 1,
    controls: true,
  };

  constructor(
    app: App,
    plugin: RubikVisualizerPlugin,
    onSubmit: (markdownBlock: string) => void,
    openMapperByDefault = false
  ) {
    super(app);
    this.plugin = plugin;
    this.onSubmit = onSubmit;
    this.openMapperByDefault = openMapperByDefault;
  }

  onOpen(): void {
    ensureIdempotentCubingElements();
    const { contentEl, modalEl } = this;
    contentEl.empty();
    modalEl.addClass("rubik-viz-modal-container");

    // Modal Header
    const headerEl = contentEl.createDiv({ cls: "rubik-viz-modal-header" });
    headerEl.createEl("h3", {
      cls: "rubik-viz-modal-title",
      text: "🧊 Insertar estado de cubo (Rubik Studio Visualizer)",
    });
    headerEl.createEl("p", {
      cls: "rubik-viz-modal-subtitle",
      text: "Configura el cubo 3x3 o 4x4, construye el algoritmo con vista previa en tiempo real e insértalo en tu nota.",
    });

    // Two-column layout: Left = Form & Move Pad | Right = Live Preview & YAML output
    const bodyGridEl = contentEl.createDiv({ cls: "rubik-viz-modal-grid" });
    const formColEl = bodyGridEl.createDiv({ cls: "rubik-viz-modal-form" });
    const previewColEl = bodyGridEl.createDiv({
      cls: "rubik-viz-modal-preview",
    });

    // --- 1. Quick Preset Selector ---
    const presetRow = formColEl.createDiv({ cls: "rubik-viz-field" });
    presetRow.createEl("label", {
      cls: "rubik-viz-label",
      text: "Plantilla rápida (opcional)",
    });
    const presetSelect = presetRow.createEl("select", {
      cls: "rubik-viz-select",
    });
    RUBIK_PRESETS.forEach((preset) => {
      presetSelect.createEl("option", {
        value: preset.id,
        text: preset.label,
      });
    });
    presetSelect.value = "sexy-move";

    // --- 2. Puzzle (3x3 vs 4x4) & Title ---
    const rowPuzzleTitle = formColEl.createDiv({ cls: "rubik-viz-row-2col" });

    const puzzleField = rowPuzzleTitle.createDiv({ cls: "rubik-viz-field" });
    puzzleField.createEl("label", {
      cls: "rubik-viz-label",
      text: "Tipo de cubo (puzzle)",
    });
    const puzzleToggleGroup = puzzleField.createDiv({
      cls: "rubik-viz-segmented",
    });
    const btn3x3 = puzzleToggleGroup.createEl("button", {
      cls: "rubik-viz-seg-btn is-active",
      text: "3x3x3",
      attr: { type: "button" },
    });
    const btn4x4 = puzzleToggleGroup.createEl("button", {
      cls: "rubik-viz-seg-btn",
      text: "4x4x4",
      attr: { type: "button" },
    });

    const titleField = rowPuzzleTitle.createDiv({ cls: "rubik-viz-field" });
    titleField.createEl("label", {
      cls: "rubik-viz-label",
      text: "Título de la tarjeta (title)",
    });
    const titleInput = titleField.createEl("input", {
      cls: "rubik-viz-input",
      attr: {
        type: "text",
        placeholder: "Ej. PLL - T Perm / Paridad OLL",
      },
    });
    titleInput.value = this.draft.title;

    // --- 3. View, Mask, Anchor ---
    const rowOptions = formColEl.createDiv({ cls: "rubik-viz-row-3col" });

    const viewField = rowOptions.createDiv({ cls: "rubik-viz-field" });
    viewField.createEl("label", {
      cls: "rubik-viz-label",
      text: "Vista (view)",
    });
    const viewSelect = viewField.createEl("select", {
      cls: "rubik-viz-select",
    });
    [
      { value: "3D", label: "3D (Interactiva)" },
      { value: "2D", label: "2D (Desplegado)" },
      { value: "PG3D", label: "PG3D" },
    ].forEach((opt) =>
      viewSelect.createEl("option", { value: opt.value, text: opt.label })
    );

    const maskField = rowOptions.createDiv({ cls: "rubik-viz-field" });
    maskField.createEl("label", {
      cls: "rubik-viz-label",
      text: "Máscara (mask)",
    });
    const maskSelect = maskField.createEl("select", {
      cls: "rubik-viz-select",
    });
    [
      { value: "full", label: "full (Completo)" },
      { value: "OLL", label: "OLL (Capa superior)" },
      { value: "PLL", label: "PLL (Permutación)" },
      { value: "F2L", label: "F2L (2 capas)" },
      { value: "centers", label: "centers (Solo centros)" },
    ].forEach((opt) =>
      maskSelect.createEl("option", { value: opt.value, text: opt.label })
    );

    const anchorField = rowOptions.createDiv({ cls: "rubik-viz-field" });
    anchorField.createEl("label", {
      cls: "rubik-viz-label",
      text: "Anclaje (anchor)",
    });
    const anchorSelect = anchorField.createEl("select", {
      cls: "rubik-viz-select",
    });
    [
      { value: "start", label: "start (Desde Setup)" },
      { value: "end", label: "end (Termina resuelto)" },
    ].forEach((opt) =>
      anchorSelect.createEl("option", { value: opt.value, text: opt.label })
    );

    // --- 4. Setup Input + Quick Orientation Chips ---
    const setupField = formColEl.createDiv({ cls: "rubik-viz-field" });
    const setupHeader = setupField.createDiv({
      cls: "rubik-viz-field-header",
    });
    setupHeader.createEl("label", {
      cls: "rubik-viz-label",
      text: "Estado inicial / Orientación (setup)",
    });
    const setupQuickChips = setupHeader.createDiv({
      cls: "rubik-viz-quick-chips",
    });

    const setupInput = setupField.createEl("input", {
      cls: "rubik-viz-input is-mono",
      attr: {
        type: "text",
        placeholder: "Ej. z2 o F R U R' U' F' (opcional)",
      },
    });
    setupInput.value = this.draft.setup;

    [
      { label: "z2 (Amarillo U)", val: "z2" },
      { label: "x2", val: "x2" },
      { label: "y", val: "y" },
      { label: "Limpiar", val: "" },
    ].forEach((chip) => {
      const chipBtn = setupQuickChips.createEl("button", {
        cls: "rubik-viz-chip-btn",
        text: chip.label,
        attr: { type: "button" },
      });
      chipBtn.addEventListener("click", () => {
        if (chip.val === "") {
          this.draft.setup = "";
        } else {
          const tokens = this.plugin.tokenizeAlg(this.draft.setup);
          if (!tokens.includes(chip.val)) {
            tokens.push(chip.val);
          }
          this.draft.setup = tokens.join(" ");
        }
        setupInput.value = this.draft.setup;
        updateLivePreview();
      });
    });

    // --- 4B. Real-Life Cube 2D Color Mapper (Calculador de Estado Inicial) ---
    const toggleMapperBtn = setupQuickChips.createEl("button", {
      cls: `rubik-viz-chip-btn is-mapper-toggle ${
        this.openMapperByDefault ? "is-active" : ""
      }`,
      text: "🎨 Mapear Cubo Real (3x3)",
      attr: {
        type: "button",
        title: "Pinta los 54 colores de tu cubo físico real para calcular su estado inicial y su solución",
      },
    });

    const mapperPanelEl = setupField.createDiv({
      cls: `rubik-viz-mapper-panel ${
        this.openMapperByDefault ? "" : "is-hidden"
      }`,
    });

    const mapperTopBar = mapperPanelEl.createDiv({
      cls: "rubik-viz-mapper-topbar",
    });
    mapperTopBar.createSpan({
      cls: "rubik-viz-mapper-title",
      text: "🎨 Pintor de Cubo Real 3x3 (Selecciona un color y haz clic en las casillas)",
    });
    const mapperTopActions = mapperTopBar.createDiv({
      cls: "rubik-viz-quick-chips",
    });
    const syncFromSetupBtn = mapperTopActions.createEl("button", {
      cls: "rubik-viz-chip-btn",
      text: "🔄 Leer desde Setup",
      attr: {
        type: "button",
        title: "Pinta en la plantilla el estado que produce el Setup actual",
      },
    });
    const resetSolvedPainterBtn = mapperTopActions.createEl("button", {
      cls: "rubik-viz-chip-btn",
      text: "🧼 Cubo Resuelto",
      attr: {
        type: "button",
        title: "Reinicia las 54 casillas al cubo resuelto",
      },
    });

    const FACE_COLOR_META: Array<{
      face: FaceletCode;
      name: string;
      short: string;
      hex: string;
    }> = [
      { face: "U", name: "Blanco (U)", short: "U", hex: "#f8fafc" },
      { face: "L", name: "Naranja (L)", short: "L", hex: "#f97316" },
      { face: "F", name: "Verde (F)", short: "F", hex: "#22c55e" },
      { face: "R", name: "Rojo (R)", short: "R", hex: "#ef4444" },
      { face: "B", name: "Azul (B)", short: "B", hex: "#3b82f6" },
      { face: "D", name: "Amarillo (D)", short: "D", hex: "#eab308" },
    ];

    let activeBrush: FaceletCode = "U";
    const paintedFacelets: FaceletCode[] = RealCubeSolver.getSolvedFacelets().split(
      ""
    ) as FaceletCode[];

    const paletteBarEl = mapperPanelEl.createDiv({
      cls: "rubik-viz-mapper-palette",
    });
    const paletteBtns: Record<
      FaceletCode,
      { btn: HTMLButtonElement; countEl: HTMLElement }
    > = {} as Record<
      FaceletCode,
      { btn: HTMLButtonElement; countEl: HTMLElement }
    >;

    FACE_COLOR_META.forEach((meta) => {
      const pBtn = paletteBarEl.createEl("button", {
        cls: `rubik-viz-palette-btn ${meta.face === activeBrush ? "is-selected" : ""}`,
        attr: { type: "button" },
      });
      pBtn.createSpan({
        cls: `rubik-viz-palette-swatch rubik-viz-face-${meta.face}`,
      });
      pBtn.createSpan({ text: meta.name });
      const countEl = pBtn.createSpan({
        cls: "rubik-viz-palette-count",
        text: "9/9",
      });

      pBtn.addEventListener("click", () => {
        activeBrush = meta.face;
        Object.entries(paletteBtns).forEach(([k, v]) => {
          v.btn.classList.toggle("is-selected", k === activeBrush);
        });
      });

      paletteBtns[meta.face] = { btn: pBtn, countEl };
    });

    // 2D Unfolded Net Grid (4 columns x 3 rows of 3x3 faces)
    // Layout:
    //   [ . ] [ U ] [ . ] [ . ]
    //   [ L ] [ F ] [ R ] [ B ]
    //   [ . ] [ D ] [ . ] [ . ]
    const netContainerEl = mapperPanelEl.createDiv({
      cls: "rubik-viz-mapper-net",
    });

    const stickerButtons: HTMLButtonElement[] = new Array(54);
    let isMouseDown = false;
    netContainerEl.addEventListener("mousedown", () => {
      isMouseDown = true;
    });
    this.onWindowMouseUp = () => {
      isMouseDown = false;
    };
    window.addEventListener("mouseup", this.onWindowMouseUp);

    const netLayout: Array<{
      face: FaceletCode | null;
      offset: number;
    }> = [
      { face: null, offset: -1 },
      { face: "U", offset: 0 },
      { face: null, offset: -1 },
      { face: null, offset: -1 },
      { face: "L", offset: 36 },
      { face: "F", offset: 18 },
      { face: "R", offset: 9 },
      { face: "B", offset: 45 },
      { face: null, offset: -1 },
      { face: "D", offset: 27 },
      { face: null, offset: -1 },
      { face: null, offset: -1 },
    ];

    const allFaceColorClasses = [
      "rubik-viz-face-U",
      "rubik-viz-face-L",
      "rubik-viz-face-F",
      "rubik-viz-face-R",
      "rubik-viz-face-B",
      "rubik-viz-face-D",
    ];

    const validationStatusEl = mapperPanelEl.createDiv({
      cls: "rubik-viz-mapper-status is-valid",
    });

    const mapperBottomActions = mapperPanelEl.createDiv({
      cls: "rubik-viz-mapper-actions",
    });
    const applySetupOnlyBtn = mapperBottomActions.createEl("button", {
      cls: "rubik-viz-btn is-active",
      text: "📥 Usar como Estado Inicial (setup)",
      attr: {
        type: "button",
        title: "Calcula el setup exacto de este cubo físico y actualiza la vista 3D",
      },
    });
    const applySetupAndSolveBtn = mapperBottomActions.createEl("button", {
      cls: "rubik-viz-btn",
      text: "🪄 Cargar Estado Inicial + Solución en Algoritmo",
      attr: {
        type: "button",
        title: "Pone tu cubo real en setup y escribe en alg los pasos para armarlo",
      },
    });

    const refreshMapperUI = () => {
      const counts: Record<FaceletCode, number> = {
        U: 0,
        R: 0,
        F: 0,
        D: 0,
        L: 0,
        B: 0,
      };
      for (let i = 0; i < 54; i++) {
        const c = paintedFacelets[i];
        counts[c]++;
        const btn = stickerButtons[i];
        if (btn) {
          btn.removeClass(...allFaceColorClasses);
          btn.addClass(`rubik-viz-face-${c}`);
        }
      }

      (Object.keys(paletteBtns) as FaceletCode[]).forEach((face) => {
        const c = counts[face];
        const item = paletteBtns[face];
        item.countEl.setText(`${c}/9`);
        item.countEl.classList.toggle("is-bad-count", c !== 9);
      });

      const check = RealCubeSolver.parseAndValidateFacelets(
        paintedFacelets.join("")
      );
      if (check.valid) {
        validationStatusEl.setText(
          "✅ Cubo físico válido y resoluble. Listo para calcular."
        );
        validationStatusEl.classList.remove("is-invalid");
        validationStatusEl.classList.add("is-valid");
        applySetupOnlyBtn.disabled = false;
        applySetupAndSolveBtn.disabled = false;
      } else {
        validationStatusEl.setText(`⚠️ ${check.error}`);
        validationStatusEl.classList.remove("is-valid");
        validationStatusEl.classList.add("is-invalid");
        applySetupOnlyBtn.disabled = true;
        applySetupAndSolveBtn.disabled = true;
      }
    };

    netLayout.forEach((cell) => {
      if (!cell.face) {
        netContainerEl.createDiv({ cls: "rubik-viz-net-empty" });
        return;
      }
      const faceGrid = netContainerEl.createDiv({
        cls: "rubik-viz-net-face",
      });
      for (let k = 0; k < 9; k++) {
        const idx = cell.offset + k;
        const isCenter = k === 4;
        const sBtn = faceGrid.createEl("button", {
          cls: `rubik-viz-sticker-btn ${isCenter ? "is-center" : ""}`,
          text: isCenter ? cell.face : "",
          attr: {
            type: "button",
            title: isCenter
              ? `Centro fijo de la cara ${cell.face}`
              : `Casilla #${idx + 1} (clic para pintar)`,
          },
        });
        stickerButtons[idx] = sBtn;

        if (!isCenter) {
          const paintSticker = () => {
            paintedFacelets[idx] = activeBrush;
            refreshMapperUI();
          };
          sBtn.addEventListener("mousedown", (e) => {
            e.preventDefault();
            paintSticker();
          });
          sBtn.addEventListener("mouseenter", () => {
            if (isMouseDown) {
              paintSticker();
            }
          });
        }
      }
    });

    refreshMapperUI();

    toggleMapperBtn.addEventListener("click", () => {
      const hidden = mapperPanelEl.classList.toggle("is-hidden");
      toggleMapperBtn.classList.toggle("is-active", !hidden);
      if (!hidden && this.draft.puzzle !== "3x3x3") {
        this.draft.puzzle = "3x3x3";
        updateLivePreview();
      }
    });

    resetSolvedPainterBtn.addEventListener("click", () => {
      const solved = RealCubeSolver.getSolvedFacelets().split(
        ""
      ) as FaceletCode[];
      for (let i = 0; i < 54; i++) paintedFacelets[i] = solved[i];
      refreshMapperUI();
    });

    syncFromSetupBtn.addEventListener("click", () => {
      try {
        const stateFromSetup = RealCubeSolver.faceletsFromAlg(this.draft.setup);
        for (let i = 0; i < 54; i++) {
          paintedFacelets[i] = stateFromSetup[i] as FaceletCode;
        }
        refreshMapperUI();
        new Notice("Colores cargados desde el Setup actual.");
      } catch {
        new Notice(
          "Solo se pueden sincronizar giros estándar 3x3 (U, R, F, D, L, B)."
        );
      }
    });

    applySetupOnlyBtn.addEventListener("click", () => {
      const check = RealCubeSolver.parseAndValidateFacelets(
        paintedFacelets.join("")
      );
      if (!check.valid || !check.state) return;
      const { setup } = RealCubeSolver.solveCubieState(check.state);
      this.draft.puzzle = "3x3x3";
      this.draft.setup = setup;
      this.draft.anchor = "start";
      setupInput.value = setup;
      anchorSelect.value = "start";
      updateLivePreview();
      new Notice("Estado inicial (setup) calculado desde los colores pintados.");
    });

    applySetupAndSolveBtn.addEventListener("click", () => {
      const check = RealCubeSolver.parseAndValidateFacelets(
        paintedFacelets.join("")
      );
      if (!check.valid || !check.state) return;
      const { setup, solution } = RealCubeSolver.solveCubieState(check.state);
      this.draft.puzzle = "3x3x3";
      this.draft.setup = setup;
      this.draft.alg = solution;
      this.draft.anchor = "start";
      setupInput.value = setup;
      algTextarea.value = solution;
      anchorSelect.value = "start";
      updateLivePreview();
      new Notice(
        "¡Listo! Estado inicial en 'setup' y solución paso a paso cargada en 'alg'."
      );
    });

    // --- 5. Algorithm Input + Interactive Move Keypad ---
    const algField = formColEl.createDiv({ cls: "rubik-viz-field" });
    const algHeader = algField.createDiv({ cls: "rubik-viz-field-header" });
    algHeader.createEl("label", {
      cls: "rubik-viz-label",
      text: "Secuencia del Algoritmo (alg)",
    });

    const algUtilBtns = algHeader.createDiv({ cls: "rubik-viz-quick-chips" });
    const invertAlgBtn = algUtilBtns.createEl("button", {
      cls: "rubik-viz-chip-btn",
      text: "⇄ Invertir",
      attr: {
        type: "button",
        title: "Invierte toda la secuencia del algoritmo",
      },
    });
    const backspaceAlgBtn = algUtilBtns.createEl("button", {
      cls: "rubik-viz-chip-btn",
      text: "⌫ Borrar último",
      attr: {
        type: "button",
        title: "Elimina el último movimiento del algoritmo",
      },
    });
    const clearAlgBtn = algUtilBtns.createEl("button", {
      cls: "rubik-viz-chip-btn",
      text: "✕ Limpiar",
      attr: { type: "button" },
    });

    const algTextarea = algField.createEl("textarea", {
      cls: "rubik-viz-textarea is-mono",
      attr: {
        rows: "2",
        placeholder: "Escribe o haz clic en los botones de abajo: R U R' U'...",
      },
    });
    algTextarea.value = this.draft.alg;

    // Quick Move Pad (Outer moves + 4x4 wide/inner moves)
    const keypadContainer = algField.createDiv({
      cls: "rubik-viz-keypad",
    });
    keypadContainer.createDiv({
      cls: "rubik-viz-keypad-label",
      text: "Teclado rápido de movimientos (clic para añadir):",
    });
    const outerPadRow = keypadContainer.createDiv({
      cls: "rubik-viz-keypad-row",
    });
    const outerMoves = [
      "R",
      "R'",
      "R2",
      "U",
      "U'",
      "U2",
      "F",
      "F'",
      "F2",
      "L",
      "L'",
      "L2",
      "D",
      "D'",
      "B",
      "B'",
      "M'",
      "x",
      "y",
    ];
    outerMoves.forEach((mv) => {
      const b = outerPadRow.createEl("button", {
        cls: "rubik-viz-pad-btn",
        text: mv,
        attr: { type: "button" },
      });
      b.addEventListener("click", () => {
        appendMoveToAlg(mv);
      });
    });

    const widePadSection = keypadContainer.createDiv({
      cls: "rubik-viz-keypad-wide-section",
    });
    widePadSection.createDiv({
      cls: "rubik-viz-keypad-label is-wide",
      text: "Capas dobles e internas 4x4 (Paridad OLL / PLL):",
    });
    const widePadRow = widePadSection.createDiv({
      cls: "rubik-viz-keypad-row",
    });
    const wideMoves = [
      "Rw",
      "Rw'",
      "Rw2",
      "Uw",
      "Uw'",
      "Uw2",
      "Lw",
      "Lw'",
      "2R2",
      "2R",
      "2R'",
      "2U2",
      "r",
      "r'",
      "l",
    ];
    wideMoves.forEach((mv) => {
      const b = widePadRow.createEl("button", {
        cls: "rubik-viz-pad-btn is-wide-or-inner",
        text: mv,
        attr: { type: "button" },
      });
      b.addEventListener("click", () => {
        appendMoveToAlg(mv);
      });
    });

    // --- 6. Tempo & Controls ---
    const rowFooterOpts = formColEl.createDiv({ cls: "rubik-viz-row-2col" });

    const tempoField = rowFooterOpts.createDiv({ cls: "rubik-viz-field" });
    const tempoLabelEl = tempoField.createEl("label", {
      cls: "rubik-viz-label",
      text: `Velocidad (tempo): ${this.draft.tempo}x`,
    });
    const tempoSlider = tempoField.createEl("input", {
      cls: "rubik-viz-slider",
      attr: {
        type: "range",
        min: "0.3",
        max: "3",
        step: "0.1",
      },
    });
    tempoSlider.value = String(this.draft.tempo);

    const controlsField = rowFooterOpts.createDiv({
      cls: "rubik-viz-field is-checkbox-field",
    });
    const controlsLabel = controlsField.createEl("label", {
      cls: "rubik-viz-checkbox-label",
    });
    const controlsCheckbox = controlsLabel.createEl("input", {
      attr: { type: "checkbox" },
    });
    controlsCheckbox.checked = this.draft.controls;
    controlsLabel.createSpan({
      text: "Mostrar barra de reproducción (controls: true)",
    });

    // --- RIGHT COLUMN: Live TwistyPlayer + Move Badges + Code Preview ---
    const previewCardEl = previewColEl.createDiv({
      cls: "rubik-viz-modal-preview-card",
    });
    const previewTopBar = previewCardEl.createDiv({
      cls: "rubik-viz-modal-preview-header",
    });
    const previewBadgeEl = previewTopBar.createSpan({
      cls: "rubik-viz-badge is-3x3",
      text: "3x3",
    });
    const previewTitleEl = previewTopBar.createSpan({
      cls: "rubik-viz-modal-preview-title",
      text: "Vista previa en tiempo real",
    });
    const previewCenterBtn = previewTopBar.createEl("button", {
      cls: "rubik-viz-btn rubik-viz-preview-center-btn",
      text: "🎯 Centrar cubo",
      attr: {
        type: "button",
        title:
          "Centrar la cámara 3D en la posición natural (caras U, F y R)",
      },
    });
    previewCenterBtn.addEventListener("click", () => {
      if (this.player) {
        this.plugin.centerCubeCamera(this.player);
      }
    });

    const previewViewportEl = previewCardEl.createDiv({
      cls: "rubik-viz-modal-viewport",
    });

    this.player = new TwistyPlayer({
      puzzle: this.draft.puzzle,
      visualization: this.draft.view,
      experimentalSetupAlg: this.draft.setup,
      alg: this.draft.alg,
      experimentalSetupAnchor: this.draft.anchor,
      experimentalStickering: "full",
      tempoScale: this.draft.tempo,
      controlPanel: "bottom-row",
      background: "none",
      hintFacelets: "floating",
      backView: "none",
    });
    this.player.classList.add("rubik-viz-twisty-player");
    previewViewportEl.appendChild(this.player);

    const previewMovesBar = previewCardEl.createDiv({
      cls: "rubik-viz-alg-moves rubik-viz-modal-moves-preview",
    });
    let previewMoveButtons: HTMLButtonElement[] = [];

    this.player.experimentalModel.currentMoveInfo.addFreshListener(
      (moveInfo) => {
        if (previewMoveButtons.length === 0) return;
        const totalFinished =
          moveInfo.patternIndex +
          moveInfo.movesFinished.length +
          moveInfo.movesFinishing.length;
        const isAnimatingMove = moveInfo.currentMoves.length > 0;

        let activeIdx: number | null = null;
        if (isAnimatingMove) {
          activeIdx = Math.min(
            Math.max(0, totalFinished),
            previewMoveButtons.length - 1
          );
        } else if (totalFinished > 0) {
          activeIdx = Math.min(
            totalFinished - 1,
            previewMoveButtons.length - 1
          );
        }

        previewMoveButtons.forEach((btn, idx) => {
          const isCurrent = activeIdx === idx;
          btn.classList.toggle("is-active", isCurrent);
          btn.classList.toggle("is-animating", isCurrent && isAnimatingMove);
          btn.classList.toggle(
            "is-past",
            activeIdx !== null && idx < activeIdx
          );
        });
      }
    );

    const yamlPreviewWrapper = previewColEl.createDiv({
      cls: "rubik-viz-modal-yaml-box",
    });
    yamlPreviewWrapper.createDiv({
      cls: "rubik-viz-label",
      text: "Bloque Markdown que se insertará:",
    });
    const yamlPreEl = yamlPreviewWrapper.createEl("pre", {
      cls: "rubik-viz-modal-yaml-pre",
    });

    // --- Modal Action Buttons ---
    const footerActionsEl = contentEl.createDiv({
      cls: "rubik-viz-modal-footer",
    });
    const cancelBtn = footerActionsEl.createEl("button", {
      cls: "rubik-viz-btn",
      text: "Cancelar",
      attr: { type: "button" },
    });
    const insertBtn = footerActionsEl.createEl("button", {
      cls: "rubik-viz-btn is-active rubik-viz-insert-btn",
      text: "✚ Insertar bloque rubik-viz en el cursor",
      attr: { type: "button" },
    });

    // Helper: Build Markdown block string
    const buildMarkdownBlock = (): string => {
      const lines: string[] = ["```rubik-viz"];
      if (this.draft.title.trim()) {
        lines.push(`title: "${this.draft.title.trim().replace(/"/g, '\\"')}"`);
      }
      lines.push(`puzzle: ${this.draft.puzzle}`);
      lines.push(`view: ${this.draft.view}`);
      if (this.draft.setup.trim()) {
        lines.push(`setup: "${this.draft.setup.trim()}"`);
      }
      if (this.draft.alg.trim()) {
        lines.push(`alg: "${this.draft.alg.trim()}"`);
      }
      if (this.draft.anchor !== "start") {
        lines.push(`anchor: ${this.draft.anchor}`);
      }
      if (this.draft.mask !== "full") {
        lines.push(`mask: ${this.draft.mask}`);
      }
      if (this.draft.tempo !== 1) {
        lines.push(`tempo: ${this.draft.tempo}`);
      }
      if (!this.draft.controls) {
        lines.push(`controls: false`);
      }
      lines.push("```");
      return lines.join("\n");
    };

    // Helper: Refresh live TwistyPlayer, move badges, and YAML preview
    const updateLivePreview = () => {
      const normalized = this.plugin.normalizeConfig({
        puzzle: this.draft.puzzle,
        view: this.draft.view,
        setup: this.draft.setup,
        alg: this.draft.alg,
        anchor: this.draft.anchor,
        mask: this.draft.mask,
        tempo: this.draft.tempo,
        controls: this.draft.controls,
        title: this.draft.title,
      });

      btn3x3.classList.toggle("is-active", this.draft.puzzle === "3x3x3");
      btn4x4.classList.toggle("is-active", this.draft.puzzle === "4x4x4");

      previewBadgeEl.setText(normalized.puzzleBadge);
      previewBadgeEl.className = `rubik-viz-badge ${
        normalized.puzzleBadge === "4x4" ? "is-4x4" : "is-3x3"
      }`;
      previewTitleEl.setText(
        normalized.title || `Vista previa (${normalized.puzzleBadge})`
      );

      if (this.player) {
        this.player.puzzle = normalized.puzzle;
        this.player.visualization = normalized.view;
        this.player.experimentalSetupAlg = normalized.setup;
        this.player.experimentalSetupAnchor = normalized.anchor;
        this.player.experimentalStickering = normalized.mask;
        this.player.alg = normalized.alg;
        this.player.tempoScale = normalized.tempo;
        this.player.controlPanel = normalized.controls ? "bottom-row" : "none";
      }

      // Render interactive move badges in preview
      previewMovesBar.empty();
      previewMoveButtons = [];
      const moveTokens = this.plugin.tokenizeAlg(normalized.alg);
      if (moveTokens.length === 0) {
        previewMovesBar.createSpan({
          cls: "rubik-viz-alg-empty",
          text: "Sin movimientos (mostrando estado inicial).",
        });
      } else {
        moveTokens.forEach((mv, idx) => {
          const isSpecial = this.plugin.isWideOrInnerMove(mv);
          const chip = previewMovesBar.createEl("button", {
            cls: `rubik-viz-move-btn${isSpecial ? " is-wide-or-inner" : ""}`,
            text: mv,
            attr: {
              type: "button",
              title: isSpecial
                ? `Reproducir paso #${idx + 1}: ${mv} (Capa doble / interna 4x4)`
                : `Reproducir paso #${idx + 1}: ${mv}`,
            },
          });
          chip.addEventListener("click", () => {
            if (!this.player) return;
            void this.plugin.playSingleMoveAtIndex(this.player, idx);
          });
          previewMoveButtons.push(chip);
        });
      }

      yamlPreEl.setText(buildMarkdownBlock());
    };

    const appendMoveToAlg = (move: string) => {
      const tokens = this.plugin.tokenizeAlg(this.draft.alg);
      tokens.push(move);
      this.draft.alg = tokens.join(" ");
      algTextarea.value = this.draft.alg;
      updateLivePreview();
    };

    // Wire events
    presetSelect.addEventListener("change", () => {
      const found = RUBIK_PRESETS.find((p) => p.id === presetSelect.value);
      if (!found) return;
      this.draft.title = found.config.title;
      this.draft.puzzle = found.config.puzzle as "3x3x3" | "4x4x4";
      this.draft.view = found.config.view as "3D" | "2D" | "PG3D";
      this.draft.setup = found.config.setup;
      this.draft.alg = found.config.alg;
      this.draft.anchor = found.config.anchor as "start" | "end";
      this.draft.mask = found.config.mask;
      this.draft.tempo = Number(found.config.tempo);
      this.draft.controls = Boolean(found.config.controls);

      titleInput.value = this.draft.title;
      viewSelect.value = this.draft.view;
      maskSelect.value = this.draft.mask;
      anchorSelect.value = this.draft.anchor;
      setupInput.value = this.draft.setup;
      algTextarea.value = this.draft.alg;
      tempoSlider.value = String(this.draft.tempo);
      tempoLabelEl.setText(`Velocidad (tempo): ${this.draft.tempo}x`);
      controlsCheckbox.checked = this.draft.controls;

      updateLivePreview();
    });

    btn3x3.addEventListener("click", () => {
      this.draft.puzzle = "3x3x3";
      updateLivePreview();
    });

    btn4x4.addEventListener("click", () => {
      this.draft.puzzle = "4x4x4";
      updateLivePreview();
    });

    titleInput.addEventListener("input", () => {
      this.draft.title = titleInput.value;
      updateLivePreview();
    });

    viewSelect.addEventListener("change", () => {
      this.draft.view = viewSelect.value as "3D" | "2D" | "PG3D";
      updateLivePreview();
    });

    maskSelect.addEventListener("change", () => {
      this.draft.mask = maskSelect.value;
      updateLivePreview();
    });

    anchorSelect.addEventListener("change", () => {
      this.draft.anchor = anchorSelect.value as "start" | "end";
      updateLivePreview();
    });

    setupInput.addEventListener("input", () => {
      this.draft.setup = setupInput.value;
      updateLivePreview();
    });

    algTextarea.addEventListener("input", () => {
      this.draft.alg = algTextarea.value;
      updateLivePreview();
    });

    invertAlgBtn.addEventListener("click", () => {
      const tokens = this.plugin.tokenizeAlg(this.draft.alg);
      this.draft.alg = this.plugin.invertMoves(tokens).join(" ");
      algTextarea.value = this.draft.alg;
      updateLivePreview();
    });

    backspaceAlgBtn.addEventListener("click", () => {
      const tokens = this.plugin.tokenizeAlg(this.draft.alg);
      tokens.pop();
      this.draft.alg = tokens.join(" ");
      algTextarea.value = this.draft.alg;
      updateLivePreview();
    });

    clearAlgBtn.addEventListener("click", () => {
      this.draft.alg = "";
      algTextarea.value = "";
      updateLivePreview();
    });

    tempoSlider.addEventListener("input", () => {
      this.draft.tempo = Number(tempoSlider.value);
      tempoLabelEl.setText(`Velocidad (tempo): ${this.draft.tempo}x`);
      updateLivePreview();
    });

    controlsCheckbox.addEventListener("change", () => {
      this.draft.controls = controlsCheckbox.checked;
      updateLivePreview();
    });

    cancelBtn.addEventListener("click", () => {
      this.close();
    });

    insertBtn.addEventListener("click", () => {
      this.onSubmit(buildMarkdownBlock());
      this.close();
    });

    // Apply initial preset ("sexy-move") and render preview
    presetSelect.dispatchEvent(new Event("change"));
  }

  onClose(): void {
    if (this.onWindowMouseUp) {
      window.removeEventListener("mouseup", this.onWindowMouseUp);
      this.onWindowMouseUp = null;
    }
    if (this.player) {
      this.player.remove();
      this.player = null;
    }
    this.contentEl.empty();
  }
}

type FaceletCode = "U" | "R" | "F" | "D" | "L" | "B";

interface CubieState {
  cp: number[];
  co: number[];
  ep: number[];
  eo: number[];
}

interface MacroMove {
  alg: string;
  trans: CubieState;
}

const FACE_OFFSETS = { U: 0, R: 9, F: 18, D: 27, L: 36, B: 45 } as const;

const CORNER_FACELETS: ReadonlyArray<readonly [number, number, number]> = [
  [FACE_OFFSETS.U + 8, FACE_OFFSETS.R + 0, FACE_OFFSETS.F + 2], // 0: UFR
  [FACE_OFFSETS.U + 6, FACE_OFFSETS.F + 0, FACE_OFFSETS.L + 2], // 1: UFL
  [FACE_OFFSETS.U + 0, FACE_OFFSETS.L + 0, FACE_OFFSETS.B + 2], // 2: UBL
  [FACE_OFFSETS.U + 2, FACE_OFFSETS.B + 0, FACE_OFFSETS.R + 2], // 3: UBR
  [FACE_OFFSETS.D + 2, FACE_OFFSETS.F + 8, FACE_OFFSETS.R + 6], // 4: DFR
  [FACE_OFFSETS.D + 0, FACE_OFFSETS.L + 8, FACE_OFFSETS.F + 6], // 5: DFL
  [FACE_OFFSETS.D + 6, FACE_OFFSETS.B + 8, FACE_OFFSETS.L + 6], // 6: DBL
  [FACE_OFFSETS.D + 8, FACE_OFFSETS.R + 8, FACE_OFFSETS.B + 6], // 7: DBR
];

const CORNER_COLORS: ReadonlyArray<readonly [FaceletCode, FaceletCode, FaceletCode]> = [
  ["U", "R", "F"],
  ["U", "F", "L"],
  ["U", "L", "B"],
  ["U", "B", "R"],
  ["D", "F", "R"],
  ["D", "L", "F"],
  ["D", "B", "L"],
  ["D", "R", "B"],
];

const EDGE_FACELETS: ReadonlyArray<readonly [number, number]> = [
  [FACE_OFFSETS.U + 7, FACE_OFFSETS.F + 1], // 0: UF
  [FACE_OFFSETS.U + 3, FACE_OFFSETS.L + 1], // 1: UL
  [FACE_OFFSETS.U + 1, FACE_OFFSETS.B + 1], // 2: UB
  [FACE_OFFSETS.U + 5, FACE_OFFSETS.R + 1], // 3: UR
  [FACE_OFFSETS.D + 1, FACE_OFFSETS.F + 7], // 4: DF
  [FACE_OFFSETS.D + 3, FACE_OFFSETS.L + 7], // 5: DL
  [FACE_OFFSETS.D + 7, FACE_OFFSETS.B + 7], // 6: DB
  [FACE_OFFSETS.D + 5, FACE_OFFSETS.R + 7], // 7: DR
  [FACE_OFFSETS.F + 5, FACE_OFFSETS.R + 3], // 8: FR
  [FACE_OFFSETS.F + 3, FACE_OFFSETS.L + 5], // 9: FL
  [FACE_OFFSETS.B + 5, FACE_OFFSETS.L + 3], // 10: BL
  [FACE_OFFSETS.B + 3, FACE_OFFSETS.R + 5], // 11: BR
];

const EDGE_COLORS: ReadonlyArray<readonly [FaceletCode, FaceletCode]> = [
  ["U", "F"],
  ["U", "L"],
  ["U", "B"],
  ["U", "R"],
  ["D", "F"],
  ["D", "L"],
  ["D", "B"],
  ["D", "R"],
  ["F", "R"],
  ["F", "L"],
  ["B", "L"],
  ["B", "R"],
];

const COLOR_LABEL_ES: Record<FaceletCode, string> = {
  U: "Blanco (U)",
  R: "Rojo (R)",
  F: "Verde (F)",
  D: "Amarillo (D)",
  L: "Naranja (L)",
  B: "Azul (B)",
};

/**
 * Validates any 54-sticker 3x3x3 physical cube state and computes its exact
 * setup generator and step-by-step solution in < 5ms.
 */
class RealCubeSolver {
  private static moveTables: Record<string, CubieState> | null = null;
  private static all18Macros: MacroMove[] | null = null;
  private static stage2Macros: MacroMove[] | null = null;
  private static stage3Macros: MacroMove[] | null = null;
  private static stage4aMacros: MacroMove[] | null = null;
  private static stage4bMacros: MacroMove[] | null = null;
  private static stage4cMacros: MacroMove[] | null = null;
  private static stage4dMacros: MacroMove[] | null = null;

  public static createSolvedCubie(): CubieState {
    return {
      cp: [0, 1, 2, 3, 4, 5, 6, 7],
      co: [0, 0, 0, 0, 0, 0, 0, 0],
      ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  public static cloneCubie(s: CubieState): CubieState {
    return {
      cp: s.cp.slice(),
      co: s.co.slice(),
      ep: s.ep.slice(),
      eo: s.eo.slice(),
    };
  }

  public static getSolvedFacelets(): string {
    return "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
  }

  /**
   * Accepts 54 characters in standard U/R/F/D/L/B or color aliases (W/R/G/Y/O/B or V/A/N/Z)
   */
  public static normalizeStateString(raw: string): string {
    const stripped = raw.replace(/\s+/g, "").toUpperCase();
    const aliasMap: Record<string, FaceletCode> = {
      U: "U",
      W: "U", // White
      R: "R", // Red / Rojo
      F: "F",
      G: "F", // Green
      V: "F", // Verde
      D: "D",
      Y: "D", // Yellow
      A: "D", // Amarillo
      L: "L",
      O: "L", // Orange
      N: "L", // Naranja
      B: "B",
      Z: "B", // aZul
    };
    return stripped
      .split("")
      .map((ch) => aliasMap[ch] ?? ch)
      .join("");
  }

  public static cubieToFacelets(s: CubieState): string {
    const f: FaceletCode[] = new Array(54).fill("U");
    f[FACE_OFFSETS.U + 4] = "U";
    f[FACE_OFFSETS.R + 4] = "R";
    f[FACE_OFFSETS.F + 4] = "F";
    f[FACE_OFFSETS.D + 4] = "D";
    f[FACE_OFFSETS.L + 4] = "L";
    f[FACE_OFFSETS.B + 4] = "B";

    for (let i = 0; i < 8; i++) {
      const piece = s.cp[i];
      const ori = s.co[i];
      for (let k = 0; k < 3; k++) {
        f[CORNER_FACELETS[i][(k + ori) % 3]] = CORNER_COLORS[piece][k];
      }
    }
    for (let i = 0; i < 12; i++) {
      const piece = s.ep[i];
      const ori = s.eo[i];
      for (let k = 0; k < 2; k++) {
        f[EDGE_FACELETS[i][(k + ori) % 2]] = EDGE_COLORS[piece][k];
      }
    }
    return f.join("");
  }

  public static parseAndValidateFacelets(faceletStr: string): {
    valid: boolean;
    error?: string;
    state?: CubieState;
  } {
    if (!faceletStr || faceletStr.length !== 54) {
      return {
        valid: false,
        error: `El mapa de colores debe tener 54 casillas (actual: ${faceletStr.length}).`,
      };
    }

    const counts: Record<FaceletCode, number> = {
      U: 0,
      R: 0,
      F: 0,
      D: 0,
      L: 0,
      B: 0,
    };
    for (const ch of faceletStr) {
      if (!(ch in counts)) {
        return { valid: false, error: `Código de color desconocido: "${ch}".` };
      }
      counts[ch as FaceletCode]++;
    }

    const wrongCounts = (Object.keys(counts) as FaceletCode[]).filter(
      (k) => counts[k] !== 9
    );
    if (wrongCounts.length > 0) {
      const detail = wrongCounts
        .map((k) => `${COLOR_LABEL_ES[k]}: ${counts[k]}/9`)
        .join(", ");
      return {
        valid: false,
        error: `Cada color debe tener exactamente 9 casillas (${detail}).`,
      };
    }

    const cp = new Array<number>(8).fill(-1);
    const co = new Array<number>(8).fill(0);
    const usedCorners = new Set<number>();

    for (let i = 0; i < 8; i++) {
      const [f0, f1, f2] = CORNER_FACELETS[i].map(
        (idx) => faceletStr[idx] as FaceletCode
      );
      let found = -1;
      let foundOri = 0;
      for (let p = 0; p < 8; p++) {
        const [c0, c1, c2] = CORNER_COLORS[p];
        if (f0 === c0 && f1 === c1 && f2 === c2) {
          found = p;
          foundOri = 0;
          break;
        }
        if (f1 === c0 && f2 === c1 && f0 === c2) {
          found = p;
          foundOri = 1;
          break;
        }
        if (f2 === c0 && f0 === c1 && f1 === c2) {
          found = p;
          foundOri = 2;
          break;
        }
      }
      if (found === -1) {
        return {
          valid: false,
          error: `Esquina imposible (${f0}-${f1}-${f2}): esos 3 colores no forman una esquina real.`,
        };
      }
      if (usedCorners.has(found)) {
        return {
          valid: false,
          error: `La esquina ${CORNER_COLORS[found].join("-")} está repetida dos veces.`,
        };
      }
      usedCorners.add(found);
      cp[i] = found;
      co[i] = foundOri;
    }

    const ep = new Array<number>(12).fill(-1);
    const eo = new Array<number>(12).fill(0);
    const usedEdges = new Set<number>();

    for (let i = 0; i < 12; i++) {
      const [f0, f1] = EDGE_FACELETS[i].map(
        (idx) => faceletStr[idx] as FaceletCode
      );
      let found = -1;
      let foundOri = 0;
      for (let p = 0; p < 12; p++) {
        const [c0, c1] = EDGE_COLORS[p];
        if (f0 === c0 && f1 === c1) {
          found = p;
          foundOri = 0;
          break;
        }
        if (f1 === c0 && f0 === c1) {
          found = p;
          foundOri = 1;
          break;
        }
      }
      if (found === -1) {
        return {
          valid: false,
          error: `Arista imposible (${f0}-${f1}): esos 2 colores son opuestos o iguales.`,
        };
      }
      if (usedEdges.has(found)) {
        return {
          valid: false,
          error: `La arista ${EDGE_COLORS[found].join("-")} está repetida dos veces.`,
        };
      }
      usedEdges.add(found);
      ep[i] = found;
      eo[i] = foundOri;
    }

    const coSum = co.reduce((a, b) => a + b, 0);
    if (coSum % 3 !== 0) {
      return {
        valid: false,
        error:
          "Esquina físicamente girada en el lugar: revisa la orientación de las esquinas de tu cubo real.",
      };
    }

    const eoSum = eo.reduce((a, b) => a + b, 0);
    if (eoSum % 2 !== 0) {
      return {
        valid: false,
        error:
          "Arista físicamente invertida: hay una arista volteada individualmente.",
      };
    }

    const parity = (arr: number[]) => {
      let inv = 0;
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] > arr[j]) inv++;
        }
      }
      return inv % 2;
    };

    if (parity(cp) !== parity(ep)) {
      return {
        valid: false,
        error:
          "Paridad física imposible: hay dos piezas intercambiadas individualmente en el cubo.",
      };
    }

    return { valid: true, state: { cp, co, ep, eo } };
  }

  private static rotateFaceCW(f: string[], offset: number): void {
    const tmp = f.slice();
    f[offset + 0] = tmp[offset + 6];
    f[offset + 1] = tmp[offset + 3];
    f[offset + 2] = tmp[offset + 0];
    f[offset + 3] = tmp[offset + 7];
    f[offset + 4] = tmp[offset + 4];
    f[offset + 5] = tmp[offset + 1];
    f[offset + 6] = tmp[offset + 8];
    f[offset + 7] = tmp[offset + 5];
    f[offset + 8] = tmp[offset + 2];
  }

  private static cycle4(
    f: string[],
    a: number[],
    b: number[],
    c: number[],
    d: number[]
  ): void {
    const tmp = a.map((i) => f[i]);
    for (let k = 0; k < a.length; k++) f[a[k]] = f[d[k]];
    for (let k = 0; k < a.length; k++) f[d[k]] = f[c[k]];
    for (let k = 0; k < a.length; k++) f[c[k]] = f[b[k]];
    for (let k = 0; k < a.length; k++) f[b[k]] = tmp[k];
  }

  private static applyBasicMoveToFacelets(
    faceletStr: string,
    moveChar: FaceletCode
  ): string {
    const f = faceletStr.split("");
    const { U, R, F, D, L, B } = FACE_OFFSETS;
    if (moveChar === "U") {
      this.rotateFaceCW(f, U);
      this.cycle4(
        f,
        [F + 0, F + 1, F + 2],
        [L + 0, L + 1, L + 2],
        [B + 0, B + 1, B + 2],
        [R + 0, R + 1, R + 2]
      );
    } else if (moveChar === "D") {
      this.rotateFaceCW(f, D);
      this.cycle4(
        f,
        [F + 6, F + 7, F + 8],
        [R + 6, R + 7, R + 8],
        [B + 6, B + 7, B + 8],
        [L + 6, L + 7, L + 8]
      );
    } else if (moveChar === "R") {
      this.rotateFaceCW(f, R);
      this.cycle4(
        f,
        [U + 8, U + 5, U + 2],
        [B + 0, B + 3, B + 6],
        [D + 8, D + 5, D + 2],
        [F + 8, F + 5, F + 2]
      );
    } else if (moveChar === "L") {
      this.rotateFaceCW(f, L);
      this.cycle4(
        f,
        [U + 0, U + 3, U + 6],
        [F + 0, F + 3, F + 6],
        [D + 0, D + 3, D + 6],
        [B + 8, B + 5, B + 2]
      );
    } else if (moveChar === "F") {
      this.rotateFaceCW(f, F);
      this.cycle4(
        f,
        [U + 6, U + 7, U + 8],
        [R + 0, R + 3, R + 6],
        [D + 2, D + 1, D + 0],
        [L + 8, L + 5, L + 2]
      );
    } else if (moveChar === "B") {
      this.rotateFaceCW(f, B);
      this.cycle4(
        f,
        [U + 2, U + 1, U + 0],
        [L + 0, L + 3, L + 6],
        [D + 6, D + 7, D + 8],
        [R + 8, R + 5, R + 2]
      );
    }
    return f.join("");
  }

  private static ensureInitialized(): void {
    if (this.moveTables) return;

    this.moveTables = {};
    const faces: FaceletCode[] = ["U", "R", "F", "D", "L", "B"];
    const solvedStr = this.getSolvedFacelets();

    for (const face of faces) {
      let f = solvedStr;
      for (let pow = 1; pow <= 3; pow++) {
        f = this.applyBasicMoveToFacelets(f, face);
        const name = pow === 1 ? face : pow === 2 ? `${face}2` : `${face}'`;
        const parsed = this.parseAndValidateFacelets(f);
        if (parsed.state) {
          this.moveTables[name] = parsed.state;
        }
      }
    }

    const buildMacro = (alg: string): MacroMove => ({
      alg,
      trans: this.applyAlgToCubie(this.createSolvedCubie(), alg),
    });

    const z2Conj = (algStr: string): string => {
      const mapFace: Record<string, string> = {
        U: "D",
        D: "U",
        R: "L",
        L: "R",
        F: "F",
        B: "B",
      };
      return algStr
        .trim()
        .split(/\s+/)
        .map((tok) => `${mapFace[tok[0]]}${tok.slice(1)}`)
        .join(" ");
    };

    this.all18Macros = Object.keys(this.moveTables).map(buildMacro);

    this.stage2Macros = [
      "D",
      "D'",
      "D2",
      "R' D' R",
      "R' D R",
      "R' D2 R",
      "F D F'",
      "F D' F'",
      "F D2 F'",
      "L' D' L",
      "L' D L",
      "L' D2 L",
      "B D B'",
      "B D' B'",
      "B D2 B'",
      "R D R'",
      "R D' R'",
      "F' D' F",
      "F' D F",
      "L D L'",
      "L D' L'",
      "B' D' B",
      "B' D B",
    ].map(buildMacro);

    this.stage3Macros = [
      "D",
      "D'",
      "D2",
      z2Conj("U R U' R' U' F' U F"),
      z2Conj("U' L' U L U F U' F'"),
      z2Conj("U B U' B' U' R' U R"),
      z2Conj("U' F' U F U R U' R'"),
      z2Conj("U L U' L' U' B' U B"),
      z2Conj("U' R' U R U B U' B'"),
      z2Conj("U F U' F' U' L' U L"),
      z2Conj("U' B' U B U L U' L'"),
    ].map(buildMacro);

    this.stage4aMacros = [
      "D",
      "D'",
      "D2",
      z2Conj("F R U R' U' F'"),
      z2Conj("F U R U' R' F'"),
    ].map(buildMacro);

    this.stage4bMacros = [
      "D",
      "D'",
      "D2",
      z2Conj("R U R' U R U2 R'"),
      z2Conj("R U2 R' U' R U' R'"),
    ].map(buildMacro);

    this.stage4cMacros = [
      "D",
      "D'",
      "D2",
      z2Conj("R U R' U' R' F R2 U' R' U' R U R' F'"),
    ].map(buildMacro);

    this.stage4dMacros = [
      "D",
      "D'",
      "D2",
      z2Conj("R U' R U R U R U' R' U' R2"),
      z2Conj("R2 U R U R' U' R' U' R' U R'"),
    ].map(buildMacro);
  }

  public static multiplyCubie(a: CubieState, b: CubieState): CubieState {
    const cp = new Array<number>(8);
    const co = new Array<number>(8);
    const ep = new Array<number>(12);
    const eo = new Array<number>(12);
    for (let i = 0; i < 8; i++) {
      cp[i] = a.cp[b.cp[i]];
      co[i] = (a.co[b.cp[i]] + b.co[i]) % 3;
    }
    for (let i = 0; i < 12; i++) {
      ep[i] = a.ep[b.ep[i]];
      eo[i] = (a.eo[b.ep[i]] + b.eo[i]) % 2;
    }
    return { cp, co, ep, eo };
  }

  public static applyAlgToCubie(state: CubieState, algStr: string): CubieState {
    this.ensureInitialized();
    let cur = this.cloneCubie(state);
    const tokens = algStr.trim().split(/\s+/).filter(Boolean);
    for (const t of tokens) {
      const m = this.moveTables![t];
      if (!m) {
        throw new Error(`Movimiento no soportado en mapeador 3x3: ${t}`);
      }
      cur = this.multiplyCubie(cur, m);
    }
    return cur;
  }

  public static faceletsFromAlg(algStr: string): string {
    const state = this.applyAlgToCubie(this.createSolvedCubie(), algStr);
    return this.cubieToFacelets(state);
  }

  private static bfsSolve(
    startState: CubieState,
    macros: MacroMove[],
    getKey: (s: CubieState) => string,
    isGoal: (s: CubieState) => boolean,
    maxDepth = 8
  ): string[] {
    if (isGoal(startState)) return [];
    const visited = new Set<string>([getKey(startState)]);
    const queue: Array<{ state: CubieState; path: string[] }> = [
      { state: startState, path: [] },
    ];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.path.length >= maxDepth) continue;

      for (const m of macros) {
        const next = this.multiplyCubie(current.state, m.trans);
        const k = getKey(next);
        if (visited.has(k)) continue;
        const nextPath = [...current.path, m.alg];
        if (isGoal(next)) {
          return nextPath;
        }
        visited.add(k);
        queue.push({ state: next, path: nextPath });
      }
    }
    return [];
  }

  public static simplifyAlg(algStr: string): string {
    const tokens = algStr.trim().split(/\s+/).filter(Boolean);
    const stack: Array<{ face: string; pow: number }> = [];
    const powMap: Record<string, number> = { "": 1, "2": 2, "'": 3 };
    const sufMap: Record<number, string> = { 1: "", 2: "2", 3: "'" };

    for (const t of tokens) {
      const face = t[0];
      const pow = powMap[t.slice(1)] ?? 1;
      if (stack.length > 0 && stack[stack.length - 1].face === face) {
        stack[stack.length - 1].pow = (stack[stack.length - 1].pow + pow) % 4;
        if (stack[stack.length - 1].pow === 0) {
          stack.pop();
        }
      } else {
        stack.push({ face, pow });
      }
    }
    return stack.map((s) => `${s.face}${sufMap[s.pow]}`).join(" ");
  }

  public static invertAlg(algStr: string): string {
    const tokens = algStr.trim().split(/\s+/).filter(Boolean);
    return tokens
      .reverse()
      .map((m) =>
        m.endsWith("'") ? m.slice(0, -1) : m.endsWith("2") ? m : `${m}'`
      )
      .join(" ");
  }

  public static solveCubieState(initialState: CubieState): {
    setup: string;
    solution: string;
  } {
    this.ensureInitialized();
    let cur = this.cloneCubie(initialState);
    const solutionParts: string[] = [];

    const applyStep = (stepAlgs: string[]) => {
      if (stepAlgs.length === 0) return;
      const joined = stepAlgs.join(" ");
      cur = this.applyAlgToCubie(cur, joined);
      solutionParts.push(joined);
    };

    // Stage 1: U Cross edges (0, 1, 2, 3)
    for (let targetEdge = 0; targetEdge < 4; targetEdge++) {
      applyStep(
        this.bfsSolve(
          cur,
          this.all18Macros!,
          (s) => {
            const res: string[] = [];
            for (let e = 0; e <= targetEdge; e++) {
              const idx = s.ep.indexOf(e);
              res.push(`${idx}:${s.eo[idx]}`);
            }
            return res.join("|");
          },
          (s) => {
            for (let e = 0; e <= targetEdge; e++) {
              if (s.ep[e] !== e || s.eo[e] !== 0) return false;
            }
            return true;
          },
          7
        )
      );
    }

    // Stage 2: U Corners (0, 1, 2, 3)
    for (let targetCorner = 0; targetCorner < 4; targetCorner++) {
      applyStep(
        this.bfsSolve(
          cur,
          this.stage2Macros!,
          (s) => {
            const res: string[] = [];
            for (let c = 0; c <= targetCorner; c++) {
              const idx = s.cp.indexOf(c);
              res.push(`${idx}:${s.co[idx]}`);
            }
            return res.join("|");
          },
          (s) => {
            for (let c = 0; c <= targetCorner; c++) {
              if (s.cp[c] !== c || s.co[c] !== 0) return false;
            }
            return true;
          },
          7
        )
      );
    }

    // Stage 3: Middle Layer Edges (8, 9, 10, 11)
    for (let targetEdge = 8; targetEdge <= 11; targetEdge++) {
      applyStep(
        this.bfsSolve(
          cur,
          this.stage3Macros!,
          (s) => {
            const res: string[] = [];
            for (let e = 8; e <= targetEdge; e++) {
              const idx = s.ep.indexOf(e);
              res.push(`${idx}:${s.eo[idx]}`);
            }
            return res.join("|");
          },
          (s) => {
            for (let e = 8; e <= targetEdge; e++) {
              if (s.ep[e] !== e || s.eo[e] !== 0) return false;
            }
            return true;
          },
          7
        )
      );
    }

    // Stage 4a: Orient D edges (4, 5, 6, 7)
    applyStep(
      this.bfsSolve(
        cur,
        this.stage4aMacros!,
        (s) => `${s.eo[4]}${s.eo[5]}${s.eo[6]}${s.eo[7]}`,
        (s) => s.eo[4] === 0 && s.eo[5] === 0 && s.eo[6] === 0 && s.eo[7] === 0,
        7
      )
    );

    // Stage 4b: Orient D corners (4, 5, 6, 7)
    applyStep(
      this.bfsSolve(
        cur,
        this.stage4bMacros!,
        (s) => `${s.co[4]}${s.co[5]}${s.co[6]}${s.co[7]}`,
        (s) => s.co[4] === 0 && s.co[5] === 0 && s.co[6] === 0 && s.co[7] === 0,
        8
      )
    );

    // Stage 4c: Permute D corners (4, 5, 6, 7)
    applyStep(
      this.bfsSolve(
        cur,
        this.stage4cMacros!,
        (s) => `${s.cp[4]},${s.cp[5]},${s.cp[6]},${s.cp[7]}`,
        (s) => s.cp[4] === 4 && s.cp[5] === 5 && s.cp[6] === 6 && s.cp[7] === 7,
        8
      )
    );

    // Stage 4d: Permute D edges (4, 5, 6, 7) while keeping D corners in place
    applyStep(
      this.bfsSolve(
        cur,
        this.stage4dMacros!,
        (s) => `${s.cp[4]}:${s.ep[4]},${s.ep[5]},${s.ep[6]},${s.ep[7]}`,
        (s) =>
          s.cp[4] === 4 &&
          s.ep[4] === 4 &&
          s.ep[5] === 5 &&
          s.ep[6] === 6 &&
          s.ep[7] === 7,
        10
      )
    );

    const solution = this.simplifyAlg(solutionParts.join(" "));
    const setup = this.invertAlg(solution);
    return { setup, solution };
  }
}
