import Block from '../../../classes/Block.ts';
import template from './messages.hbs';
import ChatMessage from './message/index.ts';

type chatMessagesProps = {
  events?: Record<string, Function>,
  messages?: ChatMessage[],
};

export default class ChatMessages extends Block {
  constructor(props: chatMessagesProps) {
    super('main', props, template);
  }
}
