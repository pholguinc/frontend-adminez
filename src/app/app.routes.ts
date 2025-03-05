import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin' },

  {
    path: 'admin',
    // canActivate:[privateGuard],
    loadComponent: () =>
      import('./shared/layout/admin-layout/admin-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component'),
      },
      {
        path: 'operaciones',
        loadChildren: () =>
          import('./dashboard/operaciones/operaciones.routes').then(
            (m) => m.routes
          ),
      },
    ],
  },
  //Rutas Publicas
  {
    path: 'pagos',
    loadComponent: () => import('./public/pagos/pagos.component')
  },
];
