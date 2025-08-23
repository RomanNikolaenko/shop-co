import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CardModel } from '^interfaces/card';
import { ProductCard } from '^shared/components/product-card/product-card';

@Component({
  selector: 'products',
  imports: [CommonModule, RouterLink, ProductCard, TranslateModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
  @Input() title: string = '';
  @Input() isButton: boolean = true;
  @Input({ required: true }) data!: CardModel[];

  protected countCard = 4;
}
