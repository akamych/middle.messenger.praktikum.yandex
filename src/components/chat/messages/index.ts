import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './messages.hbs?raw';
import ChatMessage from './message/index.ts';

type chatMessagesProps = {
  events?: Record<string, Function>,
  messages?: ChatMessage[],
};

export default class ChatMessages extends Block {
  constructor(props: chatMessagesProps) {
    super(props, template);
  }
}
