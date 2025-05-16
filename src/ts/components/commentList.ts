import { Comment } from '../models/comment';

export class CommentList {
    private element: HTMLElement;
    private comments: Comment[] = [];
    
    constructor(elementId: string) {
        this.element = document.getElementById(elementId) as HTMLElement;
        
        if (!this.element) {
            throw new Error(`Element with ID "${elementId}" not found.`);
        }
    }
    
    public setComments(comments: Comment[]): void {
        this.comments = comments;
        this.render();
    }
    
    private render(): void {
        this.element.innerHTML = '';
        
        if (this.comments.length === 0) {
            this.element.innerHTML = '<p class="no-comments">No comments found for this post.</p>';
            return;
        }
        
        this.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item fade-in';
            
            commentElement.innerHTML = `
                <div class="comment-email">${comment.email}</div>
                <div class="comment-body">${comment.formattedBody}</div>
            `;
            
            this.element.appendChild(commentElement);
        });
    }
}