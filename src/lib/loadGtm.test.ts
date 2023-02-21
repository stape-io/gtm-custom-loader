import getUid from './getUid';
import loadGtm from './loadGtm';
import { UserIdentifierType } from '../models/CookieKeeperOptions';

jest.mock('./getUid', () => ({
  __esModule: true,
  default: jest.fn(
    (userIdentifierType?: UserIdentifierType, userIdentifierValue = '') => {
      if (
        userIdentifierType === 'localStorage' &&
        userIdentifierValue === 'error'
      )
        throw new Error('localStorage error');
      return userIdentifierType === 'cookie' && userIdentifierValue === 'test'
        ? 'cookieValue'
        : undefined;
    }
  ),
}));

jest.mock('./getIsCookieKeeperEnabled', () => ({
  __esModule: true,
  default: jest.fn(() => {
    return true;
  }),
}));

beforeEach(() => {
  document.head.innerHTML = '<script src="https://some-script.js"></script>';
});

test('should not call getUid', () => {
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns'
  );
  expect(getUid).not.toHaveBeenCalled();
});

test('should call getUid if cookieKeeper option passed', () => {
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    'cookie',
    'test'
  );
  expect(getUid).toHaveBeenCalledWith('cookie', 'test', undefined);
});

test('insert script with uid', () => {
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    'cookie',
    'test'
  );
  expect(document.head.innerHTML).toEqual(
    '<script src="https://gtm.stape.io/kpswhxltns.js?id=GTM-ID&amp;bi=cookieValue"></script><script src="https://some-script.js"></script>'
  );
});

test('insert script with uid and custom data layer name', () => {
  loadGtm(
    window,
    document,
    'script',
    'customDataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    'cookie',
    'test'
  );
  expect(document.head.innerHTML).toEqual(
    '<script src="https://gtm.stape.io/kpswhxltns.js?id=GTM-ID&amp;l=customDataLayer&amp;bi=cookieValue"></script><script src="https://some-script.js"></script>'
  );
});

test('insert track first event in to dataLayer', () => {
  const mockDate = new Date(1000);
  const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  loadGtm(
    window,
    document,
    'script',
    '__dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns'
  );
  expect((window as any).__dataLayer).toEqual([
    { 'gtm.start': 1000, event: 'gtm.js' },
  ]);
  spy.mockRestore();
});

test('should works if parent node doesnt exists', () => {
  jest
    .spyOn(document, 'getElementsByTagName')
    .mockReturnValueOnce([{ parentNode: null }] as any);
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns'
  );
  expect(document.head.innerHTML).toEqual(
    '<script src="https://some-script.js"></script>'
  );
});

test('should handle error', () => {
  jest.spyOn(console, 'error').mockReturnValueOnce(undefined);
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    'localStorage',
    'error'
  );
  expect(console.error).toHaveBeenCalledWith(new Error('localStorage error'));
});

test('should work as default loader', () => {
  jest.spyOn(console, 'error').mockReturnValueOnce(undefined);
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://googletagmanager.com',
    'gtm'
  );
  expect(document.head.innerHTML).toEqual(
    '<script src="https://googletagmanager.com/gtm.js?id=GTM-ID"></script><script src="https://some-script.js"></script>'
  );
});
