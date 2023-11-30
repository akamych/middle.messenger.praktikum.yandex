import Block from '../../../../classes/Block.js';
import { propType } from '../../../../utils/types/propType.js';
// eslint-disable-next-line import/no-unresolved
import template from './chats.hbs?raw';

export type feedChatProps = {
  avatar: string | null,
  created_by: Number,
  id: Number,
  last_message: propType | null,
  title: string,
  unread_count: Number,
  events?: propType,
};

export default class FeedChat extends Block {
  constructor(props: feedChatProps) {
    super({
      ...props,
      template,
    });
  }

  protected static _template: string = template;
}
