import Block from '../../../classes/Block.ts';
import template from './menu.hbs';

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
