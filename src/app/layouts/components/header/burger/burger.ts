import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { UiStateService } from '^services/ui-state';

@Component({
  selector: 'app-burger',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './burger.html',
  styleUrl: './burger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Burger {
  private readonly uiStateService = inject(UiStateService);
  private readonly addClass = this.uiStateService.addClassMenu;

  get containerClasses() {
    return {
      active: this.showMenu() && this.addClass(),
    };
  }

  get showMenu() {
    return this.uiStateService.showMenu;
  }

  toggleMenu() {
    this.uiStateService.toggleMenu();
  }
}
