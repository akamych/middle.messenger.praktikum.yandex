import Block from '../../../../classes/Block.ts';
import { useStore } from '../../../../classes/Store.ts';
import CONSTANTS from '../../../../utils/bundle/constants.ts';
import { UserType } from '../../../../utils/types/user.ts';
// eslint-disable-next-line import/no-unresolved
import template from './user.hbs?raw';

class UserListUser extends Block {
  constructor(props: UserType) {
    const avatar = props.avatar
      ? `${CONSTANTS.RESOURCES_URL}${props.avatar}`
      : null;

    super({
      ...props,
      avatar,
      template,
    });
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  avatarAlt: state.bundle?.alts.avatar,
}));

export default useStoreImpl(UserListUser);
