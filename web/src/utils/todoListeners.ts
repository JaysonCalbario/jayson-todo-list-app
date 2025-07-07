import { Todo } from '@/app/lib/types';

export const setupTodoEchoListeners = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  fetchTodos: () => Promise<void>
) => {
  if (!window?.Echo) return;

  window.Echo.channel('todos')
    .listen('.TodoCreated', (e: { todo: Todo }) => {
      setTodos(prev => {
        const exists = prev.some(t => t.id === e.todo.id);
        return exists ? prev : [...prev, e.todo];
      });
    })
    .listen('.TodoUpdated', (e: { todo: Todo }) => {
      setTodos(prev =>
        prev.map(todo => (todo.id === e.todo.id ? e.todo : todo))
      );
    })
    .listen('.TodoDeleted', (e: { todoId: number }) => {
      setTodos(prev => prev.filter(todo => todo.id !== e.todoId));
    })
    .listen('.TodoOrderUpdated', (e: { ids: number[] }) => {
      setTodos(prev => {
        const map = new Map(prev.map(todo => [todo.id, todo]));
        const reordered = e.ids.map(id => map.get(id)).filter(Boolean);
        if (reordered.length !== e.ids.length) {
          fetchTodos();
          return prev;
        }
        return reordered as Todo[];
      });
    });
};
