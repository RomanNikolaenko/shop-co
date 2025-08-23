import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { UiStateService } from '^services/ui-state';
import { dropdownAnim } from '^shared/animations/dropdown';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-search',
  imports: [RouterLink, ReactiveFormsModule, TranslateModule, Icon],
  standalone: true,
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dropdownAnim],
})
export class Search implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly uiStateService = inject(UiStateService);
  protected readonly destroyRef = inject(DestroyRef);

  protected readonly STATIC_ROUTES = STATIC_ROUTES;

  protected readonly screenWidth = this.uiStateService.screenWidthSearch;
  protected readonly showSearchResults = this.uiStateService.showSearchResults;

  protected products = [
    'iPhone 15',
    'Samsung Galaxy S24',
    'MacBook Pro',
    'iPad Air',
    'Apple Watch',
  ];

  protected filteredProducts: string[] = [];
  protected showClearButton = false;

  protected form: FormGroup = this.formBuilder.group({
    query: ['', [Validators.required]],
  });

  private get queryControl() {
    return this.form.get('query');
  }

  constructor() {
    this.queryControl?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const query = (value ?? '').trim();

        this.showClearButton = query.length > 0;
        this.uiStateService.setQuery(query);

        this.filteredProducts = this.products.filter((product) =>
          product.toLowerCase().includes(query.toLowerCase()),
        );
      });
  }

  ngOnInit() {
    this.uiStateService.registerResetForm(() => {
      this.form.reset();
      this.showClearButton = false;
      this.filteredProducts = [];
    });

    this.uiStateService.setQuery('');
  }

  protected onBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('search')) {
      this.uiStateService.closeSearch();
    }
  }

  protected clearQuery(): void {
    this.queryControl?.setValue('');
  }

  protected onSubmit(): void {
    const value = this.form.value.query;
    console.log('🔍 Search submitted:', value);
  }
}
