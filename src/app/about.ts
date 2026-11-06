import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from './i18n';
import { Reveal } from './reveal';
import { SectionHead } from './section-head';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHead, Reveal],
  template: `
    @let a = i18n.t().about;
    <section id="sobre" class="section page">
      <app-section-head index="01" [copy]="a" planet="mercury" />
      <div class="grid">
        <div class="text" appReveal>
          @for (paragraph of a.text; track $index) {
            <p>{{ paragraph }}</p>
          }
        </div>
        <aside class="edu card" [appReveal]="120">
          <p class="mono-label kicker">{{ a.eduKicker }}</p>
          <p class="degree">{{ a.degree }}</p>
          <p class="campus">{{ a.campus }} · {{ a.period }}</p>
          <ul class="dot-list">
            @for (note of a.notes; track note) {
              <li>{{ note }}</li>
            }
          </ul>
        </aside>
      </div>
      <dl class="stats" appReveal>
        @for (item of a.highlights; track item.label) {
          <div>
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        }
      </dl>
    </section>
  `,
  styles: `
    .section {
      padding-block: clamp(4.5rem, 9vw, 7.5rem);
      scroll-margin-top: 4.5rem;
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(16rem, 0.8fr);
      gap: 2rem 4rem;
      align-items: start;
    }

    .text {
      display: grid;
      gap: 1.2rem;
    }

    .text p {
      margin: 0;
      font-size: clamp(1.1rem, 1.6vw, 1.3rem);
      line-height: 1.65;
      color: var(--ink-soft);
    }

    .text p:first-child {
      color: var(--ink);
    }

    .edu {
      padding: 1.5rem 1.6rem;
      color: var(--ink-soft);
      line-height: 1.6;
    }

    .kicker {
      color: var(--accent);
    }

    .degree {
      margin: 0.6rem 0 0.2rem;
      font-family: var(--display);
      font-size: 1.15rem;
      color: var(--ink);
    }

    .campus {
      margin: 0 0 1rem;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      margin: clamp(3rem, 6vw, 4.5rem) 0 0;
      border-block: 1px solid var(--line);
    }

    .stats div {
      display: flex;
      flex-direction: column-reverse;
      gap: 0.5rem;
      padding: 1.6rem 1.4rem;
    }

    .stats div + div {
      border-left: 1px solid var(--line);
    }

    .stats dd {
      margin: 0;
      font-family: var(--display);
      font-size: clamp(2.4rem, 4.6vw, 3.6rem);
      line-height: 1;
      letter-spacing: -0.04em;
      color: var(--ink);
    }

    .stats dt {
      font-family: var(--mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-faint);
    }

    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .stats div:nth-child(3) {
        border-left: 0;
      }

      .stats div:nth-child(n + 3) {
        border-top: 1px solid var(--line);
      }
    }
  `,
})
export class About {
  readonly i18n = inject(LanguageService);
}
