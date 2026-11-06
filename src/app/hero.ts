import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { person } from './content';
import { LanguageService } from './i18n';
import { StellarObject } from './stellar-object';
import { ThemeService } from './theme';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StellarObject],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly i18n = inject(LanguageService);
  readonly theme = inject(ThemeService);
  readonly person = person;
  readonly ringPath = 'M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0';
}
