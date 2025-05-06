import { getUserInfo } from './utils';

vi.mock(import('./username'), () => {
  return {
    getUsername() {
      return 'lisi';
    },
  };
});

it('should return user information', () => {
  const userInfo = getUserInfo();
  // mock成功，将getUsername提取到username.ts文件中，对username进行mock
  // 在utils中导入了username.ts的getUsername，触发了mock
  expect(userInfo.username).toBe('lisi');
  expect(userInfo.password).toBe('zhangsan123');
});
