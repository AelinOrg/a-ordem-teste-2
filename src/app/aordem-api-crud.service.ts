import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AordemApiCrudService {

  apiUrl: string = 'https://teste-aordem.firebaseio.com';
  secret_key = '5buTYt9v9wzKq5F2d9DaTZob5TVE8kGyAskixeT6'
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Access-Control-Allow-Origin', '*')
    //.set('ETag', '[ETAG_VALUE]')
    //.set('Cache-Control', 'no-cache')

  constructor(private http: HttpClient) { }

  // Create
  createTask(data, route): Observable<any> {
    let API_URL = `${this.apiUrl}/${route}.json?auth=${this.secret_key}`;
    return this.http.put(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  // Read
  getTask(route) {
    return this.http.get(`${this.apiUrl}/${route}.json?auth=${this.secret_key}`, { headers: this.headers });
  }

  // Update
  updateTask(data, route): Observable<any> {
    let API_URL = `${this.apiUrl}/${route}.json?auth=${this.secret_key}`;
    return this.http.patch(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  // Delete
  deleteTask(route): Observable<any> {
    let API_URL = `${this.apiUrl}/${route}.json?auth=${this.secret_key}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.error)
    )
  }

  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
