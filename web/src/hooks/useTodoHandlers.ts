import { useState, useEffect } from 'react';
import { Todo } from '@/app/lib/types';
import * as todoApi from '@/app/api/todoApi';
import { setupTodoEchoListeners } from '@/utils/todoListeners';
import { createTodoHandlers } from '@/utils/todoHandlers'; 

export function useTodoHandlers() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo =>
    filter === 'active' ? !todo.completed :
    filter === 'completed' ? todo.completed : true
  );
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const fetchTodos = async () => {
    const data = await todoApi.fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
    setupTodoEchoListeners(setTodos, fetchTodos);
    return () => window?.Echo?.leave('todos');
  }, []);

  const {
    handleAdd,
    handleDelete,
    toggleComplete,
    handleEdit,
    handleEditSave,
    handleDragEnd,
  } = createTodoHandlers({
    todos,
    setTodos,
    newTodo,
    setNewTodo,
    setEditingId,
    editedTitle,
    setEditedTitle,
    fetchTodos,
  });

  return {
    todos,
    newTodo,
    setNewTodo,
    editingId,
    editedTitle,
    setEditedTitle,
    setEditingId,
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
  };
}