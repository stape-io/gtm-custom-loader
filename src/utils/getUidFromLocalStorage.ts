export default function getUidFromLocalStorage(
  key: string
): string | undefined | null {
  return localStorage.getItem(key);
}
