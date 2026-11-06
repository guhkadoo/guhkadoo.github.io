import { Injectable, computed, inject, signal } from '@angular/core';
import { LanguageService } from './i18n';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'gk-theme';
const TRANSITION_MS = 1250;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>('light');
  readonly collapse = signal(0);
  readonly reducedMotion = signal(false);

  private readonly i18n = inject(LanguageService);

  readonly isDark = computed(() => this.mode() === 'dark');
  readonly remnantName = computed(() => {
    const t = this.i18n.t().theme;
    return this.isDark() ? t.blackHole : t.whiteDwarf;
  });
  readonly remnantHint = computed(() => {
    const t = this.i18n.t().theme;
    return this.isDark() ? t.reigniteHint : t.collapseHint;
  });
  readonly toggleLabel = computed(() => {
    const t = this.i18n.t().theme;
    return this.isDark() ? t.toLight : t.toDark;
  });

  private frame = 0;
  private from = 0;
  private to = 0;
  private startedAt = 0;

  constructor() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion.set(reduced.matches);
    reduced.addEventListener('change', (event) => this.reducedMotion.set(event.matches));

    const initial = readInitialTheme();
    this.mode.set(initial);
    this.collapse.set(initial === 'dark' ? 1 : 0);
    applyTheme(initial);
  }

  toggle(): void {
    this.setMode(this.mode() === 'dark' ? 'light' : 'dark');
  }

  setMode(mode: ThemeMode): void {
    if (mode === this.mode()) {
      return;
    }

    this.mode.set(mode);
    applyTheme(mode);
    localStorage.setItem(STORAGE_KEY, mode);
    this.animateCollapse(mode === 'dark' ? 1 : 0);
  }

  private animateCollapse(target: number): void {
    cancelAnimationFrame(this.frame);

    if (this.reducedMotion()) {
      this.collapse.set(target);
      return;
    }

    this.from = this.collapse();
    this.to = target;
    this.startedAt = performance.now();
    this.frame = requestAnimationFrame(this.tick);
  }

  private readonly tick = (now: number): void => {
    const t = Math.min(1, (now - this.startedAt) / TRANSITION_MS);
    const eased = easeInOutCubic(t);
    this.collapse.set(this.from + (this.to - this.from) * eased);

    if (t < 1) {
      this.frame = requestAnimationFrame(this.tick);
    }
  };
}

export function readInitialTheme(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode): void {
  document.documentElement.dataset['theme'] = mode;
  document.documentElement.style.colorScheme = mode;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
