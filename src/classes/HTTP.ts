import { propType } from '../utils/types/propType.ts';

type ApiOptionsType = {
  method?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  timeout?: number;
  sendJSON?: boolean;
  sendForm?: boolean;
  withCredentials?: boolean;
};

// eslint-disable-next-line no-unused-vars
type ApiGetMethod = (url: string, options?: ApiOptionsType) => Promise<unknown>;
// eslint-disable-next-line no-unused-vars
type ApiMethod = (url: string, options: ApiOptionsType) => Promise<unknown>;

export default class HTTP {
  static METHODS : Record<string, string> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  };

  static CODES : Record<string, Number> = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
  };

  protected _yandexUrl: string = 'https://ya-praktikum.tech/api/v2/';

  protected _baseUrl: string;

  _queryStringify(data: object) {
    const keys : string[] = Object.keys(data);
    // eslint-disable-next-line max-len
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
  }

  _rewriteMethod(method: string, options?: ApiOptionsType) : ApiOptionsType {
    return { ...options, method };
  }

  _createResponse(response: Record<string, any>) {
    const { status, responseText } = response;
    const data = responseText.substring(0, 1) === '{' ? JSON.parse(responseText) : responseText;
    return { status, data };
  }

  _parseJSON(data: string): propType {
    return JSON.parse(data);
  }

  get: ApiGetMethod = (url, options: ApiOptionsType = {}) => {
    let fullUrl = url;
    if (options && options.data) {
      fullUrl += this._queryStringify(options.data as object);
    }
    return this._request(fullUrl, this._rewriteMethod(HTTP.METHODS.GET, options));
  };

  post: ApiMethod = (url, options = {}) => (
    this._request(url, this._rewriteMethod(HTTP.METHODS.POST, options))
  );

  put: ApiMethod = (url, options = {}) => (
    this._request(url, this._rewriteMethod(HTTP.METHODS.PUT, options))
  );

  delete: ApiMethod = (url, options = {}) => (
    this._request(url, this._rewriteMethod(HTTP.METHODS.DELETE, options))
  );

  _request: ApiMethod = (url, options = {}) => {
    const {
      headers = {},
      method,
      data,
      sendJSON,
      sendForm,
      withCredentials = true,
      timeout = 5000,
    } = options;

    const fullUrl = this._yandexUrl + this._baseUrl + url;
    let jsonData: string;

    if (sendJSON) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
      jsonData = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('Не указан метод'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl);
      xhr.timeout = timeout;

      Object.keys(headers).forEach((key : string) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = withCredentials;

      if (method === HTTP.METHODS.GET || !data) {
        xhr.send();
      } else if (jsonData) {
        xhr.send(jsonData);
      } else if (sendForm) {
        xhr.send(data!.formData);
      } else {
        // xhr.send(data);
      }
    });
  };
}
