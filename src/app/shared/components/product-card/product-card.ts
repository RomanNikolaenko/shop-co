import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardModel } from '^interfaces/card';

import { Rating } from '../rating/rating';

@Component({
  selector: 'product-card',
  imports: [Rating, RouterLink],
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input({ required: true }) data!: CardModel;
}
