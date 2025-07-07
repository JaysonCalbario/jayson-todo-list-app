

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
  toggleComplete: (todo: Todo) => void;
  handleDelete: (id: number) => void;
  handleEdit: (todo: Todo) => void;
  editingId: number | null;
  editedTitle: string;
  setEditedTitle: (val: string) => void;
  handleEditSave: (todo: Todo) => void;
};

export type TodoInputProps = {
  newTodo: string;
  setNewTodo: (val: string) => void;
  handleAdd: () => void;
};

export type ChatMessage = {
  senderId: string;
  message: string;
};

export type ChatInputProps = {
  clientId: string;
  onMessageSent: (msg: ChatMessage) => void;
};

export type TodoHandlerParams = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  newTodo: string;
  setNewTodo: (val: string) => void;
  setEditingId: (val: number | null) => void;
  editedTitle: string;
  setEditedTitle: (val: string) => void;
  fetchTodos: () => Promise<void>;
};

export type MessageItemProps = {
  msg: ChatMessage;
  clientId: string;
  index: number;
};

export type ChatMessagesProps = {
  messages: ChatMessage[];
  clientId: string;
};

export type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
};

export type ChatProps = {
  onSwitchView?: () => void;
};

export type TestEventPayload = {
  message: string;
};

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import type { Broadcaster } from 'laravel-echo';

export type CustomWindow = Window & {
  Pusher: typeof Pusher;
  Echo: Echo<keyof Broadcaster>;
};


