import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Post,
  PostState
} from 'src/app/post-management';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postsList$?: Observable<Post[]>;

  constructor(private postState: PostState) { }

  ngOnInit(): void {
    this.postsList$ = this.postState.getAllPosts()
  }
}
