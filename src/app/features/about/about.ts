import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Slider } from '^features/home/components/slider/slider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, Slider, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
