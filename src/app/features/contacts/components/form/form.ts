import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormField } from '^shared/components/form-field/form-field';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormField,
    TranslateModule,
    Icon,
  ],
  standalone: true,
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  private readonly formBuilder = inject(FormBuilder);

  protected loading = false;

  get containerClasses() {
    return {
      btn__disabled:
        this.form.invalid || this.loading || !this.form.controls['terms'].value,
      btn__load: this.loading,
    };
  }

  protected form = this.formBuilder.nonNullable.group({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    message: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(40),
    ]),
    terms: new FormControl<boolean>(false, [Validators.required]),
  });

  protected onSubmit() {
    this.loading = true;
    console.log('Form submitted:', this.form.value);
  }
}
