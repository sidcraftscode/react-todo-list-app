// TodoItem.js
import React from 'react';

const TodoItem = ({ item, onToggle, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg w-full p-2 flex items-center justify-between">
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="rounded border-gray-300 shadow-sm p-2" 
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />
        <p className={`ml-3 ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.text}</p>
      </div>
      <div>
        <button onClick={onEdit} className="ml-2 text-cyan-500 text-sm">Edit</button>
        <button onClick={onDelete} className="ml-2 text-red-500 text-sm">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
