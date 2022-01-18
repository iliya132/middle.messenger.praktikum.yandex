import HTTPTransport from './http';

export default abstract class BaseAPI {
  protected http: HTTPTransport;
  private static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(BaseAPI.API_URL, endpoint);
  }
}
