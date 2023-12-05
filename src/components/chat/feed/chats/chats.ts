import Block from '../../../../classes/Block.ts';
import CONSTANTS from '../../../../utils/bundle/constants.ts';
import { PropType } from '../../../../utils/types/propType.ts';
// eslint-disable-next-line import/no-unresolved
import template from './chats.hbs?raw';

export type FeedChatProps = {
  avatar: string | null,
  avatarAlt: string | null,
  created_by: number,
  id: number,
  last_message: PropType | null,
  title: string,
  unread_count: number,
  events?: PropType,
};

export default class FeedChat extends Block {
  constructor(props: FeedChatProps, state: PropType) {
    const avatar = props.avatar
      ? `${CONSTANTS.RESOURCES_URL}${props.avatar}`
      : null;

    super({
      ...props,
      avatar,
      template,
    }, state);
  }

  protected static _template: string = template;
}
