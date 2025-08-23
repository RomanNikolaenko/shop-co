import { Routes } from '@angular/router';

import { STATIC_ROUTES } from '^core/static-routes';

export const shopRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('^layouts/main-layout').then((com) => com.MainLayout),
    children: [
      { path: '', redirectTo: 'cart', pathMatch: 'full' },
      {
        path: `${STATIC_ROUTES.SHOP.CH.CART.Path}`,
        title: `${STATIC_ROUTES.SHOP.CH.CART.Title}`,
        loadComponent: () => import('./cart/cart').then((m) => m.Cart),
      },
      {
        path: `${STATIC_ROUTES.SHOP.CH.CHECKOUT.Path}`,
        title: `${STATIC_ROUTES.SHOP.CH.CHECKOUT.Title}`,
        loadComponent: () =>
          import('./checkout/checkout').then((m) => m.Checkout),
      },
    ],
  },
];
