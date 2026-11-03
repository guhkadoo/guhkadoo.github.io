import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

export type PlanetName =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

@Component({
  selector: 'app-planet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.visible]': 'visible()',
  },
  template: `
    <figure [class]="name()">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        @switch (name()) {
          @case ('mercury') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="32%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#e2d6c8" />
                <stop offset="55%" stop-color="#9a8b7c" />
                <stop offset="100%" stop-color="#4c433c" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="34" [attr.fill]="'url(#' + id + '-g)'" />
            <circle cx="38" cy="40" r="6" fill="#6f6358" opacity="0.45" />
            <circle cx="60" cy="58" r="8" fill="#5c524a" opacity="0.35" />
            <circle cx="48" cy="64" r="4" fill="#7a6d62" opacity="0.4" />
          }
          @case ('venus') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#fff4d4" />
                <stop offset="45%" stop-color="#e6c17a" />
                <stop offset="100%" stop-color="#a56b32" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="38" [attr.fill]="'url(#' + id + '-g)'" />
            <path
              d="M22 48c12-10 28-8 40-2 10 5 20 4 26-2"
              fill="none"
              stroke="#f7e7b8"
              stroke-width="6"
              opacity="0.35"
            />
          }
          @case ('earth') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#9fd4ff" />
                <stop offset="55%" stop-color="#2b6fb3" />
                <stop offset="100%" stop-color="#12355c" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="36" [attr.fill]="'url(#' + id + '-g)'" />
            <path d="M28 42c8-8 18-6 22 2 6 10-2 16-12 14-8-1-14-8-10-16z" fill="#3f9a5c" />
            <path d="M58 52c8-4 16 0 18 8 1 6-6 10-12 8-8-2-12-10-6-16z" fill="#4eae6c" />
            <path d="M34 64c8 2 16 0 18 6 1 5-6 8-12 6-6-1-10-8-6-12z" fill="#eef7ff" opacity="0.45" />
          }
          @case ('mars') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="32%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#f0a07a" />
                <stop offset="55%" stop-color="#c24b2c" />
                <stop offset="100%" stop-color="#6a2416" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="32" [attr.fill]="'url(#' + id + '-g)'" />
            <ellipse cx="50" cy="24" rx="10" ry="5" fill="#f4f0ea" opacity="0.7" />
            <circle cx="42" cy="48" r="7" fill="#8a3322" opacity="0.45" />
          }
          @case ('jupiter') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#f3e1c2" />
                <stop offset="60%" stop-color="#c9955a" />
                <stop offset="100%" stop-color="#6d4a28" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" [attr.fill]="'url(#' + id + '-g)'" />
            <path d="M10 38h80" stroke="#d9b07a" stroke-width="7" opacity="0.45" />
            <path d="M12 52h76" stroke="#b56a3a" stroke-width="6" opacity="0.4" />
            <path d="M14 64h72" stroke="#e8d3aa" stroke-width="5" opacity="0.35" />
            <ellipse cx="66" cy="58" rx="8" ry="5" fill="#c94a32" opacity="0.85" />
          }
          @case ('saturn') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#f3e6c4" />
                <stop offset="60%" stop-color="#d1b36a" />
                <stop offset="100%" stop-color="#8a7040" />
              </radialGradient>
            </defs>
            <ellipse
              cx="50"
              cy="52"
              rx="48"
              ry="12"
              fill="none"
              stroke="#d9c48a"
              stroke-width="5"
              opacity="0.55"
            />
            <ellipse
              cx="50"
              cy="52"
              rx="40"
              ry="9"
              fill="none"
              stroke="#b79a5c"
              stroke-width="3"
              opacity="0.45"
            />
            <circle cx="50" cy="50" r="28" [attr.fill]="'url(#' + id + '-g)'" />
          }
          @case ('uranus') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#d7f6f4" />
                <stop offset="55%" stop-color="#7ecfc9" />
                <stop offset="100%" stop-color="#2f7f84" />
              </radialGradient>
            </defs>
            <ellipse
              cx="50"
              cy="50"
              rx="42"
              ry="6"
              fill="none"
              stroke="#b7e4e0"
              stroke-width="2"
              opacity="0.5"
              transform="rotate(95 50 50)"
            />
            <circle cx="50" cy="50" r="30" [attr.fill]="'url(#' + id + '-g)'" />
          }
          @case ('neptune') {
            <defs>
              <radialGradient [attr.id]="id + '-g'" cx="34%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#9cc9ff" />
                <stop offset="55%" stop-color="#2f62d0" />
                <stop offset="100%" stop-color="#142a74" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="32" [attr.fill]="'url(#' + id + '-g)'" />
            <path
              d="M22 46c10 8 22 8 34 2 10-5 18-4 24 2"
              fill="none"
              stroke="#7fb0ff"
              stroke-width="4"
              opacity="0.4"
            />
            <ellipse cx="62" cy="58" rx="6" ry="4" fill="#1c3f9a" opacity="0.55" />
          }
        }
      </svg>
    </figure>
  `,
  styles: `
    :host {
      display: grid;
      justify-items: center;
      width: max-content;
      pointer-events: none;
      opacity: 0;
      transform: translateY(0.8rem) scale(0.88);
      transition:
        opacity 0.9s ease,
        transform 0.9s ease;
    }

    :host.visible {
      opacity: 1;
      transform: none;
    }

    figure {
      margin: 0;
      display: grid;
      justify-items: center;
      gap: 0.35rem;
      width: var(--planet-size, 4.2rem);
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }

    figcaption {
      font-size: 0.64rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .mercury {
      --planet-size: 3.1rem;
    }
    .venus {
      --planet-size: 3.7rem;
    }
    .earth {
      --planet-size: 4rem;
    }
    .mars {
      --planet-size: 3.4rem;
    }
    .jupiter {
      --planet-size: 5.6rem;
    }
    .saturn {
      --planet-size: 6.2rem;
    }
    .uranus {
      --planet-size: 4.2rem;
    }
    .neptune {
      --planet-size: 4rem;
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `,
})
export class Planet {
  readonly name = input.required<PlanetName>();
  readonly visible = signal(false);
  readonly id = `p${Math.random().toString(36).slice(2, 8)}`;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.watch());
  }

  private watch(): void {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.visible.set(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
