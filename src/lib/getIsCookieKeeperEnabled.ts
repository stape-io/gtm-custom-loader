export default function getIsCookieKeeperEnabled(): boolean {
  const ua = navigator.userAgent;
  const uaMatch = /Version\/([0-9\._]+)(.*Mobile)?.*Safari.*/.exec(ua);
  return !!uaMatch && parseFloat(uaMatch[1]) >= 16.4;
}
