export function getResult() {
  const random = Math.random();
  return random > 0.5 ? 'success' : 'failed';
}

// 判断今天是否是周五
export function isFriday() {
  return new Date().getDay() === 5;
}
