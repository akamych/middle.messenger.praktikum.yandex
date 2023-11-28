import Block from '../../../../classes/Block.js';
// eslint-disable-next-line import/no-unresolved
import template from './feedChats.hbs?raw';

type feedChatsProps = {
  user: string,
  lastByMe: boolean,
  text: string,
  time: string,
  new?: Number
};

export default class FeedChats extends Block {
  constructor(props: feedChatsProps) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
