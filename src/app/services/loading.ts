import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, NavigationEnd, Event, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public isLoading = signal(true);
  public isHydrated = signal(false);

  public init(): void {
    queueMicrotask(() => {
      this.isLoading.set(true);
    });

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }

      if (event instanceof NavigationEnd) {
        this.isLoading.set(false);
      }
    });
  }
}
