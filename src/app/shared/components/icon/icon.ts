import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrls: ['./icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.ngSkipHydration]': 'true',
  },
})
export class Icon {
  readonly name = input<string>();

  private readonly http = inject(HttpClient);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const iconName = this.name();
      if (!iconName) {
        this.el.nativeElement.innerHTML = '';
        return;
      }

      const path = `assets/icons/${iconName}.svg`;

      this.http
        .get(path, { responseType: 'text' })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((err) => {
            console.error(`Error loading icon: ${path}`, err);
            this.el.nativeElement.innerHTML = '';
            return of('');
          }),
        )
        .subscribe((svg) => {
          this.el.nativeElement.innerHTML = svg;
        });
    });
  }
}
