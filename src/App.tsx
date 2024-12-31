import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';

function App() {
  return (
    <Router>
      <TodoProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTaskPage />} />
          </Routes>
        </div>
      </TodoProvider>
    </Router>
  );
}

export default App;