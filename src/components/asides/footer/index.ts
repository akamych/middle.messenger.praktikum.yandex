import textBundle from '../../../utils/constants/text.json';
import Block from '../../../classes/Block.ts';
import template from './footer.hbs';
import styles from './footer.scss';

type footerPropsType = {
    href: string,
    text: string,
};

class Footer extends Block {
  constructor(props: footerPropsType) {
    super('footer', {
      ...props,
      styles,
    }, template);
  }
}

const footerProps = {
  href: textBundle.akamych.link,
  text: textBundle.akamych.text,
};

const footer = new Footer(footerProps);

export default footer;
