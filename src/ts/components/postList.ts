import { Post } from '../models/post';
import { EventBus } from '../utils/eventBus';

export class PostList {
    private element: HTMLElement;
    private posts: Post[] = [];
    private selectedPostId: number | null = null;
    private eventBus: EventBus;
    
    constructor(elementId: string, eventBus: EventBus) {
        this.element = document.getElementById(elementId) as HTMLElement;
        this.eventBus = eventBus;
        
        if (!this.element) {
            throw new Error(`Element with ID "${elementId}" not found.`);
        }
    }
    
    public setPosts(posts: Post[]): void {
        this.posts = posts;
        this.render();
    }
    
    public setSelectedPostId(postId: number): void {
        this.selectedPostId = postId;
        this.updateActiveState();
    }
    
    private render(): void {
        this.element.innerHTML = '';
        
        this.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = `post-item ${post.id === this.selectedPostId ? 'active' : ''}`;
            postElement.dataset.postId = post.id.toString();
            
            postElement.innerHTML = `
                <h3>${post.formattedTitle}</h3>
                <p>${post.summary}</p>
            `;
            
            postElement.addEventListener('click', () => {
                this.eventBus.emit('postSelected', post);
                this.setSelectedPostId(post.id);
            });
            
            this.element.appendChild(postElement);
        });
    }
    
    private updateActiveState(): void {
        const postItems = this.element.querySelectorAll('.post-item');
        
        postItems.forEach(item => {
            const postId = Number(item.getAttribute('data-post-id'));
            
            if (postId === this.selectedPostId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}