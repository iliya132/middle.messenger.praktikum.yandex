import { IChat, IToken } from '../types/Types';
import BaseAPI from './baseAPI';

export default class ChatApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public create(data: string): Promise<unknown> {
    return this.http.post('/', { title: data });
  }

  public read(): Promise<IChat[]> {
    return this.http.get('/');
  }

  public delete(identifier: string | number): Promise<unknown> {
    return this.http.deleteWithBody('/', { chatId: identifier });
  }

  public appendUsers(userIds: number[], chatId: number): Promise<unknown> {
    return this.http.put('/users', { users: userIds, chatId });
  }

  public removeUsers(userIds: number[], chatId: number) {
    return this.http.deleteWithBody('/users', { users: userIds, chatId });
  }

  public getToken(chatId: number): Promise<IToken> {
    return this.http.post(`/token/${chatId}`);
  }

  public getUsers(chatId: number, offset: number, limit: number, name: string, email: string) {
    return this.http.get(buildQuery(
      `/${chatId}/users`,
      { key: 'offset', value: offset.toString() },
      { key: 'limit', value: limit.toString() },
      { key: 'name', value: name },
      { key: 'email', value: email },
    ));
  }

  update: undefined;
}

interface QueryData {
    key: string,
    value: string
}

function buildQuery(url: string, ...queryData: QueryData[]) {
  const result = `${url}?`;
  const data = queryData.filter((i) => i.value).map((item) => `${item.key}=${item.value}`).join('&');
  return result + data;
}
