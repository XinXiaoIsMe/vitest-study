import { getResult, isFriday } from './utils';

describe('test random', () => {
  it('test getResult', () => {
    // 使用spyOn监听Math.random的调用，修改其实现保证每次返回的值是固定值
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.6).mockImplementationOnce(() => 0.4);
    expect(getResult()).toBe('success');
    expect(getResult()).toBe('failed');
  });
});

describe('test date', () => {
  beforeEach(() => {
    // 每次测试前标识将使用假的系统时间
    vi.useFakeTimers();
  });
  afterEach(() => {
    // 每次测试完毕后还原系统时间
    vi.useRealTimers();
  });
  it('test today is friday', () => {
    // 设置系统时间为 2025-4-25 ，周五
    vi.setSystemTime(new Date(2025, 3, 25));
    expect(isFriday()).toBe(true);
  });

  it('test today is not friday', () => {
    // 设置系统时间为 2025-4-26 ，周六
    vi.setSystemTime(new Date(2025, 3, 26));
    expect(isFriday()).toBe(false);
  });
});
