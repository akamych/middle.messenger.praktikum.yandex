import HTTP from '../classes/HTTP.js';
import router, { CHAT_PAGES } from '../classes/Router.js';
import store from '../classes/Store.js';

export type settingsData = {
  'display_name': string,
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'phone': string,
};

class UserApi extends HTTP {
  protected _baseUrl: string = 'user/';

  update(requestData: settingsData) {
    this
      .put('profile', {
        data: requestData,
        sendJSON: true,
      })
      .then((responseData) => {
        if (!responseData) { return; }

        const { status, response } = this._createResponse(responseData);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('user', {
              authorized: true,
              ...response,
            });
            router.go(CHAT_PAGES.INDEX);
            break;

          case HTTP.CODES.UNAUTHORIZED:
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

export default new UserApi();
