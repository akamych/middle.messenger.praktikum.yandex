import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './menu.hbs?raw';

type chatMenuLinkProps = {
  href: string,
  title: string,
  text: string,
};

type chatMenuProps = {
    events?: Record<string, Function>,
    user: {
      display_name: string,
    },
    addContact: chatMenuLinkProps,
    clearChat: chatMenuLinkProps,
    deleteChat: chatMenuLinkProps,
};

export default class ChatMenu extends Block {
  constructor(props: chatMenuProps) {
    super('main', props, template);
  }
}
