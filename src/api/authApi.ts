import BaseAPI from './baseAPI';

export interface IUserApiReponse {
    id: number,
    avatar: string,
    email: string,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    phone: string
}

export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface LoginData {
    login: string;
    password: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  login(data: LoginData): Promise<void> {
    return this.http.post('/signin', data);
  }

  logout(): Promise<void> {
    return this.http.post('/logout');
  }

  read(): Promise<IUserApiReponse | string> {
    return this.http.get('/user');
  }
}
