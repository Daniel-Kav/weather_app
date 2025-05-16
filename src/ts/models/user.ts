export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export class User implements IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    
    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.address = data.address;
        this.phone = data.phone;
        this.website = data.website;
        this.company = data.company;
    }
    
    get fullAddress(): string {
        return `${this.address.street}, ${this.address.suite}, ${this.address.city}, ${this.address.zipcode}`;
    }
    
    get websiteUrl(): string {
        if (this.website.startsWith('http')) {
            return this.website;
        }
        return `http://${this.website}`;
    }
    
    get formattedPhone(): string {
        // Simple formatting, could be improved with regex
        return this.phone.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
}