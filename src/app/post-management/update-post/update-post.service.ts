import { Injectable } from '@angular/core';
import { Post } from '../post.model';
import { PostState } from '../store.service';

@Injectable()
export class UpdatePostService {
    
    constructor(private postState: PostState) {
        this.postState.getAllPosts()
    }

    showPost(postID: number): Post {
        const selectedPost = this.postState.getPost
            .filter((post: Post) => post.id === postID);
        return selectedPost[0];
    }
}