import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostState } from '../store.service';
import { UpdatePostService } from './update-post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit{
  
  userID = 111;
  postID = 0;

  constructor(
    private service: UpdatePostService,
    private router: Router,
    private postState: PostState,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postID = Number(params['id']);
    
      const post = this.service.showPost(this.postID);
      this.title.setValue(post.title);
      this.body.setValue(post.body)
    });
  }

  title = new FormControl('', Validators.required);
  body = new FormControl('', Validators.required);

  myForm = new FormGroup({
    title: this.title,
    body: this.body,
  })

  onSubmit() {
    if(this.myForm.valid) {
      const post = {...this.myForm.value, userId: this.userID}
      this.postState.updatePost(this.postID, post)
    }
  }

  navigateToPostList() {
    this.router.navigate([this.postID,'view']);
  }
}
