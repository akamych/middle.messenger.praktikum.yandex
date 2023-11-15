type ApiOptionsType = {
  method: string;
  headers?: Record<string, string>;
  // eslint-disable-next-line no-undef
  data?: Document | XMLHttpRequestBodyInit;
  timeout?: number;
};

export default class API {
  static METHODS : Record<string, string> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  };

  _queryStringify(data: object) {
    const keys : string[] = Object.keys(data);
    // eslint-disable-next-line max-len
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
  }

  _rewriteMethod(method: string, options?: ApiOptionsType) : ApiOptionsType {
    return { ...options, method };
  }

  get = (url: string, options?: ApiOptionsType) => {
    let fullUrl = url;
    if (options && options.data) {
      fullUrl += this._queryStringify(options.data as object);
    }
    this._request(fullUrl, this._rewriteMethod(API.METHODS.GET, options));
  };

  post = (url: string, options?: ApiOptionsType) => {
    this._request(url, this._rewriteMethod(API.METHODS.POST, options));
  };

  put = (url: string, options?: ApiOptionsType) => {
    this._request(url, this._rewriteMethod(API.METHODS.PUT, options));
  };

  delete = (url: string, options?: ApiOptionsType) => {
    this._request(url, this._rewriteMethod(API.METHODS.DELETE, options));
  };

  _request = (url: string, options? : ApiOptionsType) => {
    const {
      headers = {},
      method,
      data,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('Не указан метод'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      Object.keys(headers).forEach((key : string) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === API.METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
