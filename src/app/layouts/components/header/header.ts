import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Search } from '^layouts/components/header/search/search';
import { UiStateService } from '^services/ui-state';

import { Actions } from './actions/actions';
import { Burger } from './burger/burger';
import { Logo } from './logo/logo';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Logo, Menu, Search, Actions, Burger],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly uiStateService = inject(UiStateService);

  protected readonly showFormSearch = this.uiStateService.showFormSearch;
  protected readonly screenWidthSearch = this.uiStateService.screenWidthSearch;
  protected readonly mobileBreakpointSearch =
    this.uiStateService.mobileBreakpointSearch;

  protected readonly addClassSearch = this.uiStateService.addClassSearch;

  protected readonly showMenu = this.uiStateService.showMenu;
  protected readonly screenWidthMenu = this.uiStateService.screenWidthMenu;
  protected readonly mobileBreakpointMenu =
    this.uiStateService.mobileBreakpointMenu;

  protected readonly addClassMenu = this.uiStateService.addClassMenu;

  get containerClassesMenu() {
    return {
      'header__menu--active':
        this.showMenu() && this.screenWidthMenu() < this.mobileBreakpointMenu,
      'header__menu--transition': this.addClassMenu(),
    };
  }

  get containerClassesSearch() {
    return {
      'header__search--active':
        this.showFormSearch() &&
        this.screenWidthSearch() < this.mobileBreakpointSearch,
      'header__search--transition': this.addClassSearch(),
    };
  }

  constructor() {
    this.uiStateService.initialize();
  }
}
