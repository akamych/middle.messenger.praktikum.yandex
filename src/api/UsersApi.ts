/* eslint-disable consistent-return */
import HTTP from '../classes/HTTP.js';

export type settingsData = {
  'display_name': string,
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'phone': string,
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

  search(login: string) {
    return this
      .post('/search', {
        data: { login },
        sendJSON: true,
      });
  }
}

export default new UsersApi();
