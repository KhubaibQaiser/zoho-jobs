import { Mutex } from "async-mutex";

import { CookieManager } from "./cookie-manager";
import { config } from "../constants";

export type DefaultParamsType = Record<
  string,
  string | number | boolean | null
>;
export type Params<P = DefaultParamsType> = P;
export type ApiEndpointMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestParamsBase<P extends DefaultParamsType = DefaultParamsType> =
  {
    endpoint: RequestInfo | URL;
    init?: Omit<RequestInit, "method" | "body">;
    method?: ApiEndpointMethod;
    body?: any;
    formData?: boolean;
    params?: Params<P>;
    isAuth?: boolean;
    baseUrl?: string;
  };

export class ApiClient {
  private baseUrl = "";

  private mutex = new Mutex();

  objectToQueryParam(paramsObj: Record<string, unknown> | undefined) {
    if (!paramsObj) {
      return "";
    }
    const obj = {} as Record<string, string>;

    Object.keys(paramsObj).forEach((oKey) => {
      if (paramsObj[oKey] !== undefined && paramsObj[oKey] !== null) {
        obj[oKey] = `${paramsObj[oKey]}`;
      }
    });

    return new URLSearchParams(obj).toString();
  }

  private async baseRequest<P extends DefaultParamsType>({
    endpoint,
    init,
    method = "GET",
    body = undefined,
    params,
    isAuth = true,
    formData = false,
    baseUrl,
  }: RequestParamsBase<P>): Promise<Response> {
    const queryString = this.objectToQueryParam(params);
    const urlWithParams = `${baseUrl || this.baseUrl}${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    let requestBody;
    if (method !== "GET") {
      requestBody = formData ? body : JSON.stringify(body);
    }

    return fetch(urlWithParams, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        ...(isAuth
          ? { Authorization: `Bearer ${CookieManager.getAccessToken()}` }
          : {}),
      },
      method,
      body: requestBody,
    });
  }

  private async renewAccessToken() {
    const refreshToken = config.zohoRefreshToken;
    console.log("CHECK - RENEW ACCESS TOKEN", refreshToken);
    if (refreshToken) {
      try {
        const refreshResult = await this.baseRequest({
          baseUrl: "https://accounts.zoho.com/oauth/v2",
          endpoint: "/token",
          isAuth: false,
          method: "POST",
          init: {
            headers: {
              "content-type": "application/json",
            },
          },
          params: {
            grant_type: "refresh_token",
            client_id: config.zohoClientId,
            client_secret: config.zohoClientSecret,
            refresh_token: config.zohoRefreshToken,
          },
        });

        if (refreshResult.status === 200) {
          const refreshData = (await refreshResult.json()) as {
            access_token: string;
          };
          if (refreshData?.access_token) {
            CookieManager.setAccessToken(refreshData.access_token);
            return;
          }
        }
      } catch (error) {
        console.error("Couldn't renew access token", error);
      }
    }
    throw new Error("Couldn't renew access token");
  }

  private async handleUnauthorizedRequest(
    response: Response,
    params: RequestParamsBase
  ): Promise<Response> {
    if (!this.mutex.isLocked()) {
      const release = await this.mutex.acquire();
      try {
        await this.renewAccessToken();
      } finally {
        release();
      }
    } else {
      await this.mutex.waitForUnlock();
    }
    return this.baseRequest(params);
  }

  private async makeRequest<
    T,
    P extends DefaultParamsType = DefaultParamsType
  >({ endpoint, isAuth = true, ...params }: RequestParamsBase<P>): Promise<T> {
    // Wait until the mutex is available without locking it
    await this.mutex.waitForUnlock();

    // Base request call
    let res = await this.baseRequest({ endpoint, isAuth, ...params });

    // Handle unauthorized response
    if (res.status === 401) {
      res = await this.handleUnauthorizedRequest(res, {
        endpoint,
        ...params,
      });
    }

    const response = (await res.json()) as T;
    return response;
  }

  async request<T, P extends DefaultParamsType = DefaultParamsType>({
    endpoint,
    params,
    init = {},
    ...rest
  }: Omit<RequestParamsBase<P>, "body" | "method">): Promise<T> {
    return this.makeRequest<T>({
      endpoint,
      params,
      init,
      ...rest,
    });
  }

  async post<T, P>({
    endpoint,
    payload,
    init = {},
    method = "POST",
    formData,
    ...rest
  }: Omit<RequestParamsBase, "body" | "method"> & {
    payload: P;
    method?: Exclude<ApiEndpointMethod, "GET">;
  }): Promise<T> {
    let headers = init.headers || {};
    if (!formData) {
      headers = { "content-type": "application/json" };
    }

    return this.makeRequest<T>({
      endpoint,
      method,
      body: payload,
      formData,
      init: {
        ...init,
        headers: {
          ...headers,
        },
      },
      ...rest,
    });
  }
}

export const apiClient = new ApiClient();
