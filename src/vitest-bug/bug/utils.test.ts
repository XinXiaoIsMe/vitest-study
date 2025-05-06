import { getUserInfo } from './utils';

vi.mock(import('./utils'), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    getUsername() {
      return 'lisi';
    },
  };
});

it('should return user information', () => {
  const userInfo = getUserInfo();
  // mock失败，vitest的mock原理是对import进行拦截和修改，在utils中getUserInfo直接使用了utils中的getUsername，没有触发mock
  expect(userInfo.username).toBe('lisi');
  expect(userInfo.password).toBe('zhangsan123');
});
