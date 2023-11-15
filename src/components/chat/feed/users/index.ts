import Block from '../../../../classes/Block.ts';
import template from './users.hbs';

type feedUsersProps = {
  user: string,
  lastByMe: boolean,
  text: string,
  time: string,
  new?: Number
};

export default class FeedUsers extends Block {
  constructor(props: feedUsersProps) {
    super('div', props, template);
  }
}
