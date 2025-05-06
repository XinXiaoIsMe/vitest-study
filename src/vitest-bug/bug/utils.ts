export function getUsername() {
  return 'zhangsan';
}

export function getPassword() {
  return 'zhangsan123';
}

export function getUserInfo() {
  return {
    username: getUsername(),
    password: getPassword(),
  };
}
