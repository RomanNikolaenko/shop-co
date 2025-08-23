import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  inject,
  signal,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

import { SwiperDirective } from '^directives/swiper';
import { SwiperService } from '^services/swiper';
import { Icon } from '^shared/components/icon/icon';
import { Rating } from '^shared/components/rating/rating';

if (typeof window !== 'undefined') {
  registerSwiperElements();
}

@Component({
  selector: 'slider',
  standalone: true,
  imports: [CommonModule, TranslateModule, SwiperDirective, Icon, Rating],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Slider implements AfterViewInit {
  @ViewChild('swiperRef', { static: true }) swiperRef!: ElementRef;

  private readonly swiperService = inject(SwiperService);
  private readonly translate = inject(TranslateService);

  protected slides = [
    {
      rating: 4,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes..."',
    },
    {
      rating: 5,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes..."',
    },
    {
      rating: 2,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes..."',
    },
    {
      rating: 3,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes..."',
    },
  ];

  protected currentSlideLabel = signal('');

  protected labels = signal({
    containerLabel: '',
    containerDescription: '',
    prev: '',
    next: '',
    itemDescription: '',
    slideLabel: (index: number, length: number) => {
      /* eslint-disable no-void */
      void index;
      void length;
      /* eslint-enable no-void */
      return '';
    },
  });

  constructor() {
    this.translate
      .get([
        'swiper.containerMessage',
        'swiper.containerRoleDescriptionMessage',
        'swiper.prevSlideMessage',
        'swiper.nextSlideMessage',
        'swiper.itemRoleDescriptionMessage',
        'swiper.slideLabelMessage',
      ])
      .subscribe((t) => {
        this.labels.set({
          containerLabel: t['swiper.containerMessage'],
          containerDescription: t['swiper.containerRoleDescriptionMessage'],
          prev: t['swiper.prevSlideMessage'],
          next: t['swiper.nextSlideMessage'],
          itemDescription: t['swiper.itemRoleDescriptionMessage'],
          slideLabel: (index: number, length: number) =>
            t['swiper.slideLabelMessage']
              .replace('{{index}}', (index + 1).toString())
              .replace('{{slidesLength}}', length.toString()),
        });

        this.currentSlideLabel.set(
          this.labels().slideLabel(0, this.slides.length),
        );
      });
  }

  ngAfterViewInit(): void {
    const swiper = this.swiperRef.nativeElement.swiper;
    swiper?.on('slideChange', () => {
      const index = swiper.realIndex ?? 0;
      this.currentSlideLabel.set(
        this.labels().slideLabel(index, this.slides.length),
      );
    });
  }

  protected readonly options = computed(() => {
    return {
      ...this.swiperService.getOptions(),
      on: {
        slideChange: (swiper: Swiper) => {
          const index = swiper.realIndex ?? 0;
          this.currentSlideLabel.set(
            this.labels().slideLabel(index, this.slides.length),
          );
        },
      },
    };
  });

  protected prevSlide() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  protected nextSlide() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}
