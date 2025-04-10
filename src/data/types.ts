export interface Todo {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  OVERDUE = "OVERDUE",
}
