import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal';

const WIDTH = 320;
const HEIGHT = 200;
const R_MIN = 2.8;
const R_MAX = 4;

function bifurcationPath(): string {
  const seen = new Set<string>();
  let d = '';

  for (let step = 0; step <= 200; step++) {
    const r = R_MIN + ((R_MAX - R_MIN) * step) / 200;
    let x = 0.5;
    for (let i = 0; i < 300; i++) {
      x = r * x * (1 - x);
    }
    for (let i = 0; i < 40; i++) {
      x = r * x * (1 - x);
      const px = ((r - R_MIN) / (R_MAX - R_MIN)) * WIDTH;
      const py = (1 - x) * HEIGHT;
      const key = `${px.toFixed(1)} ${py.toFixed(1)}`;
      if (!seen.has(key)) {
        seen.add(key);
        d += `M${key}h0`;
      }
    }
  }

  return d;
}

@Component({
  selector: 'app-chaos-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [Reveal],
  template: `
    <figure>
      <svg [attr.viewBox]="viewBox" aria-hidden="true">
        <defs>
          <linearGradient id="chaos-ink" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" style="stop-color: var(--accent-2)" />
            <stop offset="100%" style="stop-color: var(--accent)" />
          </linearGradient>
        </defs>
        <path class="axis" [attr.d]="axes" />
        <path class="points" [attr.d]="path" stroke="url(#chaos-ink)" />
      </svg>
      <figcaption>
        <span>{{ name() }}</span>
        <span>{{ caption() }}</span>
      </figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }

    figure {
      display: grid;
      gap: 0.75rem;
      margin: 0;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }

    .axis {
      fill: none;
      stroke: var(--line-strong);
      stroke-width: 1;
    }

    .points {
      fill: none;
      stroke-width: 1.3;
      stroke-linecap: round;
      clip-path: inset(0 100% 0 0);
      transition: clip-path 2.4s var(--ease) 0.2s;
    }

    :host(.revealed) .points {
      clip-path: inset(0 0 0 0);
    }

    figcaption {
      display: flex;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-faint);
    }

    @media (prefers-reduced-motion: reduce) {
      .points {
        clip-path: none;
        transition: none;
      }
    }
  `,
})
export class ChaosMap {
  readonly name = input.required<string>();
  readonly caption = input.required<string>();
  readonly viewBox = `0 0 ${WIDTH} ${HEIGHT}`;
  readonly axes = `M0 0V${HEIGHT}H${WIDTH}`;
  readonly path = bifurcationPath();
}
