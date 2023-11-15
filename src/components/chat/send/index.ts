import Block from '../../../classes/Block.ts';
import Input from '../../inputs/input/index.ts';
import template from './send.hbs';
import attachIcon from '../../../assets/svg/attach.svg';
import Button from '../../inputs/button/index.ts';

type chatSendProps = {
  attachIcon: attachIcon,
  input: Input,
  button: Button,
};

export default class ChatSend extends Block {
  constructor(props: chatSendProps) {
    super('div', props, template);
  }
}
