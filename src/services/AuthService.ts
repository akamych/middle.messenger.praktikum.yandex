import HTTP from '../classes/HTTP.js';
import router from '../classes/Router.js';
import store from '../classes/Store.js';
import chatService from './ChatService.js';
import AuthApi, { loginData, signupData } from '../api/AuthApi.js';
import Service from '../classes/Service.js';

class AuthService extends Service {
  getUserData() {
    AuthApi.getUserData()
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            console.log({ status, data });
            store.set('user', {
              authorized: true,
              ...data,
            });
            chatService.list();
            router.usersRedirect();
            break;

          default:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;
        }
      });
  }

  login(requestData: loginData) {
    AuthApi.login(requestData)
      .then((response) => {
        if (!response) { return; }
        const { status } = this._createResponse(response);

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
      });
  }

  signup(requestData: signupData) {
    AuthApi.signup(requestData)
      .then((response) => {
        if (!response) { return; }
        const { status } = this._createResponse(response);

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
      });
  }

  logout() {
    AuthApi.logout()
      .then((response) => {
        if (!response) { return; }
        const { status } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;

          default:
            break;
        }
      });
  }
}

export default new AuthService();
