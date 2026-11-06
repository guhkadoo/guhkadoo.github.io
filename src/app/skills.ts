import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { coreSkills } from './content';
import { LanguageService } from './i18n';
import { Reveal } from './reveal';
import { SectionHead } from './section-head';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHead, Reveal],
  template: `
    @let s = i18n.t().skills;
    <section id="habilidades" class="section page">
      <app-section-head index="04" [copy]="s" planet="mars" />
      <div class="table">
        @for (group of s.groups; track group.label; let i = $index) {
          <div class="row" appReveal>
            <div class="row-head">
              <span class="mono-label num">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <div>
                <h3>{{ group.label }}</h3>
                <p>{{ group.note }}</p>
              </div>
            </div>
            <ul class="items">
              @for (item of group.items; track item) {
                <li [class.core]="coreSkills.has(item)">{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>
      <p class="legend" appReveal><span class="swatch" aria-hidden="true"></span>{{ s.legend }}</p>
      <div class="extras" appReveal>
        <h3 class="mono-label">{{ s.extrasTitle }}</h3>
        <ul class="dot-list">
          @for (item of s.extras; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .section {
      padding-block: clamp(4.5rem, 9vw, 7.5rem);
      scroll-margin-top: 4.5rem;
    }

    .row {
      display: grid;
      grid-template-columns: minmax(14rem, 0.8fr) minmax(0, 2fr);
      gap: 1rem 2.5rem;
      padding-block: 1.5rem;
      border-top: 1px solid var(--line);
    }

    .row:last-child {
      border-bottom: 1px solid var(--line);
    }

    .row-head {
      display: flex;
      gap: 1rem;
    }

    .num {
      padding-top: 0.35rem;
      color: var(--accent);
    }

    h3 {
      font-size: 1.3rem;
    }

    .row-head p {
      margin: 0.25rem 0 0;
      font-size: 0.85rem;
      color: var(--ink-faint);
    }

    .items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
      gap: 0.5rem 1rem;
      align-content: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .items li {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding-block: 0.35rem;
      color: var(--ink-soft);
    }

    .items li::before,
    .swatch {
      content: '';
      flex-shrink: 0;
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid var(--line-strong);
      border-radius: 50%;
    }

    .items li.core {
      color: var(--ink);
      font-weight: 600;
    }

    .items li.core::before,
    .swatch {
      border-color: var(--accent);
      background: var(--accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
    }

    .legend {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.6rem;
      margin: 1rem 0 0;
      font-size: 0.85rem;
      color: var(--ink-faint);
    }

    .swatch {
      display: inline-block;
    }

    .extras {
      margin-top: 3rem;
    }

    .extras h3 {
      font-size: 0.75rem;
    }

    .extras .dot-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.6rem 2.5rem;
      margin-top: 1rem;
      color: var(--ink-soft);
    }

    @media (max-width: 860px) {
      .row,
      .extras .dot-list {
        grid-template-columns: 1fr;
      }

      .legend {
        justify-content: flex-start;
      }
    }
  `,
})
export class Skills {
  readonly i18n = inject(LanguageService);
  readonly coreSkills = coreSkills;
}
