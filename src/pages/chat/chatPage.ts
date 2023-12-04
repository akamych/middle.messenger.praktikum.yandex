import Block, { propType } from '../../classes/Block.ts';
import Feed from '../../components/chat/feed/feed.ts';
import ChatMenu from '../../components/chat/menu/menu.ts';
import ChatMessages from '../../components/chat/messages/messages.ts';
// eslint-disable-next-line import/no-unresolved
import template from './chatPage.hbs?raw';
import styles from './chatPage.scss';
import UsersList from '../../components/chat/usersList/usersList.ts';
import ChatSend from '../../components/chat/send/send.ts';

const feed = new Feed({});
const usersList = new UsersList({});
const menu = new ChatMenu({});
const chatSend = new ChatSend();
const chatMessages = new ChatMessages();

class ChatPage extends Block {
  constructor(props: propType, state: propType) {
    super({
      ...props,
      styles,
      template,
      feed,
      usersList,
      menu,
      chatSend,
      chatMessages,
    }, state);
  }

  protected static _template: string = template;
}

export default ChatPage;
