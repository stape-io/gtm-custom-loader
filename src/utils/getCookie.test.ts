import getCookie from './getCookie';

const cookieMock = jest.spyOn(document, 'cookie', 'get');

test('should works when cookie is empty', () => {
  cookieMock.mockReturnValueOnce('');
  expect(getCookie('test')).toEqual(undefined);
});

test('should return undefined if cookie not exists', () => {
  cookieMock.mockReturnValueOnce(
    'someCookie=someValue; someOtherCookie=someOtherValue;'
  );
  expect(getCookie('test')).toEqual(undefined);
});

test('should return value if cookies with spaces', () => {
  cookieMock.mockReturnValueOnce(
    'someCookie=someValue; test=testValue; someOtherCookie=someOtherValue;'
  );
  expect(getCookie('test')).toEqual('testValue');
});

test('should return value if cookies without spaces', () => {
  cookieMock.mockReturnValueOnce(
    'someCookie=someValue;test=testValue;someOtherCookie=someOtherValue;'
  );
  expect(getCookie('test')).toEqual('testValue');
});
