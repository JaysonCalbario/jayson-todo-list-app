'use client';

import '../utils/echo';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import { useSensor, useSensors, PointerSensor, DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTodoHandlers } from '../hooks/useTodoHandlers';


function TodoList() {
  const {
    newTodo,
    setNewTodo,
    editingId,
    editedTitle,
    setEditedTitle,
    filter,
    setFilter,
    filteredTodos,
    itemsLeft,
    handleAdd,
    handleDelete,
    toggleComplete,
    handleEdit,
    handleEditSave,
    handleDragEnd,
  } = useTodoHandlers();

  const sensors = useSensors(useSensor(PointerSensor));

  const uniqueFilteredTodos = [
    ...new Map(filteredTodos.map(todo => [todo.id, todo])).values(),
  ];

  return (
    <div className="p-4 max-w-4xl w-full mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
        <span className="text-[#b83f45]">📝 Jayson</span>TODO
      </h1>

      <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} handleAdd={handleAdd} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext  items={uniqueFilteredTodos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
            <ul>
              {uniqueFilteredTodos.map(todo => (
                <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editingId={editingId}
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                handleEditSave={handleEditSave}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        <div className="flex  mb-5 flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
          <span className="text-gray-900 text-md">
            {itemsLeft === 0 ? 'No items left' : `${itemsLeft} item${itemsLeft > 1 ? 's' : ''} left`}
          </span>

          <div className="flex gap-3 mt-2 sm:mt-0">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as 'all' | 'active' | 'completed')}
                className={`text-sm px-3 py-1 rounded border ${
                  filter === f
                    ? 'border-[#b83f45] text-[#b83f45] font-semibold'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
