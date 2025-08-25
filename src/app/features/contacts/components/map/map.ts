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
  styleUrls: ['./map.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapWidget implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected mapLock = signal(true);

  protected mapInstance?: unknown;

  @ViewChild('mapContainer', { static: true }) private mapContainer!: ElementRef<HTMLElement>;

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
    const [{ Map, View }, TileLayerModule, OSMModule] = await Promise.all([
      import('ol'),
      import('ol/layer/Tile'),
      import('ol/source/OSM'),
    ]);

    const TileLayer = TileLayerModule.default;
    const OSM = OSMModule.default;

    this.mapInstance = new Map({
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
