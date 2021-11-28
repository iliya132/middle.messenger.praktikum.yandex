export enum METHODS{
    GET= 'GET',
    PUT= 'PUT',
    POST= 'POST',
    DELETE= 'DELETE'
  };

function queryStringify(data:Document | XMLHttpRequestBodyInit | null) {
    // Можно делать трансформацию GET-параметров в отдельной функции
    let result = '';
    if (data) {
      result += '?';
      for (let item of Object.entries(data)) {
        result += `${item[0]}=${item[1]}&`;
      }
      result = result.slice(0, -1);
    }
    return result;
  }

  interface HttpOptions{
      data: Document | XMLHttpRequestBodyInit | null,
      method: METHODS,
      timeout: number,
      headers: object
  }
  
  export default class HTTPTransport {
    get = (url:string, options :HttpOptions) => {
      return this.request(url + queryStringify(options.data), { ...options, method: METHODS.GET }, options.timeout);
    };
  
    put = (url:string, options :HttpOptions) => {
      return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };
  
    post = (url:string, options :HttpOptions) => {
      return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };
  
    delete = (url:string, options :HttpOptions) => {
      return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };
  
    request = (url:string, options :HttpOptions, timeout = 5000) => {
      const { method, data, headers } = options;
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
  
        if(headers){
          let entries = Object.entries(headers);
          for(let header of entries){
            xhr.setRequestHeader(header[0], header[1]);
          }
        }
  
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;
  
        xhr.onload = function () {
          resolve(xhr);
        }
  
        if (method === METHODS.GET || !data) {
          xhr.send();
        } else {
          xhr.send(data);
        }
      })
    };
  }