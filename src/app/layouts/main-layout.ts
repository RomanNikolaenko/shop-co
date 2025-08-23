import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterModule, Header, Footer],
  template: `
    <app-header></app-header>
    <main class="wrapper">
      <router-outlet />
    </main>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class MainLayout {}
