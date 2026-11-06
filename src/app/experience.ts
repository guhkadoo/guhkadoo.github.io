import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from './i18n';
import { Reveal } from './reveal';
import { SectionHead } from './section-head';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHead, Reveal],
  template: `
    @let e = i18n.t().experience;
    <section id="experiencia" class="band">
      <div class="layout page">
        <div class="head">
          <app-section-head index="02" [copy]="e" planet="venus" layout="stack" />
        </div>
        <ol class="jobs">
          @for (job of e.jobs; track job.company) {
            <li appReveal>
              <div class="meta mono-label">
                <span>{{ job.period }}</span>
                <span>{{ job.mode }} · {{ job.place }}</span>
              </div>
              <h3>{{ job.company }}</h3>
              <p class="role">{{ job.role }}</p>
              <p class="summary">{{ job.summary }}</p>
              <ul class="dot-list">
                @for (point of job.points; track point) {
                  <li>{{ point }}</li>
                }
              </ul>
              <p class="tech">{{ job.stack.join(' / ') }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .band {
      padding-block: clamp(4.5rem, 9vw, 7.5rem);
      scroll-margin-top: 4.5rem;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 2rem 5rem;
    }

    .head {
      align-self: start;
      position: sticky;
      top: 7rem;
    }

    .jobs {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .jobs > li {
      padding-block: 2.2rem;
      border-top: 1px solid var(--line);
    }

    .jobs > li:last-child {
      border-bottom: 1px solid var(--line);
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.4rem 1rem;
      font-size: 0.7rem;
    }

    .meta span:first-child {
      color: var(--accent);
    }

    h3 {
      margin-top: 1rem;
      font-size: clamp(1.7rem, 3vw, 2.3rem);
    }

    .role {
      margin: 0.35rem 0 0;
      font-weight: 500;
      color: var(--ink);
    }

    .summary {
      margin: 1.1rem 0;
      color: var(--ink-soft);
      line-height: 1.6;
    }

    .dot-list {
      color: var(--ink-soft);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .tech {
      margin: 1.3rem 0 0;
      font-family: var(--mono);
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      color: var(--ink-faint);
    }

    @media (max-width: 860px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .head {
        position: static;
      }
    }
  `,
})
export class ExperienceSection {
  readonly i18n = inject(LanguageService);
}
