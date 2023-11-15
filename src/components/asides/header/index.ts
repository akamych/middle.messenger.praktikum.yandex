import pagesData from '../../../utils/constants/pagesData.json';
import Block from '../../../classes/Block.ts';
import template from './header.hbs';
import styles from './header.scss';

type headerPropsType = {
    href: string,
    text: string,
};

class Header extends Block {
  constructor(props: headerPropsType) {
    super('header', {
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
