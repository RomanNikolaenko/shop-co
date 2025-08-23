import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { STATIC_ROUTES } from '^core/static-routes';
import { IsCurrentRouteService } from '^services/is-current-route';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  private readonly isCurrentRouteService = inject(IsCurrentRouteService);

  protected currentRoute = this.isCurrentRouteService.currentRoute;
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected isHome = computed(
    () => this.currentRoute() === STATIC_ROUTES.HOME.RouterLink,
  );
}
