import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  forwardRef,
  signal,
  computed,
  input,
  output,
  effect,
  WritableSignal,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp-input.html',
  styleUrls: ['./otp-input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInput),
      multi: true,
    },
  ],
})
export class OtpInput implements ControlValueAccessor {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly length = input(6);
  readonly showError = input(false);
  readonly blur = output<void>();

  protected readonly otp: WritableSignal<string[]> = signal([]);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get containerClasses() {
    return {
      'otp-input--error': this.showError(),
    };
  }

  constructor() {
    effect(() => {
      const len = this.length();
      this.otp.set(Array(len).fill(''));
    });
  }

  readonly otpArray = computed(() => Array(this.length()));

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    const otpValue = [...this.otp()];

    if (/^\d$/.test(val)) {
      otpValue[index] = val;
      this.otp.set(otpValue);

      if (index < this.length() - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else {
      otpValue[index] = '';
      input.value = '';
      this.otp.set(otpValue);
    }

    this.emit();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp()[index] && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  handleBlur() {
    setTimeout(() => {
      const focusedInside = this.inputs
        .toArray()
        .some((inputRef) => inputRef.nativeElement === document.activeElement);
      if (!focusedInside) {
        this.onTouched();
        this.blur.emit();
      }
    }, 0);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text')?.trim() ?? '';
    const digits = pastedText
      .replace(/\D/g, '')
      .split('')
      .slice(0, this.length());

    if (digits.length === 0) return;

    const otpValue = Array(this.length()).fill('');
    digits.forEach((digit, i) => {
      otpValue[i] = digit;
    });

    this.otp.set(otpValue);

    this.inputs.forEach((ref, i) => {
      ref.nativeElement.value = otpValue[i] || '';
    });

    this.emit();

    const firstEmpty = otpValue.findIndex((d) => d === '');
    const focusIndex = firstEmpty === -1 ? this.length() - 1 : firstEmpty;
    this.inputs.toArray()[focusIndex]?.nativeElement.focus();
  }

  writeValue(value: string): void {
    const filled = Array(this.length())
      .fill('')
      .map((_, i) => value?.[i] ?? '');
    this.otp.set(filled);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputs?.forEach((ref) => (ref.nativeElement.disabled = isDisabled));
  }

  private emit() {
    this.onChange(this.otp().join(''));
  }
}
