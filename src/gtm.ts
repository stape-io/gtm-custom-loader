import loadGtm from './lib/loadGtm';

loadGtm(
  window,
  document,
  'script',
  'dataLayer',
  '{{WEB_GTM_ID}}',
  '{{DOMAIN}}',
  '{{CONTAINER_ID}}',
  '{{USER_IDENTIFIER_TYPE}}' as any,
  '{{USER_IDENTIFIER_VALUE}}',
  '{{HTML_ATTRIBUTE}}'
);
