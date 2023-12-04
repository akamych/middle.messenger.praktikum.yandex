import chatApi from '../api/ChatApi.ts';
import HTTP from '../classes/HTTP.ts';
import store from '../classes/Store.ts';
import { feedChatProps } from '../components/chat/feed/chats/chats.ts';
import Service from '../classes/Service.ts';
import WebSocketApi from '../api/WebSocketApi.ts';
import router from '../classes/Router.ts';

class ChatService extends Service {
  private _ws: WebSocketApi;

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
    store.set('feed.createChat', false);
    store.set('noMoreMessages', false);
    store.set('activeChat', chat);
    // eslint-disable-next-line camelcase
    const { unread_count } = chat;
    store.set('messages', []);
    this.users();

    chatApi.getToken(chat.id)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            const { token } = data;
            this._ws = new WebSocketApi(token, unread_count);
            break;

          default:
            console.log({ status, data });
            break;
        }
      });
  }

  sendMessage(message: string) {
    if (!this._ws) { return; }
    this._ws.sendMessage(message);
  }

  loadMoreMessages() {
    if (!this._ws) { return; }
    this._ws.loadMoreMessages();
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

  updateAvatar(requestData: FormData) {
    chatApi.updateAvatar(requestData)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('activeChat', data);
            break;

          case HTTP.CODES.UNAUTHORIZED:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;

          default:
            console.log({ status, data });
            break;
        }
      })
      .catch((error) => console.error(error));
  }
}

export default new ChatService();
