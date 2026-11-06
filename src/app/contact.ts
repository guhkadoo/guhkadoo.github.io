import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { person } from './content';
import { LanguageService } from './i18n';
import { Planet } from './planet';
import { Reveal } from './reveal';
import { SectionHead } from './section-head';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHead, Reveal, Planet],
  template: `
    @let c = i18n.t().contact;
    <section id="contato" class="contact">
      <div class="tone">
        <div class="page inner">
          <app-section-head index="05" [copy]="c" planet="jupiter" />
          <div class="reach" appReveal>
            <div class="channels">
              <a class="email" [href]="'mailto:' + person.email">{{ person.email }}</a>
              <ul class="links">
                <li><a [href]="person.github" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a></li>
                <li><a [href]="person.linkedin" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a></li>
                <li><a [href]="person.phoneHref">{{ c.phone }} · {{ person.phone }}</a></li>
              </ul>
            </div>
            <a class="send" [href]="'mailto:' + person.email" [attr.aria-label]="c.writeMe">
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <footer class="footer">
            <a class="wordmark" href="#inicio">kadooka<span>.</span></a>
            <p class="mono-label">{{ c.rights }}</p>
            <app-planet name="saturn" />
            <a class="mono-label to-top" href="#inicio">{{ c.toTop }} <span aria-hidden="true">↑</span></a>
          </footer>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact {
      background: var(--accent);
      scroll-margin-top: 4.5rem;
    }

    .tone {
      --ink: var(--on-accent);
      --ink-soft: color-mix(in srgb, var(--on-accent) 82%, transparent);
      --ink-faint: color-mix(in srgb, var(--on-accent) 66%, transparent);
      --line: color-mix(in srgb, var(--on-accent) 24%, transparent);
      --line-strong: color-mix(in srgb, var(--on-accent) 45%, transparent);
      --accent: var(--on-accent);
      color: var(--ink);
    }

    .inner {
      padding-top: clamp(4.5rem, 9vw, 7rem);
    }

    .reach {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 2rem;
      padding-bottom: clamp(3rem, 7vw, 5rem);
    }

    .channels {
      display: grid;
      gap: 1.4rem;
    }

    .email {
      justify-self: start;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid var(--line-strong);
      font-family: var(--display);
      font-size: clamp(1.5rem, 4vw, 2.6rem);
      letter-spacing: -0.03em;
      text-decoration: none;
      overflow-wrap: anywhere;
      transition: border-color 0.3s ease;
    }

    .email:hover {
      border-color: var(--ink);
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem 1.8rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .links a {
      font-size: 0.92rem;
      font-weight: 500;
      text-decoration: none;
      color: var(--ink-soft);
      transition: color 0.25s ease;
    }

    .links a:hover {
      color: var(--ink);
    }

    .send {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: clamp(5rem, 10vw, 7.5rem);
      aspect-ratio: 1;
      border: 1px solid var(--line-strong);
      border-radius: 50%;
      font-size: clamp(1.8rem, 3.4vw, 2.6rem);
      text-decoration: none;
      transition:
        background-color 0.35s ease,
        color 0.35s ease,
        transform 0.5s var(--ease);
    }

    .send:hover {
      background: var(--on-accent);
      color: var(--bg);
      transform: rotate(45deg);
    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem 2rem;
      padding-block: 1.6rem 2rem;
      border-top: 1px solid var(--line);
    }

    .wordmark {
      font-family: var(--display);
      font-size: 1.4rem;
      letter-spacing: -0.04em;
      text-decoration: none;
    }

    .footer app-planet {
      margin-left: auto;
    }

    .to-top {
      text-decoration: none;
    }

    .to-top:hover {
      color: var(--ink);
    }

    @media (max-width: 540px) {
      .reach {
        flex-direction: column;
        align-items: flex-start;
      }

      .footer app-planet {
        display: none;
      }
    }
  `,
})
export class Contact {
  readonly i18n = inject(LanguageService);
  readonly person = person;
}
