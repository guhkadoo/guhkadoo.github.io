import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
}
