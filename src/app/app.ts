import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { About } from './about';
import { Contact } from './contact';
import { ExperienceSection } from './experience';
import { Hero } from './hero';
import { LanguageService } from './i18n';
import { Projects } from './projects';
import { SiteHeader } from './site-header';
import { Skills } from './skills';
import { StellarSky } from './stellar-sky';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StellarSky, SiteHeader, Hero, About, ExperienceSection, Projects, Skills, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly i18n = inject(LanguageService);

  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const bar = this.progress().nativeElement;
      let frame = 0;
      const update = () => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      };
      const onScroll = () => {
        if (!frame) {
          frame = requestAnimationFrame(update);
        }
      };
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }
}
