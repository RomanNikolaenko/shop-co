import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, effect, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageService } from '^services/language';
import { LoadingService } from '^services/loading';
import { loadingAnim } from '^shared/animations/loading';
import { Loading } from '^shared/components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
  animations: [loadingAnim],
})
export class App {
  private readonly languageService = inject(LanguageService);
  private readonly loadingService = inject(LoadingService);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  protected isLoading = this.loadingService.isLoading;

  constructor() {
    if (!this.isBrowser) return;

    this.loadingService.init();

    effect(() => {
      this.languageService.langInit();
    });
  }
}
