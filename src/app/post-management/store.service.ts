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
    return this.loadPosts().pipe(
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
      tap(post => {
        const updatedPosts = [...this.getLocalPosts(), post]
        return this.setLocalPosts(updatedPosts)
          .subscribe(() => this.router.navigate(['list']));
      }));
  }

  @DataAction()
  updatePost(
    @Payload('id') id: number,
    @Payload('body') body: any
  ): Observable<Post> {
    return this.apiService.updatePost(id, body).pipe(
      tap(post => {
        let localPosts = this.getLocalPosts();
        const updatedPostIndex = localPosts
          .findIndex(localPost => localPost.id === id);
        localPosts[updatedPostIndex] = post;
        return this.setLocalPosts(localPosts)
          .subscribe(() => this.router.navigate(['list']));
      }));
  }

  @DataAction()
  deletePost(@Payload('id') id: number): Observable<Post> {
    return this.apiService.deletePost(id).pipe(
      tap(() => {
        const updatedPosts = this.getLocalPosts()
          .filter(localPost => localPost.id !== id);
        return this.setLocalPosts(updatedPosts)
          .subscribe(() => this.router.navigate(['list']));
      }));
  }

  private haveFetched(): boolean {
    return this.getLocalPosts().length > 0;
  }

  private fetchPosts(): Observable<Post[]> {
    return this.apiService.getAllPosts().pipe(tap(postsList =>
      this.setLocalPosts(postsList)));
  }

  private loadPosts(): Observable<Post[]> {
    if (this.haveFetched()) {
      return of(this.getLocalPosts());
    }
    return this.fetchPosts();
  }

  getLocalPosts(): Post[] {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  }

  setLocalPosts(posts: any): Observable<Post[]> {
    localStorage.setItem('posts', JSON.stringify(posts));
    return of (this.getLocalPosts());
  }

}