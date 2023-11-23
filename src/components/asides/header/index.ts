import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './header.hbs?raw';
import styles from './header.scss';
import { useStore } from '../../../classes/Store';
import { propType } from '../../../utils/types/propType.js';

type headerPropsType = {
    href: string,
    text: string,
    title: string,
};

class Header extends Block {
  constructor(props: headerPropsType, state: propType) {
    super({
      ...props,
      ...state,
      styles,
      template,
    }, state);
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  href: state.bundle.pages.index.link,
  title: state.bundle.pages.index.title,
  text: state.bundle.headerLink,
}));

export default useStoreImpl(Header);
