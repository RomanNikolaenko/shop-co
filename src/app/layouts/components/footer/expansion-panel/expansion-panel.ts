import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Input,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { fromEvent, debounceTime, startWith, map } from 'rxjs';

import { ExpansionPanelModel } from '^interfaces/expansion-panel';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-expansion-panel',
  imports: [CommonModule, RouterLink, Icon],
  standalone: true,
  templateUrl: './expansion-panel.html',
  styleUrl: './expansion-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanel {
  readonly mobileBreakpoint = 768;

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @Input() data?: ExpansionPanelModel;
  @Input() index: number = 0;

  readonly screenWidth: WritableSignal<number> = signal(this.isBrowser ? window.innerWidth : this.mobileBreakpoint);

  readonly isMobile = computed(() => this.screenWidth() < this.mobileBreakpoint);

  readonly isOpen = signal(true);

  get containerClasses() {
    return {
      open: !this.isMobile() || this.isOpen(),
    };
  }

  constructor() {
    if (!this.isBrowser) return;

    effect(() => {
      if (!this.isMobile()) {
        this.isOpen.set(true);
      }
    });

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        startWith(null),
        map(() => window.innerWidth < this.mobileBreakpoint),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((isMobile) => {
        this.screenWidth.set(window.innerWidth);

        if (!isMobile) {
          this.isOpen.set(true);
        }
      });
  }

  toggle() {
    if (!this.isMobile()) return;
    this.isOpen.update((val) => !val);
  }
}
