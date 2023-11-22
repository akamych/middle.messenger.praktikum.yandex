import Block from '../../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './message.hbs?raw';

type chatMessageProps = {
  events?: Record<string, Function>,
  byYou: boolean,
  time: string,
  unread?: boolean,
  text?: string,
  img?: string,
  attachments?: {
    img?: boolean,
  },
};

export default class ChatMessage extends Block {
  constructor(props: chatMessageProps) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
