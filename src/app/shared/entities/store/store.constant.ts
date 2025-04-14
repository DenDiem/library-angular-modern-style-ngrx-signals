import { BookEffects } from '../../../store/books/book.effects';
import { bookReducer } from '../../../store/books/book.reducer';

import { FEATURE_KEYS } from './store.enum';

export const FEATURE_STORE_MAP = {
  [FEATURE_KEYS.BOOKS]: {
    reducer: bookReducer,
    effects: [BookEffects],
  },
} as const;
