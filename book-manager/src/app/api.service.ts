import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) {

   }
   // Get Books

  getBooks(): Observable<any>{
   return this.http.get(environment.apiUrl)

  }

  //Add Books
  addBook(book: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl, book)
  }
  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${book.id}`, book);
  }
  //Delete Books
  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${id}`)
  }
}
