import { A11yModule } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Renderer2,
  RendererFactory2,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
  input,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import { popupAnim } from '^shared/animations/popup';

import { Icon } from '../icon/icon';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [Icon, A11yModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [popupAnim],
})
export class Popup<T extends object = object> implements AfterViewInit {
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('container', { read: ViewContainerRef, static: true })
  protected container!: ViewContainerRef;

  readonly childComponentType = input<Type<T>>();
  readonly childComponentInputs = input<Partial<T>>({});

  readonly animationState = signal<'void' | 'enter'>('void');
  readonly closed = new EventEmitter<void>();

  private componentRef?: ComponentRef<T>;

  private touchStartX = 0;
  private touchEndX = 0;

  private readonly POPUP_OPEN = 'lock';
  private readonly BACKDROP_CLASS = 'popup-backdrop';

  ngAfterViewInit(): void {
    const componentType = this.childComponentType();
    if (!componentType || !this.container) return;

    this.componentRef = this.container.createComponent(componentType);
    Object.assign(this.componentRef.instance, {
      ...this.childComponentInputs(),
      close: () => this.close(),
    });

    this.renderer.addClass(document.body, this.POPUP_OPEN);

    this.destroyRef.onDestroy(() => {
      this.renderer.removeClass(document.body, this.POPUP_OPEN);
      this.componentRef?.destroy();
    });

    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.close();
        }
      });

    requestAnimationFrame(() => {
      this.animationState.set('enter');
    });
  }

  protected close(): void {
    this.animationState.set('void');
    setTimeout(() => this.closed.emit(), 200);
  }

  protected onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains(this.BACKDROP_CLASS)) {
      this.close();
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  protected onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    if (this.touchStartX - this.touchEndX > 70) {
      this.close();
    }
  }
}
