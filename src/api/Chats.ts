import HTTP from '../classes/HTTP.js';
import router from '../classes/Router.js';
import store from '../classes/Store.js';

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

class ChatsApi extends HTTP {
  protected _baseUrl: string = 'chats';

  list() {
    this.get('')
      .then((responseData) => {
        if (!responseData) { return; }
        const { status, response } = this._createResponse(responseData);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('chats', JSON.parse(response));
            store.set('feed.createChat', false);
            console.log(store.getState());
            break;

          default:
            console.log({ status, response });
            store.set('chats', []);
            break;
        }
      })
      .catch((error) => console.error(error));
  }

  create(title: string) {
    this.post('', {
      data: { title },
      sendJSON: true,
    })
      .then((responseData) => {
        if (!responseData) { return; }
        const { status, response } = this._createResponse(responseData);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.list();
            break;

          default:
            console.log({ status, response });
            break;
        }
      })
      .catch((error) => console.error(error));
  }
}

export default new ChatsApi();
