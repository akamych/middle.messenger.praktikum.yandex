import ChatPage from './chat.ts';
import Feed from '../../chat/feed/index.ts';
import FeedSearch from '../../chat/feedSearch/index.ts';
import ChatMenu from '../../chat/menu/index.ts';
import Input from '../../inputs/input/index.ts';
import messagesData from '../../../utils/tests/messages.json';
import usersData from '../../../utils/tests/users.json';
import pagesData from '../../../utils/constants/pagesData.json';
import textBundle from '../../../utils/constants/text.json';
import ChatMessages from '../../chat/messages/index.ts';
import ChatMessage from '../../chat/messages/message/index.ts';
import FeedUsers from '../../chat/feed/users/index.ts';
import attachIcon from '../../../assets/svg/attach.svg';
import ChatSend from '../../chat/send/index.ts';
import Button from '../../inputs/button/index.ts';

const feedProps = {
  users: [],
};

// пока заполняем из джейсона с мок-данными
Object.entries(usersData).forEach((user) => {
  const { 1: data } = user;
  feedProps.users.push(new FeedUsers(data));
});

const feed = new Feed(feedProps);

const feedSearch = new FeedSearch({
  link: {
    href: pagesData.settings.link,
    title: textBundle.buttons.profile,
    text: textBundle.buttons.profile,
  },
  input: new Input({
    type: 'text',
    name: 'feedSearch',
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

const chatMessagesProps = {
  messages: [],
};

// пока заполняем из джейсона с мок-данными
Object.entries(messagesData).forEach((message) => {
  const { 1: data } = message;
  chatMessagesProps.messages.push(new ChatMessage(data));
});

const messages = new ChatMessages(chatMessagesProps);

const chatSendProps = {
  attachIcon,
};

const chatSend = new ChatSend({
  attachIcon,
  input: new Input({
    type: 'text',
    name: 'message',
    placeholder: textBundle.labels.messageText,
  }),
  button: new Button({
    text: textBundle.buttons.sendMessage,
    type: 'button',
    className: 'sendMessage',
  }),
});

const props = {
  feed,
  feedSearch,
  menu,
  messages,
  chatSend,
};

const chatPage = new ChatPage(props);

export default chatPage;
