import getUidFromHtml from './getUidFromHtml';

const options = {
  selector: '#userId',
  attribute: 'data-uid',
};

test('should return undefined if element not exists', () => {
  expect(getUidFromHtml(options.selector, options.attribute)).toEqual(
    undefined
  );
});

test('should return null if attribute not exists', () => {
  document.body.innerHTML = '<div id="userId"></div>';
  expect(getUidFromHtml(options.selector, options.attribute)).toEqual(null);
});

test('should return value', () => {
  document.body.innerHTML = '<div id="userId" data-uid="value"></div>';
  expect(getUidFromHtml(options.selector, options.attribute)).toEqual('value');
});

test('should return text content if attribute is empty', () => {
  document.body.innerHTML = '<div id="userId">value</div>';
  expect(getUidFromHtml(options.selector)).toEqual('value');
});
test('should return undefined if attribute is empty and element doesnt exists', () => {
  document.body.innerHTML = '';
  expect(getUidFromHtml(options.selector)).toEqual(undefined);
});
