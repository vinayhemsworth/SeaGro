import React, { useState } from 'react';

export function Todos() {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return; // Prevent adding empty tasks
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo(""); // Reset input after adding
  };

  // Toggle todo completion
  const toggleCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold">To-do List</h1>
      <p className="mt-4">Manage your personal tasks efficiently.</p>

      {/* Input section to add a new todo */}
      <div className="mt-6 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          placeholder="Enter new task"
        />
        <button
          onClick={addTodo}
          className="ml-3 px-6 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
        >
          Add Task
        </button>
      </div>

      {/* Todo list display */}
      <ul className="mt-6 space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
              className="w-5 h-5"
            />
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
