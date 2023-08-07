export class Endpoint { 
    /**
     * post endpoints
     */
    static getPosts = 'posts';
    static createPost = 'posts/add';

    static updatePost(id: number): string {
        return `posts/${id}`;
    }

    static deletePost(id: number): string {
        return `posts/${id}`;
    }


    /**
     * user endpoints
     */
    static loginUser = 'auth/login';
}