import { trigger, transition, style, animate, state } from '@angular/animations';

export const popupAnim = trigger('popupAnimation', [
  state('void', style({ opacity: 0 })),
  state('enter', style({ opacity: 1 })),
  transition('void => *', animate('250ms ease-out')),
  transition('* => void', animate('200ms ease-in')),
]);
