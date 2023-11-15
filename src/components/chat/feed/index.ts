import Block from '../../../classes/Block.ts';
import FeedUsers from './users/index.ts';
import template from './feed.hbs';

type feedProps = {
    events?: Record<string, Function>,
    users?: FeedUsers[],
};

export default class Feed extends Block {
  constructor(props: feedProps) {
    super('main', props, template);
  }
}
