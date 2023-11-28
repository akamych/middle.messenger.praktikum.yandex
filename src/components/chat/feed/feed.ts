import Block from '../../../classes/Block.js';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.js';
import { propType } from '../../../utils/types/propType.js';
import Link from '../../links/link.js';
import Input from '../../inputs/input/input.js';
import Form from '../../inputs/form/form.js';
// eslint-disable-next-line import/no-unresolved
import template from './feed.hbs?raw';
import Button from '../../inputs/button/button.js';
import chatsApi from '../../../api/Chats.js';

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

const button = useStoreForComponent(buttonStoreMapper, buttonStoreMapper(store.getState), Button);

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

      chatsApi.create(chatName);
    },
  },
});

class Feed extends Block {
  constructor(props?: propType) {
    super({
      ...props,
      template,
      link: useStoreForComponent(
        createLinkStoreMapper,
        createLinkStoreMapper(store.getState),
        Link,
      ),
      form,
    });
    console.log(props);
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  noChats: state.bundle?.feed.noChats,
  createChat: state.feed?.createChat,
  chats: state.chats,
}));

export default useStoreImpl(Feed);
