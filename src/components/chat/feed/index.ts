import Block from '../../../classes/Block.ts';
import FeedUsers from './users/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './feed.hbs?raw';

type feedProps = {
    events?: Record<string, Function>,
    users?: FeedUsers[],
};

export default class Feed extends Block {
  constructor(props: feedProps) {
    super(props, template);
  }
}
