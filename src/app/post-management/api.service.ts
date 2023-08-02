import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {
  ApiProviderService,
  Endpoint
} from 'src/app/core';
import {
  Observable,
  map
} from 'rxjs';

interface ApiResponse {
  limit: number,
  posts: Post[],
  skip: number,
  total: number
}

@Injectable()
export class ApiService {

  constructor(private apiProvider: ApiProviderService) { }

  /**
   * Retrieves post data by calling API.
   * @returns {Observable<Post[]>}
   */
  getPosts(): Observable<Post[]> {
    return this.apiProvider.get<ApiResponse>(Endpoint.getPosts).pipe(map(
      response => response.posts));
  }

  /**
   * Create post by calling API with provided data and retrieve created post 
   * @param body 
   * @returns {Observable<Post>}
   */
  createPost(body: any): Observable<Post> {
    return this.apiProvider.post<any>(
        Endpoint.createPost, 
        body
      );
  }

  /**
   * Update post by calling API with provided data and retrieve updated post.
   * @param id 
   * @param body 
   * @returns {Observable<Post>}
   */
  updatePost(id: number, body: any): Observable<Post> {
    return this.apiProvider.update<any>(
      Endpoint.updatePost(id),
      body
    );
  }

  /**
   * Delete post by calling API with provided post ID.
   * @param id 
   * @returns {Observable<Post>}
   */
  deletePost(id: number): Observable<Post> {
    return this.apiProvider.delete<Post>(Endpoint.deletePost(id));
  }
}