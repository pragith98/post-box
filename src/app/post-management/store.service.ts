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
} from '@angular-ru/ngxs/decorators'
import {
  tap,
  of,
  Observable
} from 'rxjs';
import { Router } from '@angular/router';

interface PostStateModel {
  posts: Post | Post[];
}

interface FormStateModel {
  newForm: {
    title: string;
    body: string;
  }
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

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    super()
  }

  /**
   * Retrieves posts from current state.
   */
  @Computed()
  get getPosts(): any {
    return this.snapshot.posts;
  }

  /**
   * Update the post state with retrieved data.
   */
  private updatePostState(posts: Post[]): void {
    const state = this.ctx.getState();
    this.ctx.setState({
      ...state,
      posts: posts
    });
  }

  /**
   * Fetching posts and update post state.
   */
  @DataAction()
  fetchPosts(): void {
    this.apiService.getPosts()
      .subscribe(posts =>this.setLocalPosts(posts)
        .subscribe(() => this.updatePostState(posts)));
  }

  /**
   * Check if posts are fetched by verifing the number of posts available in 
   * the local storage.
   */
  private haveFetched(): boolean {
    return this.getLocalPosts().length > 0;
  }

  /**
   * Retrieve posts data from local storage and set that data to posts state 
   * if data already has been fetched to local storage. 
   * If already not fetched, perform function to fetch post data.
   */
  @DataAction()
  getAllPosts(): void {
    if (this.haveFetched()) {
      this.updatePostState(this.getLocalPosts())
    } else this.fetchPosts();
  }

  /**
   * Performs post creation by providing post data. if creation is successful,
   * add new post to local storage and the application navigate to 'list' page.
   * @param post 
   */
  @DataAction()
  createPost(@Payload('post') post: any): void {
    this.apiService.createPost(post)
      .subscribe(newPost => {
        const updatedPosts = [...this.getLocalPosts(), newPost]
        this.setLocalPosts(updatedPosts)
          .subscribe(() => this.router.navigate(['list']));
      });
  }

  /**
   * Performs post updating by providing post id and post data. if the updating 
   * is successful, the previous post in local storage is replaced with the new
   * updated post and the application navigate to 'view' page.
   * @param id 
   * @param post 
   */
  @DataAction()
  updatePost(
    @Payload('id') id: number,
    @Payload('post') post: any
  ): void {
    this.apiService.updatePost(id, post)
      .subscribe(updatedPost => {
        const localPosts = this.getLocalPosts();
        const updatedPostIndex = localPosts
          .findIndex(localPost => localPost.id === id);
        localPosts[updatedPostIndex] = updatedPost;
        this.setLocalPosts(localPosts)
          .subscribe(() => this.router.navigate([
            id,
            'view'
          ]));
      });
  }

  /**
   * Performs post deletion by providing post id. If deletion is successful,
   * that post remove from the local storage.
   * @param id 
   * @returns {Observable<Post>}
   */
  @DataAction()
  deletePost(@Payload('id') id: number): Observable<Post> {
    return this.apiService.deletePost(id).pipe(
      tap(() => {
        const updatedPosts = this.getLocalPosts()
          .filter(localPost => localPost.id !== id);
        this.setLocalPosts(updatedPosts)
          .subscribe(() => this.router.navigate(['list']));
      }));
  }

  /**
   * Retrieve stored posts data from local storage.
   * @returns {Post[]}
   */
  private getLocalPosts(): Post[] {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  }

  /**
   * Store posts data in the local storage and return posts data.
   * @param posts 
   * @returns {Observable<Post[]>}
   */
  private setLocalPosts(posts: any): Observable<Post[]> {
    localStorage.setItem('posts', JSON.stringify(posts));
    return of (posts);
  }

}

@StateRepository()
@State<FormStateModel>({
  name: 'formData',
  defaults: {
    newForm: {
      title: '',
      body: ''
    }
  }
})

@Injectable()
export class FormState extends NgxsDataRepository<FormStateModel>{

  /**
   * Set form data state and retrieve current form data from state.
   */
  @Computed()
  get getStoredFormData(): any {
    this.setFormStateData();
    return this.snapshot.newForm
  }

  /**
   * Store form data in local storage.
   * @param formData 
   */
  @DataAction()
  addFormData(@Payload('formData') formData: any) {
    localStorage.setItem('formData',JSON.stringify(formData));
  }
 
  /**
   * Reset form data state by adding empty strings and remove stored form data
   * from local storage.
   */
  @DataAction()
  resetStoredFormData() {
    const state = this.ctx.getState();
      this.ctx.setState({
        ...state,
        newForm:{
          title: '',
          body: ''
        }
      })
    localStorage.removeItem('formData');
  }

  /**
   * Set data to formData state by retrieving stored form data from 
   * local storage if form data is avalilable in the local storage.
   */
  private setFormStateData() {
    if(localStorage.getItem('formData') !== null) {
      const formData = JSON.parse(localStorage.getItem('formData') || '')
      const state = this.ctx.getState();
      this.ctx.setState({
        ...state,
        newForm:{
          title: formData.title,
          body: formData.body
        }
      })
    }
  }

}