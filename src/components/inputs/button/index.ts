import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './button.hbs?raw';

type ButtonPropsType = {
  text: string,
  type: string,
  className?: string,
  events?: Record<string, Function>,
};

export default class Button extends Block {
  constructor(props: ButtonPropsType) {
    super(props, template);
  }
}
