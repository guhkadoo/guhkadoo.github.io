import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChaosMap } from './chaos-map';
import { person } from './content';
import { LanguageService } from './i18n';
import { Reveal } from './reveal';
import { SectionHead } from './section-head';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHead, Reveal, ChaosMap],
  template: `
    @let p = i18n.t().projects;
    <section id="projetos" class="section page">
      <app-section-head index="03" [copy]="p" planet="earth" />
      <div class="grid">
        @for (project of p.items; track project.title; let i = $index) {
          <article class="project" [class.featured]="project.featured" appReveal>
            <div class="cover">
              @if (project.featured) {
                <app-chaos-map class="cover-visual" [name]="p.chaosName" [caption]="p.chaosCaption" />
                <div class="overlay card">
                  <p class="mono-label">{{ p.chaosOverlayKicker }}</p>
                  <p class="overlay-title">{{ p.chaosOverlayTitle }}</p>
                </div>
              }
              <span class="cover-index mono-label">{{ (i + 1).toString().padStart(2, '0') }}</span>
            </div>
            <div class="body">
              <div class="meta mono-label">
                <span>{{ project.kicker }}</span>
                @if (project.result) {
                  <span class="award">★</span>
                }
              </div>
              <h3>{{ project.title }}</h3>
              <p class="description">{{ project.description }}</p>
              @if (project.result) {
                <p class="result">{{ project.result }}</p>
              }
              <ul class="tags">
                @for (tag of project.tags; track tag) {
                  <li>{{ tag }}</li>
                }
              </ul>
              @if (project.link) {
                <a class="btn ghost" [href]="project.link.href" target="_blank" rel="noopener">
                  {{ project.link.label }} <span class="btn-icon" aria-hidden="true">↗</span>
                </a>
              }
            </div>
          </article>
        }
      </div>
      <a class="more" [href]="person.github" target="_blank" rel="noopener" appReveal>
        <span>{{ p.more }}</span>
        <span class="more-link">{{ p.moreLink }} <span class="btn-icon" aria-hidden="true">↗</span></span>
      </a>
    </section>
  `,
  styles: `
    .section {
      padding-block: clamp(4.5rem, 9vw, 7.5rem);
      scroll-margin-top: 4.5rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 3.5rem 2rem;
    }

    .project:nth-child(even):not(.featured) {
      margin-top: 4rem;
    }

    .project.featured {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
      gap: 2rem 3rem;
      align-items: end;
    }

    .cover {
      position: relative;
      display: grid;
      place-items: center;
      aspect-ratio: 16 / 10;
      padding: clamp(1.5rem, 4vw, 3rem);
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 0.9rem;
      background:
        radial-gradient(70% 60% at 70% 30%, var(--glow), transparent 70%),
        repeating-linear-gradient(90deg, var(--line) 0 1px, transparent 1px 2.4rem),
        repeating-linear-gradient(0deg, var(--line) 0 1px, transparent 1px 2.4rem),
        var(--bg-elev);
    }

    .cover-visual {
      width: min(100%, 30rem);
    }

    .overlay {
      position: absolute;
      left: 1.2rem;
      top: 1.2rem;
      max-width: 15rem;
      padding: 1rem 1.1rem;
      border-top: 2px solid var(--accent);
      background: color-mix(in srgb, var(--bg-elev) 88%, transparent);
    }

    .overlay-title {
      margin: 0.5rem 0 0;
      font-family: var(--display);
      font-size: 1.2rem;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }

    .cover-index {
      position: absolute;
      right: 1.2rem;
      bottom: 1rem;
    }

    .body {
      display: grid;
      gap: 0.9rem;
      padding-top: 1.3rem;
    }

    .featured .body {
      padding-top: 0;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
    }

    .award {
      color: var(--accent-2);
      font-size: 0.9rem;
    }

    h3 {
      font-size: clamp(1.8rem, 3.4vw, 2.6rem);
      line-height: 1.05;
    }

    .description {
      margin: 0;
      color: var(--ink-soft);
      line-height: 1.65;
    }

    .result {
      margin: 0;
      padding-left: 0.9rem;
      border-left: 2px solid var(--accent-2);
      color: var(--ink);
      font-weight: 500;
    }

    .tags {
      margin-top: 0.3rem;
    }

    .btn.ghost {
      justify-self: start;
    }

    .more {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.8rem 2rem;
      margin-top: 3.5rem;
      padding-block: 1.6rem;
      border-block: 1px solid var(--line);
      text-decoration: none;
      color: var(--ink-soft);
    }

    .more-link {
      color: var(--ink);
      font-weight: 600;
    }

    .more:hover .more-link {
      color: var(--accent);
    }

    .more:hover .btn-icon {
      transform: translate(2px, -2px);
    }

    @media (max-width: 960px) {
      .project.featured {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .project:nth-child(even):not(.featured) {
        margin-top: 0;
      }
    }

    @media (max-width: 540px) {
      .cover {
        aspect-ratio: auto;
        padding-top: 7.5rem;
      }

      .overlay {
        right: 1.2rem;
        max-width: none;
      }

      .cover-index {
        display: none;
      }
    }
  `,
})
export class Projects {
  readonly i18n = inject(LanguageService);
  readonly person = person;
}
