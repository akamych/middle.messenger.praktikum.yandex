import HTTP from '../classes/HTTP.ts';
import router from '../classes/Router.js';
import store from '../classes/Store.js';
import chatsApi from './Chats.js';

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
    this
      .get('user')
      .then((responseData) => {
        if (!responseData) { return; }
        const { status, response } = this._createResponse(responseData);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('user', {
              authorized: true,
              ...response,
            });
            chatsApi.list();
            router.usersRedirect();
            break;

          default:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;
        }
      })
      .catch((error) => console.error(error));
  }

  login(requestData: loginData) {
    this
      .post('signin', {
        data: requestData,
        sendJSON: true,
      })
      .then((responseData) => {
        if (!responseData) { return; }

        const { status, response } = this._createResponse(responseData);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.getUserData();
            router.usersRedirect();
            break;

          case HTTP.CODES.UNAUTHORIZED:
            store.set('errors.loginForm', {
              active: true,
              text: store.getState().bundle.errorsText.loginForm.wrongData,
            });
            break;

          default:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;
        }
      })
      .catch((error) => console.error(error));
  }

  signup(requestData: signupData) {
    this
      .post('signup', {
        data: requestData,
        sendJSON: true,
      })
      .then((responseData) => {
        if (!responseData) { return; }
        const { status, response } = this._createResponse(responseData);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.getUserData();
            break;

          default:
            store.set('errors.signupForm', {
              active: true,
              text: store.getState().bundle.errorsText.signupForm.wrongData,
            });
            break;
        }
      })
      .catch((error) => console.error(error));
  }

  logout() {
    this
      .post('logout', {})
      .then((responseData) => {
        if (!responseData) { return; }
        const { status } = this._createResponse(responseData);
        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;

          default:
            break;
        }
      })
      .catch((error) => console.error(error));
  }
}

export default new AuthApi();
