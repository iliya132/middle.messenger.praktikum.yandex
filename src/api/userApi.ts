import { changeProfileRequest, IEditProfileProps } from '../types/Types';
import BaseAPI from './baseAPI';

export default class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  public create?: undefined;

  public read?(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public update?(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public delete?: undefined;

  public changeAvatar(avatarData: FormData) {
    return this.http.putFormData('/profile/avatar', avatarData);
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.http.put('/password', { oldPassword, newPassword });
  }

  public changeProfile(submittedData: IEditProfileProps) {
    const data: changeProfileRequest = {
      first_name: submittedData.firstName,
      second_name: submittedData.secondName,
      display_name: submittedData.displayName,
      login: submittedData.login,
      email: submittedData.email,
      phone: submittedData.phone,
    };
    return this.http.put('/profile', data);
  }
}
