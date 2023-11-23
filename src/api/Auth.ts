import HTTP from '../classes/HTTP.ts';
import router from '../classes/Router.js';
import store from '../classes/Store.js';

class AuthApi extends HTTP {
  protected _baseUrl: string = '/auth/';

  getUserData() {
    this.get('user')
      .then((data) => {
        if (!data) { return; }
        const { status, response } = this._createResponse(data);

        if (status === 401) {
          store.set('user', { authorized: false });
          router.guestRedirect();
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
}

const authApi = new AuthApi();

export default authApi;
