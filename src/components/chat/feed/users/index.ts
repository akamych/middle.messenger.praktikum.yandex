import Block from '../../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './users.hbs?raw';

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
