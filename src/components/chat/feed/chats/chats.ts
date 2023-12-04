import Block from '../../../../classes/Block.ts';
import { propType } from '../../../../utils/types/propType.ts';
// eslint-disable-next-line import/no-unresolved
import template from './chats.hbs?raw';

export type feedChatProps = {
  avatar: string | null,
  created_by: number,
  id: number,
  last_message: propType | null,
  title: string,
  unread_count: number,
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
