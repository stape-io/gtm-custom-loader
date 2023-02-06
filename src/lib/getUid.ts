import getUidFromCookie from './getUidFromCookie';
import getUidFromLocalStorage from './getUidFromLocalStorage';
import getUidFromVariable from './getUidFromVariable';
import getUidFromHtml from './getUidFromHtml';
import { UserIdentifierType } from '../models/CookieKeeperOptions';

export default function getUid(
  userIdentifierType?: UserIdentifierType,
  userIdentifierValue = '',
  htmlAttribute?: string
): string | undefined | null {
  if (userIdentifierType === 'cookie')
    return getUidFromCookie(userIdentifierValue);
  if (userIdentifierType === 'localStorage')
    return getUidFromLocalStorage(userIdentifierValue);
  if (userIdentifierType === 'jsVariable')
    return getUidFromVariable(userIdentifierValue);
  if (userIdentifierType === 'cssSelector')
    return getUidFromHtml(userIdentifierValue, htmlAttribute);
  console.warn('invalid uid source', userIdentifierType);
}
