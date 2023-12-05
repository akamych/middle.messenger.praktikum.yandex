import Block from '../../../classes/Block.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import { PropType } from '../../../utils/types/propType.ts';
import Link from '../../links/link.ts';
import Input from '../../inputs/input/input.ts';
// eslint-disable-next-line import/no-unresolved
import template from './usersList.hbs?raw';
import usersService from '../../../services/UsersService.ts';
import UserListUser from './users/user.ts';
import { UserType } from '../../../utils/types/user.ts';
import ChatService from '../../../services/ChatService.ts';

const linkStoreMapper = (state: PropType) => ({
  href: '#',
  title: state.bundle?.buttons.goBackLeft,
  text: state.bundle?.buttons.goBackLeft,
  events: {
    click: () => store.set('usersList.active', false),
  },
});

const searchUserEvent = (event: Event) => {
  const input : HTMLInputElement = event.target as HTMLInputElement;
  if (!input) { return; }
  usersService.search(input.value);
  input.value = '';
};

const inputStoreMapper = (state: PropType) => ({
  type: 'text',
  name: 'name',
  placeholder: state.bundle?.labels.search,
  events: {
    change: searchUserEvent,
  },
});

const input = useStoreForComponent(inputStoreMapper, inputStoreMapper(store.getState()), Input);

class UsersList extends Block {
  constructor() {
    super({
      template,
      link: useStoreForComponent(
        linkStoreMapper,
        linkStoreMapper(store.getState()),
        Link,
      ),
      input,
    });
  }

  protected static _template: string = template;
}

type usersListType = {
  active: boolean,
  search: boolean,
  noUsers: string,
  noFoundUsers: string,
  users: Block[],
  found: Block[],
}

const moveUserEvent = (event: Event, id: Number, remove: boolean = false) => {
  event.stopPropagation();
  if (remove) {
    ChatService.removeUser(id);
  } else {
    ChatService.addUser(id);
  }
};

const useStoreImpl = useStore((state) => {
  const model: usersListType = {
    active: state.usersList?.active,
    noUsers: state.bundle?.usersList?.noUsers,
    search: state.usersList?.search,
    noFoundUsers: state.bundle?.usersList?.noFoundUsers,
    users: [],
    found: [],
  };

  if (!state.usersList) { return; }
  const { users, found } = state.usersList;

  const avatarAlt = state.bundle?.alts.avatar;

  const currentUsers = new Set();

  if (users) {
    for (let i = 0; i < users.length; i += 1) {
      // не фиг себя показывать
      if (users[i].id === state.user?.id) {
        // eslint-disable-next-line no-continue
        continue;
      }

      currentUsers.add(users[i].id);

      const removeLinkMapper = (state: PropType) => ({
        href: '#',
        title: state.bundle?.buttons.removeUserFromChat,
        text: state.bundle?.buttons.removeUserFromChat,
        events: {
          click: (event: Event) => moveUserEvent(event, users[i].id, true),
        },
      });

      model.users.push(new UserListUser({
        ...users[i],
        avatarAlt,
        inActiveChat: true,
        removeUser: useStoreForComponent(
          removeLinkMapper,
          removeLinkMapper(store.getState()),
          Link,
        ),
      } as UserType));
    }
  }

  if (found) {
    for (let i = 0; i < found.length; i += 1) {
      if (found[i].id === state.user?.id) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const addLinkMapper = (state: PropType) => ({
        href: '#',
        title: state.bundle?.buttons.addUserToChat,
        text: state.bundle?.buttons.addUserToChat,
        events: {
          click: (event: Event) => moveUserEvent(event, found[i].id),
        },
      });

      const removeLinkMapper = (state: PropType) => ({
        href: '#',
        title: state.bundle?.buttons.removeUserFromChat,
        text: state.bundle?.buttons.removeUserFromChat,
        events: {
          click: (event: Event) => moveUserEvent(event, found[i].id, true),
        },
      });

      model.found.push(new UserListUser({
        ...found[i],
        avatarAlt,
        inActiveChat: currentUsers.has(found[i].id),
        addUser: useStoreForComponent(addLinkMapper, addLinkMapper(store.getState()), Link),
        removeUser: useStoreForComponent(
          removeLinkMapper,
          removeLinkMapper(store.getState()),
          Link,
        ),
        events: {
          click: () => ChatService.addUser(found[i].id),
        },
      } as UserType));
    }
  }

  // eslint-disable-next-line consistent-return
  return model as PropType;
});

export default useStoreImpl(UsersList);
