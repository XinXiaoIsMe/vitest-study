import type { Todo } from './todo';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export function fetchTodoList() {
  return axios.get<Todo[]>('/api/todos');
}

export function addTodoApi(title: string) {
  return axios.post<Todo>('/api/todos', { title });
}

export function removeTodoApi(id: number) {
  return axios.delete(`/api/todos/${id}`);
}
