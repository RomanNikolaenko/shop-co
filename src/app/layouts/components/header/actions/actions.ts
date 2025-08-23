import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fromEvent, startWith, map } from 'rxjs';

import { STATIC_ROUTES } from '^core/static-routes';
import { IsCurrentRouteService } from '^services/is-current-route';
import { UiStateService } from '^services/ui-state';
import { Icon } from '^shared/components/icon/icon';
import { SelectLangs } from '^shared/components/select-langs/select-langs';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [RouterModule, RouterLink, Icon, TranslateModule, SelectLangs],
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Actions implements OnInit {
  private readonly uiStateService = inject(UiStateService);
  private readonly isCurrentRouteService = inject(IsCurrentRouteService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected currentRoute = this.isCurrentRouteService.currentRoute;
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected showLangSelect = signal(true);
  protected showBreakpoint = 450;

  protected isCart = computed(
    () => this.currentRoute() === STATIC_ROUTES.SHOP.CH.CART.RouterLink,
  );

  get showFormSearch() {
    return this.uiStateService.showFormSearch;
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    fromEvent(window, 'resize')
      .pipe(
        startWith(null),
        map(() => window.innerWidth < this.showBreakpoint),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.showLangSelect.set(value);
      });
  }

  protected toggleSearch() {
    this.uiStateService.toggleSearch();
  }
}
