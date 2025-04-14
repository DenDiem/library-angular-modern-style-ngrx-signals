import { createReducer, on } from '@ngrx/store';

import { Book } from '../../modules/books/entities/book.interface';

import { BookActions } from './book.actions';

export interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  filters: {
    searchTerm: string | null;
  };
}

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: null,
  },
};

export const bookReducer = createReducer(
  initialState,
  on(
    BookActions.loadBooks,
    BookActions.setFilter,
    BookActions.addBook,
    BookActions.updateBook,
    BookActions.deleteBook,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  
  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
  })),

  on(BookActions.addBookSuccess, (state, { book }) => ({
    ...state,
    loading: false,
    books: [...state.books, book],
  })),
  on(BookActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    loading: false,
    books: state.books.map((b) => (b.id === book.id ? book : b)),
  })),
  on(BookActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books.filter((book) => book.id !== id),
  })),
  on(BookActions.setFilterSuccess, (state, { filters }) => ({
    ...state,
    loading: false,
    filters: { ...state.filters, ...filters },
  })),

  on(
    BookActions.loadBooksFailure,
    BookActions.addBookFailure,
    BookActions.updateBookFailure,
    BookActions.deleteBookFailure,
    BookActions.setFilterFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
