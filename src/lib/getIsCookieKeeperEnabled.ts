export default function getIsCookieKeeperEnabled(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
  const version =
    ua.indexOf('iphone') !== -1
      ? +ua
          .replace(/.*\sos\s(\d+_\d+)\s.*/, '$1')
          .split('_')
          .join('.')
      : +ua.replace(/.*version\/(.*)\s.*/, '$1');
  return isSafari && version >= 16.4;
}
