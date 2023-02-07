export default function getSyncCookies(endpoint: string): () => void {
  return function () {
    document.addEventListener('visibilitychange', function logData() {
      if (document.visibilityState === 'hidden') {
        navigator.sendBeacon(endpoint);
      }
    });
  };
}
