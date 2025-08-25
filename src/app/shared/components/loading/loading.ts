import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, Input } from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.ngSkipHydration]': 'true',
  },
})
export class Loading {
  @Input() fullPage = false;

  protected containerClasses = computed(() => ({
    loading__full: this.fullPage,
  }));
}
