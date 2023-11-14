export const handleRequest = res => {
  if (!res.ok) {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  return res.json();
};