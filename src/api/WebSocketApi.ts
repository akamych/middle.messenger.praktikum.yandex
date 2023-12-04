import store from '../classes/Store';
import CONSTANTS from '../utils/bundle/constants';
import { propType } from '../utils/types/propType';

export default class WebSocketApi {
  private _domain: string = 'wss://ya-praktikum.tech/ws/chats/';

  private _ws: WebSocket | null = null;

  private _user: Number;

  private _chat: Number;

  private _token: string;

  constructor(token: string, unread?: number) {
    this._user = store.getState().user?.id;
    this._chat = store.getState().activeChat?.id;
    this._token = token;
    this.init(unread);
  }

  _send(data: propType) {
    if (!this._ws) { return; }
    this._ws.send(JSON.stringify(data));
  }

  ping() {
    if (!this._ws) { return; }
    this._send({ type: 'ping' });
    setTimeout(this.ping.bind(this), 15000);
  }

  getNewMessages(unread: number = CONSTANTS.MESSAGES_PER_REQUEST) {
    const requestsNumber : number = (unread > CONSTANTS.MESSAGES_PER_REQUEST)
      ? Math.ceil(unread / CONSTANTS.MESSAGES_PER_REQUEST)
      : 1;
    for (let i = (requestsNumber - 1); i >= 0; i -= 1) {
      const offset = CONSTANTS.MESSAGES_PER_REQUEST * i;
      this._send({
        content: offset.toString(),
        type: 'get old',
      });
    }
  }

  sendMessage(content: string) {
    this._send({
      content,
      type: 'message',
    });
  }

  init(unread?: number) {
    if (!this._user || !this._chat || !this._token) {
      return;
    }

    this._ws = new WebSocket(`${this._domain}/${this._user}/${this._chat}/${this._token}`);

    this._ws
      .addEventListener('open', () => {
        this.ping();
        this.getNewMessages(unread);
      });

    this._ws.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      const newMessages: propType[] = [];
      let lastMessage;

      if (Array.isArray(data)) {
        data.forEach((message) => {
          if (message.type === 'message') {
            newMessages.push(message);
            lastMessage = message;
          }
        });
      } else if (data.type === 'message') {
        newMessages.push(data);
        lastMessage = data;
      }

      if (lastMessage) {
        const { messages } = store.getState();
        const combined = [
          ...newMessages,
          ...messages,
        ];
        store.set('messages', combined);
        const chat = document.querySelector(`.feedChat[data-chat-id="${this._chat}"] p`);
        if (chat) {
          chat.textContent = lastMessage.content;
        }
      }
    });

    this._ws.addEventListener('close', () => {
      this._ws = null;
    });
  }
}
