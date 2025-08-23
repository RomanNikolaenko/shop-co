import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-company',
  imports: [TranslateModule],
  templateUrl: './company.html',
  styleUrl: './company.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Company {}
