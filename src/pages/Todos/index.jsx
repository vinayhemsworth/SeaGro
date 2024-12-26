import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaTrash, FaPlus, FaRegEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("Low");
  const [theme, setTheme] = useState("light");

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false, priority },
    ]);
    setNewTodo("");
    toast.success("Task added!");
  };

  // Toggle todo completion
  const toggleCompletion = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.info("Task deleted.");
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={classNames(
        "min-h-screen px-4 sm:px-6 lg:px-8 py-8",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      <ToastContainer />
      <button
        onClick={toggleTheme}
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
      <h1 className="text-3xl font-bold">Advanced To-do List</h1>
      <p className="mt-4">Manage your tasks with efficiency and style.</p>

      {/* Input section */}
      <div className="mt-6 flex items-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          placeholder="Enter new task"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="ml-3 px-4 py-2 border rounded-md focus:outline-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={addTodo}
          className="ml-3 px-6 py-2 bg-blue-500 text-white rounded-md focus:outline-none flex items-center space-x-2"
        >
          <FaPlus /> <span>Add Task</span>
        </button>
      </div>

      {/* Todo list */}
      <ul className="mt-6 space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
                className="w-5 h-5"
              />
              <span
                className={classNames(
                  "flex-1",
                  todo.completed ? "line-through text-gray-500" : ""
                )}
              >
                {todo.text}
              </span>
              <span
                className={classNames(
                  "px-2 py-1 text-sm rounded",
                  todo.priority === "High"
                    ? "bg-red-500 text-white"
                    : todo.priority === "Medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-white"
                )}
              >
                {todo.priority}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {/* Calendar */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Calendar</h2>
        <Calendar className="shadow-md rounded" />
      </div>
    </div>
  );
}
