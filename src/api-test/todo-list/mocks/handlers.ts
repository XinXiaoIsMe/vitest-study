import { http, HttpResponse } from 'msw'
import type { Todo } from '@/todo';

export function mockAddTodo() {
  return http.post('http://localhost:3000/api/todos', async ({ request }) => {
    const data: any = await request.json();
    return HttpResponse.json({
      id: 1,
      title: data.title,
      completed: false,
    })
  })
}

export function mockRemoveTodo() {
  return http.delete('http://localhost:3000/api/todos/:id', async () => {
    return HttpResponse.json({
      status: 204
    })
  })
}

export function mockGetTodo(todos: Todo[]) {
  return http.get('http://localhost:3000/api/todos', () => {
    return HttpResponse.json(todos)
  })
}
