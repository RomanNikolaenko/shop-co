import { isPlatformBrowser } from '@angular/common';
import { ElementRef, Injectable, inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private duration = 2000;

  startCountingWhenVisible(container: ElementRef, destroyRef: DestroyRef, selector?: string, threshold = 0.5): void {
    if (!this.isBrowser) return;

    const start$: Observable<unknown> =
      document.readyState === 'complete' ? of(null) : fromEvent(window, 'load').pipe(take(1), takeUntilDestroyed(destroyRef));

    start$.subscribe({
      next: () => {
        const el = container.nativeElement;
        const cssSelector = selector ?? '.stats__count';

        if (typeof IntersectionObserver === 'undefined') {
          el.querySelectorAll(cssSelector).forEach((counterEl: HTMLElement) => {
            const target = parseInt(counterEl.dataset['target'] || '0', 10);
            counterEl.textContent = this.formatNumber(target) + '+';
          });
          return;
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              this.animateCounters(el.querySelectorAll(cssSelector));
              observer.disconnect();
            }
          },
          { threshold },
        );

        el.querySelectorAll(selector).forEach((counterEl: HTMLElement) => {
          observer.observe(counterEl);
        });
      },
    });
  }

  private animateCounters(counters: NodeListOf<HTMLElement>) {
    const startTime = performance.now();

    counters.forEach((counterEl) => {
      const target = parseInt(counterEl.dataset['target'] || '0', 10);
      this.animateValue(counterEl, target, startTime);
    });
  }

  private animateValue(el: HTMLElement, target: number, startTime: number): void {
    const formatter = new Intl.NumberFormat('ru-RU', { useGrouping: true });

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const currentValue = Math.floor(progress * target);
      el.textContent = formatter.format(currentValue) + '+';

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatter.format(target) + '+';
      }
    };

    requestAnimationFrame(step);
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat('ru-RU', { useGrouping: true }).format(value);
  }
}
