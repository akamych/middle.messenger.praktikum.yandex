import Block from '../../../../classes/Block.ts';
import { userType } from '../../../../utils/types/user.ts';
// eslint-disable-next-line import/no-unresolved
import template from './user.hbs?raw';

export default class UserListUser extends Block {
  constructor(props: userType) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
