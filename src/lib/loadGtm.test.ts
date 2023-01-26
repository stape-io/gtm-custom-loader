import getUid from './getUid';
import loadGtm from './loadGtm';
import { CookieKeeperOptions } from '../models/CookieKeeperOptions';

jest.mock('./getUid', () => ({
  __esModule: true,
  default: jest.fn((options: CookieKeeperOptions) => {
    if (options.localStorage === 'error') throw new Error('localStorage error');
    return options.cookie === 'test' ? 'cookieValue' : undefined;
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
  const cookieKeeper = { cookie: 'test' };
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    cookieKeeper
  );
  expect(getUid).toHaveBeenCalledWith(cookieKeeper);
});

test('insert script with uid', () => {
  const cookieKeeper = { cookie: 'test' };
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    cookieKeeper
  );
  expect(document.head.innerHTML).toEqual(
    '<script src="https://gtm.stape.io?id=GTM-ID&amp;uid=cookieValue"></script><script src="https://some-script.js"></script>'
  );
});

test('insert script with uid and custom data layer name', () => {
  const cookieKeeper = { cookie: 'test' };
  loadGtm(
    window,
    document,
    'script',
    'customDataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    cookieKeeper
  );
  expect(document.head.innerHTML).toEqual(
    '<script src="https://gtm.stape.io?id=GTM-ID&amp;l=customDataLayer&amp;uid=cookieValue"></script><script src="https://some-script.js"></script>'
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
  const cookieKeeper = {
    localStorage: 'error',
  };
  jest.spyOn(console, 'error').mockReturnValueOnce(undefined);
  loadGtm(
    window,
    document,
    'script',
    'dataLayer',
    'GTM-ID',
    'https://gtm.stape.io',
    'swhxltns',
    cookieKeeper
  );
  expect(console.error).toHaveBeenCalledWith(new Error('localStorage error'));
});
