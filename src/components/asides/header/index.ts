import pagesData from '../../../utils/constants/pagesData.json';
import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './header.hbs?raw';
import styles from './header.scss';

type headerPropsType = {
    href: string,
    text: string,
};

class Header extends Block {
  constructor(props: headerPropsType) {
    super({
      ...props,
      styles,
    }, template);
  }
}

const headerProps = {
  href: pagesData.index.link,
  text: pagesData.index.title,
};

const header = new Header(headerProps);

export default header;
