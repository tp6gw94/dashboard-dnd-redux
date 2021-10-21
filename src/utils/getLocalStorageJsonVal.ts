export function getLocalStorageJsonVal<T>(itemKey: string): undefined | T {
  const val = localStorage.getItem(itemKey);
  if (val === null) return;

  return JSON.parse(val) as T;
}
