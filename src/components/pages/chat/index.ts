import Block, { propType } from '../../../classes/Block.js';
import Feed from '../../chat/feed/index.js';
import FeedSearch from '../../chat/feedSearch/index.js';
import ChatMenu from '../../chat/menu/index.js';
import ChatMessages from '../../chat/messages/index.js';
import Input from '../../inputs/input/index.js';
// eslint-disable-next-line import/no-unresolved
import template from './chat.hbs?raw';
import styles from './chat.scss';

// to be removed when interactive
import pagesData from '../../../utils/constants/pagesData.json';
import textBundle from '../../../utils/constants/text.json';

type chatPageProps = {
    events?: Record<string, Function>,
    feed: Feed,
    feedSearch: FeedSearch,
    menu: ChatMenu,
    messages: ChatMessages,
};

export default class ChatPage extends Block {
  constructor(props: chatPageProps) {
    super({
      ...props,
      styles,
      template,
    });
  }

  protected static _template: string = template;

  protected _addChildren(props: propType): propType {
    const feedSearchData = {
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
    };

    const feedSearch = new FeedSearch(feedSearchData);

    return {
      ...props,
      feedSearch,
    };
  }
}
