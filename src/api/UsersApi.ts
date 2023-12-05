/* eslint-disable consistent-return */
import HTTP from '../classes/HTTP.ts';

export type settingsData = {
  'display_name': string,
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'phone': string,
};

export type changePasswordData = {
  'oldPassword': string,
  'newPassword': string,
};

class UsersApi extends HTTP {
  protected _baseUrl: string = 'user';

  update(requestData: settingsData) {
    return this
      .put('/profile', {
        data: requestData,
        sendJSON: true,
      });
  }

  updatePassword(requestData: changePasswordData) {
    return this
      .put('/password', {
        data: requestData,
        sendJSON: true,
      });
  }

  updateAvatar(requestData: FormData) {
    return this
      .put('/profile/avatar', {
        data: {
          formData: requestData,
        },
        sendForm: true,
      });
  }

  search(login: string) {
    return this
      .post('/search', {
        data: { login },
        sendJSON: true,
      });
  }
}

export default new UsersApi();
