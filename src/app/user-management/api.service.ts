import { Injectable } from '@angular/core';
import { ApiProviderService, Endpoint } from '../core';
import { Observable } from 'rxjs';
import { User } from './user.model';

export interface LoginCredentials {
    username: string,
    password: string
}

@Injectable()
export class ApiService {

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