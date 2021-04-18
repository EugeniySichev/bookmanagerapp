import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BookService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/Book/all`);
  }

  public addBook(Book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiServerUrl}/Book/add`, Book);
  }

  public updateBook(Book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiServerUrl}/Book/update`, Book);
  }

  public deleteBook(BookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Book/delete/${BookId}`);
  }
}
