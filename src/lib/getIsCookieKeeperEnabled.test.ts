import getIsCookieKeeperEnabled from './getIsCookieKeeperEnabled';

test('should return false for not safari', () => {
  jest
    .spyOn(navigator, 'userAgent', 'get')
    .mockReturnValueOnce(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
    );
  expect(getIsCookieKeeperEnabled()).toEqual(false);
});

test('should return false for safari < 16.4', () => {
  jest
    .spyOn(navigator, 'userAgent', 'get')
    .mockReturnValueOnce(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15'
    );
  expect(getIsCookieKeeperEnabled()).toEqual(false);
});

test('should return true for safari >= 16.4', () => {
  jest
    .spyOn(navigator, 'userAgent', 'get')
    .mockReturnValueOnce(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15'
    );
  expect(getIsCookieKeeperEnabled()).toEqual(true);
});
