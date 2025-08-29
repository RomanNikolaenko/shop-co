import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BrowseByDressStyleModel } from '^interfaces/browse-by-dress-style';
import { CardModel } from '^interfaces/card';
import { Products } from '^shared/components/products/products';

import { BrowseByDressStyle } from './components/browse-by-dress-style/browse-by-dress-style';
import { Company } from './components/company/company';
import { Hero } from './components/hero/hero';
import { Slider } from './components/slider/slider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, Company, Products, BrowseByDressStyle, Slider],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected data: CardModel[] = [
    {
      url: '/',
      title: 'SKINNY FIT JEANS',
      src: 'assets/images/card/card@1x.webp 295w',
      srcset: 'assets/images/card/card@1x.webp 295w, assets/images/card/card@2x.webp 590w, assets/images/card/card@3x.webp 885w',
      alt: 'Назва картинки',
      price: {
        new: 268,
        old: undefined,
      },
      save: undefined,
    },
    {
      url: '/',
      title: 'LOOSE FIT BERMUDA SHORTS',
      src: 'assets/images/card/card@1x.webp',
      srcset: 'assets/images/card/card@1x.webp 295w, assets/images/card/card@2x.webp 590w, assets/images/card/card@3x.webp 885w',
      alt: 'Назва картинки',
      price: {
        new: 352,
        old: 458,
      },
      save: '-23',
    },
  ];

  protected dataBrowse: BrowseByDressStyleModel[] = [
    {
      title: 'Casual',
      alt: 'Casual',
      src: 'assets/images/browse/image@1x.webp',
      srcset:
        'assets/images/browse/image@1x.webp 1x, assets/images/browse/image@2x.webp 2x, assets/images/browse/image@3x.webp 3x',
    },
    {
      title: 'Formal',
      alt: 'Formal',
      src: 'assets/images/browse/image@1x.webp',
      srcset:
        'assets/images/browse/image@1x.webp 1x, assets/images/browse/image@2x.webp 2x, assets/images/browse/image@3x.webp 3x',
    },
    {
      title: 'Party',
      alt: 'Party',
      src: 'assets/images/browse/image@1x.webp',
      srcset:
        'assets/images/browse/image@1x.webp 1x, assets/images/browse/image@2x.webp 2x, assets/images/browse/image@3x.webp 3x',
    },
    {
      title: 'Gym',
      alt: 'Gym',
      src: 'assets/images/browse/image@1x.webp',
      srcset:
        'assets/images/browse/image@1x.webp 1x, assets/images/browse/image@2x.webp 2x, assets/images/browse/image@3x.webp 3x',
    },
  ];
}
