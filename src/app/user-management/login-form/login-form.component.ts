import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  UserState, 
  LoginCredentials 
} from 'src/app/user-management';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  hide = true;

  constructor(
    private userState: UserState,
    private router: Router
  ) { }

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  myForm = new FormGroup({
    username: this.username,
    password: this.password
  })

  onSubmit() {
    if(this.myForm.valid) {
      const credentials: LoginCredentials = {
        username: this.myForm.get('username')?.value as string,
        password: this.myForm.get('password')?.value as string
      }
      this.userState.userLogin(credentials)
    }
  }

  navigateToBack() {
    this.router.navigate(['list']);
  }

}
