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

  getAllPosts(): Observable<Post[]> {
    return this.apiProvider.get<ApiResponse>(Endpoint.getPosts).pipe(map(
      response => response.posts));
  }
}