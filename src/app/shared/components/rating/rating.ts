import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rating',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rating implements OnInit {
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;

  protected stars = [1, 2, 3, 4, 5];

  readonly ratingShow = signal(0);

  ngOnInit(): void {
    this.ratingShow.set(this.rating);
  }

  protected setRating(num: number): void {
    if (this.readonly) return;

    this.ratingShow.set(num);
  }
}
