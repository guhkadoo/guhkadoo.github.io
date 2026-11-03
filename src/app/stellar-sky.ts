import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { ThemeService } from './theme';
import { drawSky } from './remnant-draw';

@Component({
  selector: 'app-stellar-sky',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class StellarSky {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  private ctx: CanvasRenderingContext2D | null = null;
  private frame = 0;
  private width = 0;
  private height = 0;
  private pointer = { x: 0.72, y: 0.32 };
  private startedAt = 0;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });
    if (!this.ctx) {
      return;
    }

    const resize = () => this.resize(canvas);
    resize();

    const onPointer = (event: PointerEvent) => {
      this.pointer = {
        x: event.clientX / Math.max(1, window.innerWidth),
        y: event.clientY / Math.max(1, window.innerHeight),
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    this.startedAt = performance.now();
    this.frame = requestAnimationFrame(this.tick);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    });
  }

  private resize(canvas: HTMLCanvasElement): void {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = Math.floor(this.width * dpr);
    canvas.height = Math.floor(this.height * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private readonly tick = (now: number): void => {
    if (!this.ctx) {
      return;
    }

    const time = (now - this.startedAt) / 1000;
    drawSky(
      this.ctx,
      this.width,
      this.height,
      this.theme.collapse(),
      time,
      this.theme.reducedMotion(),
      this.pointer,
      window.scrollY,
    );
    this.frame = requestAnimationFrame(this.tick);
  };
}
