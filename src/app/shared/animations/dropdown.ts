import { trigger, transition, style, animate } from '@angular/animations';

export const dropdownAnim = trigger('flyInBottom', [
  transition('void => *', [
    style({ transform: 'translateY(10px)', opacity: 0 }),
    animate('0.3s cubic-bezier(0.42, 0, 0.58, 1)', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition('* => void', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('0.3s cubic-bezier(0.32, 0, 0.58, 1)', style({ transform: 'translateY(10px)', opacity: 0 })),
  ]),
]);
