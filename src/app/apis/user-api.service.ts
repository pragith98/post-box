import { Injectable } from '@angular/core';
import { ApiProviderService,
     Endpoint
} from 'src/app/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/types';
import { LoginCredentials } from 'src/app/types';


@Injectable()
export class UserApiService {

    constructor(private apiProvider: ApiProviderService) { }

    /**
     * Log user by calling API with provided credentials.
     * @param credentials 
     * @returns {Observable<User>}
     */
    userLogin(credentials: LoginCredentials): Observable<User> {
        return this.apiProvider.post<User>(Endpoint.loginUser, credentials);
    }
}