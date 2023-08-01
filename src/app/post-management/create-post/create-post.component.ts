import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostState } from 'src/app/post-management';
import { 
  FormControl, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { UserState } from 'src/app/user-management/store.service';

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
    private userState: UserState
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
