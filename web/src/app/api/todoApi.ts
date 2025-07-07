import axios from 'axios';
import { Todo } from '@/app/lib/types';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
  return res.data;
};

export const addTodo = async (title: string) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, { title });
};

export const deleteTodo = async (id: number) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`);
};

export const updateTodo = async (id: number, data: Partial<Todo>) => {
  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, data);
};

export const reorderTodos = async (ids: number[]) => {
  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/reorder`, { ids });
};
