export interface HtmlOptions {
  selector: string;
  attribute: string;
}
export interface CookieKeeperOptions {
  cookie?: string;
  variable?: string;
  html?: HtmlOptions;
  localStorage?: string;
}
