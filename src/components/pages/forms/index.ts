import Block from '../../../classes/Block.ts';
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
      template,
    });
  }

  protected static _template: string = template;
}
