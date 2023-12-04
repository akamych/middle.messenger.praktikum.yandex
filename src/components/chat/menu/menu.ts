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
    click: () => store.set('usersList.active', true),
  },
});

class ChatMenu extends Block {
  constructor(props: propType) {
    super({
      ...props,
      listUsers: useStoreForComponent(listUsersMapper, listUsersMapper(store.getState()), Link),
      template,
    });
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  activeChat: state.activeChat,
  title: state.activeChat?.title,
  avatar: state.activeChat?.avatar,
}));

export default useStoreImpl(ChatMenu);

