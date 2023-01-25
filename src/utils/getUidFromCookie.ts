import getCookie from './getCookie';

export default function getUidFromCookie(name: string): string | undefined {
  return getCookie(name);
}
