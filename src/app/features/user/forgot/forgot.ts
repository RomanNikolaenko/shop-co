import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { FormField } from '^shared/components/form-field/form-field';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormField,
    TranslateModule,
    RouterLink,
    Icon,
  ],
  templateUrl: './forgot.html',
  styleUrls: ['./forgot.scss', '../user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class Forgot {
  private readonly formBuilder = inject(FormBuilder);
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected loading = false;

  get containerClasses() {
    return {
      btn__disabled: this.form.invalid || this.loading,
      btn__load: this.loading,
    };
  }

  protected form = this.formBuilder.nonNullable.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  protected onSubmit() {
    this.loading = true;
    console.log('Form submitted:', this.form.value);
  }
}
