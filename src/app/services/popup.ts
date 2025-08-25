import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  createComponent,
  signal,
  inject,
  computed,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationStart } from '@angular/router';

import { Popup as PopupHostComponent } from '^shared/components/popup/popup';

@Injectable({ providedIn: 'root' })
export class PopupService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly baseZIndex = 1000;
  private readonly popups = signal<ComponentRef<PopupHostComponent<object>>[]>([]);

  readonly popupCount = computed(() => this.popups().length);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeAll();
      }
    });
  }

  open<T extends object>(component: Type<T>, componentInputs?: Partial<T>): void {
    const popupRef = createComponent(PopupHostComponent<T>, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    const domElem = (popupRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;

    const currentZIndex = this.baseZIndex + this.popups().length;
    domElem.style.zIndex = String(currentZIndex);
    document.body.appendChild(domElem);

    popupRef.setInput('childComponentType', component);
    popupRef.setInput('childComponentInputs', componentInputs || {});

    popupRef.instance.closed.subscribe(() => {
      this.close(popupRef as unknown as ComponentRef<PopupHostComponent<object>>);
    });

    this.appRef.attachView(popupRef.hostView);
    this.popups.update((list) => [...list, popupRef as unknown as ComponentRef<PopupHostComponent<object>>]);
  }

  close(popupRef: ComponentRef<PopupHostComponent<object>>): void {
    this.appRef.detachView(popupRef.hostView);
    popupRef.destroy();
    this.popups.update((list) => list.filter((p) => p !== popupRef));
  }

  closeAll(): void {
    for (const ref of this.popups()) {
      this.appRef.detachView(ref.hostView);
      ref.destroy();
    }
    this.popups.set([]);
  }
}
