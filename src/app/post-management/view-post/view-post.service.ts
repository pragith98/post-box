import { Injectable } from "@angular/core";
import { 
    PostState, 
    Post 
} from "src/app/post-management";

@Injectable()
export class ViewPostService {

    constructor(private postState: PostState) {
        this.postState.setPostsToState()
    }

    /**
     * Select and retrieve post by its ID
     * @param postID 
     * @returns Post
     */
    showPost(postID: number): Post {
        const selectedPost = this.postState.getPosts
            .filter((post: Post) => post.id === postID);
        return selectedPost[0];
    }
}