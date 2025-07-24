import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import type { Book } from '../../entities/book.interface';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButton, MatIcon],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookItemComponent {
  @Input({ required: true }) book!: Book;
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<Book>();

  protected onEdit(): void {
    this.edit.emit(this.book);
  }

  protected onDelete(): void {
    this.delete.emit(this.book);
  }
}
