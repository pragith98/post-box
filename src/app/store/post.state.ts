import { Injectable } from '@angular/core';
import { Post } from 'src/app/types';
import { PostApiService } from 'src/app/apis';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  StateRepository,
  DataAction,
  Payload,
  Computed,
  Persistence
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  Observable
} from 'rxjs';
import { Router } from '@angular/router';

interface PostStateModel {
  posts: Post[];
}

@Persistence([{
  path: 'postsList',
  existingEngine: localStorage
}])
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
    private apiService: PostApiService,
    private router: Router
  ) {
    super();
  }

  /**
   * Retrieves posts from current state.
   */
  @Computed()
  get getPosts(): Post[] {
    return this.ctx.getState().posts;
  }

  /**
   * Fetch posts.
   * @returns {Observable<Post>}
   */
  @DataAction()
  fetchPosts(): Observable<Post[]> {
    return this.apiService.getPosts()
      .pipe(tap(posts =>
        this.ctx.setState({
          posts: posts
        })));
  }

  /**
   * Check if posts are fetched by verifing the number of posts available in 
   * the state.
   * @returns {boolean}
   */
  private haveFetched(): boolean {
    return this.ctx.getState().posts.length > 0;
  }

  /**
   * Retrieve posts data from local storage and set that data to posts state 
   * if data already has been fetched to local storage. 
   * If already not fetched, perform function to fetch post data.
   */
  @DataAction()
  getAllPosts(): void {
    if (!this.haveFetched()) {
      this.fetchPosts();
    }
  }

  /**
   * Performs post creation by providing post data. if creation is successful,
   * add new post to the state and the application navigate to 'list' page.
   * @param post 
   * @returns {Observable<Post>}
   */
  @DataAction()
  createPost(@Payload('post') post: any): Observable<Post> {
    return this.apiService.createPost(post)
      .pipe(tap(newPost => {
        const currentState = this.ctx.getState().posts;
        this.ctx.patchState({
          posts: [
            ...currentState, 
            newPost
          ]
        });
        this.router.navigate(['list']);
      }));
  }

  /**
   * Performs post updating by providing post id and post data. if the updating 
   * is successful, the previous post in state is replaced with the new
   * updated post and the application navigate to 'view' page.
   * @param id 
   * @param post 
   * @returns {Observable<Post>}
   */
  @DataAction()
  updatePost(
    @Payload('id') id: number,
    @Payload('post') post: any
  ): Observable<Post> {
    return this.apiService.updatePost(id, post)
      .pipe(tap(updatedPost => {
        const currentState = this.ctx.getState().posts;
        const updatedPostsList = currentState.map(
          post => post.id === id ? {...post,...updatedPost} : post);
        this.ctx.patchState({
          posts: updatedPostsList
        });
          
        this.router.navigate([
          id,
          'view'
        ]);
      }));
  }

  /**
   * Performs post deletion by providing post id. If deletion is successful,
   * that post remove from the state.
   * @param id 
   * @returns {Observable<Post>}
   */
  @DataAction()
  deletePost(@Payload('id') id: number): Observable<Post> {
    return this.apiService.deletePost(id).pipe(
      tap(() => {
          const currentState = this.ctx.getState().posts;
          this.ctx.setState({
            posts: currentState.filter(post => post.id !== id)
          });
          this.router.navigate(['list']);
      }));
  }

}
