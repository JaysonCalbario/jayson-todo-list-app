import '../utils/css/global.css';
import { TodoInputProps as Prop } from '@/app/lib/types';
  
 function TodoInput({ newTodo, setNewTodo, handleAdd }: Prop) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
    <input
      value={newTodo}
      onChange={e => setNewTodo(e.target.value)}
      placeholder="What needs to be done?"
      className="border px-4 py-3 rounded w-full placeholder:italic placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b83f45] border-gray-300 text-base"
    />
    <button
      onClick={handleAdd}
      className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 w-full sm:w-auto"
    >
      Add
    </button>
  </div>
  );
  }


  export default TodoInput;
  