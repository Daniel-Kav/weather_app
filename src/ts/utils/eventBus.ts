type EventHandler = (...args: any[]) => void;

export class EventBus {
    private events: Map<string, EventHandler[]>;
    private static instance: EventBus;
    
    private constructor() {
        this.events = new Map<string, EventHandler[]>();
    }
    
    // Singleton pattern for event bus
    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    
    // Subscribe to an event
    public on(event: string, handler: EventHandler): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.push(handler);
        }
    }
    
    // Unsubscribe from an event
    public off(event: string, handler: EventHandler): void {
        if (!this.events.has(event)) {
            return;
        }
        
        const handlers = this.events.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    // Emit an event with optional arguments
    public emit(event: string, ...args: any[]): void {
        if (!this.events.has(event)) {
            return;
        }
        
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                handler(...args);
            });
        }
    }
}