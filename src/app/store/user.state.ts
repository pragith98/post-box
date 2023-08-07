import { Injectable } from '@angular/core';
import { User } from 'src/app/types';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { 
  tap, 
  Observable 
} from 'rxjs';
import { Router } from '@angular/router';
import { 
  Computed, 
  DataAction, 
  Payload, 
  Persistence, 
  StateRepository 
} from '@angular-ru/ngxs/decorators';
import { UserApiService } from 'src/app/apis';

import { LoginCredentials } from 'src/app/types';


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

@Persistence([{
  path: 'user',
  existingEngine: localStorage
}])
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
    private apiService: UserApiService,
    private router: Router
  ) {
    super();
  }

  /**
   * Get current user from state.
   * @returns {User}
   */
  @Computed()
  get getUser(): User {
    return this.ctx.getState().user;
  }

  /**
   * Check if current user is authenticated by verifing the availability of 
   * user's token in the state.
   * @returns {boolean}
   */
  @Computed()
  get isAuthenticated(): boolean{
    return this.ctx.getState().user.token !== '';
  }

  /**
   * Perform user login by using provided login credentials.
   * If login is successful, store logged user data in the state.
   * @param credentials 
   */
  @DataAction()
  userLogin(
    @Payload('credentials') credentials: LoginCredentials
  ): Observable<User> {
    return this.apiService.userLogin(credentials)
      .pipe(tap(user => {
        this.ctx.setState({
          user
        });
        this.router.navigate(['list']);
      }));
  }

  /**
   * Logout current logged user by resetting the state 
   */
  @DataAction()
  userLogout(): void {
    this.reset();
  }

}