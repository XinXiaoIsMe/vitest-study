import type { Todo } from '@/todo';
import type { AxiosResponse } from 'axios';
import { addTodoApi, fetchTodoList, removeTodoApi } from '@/api';
import { useTodoStore } from '@/store/todo';
import { createPinia, setActivePinia } from 'pinia';

describe('todo list', () => {
  vi.mock('@/api');

  it('should add todo', async () => {
    vi.mocked(addTodoApi).mockImplementation((title: string): any => {
      return Promise.resolve({
        data: {
          id: 1,
          title,
          completed: false,
        },
      });
    });
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    const title = 'study vitest';
    await todoStore.addTodo(title);
    expect(todoStore.todoList[0].title).toBe(title);
  });

  it('should remove todo', async () => {
    vi.mocked(addTodoApi).mockImplementation((title: string): any => {
      return Promise.resolve({
        data: {
          id: 1,
          title,
          completed: false,
        },
      });
    });

    vi.mocked(removeTodoApi).mockImplementation((_id: number): any => {
      return Promise.resolve();
    });
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    const title = 'study vitest';
    const todo = await todoStore.addTodo(title);

    await todoStore.removeTodo(todo!.id);
    expect(todoStore.todoList.length).toBe(0);
  });

  it('should get todos', async () => {
    const todoList: Todo[] = [
      {
        id: 1,
        title: 'study vitest',
        completed: false,
      },
    ];
    vi.mocked(fetchTodoList).mockResolvedValue({
      data: todoList,
    } as AxiosResponse);
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    await todoStore.initTodoList();
    expect(todoStore.todoList[0].title).toBe('study vitest');
  });
});
