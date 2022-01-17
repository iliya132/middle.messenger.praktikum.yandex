import { changeProfileRequest, IEditProfileProps } from '../types/Types';
import BaseAPI from './baseAPI';

export default class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  public changeAvatar(avatarData: FormData) {
    return this.http.putFormData('/profile/avatar', avatarData);
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.http.put('/password', { oldPassword, newPassword });
  }

  public changeProfile({ firstName, secondName, displayName, login, email, phone }: IEditProfileProps) {
    const data: changeProfileRequest = {
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
      login: login,
      email: email,
      phone: phone,
    };
    return this.http.put('/profile', data);
  }
}
