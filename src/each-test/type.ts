const toStr = Object.prototype.toString;
export function getType(value: unknown) {
  return toStr.call(value).slice(8, -1).toLowerCase();
}
