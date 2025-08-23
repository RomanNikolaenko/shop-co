import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Copyright } from './copyright/copyright';
import { Form } from './form/form';
import { Main } from './main/main';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [Form, Main, Copyright],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
