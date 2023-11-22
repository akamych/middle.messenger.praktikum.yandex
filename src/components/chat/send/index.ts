import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './send.hbs?raw';
// eslint-disable-next-line import/no-unresolved
import attachIcon from '../../../assets/svg/attach.svg?raw';
import ChatSendForm from './form/index.ts';

type chatSendProps = {
  attachIcon: attachIcon,
  form: ChatSendForm,
};

export default class ChatSend extends Block {
  constructor(props: chatSendProps) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
