import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SectionCopy } from './content';
import { Planet, PlanetName } from './planet';
import { Reveal } from './reveal';

@Component({
  selector: 'app-section-head',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Planet, Reveal],
  host: { '[class]': 'layout()' },
  template: `
    <div class="rule" appReveal>
      <p class="mono-label"><span class="index">{{ index() }}</span> / {{ copy().label }}</p>
      <p class="mono-label aside">{{ copy().aside }}</p>
    </div>
    <div class="main">
      <h2 appReveal>
        <span class="line">{{ copy().titleA }}</span>
        <span class="line muted">{{ titleB().text }}<span class="mark">{{ titleB().mark }}</span></span>
      </h2>
      <div class="side" [appReveal]="120">
        @if (copy().intro) {
          <p class="intro">{{ copy().intro }}</p>
        }
        <app-planet [name]="planet()" />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }

    .rule {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.5rem 1rem;
      padding-top: 1.1rem;
      margin-bottom: clamp(1.8rem, 4vw, 3rem);
    }

    .rule::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 1px;
      background: linear-gradient(90deg, var(--accent), var(--line) 30%, var(--line));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 1.2s var(--ease) 0.15s;
    }

    .rule.revealed::before {
      transform: none;
    }

    .index {
      color: var(--accent);
    }

    .main {
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
      align-items: end;
      gap: 1.5rem 3rem;
    }

    h2 {
      display: grid;
      font-size: clamp(2.3rem, 5.6vw, 4.4rem);
      line-height: 1;
      letter-spacing: -0.035em;
    }

    .muted {
      color: var(--ink-faint);
    }

    .mark {
      color: var(--accent);
    }

    .side {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .intro {
      max-width: 22rem;
      margin: 0;
      color: var(--ink-soft);
      line-height: 1.6;
    }

    app-planet {
      margin-left: auto;
    }

    :host(.stack) .main {
      grid-template-columns: 1fr;
    }

    :host(.stack) .side {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    :host(.stack) app-planet {
      margin-left: 0;
    }

    @media (max-width: 860px) {
      .main {
        grid-template-columns: 1fr;
      }

      .aside {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .rule::before {
        transition: none;
      }
    }
  `,
})
export class SectionHead {
  readonly index = input.required<string>();
  readonly copy = input.required<SectionCopy>();
  readonly planet = input.required<PlanetName>();
  readonly layout = input<'split' | 'stack'>('split');

  readonly titleB = computed(() => {
    const title = this.copy().titleB;
    const last = title.slice(-1);
    return /[.?!]/.test(last)
      ? { text: title.slice(0, -1), mark: last }
      : { text: title, mark: '' };
  });
}
