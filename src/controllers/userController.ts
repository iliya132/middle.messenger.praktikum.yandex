import UserApi from '../api/userApi';
import { store } from '../store';
import { IEditProfileProps } from '../types/Types';
import authController from './authController';
import BasicController from './basicController';

class UserController extends BasicController {
  private api: UserApi;

  constructor(changeStateAction: (pathname: string, value: unknown) => void) {
    super(changeStateAction);
    this.api = new UserApi();
  }

  changeAvatar(avatar: FormData) {
    return this.api.changeAvatar(avatar);
  }

  changeProfile(submittedData: IEditProfileProps) {
    return this.api.changeProfile(submittedData).then(() => {
      authController.fetchUser();
    });
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.api.changePassword(oldPassword, newPassword).then(() => {
      authController.fetchUser();
    });
  }
}

const userController = new UserController((pathname, value) => store.setState(pathname, value));
export default userController;
