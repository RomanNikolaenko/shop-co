import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './map.html',
  styleUrl: './map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Map implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected mapLock = signal(true);

  @ViewChild('mapContainer', { static: true }) private mapContainer!: ElementRef;

  get containerClasses() {
    return {
      'map-lock': this.mapLock(),
    };
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    if (!document.querySelector('link[href="assets/styles/ol.css"]')) {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/styles/ol.css';
      this.renderer.appendChild(document.head, link);
    }

    this.initMap();
  }

  private async initMap() {
    const [{ Map, View }, TileLayer, OSM] = await Promise.all([
      import('ol'),
      import('ol/layer/Tile').then(m => m.default),
      import('ol/source/OSM').then(m => m.default)
    ]);

    new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-73.9972, 40.7506]),
        zoom: 10,
      }),
    });
  }

  protected mapLockFn() {
    this.mapLock.set(false);
  }
}
