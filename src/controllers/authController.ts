import IUser from '../types/Types';
import BasicController from './basicController';
import AuthAPI, { IUserApiReponse } from '../api/authApi';
import { store } from '../store/index';

const pathToStaticResources = 'https://ya-praktikum.tech/api/v2/resources/';

export interface authState {
  isSignedIn: boolean;
  user: IUser | null;
  error: string;
}

class AuthController extends BasicController {
  private controllerStatePath: string;

  private api: AuthAPI;

  constructor(changeStateAction: (pathname: string, value: unknown) => void) {
    super(changeStateAction);
    this.controllerStatePath = 'auth';
    this.api = new AuthAPI();
  }

  async getUser(): Promise<authState> {
    const answer: IUserApiReponse | string = await this.api.read()
      .then((response) => response).catch((exception) => exception.reason);
    if (typeof answer === 'string') {
      return {
        error: answer,
        isSignedIn: false,
        user: null,
      };
    }
    return {
      error: '',
      isSignedIn: true,
      user: {
        id: (answer as IUserApiReponse).id,
        avatar: (answer as IUserApiReponse).avatar ? pathToStaticResources + (answer as IUserApiReponse).avatar : '',
        email: (answer as IUserApiReponse).email,
        firstName: (answer as IUserApiReponse).first_name,
        displayName: (answer as IUserApiReponse).display_name,
        login: (answer as IUserApiReponse).login,
        password: '',
        phone: (answer as IUserApiReponse).phone,
        secondName: (answer as IUserApiReponse).second_name,
      },
    };
  }

  async fetchUser() {
    const newState = await this.getUser();
    console.log('NEW STATE!!!', newState);
    this.changeState(this.controllerStatePath, newState);
  }

  async signUp(user: IUser) {
    try {
      await this.api.signup({
        first_name: user.firstName,
        second_name: user.secondName,
        login: user.login,
        email: user.email,
        password: user.password,
        phone: user.phone,
      });
      const newState = await this.getUser();
      this.changeState(this.controllerStatePath, newState);
    } catch (exception) {
      if (exception === 'User already in system') {
        const newState = await this.getUser();
        this.changeState(this.controllerStatePath, newState);
      } else {
        const newState = {
          isSignedIn: false,
          user: null,
          error: exception,
        };
        this.changeState(this.controllerStatePath, newState);
      }
    }
  }

  async signIn(login: string, password: string) {
    const apiResponse: null | string = await this.api.login({ login, password })
      .catch((exception) => exception.reason);
    if (typeof apiResponse === 'string') {
      if (apiResponse !== 'User already in system') {
        const newState: authState = {
          isSignedIn: false,
          user: null,
          error: apiResponse,
        };
        this.changeState(this.controllerStatePath, newState);
        return;
      }
    }
    this.fetchUser();
  }

  async logout() {
    await this.api.logout().then(() => {
      const newState = {
        isSignedIn: false,
        user: null,
        error: '',
      };
      this.changeState(this.controllerStatePath, newState);
    }).catch(exception => {
      const newState = {
        isSignedIn: false,
        user: null,
        error: exception,
      };
      this.changeState(this.controllerStatePath, newState);
    });
  }

  isSignedIn() {
    try {
      (async () => {
        await this.getUser();
        return true;
      });
    } catch {
      return false;
    }
  }
}

const authController = new AuthController((pathname: string, value: unknown) => store.setState(pathname, value));
export default authController;
