import getUid from './getUid';
import getUidFromCookie from './getUidFromCookie';
import getUidFromLocalStorage from './getUidFromLocalStorage';
import getUidFromVariable from './getUidFromVariable';
import getUidFromHtml from './getUidFromHtml';
import { CookieKeeperOptions } from '../models/CookieKeeperOptions';

jest.mock('./getUidFromCookie', () => ({
  __esModule: true,
  default: jest.fn(() => 'cookie'),
}));
jest.mock('./getUidFromLocalStorage', () => ({
  __esModule: true,
  default: jest.fn(() => 'localStorage'),
}));
jest.mock('./getUidFromVariable', () => ({
  __esModule: true,
  default: jest.fn(() => 'variable'),
}));
jest.mock('./getUidFromHtml', () => ({
  __esModule: true,
  default: jest.fn(() => 'html'),
}));

const consoleWarnMock = jest.spyOn(console, 'warn');

test('should log warning and return undefined', () => {
  consoleWarnMock.mockReturnValueOnce();
  expect(getUid({})).toEqual(undefined);
  expect(console.warn).toHaveBeenCalledWith('invalid uid source', {});
});

test('should call getUidFromCookie', () => {
  const options: CookieKeeperOptions = { cookie: 'test' };
  expect(getUid(options)).toEqual('cookie');
  expect(getUidFromCookie).toHaveBeenCalledWith(options.cookie);
});

test('should call getUidFromLocalStorage', () => {
  const options: CookieKeeperOptions = { localStorage: 'test' };
  expect(getUid(options)).toEqual('localStorage');
  expect(getUidFromLocalStorage).toHaveBeenCalledWith(options.localStorage);
});

test('should call getUidFromVariable', () => {
  const options: CookieKeeperOptions = { variable: 'test' };
  expect(getUid(options)).toEqual('variable');
  expect(getUidFromVariable).toHaveBeenCalledWith(options.variable);
});

test('should call getUidFromHtml', () => {
  const options: CookieKeeperOptions = {
    html: { selector: '#test > li', attribute: 'data-uid' },
  };
  expect(getUid(options)).toEqual('html');
  expect(getUidFromHtml).toHaveBeenCalledWith(options.html);
});
