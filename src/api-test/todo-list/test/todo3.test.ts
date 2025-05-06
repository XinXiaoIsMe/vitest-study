import { useTodoStore } from '@/store/todo';
import { createPinia, setActivePinia } from 'pinia';
import { mockAddTodo, mockGetTodo, mockRemoveTodo } from '../mocks/handlers';
import { server } from '../mocks/server';

describe('todo list', () => {
  it('should add todo', async () => {
    server.use(mockAddTodo());
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    const title = 'study vitest';
    await todoStore.addTodo(title);
    expect(todoStore.todoList[0].title).toBe(title);
  });

  it('should remove todo', async () => {
    server.use(mockAddTodo(), mockRemoveTodo());
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    const title = 'study vitest';
    const todo = await todoStore.addTodo(title);

    await todoStore.removeTodo(todo!.id);
    expect(todoStore.todoList.length).toBe(0);
  });

  it('should get todos', async () => {
    const todoList = [
      {
        id: 1,
        title: 'study vitest',
        completed: false,
      },
    ];
    server.use(mockGetTodo(todoList));
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    await todoStore.initTodoList();
    expect(todoStore.todoList[0].title).toBe(todoList[0].title);
  });
});
