import getUid from './getUid';
import getUidFromCookie from './getUidFromCookie';
import getUidFromLocalStorage from './getUidFromLocalStorage';
import getUidFromVariable from './getUidFromVariable';
import getUidFromHtml from './getUidFromHtml';

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
  expect(getUid('sdcdscds' as any)).toEqual(undefined);
  expect(console.warn).toHaveBeenCalledWith('invalid uid source', 'sdcdscds');
});

test('should call getUidFromCookie', () => {
  expect(getUid('cookie', 'test')).toEqual('cookie');
  expect(getUidFromCookie).toHaveBeenCalledWith('test');
});

test('should call getUidFromLocalStorage', () => {
  expect(getUid('localStorage', 'test')).toEqual('localStorage');
  expect(getUidFromLocalStorage).toHaveBeenCalledWith('test');
});

test('should call getUidFromVariable', () => {
  expect(getUid('jsVariable', 'test')).toEqual('variable');
  expect(getUidFromVariable).toHaveBeenCalledWith('test');
});

test('should call getUidFromHtml', () => {
  expect(getUid('cssSelector', '#test > li', 'data-uid')).toEqual('html');
  expect(getUidFromHtml).toHaveBeenCalledWith('#test > li', 'data-uid');
});
