import { Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/main-layout/layout/main-layout.component'

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'books',
        loadChildren: () => import('./modules/books/book.routes'),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'books',
      },
    ],
  },
];
