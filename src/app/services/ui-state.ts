import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { debounceTime, fromEvent, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(RendererFactory2).createRenderer(
    null,
    null,
  );

  private readonly router = inject(Router);

  readonly mobileBreakpointMenu = 1024;
  readonly mobileBreakpointSearch = 768;

  readonly showMenu: WritableSignal<boolean> = signal(false);
  readonly addClassMenu: WritableSignal<boolean> = signal(false);
  readonly screenWidthMenu: WritableSignal<number> = signal(
    this.isBrowser ? window.innerWidth : this.mobileBreakpointMenu,
  );

  readonly showFormSearch: WritableSignal<boolean> = signal(false);
  readonly showBtnSearch: WritableSignal<boolean> = signal(false);
  readonly searchHasFocus: WritableSignal<boolean> = signal(false);
  readonly addClassSearch: WritableSignal<boolean> = signal(false);
  readonly querySignal: WritableSignal<string> = signal('');
  readonly showSearchResults = computed(
    () => this.querySignal().trim().length > 0 && this.searchHasFocus(),
  );

  readonly screenWidthSearch: WritableSignal<number> = signal(
    this.isBrowser ? window.innerWidth : this.mobileBreakpointSearch,
  );

  private readonly previousShowForm = signal(this.showFormSearch());

  constructor() {
    if (!this.isBrowser) return;

    effect(() => {
      const shouldLock =
        (this.showMenu() &&
          this.screenWidthMenu() < this.mobileBreakpointMenu) ||
        (this.showFormSearch() &&
          this.screenWidthSearch() < this.mobileBreakpointSearch);

      this.renderer[shouldLock ? 'addClass' : 'removeClass'](
        document.body,
        'lock',
      );
    });

    effect(() => {
      const prev = this.previousShowForm();
      const curr = this.showFormSearch();
      const isMobile = this.screenWidthSearch() < this.mobileBreakpointSearch;

      if (prev && !curr && isMobile) {
        this.querySignal.set('');
      }

      this.previousShowForm.set(curr);
    });
  }

  initialize(): void {
    if (!this.isBrowser) return;
    this.updateScreenWidth(window.innerWidth);

    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (
          this.screenWidthSearch() < this.mobileBreakpointSearch &&
          event.key === 'Escape'
        ) {
          this.closeSearch();
        }
      });

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.updateScreenWidth(window.innerWidth);
      });

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (
          event instanceof NavigationStart ||
          event instanceof NavigationEnd
        ) {
          this.showMenuFn(this.screenWidthMenu());
        }
      });
  }

  updateScreenWidth(width: number): void {
    const isMobileMenu = width < this.mobileBreakpointMenu;
    const isMobileSearch = width < this.mobileBreakpointSearch;

    this.screenWidthMenu.set(width);
    this.addClassMenu.set(isMobileMenu);
    this.showMenuFn(width);

    this.screenWidthSearch.set(width);
    this.addClassSearch.set(isMobileSearch);
    this.showFormSearch.set(!isMobileSearch);
    this.showBtnSearch.set(isMobileSearch);
  }

  private showMenuFn(width: number) {
    this.showMenu.set(width >= this.mobileBreakpointMenu);
  }

  toggleMenu(): void {
    this.showMenu.update((event) => !event);

    if (this.showFormSearch()) {
      this.showFormSearch.set(false);
    }
  }

  closeMenu(): void {
    this.showMenu.set(false);
  }

  private resetFormFn: (() => void) | null = null;

  private resetForm(): void {
    if (this.resetFormFn) {
      this.querySignal.set('');
      this.resetFormFn();
    }
  }

  registerResetForm(fn: () => void): void {
    this.resetFormFn = fn;
  }

  toggleSearch(): void {
    if (this.screenWidthSearch() < this.mobileBreakpointSearch) {
      const wasOpen = this.showFormSearch();
      const nowOpen = !wasOpen;
      this.showFormSearch.set(nowOpen);

      if (!nowOpen) {
        this.resetForm();
      }

      if (this.showMenu()) {
        this.showMenu.set(false);
      }
    }
  }

  closeSearch(): void {
    this.showFormSearch.set(false);

    if (this.screenWidthSearch() < this.mobileBreakpointSearch) {
      this.resetForm();
    }
  }

  setQuery(value: string): void {
    this.querySignal.set(value);
  }
}
