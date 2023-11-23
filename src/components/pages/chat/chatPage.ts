import Block, { propType } from '../../../classes/Block.js';
import Feed from '../../chat/feed/index.js';
import FeedSearch from '../../chat/feedSearch/index.js';
import ChatMenu from '../../chat/menu/index.js';
import ChatMessages from '../../chat/messages/index.js';
import Input from '../../inputs/input/index.js';
// eslint-disable-next-line import/no-unresolved
import template from './chatPage.hbs?raw';
import styles from './chatPage.scss';
import { useStore } from '../../../classes/Store.js';

type chatPageProps = {
    events?: Record<string, Function>,
    feed: Feed,
    feedSearch: FeedSearch,
    menu: ChatMenu,
    messages: ChatMessages,
};

class ChatPage extends Block {
  constructor(props: chatPageProps, state: propType) {
    super({
      ...props,
      styles,
      template,
    }, state);
  }

  protected static _template: string = template;

  protected _addChildren(props: propType): propType {
    const feedSearchData = {
      ...this.getState().feedSearch,
      input: new Input({
        type: 'text',
        name: 'feedSearch',
        placeholder: this.getState().feedSearch.input.placeholder,
      }),
    };

    const feedSearch = new FeedSearch(feedSearchData);

    return {
      ...props,
      feedSearch,
    };
  }
}

const useStoreImpl = useStore((state) => ({
  feedSearch: {
    link: {
      href: state.bundle.pages.settings.link,
      title: state.bundle.buttons.profile,
      text: state.bundle.buttons.profile,
    },
    input: {
      placeholder: state.bundle.labels.search,
    },
  },
}));

export default useStoreImpl(ChatPage);
