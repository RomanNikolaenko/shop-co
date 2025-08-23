import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsCurrentRouteService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentRoute = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute.set(event.urlAfterRedirects);
        }
      });
  }

  public isCurrentRoute(route: string): boolean {
    return this.currentRoute() === route;
  }
}
