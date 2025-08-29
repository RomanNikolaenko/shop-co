import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule, Header, Footer],
  template: `
    <app-header></app-header>
    <main class="wrapper">
      <router-outlet />
    </main>
    @defer (on timer(500ms); prefetch on idle) {
      <app-footer></app-footer>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class MainLayout { }
