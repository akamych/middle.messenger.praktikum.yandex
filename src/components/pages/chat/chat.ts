import Block from '../../../classes/Block.ts';
import Feed from '../../chat/feed/index.ts';
import FeedSearch from '../../chat/feedSearch/index.ts';
import ChatMenu from '../../chat/menu/index.ts';
import ChatMessages from '../../chat/messages/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './chat.hbs?raw';
import styles from './chat.scss';

type chatPageProps = {
    events?: Record<string, Function>,
    feed: Feed,
    feedSearch: FeedSearch,
    menu: ChatMenu,
    messages: ChatMessages,
};

export default class ChatPage extends Block {
  constructor(props: chatPageProps) {
    super('main', {
      ...props,
      styles,
    }, template);
  }
}
