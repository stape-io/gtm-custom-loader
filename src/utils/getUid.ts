import getUidFromCookie from './getUidFromCookie';
import getUidFromLocalStorage from './getUidFromLocalStorage';
import getUidFromVariable from './getUidFromVariable';
import getUidFromHtml from './getUidFromHtml';
import { CookieKeeperOptions } from '../models/CookieKeeperOptions';

export default function getUid(
  options: CookieKeeperOptions
): string | undefined | null {
  const { cookie, variable, html, localStorage } = options;
  if (cookie) return getUidFromCookie(cookie);
  if (localStorage) return getUidFromLocalStorage(localStorage);
  if (variable) return getUidFromVariable(variable);
  if (html) return getUidFromHtml(html);
  console.warn('invalid uid source', options);
}
