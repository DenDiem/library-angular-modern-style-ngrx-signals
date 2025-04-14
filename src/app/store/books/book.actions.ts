import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Book } from '../../modules/books/entities/book.interface';
import { ApiFilter } from '../../shared/entities/api/filters.interface';
import { FEATURE_KEYS } from '../../shared/entities/store/store.enum';

export const BookActions = createActionGroup({
  source: FEATURE_KEYS.BOOKS,
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: string }>(),

    'Add Book': props<{ book: Book }>(),
    'Add Book Success': props<{ book: Book }>(),
    'Add Book Failure': props<{ error: string }>(),

    'Update Book': props<{ book: Book }>(),
    'Update Book Success': props<{ book: Book }>(),
    'Update Book Failure': props<{ error: string }>(),

    'Delete Book': props<{ id: Book['id'] }>(),
    'Delete Book Success': props<{ id: Book['id'] }>(),
    'Delete Book Failure': props<{ error: string }>(),

    'Set Filter': props<{ filters: ApiFilter }>(),
    'Set Filter Success': props<{ filters: ApiFilter }>(),
    'Set Filter Failure': props<{ error: string }>(),
  }
}); 