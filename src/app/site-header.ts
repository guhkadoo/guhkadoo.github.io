import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { Lang, LanguageService } from './i18n';
import { StellarObject } from './stellar-object';

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StellarObject],
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
  template: `
    @let t = i18n.t().nav;
    <header class="site-header">
      <div class="inner page">
        <a class="brand" href="#inicio" [attr.aria-label]="t.home" (click)="closeMenu()">
          <span class="wordmark">kadooka<span class="dot">.</span></span>
          <span class="role">{{ t.role }}</span>
        </a>
        <button
          type="button"
          class="menu-toggle"
          aria-controls="site-nav"
          [attr.aria-expanded]="menuOpen()"
          [attr.aria-label]="menuOpen() ? t.closeMenu : t.openMenu"
          (click)="toggleMenu()"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
        <nav id="site-nav" [attr.aria-label]="t.sections" [class.open]="menuOpen()">
          <a href="#sobre" (click)="closeMenu()">{{ t.about }}</a>
          <a href="#experiencia" (click)="closeMenu()">{{ t.experience }}</a>
          <a href="#projetos" (click)="closeMenu()">{{ t.projects }}</a>
          <a href="#habilidades" (click)="closeMenu()">{{ t.skills }}</a>
          <a class="nav-contact" href="#contato" (click)="closeMenu()">{{ t.contact }}</a>
        </nav>
        <a class="talk" href="#contato">
          {{ t.talk }}
          <span class="talk-icon" aria-hidden="true">↗</span>
        </a>
        <div class="lang" role="group" [attr.aria-label]="t.language">
          @for (option of langs; track option.code) {
            <button
              type="button"
              [attr.aria-pressed]="i18n.lang() === option.code"
              [attr.aria-label]="option.label"
              (click)="i18n.set(option.code)"
            >
              {{ option.short }}
            </button>
          }
        </div>
        <app-stellar-object variant="nav" />
      </div>
    </header>
  `,
  styles: `
    .site-header {
      position: fixed;
      inset: 0 0 auto;
      z-index: 8;
      background: color-mix(in srgb, var(--bg) 80%, transparent);
      backdrop-filter: blur(18px) saturate(1.2);
      border-bottom: 1px solid var(--line);
    }

    .inner {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      min-height: 4.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 1.1rem;
      margin-right: auto;
      text-decoration: none;
      color: var(--ink);
    }

    .wordmark {
      font-family: var(--display);
      font-size: 1.45rem;
      font-weight: 500;
      letter-spacing: -0.04em;
    }

    .dot {
      color: var(--accent);
    }

    .role {
      max-width: 7rem;
      font-family: var(--mono);
      font-size: 0.62rem;
      line-height: 1.35;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ink-faint);
    }

    nav {
      display: flex;
      gap: 1.6rem;
    }

    nav a {
      position: relative;
      padding-block: 0.3rem;
      font-size: 0.88rem;
      text-decoration: none;
      color: var(--ink-soft);
      transition: color 0.25s ease;
    }

    nav a::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 1px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s var(--ease);
    }

    nav a:hover {
      color: var(--ink);
    }

    nav a:hover::after {
      transform: scaleX(1);
    }

    .nav-contact {
      display: none;
    }

    .talk {
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      margin-left: 0.6rem;
      font-size: 0.88rem;
      font-weight: 600;
      text-decoration: none;
      color: var(--ink);
    }

    .talk-icon {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      border: 1px solid var(--line-strong);
      border-radius: 50%;
      transition:
        background-color 0.3s ease,
        color 0.3s ease,
        border-color 0.3s ease;
    }

    .talk:hover .talk-icon {
      border-color: var(--accent);
      background: var(--accent);
      color: var(--on-accent);
    }

    .lang {
      display: flex;
      padding: 0.2rem;
      border: 1px solid var(--line);
      border-radius: 999px;
    }

    .lang button {
      min-width: 2.1rem;
      height: 2.1rem;
      padding: 0;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--ink-faint);
      font-family: var(--mono);
      font-size: 0.7rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .lang button[aria-pressed='true'] {
      background: var(--ink);
      color: var(--bg);
    }

    .menu-toggle {
      display: none;
      order: 1;
      place-content: center;
      gap: 0.4rem;
      width: 2.75rem;
      height: 2.75rem;
      padding: 0;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: color-mix(in srgb, var(--bg-elev) 70%, transparent);
      color: var(--ink);
      cursor: pointer;
    }

    .menu-toggle span {
      display: block;
      width: 1.1rem;
      height: 1.5px;
      border-radius: 1px;
      background: currentColor;
      transition: transform 0.35s var(--ease);
    }

    .menu-toggle[aria-expanded='true'] span:first-child {
      transform: translateY(calc(0.2rem + 0.75px)) rotate(45deg);
    }

    .menu-toggle[aria-expanded='true'] span:last-child {
      transform: translateY(calc(-0.2rem - 0.75px)) rotate(-45deg);
    }

    @media (max-width: 1040px) {
      .role,
      .talk {
        display: none;
      }

      .nav-contact {
        display: inline;
      }
    }

    @media (max-width: 860px) {
      .inner {
        gap: 0.6rem;
      }

      .menu-toggle {
        display: grid;
      }

      nav {
        position: absolute;
        inset: 100% 0 auto;
        flex-direction: column;
        gap: 0;
        padding: 0.5rem 1.25rem 1.25rem;
        background: color-mix(in srgb, var(--bg) 96%, transparent);
        border-bottom: 1px solid var(--line);
        box-shadow: 0 24px 40px -24px rgb(0 0 0 / 0.35);
        visibility: hidden;
        opacity: 0;
        transform: translateY(-0.5rem);
        transition:
          opacity 0.3s ease,
          transform 0.35s var(--ease),
          visibility 0s linear 0.35s;
      }

      nav.open {
        visibility: visible;
        opacity: 1;
        transform: none;
        transition:
          opacity 0.3s ease,
          transform 0.35s var(--ease);
      }

      nav a {
        padding-block: 0.95rem;
        border-bottom: 1px solid var(--line);
        font-family: var(--display);
        font-size: 1.35rem;
        letter-spacing: -0.01em;
        color: var(--ink);
      }

      nav a:last-child {
        border-bottom: 0;
      }

      nav a::after {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      nav,
      nav.open,
      nav a::after,
      .menu-toggle span {
        transition: none;
      }
    }
  `,
})
export class SiteHeader {
  readonly i18n = inject(LanguageService);
  readonly menuOpen = signal(false);
  readonly langs: { code: Lang; short: string; label: string }[] = [
    { code: 'pt', short: 'PT', label: 'Português' },
    { code: 'en', short: 'EN', label: 'English' },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Keep in sync with the mobile breakpoint below.
      const desktop = window.matchMedia('(min-width: 861px)');
      const onChange = () => desktop.matches && this.closeMenu();
      desktop.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => desktop.removeEventListener('change', onChange));
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
