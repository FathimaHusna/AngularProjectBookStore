import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ApiService } from '../api.service';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = this.initializeNewBook();
  editMode: boolean = false;
  isAddingBook: boolean = false; // To toggle the "Add Book" form visibility
  selectedBook?: Book;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.books = data.map((book: any) => ({
            ...book,
            publicationDate: new Date(book.publicationDate),
          }));
        } else {
          console.error('Unexpected response format:', data);
          this.books = [];
        }
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  addBook(): void {
    if (this.editMode && this.selectedBook) {
      Object.assign(this.selectedBook, this.newBook);
      this.editMode = false;
    } else {
      const newId = this.books.length ? Math.max(...this.books.map((b) => b.id)) + 1 : 1;
      this.books.push({ ...this.newBook, id: newId });
    }
    this.resetForm();
  }

  editBook(book: Book): void {
    this.editMode = true;
    this.isAddingBook = true;
    this.selectedBook = book;
    this.newBook = { ...book };
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);
  }

  resetForm(): void {
    this.newBook = this.initializeNewBook();
    this.editMode = false;
    this.isAddingBook = false;
    this.selectedBook = undefined;
  }

  private initializeNewBook(): Book {
    return { id: 0, title: '', author: '', isbn: '', publicationDate: new Date() };
  }
}
