import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../utils/css/global.css';
import { TodoItemProps as Props } from '@/app/lib/types';

function TodoItem({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
  editingId,
  editedTitle,
  setEditedTitle,
  handleEditSave,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
    ref={setNodeRef}
    style={style}
    className="border-b last:border-b-0 border-gray-200 px-4 py-3 w-full flex flex-col sm:flex-row sm:items-start justify-between"
  >
      {/* Top Section: Drag handle + Checkbox + Title */}
      <div className="flex flex-1 gap-3">
        {/* Drag + Checkbox */}
        <div className="flex items-start sm:items-center gap-2 pt-1 sm:pt-0">
          <div className="text-gray-400 cursor-grab" {...attributes} {...listeners}>
            ⠿
          </div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo)}
            className="mt-1 sm:mt-0"
          />
        </div>

        {/* Title or Edit */}
        {editingId === todo.id ? (
          <div className="flex flex-col gap-2 w-full">
            <textarea
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full resize-none text-sm sm:text-base"
              rows={3}
            />
            <button
              onClick={() => handleEditSave(todo)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm sm:text-base self-start"
            >
              Save
            </button>
          </div>
        ) : (
          <span
            className={`text-base sm:text-lg w-full break-words whitespace-pre-wrap break-all ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 self-end sm:self-start">
        <button
          onClick={() => handleEdit(todo)}
          className="text-yellow-500 hover:text-yellow-600 text-xl"
        >
          📝
        </button>
        <button
          onClick={() => handleDelete(todo.id)}
          className="text-red-500 hover:text-red-600 text-xl"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
