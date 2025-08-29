import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { CounterService } from '^services/counter';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit {
  private readonly counterService = inject(CounterService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('statsBlock') statsBlock!: ElementRef;
  
  protected STATIC_ROUTES = STATIC_ROUTES;

  ngAfterViewInit(): void {
    this.counterService.startCountingWhenVisible(this.statsBlock, this.destroyRef, '.stats__count');
  }
}
