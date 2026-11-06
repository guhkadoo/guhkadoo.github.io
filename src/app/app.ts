import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import {
  education,
  experience,
  extras,
  person,
  profile,
  projects,
  skillGroups,
} from './content';
import { Planet } from './planet';
import { StellarObject } from './stellar-object';
import { StellarSky } from './stellar-sky';
import { ThemeService } from './theme';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StellarSky, StellarObject, Planet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class App {
  readonly theme = inject(ThemeService);
  readonly person = person;
  readonly profile = profile;
  readonly education = education;
  readonly experience = experience;
  readonly projects = projects;
  readonly skillGroups = skillGroups;
  readonly extras = extras;

  readonly menuOpen = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Keep in sync with the mobile breakpoint in app.css.
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
