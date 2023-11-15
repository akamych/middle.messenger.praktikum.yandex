import Block from '../../../../classes/Block.ts';
import template from './message.hbs';

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
    super('div', props, template);
  }
}
