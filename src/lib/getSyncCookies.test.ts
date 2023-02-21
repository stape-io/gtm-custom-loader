import getSyncCookies from './getSyncCookies';

describe('getSyncCookies', () => {
  beforeEach(() => {
    navigator.sendBeacon = (() => {}) as any;
  });
  test('returns a function', () => {
    const result = getSyncCookies('/endpoint');
    expect(typeof result).toBe('function');
  });

  test('adds a visibilitychange event listener to the document', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const syncCookies = getSyncCookies('/endpoint');
    syncCookies();
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'visibilitychange',
      expect.any(Function)
    );
  });

  test('sends a beacon request when the document visibility changes to "hidden"', () => {
    const sendBeaconSpy = jest.spyOn(navigator, 'sendBeacon');
    const syncCookies = getSyncCookies('/endpoint');
    syncCookies();
    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValueOnce('hidden');
    document.dispatchEvent(new Event('visibilitychange'));
    expect(sendBeaconSpy).toHaveBeenCalledWith('/endpoint');
  });

  test('does not send a beacon request when the document visibility changes to "visible"', () => {
    const sendBeaconSpy = jest.spyOn(navigator, 'sendBeacon');
    const syncCookies = getSyncCookies('/endpoint');
    syncCookies();
    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValueOnce('visible');
    document.dispatchEvent(new Event('visibilitychange'));
    expect(sendBeaconSpy).not.toHaveBeenCalled();
  });
});
