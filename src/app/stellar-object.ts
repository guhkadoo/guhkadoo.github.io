import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { drawRemnant } from './remnant-draw';
import { ThemeService } from './theme';

@Component({
  selector: 'app-stellar-object',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure [class]="variant()">
      <button
        type="button"
        class="remnant"
        [attr.aria-label]="theme.toggleLabel()"
        [attr.aria-pressed]="theme.isDark()"
        (click)="theme.toggle()"
      >
        <canvas #canvas></canvas>
      </button>
      @if (variant() === 'hero') {
        <figcaption>
          <span>{{ theme.remnantName() }}</span>
          <span>{{ theme.remnantHint() }}</span>
        </figcaption>
      }
    </figure>
  `,
  styles: `
    :host {
      display: block;
      flex-shrink: 0;
      overflow: visible;
    }

    figure {
      margin: 0;
      display: grid;
      justify-items: center;
      gap: 0.75rem;
      overflow: visible;
    }

    .remnant {
      position: relative;
      display: grid;
      place-items: center;
      width: 100%;
      aspect-ratio: 1;
      padding: 0;
      border: 0;
      border-radius: 0;
      overflow: visible;
      background: transparent;
      cursor: pointer;
    }

    .nav {
      width: 3rem;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .remnant:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 4px;
    }

    figcaption {
      display: grid;
      gap: 0.2rem;
      text-align: center;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }
  `,
})
export class StellarObject {
  readonly variant = input<'hero' | 'nav'>('hero');
  readonly theme = inject(ThemeService);

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);
  private ctx: CanvasRenderingContext2D | null = null;
  private frame = 0;
  private size = 0;
  private startedAt = 0;
  private observer: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });
    if (!this.ctx) {
      return;
    }

    this.observer = new ResizeObserver(() => this.resize(canvas));
    this.observer.observe(canvas);
    this.resize(canvas);
    this.startedAt = performance.now();
    this.frame = requestAnimationFrame(this.tick);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frame);
      this.observer?.disconnect();
    });
  }

  private resize(canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.size = Math.max(1, rect.width);
    canvas.width = Math.floor(this.size * dpr);
    canvas.height = Math.floor(this.size * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private readonly tick = (now: number): void => {
    if (!this.ctx) {
      return;
    }

    drawRemnant(this.ctx, {
      width: this.size,
      height: this.size,
      collapse: this.theme.collapse(),
      time: (now - this.startedAt) / 1000,
      reducedMotion: this.theme.reducedMotion(),
      quality: this.variant(),
    });
    this.frame = requestAnimationFrame(this.tick);
  };
}
