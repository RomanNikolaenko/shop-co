import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fromEvent, startWith, map } from 'rxjs';

import { STATIC_ROUTES } from '^core/static-routes';
import { IsCurrentRouteService } from '^services/is-current-route';
import { UiStateService } from '^services/ui-state';
import { SelectLangs } from '^shared/components/select-langs/select-langs';
import { MenuModel } from '^interfaces/menu';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, TranslateModule, SelectLangs],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  private readonly uiStateService = inject(UiStateService);
  private readonly isCurrentRouteService = inject(IsCurrentRouteService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected currentRoute = this.isCurrentRouteService.currentRoute;
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected showLangSelect = signal(true);
  protected showBreakpoint = 450;

  protected data: MenuModel[] = [
      {
        url: this.STATIC_ROUTES.ABOUT.RouterLink,
        title: 'About',
      },
      {
        url: this.STATIC_ROUTES.CONTACTS.RouterLink,
        title: 'Contacts',
      }
    ];

  ngOnInit(): void {
    if (!this.isBrowser) return;

    fromEvent(window, 'resize')
      .pipe(
        startWith(null),
        map(() => window.innerWidth > this.showBreakpoint),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.showLangSelect.set(value);
      });
  }

  protected isCurrentRoute = (path: string) => {
    return this.currentRoute() === path
  };

  protected onBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('nav')) {
      this.uiStateService.closeMenu();
    }
  }
}
