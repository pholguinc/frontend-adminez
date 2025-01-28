import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/index/operaciones.component')
  },
  {
    path: 'creacion-fichas',
    loadComponent: () =>
      import('./views/creacion-fichas/creacion-fichas.component'),
  },
];
