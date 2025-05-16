import { JsonPlaceholderService } from './api/jsonPlaceholderService';
import { Post } from './models/post';
// import { Comment } from './models/comment';
// import { User } from './models/user';
import { PostList } from './components/postList';
// import { PostDetail } from './components/postDetail';
import { CommentList } from './components/commentList';
import { EventBus } from './utils/eventBus';
import { PostDetail } from './components/postDetail';

// First, let's make sure the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize our event bus
    const eventBus = EventBus.getInstance();
    
    // Initialize our service
    const apiService = JsonPlaceholderService.getInstance();
    
    // Initialize our UI components
    const postList = new PostList('posts-list', eventBus);
    const postDetail = new PostDetail('post-detail', eventBus);
    const commentList = new CommentList('comments-list');
    
    // Loading indicators
    const postsLoading = document.getElementById('posts-loading');
    const commentsLoading = document.getElementById('comments-loading');
    const userLoading = document.getElementById('user-loading');
    
    // Event listeners setup
    eventBus.on('postSelected', async (post: Post) => {
        // Show the post details
        postDetail.setPost(post);
        
        // Show loading indicators
        if (commentsLoading) commentsLoading.style.display = 'block';
        if (userLoading) userLoading.style.display = 'block';
        
        try {
            // Fetch user details in parallel with comments
            const userPromise = apiService.getUser(post.userId);
            const commentsPromise = apiService.getCommentsByPostId(post.id);
            
            // Wait for both to complete
            const [user, comments] = await Promise.all([userPromise, commentsPromise]);
            
            // Update UI components
            postDetail.setUser(user);
            commentList.setComments(comments);
        } catch (error) {
            console.error('Error loading post details:', error);
            alert('Failed to load post details. Please try again.');
        } finally {
            // Hide loading indicators
            if (commentsLoading) commentsLoading.style.display = 'none';
            if (userLoading) userLoading.style.display = 'none';
        }
    });
    
    eventBus.on('loadComments', async (postId: number) => {
        if (commentsLoading) commentsLoading.style.display = 'block';
        
        try {
            const comments = await apiService.getCommentsByPostId(postId);
            commentList.setComments(comments);
        } catch (error) {
            console.error('Error loading comments:', error);
        } finally {
            if (commentsLoading) commentsLoading.style.display = 'none';
        }
    });
    
    // Initial data loading
    try {
        // Show loading state
        if (postsLoading) postsLoading.style.display = 'block';
        
        // Load initial posts
        const posts = await apiService.getPosts(20);
        postList.setPosts(posts);
        
        // Select the first post if available
        if (posts.length > 0) {
            eventBus.emit('postSelected', posts[0]);
            postList.setSelectedPostId(posts[0].id);
        }
    } catch (error) {
        console.error('Error loading initial data:', error);
        alert('Failed to load posts. Please refresh the page and try again.');
    } finally {
        // Hide loading state
        if (postsLoading) postsLoading.style.display = 'none';
    }
});