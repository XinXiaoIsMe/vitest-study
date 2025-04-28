import { useTodoStore } from '@/store/todo';
import axios from 'axios';
import { createPinia, setActivePinia } from 'pinia';

describe('todo list', () => {
  vi.mock('axios');
  it('should add todo(使用行为验证)', async () => {
    const title = 'study vitest';
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        id: 1,
        title,
        completed: false,
      },
    });
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    await todoStore.addTodo(title);
    expect(todoStore.todoList[0].title).toBe(title);
    // 行为验证：判断axios.post被调用
    expect(axios.post).toHaveBeenCalledWith('/api/todos', { title });
  });

  it('should add todo(使用状态验证)', async () => {
    vi.mocked(axios.post).mockImplementation((url: string, { title }: any) => {
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
    vi.mocked(axios.post).mockImplementation((url: string, { title }: any) => {
      return Promise.resolve({
        data: {
          id: 1,
          title,
          completed: false,
        },
      });
    });
    vi.mocked(axios.delete).mockImplementation(() => {
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
    const todoList = [
      {
        id: 1,
        title: 'study vitest',
        completed: false,
      },
    ];
    vi.mocked(axios.get).mockResolvedValue({
      data: todoList,
    });
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    await todoStore.initTodoList();
    expect(todoStore.todoList[0].title).toBe('study vitest');
  });
});
