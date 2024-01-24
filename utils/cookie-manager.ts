import type { CookieSetOptions, Cookie } from 'universal-cookie';
import Cookies from 'universal-cookie';

const DEFAULT_COOKIE_OPTIONS: CookieSetOptions = { path: '/' };

export class CookieManager {
  static ACCESS_TOKEN_KEY = 'access';

  static REFRESH_TOKEN_KEY = 'refresh';

  static cookies = new Cookies();

  static COOKIE_PREFIX = 'jobs-portal-';

  static getPrefixedKey(key: string): string {
    return `${this.COOKIE_PREFIX}${key}`;
  }

  static matchKeys(key1: string, key2: string): boolean {
    return key1 === this.getPrefixedKey(key2);
  }

  static get(key: string) {
    return this.cookies.get(this.getPrefixedKey(key));
  }

  static set(key: string, value: Cookie, options: CookieSetOptions = DEFAULT_COOKIE_OPTIONS): void {
    this.cookies.set(this.getPrefixedKey(key), value, options);
  }

  static remove(key: string, options: CookieSetOptions = DEFAULT_COOKIE_OPTIONS): void {
    this.cookies.remove(this.getPrefixedKey(key), options);
  }

  static setAuthTokens(access: string, refresh: string, options: CookieSetOptions = DEFAULT_COOKIE_OPTIONS): void {
    this.set(this.ACCESS_TOKEN_KEY, access, { ...options });
    this.set(this.REFRESH_TOKEN_KEY, refresh, options);
  }

  static setAccessToken(token: string) {
    return this.set(this.ACCESS_TOKEN_KEY, token);
  }

  static getAccessToken(): string | undefined {
    return this.get(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | undefined {
    return this.get(this.REFRESH_TOKEN_KEY);
  }

  static removeAuthTokens(options: CookieSetOptions = DEFAULT_COOKIE_OPTIONS): void {
    this.remove(this.ACCESS_TOKEN_KEY, options);
    this.remove(this.REFRESH_TOKEN_KEY, options);
  }
}
