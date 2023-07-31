export class Endpoint { 
    static getPosts = 'posts';

    static createPost = 'posts/add';

    static updatePost(id: number) {
        return `posts/${id}`;
    }

    static deletePost(id: number) {
        return `posts/${id}`;
    }
}