export class Greeter {
    private greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    getGreeting(): string {
        return this.greeting;
    }
    
    setGreeting(message: string): void {
        this.greeting = message;
    }
}

// New utility class for application-wide notifications
export class AppNotifier {
    private static instance: AppNotifier;
    private container: HTMLElement | null = null;
    
    private constructor() {
        // Create the notification container
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.style.position = 'fixed';
        this.container.style.top = '20px';
        this.container.style.right = '20px';
        this.container.style.zIndex = '1000';
        
        document.body.appendChild(this.container);
    }
    
    public static getInstance(): AppNotifier {
        if (!AppNotifier.instance) {
            AppNotifier.instance = new AppNotifier();
        }
        return AppNotifier.instance;
    }
    
    public showNotification(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000): void {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fade-in`;
        notification.style.padding = '15px 20px';
        notification.style.margin = '10px 0';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        notification.style.transition = 'all 0.3s ease';
        
        // Set color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#d4edda';
                notification.style.color = '#155724';
                notification.style.border = '1px solid #c3e6cb';
                break;
            case 'error':
                notification.style.backgroundColor = '#f8d7da';
                notification.style.color = '#721c24';
                notification.style.border = '1px solid #f5c6cb';
                break;
            default:
                notification.style.backgroundColor = '#d1ecf1';
                notification.style.color = '#0c5460';
                notification.style.border = '1px solid #bee5eb';
        }
        
        notification.textContent = message;
        
        this.container?.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}