import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostState } from '../store.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  
  userID = 111;

  constructor(
    private router: Router,
    private postState: PostState
  ) { }

  title = new FormControl('', Validators.required);
  body = new FormControl('', Validators.required);

  myForm = new FormGroup({
    title: this.title,
    body: this.body,
  })

  onSubmit() {
    if(this.myForm.valid) {
      const post = {...this.myForm.value, userId: this.userID}
      this.postState.createPost(post)
    }
  }

  navigateToPostList() {
    this.router.navigate(['list']);
  }
}
