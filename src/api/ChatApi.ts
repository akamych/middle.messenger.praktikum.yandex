/* eslint-disable consistent-return */
import HTTP from '../classes/HTTP.js';
import store from '../classes/Store.js';

class ChatApi extends HTTP {
  protected _baseUrl: string = 'chats';

  search(title: string) {
    return this.get('', { data: { title } });
  }

  create(title: string) {
    return this.post('', {
      data: { title },
      sendJSON: true,
    });
  }

  users(id: Number) {
    let url = '/';
    url += id;
    url += '/users';
    return this.get(url);
  }

  addUser(user: Number) {
    return this.put('/users', {
      data: {
        users: [user],
        chatId: store.getState().activeChat?.id,
      },
      sendJSON: true,
    });
  }

  removeUser(user: Number) {
    return this.delete('/users', {
      data: {
        users: [user],
        chatId: store.getState().activeChat?.id,
      },
      sendJSON: true,
    });
  }
}

export default new ChatApi();
