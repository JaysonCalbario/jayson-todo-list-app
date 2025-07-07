import { toast } from 'react-toastify';
import * as todoApi from '@/app/api/todoApi';
import { Todo, TodoHandlerParams} from '@/app/lib/types';

export function createTodoHandlers({
  todos,
  setTodos,
  newTodo,
  setNewTodo,
  setEditingId,
  editedTitle,
  setEditedTitle,
  fetchTodos,
}: TodoHandlerParams) {
  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    try {
      await todoApi.addTodo(newTodo);
      toast.success('Todo added!');
      setNewTodo('');
    } catch {
      toast.error('Failed to add todo');
    }
  };

  const handleDelete = async (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    try {
      await todoApi.deleteTodo(id);
      toast.success('Todo deleted!');
    } catch {
      toast.error('Failed to delete todo');
      fetchTodos();
    }
  };

  const toggleComplete = async (todo: Todo) => {
    const updated = { ...todo, completed: !todo.completed };
    setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    try {
      await todoApi.updateTodo(todo.id, { completed: updated.completed });
    } catch {
      toast.error('Failed to update status');
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
      const res = await todoApi.updateTodo(todo.id, { title: editedTitle });
      setTodos(prev => prev.map(t => (t.id === res.data.id ? res.data : t)));
      setEditingId(null);
      setEditedTitle('');
      toast.success('Todo updated!');
    } catch {
      toast.error('Failed to update todo');
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex(t => t.id === active.id);
    const newIndex = todos.findIndex(t => t.id === over.id);
    const reordered = [...todos];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    setTodos(reordered);

    try {
      await todoApi.reorderTodos(reordered.map(t => t.id));
    } catch {
      toast.error('Failed to reorder todos');
    }
  };

  return {
    handleAdd,
    handleDelete,
    toggleComplete,
    handleEdit,
    handleEditSave,
    handleDragEnd,
  };
}