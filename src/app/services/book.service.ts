import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from '../modules/books/entities/book.interface';
import { ApiFilter } from '../shared/entities/api/filters.interface';
import { BOOKS } from '../shared/mock/book.mock';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly books: Book[] = [];

  constructor() {
    this.books = BOOKS;
  }

  public getBooks(filters?: ApiFilter): Observable<Book[]> {
    return filters? this.search(filters) : of(this.books);
  }

  public getBook(id: Book['id']): Observable<Book | undefined> {
    return of(this.books.find(b => b.id === id));
  }

  public addBook(book: Book): Observable<Book> {
    this.books.push(book);
    return of(book);
  }

  public updateBook(book: Book): Observable<Book> {
    const index = this.books.findIndex(b => b.id === book.id);

    if (index !== -1) {
      this.books[index] = book;
    }

    return of(book);
  }

  public deleteBook(id: Book['id']): Observable<boolean> {
    const index = this.books.findIndex(b => b.id === id);

    if (index !== -1) {
      this.books.splice(index, 1);
      return of(true);
    }

    return of(false);
  }

  private search(filters: ApiFilter): Observable<Book[]> {
    let filteredBooks = [...this.books];

    if (filters?.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    }

    return of(filteredBooks);
  }
}