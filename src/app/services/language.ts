import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  inject,
  signal,
  WritableSignal,
  effect,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '^environments/environment';
import { LangsModel } from '^interfaces/langs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  static readonly langKey = environment.languageKey;

  readonly langs: WritableSignal<LangsModel[]> = signal([]);
  readonly currentLang: WritableSignal<string> = signal(this.getLang());

  constructor() {
    this.translateService
      .stream(['language.english', 'language.ukrainian'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((translations) => {
        this.langs.set([
          { value: 'en', viewValue: translations['language.english'] },
          { value: 'uk', viewValue: translations['language.ukrainian'] },
        ]);
      });

    effect(() => {
      const lang = this.currentLang();
      this.translateService.setDefaultLang('en');
      this.translateService.use(lang);

      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.lang = lang;
      }
    });
  }

  public setLang(value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LanguageService.langKey, value);
    }
    this.currentLang.set(value);
  }

  public langInit(): void {
    this.currentLang.set(this.getLang());
  }

  public getLang(): string {
    if (isPlatformBrowser(this.platformId)) {
      const language = this.langs().map(({ value }) => value);
      const langFromNavigator = navigator.language.split('-')[0];
      const includeLang = language.includes(langFromNavigator);
      const storedLang = localStorage.getItem(LanguageService.langKey);

      if (storedLang) {
        return storedLang;
      }

      if (includeLang) {
        return langFromNavigator;
      }

      return 'en';
    } else {
      return 'en';
    }
  }

  public clearLang(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(LanguageService.langKey);
    }
    this.currentLang.set('en');
  }
}
