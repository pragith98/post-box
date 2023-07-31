import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError
} from 'rxjs';

@Injectable()
export class ApiProviderService {
  private readonly apiBaseAddress = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiBaseAddress}/${endpoint}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.debug(error);
        return throwError(() => 'Error in API call get ' + endpoint)
      }));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${this.apiBaseAddress}/${endpoint}`,
      body
    ).pipe(catchError((error: HttpErrorResponse) => {
      console.debug(error);
      return throwError(() => 'Error in API call post ' + endpoint)
    }))
  }

  update<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(
      `${this.apiBaseAddress}/${endpoint}`,
      body
    ).pipe(catchError((error: HttpErrorResponse) => {
      console.debug(error);
      return throwError(() => 'Error in API call update ' + endpoint)
    }))
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiBaseAddress}/${endpoint}`)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.debug(error);
        return throwError(() => 'Error in API call delete ' + endpoint)
      }))
  }

}