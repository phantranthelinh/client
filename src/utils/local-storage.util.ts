export function storeInLocal<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocal<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function removeFromLocal(key: string) {
  localStorage.removeItem(key);
}
