import Block from '../../../classes/Block.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import { PropType } from '../../../utils/types/propType.ts';
import Link from '../../links/link.ts';
import InputFile from '../../inputs/files/files.ts';
import chatService from '../../../services/ChatService.ts';
// eslint-disable-next-line import/no-unresolved
import template from './menu.hbs?raw';
import CONSTANTS from '../../../utils/bundle/constants.ts';

const avatarMapper = (state: PropType) => ({
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

const listUsersMapper = (state: PropType) => ({
  href: '#',
  title: state.bundle?.buttons.chatUsers,
  text: state.bundle?.buttons.chatUsers,
  events: {
    click: () => store.set('usersList.active', true),
  },
});

class ChatMenu extends Block {
  constructor(props: PropType) {
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
  avatar: state.activeChat?.avatar
    ? `${CONSTANTS.RESOURCES_URL}${state.activeChat?.avatar}`
    : null,
  avatarAlt: state.bundle?.alts.avatar,
}));

export default useStoreImpl(ChatMenu);
