import Block from '../../../classes/Block.ts';
import consoleForm from '../../../utils/functions/consoleForm.ts';
// eslint-disable-next-line import/no-unresolved
import template from './forms.hbs?raw';
import styles from './forms.scss';

type formPageProps = {
    events?: Record<string, Function>,
    inputs: Block[],
};

export default class FormPage extends Block {
  constructor(props: formPageProps) {
    super({
      ...props,
      styles,
    }, template);
  }

  _addSpecificEvents() {
    const form = this.getContent().querySelector('form');
    form.addEventListener('submit', (event) => consoleForm(event));
  }
}
