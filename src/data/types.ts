export interface Todo {
    title: string;
    description: string;
    completed: boolean;
    priority: Priority,
}

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    OVERDUE = "OVERDUE" 
}