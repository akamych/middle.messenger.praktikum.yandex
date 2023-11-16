import Block from '../../../../classes/Block.ts';
import Input from '../../../inputs/input/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './form.hbs?raw';
import Button from '../../../inputs/button/index.ts';

type chatSendFormProps = {
  input: Input,
  button: Button,
  events: {
    submit: Function,
  },
};

export default class ChatSendForm extends Block {
  constructor(props: chatSendFormProps) {
    super(props, template);
  }
}
