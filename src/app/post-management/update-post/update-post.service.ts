import { Injectable } from '@angular/core';
import { 
    Post, 
    PostState 
} from 'src/app/post-management';

@Injectable()
export class UpdatePostService {
    
    constructor(private postState: PostState) {
        this.postState.setPostsToState()
    }

    showPost(postID: number): Post {
        const selectedPost = this.postState.getPosts
            .filter((post: Post) => post.id === postID);
        return selectedPost[0];
    }
}