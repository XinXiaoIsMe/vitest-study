import type { Todo } from '../todo';
import { addTodoApi, fetchTodoList, removeTodoApi } from '@/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todo-list', () => {
  const todoList = ref<Todo[]>([]);
  const title = ref('');

  const initTodoList = async () => {
    const res = await fetchTodoList();
    todoList.value = res.data;
  };

  const clearTitle = () => {
    title.value = '';
  };

  const addTodo = async (title: string) => {
    if (!title)
      return;
    const res = await addTodoApi(title);
    todoList.value.push(res.data);
    clearTitle();
    return res.data;
  };

  const removeTodo = async (id: number) => {
    if (!id)
      return;
    await removeTodoApi(id);
    todoList.value = todoList.value.filter(todo => todo.id !== id);
  };

  return {
    todoList,
    title,
    initTodoList,
    addTodo,
    removeTodo,
  };
});
