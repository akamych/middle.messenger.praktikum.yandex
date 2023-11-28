import Block from '../../../classes/Block.js';
// eslint-disable-next-line import/no-unresolved
import template from './form.hbs?raw';

type FormPropsType = {
  inputs?: Block[],
  buttons?: Block[],
  events?: Record<string, Function>,
};

export default class Form extends Block {
  constructor(props: FormPropsType) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
