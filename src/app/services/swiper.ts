import { Injectable, signal } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Injectable({
  providedIn: 'root',
})
export class SwiperService {
  private readonly defaultOptions: SwiperOptions = {
    centeredSlides: false,
    spaceBetween: 20,
    speed: 1500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    a11y: {
      enabled: true,
      containerRole: 'region',
      notificationClass: 'swiper-notification',
      scrollOnFocus: true,
      slideRole: 'group',
    },
    navigation: {
      enabled: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      480: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  };

  private readonly optionsSignal = signal(this.defaultOptions);

  getOptions(): SwiperOptions {
    return this.optionsSignal();
  }
}
