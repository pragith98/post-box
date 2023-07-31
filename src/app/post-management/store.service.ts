import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { ApiService } from './api.service';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  StateRepository,
  DataAction,
  Payload,
  Computed,
  // Persistence
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  of,
  Observable
} from 'rxjs';
import { Router } from '@angular/router';

export interface PostStateModel {
  posts: Post | Post[];
}

// @Persistence()
@StateRepository()
@State<PostStateModel>({
  name: 'postsList',
  defaults: {
    posts: []
  }
})

@Injectable()
export class PostState extends NgxsDataRepository<PostStateModel> {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
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
        });
      }));
  }

  @Computed()
  public get getPost(): any {
    return this.snapshot.posts;
  }

  @DataAction()
  createPost(@Payload('body') body: any): Observable<Post> {
    return this.apiService.createPost(body).pipe(
      tap(post => this.setLocalPost(post)
        .subscribe(() => this.router.navigate(['list']))));
  }

  @DataAction()
  updatePost(
    @Payload('id') id: number,
    @Payload('body') body: any
  ): Observable<Post> {
    return this.apiService.updatePost(id, body).pipe(
      tap(post => this.updateLocalPosts(id, post)
      .subscribe(() => this.router.navigate(['list']))));
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

  private setLocalPost(post: Post): Observable<Post[]> {
    let currentLocalPosts: Post[] = [];
    return this.getLocalPosts().pipe(tap(postsList => {
      currentLocalPosts = postsList;
      const updatedPosts = [...currentLocalPosts, post]
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }));
  }

  private updateLocalPosts(id: number, post: Post) {
    let localPosts:Post[] = [];
    return this.getLocalPosts().pipe(tap(postsList => {
      localPosts = postsList;
      const updatedPostIndex = localPosts.findIndex(post => post.id === id);
      localPosts[updatedPostIndex] = post;
      localStorage.setItem('posts', JSON.stringify(localPosts))
    }));
  }

}