import getUid from './getUid';
import { CookieKeeperOptions } from '../models/CookieKeeperOptions';
import getIsCookieKeeperEnabled from './getIsCookieKeeperEnabled';

export default function loadGtm(
  window: Window,
  document: Document,
  tagName: string,
  gtmVariable: string,
  id: string,
  domain: string,
  containerId: string,
  cookieKeeper?: CookieKeeperOptions
): void {
  let uid: string | undefined | null;
  try {
    uid =
      cookieKeeper && getIsCookieKeeperEnabled()
        ? getUid(cookieKeeper)
        : undefined;
  } catch (e) {
    console.error(e);
  }
  const w = window as any;
  w[gtmVariable] = w[gtmVariable] || [];
  w[gtmVariable].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const firstScript = document.getElementsByTagName(tagName)[0];
  const dataLayerParam = gtmVariable === 'dataLayer' ? '' : `&l=${gtmVariable}`;
  const uidParam = uid ? `&uid=${uid}` : '';
  const scriptName = uid ? `ck${containerId}` : containerId;
  const script = document.createElement(tagName) as HTMLScriptElement;
  script.async = true;
  script.src = `${domain}/${scriptName}.js?id=${id}${dataLayerParam}${uidParam}`;
  firstScript.parentNode?.insertBefore(script, firstScript);
}
