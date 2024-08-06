// TodoList.js
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.error('Stored todos is not an array:', parsedTodos);
        }
      }
    } catch (error) {
      console.error('Failed to load todos from local storage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to local storage:', error);
    }
  }, [todos]);

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setTodos([...todos, { id: Date.now(), text: e.target.value, completed: false }]);
      e.target.value = '';
    }
  };

  const handleEdit = (id) => {
    const newText = prompt('Edit your task:', todos.find(todo => todo.id === id)?.text || '');
    if (newText !== null && newText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  return (
    <div className="p-4 bg-white shadow sm:my-24 md:my-48 rounded-xl m-2 mx-auto max-w-sm flex flex-col space-y-2">
      <input
        type="text"
        className="placeholder:text-gray-300 border border-gray-300 rounded-lg w-full p-2 flex items-center focus:border-green-500 focus:ring-4 focus:ring-green-100"
        placeholder="Press ⏎ to add new task"
        onKeyDown={handleAddTodo}
      />
      <p className="text-sm pt-4 block">To-do</p>
      {todos.filter(todo => !todo.completed).map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          onToggle={handleToggle}
          onEdit={() => handleEdit(todo.id)}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
      <p className="text-sm pt-4 block">Completed item</p>
      {todos.filter(todo => todo.completed).map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          onToggle={handleToggle}
          onEdit={() => handleEdit(todo.id)}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
