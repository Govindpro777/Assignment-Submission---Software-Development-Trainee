import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        className="mr-3 mt-1 text-blue-500 hover:text-blue-600 flex-shrink-0"
      >
        {todo.completed ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>
      <div className="flex-1">
        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`mt-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {todo.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoItem;