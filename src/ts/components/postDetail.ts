import { Post } from '../models/post';
import { User } from '../models/user';
import { EventBus } from '../utils/eventBus';

export class PostDetail {
    private element: HTMLElement;
    private post: Post | null = null;
    private user: User | null = null;
    private eventBus: EventBus;
    
    constructor(elementId: string, eventBus: EventBus) {
        this.element = document.getElementById(elementId) as HTMLElement;
        this.eventBus = eventBus;
        
        if (!this.element) {
            throw new Error(`Element with ID "${elementId}" not found.`);
        }
    }
    
    public setPost(post: Post): void {
        this.post = post;
        this.render();
        this.eventBus.emit('loadComments', post.id);
    }
    
    public setUser(user: User): void {
        this.user = user;
        this.renderUserInfo();
    }
    
    private render(): void {
        if (!this.post) {
            this.element.innerHTML = `
                <div class="welcome-message">
                    <h2>Welcome to the Blog Explorer</h2>
                    <p>Select a post from the sidebar to view details</p>
                </div>
            `;
            return;
        }
        
        this.element.innerHTML = `
            <article class="post-content fade-in">
                <h2>${this.post.formattedTitle}</h2>
                <div class="post-body">
                    ${this.post.formattedBody}
                </div>
            </article>
        `;
        
        // Show comments section
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection) {
            commentsSection.style.display = 'block';
        }
        
        // Show user info section
        const userInfoSection = document.getElementById('user-info');
        if (userInfoSection) {
            userInfoSection.style.display = 'block';
        }
    }
    
    private renderUserInfo(): void {
        const userDetailElement = document.getElementById('user-detail');
        
        if (!userDetailElement || !this.user) {
            return;
        }
        
        userDetailElement.innerHTML = `
            <div class="user-card fade-in">
                <h4>${this.user.name}</h4>
                <p><span class="label">Username:</span> @${this.user.username}</p>
                <p><span class="label">Email:</span> ${this.user.email}</p>
                <p><span class="label">Phone:</span> ${this.user.formattedPhone}</p>
                <p><span class="label">Website:</span> <a href="${this.user.websiteUrl}" target="_blank">${this.user.website}</a></p>
            </div>
            <div class="user-card fade-in">
                <h4>Company</h4>
                <p><span class="label">Name:</span> ${this.user.company.name}</p>
                <p><span class="label">Catch Phrase:</span> "${this.user.company.catchPhrase}"</p>
                <p><span class="label">BS:</span> ${this.user.company.bs}</p>
            </div>
        `;
    }
}