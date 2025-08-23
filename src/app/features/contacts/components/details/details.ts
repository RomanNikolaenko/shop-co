import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-details',
  imports: [CommonModule, Icon],
  standalone: true,
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Details {
  private readonly translate = inject(TranslateService);

  protected data = [
    {
      title: this.translate.instant('contacts.call'),
      link: '+1650-000-0000',
      linked: 'phone',
    },
    {
      title: this.translate.instant('contacts.mail'),
      link: 'info@yourcompany.com',
      linked: 'mail',
    },
    {
      title: this.translate.instant('contacts.location'),
      link: 'New Your NY 2011, USA',
      linked: false,
    },
  ];

  protected cleanPhone(phone: string): string {
    return phone.replace(/-/g, '');
  }
}
