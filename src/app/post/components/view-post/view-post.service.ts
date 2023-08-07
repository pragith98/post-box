import { Injectable } from "@angular/core";
import { Post } from "src/app/types";
import { PostState } from 'src/app/store';

@Injectable()
export class ViewPostService {

    constructor(private postState: PostState) { }

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