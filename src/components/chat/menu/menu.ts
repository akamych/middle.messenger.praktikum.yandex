import Block from '../../../classes/Block.js';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.js';
import ChatService from '../../../services/ChatService.js';
import UsersService from '../../../services/UsersService.js';
import { propType } from '../../../utils/types/propType.js';
import Link from '../../links/link.js';
// eslint-disable-next-line import/no-unresolved
import template from './menu.hbs?raw';

const listUsersMapper = (state: propType) => ({
  href: '#',
  title: state.bundle?.buttons.chatUsers,
  text: state.bundle?.buttons.chatUsers,
  events: {
    click: () => ChatService.users(),
  },
});

const clearChatMapper = (state: propType) => ({
  href: '#',
  title: state.bundle?.buttons.clearChat,
  text: state.bundle?.buttons.clearChat,
});

const deleteChatMapper = (state: propType) => ({
  href: '#',
  title: state.bundle?.buttons.deleteChat,
  text: state.bundle?.buttons.deleteChat,
});

class ChatMenu extends Block {
  constructor(props: propType) {
    super({
      ...props,
      listUsers: useStoreForComponent(listUsersMapper, listUsersMapper(store.getState()), Link),
      clearChat: useStoreForComponent(clearChatMapper, clearChatMapper(store.getState()), Link),
      deleteChat: useStoreForComponent(deleteChatMapper, deleteChatMapper(store.getState()), Link),
      template,
    });
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  title: state.activeChat?.title,
  avatar: state.activeChat?.avatar,
}));

export default useStoreImpl(ChatMenu);

