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

  @Computed()
  get getUser(): User {
    return this.snapshot.user
  }

  @Computed()
  get isAuthenticated(): boolean{
    return this.snapshot.user.token !== '';
  }

  @DataAction()
  userLogin(@Payload('credentials') credentials: LoginCredentials) {
    return this.apiService.userLogin(credentials).pipe(
      tap(user => this.setLocalUser(user))).subscribe(() => {
        this.loadUser();
        this.router.navigate(['list'])
      });
  }

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

  @DataAction()
  userLogout() {
    localStorage.removeItem('user');
    this.loadUser();
    location.reload()
  }

  private haveLoggedUser(): boolean {
    return localStorage.getItem('user') !== null
  }

  private setLocalUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getLocalUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user') || ''));
  }
}