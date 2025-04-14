import { Component, computed, effect, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import type { Book, BookForm } from '../../entities/book.interface';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [MatFormField, MatInput, MatDialogModule, MatButton, ReactiveFormsModule, MatLabel],
  templateUrl: './book-item-modal.component.html',
  styleUrls: ['./book-item-modal.component.scss'],
})
export class BookItemModalComponent {
  protected readonly book = signal<Book | null>(null);
  protected readonly isEditMode = computed(() => !!this.book());

  protected readonly bookForm: FormGroup<BookForm> = this.createForm();

  constructor(
    private dialogRef: MatDialogRef<BookItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book | null,
  ) {
    this.book.set(data);
    effect(() => {
      this.updateForm(this.book());
    });
  }

  protected cancel(): void {
    this.dialogRef.close(false);
  }

  protected submit(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.getRawValue());
    }
  }

  private updateForm(book: Book | null): void {
    if (book) {
      this.bookForm.patchValue(book);
    }
  }

  private createForm(): FormGroup<BookForm> {
    return new FormGroup<BookForm>({
      id: new FormControl<number | null>(null),
      title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      author: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      publicationYear: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl<string>('', { nonNullable: true }),
      rating: new FormControl<number>(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(5)] }),
    });
  }
}
