import Block from '../../../classes/Block.ts';
import Input from '../../inputs/input/index.ts';
import template from './search.hbs';

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
    super('div', props, template);
  }
}
