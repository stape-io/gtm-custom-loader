import getUidFromVariable from './getUidFromVariable';

test('should return undefined if value not exists', () => {
  expect(getUidFromVariable('userId')).toEqual(undefined);
});

test('should return undefined if value exists', () => {
  (window as any).userId = 'value';
  expect(getUidFromVariable('userId')).toEqual('value');
});
