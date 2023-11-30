import Block from '../../../classes/Block.js';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.js';
import { propType } from '../../../utils/types/propType.js';
import Link from '../../links/link.js';
import Input from '../../inputs/input/input.js';
import Form from '../../inputs/form/form.js';
// eslint-disable-next-line import/no-unresolved
import template from './feed.hbs?raw';
import Button from '../../inputs/button/button.js';
import chatService from '../../../services/ChatService.js';
import FeedChat, { feedChatProps } from './chats/chats.js';
import FeedSearch from './search/search.js';

const createLinkStoreMapper = (state: propType) => ({
  href: '#',
  title: state.bundle?.feed.createChat,
  text: state.bundle?.feed.createChat,
  events: {
    click: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      store.set('feed', {
        createChat: true,
      });
    },
  },
});

const inputStoreMapper = (state: propType) => ({
  type: 'text',
  name: 'chat_name',
  placeholder: state.bundle?.labels.chat_name,
});

const input = useStoreForComponent(inputStoreMapper, inputStoreMapper(store.getState()), Input);

const buttonStoreMapper = (state: propType) => ({
  type: 'submit',
  name: 'chat_name',
  text: state.bundle?.buttons.createChat,
});

const button = useStoreForComponent(buttonStoreMapper, buttonStoreMapper(store.getState()), Button);

const form = new Form({
  inputs: [input],
  buttons: [button],
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      const input = event.target?.querySelector('input[name="chat_name"]');
      if (!input) {
        return;
      }

      const chatName = input.value;
      input.value = '';

      chatService.create(chatName);
    },
  },
});

const feedSearch = new FeedSearch();

class Feed extends Block {
  constructor() {
    super({
      template,
      link: useStoreForComponent(
        createLinkStoreMapper,
        createLinkStoreMapper(store.getState()),
        Link,
      ),
      form,
      feedSearch,
    });
  }

  protected static _template: string = template;
}

type feedChatType = {
  noChats: string,
  createChat: boolean,
  chats: Block[],
}

const useStoreImpl = useStore((state) => {
  const model: feedChatType = {
    noChats: state.bundle?.feed.noChats,
    createChat: state.feed?.createChat,
    chats: [],
  };

  const { chats } = state;
  if (!chats) { return {}; }

  // TODO: sort the chats
  // chats = chats.sort((a: feedChatProps, b: feedChatProps) => {
  //   if (a.last_message !== null && b.last_message !== null) {
  //     return Date.parse(a.last_message.time).compare(b.last_message.time, )
  //   }
  // });

  for (let i = 0; i < chats.length; i += 1) {
    model.chats.push(new FeedChat({
      ...chats[i],
      events: {
        click: () => chatService.open(chats[i]),
      },
    } as feedChatProps));
  }

  // eslint-disable-next-line consistent-return
  return model as propType;
});

export default useStoreImpl(Feed);
