import { Injectable} from '@angular/core'
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
                return throwError(()=> 'Error in API call get '+ endpoint)
            }));
    }

}