import { ApiClient } from './apiClient';
import { Post, IPost } from '../models/post';
import { Comment, IComment } from '../models/comment';
import { User, IUser } from '../models/user';

export class JsonPlaceholderService {
    private apiClient: ApiClient;
    private static instance: JsonPlaceholderService;
    
    private constructor() {
        this.apiClient = new ApiClient('https://jsonplaceholder.typicode.com');
    }
    
    // Singleton pattern for service
    public static getInstance(): JsonPlaceholderService {
        if (!JsonPlaceholderService.instance) {
            JsonPlaceholderService.instance = new JsonPlaceholderService();
        }
        return JsonPlaceholderService.instance;
    }
    
    async getPosts(limit: number = 10): Promise<Post[]> {
        const postsData = await this.apiClient.get<IPost[]>(`/posts?_limit=${limit}`);
        return postsData.map(postData => new Post(postData));
    }
    
    async getPost(id: number): Promise<Post> {
        const postData = await this.apiClient.get<IPost>(`/posts/${id}`);
        return new Post(postData);
    }
    
    async getCommentsByPostId(postId: number): Promise<Comment[]> {
        const commentsData = await this.apiClient.get<IComment[]>(`/posts/${postId}/comments`);
        return commentsData.map(commentData => new Comment(commentData));
    }
    
    async getUser(userId: number): Promise<User> {
        const userData = await this.apiClient.get<IUser>(`/users/${userId}`);
        return new User(userData);
    }
    
    async getUserPosts(userId: number): Promise<Post[]> {
        const postsData = await this.apiClient.get<IPost[]>(`/users/${userId}/posts`);
        return postsData.map(postData => new Post(postData));
    }
}