export function login(username: string, password: string) {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
}
