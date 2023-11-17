import Block from '../../../classes/Block.ts';
import Input from '../../inputs/input/index.ts';
// eslint-disable-next-line import/no-unresolved
import template from './search.hbs?raw';

type feedSearchProps = {
  link: {
    href: string,
    title: string,
    text: string,
  },
  input: Input,
};

export default class FeedSearch extends Block {
  constructor(props: feedSearchProps) {
    super(props, template);
  }
}
