import Block from '../../../classes/Block.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import { propType } from '../../../utils/types/propType.ts';
import Link from '../../links/link.ts';
import Input from '../../inputs/input/input.ts';
import Form from '../../inputs/form/form.ts';
// eslint-disable-next-line import/no-unresolved
import template from './feed.hbs?raw';
import Button from '../../inputs/button/button.ts';
import chatService from '../../../services/ChatService.ts';
import FeedChat, { feedChatProps } from './chats/chats.ts';
import FeedSearch from './search/search.ts';
import sortChats from '../../../utils/functions/sort.ts';

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

      const form = event.target as HTMLFormElement;

      const input: HTMLInputElement | null = form.querySelector('input[name="chat_name"]');
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

  _updateState(newState: propType) : void {
    if (newState && this.componentDidUpdate(this._state, newState)) {
      this._state = newState;
      this._props = {
        ...this._props,
        ...newState,
      };
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
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
  if (!chats) { return model; }

  const sorted = sortChats(chats);
  for (let i = 0; i < sorted.length; i += 1) {
    const chat = new FeedChat({
      ...sorted[i],
      events: {
        click: () => chatService.open(sorted[i]),
      },
    } as feedChatProps);
    model.chats.push(chat);
  }
  // eslint-disable-next-line consistent-return
  return model as propType;
});

export default useStoreImpl(Feed);
