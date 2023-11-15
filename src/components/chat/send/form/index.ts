import Block from '../../../../classes/Block.ts';
import Input from '../../../inputs/input/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './form.hbs?raw';
import Button from '../../../inputs/button/index.ts';
import consoleForm from '../../../../utils/functions/consoleForm.ts';

type chatSendFormProps = {
  input: Input,
  button: Button,
};

export default class ChatSendForm extends Block {
  constructor(props: chatSendFormProps) {
    super('div', props, template);
  }

  _addSpecificEvents() {
    const form = this.getContent();
    form.addEventListener('submit', (event) => consoleForm(event));
  }
}
