import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import type { Book } from '../../entities/book.interface';

@Component({
  selector: 'app-book-delete-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './book-delete-modal.component.html',
  styleUrl: './book-delete-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDeleteModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookDeleteModalComponent>,
  ) {}

  confirm(): void {
    this.dialogRef.close(this.book);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
