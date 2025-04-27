import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '../todo'
import { fetchTodoList, addTodoApi, removeTodoApi } from '@/api'

export const useTodoStore = defineStore('todo-list', () => {
  const todoList = ref<Todo[]>([])
  const title = ref('')

  const initTodoList = async () => {
    const res = await fetchTodoList()
    todoList.value = res.data
  }

  const addTodo = async (title: string) => {
    if (!title) return;
    const res = await addTodoApi(title)
    todoList.value.push(res.data)
    clearTitle()
  }

  const removeTodo = async (id: number) => {
    if (!id) return;
    await removeTodoApi(id)
    todoList.value = todoList.value.filter(todo => todo.id !== id)
  }

  const clearTitle = () => {
    title.value = ''
  }

  return {
    todoList,
    title,
    initTodoList,
    addTodo,
    removeTodo
  }
})
