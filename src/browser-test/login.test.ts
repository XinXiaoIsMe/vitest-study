import { login } from './login';

describe('login', () => {
  it('should store the username and password in localStorage', () => {
    login('zhangsan', 'zhangsan123');
    // 需要在vitest.config.ts中配置happy-dom
    expect(localStorage.getItem('username')).toBe('zhangsan');
    expect(localStorage.getItem('password')).toBe('zhangsan123');
  });
});
