import { Component } from '@angular/core';
import { UserState } from './user-management/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 

  constructor(private userState: UserState) { 
    this.userState.loadUser()
  }
}
