export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export class Post implements IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
    
    constructor(data: IPost) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
        this.body = data.body;
    }
    
    get summary(): string {
        return this.body.substring(0, 50) + (this.body.length > 50 ? '...' : '');
    }
    
    get formattedTitle(): string {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
    
    get formattedBody(): string {
        return this.body
            .split('\n')
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
    }
}