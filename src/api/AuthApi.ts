import HTTP from '../classes/HTTP.ts';

export type loginData = {
  'login': string,
  'password': string,
};

export type signupData = {
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'password': string,
  'phone': string,
};

class AuthApi extends HTTP {
  protected _baseUrl: string = 'auth/';

  getUserData() {
    return this.get('user');
  }

  login(requestData: loginData) {
    return this.post('signin', {
      data: requestData,
      sendJSON: true,
    });
  }

  signup(requestData: signupData) {
    return this.post('signup', {
      data: requestData,
      sendJSON: true,
    });
  }

  logout() {
    return this.post('logout', {});
  }
}

export default new AuthApi();
