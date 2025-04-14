import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ApiFilter } from '../../../shared/entities/api/filters.interface';
import { BookActions } from '../../../store/books/book.actions';
import { BookSelectors } from '../../../store/books/book.selectors';
import { Book } from '../entities/book.interface';
import { BookDeleteModalComponent } from '../modals/book-delete-modal/book-delete-modal.component';
import { BookItemModalComponent } from '../modals/book-item-modal/book-item-modal.component';

@Injectable()
export class BookFacade {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  public readonly books: Signal<Book[]> = toSignal(this.store.select(BookSelectors.books), { initialValue: [] });
  public readonly filters: Signal<{ searchTerm: string | null }> = toSignal(this.store.select(BookSelectors.filters), { initialValue: { searchTerm: null } });
  public readonly loading: Signal<boolean | undefined> = toSignal(this.store.select(BookSelectors.loading));
  public readonly error: Signal<string | null | undefined> = toSignal(this.store.select(BookSelectors.error));

  public setFilter(filters: ApiFilter): void {
    this.store.dispatch(BookActions.setFilter({ filters }));
  }

  public loadBooks(): void {
    this.store.dispatch(BookActions.loadBooks());
  }

  
  public openAddBookModal(): void {
    const dialogRef = this.dialog.open(BookItemModalComponent);

    dialogRef.afterClosed().subscribe((book: Book) => {
      if (book) {
        this.addBook(book);
      }
    });
  }

  public openEditBookModal(book: Book): void {
    const dialogRef = this.dialog.open(BookItemModalComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe((editedBook: Book) => {
      if (editedBook) {
        this.updateBook(editedBook);
      }
    });
  }

  public openDeleteBookModal(book: Book): void {
    const dialogRef = this.dialog.open(BookDeleteModalComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe((book: Book) => {
      if (book) {
        this.deleteBook(book.id!);
      }
    });
  }
  
  private addBook(book: Book): void {
    this.store.dispatch(BookActions.addBook({ book }));
  }

  private updateBook(book: Book): void {
    this.store.dispatch(BookActions.updateBook({ book }));
  }

  private deleteBook(id: Book['id']): void {
    this.store.dispatch(BookActions.deleteBook({ id }));
  }
}
