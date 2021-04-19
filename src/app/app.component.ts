import { Component, OnInit } from '@angular/core';
// import { Book } from '';

import { BookService } from './book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Book } from './book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  public Books: Book[];
  public editBook: Book;
  public deleteBook: Book;

  constructor(private BookService: BookService){}

  ngOnInit() {
    this.getBooks();
  }

  public getBooks(): void {
    this.BookService.getBooks().subscribe(
      (response: Book[]) => {
        this.Books = response;
        console.log(this.Books);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-Book-form').click();
    this.BookService.addBook(addForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateBook(Book: Book): void {
    this.BookService.updateBook(Book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBook(BookId: number): void {
    this.BookService.deleteBook(BookId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    console.log(key);
    const results: Book[] = [];
    for (const Book of this.Books) {
      if (Book.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || Book.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || Book.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      // || Book.pageNunber.toLowerCase().indexOf(key.toLowerCase()) !== -1) 
      ){
        results.push(Book);
      }
    }
    this.Books = results;
    if (results.length === 0 || !key) {
      this.getBooks();
    }
  }

  public onOpenModal(Book: Book, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === 'edit') {
      this.editBook = Book;
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBook = Book;
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }



}
