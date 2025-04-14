import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FEATURE_KEYS } from '../../shared/entities/store/store.enum';

import { BookState } from './book.reducer';

export namespace BookSelectors {
  const state = createFeatureSelector<BookState>(FEATURE_KEYS.BOOKS);

  export const books = createSelector(state, (s) => s.books);
  export const loading = createSelector(state, (s) => s.loading);
  export const error = createSelector(state, (s) => s.error);
  export const filters = createSelector(state, (s) => s.filters);
}
