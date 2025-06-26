import { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from '../components/TodoList';
import { useToast } from '../components/ToastProvider';

export function useTodoHandlers() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const toast = useToast();

  const filteredTodos = todos.filter(todo =>
    filter === 'active' ? !todo.completed :
    filter === 'completed' ? todo.completed : true
  );

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    fetchTodos();

    if (window?.Echo) {
      window.Echo.channel('todos')
        .listen('.TodoCreated', (e: any) => {
          setTodos(prev => [...prev, e.todo]);
        })
        .listen('.TodoUpdated', (e: any) => {
          setTodos(prev =>
            prev.map(todo => (todo.id === e.todo.id ? e.todo : todo))
          );
        })
        .listen('.TodoDeleted', (e: any) => {
          setTodos(prev => prev.filter(todo => todo.id !== e.todoId));
        })
        .listen('.TodoOrderUpdated', (e: any) => {
          const map = new Map(todos.map(todo => [todo.id, todo]));
          const reordered = e.ids.map((id: number) => map.get(id)).filter(Boolean);
          if (reordered.length !== e.ids.length) {
            fetchTodos();
            return;
          }
          setTodos(reordered as Todo[]);
        });
    }

    return () => {
      window?.Echo?.leave('todos');
    };
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, { title: newTodo });
      toast('✅ Todo added!');
      setNewTodo('');
    } catch {
      toast('❌ Failed to add todo', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`);
      toast('🗑️ Todo deleted!');
    } catch {
      toast('❌ Failed to delete todo', 'error');
      fetchTodos();
    }
  };

  const toggleComplete = async (todo: Todo) => {
    const updated = { ...todo, completed: !todo.completed };
    setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, {
        completed: updated.completed,
      });
    } catch {
      toast('❌ Failed to update status', 'error');
      fetchTodos();
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleEditSave = async (todo: Todo) => {
    if (!editedTitle.trim()) return;
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, {
        title: editedTitle,
      });
      const updated = res.data;
      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      setEditingId(null);
      setEditedTitle('');
      toast('✏️ Todo updated!');
    } catch {
      toast('❌ Failed to update todo', 'error');
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex(todo => todo.id === active.id);
    const newIndex = todos.findIndex(todo => todo.id === over.id);
    const newOrder = [...todos];
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);
    setTodos(newOrder);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/reorder`, {
        ids: newOrder.map(todo => todo.id),
      });
    } catch {
      toast('❌ Failed to reorder todos', 'error');
    }
  };

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
