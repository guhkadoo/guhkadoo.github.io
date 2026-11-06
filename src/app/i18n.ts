import { Injectable, computed, signal } from '@angular/core';
import { content } from './content';

export type Lang = 'pt' | 'en';

const STORAGE_KEY = 'gk-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(readInitialLang());
  readonly t = computed(() => content[this.lang()]);

  constructor() {
    applyLang(this.lang());
  }

  set(lang: Lang): void {
    if (lang === this.lang()) {
      return;
    }
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }
}

function readInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'pt' || stored === 'en') {
    return stored;
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

function applyLang(lang: Lang): void {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = content[lang].meta.title;
}
