export interface Todo {
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: Date;
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  OVERDUE = "OVERDUE",
}
