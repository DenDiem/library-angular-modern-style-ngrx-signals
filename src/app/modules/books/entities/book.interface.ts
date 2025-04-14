import { FormControlsOf } from '../../../shared/entities/form/form.interface';

export interface Book {
  id: number | null;
  title: string;
  author: string;
  publicationYear: number;
  description: string;
  rating: number;
}

export type BookForm = FormControlsOf<Book>;