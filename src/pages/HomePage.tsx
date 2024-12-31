import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Loader } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';

const HomePage: React.FC = () => {
  const { todos, updateTodo, loading, error } = useTodo();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Todo Application
        </h1>
        <Link
          to="/add"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Task
        </Link>
      </div>
      
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center p-8 bg-blue-50 rounded-lg">
            <p className="text-blue-600 font-medium">No todos yet! Add your first task.</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={updateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;