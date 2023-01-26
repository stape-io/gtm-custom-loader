export default function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const keyValue = cookie.split('=');
    if (keyValue[0].trim() === name) return keyValue[1];
  }
}
