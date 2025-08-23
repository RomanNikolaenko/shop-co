import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-copyright',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './copyright.html',
  styleUrl: './copyright.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Copyright {
  protected year: number = Date.now();
}
