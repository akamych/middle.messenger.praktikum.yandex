import Block from '../../../classes/Block.ts';
import template from './button.hbs';

type ButtonPropsType = {
  text: string,
  type: string,
  className?: string,
  events?: Record<string, Function>,
};

export default class Button extends Block {
  constructor(props: ButtonPropsType) {
    super('label', props, template);
  }
}
