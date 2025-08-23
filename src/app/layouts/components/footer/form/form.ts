import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { FormField } from '^shared/components/form-field/form-field';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, TranslateModule, ReactiveFormsModule, FormField],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
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
