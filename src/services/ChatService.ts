import chatApi from '../api/ChatApi.js';
import HTTP from '../classes/HTTP.js';
import store from '../classes/Store.js';
import { feedChatProps } from '../components/chat/feed/chats/chats.js';
import Service from '../classes/Service.js';

class ChatService extends Service {
  list() { this.filter(''); }

  filter(title: string) {
    chatApi.search(title)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('chats', JSON.parse(data as string));
            store.set('feed.createChat', false);
            break;

          default:
            console.log({ status, data });
            store.set('chats', []);
            break;
        }
      });
  }

  create(title: string) {
    chatApi.create(title)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.list();
            break;

          default:
            console.log({ status, data });
            break;
        }
      });
  }

  open(chat: feedChatProps) {
    store.set('activeChat', chat);
  }

  users() {
    const chat = store.getState().activeChat;
    if (!chat) { return; }

    chatApi.users(chat.id)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('usersList', {
              active: true,
              search: false,
              users: JSON.parse(data as string),
            });
            break;

          default:
            console.log({ status, data });
            store.set('usersList', { active: false });
            break;
        }
      });
  }

  addUser(user: Number) {
    if (!user) { return; }

    chatApi.addUser(user)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.users();
            break;

          default:
            console.log({ status, data });
            break;
        }
      });
  }

  removeUser(user: Number) {
    if (!user) { return; }

    chatApi.removeUser(user)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            this.users();
            break;

          default:
            console.log({ status, data });
            break;
        }
      });
  }
}

export default new ChatService();
