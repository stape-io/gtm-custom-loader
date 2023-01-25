import { HtmlOptions } from '../models/CookieKeeperOptions';

export default function getUidFromHtml({
  selector,
  attribute,
}: HtmlOptions): string | undefined | null {
  const element = document.querySelector(selector);
  return element?.getAttribute(attribute);
}
