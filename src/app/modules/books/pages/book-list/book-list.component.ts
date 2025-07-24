import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { listAnimation } from '../../../../shared/animations/list.animation';
import { FilterComponent } from '../../../../shared/components/filter/filter.component';
import { ApiFilter } from '../../../../shared/entities/api/filters.interface';
import { BookItemComponent } from '../../components/book-item/book-item.component';
import { Book } from '../../entities/book.interface';
import { BookFacade } from '../../facades/book.facade';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookItemComponent, MatIcon, FilterComponent, MatButton],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation],
})
export class BookListComponent implements OnInit {
  private readonly bookFacade = inject(BookFacade);

  protected readonly books = this.bookFacade.books;
  protected readonly filters = this.bookFacade.filters;
  protected readonly loading = this.bookFacade.loading;

  protected emptyState = signal(false);

  public ngOnInit(): void {
    this.bookFacade.loadBooks();
  }

  protected onAnimationStart(): void {
    this.emptyState.set(false);
  }

  protected onAnimationDone() {
    this.emptyState.set(this.books().length === 0 && !this.loading());
  }

  protected openAddBookModal(): void {
    this.bookFacade.openAddBookModal();
  }

  protected openEditBookModal(book: Book): void {
    this.bookFacade.openEditBookModal(book);
  }

  protected openDeleteBookModal(book: Book): void {
    this.bookFacade.openDeleteBookModal(book);
  }

  protected filter(filter: ApiFilter): void {
    this.bookFacade.setFilter(filter);
  }
}
