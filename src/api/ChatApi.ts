/* eslint-disable consistent-return */
import HTTP from '../classes/HTTP.ts';
import store from '../classes/Store.ts';

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
    return this.get(`/${id}/users`);
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

  getToken(id: Number) {
    return this.post(`/token/${id}`, {
      data: { id },
      sendJSON: true,
    });
  }

  updateAvatar(requestData: FormData) {
    requestData.append('chatId', store.getState().activeChat?.id);
    return this
      .put('/avatar', {
        data: {
          formData: requestData,
        },
        sendForm: true,
      });
  }
}

export default new ChatApi();
