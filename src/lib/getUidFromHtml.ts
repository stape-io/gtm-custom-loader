export default function getUidFromHtml(
  cssSelector: string,
  attribute?: string
): string | undefined | null {
  const element = document.querySelector(cssSelector);
  return attribute ? element?.getAttribute(attribute) : element?.textContent;
}
