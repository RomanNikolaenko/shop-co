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
import { PopupService } from '^services/popup';
import { Icon } from '^shared/components/icon/icon';
import { OtpInput } from '^shared/components/otp-input/otp-input';

import { Success } from './success/success';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    Icon,
    OtpInput,
  ],
  templateUrl: './otp.html',
  styleUrls: ['./otp.scss', '../user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class Otp {
  private readonly formBuilder = inject(FormBuilder);
  private readonly popup = inject(PopupService);
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected loading = false;
  protected otpPattern = /^\d{6}$/;
  protected isOtpTouched = false;
  protected isFormSubmitted = false;

  get containerClasses() {
    return {
      btn__disabled: this.form.invalid,
    };
  }

  protected form = this.formBuilder.nonNullable.group({
    otp: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.otpPattern),
    ]),
  });

  protected onOtpBlur() {
    this.isOtpTouched = true;
  }

  protected onSubmit() {
    this.isFormSubmitted = true;

    this.popup.open(Success);

    this.loading = true;
    console.log('✅ Form submitted:', this.form.value);
  }
}
