import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './files.hbs?raw';

export type InputFilePropsType = {
  fileButton: unknown,
  name: string,
  className?: string,
  events: {
    change: Function,
  },
  allow: {
    pictures?: boolean,
  },
};

export default class InputFile extends Block {
  constructor(props: InputFilePropsType) {
    super({
      ...props,
      template,
    });
  }
}
