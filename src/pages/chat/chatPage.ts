import Block, { propType } from '../../classes/Block.ts';
import Feed from '../../components/chat/feed/feed.ts';
import ChatMenu from '../../components/chat/menu/menu.ts';
import ChatMessages from '../../components/chat/messages/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './chatPage.hbs?raw';
import styles from './chatPage.scss';
import { useStore } from '../../classes/Store.ts';
import UsersList from '../../components/chat/usersList/usersList.js';

type chatPageProps = {
    events?: Record<string, Function>,
    messages: ChatMessages,
};

const feed = new Feed({});
const usersList = new UsersList({});
const menu = new ChatMenu({});

class ChatPage extends Block {
  constructor(props: chatPageProps, state: propType) {
    super({
      ...props,
      styles,
      template,
      feed,
      usersList,
      menu,
    }, state);
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  // search: {
  //   link: {
  //     href: state.bundle.pages.settings.link,
  //     title: state.bundle.buttons.profile,
  //     text: state.bundle.buttons.profile,
  //   },
  //   input: {
  //     placeholder: state.bundle.labels.search,
  //   },
  // },
  // feed: {
  //   placeholder: state.bundle.labels.search,
  // },
}));

export default useStoreImpl(ChatPage);
