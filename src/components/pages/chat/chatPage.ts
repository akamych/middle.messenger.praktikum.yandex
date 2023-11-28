import Block, { propType } from '../../../classes/Block.ts';
import Feed from '../../chat/feed/feed.ts';
import Search from '../../chat/search/search.ts';
import ChatMenu from '../../chat/menu/index.ts';
import ChatMessages from '../../chat/messages/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './chatPage.hbs?raw';
import styles from './chatPage.scss';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';

type chatPageProps = {
    events?: Record<string, Function>,
    menu: ChatMenu,
    messages: ChatMessages,
};

const search = new Search();
const feed = new Feed();

class ChatPage extends Block {
  constructor(props: chatPageProps, state: propType) {
    super({
      ...props,
      styles,
      template,
      search,
      feed,
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
