import { Book } from '../../modules/books/entities/book.interface';

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publicationYear: 1960,
    description: 'A novel about the serious issues of rape and racial inequality.',
    rating: 4.9,
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    publicationYear: 1949,
    description: 'A dystopian story about a totalitarian regime that controls everything.',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publicationYear: 1813,
    description: 'A romantic novel that also critiques the British landed gentry.',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publicationYear: 1925,
    description: 'A novel about the American dream and high society in the 1920s.',
    rating: 4.5,
  },
  {
    id: 5,
    title: 'Moby Dick',
    author: 'Herman Melville',
    publicationYear: 1851,
    description: 'An epic tale of the obsessive quest to kill a giant white whale.',
    rating: 4.3,
  },
  {
    id: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publicationYear: 1951,
    description: 'A story about teenage angst and alienation.',
    rating: 4.4,
  },
];
