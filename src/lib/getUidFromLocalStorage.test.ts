import getUidFromLocalStorage from './getUidFromLocalStorage';

test('should return null if value not exists', () => {
  expect(getUidFromLocalStorage('test')).toEqual(null);
});

test('should return value if exists', () => {
  localStorage.setItem('test', 'value');
  expect(getUidFromLocalStorage('test')).toEqual('value');
});
