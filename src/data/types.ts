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

export interface TodoPatchRequest {
  todoId: string;
  updatedTodo: Partial<Todo>;
}

export interface InputFieldState {
  value: string;
  hasError: boolean;
  errorMessage: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}
