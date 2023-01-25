export default function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key.trim() === name) return value;
  }
}
