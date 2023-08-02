import { Injectable } from '@angular/core';
import { User } from './user.model';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { tap, of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { 
  Computed, 
  DataAction, 
  Payload, 
  StateRepository 
} from '@angular-ru/ngxs/decorators';
import { 
  ApiService, 
  LoginCredentials 
} from './api.service';

const defaultUser: User = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  image: '',
  token: ''
}

interface UserStateModel {
  user: User;
}

@StateRepository()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: defaultUser
  }
})

@Injectable()
export class UserState extends NgxsDataRepository<UserStateModel> {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    super();
  }

  /**
   * Get current user from state.
   */
  @Computed()
  get getUser(): User {
    return this.snapshot.user
  }

  /**
   * Check if current user is authenticated by verifing the availability of 
   * user's token in the state.
   * @returns {boolean}
   */
  @Computed()
  get isAuthenticated(): boolean{
    return this.snapshot.user.token !== '';
  }

  /**
   * Perform user login by using provided login credentials.
   * If login is successful, store logged user data in the local storage.
   * Set logged user data to user state and navigate to the 'list' page.
   * @param credentials 
   */
  @DataAction()
  userLogin(@Payload('credentials') credentials: LoginCredentials) {
    this.apiService.userLogin(credentials).pipe(
      tap(user => this.setLocalUser(user))).subscribe(() => {
        this.loadUser();
        this.router.navigate(['list'])
      });
  }

  /**
   * Get current logged user data from the local storage and set that data to
   * user state.
   */
  @DataAction()
  loadUser() {
    if (this.haveLoggedUser()) {
      this.getLocalUser().subscribe(user => {
        const state = this.ctx.getState()
        this.ctx.setState({
          ...state,
          user: user
        });
      });
    } 
  }

  /**
   * Logout current logged user by removing stored user data in the local 
   * storage.
   * Set initial user state and reload application to reflect logout state.
   */
  @DataAction()
  userLogout() {
    localStorage.removeItem('user');
    this.loadUser();
    location.reload()
  }

  /**
   * Check if there is logged user data stored in the local storage.
   * @returns {boolean}
   */
  private haveLoggedUser(): boolean {
    return localStorage.getItem('user') !== null
  }

  /**
   * Store user data in the local storage.
   * @param user 
   */
  private setLocalUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Get stored user data from the local storage.
   * @returns {Observable<User>}
   */
  private getLocalUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user') || ''));
  }
}