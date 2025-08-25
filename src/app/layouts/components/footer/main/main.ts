import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ExpansionPanelModel } from '^interfaces/expansion-panel';
import { Logo } from '^layouts/components/header/logo/logo';
import { Icon } from '^shared/components/icon/icon';

import { ExpansionPanel } from '../expansion-panel/expansion-panel';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, Logo, TranslateModule, Icon, ExpansionPanel],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {
  protected readonly array: ExpansionPanelModel[] = [
    {
      title: 'Company',
      list: ['About', 'Features', 'Works', 'Career'],
    },
    {
      title: 'Help',
      list: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
    },
    {
      title: 'FAQ',
      list: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
    },
    {
      title: 'Resources',
      list: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
    },
  ];
}
