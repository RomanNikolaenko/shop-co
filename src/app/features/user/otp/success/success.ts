import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'success',
  standalone: true,
  imports: [TranslateModule, RouterLink, Icon],
  templateUrl: './success.html',
  styleUrls: ['./success.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Success {
  protected STATIC_ROUTES = STATIC_ROUTES;
  @Input() close?: () => void;

  protected closePopup() {
    this.close?.();
  }
}
