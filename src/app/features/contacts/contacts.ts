import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Details } from './components/details/details';
import { Form } from './components/form/form';
import { Map } from './components/map/map';

@Component({
  selector: 'app-contacts',
  imports: [TranslateModule, Details, Form, Map],
  standalone: true,
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacts {}
