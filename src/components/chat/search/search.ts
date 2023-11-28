import Block from '../../../classes/Block.js';
import Input from '../../inputs/input/input.js';
import Link from '../../links/link.js';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.js';
// eslint-disable-next-line import/no-unresolved
import template from './search.hbs?raw';
import { propType } from '../../../utils/types/propType.js';

const linkStoreMapper = (state: propType) => ({
  href: state.bundle?.pages.settings.link,
  title: state.bundle?.buttons.profile,
  text: state.bundle?.buttons.profile,
});

const inputStoreMapper = (state: propType) => ({
  type: 'text',
  name: 'search',
  placeholder: state.bundle?.labels.search,
});

export default class Search extends Block {
  constructor() {
    super({
      template,
      link: useStoreForComponent(linkStoreMapper, linkStoreMapper(store.getState), Link),
      input: useStoreForComponent(inputStoreMapper, inputStoreMapper(store.getState()), Input),
    });
  }

  protected static _template: string = template;
}
