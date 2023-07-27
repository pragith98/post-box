import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { ApiService } from './api.service';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  StateRepository,
  DataAction
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  of,
  Observable
} from 'rxjs';

export interface PostStateModel {
  posts: Post[];
}


@StateRepository()
@State<PostStateModel>({
  name: 'postsList',
  defaults: {
    posts: []
  }
})

@Injectable()
export class PostState extends NgxsDataRepository<PostStateModel> {

  constructor(private apiService: ApiService) {
    super()
  }

  @DataAction()
  getAllPosts(): Observable<Post[]> {
    return this.getLocalPosts().pipe(
      tap(posts => {
        const state = this.ctx.getState();
        this.ctx.setState({
          ...state,
          posts: posts
        })
      })
    )
  }

  private haveFetched(): boolean {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    return posts.length > 0;
  }

  private fetchPosts(): Observable<Post[]> {
    return this.apiService.getAllPosts().pipe(tap(postsList => 
      localStorage.setItem('posts', JSON.stringify(postsList))));
  }

  private getLocalPosts(): Observable<Post[]> {
    if (this.haveFetched()) {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      return of(posts);
    }
    return this.fetchPosts();
  }

}