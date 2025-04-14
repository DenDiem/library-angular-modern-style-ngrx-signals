import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import type { Book } from '../../entities/book.interface';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent {
  public readonly book = input.required<Book>();

  protected readonly edit = output<Book>();
  protected readonly delete = output<Book>();
}
