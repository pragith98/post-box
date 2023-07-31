import { Injectable } from "@angular/core";
import { PostState } from "../store.service";
import { Post } from "../post.model";

@Injectable()
export class ViewPostService {

    constructor(private postState: PostState) {
        this.postState.getAllPosts()
    }

    showPost(postID: number): Post {
        const selectedPost = this.postState.getPost
            .filter((post: Post) => post.id === postID);
        return selectedPost[0];
    }
}