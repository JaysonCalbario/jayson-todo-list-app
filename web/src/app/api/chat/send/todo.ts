import axios from 'axios';
import { Todo } from '@/app/lib/types';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
  return response.data;
};