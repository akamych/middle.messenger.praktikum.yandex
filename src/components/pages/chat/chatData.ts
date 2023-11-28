import ChatPage from './index.js';
import Feed from '../../chat/feed/index.js';
import Search from '../../chat/search/search.js';
import ChatMenu from '../../chat/menu/index.js';
import Input from '../../inputs/input/input.js';
import messagesData from '../../../utils/bundle/messages.json';
import usersData from '../../../utils/bundle/users.json';
import pagesData from '../../../utils/bundle/pagesData.json';
import textBundle from '../../../utils/bundle/text.json';
import ChatMessages from '../../chat/messages/index.js';
import ChatMessage from '../../chat/messages/message/index.js';
import FeedUsers from '../../chat/feed/users/index.js';
// eslint-disable-next-line import/no-unresolved
import attachIcon from '../../../assets/svg/attach.svg?raw';
import ChatSend from '../../chat/send/index.js';
import Button from '../../inputs/button/button.js';
import ChatSendForm from '../../chat/send/form/index.js';
import checkForm from '../../../utils/functions/checkForm.js';

const feedProps = {
  users: [],
};

// пока заполняем из джейсона с мок-данными
Object.entries(usersData).forEach((user) => {
  const { 1: data } = user;
  feedProps.users.push(new FeedUsers(data));
});

const feed = new Feed(feedProps);

const search = new Search({
  link: {
    href: pagesData.settings.link,
    title: textBundle.buttons.profile,
    text: textBundle.buttons.profile,
  },
  input: new Input({
    type: 'text',
    name: 'search',
    placeholder: textBundle.labels.search,
  }),
});

const menu = new ChatMenu({
  user: {
    display_name: usersData[1].user,
  },
  addContact: {
    href: '#',
    title: textBundle.buttons.addContact,
    text: textBundle.buttons.addContact,
  },
  clearChat: {
    href: '#',
    title: textBundle.buttons.clearChat,
    text: textBundle.buttons.clearChat,
  },
  deleteChat: {
    href: '#',
    title: textBundle.buttons.deleteChat,
    text: textBundle.buttons.deleteChat,
  },
});

const chatMessagesProps: Record<string, ChatMessage[]> = {
  messages: [],
};

// пока заполняем из джейсона с мок-данными
Object.entries(messagesData).forEach((message) => {
  const { 1: data } = message;
  chatMessagesProps.messages.push(new ChatMessage(data));
});

const messages = new ChatMessages(chatMessagesProps);

const chatSend = new ChatSend({
  attachIcon,
  form: new ChatSendForm({
    input: new Input({
      type: 'text',
      name: 'message',
      placeholder: textBundle.labels.messageText,
    }),
    button: new Button({
      text: textBundle.buttons.sendMessage,
      type: 'submit',
      className: 'sendMessage',
    }),
    events: {
      submit: (event) => checkForm(event),
    },
  }),
});

const props = {
  feed,
  search,
  menu,
  messages,
  chatSend,
};

const chatPage = new ChatPage(props);

export default chatPage;
