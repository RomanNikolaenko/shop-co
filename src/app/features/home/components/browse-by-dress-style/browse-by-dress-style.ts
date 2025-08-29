import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BrowseByDressStyleModel } from '^interfaces/browse-by-dress-style';

@Component({
  selector: 'browse-by-dress-style',
  imports: [CommonModule, RouterLink, TranslateModule],
  standalone: true,
  templateUrl: './browse-by-dress-style.html',
  styleUrl: './browse-by-dress-style.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseByDressStyle {
  @Input({ required: true }) data!: BrowseByDressStyleModel[];
}
