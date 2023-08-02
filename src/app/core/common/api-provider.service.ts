import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError,
  tap
} from 'rxjs';
import { AlertService } from './alert.service';

@Injectable()
export class ApiProviderService {
  private readonly apiBaseAddress = 'https://dummyjson.com';

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ) { }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiBaseAddress}/${endpoint}`).pipe(
      tap(() => this.alert.success(`${endpoint} data retrieving successful`)),
      catchError((error: HttpErrorResponse) => {
        console.debug(error);
        this.alert.false(`${endpoint} data retrieving unsuccessful`)
        return throwError(() => 'Error in API call get ' + endpoint)
      }));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${this.apiBaseAddress}/${endpoint}`,
      body
    ).pipe(
      tap(() => this.alert.success(`${endpoint} successful`)),
      catchError((error: HttpErrorResponse) => {
      console.debug(error);
      this.alert.false(`${endpoint} data retrieving unsuccessful`)
      return throwError(() => 'Error in API call post ' + endpoint)
    }))
  }

  update<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(
      `${this.apiBaseAddress}/${endpoint}`,
      body
    ).pipe(
      tap(() => this.alert.success(`${endpoint} update successful`)),
      catchError((error: HttpErrorResponse) => {
      console.debug(error);
      this.alert.false(`${endpoint} update unsuccessful`)
      return throwError(() => 'Error in API call update ' + endpoint)
    }))
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiBaseAddress}/${endpoint}`)
      .pipe(
        tap(() => this.alert.success(`${endpoint} delete successful`)),
        catchError((error: HttpErrorResponse) => {
        console.debug(error);
        this.alert.false(`${endpoint} delete unsuccessful`)
        return throwError(() => 'Error in API call delete ' + endpoint)
      }))
  }

}