export interface IComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export class Comment implements IComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
    
    constructor(data: IComment) {
        this.id = data.id;
        this.postId = data.postId;
        this.name = data.name;
        this.email = data.email;
        this.body = data.body;
    }
    
    get formattedBody(): string {
        return this.body.charAt(0).toUpperCase() + this.body.slice(1);
    }
    
    get shortEmail(): string {
        return this.email.split('@')[0];
    }
}