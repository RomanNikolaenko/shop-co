import {
  trigger,
  transition,
  state,
  style,
  animate,
} from '@angular/animations';

export const loadingAnim = trigger('loadingAnimation', [
  transition('void => *', [
    state('void', style({ opacity: 0 })),
    animate('0.15s ease-out', style({ opacity: 1 })),
  ]),
  transition('* => void', [
    state('void', style({ opacity: 1 })),
    animate('0.15s ease-out', style({ opacity: 0 })),
  ]),
]);
