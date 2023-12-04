import Block from '../../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './message.hbs?raw';
import { propType } from '../../../../utils/types/propType.ts';

export default class ChatMessage extends Block {
  constructor(props: propType) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
