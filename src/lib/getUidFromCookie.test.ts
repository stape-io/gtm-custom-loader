import getUidFromCookie from './getUidFromCookie';
import getCookie from './getCookie';

jest.mock('./getCookie', () => ({
  __esModule: true,
  default: jest.fn(() => 'value'),
}));

it('should call getCookie', () => {
  expect(getUidFromCookie('test')).toEqual('value');
  expect(getCookie).toHaveBeenCalledWith('test');
});
