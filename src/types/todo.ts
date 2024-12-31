export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description: string) => Promise<void>;
  updateTodo: (id: number, completed: boolean) => Promise<void>;
  loading: boolean;
  error: string | null;
}