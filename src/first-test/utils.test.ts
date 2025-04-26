import { add } from './utils';

describe('utils', () => {
  it('test add', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
  });
});
