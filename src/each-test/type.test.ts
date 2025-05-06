import { getType } from './type';

describe('getType', () => {
  // 重复代码过多，使用it.each优化
  // it('should return number when getType was called with a number', () => {
  //   expect(getType(1)).toBe('number');
  // });

  // it('should return string when getType was called with a string', () => {
  //   expect(getType('string')).toBe('string');
  // });

  // it('should return object when getType was called with an object', () => {
  //   expect(getType({ age: 10 })).toBe('object');
  // });

  // it('should return function when getType was called with a function', () => {
  //   expect(getType(() => { })).toBe('function');
  // });

  // it('should return array when getType was called with an array', () => {
  //   expect(getType([1, 2])).toBe('array');
  // });

  // 使用数组模式
  // it.each([
  //   [1, 'number'],
  //   ['string', 'string'],
  //   [{ age: 10 }, 'object'],
  //   [() => { }, 'function'],
  //   [[1, 2], 'array'],
  // ])('should return $1 when getType was called with a $0', (value: unknown, expected: string) => {
  //   expect(getType(value)).toBe(expected);
  // });

  // 使用对象(可读性最好)
  // it.each([
  //   { value: 1, expected: 'number' },
  //   { value: 'string', expected: 'string' },
  //   { value: { age: 10 }, expected: 'object' },
  //   { value: () => { }, expected: 'function' },
  //   { value: [1, 2], expected: 'array' },
  // ])('should return $expected when getType was called with $value', ({ value, expected }) => {
  //   expect(getType(value)).toBe(expected);
  // });

  // 使用模板字符串
  it.each`
    value | expected
    ${1} | ${'number'}
    ${'strubg'} | ${'string'}
    ${{ age: 10 }} | ${'object'}
    ${() => { }} | ${'function'}
    ${[1, 2]} | ${'array'}
  `('should return $expected when getType was called with $value', ({ value, expected }) => {
    expect(getType(value)).toBe(expected);
  });
});
