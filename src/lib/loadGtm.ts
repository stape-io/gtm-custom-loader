import getUid from './getUid';
import { UserIdentifierType } from '../models/CookieKeeperOptions';
import getIsCookieKeeperEnabled from './getIsCookieKeeperEnabled';

export default function loadGtm(
  window: Window,
  document: Document,
  tagName: string,
  gtmVariable: string,
  id: string,
  domain: string,
  containerId: string,
  userIdentifierType?: UserIdentifierType,
  userIdentifierValue?: string,
  htmlAttribute?: string
): void {
  let identifier: string | undefined | null;
  try {
    identifier =
      userIdentifierType && getIsCookieKeeperEnabled()
        ? getUid(userIdentifierType, userIdentifierValue, htmlAttribute)
        : undefined;
  } catch (e) {
    console.error(e);
  }
  const w = window as any;
  w[gtmVariable] = w[gtmVariable] || [];
  w[gtmVariable].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const firstScript = document.getElementsByTagName(tagName)[0];
  const dataLayerParam = gtmVariable === 'dataLayer' ? '' : '&l=' + gtmVariable;
  const biParam = identifier ? '&bi=' + encodeURIComponent(identifier) : '';
  const script = document.createElement(tagName) as HTMLScriptElement;
  const path = identifier ? 'kp' + containerId : containerId;
  script.async = true;
  script.src = domain + '/' + path + '.js?id=' + id + dataLayerParam + biParam;
  firstScript.parentNode?.insertBefore(script, firstScript);
}
