import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, inject, Input, PLATFORM_ID } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private el = inject(ElementRef<HTMLElement>);
  private swiperElement!: HTMLElement;

  @Input('config') config?: SwiperOptions;

  constructor() {
    if (!this.isBrowser) return;

    this.swiperElement = this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    Object.assign(this.swiperElement, this.config);
    this.el.nativeElement.initialize();
  }
}
