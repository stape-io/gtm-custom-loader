import getUidFromHtml from './getUidFromHtml';
import { HtmlOptions } from '../models/CookieKeeperOptions';

const options: HtmlOptions = { selector: '#userId', attribute: 'data-uid' };

test('should return undefined if element not exists', () => {
  expect(getUidFromHtml(options)).toEqual(undefined);
});

test('should return null if attribute not exists', () => {
  document.body.innerHTML = '<div id="userId"></div>';
  expect(getUidFromHtml(options)).toEqual(null);
});

test('should return value', () => {
  document.body.innerHTML = '<div id="userId" data-uid="value"></div>';
  expect(getUidFromHtml(options)).toEqual('value');
});
