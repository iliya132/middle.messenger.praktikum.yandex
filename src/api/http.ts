export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
}

type Options = {
    method: Method;
    data?: object;
};

export default class HTTPTransport {
  private API_URL: string;

  protected endpoint: string;

  constructor(baseAPI: string,endpoint: string) {
    this.API_URL = baseAPI; 
    this.endpoint = `${this.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: object): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: object): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public putFormData<Response = void>(path: string, data: object): Promise<Response> {
    return this.requestFormData<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(path: string, data: object): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
    });
  }

  public deleteWithBody<Response>(path: string, data: object): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';
      
      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  private requestFormData<Response>(url: string, options: Options = { method: Method.Post }): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  }
}
