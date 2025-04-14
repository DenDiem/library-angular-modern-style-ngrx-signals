import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { BookService } from '../../services/book.service';

import { BookActions } from './book.actions';
import { BookSelectors } from './book.selectors';

@Injectable()
export class BookEffects {
  public loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      withLatestFrom(this.store.select(BookSelectors.filters)),
      mergeMap(([, filters]) =>
        this.bookService.getBooks(filters).pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error: error.message })))
        )
      )
    )
  );

  public addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.addBook),
      mergeMap(({ book }) =>
        this.bookService.addBook(book).pipe(
          map(addedBook => BookActions.addBookSuccess({ book: addedBook })),
          catchError(error => of(BookActions.addBookFailure({ error: error.message })))
        )
      )
    )
  );

  public updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBook),
      mergeMap(({ book }) =>
        this.bookService.updateBook(book).pipe(
          map(updatedBook => BookActions.updateBookSuccess({ book: updatedBook })),
          catchError(error => of(BookActions.updateBookFailure({ error: error.message })))
        )
      )
    )
  );

  public deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBook),
      mergeMap(({ id }) =>
        this.bookService.deleteBook(id).pipe(
          map(() => BookActions.deleteBookSuccess({ id })),
          catchError(error => of(BookActions.deleteBookFailure({ error: error.message })))
        )
      )
    )
  );



  public setFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.setFilter),
      mergeMap(({ filters }) =>
        of(BookActions.setFilterSuccess({ filters })).pipe(
          catchError(error => of(BookActions.setFilterFailure({ error: error.message })))
        )
      )
    )
  );

  reloadBooksAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BookActions.addBookSuccess,
        BookActions.updateBookSuccess,
        BookActions.deleteBookSuccess,
        BookActions.setFilterSuccess,
      ),
      map(() => BookActions.loadBooks())
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private store: Store
  ) {}
} 