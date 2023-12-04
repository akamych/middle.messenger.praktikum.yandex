import Block from '../../../classes/Block.js';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.js';
import { propType } from '../../../utils/types/propType.js';
import Link from '../../links/link.js';
import InputFile from '../../inputs/files/files.js';
import chatService from '../../../services/ChatService.js';
// eslint-disable-next-line import/no-unresolved
import template from './menu.hbs?raw';

const avatarMapper = (state: propType) => ({
  fileButton: state.bundle?.buttons?.changeAvatar,
  name: 'avatar',
  allow: {
    pictures: true,
  },
  events: {
    change: (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input || !input.files) { return; }

      const formData = new FormData();
      formData.append('avatar', input.files[0]);
      chatService.updateAvatar(formData);
    },
  },
});

const changeAvatar = useStoreForComponent(avatarMapper, avatarMapper(store.getState()), InputFile);

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
      changeAvatar,
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

