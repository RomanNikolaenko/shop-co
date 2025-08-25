import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'form-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, Icon],
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormField),
      multi: true,
    },
  ],
})
export class FormField implements ControlValueAccessor {
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) label!: string;
  @Input({ required: true }) data!: AbstractControl;
  @Input({ required: true }) name!: string;
  @Input() typeInput: string = 'input';
  @Input() validation: boolean = true;
  @Input() hint!: string;
  @Input() type: string = 'text';
  @Input() showAllErrors: boolean = true;

  protected value: string | number = '';
  protected typeInputPswrd: boolean = true;

  get containerClasses() {
    return {
      'label-field__active': !!this.value,
      'label-field__success': this.data.valid && this.validation,
      'label-field__error': this.errorKeys.length,
      'label-field__padding': this.type === 'password',
    };
  }

  get errorKeys(): string[] {
    if (!this.data?.errors || !this.data.touched) {
      return [];
    }
    return Object.keys(this.data.errors);
  }

  onChange: (value: string | number) => void = () => {};
  onTouch: () => void = () => {};

  writeValue(value: string | number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  typeInputPassword(): void {
    this.typeInputPswrd = !this.typeInputPswrd;
    this.cdr.markForCheck();
  }

  getErrorMessage(key: string): string {
    const errorValue = this.data.errors?.[key];

    switch (key) {
    case 'required':
      return this.translate.instant('form.errors.required');
    case 'minlength':
      return this.translate.instant('form.errors.minlength', {
        requiredLength: errorValue.requiredLength,
        actualLength: errorValue.actualLength,
      });
    case 'maxlength':
      return this.translate.instant('form.errors.maxlength', {
        requiredLength: errorValue.requiredLength,
      });
    case 'email':
      return this.translate.instant('form.errors.email');
    case 'pattern':
      return this.translate.instant('form.errors.passwordPattern');
    case 'customServerError':
      return this.translate.instant('form.errors.customServerError', {
        message: errorValue.message,
      });
    default:
      return `${key}: ${JSON.stringify(errorValue)}`;
    }
  }
}
