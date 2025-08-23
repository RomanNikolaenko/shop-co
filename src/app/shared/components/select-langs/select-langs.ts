import {
  Component,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from '^services/language';
import { dropdownAnim } from '^shared/animations/dropdown';

import { Icon } from '../icon/icon';

@Component({
  selector: 'select-langs',
  templateUrl: './select-langs.html',
  styleUrls: ['./select-langs.scss'],
  standalone: true,
  imports: [Icon, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dropdownAnim],
})
export class SelectLangs {
  protected readonly languageService = inject(LanguageService);

  isOpen = signal(false);
  focusedIndex = signal(0);

  readonly langs = computed(() => this.languageService.langs());

  readonly currentLang = computed(() =>
    this.langs().find((l) => l.value === this.languageService.currentLang()),
  );

  toggleDropdown() {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      const index = this.langs().findIndex(
        (l) => l.value === this.languageService.currentLang(),
      );
      this.focusedIndex.set(index > -1 ? index : 0);
    }
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  selectLang(langValue: string) {
    this.languageService.setLang(langValue);
    this.isOpen.set(false);
  }

  onKeydown(event: KeyboardEvent) {
    const langs = this.langs();
    const index = this.focusedIndex();

    if (!this.isOpen()) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.isOpen.set(true);
        this.focusedIndex.set(index >= 0 ? index : 0);
      }
      return;
    }

    switch (event.key) {
    case 'Escape':
      this.closeDropdown();
      break;
    case 'ArrowDown':
      event.preventDefault();
      this.focusedIndex.set((index + 1) % langs.length);
      break;
    case 'ArrowUp':
      event.preventDefault();
      this.focusedIndex.set((index - 1 + langs.length) % langs.length);
      break;
    case 'Enter':
      event.preventDefault();
      this.selectLang(langs[index].value);
      break;
    }
  }
}
