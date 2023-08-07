import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  FormState,
  PostState,
  UserState 
} from 'src/app/store';
import { 
  FormControl, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { NewForm } from 'src/app/types';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  
  userID = this.userState.getUser.id;

  constructor(
    private router: Router,
    private postState: PostState,
    private userState: UserState,
    private formState: FormState
  ) { }

  title = new FormControl(
    this.formState.getFormData.title, 
    Validators.required
  );
  body = new FormControl(
    this.formState.getFormData.body, 
    Validators.required
  );

  myForm = new FormGroup({
    title: this.title,
    body: this.body,
  })

  onSubmit(): void {
    if(this.myForm.valid) {
      const post = {
        ...this.myForm.value, 
        userId: this.userID
      }
      this.postState.createPost(post);
      this.formState.resetStoredFormData();
    }
  }

  cancelAndNavigateToPostList(): void {
    this.formState.resetStoredFormData();
    this.router.navigate(['list']);
  }

  storeFormData(): void {
    const formdata: NewForm = {
      title: this.title.value ?? '',
      body: this.body.value ?? ''
    }    
    this.formState.addFormData(formdata)
  }
}
