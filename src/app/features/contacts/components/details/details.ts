import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { startWith, switchMap } from 'rxjs';

import { ContactsDetailsModel } from '^interfaces/contacts-details';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-details',
  imports: [CommonModule, Icon],
  standalone: true,
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Details implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  protected data = signal<Array<ContactsDetailsModel>>([]);

  ngOnInit(): void {
    this.translate.onLangChange
      .pipe(
        startWith({ lang: this.translate.currentLang }),
        switchMap(() => this.translate.get(['contacts.call', 'contacts.mail', 'contacts.location'])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((translations) => {
        this.data.set([
          {
            title: translations['contacts.call'],
            link: '+1650-000-0000',
            linked: 'phone',
          },
          {
            title: translations['contacts.mail'],
            link: 'info@yourcompany.com',
            linked: 'mail',
          },
          {
            title: translations['contacts.location'],
            link: 'New York NY 2011, USA',
            linked: undefined,
          },
        ]);
      });
  }

  protected cleanPhone(phone: string): string {
    return phone.replace(/-/g, '');
  }
}
