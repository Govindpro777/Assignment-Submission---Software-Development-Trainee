import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Todo, TodoContextType } from '../types/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const todosWithDescription = response.data.slice(0, 10).map((todo: Todo) => ({
        ...todo,
        description: 'Sample description for the task.' // Adding description since the API doesn't provide it
      }));
      setTodos(todosWithDescription);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch todos');
      setLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        description,
        completed: false,
        userId: 1,
      });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id: number, completed: boolean) => {
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed,
      });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};