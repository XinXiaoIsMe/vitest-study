import flushPromises from 'flush-promises'
import { User } from './async';

describe('user', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('test fetchData', () => {
    const user = new User('1');
    const callback = vi.fn();
    user.fetchData(callback, 100);
    // 该方法将调用每个启动的定时器，直到超过指定的毫秒数或队列为空（以先到者为准）
    // vi.advanceTimersByTime(100);
    // 也可以调用advanceTimersToNextTimer(调用定时器，直到当前定时器执行完，到达下一个定时器)
    // 当定时器的时间由外部指定时，使用advanceTimersByTime，否则使用advanceTimersToNextTimer更好
    vi.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalled();
  });

  it('test multiple timer', () => {
    const user = new User('1');
    const callback = vi.fn();
    user.fetchData(callback, 100);

    const user1 = new User('1');
    const callback1 = vi.fn();
    user1.fetchData(callback1, 100);

    // 调用每个已经启动的定时器，直到定时器队列为空。这意味着在 runAllTimers 期间调用的每个定时器都会被触发。如果时间间隔为无限，则会在尝试 10000 次后触发
    vi.runAllTimers();
  });

  it('test useInterval', () => {
    const user = new User('1');
    // 监听console.log
    vi.spyOn(console, 'log');
    user.useInterval();
    // vi.advanceTimersByTime(100)
    vi.advanceTimersToNextTimer();
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalled();
  });

  it('test useMultiTimer', () => {
    const user = new User('1');
    vi.spyOn(console, 'log');
    user.useMultiTimer();
    // 调用定时器直到超过1100ms
    // vi.advanceTimersByTime(1100);
    // 或者执行两次advanceTimersToNextTimer，保证
    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalled();
  });

  it('test usePromise', async () => {
    const user = new User('1');
    const result = await user.usePromise();
    expect(result).toBe(1);
  });

  it('test usePromiseWithTimer', async () => {
    const user = new User('1');
    // 以下代码无法执行成功，原因是beforeEach中使用了useFakeTimers，它的实现原理是替换了系统的setTimeout
    // 等api，当执行setTimeout时，并不会等待时间，而是直接将回调函数放进队列中，然后在执行advanceTimersToNextTimer
    // 等函数时从队列中取出函数执行，并更新内部时间模拟定时器效果。而user.usePromiseWithTimer必须等待回调函数执行后
    // Promise才会执行完成，因此实际其永远不会执行完Promise。即使将advanceTimersToNextTimer和user.usePromiseWithTimer、
    // 位置调换也无法解决这个问题，因为此时没有执行user.usePromiseWithTimer，队列中没有存放对应的回调函数，所以也不会成功
    // const result = await user.usePromiseWithTimer();
    // vi.advanceTimersToNextTimer();
    // expect(result).resolves.toBe(1);

    // 首先执行一遍usePromiseWithTimer保证队列中存放了回调函数，不需要使用await，保证代码同步执行
    const result = user.usePromiseWithTimer();
    // 此时再使用vi.advanceTimersToNextTimer();执行回调函数
    vi.advanceTimersToNextTimer();
    // 判断结果
    expect(result).resolves.toBe(1);
  });

  it('test useNestedPromise', async () => {
    const user = new User('1')
    user.useNestedPromise()
    // 刷新所有promise，本质是利用了setTimeout
    await flushPromises()
    expect(user.count).toBe(3)
  })
});
