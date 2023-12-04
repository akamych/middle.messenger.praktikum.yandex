import HTTP from '../classes/HTTP.ts';
import router from '../classes/Router.ts';
import store from '../classes/Store.ts';
import chatService from './ChatService.ts';
import AuthApi, { loginData, signupData } from '../api/AuthApi.ts';
import Service from '../classes/Service.ts';

class AuthService extends Service {
  getUserData() {
    AuthApi.getUserData()
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('user', {
              authorized: true,
              ...data,
            });
            chatService.list();
            router.usersRedirect();
            break;

          default:
            console.error({ status, data });
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
        const { status, data } = this._createResponse(response);

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
            console.error({ status, data });
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
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.getUserData();
            break;

          default:
            console.error({ status, data });
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
