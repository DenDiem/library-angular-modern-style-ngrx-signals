import { Routes } from '@angular/router';

import { FEATURE_KEYS } from '../../shared/entities/store/store.enum';
import { provideFeatureStore } from '../../shared/helpers/store.providers';

import { BookItemComponent } from './components/book-item/book-item.component';
import { BookFacade } from './facades/book.facade';
import { BookListComponent } from './pages/book-list/book-list.component';

export const bookRoutes: Routes = [
  {
    path: '',
    providers: [provideFeatureStore(FEATURE_KEYS.BOOKS), BookFacade],
    children: [
      { path: '', component: BookListComponent },
      { path: ':id', component: BookItemComponent },
    ],
  },
];

export default bookRoutes;
