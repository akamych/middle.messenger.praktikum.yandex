import Block from '../../../classes/Block.ts';
import consoleForm from '../../../utils/functions/consoleForm.ts';
import template from './forms.hbs';
import styles from './forms.scss';

type formPageProps = {
    events?: Record<string, Function>,
    inputs: Block[],
};

export default class FormPage extends Block {
  constructor(props: formPageProps) {
    super('main', {
      ...props,
      styles,
    }, template);
  }

  _addSpecificEvents() {
    const form = this.getContent().querySelector('form');
    form.addEventListener('submit', (event) => consoleForm(event));
  }
}
